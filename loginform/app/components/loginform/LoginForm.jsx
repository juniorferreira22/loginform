"use client"; // Não tenho certeza do que "use client" significa; normalmente é "use strict" para forçar boas práticas de JavaScript
import { useState } from "react";
import Link from "next/link";

export default function LoginForm() {
  const [usermail, setUsermail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  

  const handleMailInput = (e) => {
    setUsermail(e.target.value);
  };

  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/login/?usermail=${usermail}&password=${password}`, {method: 'GET'});

      if (res.ok) {
        console.log('Login bem-sucedido. Redirecionando para a homepage.');
        window.location.href = "/pages/homepage";

      } else {
        const data = await res.json();
        setError(data.error || 'Usuario ou senha incorretos. Tente novamente.');
      }

    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setError('Usuario ou senha incorretos. Tente novamente.');
    }
  };

  return (
    <main className="flex min-h-screen min-w-screen flex-col items-center justify-between bg-slate-950">
      <form onSubmit={handleSubmit} className="w-96 bg-slate-400 flex flex-col p-16 px-8 rounded-2xl m-auto dark:bg-slate-900">
        <div className="mb-3">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Seu e-mail
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="nome@email.com"
            required
            onChange={handleMailInput}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Sua senha
          </label>
          <input
            type="password"
            id="password"
            placeholder="••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onChange={handlePasswordInput}
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          type="submit"
          className="transition text-white bg-purple-600 hover:bg-purple-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-3 text-center dark:bg-purple-800 dark:hover:bg-purple-600 dark:focus:ring-blue-800"
        >
          Login
        </button>

        <Link href="/pages/register">
          <div className="text-center text-white mt-4">Criar uma conta</div>
        </Link>

      </form>
    </main>
  );
}
