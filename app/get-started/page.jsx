"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import FogBackground from "@/components/FogBackground";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: "easeOut", delay },
  },
});

const cards = [
  {
    role: "user",
    title: "User",
    description: "File taxes, optimize salary, track refunds",
    cta: "Continue as User →",
    href: "/dashboard/user",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    role: "admin",
    title: "Admin",
    description: "Manage filings, users, and compliance",
    cta: "Continue as Admin →",
    href: "/dashboard/admin",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
];

export default function GetStartedPage() {
  const router = useRouter();

  return (
    <div
      className="relative min-h-screen flex items-center justify-center text-white"
      style={{ fontFamily: "var(--font-nunito), sans-serif" }}
    >
      {/* Same fog background as hero */}
      <FogBackground />

      {/* Content */}
      <div
        className="relative z-10 w-full flex flex-col items-center px-6 py-20"
        style={{ maxWidth: "760px", margin: "0 auto" }}
      >
        {/* Badge */}
        <motion.span
          variants={fadeUp(0)}
          initial="hidden"
          animate="visible"
          style={{
            display: "inline-block",
            marginBottom: "1.5rem",
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            padding: "6px 18px",
            borderRadius: "999px",
            border: "1px solid rgba(255,255,255,0.25)",
            background: "rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.7)",
            fontStyle: "italic",
          }}
        >
          Get Started
        </motion.span>

        {/* Heading */}
        <motion.h1
          variants={fadeUp(0.12)}
          initial="hidden"
          animate="visible"
          style={{
            fontSize: "clamp(2.2rem, 6vw, 3.8rem)",
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
            color: "transparent",
            WebkitTextStroke: "2px rgba(255,255,255,0.9)",
            textAlign: "center",
            marginBottom: "1rem",
          }}
        >
          Choose how you want to continue
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={fadeUp(0.24)}
          initial="hidden"
          animate="visible"
          style={{
            fontSize: "1.05rem",
            fontWeight: 400,
            fontStyle: "italic",
            color: "rgba(220,235,255,0.82)",
            textAlign: "center",
            marginBottom: "3.5rem",
            letterSpacing: "0.01em",
          }}
        >
          Select your role to proceed
        </motion.p>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
            width: "100%",
          }}
        >
          {cards.map((card, i) => (
            <motion.div
              key={card.role}
              variants={fadeUp(0.36 + i * 0.14)}
              initial="hidden"
              animate="visible"
              whileHover={{
                y: -8,
                boxShadow: "0 28px 64px rgba(0,0,0,0.3)",
                background: "rgba(255,255,255,0.14)",
              }}
              style={{
                background: "rgba(255,255,255,0.09)",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                border: "1px solid rgba(255,255,255,0.18)",
                borderRadius: "24px",
                padding: "36px 32px",
                display: "flex",
                flexDirection: "column",
                gap: "18px",
                cursor: "default",
                transition: "background 0.25s ease, box-shadow 0.25s ease",
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "16px",
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {card.icon}
              </div>

              {/* Title */}
              <h2
                style={{
                  fontSize: "1.55rem",
                  fontWeight: 900,
                  color: "rgba(255,255,255,0.95)",
                  letterSpacing: "-0.01em",
                  margin: 0,
                }}
              >
                {card.title}
              </h2>

              {/* Description */}
              <p
                style={{
                  fontSize: "0.95rem",
                  fontStyle: "italic",
                  color: "rgba(210,228,255,0.8)",
                  lineHeight: 1.65,
                  margin: 0,
                  flexGrow: 1,
                }}
              >
                {card.description}
              </p>

              {/* CTA */}
              <button
                onClick={() => router.push(card.href)}
                style={{
                  marginTop: "8px",
                  padding: "12px 24px",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,0.92)",
                  color: "#2a4a6e",
                  fontSize: "0.88rem",
                  fontWeight: 700,
                  fontStyle: "italic",
                  fontFamily: "var(--font-nunito), sans-serif",
                  border: "none",
                  cursor: "pointer",
                  letterSpacing: "0.02em",
                  boxShadow: "0 4px 18px rgba(0,0,0,0.18)",
                  transition: "background 0.2s ease, transform 0.15s ease",
                  alignSelf: "flex-start",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#ffffff";
                  e.currentTarget.style.transform = "scale(1.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.92)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                {card.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Back link */}
        <motion.button
          variants={fadeUp(0.65)}
          initial="hidden"
          animate="visible"
          onClick={() => router.push("/")}
          style={{
            marginTop: "3rem",
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.45)",
            fontSize: "0.82rem",
            fontStyle: "italic",
            cursor: "pointer",
            letterSpacing: "0.04em",
            transition: "color 0.2s",
            fontFamily: "var(--font-nunito), sans-serif",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
        >
          ← Back to home
        </motion.button>
      </div>
    </div>
  );
}
