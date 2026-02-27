"use client";

import { useEffect, useState } from "react";

const phrases = [
  "Financial Planning",
  "Tax Optimization",
  "Smart Savings",
  "Compliance Made Easy",
];

// Professional fintech / office stock images (Unsplash)
const images = [
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=700&q=55",
  "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=700&q=55",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=55",
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&q=55",
  "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=700&q=55",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=55",
  "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=700&q=55",
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&q=55",
];
// Duplicate for seamless loop
const allImages = [...images, ...images];

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
      {/* Keyframe injection */}
      <style>{`
        @keyframes scrollStrip {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .image-strip {
          display: flex;
          width: max-content;
          animation: scrollStrip 38s linear infinite;
        }
      `}</style>

      <section
        className="relative min-h-screen flex items-center text-white overflow-hidden"
        style={{ background: "#0d1b2e" }}
      >
        {/* ── Image strip layer ── */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div
            className="image-strip h-full"
            style={{ opacity: 0.28 }}
          >
            {allImages.map((src, i) => (
              <div
                key={i}
                className="relative h-full flex-shrink-0"
                style={{ width: i % 3 === 1 ? "340px" : "260px" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt=""
                  className="h-full w-full object-cover"
                  style={{
                    filter: "grayscale(40%) brightness(0.65) contrast(0.9)",
                  }}
                />
              </div>
            ))}
          </div>

          {/* ── Gradient overlays ── */}
          {/* Base dark-blue tint over everything */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(13,27,46,0.72) 0%, rgba(13,27,46,0.55) 50%, rgba(13,27,46,0.80) 100%)",
            }}
          />
          {/* Left edge fade */}
          <div
            className="absolute inset-y-0 left-0 w-64"
            style={{
              background:
                "linear-gradient(to right, rgba(13,27,46,1) 0%, transparent 100%)",
            }}
          />
          {/* Right edge fade */}
          <div
            className="absolute inset-y-0 right-0 w-64"
            style={{
              background:
                "linear-gradient(to left, rgba(13,27,46,1) 0%, transparent 100%)",
            }}
          />
          {/* Blue-gray color wash */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(30,58,100,0.45) 0%, rgba(55,80,120,0.2) 50%, rgba(20,40,80,0.45) 100%)",
            }}
          />
        </div>

        {/* ── Hero content ── */}
        <div className="relative z-10 max-w-3xl mx-auto px-10 py-24">
          {/* Badge */}
          <span
            className="inline-block mb-6 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full border"
            style={{
              borderColor: "rgba(140,180,255,0.30)",
              backgroundColor: "rgba(80,130,220,0.12)",
              color: "rgba(180,210,255,0.80)",
              letterSpacing: "0.18em",
            }}
          >
            Financial Planning &amp; Tax Management
          </span>

          {/* Static heading */}
          <h1
            className="text-6xl md:text-7xl font-bold tracking-tight leading-none mb-6"
            style={{
              color: "#ffffff",
              textShadow: "0 2px 32px rgba(0,0,0,0.35)",
            }}
          >
            Tax Planner
          </h1>

          {/* Supporting sentence */}
          <p
            className="mb-8 text-base"
            style={{
              color: "rgba(190,215,255,0.75)",
              maxWidth: "480px",
              lineHeight: "1.7",
              letterSpacing: "0.01em",
            }}
          >
            Stay ahead of deadlines. Plan your taxes with confidence.
          </p>

          {/* Rotating phrase */}
          <div className="flex items-center gap-3 min-h-[2.5rem] mb-12">
            <span
              className="text-2xl select-none"
              style={{ color: "rgba(130,185,255,0.9)" }}
            >
              →
            </span>
            <p
              style={{
                fontSize: "1.2rem",
                fontWeight: 500,
                color: "rgba(210,230,255,0.92)",
                letterSpacing: "0.015em",
                transition: "opacity 0.42s ease, transform 0.42s ease",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0px)" : "translateY(-9px)",
                willChange: "opacity, transform",
              }}
            >
              {phrases[index]}
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              className="px-8 py-3.5 rounded-lg font-semibold text-sm tracking-wide transition-all duration-200"
              style={{
                background: "#ffffff",
                color: "#1a3558",
                boxShadow: "0 6px 24px rgba(0,0,0,0.22)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 8px 30px rgba(0,0,0,0.30)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 6px 24px rgba(0,0,0,0.22)")
              }
            >
              Get Started Free
            </button>
            <button
              className="px-8 py-3.5 rounded-lg font-semibold text-sm tracking-wide transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.07)",
                color: "rgba(210,230,255,0.92)",
                border: "1px solid rgba(140,180,255,0.25)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.13)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.07)")
              }
            >
              See How It Works
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
