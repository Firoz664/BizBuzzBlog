import express from "express";

import Post from "../models/postModelSchema.js";
// creating post in database
export const createPost= async(request, response)=>{
    console.log(request.body);
    try {
        const post = await new Post(request.body);
        post.save()
        response.status(200).json('blog saved successfully');
    } catch (error) {
         response.status(500).json(error)   
    }
}
//exporting blog from database
export const getAllPosts = async (request,response)=>{
    let username=request.query.username;
    let category= request.query.category;
    let posts;
    try {
        if(username)
            posts= await Post.find({username:username})
        
        else if(category)
            posts= await Post.find({categories:category})
        
        else
            posts = await Post.find({});
        response.status(200).json(posts);    
    } catch (error) {
        response.status(500).json(error); 
    }
}
//API call for getPost
export const getPost = async (request,response)=>{
    try {
        let post = await Post.findById(request.params.id);
        response.status(200).json(post);    
    } catch (error) {
        response.status(500).json(error); 
    }
}

//update post controller
export const updatePost = async (request,response)=>{
    try {
        let post = await Post.findByIdAndUpdate(request.params.id,{$set:request.body});// 1- mongodb concept $set=>this command use relpace all content in present in database
        response.status(200).response("Your Blog Updated SuccessFully");                               //2- mongodb concept $push=>this command use in Array to change array Object in database  all content in present in database
    } catch (error) {                                                  //3- mongodb concept $addToSet=>this commanand use already present databae change don with help of this command
        response.status(500).json(error); 
    }
}
//delete post controller
export const deletePost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);
        
        await post.delete()

        response.status(200).json('post deleted successfully');
    } catch (error) {
        response.status(500).json(error)
    }
}
     