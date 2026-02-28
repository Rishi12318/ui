"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import accountBalanceAnim from "@/public/account-balance.json";
import FogBackground from "@/components/FogBackground";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: "easeOut", delay },
  },
});

const phrases = [
  "Simplify your tax filing.",
  "Maximize your deductions.",
  "Plan smarter, save more.",
  "Stay ahead of deadlines.",
  "Clarity in every calculation.",
];

export default function HeroSection() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out + slide up
      setVisible(false);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % phrases.length);
        // Fade in + slide down to position
        setVisible(true);
      }, 400); // matches transition duration
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center text-white">
      <FogBackground />

      {/* Two-column layout: text left, animation right */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-10 py-20 flex items-center gap-12">

        {/* ── Left: text content ── */}
        <div className="flex-1 min-w-0">
        {/* Badge */}
        <motion.span
          className="inline-block mb-6 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full border"
          style={{
            borderColor: "rgba(255,255,255,0.25)",
            backgroundColor: "rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.75)",
            letterSpacing: "0.18em",
            fontFamily: "var(--font-nunito), sans-serif",
            fontStyle: "italic",
          }}
          variants={fadeUp(0)}
          initial="hidden"
          animate="visible"
        >
          Financial Planning &amp; Tax Management
        </motion.span>

        {/* Outlined heading - hollow stroke style */}
        <motion.h1
          variants={fadeUp(0.2)}
          initial="hidden"
          animate="visible"
          style={{
            fontFamily: "var(--font-nunito), sans-serif",
            fontSize: "clamp(4rem, 10vw, 7.5rem)",
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: "-0.02em",
            color: "transparent",
            WebkitTextStroke: "2.5px rgba(255,255,255,0.92)",
            marginBottom: "1.5rem",
          }}
        >
          Tax Planner
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          variants={fadeUp(0.4)}
          initial="hidden"
          animate="visible"
          style={{
            fontFamily: "var(--font-nunito), sans-serif",
            fontSize: "1.15rem",
            fontWeight: 700,
            fontStyle: "italic",
            color: "rgba(255,255,255,0.88)",
            letterSpacing: "0.01em",
            marginBottom: "1.25rem",
          }}
        >
          Stay ahead of deadlines. Plan your taxes with confidence.
        </motion.p>

        {/* Cycling phrase */}
        <motion.div
          className="flex items-center gap-3 min-h-[2.5rem]"
          variants={fadeUp(0.55)}
          initial="hidden"
          animate="visible"
        >
          <span style={{ color: "rgba(180,210,255,0.9)", fontSize: "1.4rem" }}>&#8594;</span>
          <p
            style={{
              fontFamily: "var(--font-nunito), sans-serif",
              fontSize: "1.1rem",
              fontWeight: 400,
              fontStyle: "italic",
              color: "rgba(220,235,255,0.92)",
              transition: "opacity 0.4s ease, transform 0.4s ease",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0px)" : "translateY(-8px)",
              willChange: "opacity, transform",
            }}
          >
            {phrases[index]}
          </p>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-wrap gap-4 mt-12"
          variants={fadeUp(0.7)}
          initial="hidden"
          animate="visible"
        >
          <button
            className="px-8 py-3 font-semibold text-sm tracking-wide transition-all duration-200"
            onClick={() => router.push("/get-started")}
            style={{
              background: "rgba(255,255,255,0.95)",
              color: "#2a4a6e",
              fontFamily: "var(--font-nunito), sans-serif",
              fontStyle: "italic",
              borderRadius: "999px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#ffffff")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.95)")
            }
          >
            Get Started Free
          </button>
          <button
            className="px-8 py-3 rounded-lg font-semibold text-sm tracking-wide transition-all duration-200"
            onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              background: "rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.9)",
              border: "1px solid rgba(255,255,255,0.2)",
              fontFamily: "var(--font-nunito), sans-serif",
              fontStyle: "italic",
              cursor: "pointer",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.14)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.08)")
            }
          >
            See How It Works
          </button>
        </motion.div>
        </div>{/* end left column */}

        {/* ── Right: Lottie animation ── */}
        <motion.div
          className="hidden md:flex flex-shrink-0 items-center justify-center"
          variants={fadeUp(0.5)}
          initial="hidden"
          animate="visible"
          style={{ width: "700px" }}
        >
          <Lottie
            animationData={accountBalanceAnim}
            loop
            style={{
              width: "100%",
              filter: "brightness(0) invert(1) opacity(0.88)",
            }}
          />
        </motion.div>

      </div>{/* end two-column wrapper */}
    </div>
  );
}
