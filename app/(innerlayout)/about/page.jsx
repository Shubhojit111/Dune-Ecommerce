"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import Assets from "@/assets/Assets";
import ExploreBtn from "@/components/buttons/ExploreBtn";
import AboutHeader from "@/components/AboutHeader";
import JournalSection from "@/components/JournalSection";
import HeaderBtn from "@/components/buttons/HeaderBtn";
import HeaderBtnSmall from "@/components/buttons/HeaderBtnSmall";

export default function AboutPage() {
  const [questionOpen, setQuestionOpen] = useState(false);

  const [askForm, setAskForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [askStatus, setAskStatus] = useState({
    type: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAskSubmit = async (e) => {
    e.preventDefault();

    setAskStatus({
      type: "",
      message: "",
    });

    const name = askForm.name.trim();
    const email = askForm.email.trim();
    const message = askForm.message.trim();

    if (!name || !email || !message) {
      setAskStatus({
        type: "error",
        message: "Please fill in all fields.",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setAskStatus({
        type: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setAskStatus({
        type: "success",
        message: "Your question has been sent successfully.",
      });

      setAskForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      setAskStatus({
        type: "error",
        message:
          error.message || "Unable to send your question. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="w-full">
      {/* ===== SECTION 1: Hero ===== */}
      <AboutHeader />

      {/* ===== SECTION 2: Contact ===== */}
      <section className="w-full border-t border-ink bg-[#fafafa] px-4 py-16 sm:px-8 sm:py-20 lg:px-14 lg:py-20">
        <div className="mx-auto w-full max-w-[950px] flex flex-col items-center justify-center">
         <HeaderBtnSmall text="CONTACT US" />

          <form onSubmit={handleAskSubmit} className="w-full mt-10">
            {/* NAME + EMAIL */}
            <div className="mb-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-3 block text-[11px] font-medium uppercase tracking-[0.25em] text-ink"
                >
                  Name
                </label>

                <input
                  id="contact-name"
                  type="text"
                  value={askForm.name}
                  onChange={(e) =>
                    setAskForm((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  autoComplete="name"
                  disabled={isSubmitting}
                  className="h-[48px] w-full border border-ink/20 bg-transparent px-3 text-[13px] text-ink outline-none transition-colors focus:border-ink/60 disabled:opacity-50"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-3 block text-[11px] font-medium uppercase tracking-[0.25em] text-ink"
                >
                  Email
                </label>

                <input
                  id="contact-email"
                  type="email"
                  value={askForm.email}
                  onChange={(e) =>
                    setAskForm((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  autoComplete="email"
                  disabled={isSubmitting}
                  className="h-[48px] w-full border border-ink/20 bg-transparent px-3 text-[13px] text-ink outline-none transition-colors focus:border-ink/60 disabled:opacity-50"
                />
              </div>
            </div>

            {/* MESSAGE */}
            <div className="mb-8">
              <label
                htmlFor="contact-message"
                className="mb-3 block text-[11px] font-medium uppercase tracking-[0.25em] text-ink"
              >
                Message
              </label>

              <textarea
                id="contact-message"
                value={askForm.message}
                onChange={(e) =>
                  setAskForm((prev) => ({
                    ...prev,
                    message: e.target.value,
                  }))
                }
                rows={6}
                disabled={isSubmitting}
                className="w-full resize-y border border-ink/20 bg-transparent px-3 py-3 text-[13px] text-ink outline-none transition-colors focus:border-ink/60 disabled:opacity-50"
              />
            </div>

            {/* STATUS */}
            {askStatus.message && (
              <p
                className={`mb-5 text-center text-[11px] ${
                  askStatus.type === "success"
                    ? "text-green-700"
                    : "text-red-600"
                }`}
              >
                {askStatus.message}
              </p>
            )}

            {/* SEND */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full bg-ink px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-white transition-opacity duration-300 hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? "SENDING" : "SEND"}
              </button>
            </div>

            {/* HCAPTCHA NOTICE */}
            <p className="mx-auto mt-8 max-w-[700px] text-center text-[10.5px] leading-relaxed text-ink/60">
              This site is protected by hCaptcha and the hCaptcha Privacy Policy
              and Terms of Service apply.
            </p>
          </form>
        </div>
      </section>

    </main>
  );
}
