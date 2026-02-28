"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import FogBackground from "@/components/FogBackground";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut", delay } },
});

const inputBase = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "10px",
  background: "rgba(255,255,255,0.55)",
  border: "1.5px solid rgba(30,58,95,0.15)",
  color: "#1e2d3d",
  fontSize: "0.9rem",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
  fontFamily: "var(--font-nunito), sans-serif",
};

export default function SignInPage() {
  const router = useRouter();
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [focused, setFocused] = useState(null);

  const validate = (name, value) => {
    if (name === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Enter a valid email";
    if (name === "password") return value.length >= 6 ? "" : "Password must be at least 6 characters";
    return "";
  };

  const handleChange = (name, value) => {
    setValues((p) => ({ ...p, [name]: value }));
    if (touched[name]) setErrors((p) => ({ ...p, [name]: validate(name, value) }));
  };

  const handleBlur = (name) => {
    setTouched((p) => ({ ...p, [name]: true }));
    setErrors((p) => ({ ...p, [name]: validate(name, values[name]) }));
    setFocused(null);
  };

  const isValid = !validate("email", values.email) && !validate("password", values.password);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = { email: validate("email", values.email), password: validate("password", values.password) };
    setErrors(errs);
    setTouched({ email: true, password: true });
    if (!errs.email && !errs.password) router.push("/dashboard/user/insights");
  };

  const border = (name) => {
    if (focused === name) return "rgba(74,127,165,0.8)";
    if (touched[name] && errors[name]) return "#e53e3e";
    if (touched[name] && !errors[name]) return "#48bb78";
    return "rgba(30,58,95,0.15)";
  };

  const shadow = (name) => focused === name ? "0 0 0 3px rgba(74,127,165,0.18)" : "none";

  return (
    <div
      className="relative min-h-screen flex items-center justify-center px-4"
      style={{ fontFamily: "var(--font-nunito), sans-serif" }}
    >
      <FogBackground />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.55) 45%, transparent 75%)",
        zIndex: 0, pointerEvents: "none",
      }} />

      <div className="relative z-10 w-full" style={{ maxWidth: "460px" }}>

        {/* Header */}
        <motion.div className="text-center mb-8" variants={fadeUp(0)} initial="hidden" animate="visible">
          <span style={{
            display: "inline-block", marginBottom: "14px",
            fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.22em",
            textTransform: "uppercase", padding: "5px 16px", borderRadius: "999px",
            border: "1px solid rgba(30,58,95,0.2)", background: "rgba(30,58,95,0.07)",
            color: "#1e3a5f", fontStyle: "italic",
          }}>
            Welcome Back
          </span>
          <h1 style={{
            fontSize: "clamp(1.8rem, 5vw, 2.6rem)", fontWeight: 900,
            color: "#0f1f35", letterSpacing: "-0.02em", marginBottom: "8px", lineHeight: 1.1,
          }}>
            Sign in to your account
          </h1>
          <p style={{ fontSize: "0.9rem", color: "#4a6080", fontStyle: "italic", fontWeight: 500 }}>
            Continue where you left off
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          variants={fadeUp(0.12)}
          initial="hidden"
          animate="visible"
          style={{
            background: "rgba(255,255,255,0.72)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRadius: "24px",
            border: "1px solid rgba(30,58,95,0.1)",
            boxShadow: "0 8px 48px rgba(30,58,95,0.1)",
            padding: "clamp(24px, 6vw, 44px)",
          }}
        >
          <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

            {/* Email */}
            <div>
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700,
                color: "#1e3a5f", marginBottom: "6px", letterSpacing: "0.03em" }}>
                Email Address <span style={{ color: "#e53e3e" }}>*</span>
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={values.email}
                onChange={(e) => handleChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                onFocus={() => setFocused("email")}
                style={{ ...inputBase, borderColor: border("email"), boxShadow: shadow("email") }}
              />
              {touched.email && errors.email && (
                <span style={{ fontSize: "0.72rem", color: "#c53030", marginTop: "4px", display: "block", fontWeight: 600 }}>
                  &#9888;&nbsp;{errors.email}
                </span>
              )}
            </div>

            {/* Password */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "#1e3a5f", letterSpacing: "0.03em" }}>
                  Password <span style={{ color: "#e53e3e" }}>*</span>
                </label>
                <button
                  type="button"
                  onClick={() => router.push("/forgot-password")}
                  style={{ background: "none", border: "none", fontSize: "0.72rem",
                    color: "#4a7fa5", cursor: "pointer", fontStyle: "italic",
                    fontFamily: "var(--font-nunito), sans-serif", fontWeight: 600 }}
                >
                  Forgot password?
                </button>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={values.password}
                onChange={(e) => handleChange("password", e.target.value)}
                onBlur={() => handleBlur("password")}
                onFocus={() => setFocused("password")}
                style={{ ...inputBase, borderColor: border("password"), boxShadow: shadow("password") }}
              />
              {touched.password && errors.password && (
                <span style={{ fontSize: "0.72rem", color: "#c53030", marginTop: "4px", display: "block", fontWeight: 600 }}>
                  &#9888;&nbsp;{errors.password}
                </span>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "999px",
                border: "none",
                cursor: isValid ? "pointer" : "not-allowed",
                fontFamily: "var(--font-nunito), sans-serif",
                fontSize: "0.95rem",
                fontWeight: 800,
                fontStyle: "italic",
                letterSpacing: "0.02em",
                marginTop: "4px",
                transition: "opacity 0.2s, transform 0.15s",
                background: isValid
                  ? "linear-gradient(135deg, #2a5298 0%, #4a7fa5 100%)"
                  : "rgba(30,58,95,0.18)",
                color: isValid ? "#ffffff" : "#94a3b8",
                boxShadow: isValid ? "0 6px 24px rgba(42,82,152,0.3)" : "none",
              }}
              onMouseEnter={(e) => { if (isValid) { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-2px)"; } }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Sign In →
            </button>

            {/* Security note */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "6px" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="#4a7fa5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span style={{ fontSize: "0.72rem", color: "#4a7fa5", fontStyle: "italic", fontWeight: 600 }}>
                Your data is encrypted and secure
              </span>
            </div>
          </form>
        </motion.div>

        {/* Bottom links */}
        <motion.div
          className="text-center mt-8"
          variants={fadeUp(0.25)}
          initial="hidden"
          animate="visible"
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}
        >
          <div style={{
            fontSize: "0.85rem", color: "rgba(255,255,255,0.75)",
            fontStyle: "italic", fontFamily: "var(--font-nunito), sans-serif",
          }}>
            Don&apos;t have an account?&nbsp;
            <button
              onClick={() => router.push("/dashboard/user")}
              style={{
                background: "none", border: "none", color: "#ffffff",
                fontWeight: 800, fontSize: "0.85rem", fontStyle: "italic",
                cursor: "pointer", textDecoration: "underline", textUnderlineOffset: "3px",
                fontFamily: "var(--font-nunito), sans-serif", transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Create Account
            </button>
          </div>
          <button
            onClick={() => router.push("/get-started")}
            style={{
              background: "none", border: "none",
              color: "rgba(255,255,255,0.4)", fontSize: "0.78rem",
              fontStyle: "italic", cursor: "pointer",
              fontFamily: "var(--font-nunito), sans-serif", transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
          >
            ← Back to role selection
          </button>
        </motion.div>

      </div>
    </div>
  );
}
