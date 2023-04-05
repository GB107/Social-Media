import { useState } from "react";
import { createContext } from "react";
import { useEffect } from "react";
const UserContext=createContext();
const UserProvider=({children})=>{
    const [state,setState]=useState({
        user:{},
        token: "",}
    );
    useEffect(() => {
        setState(JSON.parse(window.localStorage.getItem("auth")))
      }, [setState]);
      
    return(
    <UserContext.Provider value={[state,setState]}>
        {children}
    </UserContext.Provider>
)
};
export {UserContext,UserProvider};