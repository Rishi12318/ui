"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import FogBackground from "@/components/FogBackground";

// ── Validators ──────────────────────────────────────────────
const validators = {
  fullName: (v) => v.trim().length >= 3 ? "" : "Enter your full name (min 3 characters)",
  pan: (v) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(v) ? "" : "Invalid PAN. Format: ABCDE1234F",
  aadhaar: (v) => v.replace(/\s/g, "").length === 12 ? "" : "Aadhaar must be exactly 12 digits",
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Enter a valid email address",
  mobile: (v) => /^[6-9]\d{9}$/.test(v) ? "" : "Enter a valid 10-digit Indian mobile number",
  dob: (v) => {
    if (!v) return "Date of birth is required";
    const age = (new Date() - new Date(v)) / (1000 * 60 * 60 * 24 * 365.25);
    return age >= 18 ? "" : "You must be at least 18 years old";
  },
  residentialStatus: (v) => v ? "" : "Select a residential status",
  financialYear: (v) => v ? "" : "Select a financial year",
  monthlySalary: (v) => parseFloat(v) > 0 ? "" : "Enter a valid monthly salary",
  employmentType: (v) => v ? "" : "Select your employment type",
};

const INITIAL = {
  fullName: "", pan: "", aadhaar: "", email: "",
  mobile: "", dob: "", residentialStatus: "",
  financialYear: "", monthlySalary: "", employmentType: "",
};

// ── Shared input style ──────────────────────────────────────
const inputBase = {
  width: "100%",
  padding: "11px 14px",
  borderRadius: "10px",
  background: "rgba(255,255,255,0.55)",
  border: "1.5px solid rgba(30,58,95,0.15)",
  color: "#1e2d3d",
  fontSize: "0.9rem",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
  fontFamily: "var(--font-nunito), sans-serif",
};

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay } },
});

// ── Label ───────────────────────────────────────────────────
function Label({ children, required }) {
  return (
    <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700,
      color: "#1e3a5f", marginBottom: "6px", letterSpacing: "0.03em" }}>
      {children}
      {required && <span style={{ color: "#e53e3e", marginLeft: "3px" }}>*</span>}
    </label>
  );
}

// ── Field wrapper ────────────────────────────────────────────
function Field({ children, error, success }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {children}
      {error && (
        <span style={{ fontSize: "0.72rem", color: "#c53030", marginTop: "4px",
          fontWeight: 600 }}>
          &#9888;&nbsp;{error}
        </span>
      )}
      {!error && success && (
        <span style={{ fontSize: "0.72rem", color: "#2d6a4f", marginTop: "4px",
          fontWeight: 600 }}>
          &#10003;&nbsp;Looks good
        </span>
      )}
    </div>
  );
}

export default function UserOnboarding() {
  const router = useRouter();
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [focusedField, setFocusedField] = useState(null);

  const validate = useCallback((name, value) => {
    return validators[name] ? validators[name](value) : "";
  }, []);

  const handleChange = (name, raw) => {
    let value = raw;
    if (name === "pan") value = raw.toUpperCase().slice(0, 10);
    if (name === "mobile") value = raw.replace(/\D/g, "").slice(0, 10);
    if (name === "aadhaar") {
      const digits = raw.replace(/\D/g, "").slice(0, 12);
      value = digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
    }
    setValues((p) => ({ ...p, [name]: value }));
    if (touched[name]) {
      setErrors((p) => ({ ...p, [name]: validate(name, value) }));
    }
  };

  const handleBlur = (name) => {
    setTouched((p) => ({ ...p, [name]: true }));
    setErrors((p) => ({ ...p, [name]: validate(name, values[name]) }));
    setFocusedField(null);
  };

  const isAllValid = () =>
    Object.keys(INITIAL).every((k) => !validators[k](values[k]));

  const handleSubmit = (e) => {
    e.preventDefault();
    const allTouched = Object.keys(INITIAL).reduce((a, k) => ({ ...a, [k]: true }), {});
    const allErrors = Object.keys(INITIAL).reduce((a, k) => ({ ...a, [k]: validate(k, values[k]) }), {});
    setTouched(allTouched);
    setErrors(allErrors);
    if (Object.values(allErrors).every((e) => !e)) {
      router.push("/dashboard/user/insights");
    }
  };

  const getBorderColor = (name) => {
    if (focusedField === name) return "rgba(74,127,165,0.8)";
    if (touched[name] && errors[name]) return "#e53e3e";
    if (touched[name] && !errors[name]) return "#48bb78";
    return "rgba(30,58,95,0.15)";
  };

  const getBoxShadow = (name) => {
    if (focusedField === name) return "0 0 0 3px rgba(74,127,165,0.18)";
    return "none";
  };

  const inputStyle = (name) => ({
    ...inputBase,
    borderColor: getBorderColor(name),
    boxShadow: getBoxShadow(name),
  });

  return (
    <div
      className="relative min-h-screen flex items-start justify-center py-12 px-4"
      style={{ fontFamily: "var(--font-nunito), sans-serif" }}
    >
      <FogBackground />

      {/* White top overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.6) 40%, transparent 75%)",
        zIndex: 0, pointerEvents: "none",
      }} />

      <div className="relative z-10 w-full" style={{ maxWidth: "860px" }}>

        {/* ── Header ── */}
        <motion.div className="text-center mb-10" variants={fadeUp(0)} initial="hidden" animate="visible">
          <span style={{
            display: "inline-block", marginBottom: "14px",
            fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.22em",
            textTransform: "uppercase", padding: "5px 16px", borderRadius: "999px",
            border: "1px solid rgba(30,58,95,0.2)", background: "rgba(30,58,95,0.07)",
            color: "#1e3a5f", fontStyle: "italic",
          }}>
            User Details
          </span>
          <h1 style={{
            fontSize: "clamp(1.9rem, 5vw, 3rem)", fontWeight: 900,
            color: "#0f1f35", letterSpacing: "-0.02em", marginBottom: "10px", lineHeight: 1.1,
          }}>
            Tell us about yourself
          </h1>
          <p style={{ fontSize: "0.95rem", color: "#4a6080", fontStyle: "italic", fontWeight: 500 }}>
            We use this information to calculate your taxes accurately
          </p>
        </motion.div>

        {/* ── Form Card ── */}
        <motion.div
          variants={fadeUp(0.15)}
          initial="hidden"
          animate="visible"
          style={{
            background: "rgba(255,255,255,0.72)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRadius: "28px",
            border: "1px solid rgba(30,58,95,0.1)",
            boxShadow: "0 8px 48px rgba(30,58,95,0.1)",
            padding: "clamp(24px, 5vw, 48px)",
          }}
        >
          <form onSubmit={handleSubmit} noValidate>

            {/* Section: Personal */}
            <SectionTitle>Personal Information</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginBottom: "32px" }}>

              {/* Full Name */}
              <Field error={touched.fullName && errors.fullName} success={touched.fullName && !errors.fullName}>
                <Label required>Full Name</Label>
                <input
                  type="text"
                  placeholder="As per PAN records"
                  value={values.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  onBlur={() => handleBlur("fullName")}
                  onFocus={() => setFocusedField("fullName")}
                  style={inputStyle("fullName")}
                />
              </Field>

              {/* PAN */}
              <Field error={touched.pan && errors.pan} success={touched.pan && !errors.pan}>
                <Label required>PAN Number</Label>
                <input
                  type="text"
                  placeholder="ABCDE1234F"
                  value={values.pan}
                  onChange={(e) => handleChange("pan", e.target.value)}
                  onBlur={() => handleBlur("pan")}
                  onFocus={() => setFocusedField("pan")}
                  style={{ ...inputStyle("pan"), letterSpacing: "0.12em", fontWeight: 700 }}
                  maxLength={10}
                />
              </Field>

              {/* Aadhaar */}
              <Field error={touched.aadhaar && errors.aadhaar} success={touched.aadhaar && !errors.aadhaar}>
                <Label required>Aadhaar Number</Label>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="xxxx xxxx xxxx"
                  value={values.aadhaar}
                  onChange={(e) => handleChange("aadhaar", e.target.value)}
                  onBlur={() => handleBlur("aadhaar")}
                  onFocus={() => setFocusedField("aadhaar")}
                  style={{ ...inputStyle("aadhaar"), letterSpacing: "0.1em" }}
                />
              </Field>

              {/* Date of Birth */}
              <Field error={touched.dob && errors.dob} success={touched.dob && !errors.dob}>
                <Label required>Date of Birth</Label>
                <input
                  type="date"
                  value={values.dob}
                  onChange={(e) => handleChange("dob", e.target.value)}
                  onBlur={() => handleBlur("dob")}
                  onFocus={() => setFocusedField("dob")}
                  style={inputStyle("dob")}
                  max={new Date().toISOString().split("T")[0]}
                />
              </Field>
            </div>

            {/* Section: Contact */}
            <SectionTitle>Contact Details</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginBottom: "32px" }}>

              {/* Email */}
              <Field error={touched.email && errors.email} success={touched.email && !errors.email}>
                <Label required>Email Address</Label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={values.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                  onFocus={() => setFocusedField("email")}
                  style={inputStyle("email")}
                />
              </Field>

              {/* Mobile */}
              <Field error={touched.mobile && errors.mobile} success={touched.mobile && !errors.mobile}>
                <Label required>Mobile Number</Label>
                <div style={{ display: "flex", gap: "8px" }}>
                  <div style={{
                    ...inputBase, width: "64px", flexShrink: 0, textAlign: "center",
                    fontWeight: 700, color: "#1e3a5f", background: "rgba(30,58,95,0.07)",
                    borderColor: "rgba(30,58,95,0.15)", cursor: "default",
                  }}>
                    +91
                  </div>
                  <input
                    type="tel"
                    placeholder="9876543210"
                    value={values.mobile}
                    onChange={(e) => handleChange("mobile", e.target.value)}
                    onBlur={() => handleBlur("mobile")}
                    onFocus={() => setFocusedField("mobile")}
                    style={{ ...inputStyle("mobile"), flex: 1 }}
                    maxLength={10}
                  />
                </div>
              </Field>
            </div>

            {/* Section: Financial */}
            <SectionTitle>Financial Profile</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginBottom: "36px" }}>

              {/* Residential Status */}
              <Field error={touched.residentialStatus && errors.residentialStatus} success={touched.residentialStatus && !errors.residentialStatus}>
                <Label required>Residential Status</Label>
                <select
                  value={values.residentialStatus}
                  onChange={(e) => handleChange("residentialStatus", e.target.value)}
                  onBlur={() => handleBlur("residentialStatus")}
                  onFocus={() => setFocusedField("residentialStatus")}
                  style={{ ...inputStyle("residentialStatus"), cursor: "pointer" }}
                >
                  <option value="">Select status</option>
                  <option value="resident">Resident</option>
                  <option value="nri">NRI</option>
                  <option value="rnor">RNOR</option>
                </select>
              </Field>

              {/* Financial Year */}
              <Field error={touched.financialYear && errors.financialYear} success={touched.financialYear && !errors.financialYear}>
                <Label required>Financial Year</Label>
                <select
                  value={values.financialYear}
                  onChange={(e) => handleChange("financialYear", e.target.value)}
                  onBlur={() => handleBlur("financialYear")}
                  onFocus={() => setFocusedField("financialYear")}
                  style={{ ...inputStyle("financialYear"), cursor: "pointer" }}
                >
                  <option value="">Select year</option>
                  <option value="2025-26">2025–26</option>
                  <option value="2026-27">2026–27</option>
                </select>
              </Field>

              {/* Monthly Salary */}
              <Field error={touched.monthlySalary && errors.monthlySalary} success={touched.monthlySalary && !errors.monthlySalary}>
                <Label required>Monthly Salary</Label>
                <div style={{ position: "relative" }}>
                  <span style={{
                    position: "absolute", left: "13px", top: "50%",
                    transform: "translateY(-50%)", color: "#4a7fa5",
                    fontWeight: 800, fontSize: "1rem", pointerEvents: "none",
                  }}>
                    ₹
                  </span>
                  <input
                    type="number"
                    placeholder="50000"
                    min="1"
                    value={values.monthlySalary}
                    onChange={(e) => handleChange("monthlySalary", e.target.value)}
                    onBlur={() => handleBlur("monthlySalary")}
                    onFocus={() => setFocusedField("monthlySalary")}
                    style={{ ...inputStyle("monthlySalary"), paddingLeft: "30px" }}
                  />
                </div>
              </Field>

              {/* Employment Type */}
              <Field error={touched.employmentType && errors.employmentType} success={touched.employmentType && !errors.employmentType}>
                <Label required>Employment Type</Label>
                <select
                  value={values.employmentType}
                  onChange={(e) => handleChange("employmentType", e.target.value)}
                  onBlur={() => handleBlur("employmentType")}
                  onFocus={() => setFocusedField("employmentType")}
                  style={{ ...inputStyle("employmentType"), cursor: "pointer" }}
                >
                  <option value="">Select type</option>
                  <option value="salaried">Salaried</option>
                  <option value="freelancer">Freelancer</option>
                  <option value="business">Business</option>
                </select>
              </Field>
            </div>

            {/* ── Submit ── */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}>
              <button
                type="submit"
                disabled={!isAllValid()}
                style={{
                  width: "100%",
                  maxWidth: "420px",
                  padding: "14px 32px",
                  borderRadius: "999px",
                  border: "none",
                  cursor: isAllValid() ? "pointer" : "not-allowed",
                  fontFamily: "var(--font-nunito), sans-serif",
                  fontSize: "0.95rem",
                  fontWeight: 800,
                  fontStyle: "italic",
                  letterSpacing: "0.02em",
                  transition: "opacity 0.2s, transform 0.15s",
                  background: isAllValid()
                    ? "linear-gradient(135deg, #2a5298 0%, #4a7fa5 100%)"
                    : "rgba(30,58,95,0.2)",
                  color: isAllValid() ? "#ffffff" : "#94a3b8",
                  boxShadow: isAllValid() ? "0 6px 24px rgba(42,82,152,0.35)" : "none",
                }}
                onMouseEnter={(e) => {
                  if (isAllValid()) {
                    e.currentTarget.style.opacity = "0.9";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Continue to Tax Insights &rarr;
              </button>

              {/* Security note */}
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke="#4a7fa5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span style={{ fontSize: "0.74rem", color: "#4a7fa5", fontStyle: "italic", fontWeight: 600 }}>
                  Your data is encrypted and secure
                </span>
              </div>
            </div>
          </form>
        </motion.div>

        {/* Back link */}
        <motion.div className="text-center mt-8" variants={fadeUp(0.3)} initial="hidden" animate="visible">
          <button
            onClick={() => router.push("/get-started")}
            style={{
              background: "none", border: "none",
              color: "rgba(255,255,255,0.55)", fontSize: "0.8rem",
              fontStyle: "italic", cursor: "pointer",
              fontFamily: "var(--font-nunito), sans-serif",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
          >
            ← Back to role selection
          </button>
        </motion.div>

      </div>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "10px",
      marginBottom: "16px",
    }}>
      <span style={{
        fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.16em",
        textTransform: "uppercase", color: "#4a7fa5",
      }}>
        {children}
      </span>
      <div style={{ flex: 1, height: "1px", background: "rgba(74,127,165,0.2)" }} />
    </div>
  );
}
