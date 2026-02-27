"use client";

import { useEffect, useState } from "react";
import FogBackground from "@/app/animations/animation1";

// ─── Rotating phrases ──────────────────────────────────────────────────────
const phrases = [
  "Financial Planning",
  "Tax Optimization",
  "Smart Savings",
  "Compliance Made Easy",
];

// ─── Finance / corporate images (Unsplash – reliable, no CORS) ────────────
const images = [
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=60",   // tax paperwork
  "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=800&q=60", // office team
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=60", // analytics screen
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=60", // accountant desk
  "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=60", // finance meeting
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=60",   // signing documents
];

// Triplicate so the seam never shows during the loop
const allImages = [...images, ...images, ...images];

// Alternate widths so the collage feels uneven (like editorial layouts)
const widths = [420, 320, 480, 360, 400, 340];


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
    <>
      {/* ── CSS keyframe named "animation1" for the image strip ── */}
      <style>{`
        @keyframes animation1 {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .collage-strip {
          display: flex;
          align-items: stretch;
          width: max-content;
          height: 100%;
          animation: animation1 42s linear infinite;
          will-change: transform;
        }
        .collage-strip:hover {
          animation-play-state: running;
        }
      `}</style>

      <section
        className="relative min-h-screen flex items-center text-white overflow-hidden"
        style={{ background: "#08121f" }}
      >
        {/* ════════════════════════════════════════════════
            LAYER 1 — Animated image collage grid
        ════════════════════════════════════════════════ */}
        <div
          className="absolute inset-0 overflow-hidden"
          aria-hidden="true"
          style={{ zIndex: 0 }}
        >
          <div className="collage-strip" style={{ opacity: 0.38 }}>
            {allImages.map((src, i) => (
              <div
                key={i}
                className="relative flex-shrink-0 h-screen"
                style={{ width: `${widths[i % widths.length]}px` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover"
                  style={{
                    filter:
                      "grayscale(35%) brightness(0.6) contrast(0.88) saturate(0.8)",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ════════════════════════════════════════════════
            LAYER 2 — animation1 (Vanta fog) composited
            on top of the image strip at low opacity
        ════════════════════════════════════════════════ */}
        <div
          className="absolute inset-0"
          style={{ zIndex: 1, opacity: 0.55, mixBlendMode: "screen" }}
        >
          <FogBackground />
        </div>

        {/* ════════════════════════════════════════════════
            LAYER 3 — Gradient overlays
        ════════════════════════════════════════════════ */}
        {/* Dark blue vertical gradient — top & bottom burnin */}
        <div
          className="absolute inset-0"
          style={{
            zIndex: 2,
            background:
              "linear-gradient(to bottom, rgba(8,18,31,0.80) 0%, rgba(8,18,31,0.45) 40%, rgba(8,18,31,0.45) 60%, rgba(8,18,31,0.88) 100%)",
          }}
        />
        {/* Blue-gray diagonal wash */}
        <div
          className="absolute inset-0"
          style={{
            zIndex: 2,
            background:
              "linear-gradient(125deg, rgba(15,40,90,0.55) 0%, rgba(30,60,110,0.25) 50%, rgba(10,28,65,0.55) 100%)",
          }}
        />
        {/* Left fade to solid */}
        <div
          className="absolute inset-y-0 left-0 w-56"
          style={{
            zIndex: 2,
            background: "linear-gradient(to right, rgba(8,18,31,1) 0%, transparent 100%)",
          }}
        />
        {/* Right fade to solid */}
        <div
          className="absolute inset-y-0 right-0 w-56"
          style={{
            zIndex: 2,
            background: "linear-gradient(to left, rgba(8,18,31,1) 0%, transparent 100%)",
          }}
        />

        {/* ════════════════════════════════════════════════
            LAYER 4 — Hero content (fully static, above all)
        ════════════════════════════════════════════════ */}
        <div
          className="relative max-w-3xl mx-auto px-10 py-24"
          style={{ zIndex: 10 }}
        >
          {/* Badge */}
          <span
            className="inline-block mb-6 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full border"
            style={{
              borderColor: "rgba(140,180,255,0.28)",
              backgroundColor: "rgba(60,110,200,0.12)",
              color: "rgba(175,210,255,0.82)",
              letterSpacing: "0.17em",
            }}
          >
            Financial Planning &amp; Tax Management
          </span>

          {/* Main heading */}
          <h1
            className="font-bold tracking-tight leading-none mb-5"
            style={{
              fontSize: "clamp(3rem, 7vw, 5.5rem)",
              color: "#ffffff",
              textShadow: "0 4px 40px rgba(0,0,0,0.45)",
            }}
          >
            Tax Planner
          </h1>

          {/* Supporting copy */}
          <p
            className="mb-7 text-base"
            style={{
              color: "rgba(185,212,255,0.72)",
              maxWidth: "460px",
              lineHeight: "1.75",
            }}
          >
            Stay ahead of deadlines. Plan your taxes with confidence.
          </p>

          {/* Rotating phrase row */}
          <div className="flex items-center gap-3 mb-12" style={{ minHeight: "2.5rem" }}>
            <span
              className="text-xl select-none"
              style={{ color: "rgba(120,180,255,0.95)" }}
            >
              →
            </span>
            <p
              style={{
                fontSize: "1.15rem",
                fontWeight: 500,
                color: "rgba(205,228,255,0.93)",
                letterSpacing: "0.015em",
                transition: "opacity 0.42s ease, transform 0.42s ease",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(-8px)",
                willChange: "opacity, transform",
              }}
            >
              {phrases[index]}
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <button
              className="px-8 py-3.5 rounded-lg font-semibold text-sm tracking-wide"
              style={{
                background: "#ffffff",
                color: "#122044",
                boxShadow: "0 6px 28px rgba(0,0,0,0.28)",
                transition: "box-shadow 0.2s, transform 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 10px 36px rgba(0,0,0,0.38)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 6px 28px rgba(0,0,0,0.28)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Get Started Free
            </button>
            <button
              className="px-8 py-3.5 rounded-lg font-semibold text-sm tracking-wide"
              style={{
                background: "rgba(255,255,255,0.06)",
                color: "rgba(205,228,255,0.92)",
                border: "1px solid rgba(130,175,255,0.22)",
                transition: "background 0.2s, transform 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                e.currentTarget.style.transform = "translateY(-1px)";
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
    </>
  );
}
