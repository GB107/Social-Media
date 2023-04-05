import Link from "next/link";
import { UserContext } from "../context";
import { useContext } from "react";
import { useState } from "react";
import {useRouter} from 'next/router'
import { useEffect } from "react";
import Image from "rc-image"
const navbar =()=>{
  const router=useRouter()
  const [state,setState]=useContext(UserContext);
  const [current,setCurrent]=useState('')
  useEffect(()=>{
    process.browser && setCurrent(window.location.pathname)
  },[process.browser && window.location.pathname]);
  const logout =()=>{
    window.localStorage.removeItem("auth");
    setState(null)
    router.push("/login")
  }
    return(
        <div className="bg-blue-600 flex items-center justify-between h-14 " style={{width:"100%",}}>
    <div className="flex items-center">
      <Image src="/img/social-network-low-resolution-logo-color-on-transparent-background.png" alt="Logo" className="w-10 h-10 rounded-full " />
      <h1 className="font-bold text-xl text-white ml-2">Social Network</h1>
    </div>
    <nav className="flex items-center">
    {state!==null
      ?<Link href="/dashboard" className={`px-3 py-2 font-semibold text-white hover:text-gray-800 text-lg ${
        current=== "/dashboard"&& "active"
      }`}>Posts</Link>
      :<Link href="/" className={`px-3 py-2 font-semibold text-white hover:text-gray-800 text-lg ${
        current=== "/"&& "active"
      }`}>Home</Link>}
      {state!==null
      ?<Link href="/profile" className={`px-3 py-2 font-semibold text-white hover:text-gray-800 text-lg ${
        current=== "/profile"&& "active"
      }`}>My Profile</Link>
      :<Link href="/signup" className={`px-3 py-2 font-semibold text-white hover:text-gray-800 text-lg ${
        current=== "/signup"&& "active"
      }`}>Signup</Link>}
      {state!==null
      ?<a  onClick={logout} className="px-3 py-2 font-semibold text-white hover:text-gray-800 text-lg">Logout</a>
      :<Link href="/login" className={`px-3 py-2 font-semibold text-white hover:text-gray-800 text-lg ${
        current=== "/login"&& "active"
      }`}>Login</Link>}
    </nav>      
  </div>
    )
}
export default navbar;