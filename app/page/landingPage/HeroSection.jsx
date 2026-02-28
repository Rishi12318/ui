"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Lottie must be client-only (no SSR)
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

import taxBgData from "@/public/Tax-MSM.json";
import carTaxData from "@/public/car-tax.json";

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
    <div
      className="relative min-h-screen flex items-center text-white overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0d1b2a 0%, #1a2e45 60%, #0f2236 100%)" }}
    >
      {/* ── Tax-MSM background Lottie — fades in and out on loop ── */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1, pointerEvents: "none" }}
        animate={{ opacity: [0, 0.18, 0.22, 0.18, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Lottie
          animationData={taxBgData}
          loop
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </motion.div>

      {/* slight dark scrim so text stays readable */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(10,22,36,0.55)", zIndex: 2, pointerEvents: "none" }}
      />

      {/* ── Car-tax decorative Lottie — right side ── */}
      <div
        className="absolute right-0 bottom-0 hidden md:block"
        style={{
          width: "min(520px, 45vw)",
          zIndex: 3,
          pointerEvents: "none",
          opacity: 0.85,
        }}
      >
        <Lottie animationData={carTaxData} loop />
      </div>

      {/* ── Content ── */}
      <div className="relative max-w-3xl mx-auto px-10 py-20" style={{ zIndex: 4 }}>
        {/* Badge */}
        <motion.span
          className="inline-block mb-6 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full border"
          style={{
            borderColor: "rgba(255,255,255,0.25)",
            backgroundColor: "rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.75)",
            letterSpacing: "0.18em",
            fontFamily: "var(--font-nunito), sans-serif",
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
            className="px-8 py-3 rounded-lg font-semibold text-sm tracking-wide transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.95)",
              color: "#2a4a6e",
              fontFamily: "var(--font-nunito), sans-serif",
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
            style={{
              background: "rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.9)",
              border: "1px solid rgba(255,255,255,0.2)",
              fontFamily: "var(--font-nunito), sans-serif",
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
      </div>
    </div>
  );
}
