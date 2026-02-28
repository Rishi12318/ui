"use client";

import { useEffect, useRef, useState } from "react";

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

function ProblemCard({ icon, title, desc, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transition: `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(28px)",
      }}
      className="flex gap-5 items-start p-6 rounded-2xl"
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.04)";
        e.currentTarget.style.borderColor = "rgba(100,160,255,0.25)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.borderColor = "transparent";
      }}
    >
      {/* Icon bubble */}
      <div
        className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl text-xl"
        style={{ background: "rgba(70,120,220,0.15)", border: "1px solid rgba(100,160,255,0.2)" }}
      >
        {icon}
      </div>

      {/* Text */}
      <div>
        <h3
          className="text-lg font-semibold mb-1"
          style={{ color: "#e8f0ff" }}
        >
          {title}
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{ color: "rgba(180,200,240,0.70)" }}
        >
          {desc}
        </p>
      </div>
    </div>
  );
}

export default function Problem() {
  const headingRef = useRef(null);
  const [headingVisible, setHeadingVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeadingVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (headingRef.current) observer.observe(headingRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="relative w-full"
      style={{ background: "#080f1e", minHeight: "100vh" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row min-h-screen">

        {/* ── LEFT: scrolling content ── */}
        <div className="flex-1 flex flex-col justify-center px-10 py-24 md:pr-16">

          {/* Section label */}
          <span
            className="inline-block mb-5 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full w-fit"
            style={{
              background: "rgba(220,50,50,0.1)",
              border: "1px solid rgba(220,80,80,0.25)",
              color: "rgba(255,160,160,0.85)",
              letterSpacing: "0.18em",
            }}
          >
            The Problem
          </span>

          {/* Headline */}
          <div ref={headingRef}>
            <h2
              className="text-4xl md:text-5xl font-bold leading-tight mb-4"
              style={{
                color: "#ffffff",
                textShadow: "0 2px 24px rgba(0,0,0,0.4)",
                transition: "opacity 0.7s ease, transform 0.7s ease",
                opacity: headingVisible ? 1 : 0,
                transform: headingVisible ? "translateY(0)" : "translateY(20px)",
              }}
            >
              Stressed about<br />
              <span style={{ color: "#7aaaff" }}>Tax Filing?</span>
            </h2>
            <p
              className="text-base mb-12"
              style={{
                color: "rgba(180,205,255,0.65)",
                maxWidth: "440px",
                lineHeight: "1.75",
                transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
                opacity: headingVisible ? 1 : 0,
                transform: headingVisible ? "translateY(0)" : "translateY(16px)",
              }}
            >
              You're not alone. Most salaried individuals lose money, time, and peace of mind every filing season — not because they're careless, but because the system is genuinely complicated.
            </p>
          </div>

          {/* Pain-point cards */}
          <div className="flex flex-col gap-2">
            {problems.map((p, i) => (
              <ProblemCard key={i} index={i} {...p} />
            ))}
          </div>
        </div>

        {/* ── RIGHT: sticky visual ── */}
        <div
          className="hidden md:block relative flex-shrink-0"
          style={{ width: "42%" }}
        >
          <div className="sticky top-0 h-screen overflow-hidden">
            {/* Background image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://www.constructionspecifier.com/wp-content/uploads/2023/10/The-Spiral-BIG-foreshortened-bottom-to-top-view.jpg"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                filter: "grayscale(55%) brightness(0.45) blur(1px) saturate(0.6)",
                transform: "scale(1.04)",
              }}
            />

            {/* Dark blue gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(5,15,35,0.88) 0%, rgba(10,30,70,0.72) 50%, rgba(5,12,30,0.90) 100%)",
              }}
            />
            {/* Left bleed */}
            <div
              className="absolute inset-y-0 left-0 w-24"
              style={{
                background: "linear-gradient(to right, rgba(8,15,30,1) 0%, transparent 100%)",
              }}
            />

            {/* Centred floating stat cards */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-10">
              {[
                { value: "₹1.2L+", label: "Avg. annual savings per user" },
                { value: "98%", label: "Filing accuracy rate" },
                { value: "3 min", label: "To get your tax estimate" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="w-full rounded-2xl px-6 py-4 text-center"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(100,160,255,0.15)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <div
                    className="text-3xl font-bold mb-1"
                    style={{ color: "#a8caff" }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-xs tracking-wide"
                    style={{ color: "rgba(180,205,255,0.6)" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
