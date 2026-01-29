"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userData = localStorage.getItem("user");

    if (!userData) {
      alert("No user found. Please signup first.");
      return;
    }

    const storedUser = JSON.parse(userData);

    if (email !== storedUser.email || password !== storedUser.password) {
      alert("Invalid email or password");
      return;
    }

    // Mock API call simulation
    const response = await fetch("/api/login", { method: "POST" });
    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }

    localStorage.setItem("token", data.token);
    router.push("/profile");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
     
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-xl p-10 md:p-14 border border-slate-100">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">
            Welcome back!
          </h1>
          <p className="text-slate-400 text-sm font-medium">
            Simplify your workflow and boost your productivity.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-4">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@example.com"
             
              className="w-full px-7 py-4 bg-slate-50 border border-slate-100 rounded-full text-slate-900 font-semibold placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-50 focus:bg-white focus:border-blue-200 transition-all duration-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center px-4">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                Password
              </label>
              <button type="button" className="text-[11px] font-bold text-blue-600 hover:underline">
                Forgot?
              </button>
            </div>
            <div className="relative group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full px-7 py-4 bg-slate-50 border border-slate-100 rounded-full text-slate-900 font-semibold placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-50 focus:bg-white focus:border-blue-200 transition-all duration-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-5 bg-black text-white font-extrabold rounded-full hover:bg-zinc-800 transform transition-all shadow-lg shadow-zinc-200 active:scale-95 mt-4"
          >
            Login
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center mt-10">
          <p className="text-sm text-slate-400 font-medium">
            Not a member?{" "}
            <button
              onClick={() => router.push("/signup")}
              className="text-slate-900 font-bold hover:underline"
            >
              Register now
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}