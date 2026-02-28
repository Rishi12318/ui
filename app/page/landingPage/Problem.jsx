"use client";

import { useEffect, useState } from "react";

const problems = [
  {
    title: "Complex Tax Slabs",
    desc: "Navigating old vs. new regime, surcharges, and cess calculations is overwhelming without expert guidance.",
  },
  {
    title: "Missed Refunds",
    desc: "Thousands of rupees in eligible deductions go unclaimed every year — simply because most people don't know what they qualify for.",
  },
  {
    title: "Confusing Salary Structures",
    desc: "HRA, LTA, PF, gratuity — decoding your CTC and optimising each component for tax efficiency is rarely straightforward.",
  },
  {
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
          filter: "brightness(0.75) saturate(0.85)",
          transform: "scale(1.03)",
        }}
      />

      {/* Subtle dark overlay so text stays readable */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.42)" }}
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

        {/* Cycling pain-point — plain text only, no box */}
        <div
          style={{
            transition: "opacity 0.6s ease, transform 0.6s ease",
            opacity: phase === "in" ? 1 : 0,
            transform: phase === "in" ? "translateY(0px)" : "translateY(14px)",
            willChange: "opacity, transform",
          }}
        >
          <h3
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "#ffffff", textShadow: "0 2px 20px rgba(0,0,0,0.6)" }}
          >
            {current.title}
          </h3>
          <p
            className="text-lg font-medium leading-relaxed mx-auto"
            style={{ color: "rgba(230,240,255,0.85)", maxWidth: "520px", textShadow: "0 1px 12px rgba(0,0,0,0.5)" }}
          >
            {current.desc}
          </p>
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
