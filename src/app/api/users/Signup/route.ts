import { connectDB } from "@/dbconfig/dbConfig";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest){
    try {
        await connectDB();
        const reqBody = await request.json();
        const {email, password, username} = reqBody;

        // Validate input
        if (!email || !password || !username) {
            return NextResponse.json(
                { message: "Email, password, and username are required" }, 
                { status: 400 }
            );
        }

        // check if user already exists
        const user = await User.findOne({email});
        if(user){
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }
        
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({email, password: hashedPassword, username});
        const savedUser = await newUser.save();

        return NextResponse.json({
            message: "User created successfully", 
            success: true, 
            savedUser: {
                id: savedUser._id,
                email: savedUser.email,
                username: savedUser.username
            }
        }, { status: 201 });
    } catch (error: unknown) {
        console.error("Signup error:", error);
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ message: "An unknown error occurred" }, { status: 500 });
        }
    }
}