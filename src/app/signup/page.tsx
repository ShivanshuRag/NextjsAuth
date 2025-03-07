'use client'

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState , useEffect } from "react";
import{ toast }from "react-hot-toast";
import axios from "axios";

export default function SignupPage(){
        const router = useRouter()
        const [ user , setUser] = useState({
        
            username : "",
            email: "",
            password: "",
        })
     const [buttonDisabled , setButtonDisabled] = useState(false)
     const [ loading , setLoading] = useState(false)


     const onSignup = async ()=>{
        try {
            setLoading(true)
           const response = await axios.post("/api/users/signup", user)
          console.log("Signup Successfully" ,response.data);   
           router.push('/login');

        } catch (error:unknown) {
            if (error instanceof Error) {
                console.log("Signup failed", error.message);
                toast.error(error.message);}
        }finally{
            setLoading(false)
        }
     }

     useEffect(()=>{
      if(user.username.length > 0 && user.email.length > 0 && user.password.length > 0){
        setButtonDisabled(false)
      }else{
        setButtonDisabled(true)
      }

     },[user])
   return(
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <h1>{loading ? "Processing" : "Signup"}</h1>
          <hr />
          <label htmlFor="username">username</label>
          <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white"
           id="username"
          type="text" 
          value={user.username}
          onChange={(e)=> setUser({...user , username : e.target.value}) }
          placeholder="username"
          
          />
       <label htmlFor="email">email</label>
       <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white"

        id="email"
        type="email" 
        value={user.email}
        onChange={(e)=> setUser({...user , email: e.target.value})}
        placeholder="email"
       />
        <label htmlFor="password">password</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="password"
            />
            <button
           
           onClick={onSignup}
           className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            >

           { buttonDisabled ? "No Signup" : "Signup"}
            </button>
            <Link href="/login">visit login page</Link>
       </div>
   )
}