import {connect} from "@/dbConfig/dbConfig"
import { sendEmail } from "@/helpers/mailer"
import User from "@/models/usermodel"
import bcryptjs from "bcryptjs"

import { NextResponse , NextRequest } from "next/server"

connect()
export async function POST( request: NextRequest){
    
    try {

       const reqBody = await request.json()  
       const { username , email, password} = reqBody

       const user = await User.findOne(email)
        if(user){
        return NextResponse.json({error : " User Existed"} , {status: 400})
        }

       // password hashed 

       const salt = await bcryptjs.genSalt(10)
       const hashedPassword = await bcryptjs.hash(password, salt)

     const newuser =  new User({
         username,
         email,
         password : hashedPassword,
       })

     const saveduser =  await newuser.save()
      
      await sendEmail({ email , emailType:"VERIFY" , userId: saveduser._id })
        
      return NextResponse.json({
        message: "User created successfully",
        success : true,
        saveduser,
      })


     } catch (error: any) {

      return NextResponse.json({error: error.message} ,{ status: 500})  
    }
}