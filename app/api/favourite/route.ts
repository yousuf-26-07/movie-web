
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
const client = new PrismaClient();

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if(!session){
        return NextResponse.json({message:"Please Login to add favourite"},{status:401});
    }
    try{
    const { tmdbId } = await req.json();
    const userId = parseInt(session?.user.id);
    console.log("TMDB ID:", tmdbId);
    console.log("User ID:", userId);

    if (!tmdbId || !userId) {
        return NextResponse.json({ message: "userId or tmdbId missing" }, { status: 400 });
    }

    const existingFavourite = await client.favourite.findFirst({
        where:{
            tmdbId,
            userId
        }
    });
    if(!existingFavourite){
    const favourite = await client.favourite.create({
        data: {
            tmdbId,
            userId
        }
    });
    return NextResponse.json({favourite,isNew:true});
    }
    else{
        return NextResponse.json({isNew:false})
    }

}
catch(error){
    console.log(error);
    return NextResponse.json({ error: "Error occurred while adding" }, { status: 500 });
}
}

export async function GET(req: NextRequest){
    const session = await getServerSession(authOptions);
    if(!session){
        return NextResponse.json({message:"Please Login to view favourites"},{status:401});
    }
    try{
        const userId = session.user.id;
        if(!userId){
            return NextResponse.json({message:"userId missing"},{status:400});
        }

        const favourites = await client.favourite.findMany(
            {
                where:{userId:parseInt(userId)}
            }
        )
        return NextResponse.json(favourites);
    }
    catch(error){
        return NextResponse.json({error:"Error occurred while fetching"},{status:500});
    }
}