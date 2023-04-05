import Link from "next/link";
import { useContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import {toast} from 'react-toastify'
import {useRouter} from 'next/router'
import { UserContext } from "../context";
import Image from "rc-image"
const login =()=>{
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [state,setState]=useContext(UserContext);
  const router=useRouter()
  const handleSubmit=async (e)=>{
    e.preventDefault();
    try{
    const {data}=await axios.post(`${process.env.NEXT_PUBLIC_API}/login`,{
      email:email,
      password:password,
     });
     setState({
      user:data.user,
      token:data.token
     })
     window.localStorage.setItem('auth',JSON.stringify(data))
     toast.success("sucessfully login");
     router.push("/profile")
     
    }
    catch(err){
      toast.error(err);
    }
    
    };

  // if(state && state.token) router.push('/')
    return (
<div className="my-44 flex">
  <div className="left mx-0 justify-center w-auto lg:mx-60 w-[400px] ">
    <Image className="w-72" src="/img/social-network-low-resolution-logo-color-on-transparent-background.png" alt />
    <section className=" text-xl  wx-[00px] lg:text-3xl mx-8 justify-center w-[550px]">SN helps you connect and share with the people in your life.</section>
  </div>
  <div className="mx-36 lg:mx-0">
    <div className=" right justify-center w-[420px] bg-white -my-10 rounded-xl bg-[ #e2e7ed] border border-slate-200">
      <form onSubmit={handleSubmit} className>
        <ul>
          <li type="none"> <input type="email" placeholder=" Email adress" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-96 h-12 px-4 py-4 mx-4  my-6 rounded-lg border-gray-300 border" /></li>
          <li type="none"><input type="password" placeholder=" Password" value={password} onChange={(e)=>setPassword(e.target.value)}  className="w-96 h-12 px-4 py-4  mx-4 rounded-lg border-gray-300 border" /></li>
          <div className="bg-blue-600 w-96 rounded-2xl h-12 justify-center mx-4 my-4">
            <input type="submit" defaultValue="Log in" className="mx-[165px] my-2 text-white text-xl" />
            <Link href={"/forgotpassword"} className="text-center text-blue-500 mx-4 ml-32">Forgotten password?</Link>
          </div>
          
        </ul>
      </form>
      <div className="border bg-slate-500 my-8 w-11/12 mx-3" />
      <div className="h-16">
        <button className=" h-12 rounded-xl bg-green-500 mx-28 w-48 text-white text-xl">
            <Link href="/signup">Create New Account</Link> </button>
      </div>
    </div>
    <div className="my-14 mx-14"><strong>create a Page,</strong>for a celebrity, brand or business.</div>
  </div>
</div>

    )
}
export default login;