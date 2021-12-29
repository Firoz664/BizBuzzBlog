import express from 'express'
import { createPost, getAllPosts, getPost,updatePost,deletePost } from '../controllers/postController.js'
import { uploadImage,getImage } from '../controllers/ImageController.js'
import upload from '../utellites/UploadImg.js'

import { newComment,getComments,deleteComments } from '../controllers/commentController.js'

 const router=express.Router()


router.post('/create',createPost)
router.get('/posts', getAllPosts);
router.get('/post/:id', getPost);

router.post('/update/:id', updatePost);
router.delete('/delete/:id',deletePost);

//file upload 
router.post('/file/upload', upload.single('file'), uploadImage);
router.get('/file/:filename', getImage);

router.post('/comment/new', newComment);
router.get('/comments/:id', getComments);
router.delete('/comments/delete/:id', deleteComments);
   



export default router