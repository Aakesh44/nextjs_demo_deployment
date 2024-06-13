import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel';
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'

connect();

export async function POST(request: NextRequest) {
    
    try {
        const reqBody = await request.json();

        const {email, password} = reqBody        

        console.log('reqBody :',reqBody);

        // check if the user doestn't exist

        const user = await User.findOne({email:email})

        if(!user){
            return NextResponse.json({error:"User doestn't exist"}, {status: 400})
        }

        // check if the password is correct

        const validPassword = await bcryptjs.compare(password, user.password)

        if(!validPassword){
            return NextResponse.json({error:'Invalid password'},{status: 400})
        }

        // create token data

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!,{expiresIn:'1h'})

        const response = NextResponse.json({
            message:'Login successful',
            success: true
        })

        await response.cookies.set( 'verifyToken', token, {httpOnly: true})

        return response
        
    } catch (error:any) {
        return NextResponse.json({error: error?.message},{status:500})
    }
}