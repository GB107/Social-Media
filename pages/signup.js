import Link from "next/link";
import { useState } from "react";
import {toast} from "react-toastify"
import axios from "axios"
import {Modal} from "antd"
import { useRouter } from "next/router";
import { UserContext } from "../context";
import { useContext } from "react";

const Signup =()=>{
const [state,setState]=useContext(UserContext)
const [name,setName]=useState('');
const [email,setEmail]=useState('');
const [password,setPassword]=useState('');
const [cpassword,setCpassword]=useState('');
const [secret,setSecret]=useState('');
const [ok,setOk]=useState(false)
const router =useRouter()
const handleSubmit=async (e)=>{
e.preventDefault();
try{
  const postData = {
    name:name,
    email:email,
    password:password,
    cpassword:cpassword,
    secret:secret
  };
  const {data}=await axios.post(`${process.env.NEXT_PUBLIC_API}/register`, postData);
 toast.success(data);
 router.push("/login")
 
}
catch(err){
  toast.error("check Password and Name");
  // toast.error();

}

};
if(state && state.token) router.push('/')
    return(
<body>
<form onSubmit={handleSubmit}>
 <div className="bg-grey-lighter min-h-screen flex flex-col">
  <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
      <h1 className="mb-8 text-3xl text-block text-center">Sign up</h1>
      <input value={name} onChange={(e)=>setName(e.target.value)} type="text" className="block border border-grey-light w-full p-3 rounded mb-4" name="name" placeholder="Full Name" />
      <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className="block border border-grey-light w-full p-3 rounded mb-4" name="email" placeholder="Email" />
      <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="block border border-grey-light w-full p-3 rounded mb-4" name="password" placeholder="Password" />
      <input value={cpassword} onChange={(e)=>setCpassword(e.target.value)} type="password" className="block border border-grey-light w-full p-3 rounded mb-4" name="cpassword" placeholder="Confirm Password" />
      <select className="block border border-grey-light w-full p-3 rounded mb-4">
        <option>What is your pet name?</option>
        <option>Who is Your Favourite Athelete?</option>
        <option>What is your Best Friend's Name??</option>
      </select>
      <input value={secret} onChange={(e)=>setSecret(e.target.value)} type="text" className="block border border-grey-light w-full p-3 rounded mb-4" name="secret" placeholder="Your Answer" />

      <button type="submit" className="w-full text-center py-3 rounded bg-blue-600 text-white hover:bg-green-dark focus:outline-none my-1">Create Account</button>
      <div className="text-center text-sm text-grey-dark mt-4">
        By signing up, you agree to the 
        <p> </p> 

        <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
          Terms of Service
        </a> and
        <p> </p> 
        <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
            Privacy Policy
        </a>
      </div>
    </div>
    <div className="text-grey-dark mt-6">
      Already have an account? 
      <Link className="no-underline border-b border-blue text-blue text-blue-800 text-bold" href="/login">
        Log in
      </Link>.
    </div>
  </div>
</div>
<div className="row" >
   <div className="col">
    <Modal
      title="congratulation"
      open={ok}
      onCancel={()=>setOk(false)}
      footer={null}
    > 
     <p>You have sucessfully registered.</p>
      <Link className="no-underline border-b border-blue text-blue text-blue-800 text-bold" href="/login">Login</Link>
    </Modal>
   </div>
  </div>        
</form>      
</body>     
    )
}
export default Signup;