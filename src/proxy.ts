import { NextRequest, NextResponse } from "next/server";

export function proxy(request : NextRequest){
   const path = request.nextUrl.pathname;
   const ispublicPath = path === '/login' || path === '/signup' ;
const token = request.cookies.get('token')?.value;

if(ispublicPath && token){
    return NextResponse.redirect(new URL('/profile', request.url));

}
if(!ispublicPath && !token){
    return NextResponse.redirect(new URL('/login', request.url));
}
}
export const config = {
    matcher: [
        '/profile',
        '/login',
        '/signup',
        '/',
        '/profile/:path*',
        '/verifiedEmail'
        ,'/product'
    ],
}