import { getDatatoken } from "@/helper/getDatatoken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModels";
import { connectDB } from "@/dbconfig/dbConfig";

export async function GET(request : NextRequest){
    await connectDB();
    try {
        const userID = getDatatoken(request);
        const userData = await User.findOne({_id : userID}).select("-password -isAdmin");
        return NextResponse.json({
        message : "User data fetched successfully",
        data : userData
        })
        
    } catch (error:any) {
        return NextResponse.json({message : error.message}, {status : 500});
        
    }
}