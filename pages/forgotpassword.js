import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
const forgotpassword=()=>{
    const [email,setEmail]=useState('')
    const [newpassword,setNewpassword]=useState('')
    const [cnewpassword,setCnewpassword]=useState('')
    const [secret,setSecret]=useState('');

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            axios.post(`${process.env.NEXT_PUBLIC_API}/forgotpassword`,{
            email,
            newpassword,
            cnewpassword,
            secret
        })
        toast.success("sucessfully password change");
        router.push("/login")
        }
        catch(err){
            toast.error(err)
        }
        

    }
    return(
       <div className=" w-96 flex justify-center" style={{width:"1440px",marginTop:"100px"}}>
        <form onSubmit={handleSubmit} className=" border-slate-200" style={{backgroundColor:"snow",borderRadius: "3px"}}>
        <ul>
          <li type="none"> <input type="email" placeholder=" Email adress" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-96 h-12 px-4 py-4 mx-4  my-1.5 rounded-lg border-gray-300 border" /></li>
         <select className="w-96 h-12 px-4 py-2 mx-4 my-4 rounded-lg border-gray-300 border">
           <option>What is your pet name?</option>
          <option>Who is Your Favourite Athelete?</option>
          <option>What is your Best Friend's Name??</option>
         </select>
          <li type="none"> <input type="text" placeholder=" secret answer" value={secret} onChange={(e)=>setSecret(e.target.value)} className="w-96 h-12 px-4 py-4 my-2 mx-4  rounded-lg border-gray-300 border" /></li>
          <li type="none"><input type="password" placeholder=" new Password" value={newpassword} onChange={(e)=>setNewpassword(e.target.value)}  className="w-96 h-12 px-4 py-4 my-2  mx-4 rounded-lg border-gray-300 border" /></li>
          <li type="none"><input type="password" placeholder=" confirm new Password" value={cnewpassword} onChange={(e)=>setCnewpassword(e.target.value)}  className="w-96 h-12 px-4 py-4 my-4 mx-4 rounded-lg border-gray-300 border" /></li>
          <div className="bg-blue-600 w-96 rounded-2xl h-12 justify-center mx-4 my-4">
            <input type="submit" defaultValue="Create" className="mx-[165px] my-2 text-white text-xl" />
            {/* <Link href={"/forgotpassword"} className="text-center text-blue-500 mx-4 ml-32">Forgotten password?</Link> */}
          </div>
          
        </ul>
      </form>
      </div> 
    )
}
export default forgotpassword;