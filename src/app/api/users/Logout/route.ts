import { NextResponse } from "next/server";
import toast from "react-hot-toast";

export async function GET() {

    try {
        const response = NextResponse.json({message: "Logout successful"}, {status: 200});
        response.cookies.set("token", "", {httpOnly: true, expires: new Date(0)});
        return response;
        
    } catch (error : any) {
        return NextResponse.json({message: error.message}, {status: 500});
        toast.error(error.message);
    }
}