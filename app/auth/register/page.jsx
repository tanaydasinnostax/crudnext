"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const[username,setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister =  (e) => {
    e.preventDefault();
      api.post("/UserService/register", { username,email, password })
      .then(()=>{
        toast.success("Registration successfull");
        router.push("/auth/login");
      })
      .catch((err)=>{
        toast.error("User already exist.Register first");
        setError("Registration failed",err);
      })
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-[#525151] p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-white mb-6">Register</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="string"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 rounded-md border border-orange-100 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            Register
          </button>
        </form>
        <p className="text-white text-center mt-4">
          Already have an account?{" "}
          <a href="/auth/login" className="text-[#e98901] hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
