"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [age, setAge] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || !age || !dob || !email || !password) {
      alert("All fields are required");
      return;
    }

    const userData = { firstName, lastName, age, dob, email, password };
    localStorage.setItem("user", JSON.stringify(userData));

    alert("Signup successful! Please login.");
    router.push("/login");
  };

  return (
   
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8">
      
      <div className="max-w-5xl w-full bg-white rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[92vh]">
        
        <div className="hidden md:block md:w-5/12 relative overflow-hidden">
          <img 
            src="/images/earth-space.jpg" 
            alt="Earth from Space" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          <div className="absolute inset-0 bg-black/30"></div>
          
          <div className="absolute bottom-12 left-10 text-white z-10 pr-6">
             <p className="text-xs font-bold tracking-widest uppercase opacity-80 mb-2 drop-shadow-md">
               Join Our Universe
             </p>
             <h2 className="text-4xl font-black leading-tight drop-shadow-lg">
               Start your <br /> journey today.
             </h2>
          </div>
        </div>

       
        <div className="w-full md:w-7/12 p-8 md:p-14 overflow-y-auto flex flex-col">
          
          <div className="mb-10 pt-2">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
              Create Account
            </h1>
            <p className="text-slate-400 text-sm font-medium">
              Please fill in your details to get started.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-4">First Name</label>
                <input
                  type="text" placeholder="First Name"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-full text-slate-900 font-semibold placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-50 focus:bg-white transition-all"
                  value={firstName}
                  onChange={(e) => setfirstName(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-4">Last Name</label>
                <input
                  type="text" placeholder="Last Name"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-full text-slate-900 font-semibold placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-50 focus:bg-white transition-all"
                  value={lastName}
                  onChange={(e) => setlastName(e.target.value)}
                />
              </div>
            </div>

            {/* Age & DOB Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-4">Age</label>
                <input
                  type="number" placeholder="Age"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-full text-slate-900 font-semibold placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-50 focus:bg-white transition-all"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-4">Date of Birth</label>
                <input
                  type="date"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-full text-slate-900 font-semibold focus:outline-none focus:ring-4 focus:ring-blue-50 focus:bg-white transition-all"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-4">Email Address</label>
              <input
                type="email" placeholder="gmail@.com"
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-full text-slate-900 font-semibold placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-50 focus:bg-white transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="space-y-1">
  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-4">
    Password
  </label>
  
  <div className="relative group">
    <input
      type={showPassword ? "text" : "password"} 
      placeholder="••••••••"
      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-full text-slate-900 font-semibold placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-50 focus:bg-white transition-all"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
    >
      {showPassword ? (
        <span>🙈</span>
      ) : (
        <span>👁️</span> 
       )}
        </button>
        </div>
      </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-5 bg-black text-white font-extrabold rounded-full hover:bg-zinc-800 transition-all shadow-xl shadow-slate-200 active:scale-95 mt-6"
            >
              Register Now
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-400 font-medium">
            Already have an account?{" "}
            <button
              onClick={() => router.push("/login")}
              className="text-slate-900 font-bold hover:underline"
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
