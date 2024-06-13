import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs'
import { sendEmail } from "@/helpers/mailer2";

connect();

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json();

        const {email} = reqBody;

        const user = await User.findOne({email:email})

        if(!user){
            return NextResponse.json({error:'Not a valid email'}, {status: 400})
        }

        const res = await sendEmail({email, emailType: 'RESET', userId: user?._id})

        if(res) return NextResponse.json({message:'token send'},{status: 201})

        return NextResponse.json({error:'Something went wrong'}, {status: 400})
        
    } catch (error: any) {
        return NextResponse.json({error: error?.message},{status:500})
    }
}

