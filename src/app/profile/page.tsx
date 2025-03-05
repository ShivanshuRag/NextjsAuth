
"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";

export default function ProfilePage(){
  const router = useRouter()
  const [data, setData] = useState("nothing")
  


const logout = async ()=>{
    try {

      const res =  await axios.get("/api/users/logout");
         if(res.data){
            toast.success(" Logout Successful");
         }
        router.push("/login")
    } catch (error) {
        if( error instanceof Error){
            console.log( error.message);
            toast.error(" logout failed")
        }
    }

}
   
const getUserDetails = async function(){
    try {
     const res = await axios.get("/api/users/me")
     console.log(res.data.data._id);
      setData(res.data.data._id)   
    } catch (error) {
       if(error instanceof Error){
           toast.error(" Not Found user Details");
           console.log(error.message);
       }
    }  
}
   return(
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
     <h1>Profile</h1>
     <hr />
     <p>Profile Page</p>
     <h2 className="p-1 rounded bg-green-500">{data === "nothing" ? "No Details yet" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
      
      <hr />

      <button
      onClick={logout}
      className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
       logout
      </button>
      <hr />
      <button
      onClick={getUserDetails}
      className="bg-green-500 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
       get User Details
      </button>

    </div>

   )

}