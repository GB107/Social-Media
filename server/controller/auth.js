import Register from "../db/db";
import post from '../db/posts'
import { hashPassword } from "../helpers/auth";
import { ComparePassword } from "../helpers/auth";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import  verify  from "jsonwebtoken";
import cloudinary from "cloudinary"
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})
require('dotenv').config()
export const register=async (req,res)=>{
    try {
        const password = req.body.password;
        const cpassword = req.body.cpassword;
        const name= req.body.name;
        const email= req.body.email;
        const secret= req.body.secret;

        if (password!=cpassword){
            
            
           return res.status(400).send("password not match")
        }
        if (password == cpassword) {
            const salt = await bcrypt.genSalt()
            const hashedpassword = await bcrypt.hash(password, salt)
            const hashedcpassword = await bcrypt.hash(cpassword, salt)
            
            const registers = new Register({
                name: name,
                email: email,
                password: hashedpassword,
                cpassword: hashedcpassword,
                secret:secret
            })
            const registered = await registers.save()
            // return res.status(400).send("Registered Sucessfully!!!!!!");
            res.json("Signup Succesfully");
        }
       
    } catch (error) {
        res.status(400).send(error);
    }   
};

export const login=async(req,res)=>{
try{
    const{email,password}=req.body
    const user= await Register.findOne({email:email});
    if(!user){ return res.status(400).send("No user found")}
    const match=await ComparePassword(password,user.password)   
    if(!match){ return res.status(400).send("Wrong Password")}
    console.log(process.env.JWT_SECRET)
    const token =jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"3d"})
    user.password=undefined;
    user.cpassword=undefined;
    user.secret=undefined;
    res.json({
        token,
        user,
    });
    res.status(400).send("Login successfully!!!")
}
catch(err){
    console.log(err)
    // res.status(400).send("Error")
}
}

    // const tokens = req.headers.authorization;
    // try {
        export const verifyToken=(req, res, next)=> {
            const token = req.headers['authorization'];
            if (!token) return res.status(401).send({ error: 'No token provided' });
          
            try {
              const decoded = jwt.verify(token, SECRET_KEY);
              req.user = decoded;
              next();
            } catch (err) {
              return res.status(401).send({ error: 'Invalid token' });
            }
          }
    export const forgotpassword=async(req,res)=>{
      try{
         const email=req.body.email
       const password=req.body.newpassword
       const cpassword=req.body.cnewpassword
       const secret=req.body.secret
       const user= await Register.findOne({email:email});
       if(password!=cpassword){res.status(400).send("Passwords not matching")}
        if(user.secret==secret){
            const hash=await hashPassword(password)
            const chash=await hashPassword(cpassword)

            await Register.findByIdAndUpdate(user._id,{password:hash})
            await Register.findByIdAndUpdate(user._id,{cpassword:chash})
        }
      }
       catch(err){
        res.status(400).send("Error creating New password")
       }

    }
  export const Post=async(req,res)=>{
    // console.log(req.body.content)
    const conte=req.body.content
if (!conte.length) return res.json({error:"content is required"},);

try{

    const posts=new post({

      content:req.body.content,
      postedBy:req.body.user,
      image:req.body.image
    })
    await posts.save();
    return res.json({success:"Post created sucessfully"},);
    
}
  catch(err){
    res.status(400).send(err)
  }
  }
  

export const uploadimg=async(req,res)=>{
  try{
    const result=await cloudinary.uploader.upload(req.files.image.path)
res.json({
  url:result.secure_url,
  public_id:result.public_id,
})
  }
catch(err){
  console.log(err);
}
}
export const userpost=async(req,res)=>{
try{
const posts= await post.find()
.populate("postedBy","_id name photo")
.sort({createdAt:-1})
.limit(10)
res.json(posts)

}
catch(err){
  console.log(err);
}
}
export const editpost=async(req,res)=>{
  try{
    const posts=await post.findById(req.query.user)
    res.json(posts);
  }
  catch(err){
    console.log(err)
  }
}

export const updatepost=async(req,res)=>{
  try {
    console.log(req.body);
    const posted = await post.findByIdAndUpdate(
      req.query.user,
      { content: req.body.content, image: req.body.image },
      { new: true } // returning the updated document
    );
    res.json(posted);
    // console.log(posted);
  } catch(err) {
    console.log(err);
  }
}

export const deletepost=async(req,res)=>{
try{
  const posting =await post.findByIdAndDelete(req.params._id)
  if(posting.image && posting.image.public_id){
    const image= await cloudinary.uploader.destroy(posting.image.public_id)
  }
  res.json({ok:true})
}
catch(err){
  console.log(err)
}
}
export const profilepic = async (req, res) => {
  try {
    const profile = await cloudinary.uploader.upload(req.files.image.path);
    res.json({
      url:profile.secure_url,
      public_id:profile.public_id,
    })
    // console.log(profile)
  } catch(err) {
    console.log(err);
    res.status(500).json({ success: false, error: err });
  }
};

export const getprofile=async(req,res)=>{
  try{
const getprofiles=await Register.findById(req.query.user)
res.json({profile:getprofiles.photo})
// console.log(getprofiles.photo)

  }
  catch(err){
    console.log(err)
  }
}

export const likepost=async(req,res)=>{
  try{
    console.log(req.body.user);
    const likesget =await post.findByIdAndUpdate(req.params._id,{
          $addToSet:{likes:req.body.user},
        },
          {new:true}
    )
    res.json("Liked sucessfully");

  }
  catch(err){
console.log(err);
  }
}

export const commentposted=async(req,res)=>{
  try {
    const user = await Register.findById(req.body.user);
    const commentsget = await post
      .findByIdAndUpdate(
        req.body.post,
        {
          $push: {
            comments: {
              text: req.body.content,
              postedBy: req.body.user,
              postedbyname: user.name,
            },
          },
        },
        { new: true }
      )
      .sort({ createdAt: -1 })
      .populate("postedBy", "_id name")
      .populate("comments.postedBy", "_id name photo");
    res.json("Commented Successfully");
  } catch (err) {
    console.log(err);
  }
}  
export const findpeople = async (req, res) => {
  try {
    const user = await Register.findById(req.query.user);
    // console.log(req.query);
    let following = user.following;
    following.push(user._id);
    const people = await Register.find({ _id: { $nin: following } }).limit(10);
    // console.log(people);
    res.json(people);
  } catch (err) {
    console.log(err);
  }
}
// to add following
export const follow = async (req, res, next) => {
  try {
    console.log(req.body)
    const user = await Register.findByIdAndUpdate(req.body.people, {
      $addToSet: { followers: req.body.user },
    });
    next();
  } catch (err) {
    console.log(err);
  }
}

// to add follower
export const following=async(req,res)=>{
  try{
    const user=await Register.findByIdAndUpdate(
      req.body.user,
      { $addToSet: { following: req.body.people } },
      { new: true }
    ).lean();
    res.json(user);
    // console.log(user);
  }
  catch(err){
    console.log(err);
  }
}

export const updatebio=async(req,res)=>{
try{
  const user = await Register.findByIdAndUpdate(req.body.user,{
    $push:{about:req.body.bio}
  },
  {
    new:true
  });
console.log(user.about);
res.json("Bio Updated Sucessfully");
}
catch(err){
  console.log(err);
}
}

export const getbio=async(req,res)=>{
try{
  const user = await Register.findById(req.query.user);

console.log(user.about);
res.json(user.about);
}
catch(err){
  console.log(err);
}
}




