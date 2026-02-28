"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Arjun Mehta",
    role: "Software Engineer, Bengaluru",
    quote: "Saved ₹24,000 in taxes this year. The deduction finder alone paid for itself ten times over.",
    initials: "AM",
    color: "#4a7fa5",
  },
  {
    name: "Priya Sharma",
    role: "Product Manager, Hyderabad",
    quote: "Filed my ITR in under 20 minutes — completely stress-free for the first time ever.",
    initials: "PS",
    color: "#5a8f6e",
  },
  {
    name: "Rohan Desai",
    role: "Data Analyst, Pune",
    quote: "Got a ₹38,500 refund I didn't even know I was owed. The regime comparison is a game changer.",
    initials: "RD",
    color: "#7a5fa5",
  },
];

const stats = [
  { value: 15000, suffix: "+", label: "Users", display: "15K+" },
  { value: 100, suffix: "Cr+", label: "Refunds Unlocked", display: "₹100Cr+" },
  { value: 4.9, suffix: "/5", label: "Average Rating", display: "4.9/5", isFloat: true },
];

const badges = [
  "Built for the Indian Tax System",
  "Supports Old & New Regime",
  "ITR-1, ITR-2 & ITR-3 Ready",
  "Trusted by IT Professionals",
];

function useCountUp(target, duration = 1800, isFloat = false, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(isFloat ? parseFloat((eased * target).toFixed(1)) : Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration, isFloat]);
  return count;
}

function StatCard({ stat, inView }) {
  const count = useCountUp(stat.value, 1800, stat.isFloat, inView);
  return (
    <div className="flex flex-col items-center">
      <span
        className="font-bold"
        style={{ fontSize: "clamp(2.2rem, 4vw, 3rem)", color: "#1e3a5f", lineHeight: 1 }}
      >
        {stat.isFloat ? count.toFixed(1) : stat.value >= 1000 ? Math.round(count / 1000) + "K" : count}
        {stat.suffix}
      </span>
      <span className="mt-2 text-sm font-medium" style={{ color: "#64748b" }}>
        {stat.label}
      </span>
    </div>
  );
}

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut", delay } },
});

export default function SocialProof() {
  const statsRef = useRef(null);
  const [statsInView, setStatsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsInView(true); },
      { threshold: 0.4 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section style={{ background: "linear-gradient(180deg, #f0f4f8 0%, #e8eef5 100%)" }}>

      {/* ── Collage image with reviews overlay ── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          minHeight: "600px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Background collage image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://i.pinimg.com/736x/6b/33/87/6b3387c793624e79e2e7bbc4602427a2.jpg"
          alt="testimonial collage"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />

        {/* Dark gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(10,25,47,0.72) 0%, rgba(10,25,47,0.62) 100%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            maxWidth: "1200px",
            padding: "80px 24px",
            margin: "0 auto",
          }}
        >
          {/* Heading */}
          <motion.div
            className="text-center mb-12"
            variants={fadeUp(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <span
              style={{
                color: "#7eb8e0",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              Trusted by Professionals
            </span>
            <h2
              style={{
                color: "#ffffff",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                marginTop: "10px",
              }}
            >
              People Who Saved More With Us
            </h2>
          </motion.div>

          {/* Review cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
            }}
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                variants={fadeUp(i * 0.15)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "20px",
                  padding: "28px",
                }}
              >
                {/* Stars */}
                <div style={{ display: "flex", gap: "4px", marginBottom: "14px" }}>
                  {[...Array(5)].map((_, s) => (
                    <span key={s} style={{ color: "#f59e0b", fontSize: "0.9rem" }}>
                      &#9733;
                    </span>
                  ))}
                </div>

                {/* Quote */}
                <p
                  style={{
                    color: "#e2e8f2",
                    fontSize: "0.93rem",
                    lineHeight: 1.75,
                    marginBottom: "22px",
                  }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Avatar + name */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      background: t.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      flexShrink: 0,
                    }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, color: "#ffffff", fontSize: "0.9rem" }}>
                      {t.name}
                    </p>
                    <p style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: "2px" }}>
                      {t.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Stats + badges ── */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 24px" }}>

        {/* Stats */}
        <motion.div
          ref={statsRef}
          variants={fadeUp(0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
            background: "#ffffff",
            borderRadius: "20px",
            padding: "48px 32px",
            boxShadow: "0 4px 32px rgba(30,58,95,0.08)",
            marginBottom: "48px",
            textAlign: "center",
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                borderRight: i < stats.length - 1 ? "1px solid #e2e8f0" : "none",
                padding: "0 24px",
              }}
            >
              <StatCard stat={stat} inView={statsInView} />
            </div>
          ))}
        </motion.div>

        {/* Trust badges */}
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          variants={fadeUp(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {badges.map((badge) => (
            <span
              key={badge}
              style={{
                padding: "8px 20px",
                borderRadius: "999px",
                border: "1px solid #cbd5e1",
                color: "#475569",
                fontSize: "0.78rem",
                fontWeight: 600,
                letterSpacing: "0.04em",
                background: "#ffffff",
              }}
            >
              {badge}
            </span>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
