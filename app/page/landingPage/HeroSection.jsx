"use client";

import { useEffect, useState } from "react";
import ImageGridBackground from "@/components/ImageGridBackground";
import FogBackground from "@/app/animations/animation1";

// ─── Rotating phrases beneath the heading ─────────────────────────────────
const phrases = [
  "Compliance Made Easy",
  "Tax Optimization",
  "Smart Savings",
  "Financial Planning",
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % phrases.length);
        setVisible(true);
      }, 420);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center text-white overflow-hidden"
      style={{ background: "#06111d" }}
    >
      {/* ══════════════════════════════════════════════
          LAYER 1 — Animated image collage grid   z:0
          Powered by @keyframes animation1 (globals.css)
      ══════════════════════════════════════════════ */}
      <ImageGridBackground />

      {/* ══════════════════════════════════════════════
          LAYER 2 — Vanta fog  (animation1.jsx)   z:10
          Semi-transparent so images show beneath
      ══════════════════════════════════════════════ */}
      <div
        className="absolute inset-0"
        style={{ zIndex: 10, opacity: 0.60, pointerEvents: "none" }}
      >
        <FogBackground />
      </div>

      {/* ══════════════════════════════════════════════
          LAYER 3 — Dark blue gradient overlay    z:20
      ══════════════════════════════════════════════ */}
      {/* Top/bottom vertical burnin */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 20,
          pointerEvents: "none",
          background:
            "linear-gradient(to bottom, rgba(6,17,29,0.78) 0%, rgba(6,17,29,0.40) 35%, rgba(6,17,29,0.40) 65%, rgba(6,17,29,0.85) 100%)",
        }}
      />
      {/* Diagonal blue-gray tonal wash */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 20,
          pointerEvents: "none",
          background:
            "linear-gradient(130deg, rgba(12,35,80,0.52) 0%, rgba(20,50,100,0.20) 50%, rgba(8,24,60,0.52) 100%)",
        }}
      />
      {/* Left edge dissolve */}
      <div
        className="absolute inset-y-0 left-0"
        style={{
          zIndex: 20,
          width: "16rem",
          pointerEvents: "none",
          background: "linear-gradient(to right, rgba(6,17,29,1) 0%, transparent 100%)",
        }}
      />
      {/* Right edge dissolve */}
      <div
        className="absolute inset-y-0 right-0"
        style={{
          zIndex: 20,
          width: "16rem",
          pointerEvents: "none",
          background: "linear-gradient(to left, rgba(6,17,29,1) 0%, transparent 100%)",
        }}
      />

      {/* ══════════════════════════════════════════════
          LAYER 4 — Hero content (fully static)   z:30
      ══════════════════════════════════════════════ */}
      <div
        className="relative w-full max-w-4xl mx-auto px-10 py-28"
        style={{ zIndex: 30 }}
      >
        {/* Badge */}
        <span
          className="inline-block mb-7 text-xs font-semibold uppercase px-4 py-1.5 rounded-full border"
          style={{
            letterSpacing: "0.18em",
            borderColor: "rgba(130,175,255,0.28)",
            backgroundColor: "rgba(50,100,210,0.10)",
            color: "rgba(170,208,255,0.82)",
          }}
        >
          Financial Planning &amp; Tax Management
        </span>

        {/* H1 */}
        <h1
          className="font-bold tracking-tight leading-none mb-5"
          style={{
            fontSize: "clamp(3rem, 7.5vw, 5.75rem)",
            color: "#ffffff",
            textShadow: "0 4px 48px rgba(0,0,0,0.55)",
          }}
        >
          Tax Planner
        </h1>

        {/* Supporting line */}
        <p
          className="mb-7"
          style={{
            fontSize: "1rem",
            color: "rgba(180,212,255,0.72)",
            maxWidth: "440px",
            lineHeight: "1.8",
          }}
        >
          Stay ahead of deadlines. Plan your taxes with confidence.
        </p>

        {/* Rotating arrow phrase */}
        <div
          className="flex items-center gap-3 mb-12"
          style={{ minHeight: "2.25rem" }}
        >
          <span style={{ fontSize: "1.25rem", color: "rgba(110,175,255,0.95)" }}>
            →
          </span>
          <p
            style={{
              fontSize: "1.15rem",
              fontWeight: 500,
              color: "rgba(200,228,255,0.93)",
              letterSpacing: "0.01em",
              transition: "opacity 0.42s ease, transform 0.42s ease",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(-8px)",
              willChange: "opacity, transform",
            }}
          >
            {phrases[index]}
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-4">
          <button
            className="px-8 py-3.5 rounded-lg font-semibold text-sm"
            style={{
              background: "#ffffff",
              color: "#0f2244",
              letterSpacing: "0.02em",
              boxShadow: "0 6px 30px rgba(0,0,0,0.30)",
              transition: "box-shadow 0.18s ease, transform 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 10px 40px rgba(0,0,0,0.42)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 6px 30px rgba(0,0,0,0.30)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Get Started Free
          </button>

          <button
            className="px-8 py-3.5 rounded-lg font-semibold text-sm"
            style={{
              background: "rgba(255,255,255,0.06)",
              color: "rgba(200,228,255,0.90)",
              border: "1px solid rgba(120,170,255,0.22)",
              letterSpacing: "0.02em",
              transition: "background 0.18s ease, transform 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.12)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.06)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            See How It Works
          </button>
        </div>
      </div>
    </section>
  );
}
