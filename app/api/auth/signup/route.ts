import { PrismaClient } from "@/app/generated/prisma";
const client = new PrismaClient();
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try{
        const {email,password,name} = await req.json();
        if(!email || !password){
            return NextResponse.json({message:"email or password missing"},{status:400});
        }

        const existingUser = await client.user.findUnique({
            where:{email:email}
        })

        if(existingUser){
            return NextResponse.json({message:"User already exists"},{status:400});
        }

        const user = await client.user.create({
            data:{email,password,name}
        })
        return NextResponse.json(user);
        
    }
    catch(error){
        return NextResponse.json({
            error:"Error occurred"
        })
    }
}