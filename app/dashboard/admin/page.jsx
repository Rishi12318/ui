"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import FogBackground from "@/components/FogBackground";

// ── Validators ──────────────────────────────────────────────
const PUBLIC_DOMAINS = ["gmail.com","yahoo.com","hotmail.com","outlook.com","rediffmail.com","icloud.com"];

const validators = {
  fullName: (v) => v.trim().length >= 3 ? "" : "Enter your full legal name (min 3 characters)",
  email: (v) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Enter a valid email address";
    const domain = v.split("@")[1]?.toLowerCase();
    if (PUBLIC_DOMAINS.includes(domain)) return "Use a corporate email address (no Gmail/Yahoo etc.)";
    return "";
  },
  mobile: (v) => /^[6-9]\d{9}$/.test(v) ? "" : "Enter a valid 10-digit Indian mobile number",
  orgName: (v) => v.trim().length >= 2 ? "" : "Organization name is required",
  role: (v) => v ? "" : "Select your role",
  pan: (v) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(v) ? "" : "Invalid PAN. Format: ABCDE1234F",
  gst: (v, role) => {
    const required = role === "hr" || role === "ca";
    if (!v && !required) return "";
    if (!v && required) return "GST Number is required for your role";
    return /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(v)
      ? "" : "Invalid GSTIN. Format: 22ABCDE1234F1Z5";
  },
  orgSize: (v) => v ? "" : "Select your organization size",
  accessLevel: (v) => v ? "" : "Select an access level",
};

const INITIAL = {
  fullName: "", email: "", mobile: "", orgName: "",
  role: "", pan: "", gst: "", orgSize: "", accessLevel: "",
};

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

function Label({ children, required, badge }) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.78rem",
      fontWeight: 700, color: "#1e3a5f", marginBottom: "6px", letterSpacing: "0.03em" }}>
      {children}
      {required && <span style={{ color: "#e53e3e" }}>*</span>}
      {badge && (
        <span style={{ fontSize: "0.62rem", fontWeight: 700, padding: "1px 7px",
          borderRadius: "999px", background: "rgba(74,127,165,0.12)", color: "#4a7fa5",
          letterSpacing: "0.06em", textTransform: "uppercase" }}>
          {badge}
        </span>
      )}
    </label>
  );
}

function Field({ children, error, success }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {children}
      {error && (
        <span style={{ fontSize: "0.72rem", color: "#c53030", marginTop: "4px", fontWeight: 600 }}>
          &#9888;&nbsp;{error}
        </span>
      )}
      {!error && success && (
        <span style={{ fontSize: "0.72rem", color: "#2d6a4f", marginTop: "4px", fontWeight: 600 }}>
          &#10003;&nbsp;Looks good
        </span>
      )}
    </div>
  );
}

function SectionTitle({ icon, children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px", marginTop: "8px" }}>
      {icon && <span style={{ fontSize: "0.95rem" }}>{icon}</span>}
      <span style={{ fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.16em",
        textTransform: "uppercase", color: "#4a7fa5" }}>
        {children}
      </span>
      <div style={{ flex: 1, height: "1px", background: "rgba(74,127,165,0.2)" }} />
    </div>
  );
}

export default function AdminSignUp() {
  const router = useRouter();
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [focused, setFocused] = useState(null);

  const validate = useCallback((name, value, role) => {
    if (name === "gst") return validators.gst(value, role ?? values.role);
    return validators[name] ? validators[name](value) : "";
  }, [values.role]);

  const handleChange = (name, raw) => {
    let value = raw;
    if (name === "pan") value = raw.toUpperCase().slice(0, 10);
    if (name === "mobile") value = raw.replace(/\D/g, "").slice(0, 10);
    if (name === "gst") value = raw.toUpperCase().slice(0, 15);
    setValues((p) => ({ ...p, [name]: value }));
    if (touched[name]) {
      setErrors((p) => ({ ...p, [name]: validate(name, value, name === "gst" ? values.role : undefined) }));
    }
    // re-validate GST when role changes
    if (name === "role" && touched.gst) {
      setErrors((p) => ({ ...p, gst: validators.gst(values.gst, value) }));
    }
  };

  const handleBlur = (name) => {
    setTouched((p) => ({ ...p, [name]: true }));
    setErrors((p) => ({ ...p, [name]: validate(name, values[name]) }));
    setFocused(null);
  };

  const isAllValid = () =>
    ["fullName","email","mobile","orgName","role","pan","orgSize","accessLevel"].every(
      (k) => !validators[k](values[k])
    ) && !validators.gst(values.gst, values.role);

  const handleSubmit = (e) => {
    e.preventDefault();
    const keys = ["fullName","email","mobile","orgName","role","pan","gst","orgSize","accessLevel"];
    const allTouched = keys.reduce((a, k) => ({ ...a, [k]: true }), {});
    const allErrors = keys.reduce((a, k) => ({
      ...a, [k]: k === "gst" ? validators.gst(values.gst, values.role) : validate(k, values[k])
    }), {});
    setTouched(allTouched);
    setErrors(allErrors);
    if (Object.values(allErrors).every((e) => !e)) {
      router.push("/dashboard/admin/panel");
    }
  };

  const borderColor = (name) => {
    if (focused === name) return "rgba(74,127,165,0.8)";
    if (touched[name] && errors[name]) return "#e53e3e";
    if (touched[name] && !errors[name]) return "#48bb78";
    return "rgba(30,58,95,0.15)";
  };
  const boxShadow = (name) => focused === name ? "0 0 0 3px rgba(74,127,165,0.18)" : "none";
  const is = (name) => ({ ...inputBase, borderColor: borderColor(name), boxShadow: boxShadow(name) });

  const gstRequired = values.role === "hr" || values.role === "ca";
  const showSuccess = (name) => touched[name] && !errors[name];

  return (
    <div
      className="relative min-h-screen flex items-start justify-center py-12 px-4"
      style={{ fontFamily: "var(--font-nunito), sans-serif" }}
    >
      <FogBackground />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.6) 40%, transparent 75%)",
        zIndex: 0, pointerEvents: "none",
      }} />

      <div className="relative z-10 w-full" style={{ maxWidth: "900px" }}>

        {/* ── Header ── */}
        <motion.div className="text-center mb-10" variants={fadeUp(0)} initial="hidden" animate="visible">
          <span style={{
            display: "inline-block", marginBottom: "14px", fontSize: "0.68rem", fontWeight: 800,
            letterSpacing: "0.22em", textTransform: "uppercase", padding: "5px 16px",
            borderRadius: "999px", border: "1px solid rgba(30,58,95,0.22)",
            background: "rgba(30,58,95,0.07)", color: "#1e3a5f", fontStyle: "italic",
          }}>
            Admin Sign Up
          </span>
          <h1 style={{
            fontSize: "clamp(1.9rem, 5vw, 3rem)", fontWeight: 900, color: "#0f1f35",
            letterSpacing: "-0.025em", marginBottom: "10px", lineHeight: 1.1,
          }}>
            Create your organization admin account
          </h1>
          <p style={{ fontSize: "0.95rem", color: "#4a6080", fontStyle: "italic", fontWeight: 500 }}>
            Set up your organization to manage tax, payroll, and compliance efficiently.
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

            {/* ── Section 1: Personal ── */}
            <SectionTitle icon="👤">Personal Details</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px", marginBottom: "32px" }}>

              <Field error={touched.fullName && errors.fullName} success={showSuccess("fullName")}>
                <Label required>Full Name</Label>
                <input type="text" placeholder="Full legal name"
                  value={values.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  onBlur={() => handleBlur("fullName")}
                  onFocus={() => setFocused("fullName")}
                  style={is("fullName")} />
              </Field>

              <Field error={touched.email && errors.email} success={showSuccess("email")}>
                <Label required badge="Corporate only">Email Address</Label>
                <input type="email" placeholder="admin@yourcompany.com"
                  value={values.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                  onFocus={() => setFocused("email")}
                  style={is("email")} />
              </Field>

              <Field error={touched.mobile && errors.mobile} success={showSuccess("mobile")}>
                <Label required>Mobile Number</Label>
                <div style={{ display: "flex", gap: "8px" }}>
                  <div style={{
                    ...inputBase, width: "64px", flexShrink: 0, textAlign: "center",
                    fontWeight: 700, color: "#1e3a5f", background: "rgba(30,58,95,0.07)",
                    borderColor: "rgba(30,58,95,0.15)", cursor: "default",
                  }}>+91</div>
                  <input type="tel" placeholder="9876543210"
                    value={values.mobile}
                    onChange={(e) => handleChange("mobile", e.target.value)}
                    onBlur={() => handleBlur("mobile")}
                    onFocus={() => setFocused("mobile")}
                    style={{ ...is("mobile"), flex: 1 }}
                    maxLength={10} />
                </div>
              </Field>

              <Field error={touched.pan && errors.pan} success={showSuccess("pan")}>
                <Label required>PAN Number</Label>
                <input type="text" placeholder="ABCDE1234F"
                  value={values.pan}
                  onChange={(e) => handleChange("pan", e.target.value)}
                  onBlur={() => handleBlur("pan")}
                  onFocus={() => setFocused("pan")}
                  style={{ ...is("pan"), letterSpacing: "0.12em", fontWeight: 700 }}
                  maxLength={10} />
              </Field>
            </div>

            {/* ── Section 2: Organization ── */}
            <SectionTitle icon="🏢">Organization Details</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px", marginBottom: "32px" }}>

              <Field error={touched.orgName && errors.orgName} success={showSuccess("orgName")}>
                <Label required>Organization Name</Label>
                <input type="text" placeholder="Acme Consulting Pvt. Ltd."
                  value={values.orgName}
                  onChange={(e) => handleChange("orgName", e.target.value)}
                  onBlur={() => handleBlur("orgName")}
                  onFocus={() => setFocused("orgName")}
                  style={is("orgName")} />
              </Field>

              <Field error={touched.orgSize && errors.orgSize} success={showSuccess("orgSize")}>
                <Label required>Organization Size</Label>
                <select value={values.orgSize}
                  onChange={(e) => handleChange("orgSize", e.target.value)}
                  onBlur={() => handleBlur("orgSize")}
                  onFocus={() => setFocused("orgSize")}
                  style={{ ...is("orgSize"), cursor: "pointer" }}>
                  <option value="">Select size</option>
                  <option value="1-50">1 – 50 employees</option>
                  <option value="51-200">51 – 200 employees</option>
                  <option value="200+">200+ employees</option>
                </select>
              </Field>

              <Field error={touched.gst && errors.gst} success={showSuccess("gst")}>
                <Label required={gstRequired} badge={gstRequired ? "Required for your role" : "Optional"}>
                  GST Number
                </Label>
                <input type="text" placeholder="22ABCDE1234F1Z5"
                  value={values.gst}
                  onChange={(e) => handleChange("gst", e.target.value)}
                  onBlur={() => handleBlur("gst")}
                  onFocus={() => setFocused("gst")}
                  style={{ ...is("gst"), letterSpacing: "0.06em", fontWeight: 600 }}
                  maxLength={15} />
              </Field>
            </div>

            {/* ── Section 3: Access ── */}
            <SectionTitle icon="🔐">Access & Permissions</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px", marginBottom: "36px" }}>

              <Field error={touched.role && errors.role} success={showSuccess("role")}>
                <Label required>Role</Label>
                <select value={values.role}
                  onChange={(e) => handleChange("role", e.target.value)}
                  onBlur={() => handleBlur("role")}
                  onFocus={() => setFocused("role")}
                  style={{ ...is("role"), cursor: "pointer" }}>
                  <option value="">Select role</option>
                  <option value="hr">HR</option>
                  <option value="admin">Admin</option>
                  <option value="ca">CA (Chartered Accountant)</option>
                  <option value="funder">Funder</option>
                </select>
              </Field>

              <Field error={touched.accessLevel && errors.accessLevel} success={showSuccess("accessLevel")}>
                <Label required>Admin Access Level</Label>
                <select value={values.accessLevel}
                  onChange={(e) => handleChange("accessLevel", e.target.value)}
                  onBlur={() => handleBlur("accessLevel")}
                  onFocus={() => setFocused("accessLevel")}
                  style={{ ...is("accessLevel"), cursor: "pointer" }}>
                  <option value="">Select access level</option>
                  <option value="read">Read — View only</option>
                  <option value="write">Write — Manage filings &amp; users</option>
                  <option value="super">Super — Full system access</option>
                </select>
              </Field>
            </div>

            {/* Role hint strip */}
            {values.role && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  marginBottom: "28px", padding: "12px 16px", borderRadius: "12px",
                  background: "rgba(74,127,165,0.08)", border: "1px solid rgba(74,127,165,0.18)",
                  display: "flex", gap: "10px", alignItems: "flex-start",
                }}
              >
                <span style={{ fontSize: "0.9rem", marginTop: "1px" }}>&#8505;&#65039;</span>
                <span style={{ fontSize: "0.78rem", color: "#2a5298", fontWeight: 600, lineHeight: 1.6 }}>
                  {values.role === "hr" && "HR admins can manage employee onboarding, salary structures, and Form 16 generation. GST number required."}
                  {values.role === "admin" && "Company Admins have full access to filings, user management, and compliance dashboards."}
                  {values.role === "ca" && "CAs can view and manage client tax filings, refund tracking, and audit logs. GST number required."}
                  {values.role === "funder" && "Funders have read access to aggregate financial reports and compliance summaries."}
                </span>
              </motion.div>
            )}

            {/* ── Submit ── */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}>
              <button
                type="submit"
                disabled={!isAllValid()}
                style={{
                  width: "100%", maxWidth: "460px",
                  padding: "14px 32px", borderRadius: "999px", border: "none",
                  cursor: isAllValid() ? "pointer" : "not-allowed",
                  fontFamily: "var(--font-nunito), sans-serif",
                  fontSize: "0.95rem", fontWeight: 800, fontStyle: "italic",
                  letterSpacing: "0.02em",
                  transition: "opacity 0.2s, transform 0.15s",
                  background: isAllValid()
                    ? "linear-gradient(135deg, #1a3a6b 0%, #4a7fa5 100%)"
                    : "rgba(30,58,95,0.18)",
                  color: isAllValid() ? "#ffffff" : "#94a3b8",
                  boxShadow: isAllValid() ? "0 6px 28px rgba(26,58,107,0.38)" : "none",
                }}
                onMouseEnter={(e) => { if (isAllValid()) { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-2px)"; } }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                Create Admin Account &rarr;
              </button>

              {/* Security note */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke="#4a7fa5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span style={{ fontSize: "0.72rem", color: "#4a7fa5", fontStyle: "italic", fontWeight: 600 }}>
                  Enterprise-grade security &bull; Role-based access &bull; Data encrypted
                </span>
              </div>
            </div>
          </form>
        </motion.div>

        {/* Bottom links */}
        <motion.div
          className="text-center mt-8"
          variants={fadeUp(0.3)}
          initial="hidden"
          animate="visible"
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}
        >
          <div style={{
            fontSize: "0.85rem", color: "rgba(255,255,255,0.75)",
            fontStyle: "italic", fontFamily: "var(--font-nunito), sans-serif",
          }}>
            Already have an admin account?&nbsp;
            <button
              onClick={() => router.push("/signin")}
              style={{
                background: "none", border: "none", color: "#ffffff",
                fontWeight: 800, fontSize: "0.85rem", fontStyle: "italic",
                cursor: "pointer", textDecoration: "underline", textUnderlineOffset: "3px",
                fontFamily: "var(--font-nunito), sans-serif", transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Sign In
            </button>
          </div>
          <button
            onClick={() => router.push("/get-started")}
            style={{
              background: "none", border: "none", color: "rgba(255,255,255,0.4)",
              fontSize: "0.78rem", fontStyle: "italic", cursor: "pointer",
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
