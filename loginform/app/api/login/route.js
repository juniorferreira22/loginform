'use server';
import connectToDatabase from '../connect/mongodb';
import User from '@/app/models/user';
import { NextResponse } from 'next/server';
import { createJwtToken } from '../token/route';

export async function GET(req) {

    try {
        // Extraindo o user e email das queries
        const usermail = req.nextUrl.searchParams.get('usermail');
        const password = req.nextUrl.searchParams.get('password');

        // Conectando ao banco de dados e dando fetch nas credenciais de usuario
        await connectToDatabase();

        const envUsermail = process.env.USERMAIL;
        const envPassword = process.env.PASSWORD;

        // Verificando se a senha foi preenchida
        if (!usermail || !password) {
            return NextResponse.json({ error: 'Missing usermail or password' }, { status: 400 });
        }

        // Verificando se o usuario esta no banco de dados atraves do metodo mongoose findOne
        const user = await User.findOne({ usermail: usermail, password: password });

        if (user) {
            // Retornando a JWT caso o usuario exista
            return NextResponse.json({ token: createJwtToken(user) }, { status: 200 });
            
        } else {
            // Retornando o erro de usuario incorreto caso os dados estejam errados.
            return NextResponse.json({ error: 'E-mail ou senha inválido(s).' }, { status: 401 });
        }
    } catch (error) {
        // Handling any unexpected errors
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
