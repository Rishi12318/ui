"use client";

import { useEffect, useState } from "react";

const phrases = [
  "Financial Planning",
  "Tax Optimization",
  "Smart Savings",
  "Compliance Made Easy",
];

// Fintech / tax-planning stock images
const images = [
  "https://media.istockphoto.com/id/1403453245/photo/the-financiers-are-calculating-personal-taxes-for-their-customers.jpg?s=612x612&w=0&k=20&c=B0pOXB8IH0TEMsF8ztFno6ZrpACRCFrmCdV2NNkw_gc=",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdA5yXUrVIM2W9S8VVoEKNq0G2TUNdAv56lg&s",
  "https://thumbs.dreamstime.com/b/image-shows-professional-accountant-tax-preparer-calculating-returns-calculator-computer-imagery-represents-415986676.jpg",
  "https://www.shutterstock.com/image-photo/paperwork-businesswoman-writing-data-spreadsheet-260nw-2567424375.jpg",
];
// Triplicate for a long seamless loop
const allImages = [...images, ...images, ...images];

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
          100% { transform: translateX(-33.333%); }
        }
        .image-strip {
          display: flex;
          width: max-content;
          animation: scrollStrip 32s linear infinite;
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
            style={{ opacity: 0.32 }}
          >
            {allImages.map((src, i) => (
              <div
                key={i}
                className="relative h-full flex-shrink-0"
                style={{ width: i % 2 === 0 ? "480px" : "380px" }}
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
