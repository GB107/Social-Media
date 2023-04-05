const mongoose = require('mongoose');
const {ObjectId}=mongoose.Schema;
const postSchema=new mongoose.Schema({
    content:{
        type:{},
        required:true
 },
 postedBy:{
 type:ObjectId,
 ref:"socialusers"
 },
 
 image:{
 url:String,
 public_id:String,
 },
 likes:[{
    type:ObjectId,
    ref:"socialusers"
 }],
 comments:[{
 text:String,
 created:{type:Date,default:Date.now},
 postedBy:{type:ObjectId,ref:"socialusers"},
 postedbyname:{
    type:String,
    required:true
 },
 }]

 },
 {timestamps:true})
 const post =new mongoose.model('post',postSchema);
 module.exports=post;