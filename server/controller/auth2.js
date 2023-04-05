import Register from "../db/db";
export const postprofile=async(req,res)=>{
    try{
      console.log("hello")
      console.log(req.body)
      const post = await Register.findByIdAndUpdate(
        req.body.user,
        { photo: req.body.image },
        { new: true } // returning the updated document
      );
      return res.json({success:"Post created sucessfully"},);
    }
    catch(err){
      console.log(err);
    }
}