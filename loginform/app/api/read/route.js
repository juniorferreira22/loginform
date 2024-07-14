'use server'
import connectToDatabase from "../connect/mongodb";
import User from "@/app/models/user";
import { NextResponse } from "next/server";

export async function GET() {
         // conectando ao banco de dados
        await connectToDatabase();

        // buscando os usuários no banco de dados
        const users = await User.find();

        // retornando os usuários encontrados no banco de dados
        return NextResponse.json(users, { status: 200 });
}