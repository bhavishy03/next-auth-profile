"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // States for Editing
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    const userImage = localStorage.getItem("profileImage");

    if (!token || !userData) {
      router.push("/login");
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    setFirstName(parsedUser.firstName);
    setLastName(parsedUser.lastName);
    setEmail(parsedUser.email);
    setAge(parsedUser.age);

    if (userImage) setProfileImage(userImage);
  }, [router]);

  const handleSave = () => {
    const updatedUser = { ...user, firstName, lastName, email, age };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setIsEditing(false);
  };

  if (!user) return <div className="min-h-screen bg-slate-50 animate-pulse" />;

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 md:p-10 font-sans">
      {/* Main Container */}
      <div className="max-w-4xl w-full bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] border border-white">
        
        {/* Left Side: Profile Identity (Dark Section) */}
        <div className="w-full md:w-5/12 bg-slate-900 relative flex flex-col items-center justify-center p-12 text-center text-white">
          <div className="absolute inset-0 opacity-40">
            <img 
              src="/images/background.jpg" 
              className="w-full h-full object-cover" 
              alt="Space background"
            />
          </div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="relative mb-6">
              <img
                src={profileImage || "https://i.pravatar.cc/150"}
                className="w-44 h-44 rounded-[2.5rem] border-[6px] border-white/20 object-cover shadow-2xl backdrop-blur-md"
                alt="Bhavish"
              />
              <label className="absolute -bottom-2 -right-2 bg-white p-3 rounded-2xl shadow-xl cursor-pointer hover:scale-110 transition-transform">
                <span className="text-xl">📸</span>
                <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setProfileImage(reader.result as string);
                      localStorage.setItem("profileImage", reader.result as string);
                    };
                    reader.readAsDataURL(file);
                  }
                }} />
              </label>
            </div>
            
            <h1 className="text-3xl font-black tracking-tight">{user.firstName} {user.lastName}</h1>
            
          </div>
        </div>

        {/* Right Side: Information Details */}
        <div className="w-full md:w-7/12 p-10 md:p-16 flex flex-col justify-center">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tighter">Account Details</h2>
              <p className="text-slate-400 text-sm font-medium mt-1">Manage your personal information</p>
            </div>
          </div>

          <div className="space-y-8">
            {isEditing ? (
              <div className="grid grid-cols-1 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Full Name</label>
                  <div className="flex gap-4">
                    <input className="w-1/2 px-6 py-4 bg-slate-50 border border-slate-100 rounded-full text-slate-900 font-bold outline-none focus:ring-4 focus:ring-slate-100" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    <input className="w-1/2 px-6 py-4 bg-slate-50 border border-slate-100 rounded-full text-slate-900 font-bold outline-none focus:ring-4 focus:ring-slate-100" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Email Address</label>
                  <input className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-full text-slate-900 font-bold outline-none focus:ring-4 focus:ring-slate-100" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 divide-y divide-slate-100">
                <div className="py-4 flex justify-between items-center group">
                  <span className="text-slate-400 text-xs font-black uppercase tracking-widest">Email Address</span>
                  <span className="text-slate-900 font-bold text-lg">{user.email}</span>
                </div>
                <div className="py-4 flex justify-between items-center group">
                  <span className="text-slate-400 text-xs font-black uppercase tracking-widest">Current Age</span>
                  <span className="text-slate-900 font-bold text-lg">{user.age} Years</span>
                </div>
                <div className="py-4 flex justify-between items-center group">
                  <span className="text-slate-400 text-xs font-black uppercase tracking-widest">Date of Birth</span>
                  <span className="text-slate-900 font-bold text-lg">{user.dob}</span>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4 pt-6">
              {isEditing ? (
                <button onClick={handleSave} className="flex-1 py-5 bg-slate-900 text-white font-black rounded-full shadow-2xl hover:bg-black transition-all active:scale-95">
                  Save Changes
                </button>
              ) : (
                <button onClick={() => setIsEditing(true)} className="flex-1 py-5 bg-slate-900 text-white font-black rounded-full shadow-2xl hover:bg-black transition-all active:scale-95">
                  Edit Profile
                </button>
              )}
              <button onClick={() => { localStorage.clear(); router.push("/login"); }} className="px-10 py-5 border-2 border-slate-200 text-slate-900 font-black rounded-full hover:bg-slate-50 transition-all active:scale-95">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}