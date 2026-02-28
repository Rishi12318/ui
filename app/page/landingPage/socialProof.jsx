"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Arjun Mehta",
    role: "Software Engineer, Bengaluru",
    quote: "Saved ₹24,000 in taxes this year. I had no idea I was eligible for so many deductions under the new regime.",
    initials: "AM",
    color: "#4a7fa5",
  },
  {
    name: "Priya Sharma",
    role: "Product Manager, Hyderabad",
    quote: "The HRA and LTA breakdown was a game changer. Filed my ITR in under 20 minutes — stress-free for the first time.",
    initials: "PS",
    color: "#5a8f6e",
  },
  {
    name: "Rohan Desai",
    role: "Data Analyst, Pune",
    quote: "Got a ₹38,500 refund I didn't even know I was owed. The regime comparison tool alone is worth it.",
    initials: "RD",
    color: "#7a5fa5",
  },
  {
    name: "Neha Kapoor",
    role: "Chartered Accountant, Delhi",
    quote: "I recommend this to all my clients. The salary structure optimizer handles edge cases even most CAs miss.",
    initials: "NK",
    color: "#a55f5f",
  },
  {
    name: "Vikram Nair",
    role: "Freelance Consultant, Mumbai",
    quote: "As a freelancer, taxes were always a nightmare. Now I actually look forward to filing season.",
    initials: "VN",
    color: "#a5885f",
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
    <section
      style={{
        background: "linear-gradient(180deg, #f0f4f8 0%, #e8eef5 100%)",
        paddingTop: "96px",
        paddingBottom: "96px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>

        {/* ── Heading ── */}
        <motion.div
          className="text-center mb-16"
          variants={fadeUp(0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <span
            className="inline-block text-xs font-bold tracking-widest uppercase mb-4"
            style={{ color: "#4a7fa5", letterSpacing: "0.2em" }}
          >
            Trusted by Professionals
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ color: "#1e3a5f", letterSpacing: "-0.02em" }}
          >
            People Who Saved More With Us
          </h2>
        </motion.div>

        {/* ── Testimonial grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "24px",
            marginBottom: "80px",
          }}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              variants={fadeUp(i * 0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -6, boxShadow: "0 20px 48px rgba(30,58,95,0.14)" }}
              style={{
                background: "#ffffff",
                borderRadius: "18px",
                padding: "28px",
                boxShadow: "0 4px 24px rgba(30,58,95,0.07)",
                transition: "box-shadow 0.3s ease",
                cursor: "default",
              }}
            >
              {/* Avatar + name */}
              <div className="flex items-center gap-4 mb-5">
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "50%",
                    background: t.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "1rem",
                    flexShrink: 0,
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <p style={{ fontWeight: 700, color: "#1e3a5f", fontSize: "0.95rem" }}>{t.name}</p>
                  <p style={{ fontSize: "0.78rem", color: "#64748b", marginTop: "2px" }}>{t.role}</p>
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, s) => (
                  <span key={s} style={{ color: "#f59e0b", fontSize: "0.85rem" }}>&#9733;</span>
                ))}
              </div>

              {/* Quote */}
              <p style={{ color: "#374151", fontSize: "0.92rem", lineHeight: "1.7" }}>
                &ldquo;{t.quote}&rdquo;
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Stats ── */}
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
            marginBottom: "56px",
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

        {/* ── Trust badges ── */}
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
