import CredentialsProvider from "next-auth/providers/credentials";
import {prisma} from "@/prisma";
import { pages } from "next/dist/build/templates/app-page";
import { signIn } from "next-auth/react";
export const authOptions = {
    providers:[
        CredentialsProvider({
            name:"Credentials",
            credentials:{
                Email:{label:"Email",type:"text",placeholder:"Email"},
                Password:{label:"Password",type:"password",placeholder:"Password"}
            },
            async authorize(credentials){
                if(!credentials?.Email || !credentials?.Password){
                    throw new Error("Email or Password missing");
                }
                const user = await prisma.user.findUnique({
                    where:{email:credentials.Email}
                })

                if(!user || user.password !== credentials.Password){
                    throw new Error("Invalid Email or Password");
                }
                return {id:user.id,email:user.email,name:user.name};
            }
        }),
    ],
    secret:process.env.NEXTAUTH_SECRET,
    
    callbacks:{
        async jwt({ token, user }) {
            if (user) token.id = token.sub;
            return token;
    },
        async session({session,token,user}:any){
            
            if(session.user && session){
                session.user.id = token.id
            }
            return session;
        }
    }

}