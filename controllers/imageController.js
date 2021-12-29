import mongoose from 'mongoose';
import grid from 'gridfs-stream';
const url = 'http://localhost:8000'

let gfs;

const connectImage = mongoose.connection;
connectImage.once('open',()=>{
   gfs= grid(connectImage.db,mongoose.mongo)
   gfs.collection('fs');

})



export const uploadImage = async (request, response) => {
   try {
        if(!request.file) 
        return response.status(404).json("File not found");
        const imageURL = `${url}/file/${request.file.filename}`;

        response.status(200).json(imageURL); 
    } catch (error) {
        response.status(500).json(error);
        
       
    }
}
//getImgae function

export const getImage = async (request, response) => {
    try {
        const file = await gfs.files.findOne({filename:request.params.filename});
        const readStream = gfs.createReadStream(file.filename)//createReadStream function use for read image from database
        readStream.pipe(response);
     } catch (error) {
         response.status(500).json("image failed! while fetch image",error);
          
        
     }
 }