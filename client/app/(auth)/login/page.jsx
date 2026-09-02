"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password, rememberMe });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 pt-[220px] pb-20 bg-cream">
      <div className="w-full max-w-[420px] bg-[#FBF9F5] border border-[#E8E1D5] shadow-sm px-8 sm:px-10 py-12">
        {/* Eyebrow */}
        <p className="text-center text-[11px] font-semibold tracking-[0.2em] uppercase text-camel mb-4">
          Welcome Back
        </p>

        {/* Heading */}
        <h1 className="text-center text-[36px] sm:text-[40px] font-dune text-ink leading-tight mb-2">
          Log in
        </h1>

        {/* Subtext */}
        <p className="text-center text-[13px] text-ink/50 mb-8">
          New to DUNE?{" "}
          <Link
            href="/register"
            className="underline font-medium text-camel hover:opacity-70 transition-opacity"
          >
            Create an account
          </Link>
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-[11px] font-semibold tracking-[0.1em] uppercase mb-2 text-ink/50"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/30 pointer-events-none"
              />
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 text-[14px] outline-none transition-colors bg-white border border-[#D8D0C0] text-ink focus:border-camel placeholder:text-ink/30"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-[11px] font-semibold tracking-[0.1em] uppercase mb-2 text-ink/50"
            >
              Password
            </label>
            <div className="relative">
              <Lock
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/30 pointer-events-none"
              />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-10 pr-10 py-3 text-[14px] outline-none transition-colors bg-white border border-[#D8D0C0] text-ink focus:border-camel placeholder:text-ink/30"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/30 hover:text-ink/70 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Forgot password + Remember me row */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-3.5 h-3.5 cursor-pointer accent-ink"
              />
              <span className="text-[13px] text-ink/60">Remember me</span>
            </label>
            <button
              type="button"
              className="text-[13px] font-medium text-camel underline hover:opacity-70 transition-opacity"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3.5 text-[13px] font-semibold tracking-[0.1em] uppercase transition-all hover:opacity-90 bg-ink text-white mt-2"
          >
            Log in
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-7">
          <div className="flex-1 h-px bg-[#E0D8C8]" />
          <span className="px-4 text-[11px] tracking-wide text-ink/40 uppercase">
            Or
          </span>
          <div className="flex-1 h-px bg-[#E0D8C8]" />
        </div>

        {/* Social buttons */}
        <div className="flex flex-col gap-3">
          <button
            type="button"
            className="w-full py-3 text-[13px] font-medium flex items-center justify-center gap-2.5 transition-colors hover:bg-stone-50 bg-white border border-[#D8D0C0] text-ink"
          >
            <Icon icon="fa6-brands:google" className="h-[18px] w-[18px]" />
            Continue with Google
          </button>
          <button
            type="button"
            className="w-full py-3 text-[13px] font-medium flex items-center justify-center gap-2.5 transition-colors hover:bg-stone-50 bg-white border border-[#D8D0C0] text-ink"
          >
            <Icon icon="fa6-brands:apple" className="h-[18px] w-[18px]" />
            Continue with Apple
          </button>
        </div>
      </div>
    </div>
  );
}