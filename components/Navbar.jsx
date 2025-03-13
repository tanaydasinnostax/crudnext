"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <nav className="bg-[#525151] p-4 shadow-md fixed top-0 w-full">
      <div className="w-full max-w-screen mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Expense Manager</h1>
        <div className="flex items-center space-x-6">
          
          {isAuthenticated ? (
            <>
              <Link href="/dashboard/expenses">
                <span className="text-white hover:text-blue-500 cursor-pointer">Expenses</span>
              </Link>
              <Link href="/dashboard/profile">
                <span className="text-white hover:text-blue-500 cursor-pointer">Profile</span>
              </Link>
              <LogoutButton />    
            </>        
          ) : (
            <Link
              href="/auth/login"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
