"use client";

import { useEffect, useRef, useState } from "react";

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
  const [phase, setPhase] = useState("in");
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const rafRef = useRef(null);

  /* ── Cycling cards ── */
  useEffect(() => {
    let fadeOut;
    let next;
    const cycle = () => {
      fadeOut = setTimeout(() => {
        setPhase("out");
        next = setTimeout(() => {
          setIndex((prev) => (prev + 1) % problems.length);
          setPhase("in");
        }, 600);
      }, 2600);
    };
    cycle();
    const interval = setInterval(cycle, 3200);
    return () => { clearTimeout(fadeOut); clearTimeout(next); clearInterval(interval); };
  }, []);

  /* ── Scroll-linked parallax ── */
  useEffect(() => {
    const update = () => {
      const section = sectionRef.current;
      const img = imgRef.current;
      if (!section || !img) return;
      const rect = section.getBoundingClientRect();
      const sectionH = section.offsetHeight;
      const imgH = img.offsetHeight;
      // progress: 0 when bottom of section enters viewport bottom, 1 when top exits viewport top
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + sectionH);
      const clamped = Math.max(0, Math.min(1, progress));
      const maxMove = imgH - sectionH;
      img.style.transform = `translateY(${-clamped * maxMove}px)`;
    };

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update(); // set initial position
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const current = problems[index];

  return (
    /* ── outer wrapper: page-level padding, background colour between sections ── */
    <div className="bg-[#f0f4f8] py-20 px-6 md:px-16">

      {/* ── windowed section ── constrained, clips the moving image ── */}
      <section
        ref={sectionRef}
        className="relative mx-auto overflow-hidden flex flex-col items-center justify-center"
        style={{
          maxWidth: "1200px",
          height: "620px",
          borderRadius: "24px",
          boxShadow: "0 24px 64px rgba(0,0,0,0.22)",
        }}
      >
        {/* ── Parallax background image — taller than section so it can travel ── */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src="https://www.constructionspecifier.com/wp-content/uploads/2023/10/The-Spiral-BIG-foreshortened-bottom-to-top-view.jpg"
          alt=""
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "155%",       /* taller than section = room to scroll */
            objectFit: "cover",
            objectPosition: "center top",
            filter: "brightness(0.72) saturate(0.82)",
            willChange: "transform",
            userSelect: "none",
            pointerEvents: "none",
          }}
        />

        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(0,0,0,0.40)", borderRadius: "24px" }}
        />

        {/* ── Content — z-indexed above image ── */}
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

          {/* Headline */}
          <h2
            className="text-4xl md:text-5xl font-bold leading-tight mb-4"
            style={{ color: "#ffffff", textShadow: "0 2px 32px rgba(0,0,0,0.5)" }}
          >
            Stressed about{" "}
            <span style={{ color: "#7aaaff" }}>Tax Filing?</span>
          </h2>
          <p
            className="text-sm mb-12"
            style={{ color: "rgba(180,205,255,0.60)", lineHeight: "1.75", maxWidth: "440px" }}
          >
            Most salaried individuals lose money and peace of mind every filing season — not because they&apos;re careless, but because the system is genuinely complicated.
          </p>

          {/* Cycling pain-point */}
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
    </div>
  );
}
