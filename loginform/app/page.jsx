import LoginForm from "./components/loginform/LoginForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-slate-950">
      <LoginForm />
    </main>
  );
}
