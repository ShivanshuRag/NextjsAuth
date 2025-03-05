"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

export default function VerifyEmailPage(){

 const [token , setToken] = useState("")
 const [verified , setVerified] = useState(false)
 const [error , setError] = useState(false)


 const emailVerify = async ()=>{
     try {
        await axios.post("/api/users/verifyemail" ,  {token})
        setVerified(true)
     } catch (error) {
        if(error instanceof Error){
            setError(true)
            console.log(" email Verify" + error.message);
        }
     }
 }

   useEffect(()=>{
    const urlToken =  window.location.search.split("=")[1];
     setToken(urlToken || "")
     console.log(urlToken + " yeha hai url");
   },[]);

   useEffect(()=>{
   
    if(token.length > 0){
        emailVerify()
    }

   },[token])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">

    <h1 className="text-4xl">Verify Email</h1>
    <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>

    {verified && (
        <div>
            <h2 className="text-2xl bg-emerald-400">Email Verified</h2>
            <Link href="/login">
                Login
            </Link>
        </div>
    )}
    {error && (
        <div>
            <h2 className="text-2xl bg-red-500 text-black mt-2.5">Error</h2>
            
        </div>
    )}
</div>


  )
}