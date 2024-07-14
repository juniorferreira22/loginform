// Importações corrigidas (verifique os caminhos para garantir que estejam corretos)
import jwt from 'jsonwebtoken';
import Link from 'next/link';
import LoadingIndicator from '@/app/components/loading/loading';
import LoginForm from '@/app/components/loginform/LoginForm';

export default function Homepage({ user }) {
    // Simulação de token JWT (geralmente não é gerado diretamente assim)
    const token = jwt.sign({ user }, process.env.JWT_SECRET);

    // Condição para verificar se há um token presente
    if (token) {
        return (
            <main className="bg-slate-950 flex flex-col items-center justify-center min-w-screen min-h-screen">
                <div className="text-white text-center">
                    <LoadingIndicator />

                    <h1>EM CONSTRUÇÃO</h1>
                    <p>Esta página ainda está em construção. Volte em breve.</p>
                    
                    <Link href="/pages/login">
                        <div className="transition bg-purple-600 rounded-xl p-4 hover:bg-purple-400 m-auto mt-4">Log-out</div>
                    </Link>
                </div>
            </main>
        );
    } else {
        return <LoginForm />;
    }
}
