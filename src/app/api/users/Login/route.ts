import { connectDB } from "@/dbconfig/dbConfig";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export async function POST(request: NextRequest){
    await connectDB();
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;
         // check if user exists
        const user =  await User.findOne({email});
        if(!user){
            return NextResponse.json({message: "User does not exist"}, {status: 400});
        }

        // checking password
        const Checkpassword = await bcrypt.compare(password, user.password);
        if(!Checkpassword){
            return NextResponse.json({message: "Invalid credentials"}, {status: 400});
        }
        
        // create token data
        const tokenData ={
            id: user._id,
            email: user.email,
            password: user.password
        }

        // create token
        const token = await jwt.sign(tokenData, process.env.TOKEN as string, {expiresIn: '1d'});
        const response = NextResponse.json({message: "Login successful"}, {status: 200});
        response.cookies.set("token", token, {httpOnly: true});
        return response;
    } catch (error: any)  {
        return NextResponse.json({message: error.message}, {status: 500});
    }
}