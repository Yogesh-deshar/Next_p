import { connectDB } from "@/dbconfig/dbConfig";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request : NextRequest){
    await connectDB();
    try {
        const reqBody = await request.json();
        const {token} = reqBody; 
  const user = await User.findOne({verifyToken : token, verifyTokenExpiry : {$gt : Date.now()}})

    if(!user){
        return NextResponse.json("Invalid or expired token", {status : 400});

    }
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();
    return NextResponse.json("Email verified successfully", {status : 200});
        
    } catch (error) {
        return NextResponse.json("Internal Server Error", {status : 500});
    }
}