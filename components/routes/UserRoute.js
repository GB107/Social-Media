import { useEffect,useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { UserContext } from "../../context";
import { useContext } from "react";
const userRoute=(children)=>{
const [ok,setOk]=useState(false);
const[state,setState]=useContext(UserContext)
const router=useRouter
useEffect(()=>{getCurrentUser},[state && state.token])
const getCurrentUser=async()=>{
    try{
const {data}=await axios.get(`${process.env.NEXT_PUBLIC_API}/current-user`,{
    headers:{
        Authorization: `Bearer ${state.token}`
    },
}); 
if(data.ok) setOk(true);
    }
    catch(err){
 router.push("/login")
    }
};
process.browser && state===null && setTimeout(()=>{
    getCurrentUser()
},1000)
return !ok ?(<p>Loading</p>) : (<>{children}</>)
}
export default userRoute