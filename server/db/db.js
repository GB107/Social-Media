const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/socialnetwork');
var db=mongoose.connection;
db.on('error', console.log.bind(console, 'connection error'));
db.once('open', function(callback){
 console.log('connection succeeded');
})

// const mongoose=require('mongoose')
const userSchema= new mongoose.Schema({
name :{
type:String,
required:true
},
email :{
type:String,
 required:true,
unique:true
},
password :{
    type:String,
    required:true
},
cpassword :{
type:String,
 required:true 
},
secret :{
 type:String,
 required:true
},
about:{},
photo:{type:String},
following:[{type:mongoose.Schema.ObjectId,ref:"user"}],
followers:[{type:mongoose.Schema.ObjectId,ref:"user"}],
},{timestamps:true})
const Register =new mongoose.model('socialusers',userSchema);
module.exports=Register;
