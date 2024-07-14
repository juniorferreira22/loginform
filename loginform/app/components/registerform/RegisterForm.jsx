"use client"
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [usermail, setUsermail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificando se a senha tem mais de 8 caracteres
    if (password.length < 8) {
      setError("A senha precisa ter no mínimo 8 caracteres!");
      return;
    }

    // Verificando se as senhas coincidem
    if (password !== confirmPassword) {
      setError("As senhas não coincidem!");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/create/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, usermail, password }),
      });

      if (res.ok) {
        alert("Usuário cadastrado com sucesso!");
        router.push("/pages/login");
      } else {
        const data = await res.json();
        setError(data.error || "Erro ao cadastrar usuário");
      }
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      setError("Erro ao conectar ao servidor");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between bg-slate-950">
      <form
        onSubmit={handleSubmit}
        className="w-96 bg-slate-400 flex flex-col p-16 px-8 rounded-2xl m-auto dark:bg-slate-900"
      >
        <div className="mb-3">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Nome completo
          </label>
          <input
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Nome completo"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Seu e-mail
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="nome@email.com"
            required
            value={usermail}
            onChange={(e) => setUsermail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Sua senha
          </label>
          <input
            type="password"
            id="password"
            placeholder="••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label
            htmlFor="passwordConfirm"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Repita sua senha
          </label>
          <input
            type="password"
            id="passwordConfirm"
            placeholder="••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          type="submit"
          className="mt-4 transition text-white bg-purple-800 hover:bg-purple-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-3 text-center dark:bg-purple-800 dark:hover:bg-purple-600 dark:focus:ring-blue-800"
        >
          Registrar-se
        </button>

        <Link href="/pages/login">
          <div className="text-center text-white mt-4">Voltar para o Login</div>
        </Link>
      </form>
    </div>
  );
}
