'use server'
import connectToDatabase from "../connect/mongodb";
import User from "@/app/models/user";
import { NextResponse } from "next/server";

export async function DELETE(req) {

    // conectando ao banco de dados
    const id = req.nextUrl.searchParams.get('id');
    await connectToDatabase();

    // deletando o usuário do banco de dados
    await User.findByIdAndDelete(id);

    // retornando uma mensagem de sucesso ao deletar o usuário do banco de dados
    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });

}