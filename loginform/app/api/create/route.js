'use server'
import connectToDatabase from "../connect/mongodb";
import User from "@/app/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
    
    try {
        // pegando os dados do body da requisição
        const {username,usermail,password,confirmPassword} = await req.json();

        // conectando ao banco de dados
        await connectToDatabase();

        // criando um novo usuário no banco de dados
        await User.create({username,usermail,password,confirmPassword});

        // retornando uma mensagem de sucesso ao criar o usuário no banco de dados
        return NextResponse.json({message:"User created successfully"}, {status: 201});

    } catch (error) {

        // caso ocorra algum erro ao criar o usuário no banco de dados, imprime o erro no console.log;
        console.log(error);
    }

}