"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ fullName, email, password, confirmPassword, agreeToTerms });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 pt-[220px] pb-20 bg-cream">
      <div className="w-full max-w-[420px] bg-[#FBF9F5] border border-[#E8E1D5] shadow-sm px-8 sm:px-10 py-12">
        {/* Eyebrow */}
        <p className="text-center text-[11px] font-semibold tracking-[0.2em] uppercase text-camel mb-4">
          Get Started
        </p>

        {/* Heading */}
        <h1 className="text-center text-[36px] sm:text-[40px] font-dune text-ink leading-tight mb-2">
          Create an account
        </h1>

        {/* Subtext */}
        <p className="text-center text-[13px] text-ink/50 mb-8">
          Already have an account?{" "}
          <Link
            href="/login"
            className="underline font-medium text-camel hover:opacity-70 transition-opacity"
          >
            Log in
          </Link>
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Full name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-[11px] font-semibold tracking-[0.1em] uppercase mb-2 text-ink/50"
            >
              Full Name
            </label>
            <div className="relative">
              <User
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/30 pointer-events-none"
              />
              <input
                id="fullName"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full pl-10 pr-4 py-3 text-[14px] outline-none transition-colors bg-white border border-[#D8D0C0] text-ink focus:border-camel placeholder:text-ink/30"
              />
            </div>
          </div>

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
                placeholder="Create a password"
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
            <p className="text-[12px] mt-2 text-ink/40">
              Must be at least 8 characters
            </p>
          </div>

          {/* Confirm password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-[11px] font-semibold tracking-[0.1em] uppercase mb-2 text-ink/50"
            >
              Confirm Password
            </label>
            <div className="relative">
              <Lock
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/30 pointer-events-none"
              />
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
                className="w-full pl-10 pr-10 py-3 text-[14px] outline-none transition-colors bg-white border border-[#D8D0C0] text-ink focus:border-camel placeholder:text-ink/30"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/30 hover:text-ink/70 transition-colors"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2">
            <input
              id="terms"
              type="checkbox"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              className="w-3.5 h-3.5 mt-0.5 cursor-pointer flex-shrink-0 accent-ink"
            />
            <label
              htmlFor="terms"
              className="text-[13px] cursor-pointer text-ink/60 leading-relaxed"
            >
              I agree to the{" "}
              <span className="underline font-medium text-camel">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="underline font-medium text-camel">
                Privacy Policy
              </span>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!agreeToTerms}
            className="w-full py-3.5 text-[13px] font-semibold tracking-[0.1em] uppercase transition-all bg-ink text-white disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 mt-2"
          >
            Create account
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