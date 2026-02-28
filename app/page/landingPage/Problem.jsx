"use client";

import { useEffect, useRef, useState } from "react";

const problems = [
  {
    icon: "📊",
    title: "Complex Tax Slabs",
    desc: "Navigating India's layered income-tax slabs and surcharges is exhausting — and one wrong bracket can cost you thousands.",
  },
  {
    icon: "💸",
    title: "Missed Refunds",
    desc: "Most taxpayers leave money on the table without realising it. Unclaimed deductions under 80C, 80D, and HRA add up fast.",
  },
  {
    icon: "🗂️",
    title: "Confusing Salary Structures",
    desc: "Allowances, perks, and variable pay are taxed differently. Without clarity, you're likely over-paying every month.",
  },
  {
    icon: "⏰",
    title: "Deadline Stress",
    desc: "ITR deadlines, advance-tax dates, and Form 16 submissions pile up. Missing one triggers penalties and sleepless nights.",
  },
];

function ProblemCard({ icon, title, desc, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transition: `opacity 0.65s ease ${index * 120}ms, transform 0.65s ease ${index * 120}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
      }}
      className="flex gap-5 items-start p-6 rounded-2xl"
      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <span className="text-3xl mt-0.5 select-none">{icon}</span>
      <div>
        <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
        <p className="text-sm leading-relaxed" style={{ color: "rgba(190,210,240,0.70)" }}>
          {desc}
        </p>
      </div>
    </div>
  );
}

export default function ProblemSection() {
  const headingRef = useRef(null);
  const [headingVisible, setHeadingVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeadingVisible(true); },
      { threshold: 0.3 }
    );
    if (headingRef.current) observer.observe(headingRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="relative w-full"
      style={{ background: "#080f1c" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row min-h-screen">

        {/* ── LEFT: scrollable text ── */}
        <div className="flex-1 flex flex-col justify-center px-10 py-24 lg:py-32">

          {/* Label */}
          <span
            className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase"
            style={{ color: "rgba(130,175,255,0.70)" }}
          >
            The Real Problem
          </span>

          {/* Headline */}
          <div ref={headingRef}>
            <h2
              className="text-4xl md:text-5xl font-bold leading-tight mb-4"
              style={{
                color: "#ffffff",
                transition: "opacity 0.7s ease, transform 0.7s ease",
                opacity: headingVisible ? 1 : 0,
                transform: headingVisible ? "translateY(0)" : "translateY(22px)",
              }}
            >
              Stressed about<br />
              <span style={{ color: "#6eaaf5" }}>Tax Filing?</span>
            </h2>
            <p
              className="text-base mb-12"
              style={{
                color: "rgba(180,205,245,0.65)",
                maxWidth: "440px",
                lineHeight: "1.75",
                transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
                opacity: headingVisible ? 1 : 0,
                transform: headingVisible ? "translateY(0)" : "translateY(18px)",
              }}
            >
              You're not alone. Millions of earners lose time, money, and peace of mind every year — not because they don't care, but because the system is built to confuse.
            </p>
          </div>

          {/* Pain points */}
          <div className="flex flex-col gap-2">
            {problems.map((p, i) => (
              <ProblemCard key={i} index={i} {...p} />
            ))}
          </div>
        </div>

        {/* ── RIGHT: sticky visual ── */}
        <div className="hidden lg:block w-[45%] relative">
          <div className="sticky top-0 h-screen overflow-hidden">

            {/* Base image */}
            <img
              src="https://www.constructionspecifier.com/wp-content/uploads/2023/10/The-Spiral-BIG-foreshortened-bottom-to-top-view.jpg"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                filter: "grayscale(60%) brightness(0.45) blur(2px)",
                transform: "scale(1.04)", // hide blur edges
              }}
            />

            {/* Dark blue gradient wash */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(5,15,38,0.88) 0%, rgba(10,30,70,0.70) 50%, rgba(5,18,45,0.88) 100%)",
              }}
            />

            {/* Left-side bleed into main bg */}
            <div
              className="absolute inset-y-0 left-0 w-24"
              style={{
                background: "linear-gradient(to right, #080f1c 0%, transparent 100%)",
              }}
            />

            {/* Floating stat card */}
            <div
              className="absolute bottom-16 left-1/2 -translate-x-1/2 w-64 rounded-2xl p-6 text-center"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(100,160,255,0.18)",
                backdropFilter: "blur(12px)",
              }}
            >
              <p className="text-4xl font-bold text-white mb-1">₹47,000</p>
              <p className="text-xs" style={{ color: "rgba(170,205,255,0.65)" }}>
                Average tax saving per user per year
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
