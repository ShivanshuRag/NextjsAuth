import {connect} from "@/dbConfig/dbConfig"
import { NextRequest, NextResponse } from "next/server"
import { getDataFromToken } from "@/helpers/getDataFromToken"
import User from "@/models/usermodel"

connect()
export async function GET(request: NextRequest){
  try {
     const userId = await getDataFromToken(request);
    const user = await User.findOne({_id: userId}).select("-password");

    return NextResponse.json({
        message : "User Found",
        data: user
    })
  } catch (error:any) {
    return NextResponse.json(error.message, {status: 400})
  }
}