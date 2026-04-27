"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// ── Palette & tokens ──────────────────────────────────────────
const C = {
  sidebar: "#0c1b2e",
  sidebarHover: "rgba(74,127,165,0.18)",
  sidebarActive: "rgba(74,127,165,0.28)",
  accent: "#4a7fa5",
  accentDark: "#1e3a5f",
  bg: "#f2f5fb",
  white: "#ffffff",
  text: "#0f1f35",
  muted: "#64748b",
  border: "rgba(30,58,95,0.1)",
  success: "#2d6a4f",
  warning: "#b45309",
  danger: "#c53030",
  successBg: "rgba(45,106,79,0.1)",
  warningBg: "rgba(180,83,9,0.1)",
  dangerBg: "rgba(197,48,48,0.1)",
};

const font = { fontFamily: "var(--font-nunito, 'Segoe UI', sans-serif)" };
const card = {
  background: C.white, borderRadius: "16px",
  boxShadow: "0 2px 16px rgba(30,58,95,0.07)",
  border: `1px solid ${C.border}`,
};
const fadeIn = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

// ── Sidebar nav items ─────────────────────────────────────────
const NAV = [
  { key: "overview",      icon: "⊞", label: "Overview" },
  { key: "income",        icon: "₹", label: "Income & Salary" },
  { key: "deductions",    icon: "⬇", label: "Deductions" },
  { key: "tax",           icon: "=", label: "Tax Calculation" },
  { key: "filing",        icon: "✓", label: "ITR Filing" },
  { key: "refund",        icon: "↩", label: "Refund Status" },
  { key: "documents",     icon: "⊡", label: "Documents" },
  { key: "notifications", icon: "🔔", label: "Notifications" },
  { key: "settings",      icon: "⚙", label: "Settings" },
  { key: "help",          icon: "?", label: "Help & Support" },
];

// ── Tiny reusable components ──────────────────────────────────
function Badge({ color, bg, children }) {
  return (
    <span style={{ fontSize: "0.68rem", fontWeight: 700, padding: "3px 10px",
      borderRadius: "999px", background: bg, color: color, letterSpacing: "0.04em" }}>
      {children}
    </span>
  );
}

function SectionHeader({ title, sub, action }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
      <div>
        <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: C.text, margin: 0 }}>{title}</h2>
        {sub && <p style={{ fontSize: "0.82rem", color: C.muted, marginTop: "4px" }}>{sub}</p>}
      </div>
      {action}
    </div>
  );
}

function StatCard({ label, value, sub, color, icon }) {
  return (
    <div style={{ ...card, padding: "20px 22px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <p style={{ fontSize: "0.73rem", fontWeight: 700, color: C.muted, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</p>
          <p style={{ fontSize: "1.6rem", fontWeight: 900, color: color || C.text, lineHeight: 1 }}>{value}</p>
          {sub && <p style={{ fontSize: "0.73rem", color: C.muted, marginTop: "6px" }}>{sub}</p>}
        </div>
        {icon && <span style={{ fontSize: "1.4rem", opacity: 0.5 }}>{icon}</span>}
      </div>
    </div>
  );
}

function ProgressBar({ used, total, color }) {
  const pct = Math.min(100, Math.round((used / total) * 100));
  return (
    <div>
      <div style={{ height: "6px", borderRadius: "999px", background: "rgba(30,58,95,0.1)", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: color || C.accent, borderRadius: "999px", transition: "width 0.6s ease" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
        <span style={{ fontSize: "0.68rem", color: C.muted }}>Used ₹{(used / 100000).toFixed(1)}L</span>
        <span style={{ fontSize: "0.68rem", color: C.muted }}>Limit ₹{(total / 100000).toFixed(0)}L</span>
      </div>
    </div>
  );
}

function TableRow({ cols, header }) {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: cols.map(() => "1fr").join(" "),
      gap: "12px", padding: "10px 0",
      borderBottom: `1px solid ${C.border}`,
      background: header ? "rgba(30,58,95,0.03)" : "transparent",
    }}>
      {cols.map((c, i) => (
        <span key={i} style={{ fontSize: header ? "0.7rem" : "0.83rem", color: header ? C.muted : C.text,
          fontWeight: header ? 700 : 500, textTransform: header ? "uppercase" : "none",
          letterSpacing: header ? "0.08em" : 0 }}>{c}</span>
      ))}
    </div>
  );
}

// ── Section renderers ─────────────────────────────────────────

function Overview() {
  return (
    <motion.div variants={fadeIn} initial="hidden" animate="visible">
      <SectionHeader
        title="Dashboard Overview"
        sub="Financial Year 2025–26 · As of Feb 28, 2026"
        action={
          <Badge color={C.warning} bg={C.warningBg}>⚡ Filing due Jul 31, 2026</Badge>
        }
      />

      {/* KPI row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginBottom: "28px" }}>
        <StatCard label="Estimated Tax" value="₹1,24,500" sub="Under new regime" color={C.accentDark} icon="₹" />
        <StatCard label="Expected Refund" value="₹18,600" sub="TDS excess paid" color={C.success} icon="↩" />
        <StatCard label="Deductions Saved" value="₹82,000" sub="80C + 80D claimed" color={C.accent} icon="⬇" />
        <StatCard label="Filing Status" value="In Progress" sub="Step 3 of 7 complete" color={C.warning} icon="✓" />
      </div>

      {/* Compliance + Deadlines */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "28px" }}>
        {/* Health */}
        <div style={{ ...card, padding: "22px" }}>
          <p style={{ fontSize: "0.73rem", fontWeight: 700, color: C.muted, marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Compliance Health</p>
          {[
            { label: "PAN Linked to Aadhaar", status: "ok" },
            { label: "Form 16 Uploaded", status: "ok" },
            { label: "Bank Account Verified", status: "ok" },
            { label: "ITR Draft Prepared", status: "warn" },
            { label: "E-Verification Pending", status: "miss" },
          ].map((r) => (
            <div key={r.label} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "7px 0",
              borderBottom: `1px solid ${C.border}` }}>
              <span style={{ fontSize: "0.9rem" }}>
                {r.status === "ok" ? "✅" : r.status === "warn" ? "⚠️" : "🔴"}
              </span>
              <span style={{ fontSize: "0.82rem", color: C.text }}>{r.label}</span>
            </div>
          ))}
        </div>

        {/* Deadlines */}
        <div style={{ ...card, padding: "22px" }}>
          <p style={{ fontSize: "0.73rem", fontWeight: 700, color: C.muted, marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Upcoming Deadlines</p>
          {[
            { date: "Mar 15, 2026", task: "Advance Tax (Q4) Payment", urgency: "soon" },
            { date: "Mar 31, 2026", task: "Tax-saving investments deadline", urgency: "soon" },
            { date: "Jun 15, 2026", task: "Advance Tax Q1 FY 2026–27", urgency: "ok" },
            { date: "Jul 31, 2026", task: "ITR Filing Deadline", urgency: "ok" },
          ].map((d) => (
            <div key={d.task} style={{ display: "flex", gap: "12px", padding: "8px 0", borderBottom: `1px solid ${C.border}` }}>
              <div style={{ minWidth: "90px" }}>
                <Badge color={d.urgency === "soon" ? C.warning : C.success} bg={d.urgency === "soon" ? C.warningBg : C.successBg}>
                  {d.date}
                </Badge>
              </div>
              <span style={{ fontSize: "0.82rem", color: C.text }}>{d.task}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Regime Summary */}
      <div style={{ ...card, padding: "22px" }}>
        <p style={{ fontSize: "0.73rem", fontWeight: 700, color: C.muted, marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Tax Regime Summary · FY 2025–26</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0" }}>
          {[["Gross Income", "₹15,00,000", "₹15,00,000"], ["Standard Deduction", "₹50,000", "₹75,000"],
            ["Chapter VI-A Deductions", "₹2,00,000", "Nil"], ["Taxable Income", "₹12,50,000", "₹14,25,000"],
            ["Tax Payable (incl. cess)", "₹1,24,500", "₹1,48,200"]].map(([label, old, newR], i) => (
            <div key={label} style={{ gridColumn: "1 / -1", display: "grid", gridTemplateColumns: "2fr 1fr 1fr",
              padding: "9px 0", borderBottom: `1px solid ${C.border}`,
              background: i === 4 ? "rgba(74,127,165,0.05)" : "transparent" }}>
              <span style={{ fontSize: "0.82rem", color: C.text, fontWeight: i === 4 ? 700 : 400 }}>{label}</span>
              <span style={{ fontSize: "0.82rem", color: i === 4 ? C.accentDark : C.text, fontWeight: i === 4 ? 700 : 400 }}>{old}</span>
              <span style={{ fontSize: "0.82rem", color: i === 4 ? C.danger : C.muted }}>{newR}</span>
            </div>
          ))}
          <div style={{ gridColumn: "1 / -1", display: "grid", gridTemplateColumns: "2fr 1fr 1fr", padding: "6px 0" }}>
            <span />
            <span style={{ fontSize: "0.65rem", fontWeight: 700, color: C.success, textTransform: "uppercase", letterSpacing: "0.07em" }}>▲ Old Regime</span>
            <span style={{ fontSize: "0.65rem", fontWeight: 700, color: C.danger, textTransform: "uppercase", letterSpacing: "0.07em" }}>New Regime</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Income() {
  const [edit, setEdit] = useState(false);
  return (
    <motion.div variants={fadeIn} initial="hidden" animate="visible">
      <SectionHeader title="Income & Salary" sub="Enter all income sources for FY 2025–26"
        action={
          <button onClick={() => setEdit(!edit)} style={{ padding: "8px 20px", borderRadius: "999px",
            border: `1.5px solid ${C.accent}`, background: edit ? C.accent : "transparent",
            color: edit ? "#fff" : C.accent, fontSize: "0.8rem", fontWeight: 700, cursor: "pointer", ...font }}>
            {edit ? "✓ Save Changes" : "Edit"}
          </button>
        }
      />
      <div style={{ ...card, padding: "24px", marginBottom: "20px" }}>
        <p style={{ fontSize: "0.73rem", fontWeight: 700, color: C.muted, marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Salary Breakdown</p>
        {[["Basic Salary","₹7,20,000"],["HRA Received","₹2,16,000"],["Special Allowance","₹1,80,000"],
          ["Bonus","₹60,000"],["Leave Encashment","₹24,000"],["Gross Salary","₹12,00,000"]].map(([k, v], i) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "10px 0", borderBottom: i < 5 ? `1px solid ${C.border}` : "none",
            background: i === 5 ? "rgba(74,127,165,0.05)" : "transparent" }}>
            <span style={{ fontSize: "0.85rem", color: i === 5 ? C.accentDark : C.text, fontWeight: i === 5 ? 700 : 400 }}>{k}</span>
            {edit && i < 5
              ? <input defaultValue={v} style={{ width: "140px", padding: "6px 10px", borderRadius: "8px",
                  border: `1.5px solid ${C.accent}`, fontSize: "0.85rem", color: C.text, background: "rgba(74,127,165,0.05)",
                  textAlign: "right", fontFamily: font.fontFamily, outline: "none" }} />
              : <span style={{ fontSize: "0.9rem", fontWeight: i === 5 ? 800 : 600, color: i === 5 ? C.accentDark : C.text }}>{v}</span>
            }
          </div>
        ))}
      </div>
      <div style={{ ...card, padding: "24px" }}>
        <p style={{ fontSize: "0.73rem", fontWeight: 700, color: C.muted, marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Other Income Sources</p>
        {[["Interest Income (Savings)","₹8,200","Bank interest"],["Capital Gains (LTCG)","₹45,000","Mutual funds sold"],
          ["Rental Income","₹0","Not applicable"],["Freelance / Consultancy","₹1,20,000","Side project fees"]].map(([k, v, note]) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "10px 0", borderBottom: `1px solid ${C.border}` }}>
            <div>
              <p style={{ fontSize: "0.85rem", color: C.text, margin: 0 }}>{k}</p>
              <p style={{ fontSize: "0.72rem", color: C.muted, margin: 0 }}>{note}</p>
            </div>
            <span style={{ fontSize: "0.9rem", fontWeight: 600, color: C.text }}>{v}</span>
          </div>
        ))}
        <button style={{ marginTop: "16px", padding: "8px 20px", borderRadius: "10px",
          border: `1.5px dashed ${C.border}`, background: "transparent", color: C.muted,
          fontSize: "0.8rem", cursor: "pointer", ...font }}>
          + Add Income Source
        </button>
      </div>
    </motion.div>
  );
}

function Deductions() {
  const rows = [
    { sec: "80C", label: "PPF / ELSS / LIC / EPF", used: 150000, limit: 150000 },
    { sec: "80D", label: "Health Insurance Premium", used: 25000, limit: 50000 },
    { sec: "80TTA", label: "Savings Bank Interest", used: 8200, limit: 10000 },
    { sec: "24(b)", label: "Home Loan Interest", used: 0, limit: 200000 },
    { sec: "80G", label: "Donations", used: 5000, limit: 0 },
  ];
  return (
    <motion.div variants={fadeIn} initial="hidden" animate="visible">
      <SectionHeader title="Deductions & Investments" sub="Chapter VI-A deductions for FY 2025–26" />
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {rows.map((r) => (
          <div key={r.sec} style={{ ...card, padding: "20px 24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
              <div>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <Badge color={C.accentDark} bg="rgba(74,127,165,0.12)">Section {r.sec}</Badge>
                  <span style={{ fontSize: "0.88rem", fontWeight: 600, color: C.text }}>{r.label}</span>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: "0.82rem", fontWeight: 700, color: r.limit && r.used >= r.limit ? C.success : C.text, margin: 0 }}>
                  ₹{r.used.toLocaleString()}
                  {r.limit ? ` / ₹${r.limit.toLocaleString()}` : " (Actual)"}
                </p>
                {r.limit && r.used < r.limit && (
                  <p style={{ fontSize: "0.68rem", color: C.accent, margin: 0 }}>
                    ₹{(r.limit - r.used).toLocaleString()} more available
                  </p>
                )}
              </div>
            </div>
            {r.limit > 0 && <ProgressBar used={r.used} total={r.limit} color={r.used >= r.limit ? C.success : C.accent} />}
            {r.limit && r.used < r.limit && (
              <p style={{ marginTop: "10px", fontSize: "0.73rem", padding: "8px 12px",
                borderRadius: "8px", background: "rgba(74,127,165,0.07)", color: C.accentDark, fontStyle: "italic" }}>
                💡 Invest ₹{(r.limit - r.used).toLocaleString()} more under Sec {r.sec} to maximize your tax savings
              </p>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function TaxCalc() {
  const [regime, setRegime] = useState("old");
  const old = { taxable: 1250000, slab: 117000, cess: 4680, total: 121680, surcharge: 0 };
  const newR = { taxable: 1425000, slab: 142500, cess: 5700, total: 148200, surcharge: 0 };
  const d = regime === "old" ? old : newR;
  return (
    <motion.div variants={fadeIn} initial="hidden" animate="visible">
      <SectionHeader title="Tax Calculation" sub="Computed for FY 2025–26 · AY 2026–27" />
      <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
        {["old","new"].map((r) => (
          <button key={r} onClick={() => setRegime(r)} style={{
            padding: "9px 28px", borderRadius: "999px", border: "none", cursor: "pointer",
            background: regime === r ? C.accent : C.white, color: regime === r ? "#fff" : C.muted,
            fontSize: "0.85rem", fontWeight: 700, boxShadow: regime === r ? "0 4px 14px rgba(74,127,165,0.3)" : "none",
            transition: "all 0.2s", fontFamily: font.fontFamily,
          }}>
            {r === "old" ? "Old Regime" : "New Regime"}
          </button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "16px" }}>
        <div style={{ ...card, padding: "24px" }}>
          <p style={{ fontSize: "0.73rem", fontWeight: 700, color: C.muted, marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Slab-wise Breakdown · {regime === "old" ? "Old" : "New"} Regime
          </p>
          {(regime === "old"
            ? [["Up to ₹2,50,000","₹2,50,000","0%","₹0"],["₹2,50,001 – ₹5,00,000","₹2,50,000","5%","₹12,500"],
               ["₹5,00,001 – ₹10,00,000","₹5,00,000","20%","₹1,00,000"],["₹10,00,001 – ₹12,50,000","₹2,50,000","30%","₹75,000"]]
            : [["Up to ₹3,00,000","₹3,00,000","0%","₹0"],["₹3,00,001 – ₹6,00,000","₹3,00,000","5%","₹15,000"],
               ["₹6,00,001 – ₹9,00,000","₹3,00,000","10%","₹30,000"],["₹9,00,001 – ₹12,00,000","₹3,00,000","15%","₹45,000"],
               ["₹12,00,001 – ₹14,25,000","₹2,25,000","20%","₹45,000"]]
          ).map(([slab, amt, rate, tax]) => (
            <div key={slab} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 0.7fr 1fr",
              padding: "8px 0", borderBottom: `1px solid ${C.border}` }}>
              {[slab, amt, rate, tax].map((v, i) => (
                <span key={i} style={{ fontSize: "0.78rem", color: i === 3 ? C.accentDark : C.text,
                  fontWeight: i === 3 ? 700 : 400 }}>{v}</span>
              ))}
            </div>
          ))}
          <div style={{ marginTop: "16px" }}>
            {[["Income Tax","₹" + d.slab.toLocaleString()],["Surcharge","₹0"],
              ["Health & Education Cess (4%)","₹" + d.cess.toLocaleString()],
              ["Total Tax Payable","₹" + d.total.toLocaleString()]].map(([k, v], i) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between",
                padding: "8px 0", borderBottom: i < 3 ? `1px solid ${C.border}` : "none",
                background: i === 3 ? "rgba(74,127,165,0.05)" : "transparent" }}>
                <span style={{ fontSize: "0.83rem", color: C.text, fontWeight: i === 3 ? 700 : 400 }}>{k}</span>
                <span style={{ fontSize: "0.88rem", fontWeight: 700, color: i === 3 ? C.accentDark : C.text }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ ...card, padding: "22px", background: "linear-gradient(135deg, #0f1f35 0%, #1e3a5f 100%)" }}>
            <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "rgba(255,255,255,0.55)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Effective Tax Rate</p>
            <p style={{ fontSize: "2.4rem", fontWeight: 900, color: "#fff", margin: "4px 0" }}>
              {regime === "old" ? "8.1%" : "9.9%"}
            </p>
            <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.5)", fontStyle: "italic" }}>on gross income of ₹15,00,000</p>
          </div>
          <div style={{ ...card, padding: "22px" }}>
            <p style={{ fontSize: "0.73rem", fontWeight: 700, color: C.muted, marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Regime Comparison</p>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span style={{ fontSize: "0.8rem", color: C.text }}>Old Regime</span>
              <span style={{ fontSize: "0.85rem", fontWeight: 700, color: C.success }}>₹1,21,680</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "14px" }}>
              <span style={{ fontSize: "0.8rem", color: C.text }}>New Regime</span>
              <span style={{ fontSize: "0.85rem", fontWeight: 700, color: C.danger }}>₹1,48,200</span>
            </div>
            <div style={{ padding: "10px 14px", borderRadius: "10px", background: C.successBg }}>
              <p style={{ fontSize: "0.78rem", fontWeight: 700, color: C.success, margin: 0 }}>
                ✅ Old Regime saves ₹26,520
              </p>
              <p style={{ fontSize: "0.7rem", color: C.muted, margin: "2px 0 0" }}>Recommended based on your deductions</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Filing() {
  const steps = [
    { label: "Personal Information", done: true },
    { label: "Income Details", done: true },
    { label: "Deductions & Exemptions", done: true },
    { label: "Tax Computation Review", done: false },
    { label: "Bank Account Details", done: false },
    { label: "Preview & Submit", done: false },
    { label: "E-Verification", done: false },
  ];
  return (
    <motion.div variants={fadeIn} initial="hidden" animate="visible">
      <SectionHeader title="ITR Filing" sub="ITR-1 (Sahaj) · AY 2026–27 recommended based on your income profile" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "16px" }}>
        <div style={{ ...card, padding: "24px" }}>
          <p style={{ fontSize: "0.73rem", fontWeight: 700, color: C.muted, marginBottom: "20px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Filing Checklist</p>
          {steps.map((s, i) => (
            <div key={s.label} style={{ display: "flex", gap: "12px", alignItems: "flex-start",
              padding: "10px 0", borderBottom: i < steps.length - 1 ? `1px solid ${C.border}` : "none" }}>
              <div style={{ width: "24px", height: "24px", borderRadius: "50%", flexShrink: 0, marginTop: "1px",
                background: s.done ? C.success : C.white, border: `2px solid ${s.done ? C.success : C.border}`,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", color: "#fff" }}>
                {s.done ? "✓" : <span style={{ color: C.muted, fontWeight: 700, fontSize: "0.68rem" }}>{i + 1}</span>}
              </div>
              <div>
                <p style={{ fontSize: "0.83rem", color: s.done ? C.muted : C.text, textDecoration: s.done ? "line-through" : "none",
                  margin: 0, fontWeight: s.done ? 400 : 600 }}>{s.label}</p>
              </div>
            </div>
          ))}
          <div style={{ marginTop: "20px" }}>
            <ProgressBar used={3} total={7} color={C.accent} />
            <p style={{ fontSize: "0.72rem", color: C.muted, marginTop: "6px" }}>3 of 7 steps completed</p>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ ...card, padding: "22px" }}>
            <p style={{ fontSize: "0.73rem", fontWeight: 700, color: C.muted, marginBottom: "14px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Filing Details</p>
            {[["Form Type","ITR-1 (Sahaj)"],["Assessment Year","AY 2026–27"],["Mode","Online (e-Filing)"],
              ["Current Status","In Progress"],["Last Saved","Feb 28, 2026, 3:41 PM"]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontSize: "0.8rem", color: C.muted }}>{k}</span>
                <span style={{ fontSize: "0.82rem", fontWeight: 600, color: C.text }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ ...card, padding: "22px" }}>
            <p style={{ fontSize: "0.73rem", fontWeight: 700, color: C.muted, marginBottom: "14px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Next Step</p>
            <p style={{ fontSize: "0.88rem", fontWeight: 700, color: C.text, marginBottom: "6px" }}>Tax Computation Review</p>
            <p style={{ fontSize: "0.78rem", color: C.muted, marginBottom: "16px" }}>
              Review your tax payable, verify TDS credits, and confirm the regime before proceeding.
            </p>
            <button style={{ width: "100%", padding: "11px", borderRadius: "12px",
              background: "linear-gradient(135deg, #1a3a6b 0%, #4a7fa5 100%)",
              border: "none", color: "#fff", fontWeight: 800, fontSize: "0.88rem",
              cursor: "pointer", fontFamily: font.fontFamily }}>
              Continue Filing →
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Refund() {
  return (
    <motion.div variants={fadeIn} initial="hidden" animate="visible">
      <SectionHeader title="Refund Status" sub="Expected refund for AY 2026–27" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
        <StatCard label="Expected Refund" value="₹18,600" sub="TDS paid ₹1,43,280 vs Tax ₹1,24,680" color={C.success} icon="↩" />
        <StatCard label="TDS Deducted" value="₹1,43,280" sub="From employer · Form 16 uploaded" color={C.accentDark} icon="₹" />
      </div>
      <div style={{ ...card, padding: "24px" }}>
        <p style={{ fontSize: "0.73rem", fontWeight: 700, color: C.muted, marginBottom: "20px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Refund Processing Stages</p>
        {[
          { label: "ITR Filed", done: false, note: "Not yet submitted" },
          { label: "ITR Processed by CPC", done: false, note: "Awaiting filing" },
          { label: "Refund Determined", done: false, note: "Post-processing" },
          { label: "Refund Dispatched", done: false, note: "To linked bank account" },
          { label: "Refund Credited", done: false, note: "Estimated: Oct–Nov 2026" },
        ].map((s, i, arr) => (
          <div key={s.label} style={{ display: "flex", gap: "16px", paddingBottom: i < arr.length - 1 ? "20px" : 0 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "50%", flexShrink: 0,
                background: s.done ? C.success : "rgba(30,58,95,0.1)",
                border: `2px solid ${s.done ? C.success : C.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: s.done ? "#fff" : C.muted, fontSize: "0.7rem", fontWeight: 700 }}>
                {s.done ? "✓" : i + 1}
              </div>
              {i < arr.length - 1 && <div style={{ width: "2px", flex: 1, background: C.border, marginTop: "4px" }} />}
            </div>
            <div style={{ paddingBottom: "4px" }}>
              <p style={{ fontSize: "0.85rem", fontWeight: 600, color: C.text, margin: 0 }}>{s.label}</p>
              <p style={{ fontSize: "0.72rem", color: C.muted, margin: "2px 0 0" }}>{s.note}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function Documents() {
  const docs = [
    { name: "Form 16 – FY 2025–26", type: "PDF", size: "214 KB", date: "Apr 25, 2025", tag: "Salary" },
    { name: "Form 26AS", type: "PDF", size: "68 KB", date: "Feb 10, 2026", tag: "TDS" },
    { name: "Investment Proofs 80C", type: "ZIP", size: "1.2 MB", date: "Jan 05, 2026", tag: "Deductions" },
    { name: "Bank Interest Certificate", type: "PDF", size: "34 KB", date: "Mar 31, 2025", tag: "Interest" },
  ];
  return (
    <motion.div variants={fadeIn} initial="hidden" animate="visible">
      <SectionHeader title="Documents" sub="Secure storage for FY-wise tax documents"
        action={
          <button style={{ padding: "8px 20px", borderRadius: "999px",
            background: "linear-gradient(135deg, #1a3a6b 0%, #4a7fa5 100%)",
            border: "none", color: "#fff", fontSize: "0.8rem", fontWeight: 700, cursor: "pointer", ...font }}>
            + Upload Document
          </button>
        }
      />
      <div style={{ ...card, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 0.7fr 0.6fr 1fr 0.8fr 0.7fr",
          padding: "12px 20px", background: "rgba(30,58,95,0.04)",
          borderBottom: `1px solid ${C.border}` }}>
          {["File Name","Type","Size","Uploaded","Category","Action"].map((h) => (
            <span key={h} style={{ fontSize: "0.68rem", fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</span>
          ))}
        </div>
        {docs.map((d, i) => (
          <div key={d.name} style={{ display: "grid", gridTemplateColumns: "2fr 0.7fr 0.6fr 1fr 0.8fr 0.7fr",
            padding: "14px 20px", borderBottom: i < docs.length - 1 ? `1px solid ${C.border}` : "none",
            alignItems: "center" }}>
            <span style={{ fontSize: "0.83rem", fontWeight: 600, color: C.text }}>⊡ {d.name}</span>
            <span style={{ fontSize: "0.78rem", color: C.muted }}>{d.type}</span>
            <span style={{ fontSize: "0.78rem", color: C.muted }}>{d.size}</span>
            <span style={{ fontSize: "0.78rem", color: C.muted }}>{d.date}</span>
            <Badge color={C.accentDark} bg="rgba(74,127,165,0.1)">{d.tag}</Badge>
            <button style={{ fontSize: "0.75rem", color: C.accent, background: "none", border: "none",
              cursor: "pointer", fontWeight: 700, fontFamily: font.fontFamily }}>↓ Download</button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function Notifications() {
  const items = [
    { title: "Advance Tax Due in 15 days", body: "₹31,125 advance tax for Q4 is due by March 15, 2026.", time: "2 days ago", type: "warn" },
    { title: "Form 16 Available", body: "Your employer has uploaded Form 16 for FY 2025-26.", time: "Apr 26, 2025", type: "ok" },
    { title: "ITR Filing Open", body: "ITR filing for AY 2026-27 is now open on the Income Tax portal.", time: "Apr 1, 2026", type: "info" },
    { title: "New Tax Regime Default", body: "From AY 2024-25, new tax regime is the default. Ensure you opt out if needed.", time: "Feb 1, 2025", type: "info" },
  ];
  const icon = { warn: "⚠️", ok: "✅", info: "ℹ️" };
  return (
    <motion.div variants={fadeIn} initial="hidden" animate="visible">
      <SectionHeader title="Notifications" sub="Deadlines, alerts, and important updates" />
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {items.map((n) => (
          <div key={n.title} style={{ ...card, padding: "18px 22px", display: "flex", gap: "14px" }}>
            <span style={{ fontSize: "1.1rem", marginTop: "2px" }}>{icon[n.type]}</span>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <p style={{ fontSize: "0.88rem", fontWeight: 700, color: C.text, margin: 0 }}>{n.title}</p>
                <span style={{ fontSize: "0.7rem", color: C.muted }}>{n.time}</span>
              </div>
              <p style={{ fontSize: "0.8rem", color: C.muted, margin: 0 }}>{n.body}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function Settings() {
  return (
    <motion.div variants={fadeIn} initial="hidden" animate="visible">
      <SectionHeader title="Settings" sub="Manage your account preferences" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        {[
          { title: "Personal Details", fields: [["Full Name","Ramesh Kumar"],["PAN","ABCDE1234F"],["Date of Birth","15 Aug 1992"],["Aadhaar", "XXXX XXXX 4321"]] },
          { title: "Bank Account", fields: [["Account Number","XXXXXXXXXXXX8734"],["IFSC Code","SBIN0001234"],["Bank Name","State Bank of India"],["Account Type","Savings"]] },
          { title: "Communication", fields: [["Email","ramesh@acme.in"],["Mobile","+91 98765 43210"],["Preferred Language","English"],["Email Alerts","Enabled"]] },
          { title: "Security", fields: [["Password","••••••••••"],["2FA Status","Not Enabled"],["Last Login","Feb 27, 2026"],["Active Sessions","1 device"]] },
        ].map((s) => (
          <div key={s.title} style={{ ...card, padding: "22px" }}>
            <p style={{ fontSize: "0.73rem", fontWeight: 700, color: C.muted, marginBottom: "14px", textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.title}</p>
            {s.fields.map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontSize: "0.8rem", color: C.muted }}>{k}</span>
                <span style={{ fontSize: "0.82rem", fontWeight: 600, color: C.text }}>{v}</span>
              </div>
            ))}
            <button style={{ marginTop: "14px", fontSize: "0.78rem", color: C.accent, background: "none",
              border: `1px solid ${C.accent}`, padding: "6px 14px", borderRadius: "8px",
              cursor: "pointer", fontWeight: 700, fontFamily: font.fontFamily }}>Edit</button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function Help() {
  const faqs = [
    ["What is the ITR filing deadline for FY 2025–26?","July 31, 2026 for individuals without audit requirement."],
    ["Should I use Old or New tax regime?","Based on your deductions, Old Regime saves you ₹26,520. Verify under Tax Calculation."],
    ["How do I upload Form 16?","Go to Documents section and click 'Upload Document'. Select your PDF."],
    ["What is AIS and SFT?","Annual Information Statement captures all financial transactions reported to IT dept."],
  ];
  return (
    <motion.div variants={fadeIn} initial="hidden" animate="visible">
      <SectionHeader title="Help & Support" sub="FAQs, CA contact, and ticket support" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div>
          <div style={{ ...card, padding: "24px", marginBottom: "16px" }}>
            <p style={{ fontSize: "0.73rem", fontWeight: 700, color: C.muted, marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Frequently Asked Questions</p>
            {faqs.map(([q, a]) => (
              <div key={q} style={{ marginBottom: "16px", paddingBottom: "16px", borderBottom: `1px solid ${C.border}` }}>
                <p style={{ fontSize: "0.85rem", fontWeight: 700, color: C.text, marginBottom: "4px" }}>❓ {q}</p>
                <p style={{ fontSize: "0.78rem", color: C.muted }}>{a}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ ...card, padding: "22px" }}>
            <p style={{ fontSize: "0.73rem", fontWeight: 700, color: C.muted, marginBottom: "14px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Your Assigned CA</p>
            <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "14px" }}>
              <div style={{ width: "42px", height: "42px", borderRadius: "50%",
                background: "linear-gradient(135deg, #1e3a5f, #4a7fa5)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontWeight: 800, fontSize: "0.9rem" }}>CA</div>
              <div>
                <p style={{ fontSize: "0.9rem", fontWeight: 700, color: C.text, margin: 0 }}>Priya Sharma</p>
                <p style={{ fontSize: "0.72rem", color: C.muted, margin: 0 }}>Chartered Accountant · Available Mon–Fri</p>
              </div>
            </div>
            <button style={{ width: "100%", padding: "10px", borderRadius: "10px",
              background: "rgba(74,127,165,0.1)", border: `1px solid rgba(74,127,165,0.3)`,
              color: C.accentDark, fontWeight: 700, fontSize: "0.82rem", cursor: "pointer", ...font }}>
              📩 Message CA
            </button>
          </div>
          <div style={{ ...card, padding: "22px" }}>
            <p style={{ fontSize: "0.73rem", fontWeight: 700, color: C.muted, marginBottom: "14px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Raise a Ticket</p>
            <textarea placeholder="Describe your issue..." rows={4} style={{ width: "100%", padding: "10px 12px",
              borderRadius: "10px", border: `1.5px solid ${C.border}`, background: "rgba(30,58,95,0.03)",
              color: C.text, fontSize: "0.83rem", resize: "none", outline: "none",
              fontFamily: font.fontFamily, boxSizing: "border-box" }} />
            <button style={{ marginTop: "10px", width: "100%", padding: "10px", borderRadius: "10px",
              background: "linear-gradient(135deg, #1a3a6b 0%, #4a7fa5 100%)",
              border: "none", color: "#fff", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer", ...font }}>
              Submit Ticket
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const SECTIONS = { overview: Overview, income: Income, deductions: Deductions, tax: TaxCalc,
  filing: Filing, refund: Refund, documents: Documents, notifications: Notifications,
  settings: Settings, help: Help };

// ── Main Dashboard ────────────────────────────────────────────
export default function UserDashboard() {
  const router = useRouter();
  const [active, setActive] = useState("overview");
  const [fy, setFy] = useState("2025-26");
  const [profileOpen, setProfileOpen] = useState(false);
  const SectionComp = SECTIONS[active];

  return (
    <div style={{ ...font, display: "flex", minHeight: "100vh", background: C.bg, color: C.text }}>

      {/* ── Sidebar ── */}
      <aside style={{ width: "232px", minWidth: "232px", background: C.sidebar,
        position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 100,
        display: "flex", flexDirection: "column", overflowY: "auto" }}>

        {/* Logo */}
        <div style={{ padding: "22px 20px 16px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <p style={{ fontWeight: 900, fontSize: "1.1rem", color: "#fff", margin: 0, letterSpacing: "-0.01em" }}>Tax Planner</p>
          <p style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.35)", margin: "2px 0 0", fontStyle: "italic" }}>User Portal</p>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "12px 10px" }}>
          {NAV.map((n) => (
            <button key={n.key} onClick={() => setActive(n.key)} style={{
              width: "100%", display: "flex", alignItems: "center", gap: "10px",
              padding: "10px 12px", borderRadius: "10px", marginBottom: "2px",
              background: active === n.key ? C.sidebarActive : "transparent",
              border: "none", cursor: "pointer", textAlign: "left", transition: "background 0.15s",
            }}
              onMouseEnter={(e) => { if (active !== n.key) e.currentTarget.style.background = C.sidebarHover; }}
              onMouseLeave={(e) => { if (active !== n.key) e.currentTarget.style.background = "transparent"; }}
            >
              <span style={{ width: "18px", textAlign: "center", fontSize: "0.85rem", opacity: active === n.key ? 1 : 0.5 }}>{n.icon}</span>
              <span style={{ fontSize: "0.83rem", fontWeight: active === n.key ? 700 : 500,
                color: active === n.key ? "#fff" : "rgba(255,255,255,0.6)" }}>{n.label}</span>
              {n.key === "notifications" && (
                <span style={{ marginLeft: "auto", width: "18px", height: "18px", borderRadius: "50%",
                  background: "#e53e3e", color: "#fff", fontSize: "0.6rem", fontWeight: 800,
                  display: "flex", alignItems: "center", justifyContent: "center" }}>2</span>
              )}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div style={{ padding: "16px 12px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <button onClick={() => router.push("/")} style={{
            width: "100%", padding: "9px 12px", borderRadius: "10px",
            background: "rgba(255,255,255,0.06)", border: "none", cursor: "pointer",
            color: "rgba(255,255,255,0.5)", fontSize: "0.78rem", fontWeight: 600,
            textAlign: "left", fontFamily: font.fontFamily, display: "flex", alignItems: "center", gap: "8px",
          }}>
            <span>→</span> Home
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div style={{ flex: 1, marginLeft: "232px", display: "flex", flexDirection: "column" }}>

        {/* Top Bar */}
        <header style={{ position: "sticky", top: 0, zIndex: 90, background: C.white,
          borderBottom: `1px solid ${C.border}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 28px", height: "56px", boxShadow: "0 1px 6px rgba(30,58,95,0.06)" }}>
          <div>
            <span style={{ fontSize: "0.88rem", fontWeight: 700, color: C.text }}>Welcome back, </span>
            <span style={{ fontSize: "0.88rem", fontWeight: 900, color: C.accentDark }}>Ramesh</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <select value={fy} onChange={(e) => setFy(e.target.value)} style={{ padding: "6px 12px",
              borderRadius: "8px", border: `1.5px solid ${C.border}`, background: C.white,
              color: C.text, fontSize: "0.8rem", fontWeight: 700, fontFamily: font.fontFamily, cursor: "pointer" }}>
              <option value="2025-26">FY 2025–26</option>
              <option value="2026-27">FY 2026–27</option>
            </select>

            {/* Notification bell */}
            <div style={{ position: "relative", cursor: "pointer" }}>
              <span style={{ fontSize: "1.1rem" }}>🔔</span>
              <span style={{ position: "absolute", top: "-4px", right: "-4px", width: "14px", height: "14px",
                borderRadius: "50%", background: "#e53e3e", color: "#fff",
                fontSize: "0.55rem", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>2</span>
            </div>

            {/* Profile */}
            <div style={{ position: "relative" }}>
              <button onClick={() => setProfileOpen(!profileOpen)} style={{
                display: "flex", alignItems: "center", gap: "8px", padding: "6px 12px",
                borderRadius: "10px", border: `1px solid ${C.border}`, background: "rgba(30,58,95,0.04)",
                cursor: "pointer", fontFamily: font.fontFamily,
              }}>
                <div style={{ width: "28px", height: "28px", borderRadius: "50%",
                  background: "linear-gradient(135deg, #1e3a5f, #4a7fa5)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontWeight: 800, fontSize: "0.7rem" }}>RK</div>
                <span style={{ fontSize: "0.8rem", fontWeight: 700, color: C.text }}>Ramesh K</span>
                <span style={{ fontSize: "0.7rem", color: C.muted }}>▾</span>
              </button>
              {profileOpen && (
                <div style={{ position: "absolute", right: 0, top: "44px", width: "170px",
                  ...card, padding: "8px", zIndex: 200 }}>
                  {[["⚙ Settings","settings"],["👤 Profile","settings"],["→ Sign Out","signout"]].map(([label, key]) => (
                    <button key={label} onClick={() => { if (key === "signout") router.push("/signin"); else { setActive(key); setProfileOpen(false); } }} style={{
                      width: "100%", padding: "9px 12px", borderRadius: "8px",
                      background: "none", border: "none", cursor: "pointer",
                      textAlign: "left", fontSize: "0.82rem", color: C.text, fontFamily: font.fontFamily,
                      transition: "background 0.15s",
                    }}
                      onMouseEnter={(e) => e.currentTarget.style.background = C.bg}
                      onMouseLeave={(e) => e.currentTarget.style.background = "none"}
                    >{label}</button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, padding: "32px 28px", maxWidth: "1100px", width: "100%", alignSelf: "center", boxSizing: "border-box" }}>
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22 }}>
              <SectionComp />
            </motion.div>
          </AnimatePresence>
        </main>

      </div>
    </div>
  );
}
