"use client";

import { useEffect, useState } from "react";

const problems = [
  {
    icon: "⚖️",
    title: "Complex Tax Slabs",
    desc: "Navigating old vs. new regime, surcharges, and cess calculations is overwhelming without expert guidance.",
  },
  {
    icon: "💸",
    title: "Missed Refunds",
    desc: "Thousands of rupees in eligible deductions go unclaimed every year — simply because most people don't know what they qualify for.",
  },
  {
    icon: "🗂️",
    title: "Confusing Salary Structures",
    desc: "HRA, LTA, PF, gratuity — decoding your CTC and optimising each component for tax efficiency is rarely straightforward.",
  },
  {
    icon: "⏰",
    title: "Deadline Stress",
    desc: "Last-minute filings lead to errors, penalties, and missed opportunities. The pressure builds every July.",
  },
];

export default function Problem() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState("in"); // "in" | "out"

  useEffect(() => {
    // Each card: 2.6s visible → 0.6s fade out → swap → fade in
    let fadeOut;
    let next;

    const cycle = () => {
      // Stay visible for 2600ms then fade out
      fadeOut = setTimeout(() => {
        setPhase("out");
        // After fade-out duration (600ms), advance index and fade back in
        next = setTimeout(() => {
          setIndex((prev) => (prev + 1) % problems.length);
          setPhase("in");
        }, 600);
      }, 2600);
    };

    cycle();
    const interval = setInterval(cycle, 3200); // 2600 + 600

    return () => {
      clearTimeout(fadeOut);
      clearTimeout(next);
      clearInterval(interval);
    };
  }, []);

  const current = problems[index];

  return (
    <section className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center">

      {/* ── Full-bleed background image ── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://www.constructionspecifier.com/wp-content/uploads/2023/10/The-Spiral-BIG-foreshortened-bottom-to-top-view.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          filter: "grayscale(30%) brightness(0.38) saturate(0.5)",
          transform: "scale(1.03)",
        }}
      />

      {/* Dark blue gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,12,30,0.70) 0%, rgba(8,18,45,0.60) 50%, rgba(5,12,30,0.80) 100%)",
        }}
      />
      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(4,10,28,0.75) 100%)",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl w-full">

        {/* Badge */}
        <span
          className="inline-block mb-8 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full"
          style={{
            background: "rgba(220,50,50,0.12)",
            border: "1px solid rgba(220,80,80,0.28)",
            color: "rgba(255,160,160,0.85)",
            letterSpacing: "0.18em",
          }}
        >
          The Problem
        </span>

        {/* Static headline */}
        <h2
          className="text-4xl md:text-5xl font-bold leading-tight mb-4"
          style={{ color: "#ffffff", textShadow: "0 2px 32px rgba(0,0,0,0.5)" }}
        >
          Stressed about{" "}
          <span style={{ color: "#7aaaff" }}>Tax Filing?</span>
        </h2>
        <p
          className="text-sm mb-16"
          style={{ color: "rgba(180,205,255,0.60)", lineHeight: "1.75", maxWidth: "440px" }}
        >
          Most salaried individuals lose money and peace of mind every filing season — not because they're careless, but because the system is genuinely complicated.
        </p>

        {/* Cycling pain-point card */}
        <div
          style={{
            transition: "opacity 0.6s ease, transform 0.6s ease",
            opacity: phase === "in" ? 1 : 0,
            transform: phase === "in" ? "translateY(0px)" : "translateY(14px)",
            willChange: "opacity, transform",
            width: "100%",
          }}
        >
          <div
            className="rounded-2xl px-8 py-8 mx-auto"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(100,160,255,0.18)",
              backdropFilter: "blur(12px)",
              maxWidth: "480px",
            }}
          >
            <div className="text-4xl mb-4">{current.icon}</div>
            <h3
              className="text-xl font-semibold mb-3"
              style={{ color: "#ddeeff" }}
            >
              {current.title}
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "rgba(180,210,255,0.70)" }}
            >
              {current.desc}
            </p>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex gap-2 mt-10">
          {problems.map((_, i) => (
            <button
              key={i}
              onClick={() => { setPhase("out"); setTimeout(() => { setIndex(i); setPhase("in"); }, 300); }}
              style={{
                width: i === index ? "24px" : "8px",
                height: "8px",
                borderRadius: "4px",
                background: i === index ? "rgba(122,170,255,0.9)" : "rgba(255,255,255,0.25)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.4s ease",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
