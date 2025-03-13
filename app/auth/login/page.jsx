"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { toast } from 'react-hot-toast';

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    api.post("/auth/login", { username, password })
    .then((response)=>{
      localStorage.setItem("token",response.data.token);
      toast.success("Login Successfull");4
      router.push("/dashboard/expenses");
    })
    .catch((err)=>{
      toast.error("Invalid credentials");
      setError("Invalid credentials");
    })
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-[#525151] p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-white mb-6">Login</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 rounded-md border border-orange-100 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-md border border-orange-100 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-[#e98901] text-white p-3 rounded-md hover:bg-[#FF990A] font-semibold shadow-md"
          >
            Login
          </button>
        </form>
        <p className="text-white text-center mt-4">
          Don't have an account?{" "}
          <a href="/auth/register" className="text-[#e98901] hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
