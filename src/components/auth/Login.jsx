import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div
      className="min-h-screen flex overflow-hidden"
      style={{ backgroundColor: "#1E1F22" }}
    >
      {/* Left Side - Image Section */}
      <div className="flex-1 relative">
        <img
          src="/assets/gambar_exca.png"
          alt="gambar exca"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col justify-between p-8 z-10">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 relative">
              <img
                src="/logo_ais.png"
                alt="Triangle Logo"
                className="w-full h-full"
              />
            </div>
            <span className="text-white text-xl font-bold">FMS</span>
          </div>

          {/* Welcome Text */}
          <div className="text-white hidden md:block">
            <h1 className="text-5xl font-bold mb-2">Welcome to</h1>
            <h2 className="text-4xl font-bold">Fleet Management System</h2>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 right-0 w-64 h-64 opacity-20 z-10">
          <div className="w-full h-full border-4 border-white rounded-full"></div>
          <div className="absolute bottom-8 right-8 w-32 h-32 border-2 border-white rounded-full"></div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-96 p-8 flex flex-col justify-center relative">
        {/* Welcome Back */}
        <div className="mb-8">
          <h3 className="text-white text-3xl font-bold mb-1">Welcome</h3>
          <h3 className="text-white text-3xl font-bold">Back</h3>
        </div>

        {/* Login Form */}
        <div className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-lime-500 transition-colors"
              style={{ borderColor: email ? "#74CD25" : undefined }}
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-lime-500 transition-colors pr-12"
                style={{ borderColor: password ? "#74CD25" : undefined }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-lime-500 border-gray-600 rounded focus:ring-lime-500 focus:ring-2 bg-transparent"
                style={{ accentColor: "#74CD25" }}
              />
              <span className="text-white text-sm">Remember me</span>
            </label>
            <button className="text-white text-sm hover:text-lime-500 transition-colors">
              Forgot Password
            </button>
          </div>

          {/* Login Button */}
          <button
            className="w-full py-3 rounded-lg font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{ backgroundColor: "#74CD25" }}
            onClick={() => window.location.href = '/'}
          >
            Login
          </button>

          {/* Sign Up Link */}
          <div className="text-center">
            <span className="text-white">Don't have an account? </span>
            <button className="text-lime-500 hover:text-lime-400 transition-colors" onClick={() => window.location.href = '/register'}>
              Sign up
            </button>
          </div>
        </div>

        {/* Decorative Green Circle */}
        <div
          className="absolute -bottom-32 -right-32 w-64 h-64 rounded-full opacity-20 pointer-events-none"
          style={{ backgroundColor: "#74CD25" }}
        ></div>
        <div
          className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full opacity-10 pointer-events-none"
          style={{ backgroundColor: "#74CD25" }}
        ></div>
        <div
          className="absolute -bottom-16 -right-16 w-32 h-32 rounded-full opacity-30 pointer-events-none"
          style={{ backgroundColor: "#74CD25" }}
        ></div>
      </div>
    </div>
  );
}
