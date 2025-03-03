import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/usermodel";

import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request: NextRequest){
    try {
      const reqBody = await request.json()
       const {token} = reqBody;
      
       const user = await User.findOne({verifyToken: token , verifyTokenExpiry: {$gt: new Date()} })
        if(!user){
            return NextResponse.json({error: "Failed Email Verification"})
        }

       user.isVerfied = true
       user.verifyToken = undefined
       user.verifyTokenExpiry = undefined

    } catch (error:any) {
      return  NextResponse.json({error: error.message + " IN Verify Email"}, {status: 500})  
    }
}