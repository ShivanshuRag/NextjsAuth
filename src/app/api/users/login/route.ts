import {connect} from "@/dbConfig/dbConfig"

import { NextRequest, NextResponse } from "next/server";

import User from "@/models/usermodel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect()
export async function POST(request: NextRequest){
try {
    
    const reqBody = await request.json();

    const { email , password } = reqBody;

     if(!(email || password)){
        return NextResponse.json({
            message: " Email and password is Required",
            status: 400
        })
     }

     const user = await User.findOne({email});

     if(!user){
        return NextResponse.json({
            message: " User Not Exits",
            status: 400
        }) 
     }

     const validatePassword = await bcryptjs.compare(password , user.password)

    if(!validatePassword){
        return NextResponse.json({
            message: " password is wrong, Try Again",
            status: 400
        }) 
    }

  const tokenData = {
    id : user._id,
    username: user.username,
    email:user.email

  }

  const token = await jwt.sign(tokenData , process.env.TOKEN_SECRET! ,{ expiresIn: '1d'});

   const response = NextResponse.json({
    message: "Login successful",
    success: true,

   })

   response.cookies.set("token" , token ,
    {
        httpOnly: true, 
  
    }
   )
   return response;
} catch (error) {
    return NextResponse.json({error: error}, {status: 500})
}

}