import express from 'express'
import {  deletepost, editpost, getprofile, profilepic, updatepost, uploadimg } from '../controller/auth';
import { forgotpassword } from '../controller/auth';
import { userpost } from '../controller/auth';
const router= express.Router();
import { Post } from '../controller/auth';
import { login } from '../controller/auth';
import {register} from '../controller/auth'
import { verifyToken } from '../controller/auth';
import formidable from "express-formidable"
import { postprofile } from '../controller/auth2';
import { likepost } from '../controller/auth';
import { commentposted } from '../controller/auth';
import { findpeople } from '../controller/auth';
import { follow } from '../controller/auth';
import { following } from '../controller/auth';
import { updatebio } from '../controller/auth';
import { getbio } from '../controller/auth';

router.post("/register",register);
router.post('/login',login)
router.get("/current-user",verifyToken)
router.post("/forgotpassword",forgotpassword)
router.post("/post",Post)
router.put("/uploadimg",formidable({maxFileSize:5*1024*1024}),uploadimg)
router.get("/userpost",userpost);
router.get("/editpost",editpost)
router.put("/updatepost",updatepost)
router.delete("/deletepost/:_id",deletepost)
router.post("/likepost/:_id",likepost)
router.post("/commentpost",commentposted)
router.post("/profilepic",formidable({maxFileSize:5*1024*1024}),profilepic)
router.get("/getprofile",getprofile)
router.post("postprofile",postprofile)
router.get('/findpeople',findpeople)
router.put('/follow',follow,following)
router.post('/updatebio',updatebio)
router.get('/getbio',getbio)

module.exports= router;
