import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';


// componets importing
import  Connection from './databaeControl/Database.js'
import Router from './routes/route.js';


const app = express(); 
dotenv.config();

app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
 
app.use('/',Router)
//client addreass for Production
// if(process.env.NODE_ENV==='production'){
//     app.use(express.static('frontend/build')); 

// }



const PORT =process.env.PORT || 8000;
 


app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`)
}); 
const URL=`mongodb+srv://Firoz:firoz6464@cluster0.zgyvu.mongodb.net/BLOG-PROJECT?retryWrites=true&w=majority`

Connection(process.env.MONGODB_URI || URL);    
