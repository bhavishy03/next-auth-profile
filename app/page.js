"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center space-y-8 transform transition-all hover:scale-[1.01]">
        
        {/* Header Section */}
        <div className="space-y-3">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Auth App <span className="animate-pulse">🚀</span>
          </h1>
          <p className="text-slate-500 text-sm">
            A seamless Login · Signup · Profile experience built with Next.js
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4">
          {!isLoggedIn ? (
            <>
              <button
                onClick={() => router.push("/login")}
                className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-200 active:scale-95"
              >
                Login to Account
              </button>

              <button
                onClick={() => router.push("/signup")}
                className="w-full py-3 px-6 bg-white border-2 border-slate-200 hover:border-blue-600 hover:text-blue-600 text-slate-700 font-semibold rounded-xl transition-all duration-200 active:scale-95"
              >
                Create New Account
              </button>
            </>
          ) : (
            <>
              <div className="p-4 bg-green-50 border border-green-100 rounded-xl">
                <p className="text-green-700 font-medium text-sm">
                  You are currently logged in! ✅
                </p>
              </div>
              
              <button
                onClick={() => {
                  localStorage.clear();
                  setIsLoggedIn(false);
                }}
                className="w-full py-3 px-6 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-red-200 active:scale-95"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Footer info */}
        <div className="pt-4 border-t border-slate-100">
          <p className="text-xs text-slate-400 uppercase tracking-widest font-medium">
            Secure Authentication System
          </p>
        </div>
      </div>
    </div>
  );
}