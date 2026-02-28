"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// ── Palette ───────────────────────────────────────────────────
const C = {
  sidebar: "#080f1c",
  sidebarHover: "rgba(74,127,165,0.16)",
  sidebarActive: "rgba(74,127,165,0.26)",
  accent: "#4a7fa5",
  accentDark: "#1e3a5f",
  bg: "#eef1f7",
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
  background: C.white,
  borderRadius: "14px",
  boxShadow: "0 2px 16px rgba(30,58,95,0.07)",
  border: `1px solid ${C.border}`,
};
const fadeIn = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.32 } },
};

// ── Navigation ────────────────────────────────────────────────
const NAV = [
  { key: "overview",      icon: "⊞", label: "Admin Overview" },
  { key: "users",         icon: "👥", label: "User Management" },
  { key: "compliance",    icon: "✓", label: "Compliance & Filings" },
  { key: "payroll",       icon: "₹", label: "Payroll & Salary" },
  { key: "documents",     icon: "⊡", label: "Documents & Records" },
  { key: "reports",       icon: "📊", label: "Reports & Analytics" },
  { key: "org",           icon: "🏢", label: "Org Settings" },
  { key: "roles",         icon: "🔐", label: "Roles & Permissions" },
  { key: "audit",         icon: "⊙", label: "Audit Logs" },
  { key: "support",       icon: "💬", label: "Support" },
];

// ── Reusable atoms ────────────────────────────────────────────
function Badge({ color, bg, children }) {
  return (
    <span style={{ fontSize: "0.67rem", fontWeight: 700, padding: "3px 9px",
      borderRadius: "999px", background: bg, color, letterSpacing: "0.04em" }}>
      {children}
    </span>
  );
}

function SectionHeader({ title, sub, action }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
      <div>
        <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: C.text, margin: 0 }}>{title}</h2>
        {sub && <p style={{ fontSize: "0.8rem", color: C.muted, marginTop: "4px" }}>{sub}</p>}
      </div>
      {action}
    </div>
  );
}

function StatCard({ label, value, sub, color, icon, trend }) {
  return (
    <div style={{ ...card, padding: "18px 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: "0.7rem", fontWeight: 700, color: C.muted, marginBottom: "6px",
            textTransform: "uppercase", letterSpacing: "0.09em" }}>{label}</p>
          <p style={{ fontSize: "1.55rem", fontWeight: 900, color: color || C.text, lineHeight: 1 }}>{value}</p>
          {sub && <p style={{ fontSize: "0.71rem", color: C.muted, marginTop: "6px" }}>{sub}</p>}
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}>
          {icon && <span style={{ fontSize: "1.3rem", opacity: 0.45 }}>{icon}</span>}
          {trend && <span style={{ fontSize: "0.67rem", fontWeight: 700,
            color: trend > 0 ? C.success : C.danger,
            background: trend > 0 ? C.successBg : C.dangerBg,
            padding: "2px 7px", borderRadius: "999px" }}>
            {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}%
          </span>}
        </div>
      </div>
    </div>
  );
}

function Pill({ children, color, bg }) {
  return (
    <span style={{ display: "inline-block", fontSize: "0.67rem", fontWeight: 700,
      padding: "2px 10px", borderRadius: "999px", background: bg || "rgba(30,58,95,0.08)",
      color: color || C.accentDark, letterSpacing: "0.04em" }}>
      {children}
    </span>
  );
}

function THead({ cols }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: cols.map(() => "1fr").join(" "),
      padding: "8px 0", borderBottom: `2px solid ${C.border}` }}>
      {cols.map((c, i) => (
        <span key={i} style={{ fontSize: "0.67rem", fontWeight: 800, color: C.muted,
          textTransform: "uppercase", letterSpacing: "0.09em" }}>{c}</span>
      ))}
    </div>
  );
}

function TRow({ cols, data }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: cols.map(() => "1fr").join(" "),
      padding: "11px 0", borderBottom: `1px solid ${C.border}`, alignItems: "center" }}>
      {data.map((d, i) => (
        <span key={i} style={{ fontSize: "0.83rem", color: C.text, fontWeight: i === 0 ? 600 : 400 }}>{d}</span>
      ))}
    </div>
  );
}

function SectionDivider({ label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "28px 0 18px" }}>
      <span style={{ fontSize: "0.67rem", fontWeight: 800, color: C.accent,
        textTransform: "uppercase", letterSpacing: "0.14em", whiteSpace: "nowrap" }}>
        {label}
      </span>
      <div style={{ flex: 1, height: "1px", background: C.border }} />
    </div>
  );
}

function ActionBtn({ children, onClick, variant = "primary", small }) {
  const base = {
    border: "none", cursor: "pointer", borderRadius: "10px",
    fontWeight: 700, fontFamily: font.fontFamily,
    fontSize: small ? "0.75rem" : "0.82rem",
    padding: small ? "6px 14px" : "9px 20px",
    transition: "opacity 0.18s",
  };
  const styles = {
    primary: { background: "linear-gradient(135deg, #1a3a6b, #4a7fa5)", color: "#fff" },
    secondary: { background: "rgba(74,127,165,0.12)", color: C.accentDark },
    danger: { background: C.dangerBg, color: C.danger },
  };
  return (
    <button style={{ ...base, ...styles[variant] }} onClick={onClick}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}>
      {children}
    </button>
  );
}

// ═══════════════════════════════════════════════════════════
// ── SECTION COMPONENTS ────────────────────────────────────
// ═══════════════════════════════════════════════════════════

function Overview() {
  return (
    <motion.div variants={fadeIn} initial="hidden" animate="visible">
      <SectionHeader
        title="Admin Overview"
        sub="Organization compliance summary · FY 2025–26"
        action={<ActionBtn small>Export Report</ActionBtn>}
      />

      {/* KPI Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginBottom: "28px" }}>
        <StatCard label="Active Users"     value="248"   icon="👥" trend={6}   color={C.accentDark} sub="↑ 14 this month" />
        <StatCard label="Pending Filings"  value="31"    icon="📋" trend={-12} color={C.warning}   sub="Due within 7 days" />
        <StatCard label="Filed This FY"    value="217"   icon="✓"  trend={8}   color={C.success}   sub="88% completion rate" />
        <StatCard label="Open Alerts"      value="7"     icon="⚠"              color={C.danger}    sub="4 require action" />
        <StatCard label="Tax Saved (Total)"value="₹42L"              color={C.accentDark} sub="Across all employees" />
      </div>

      {/* Compliance health */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px", marginBottom: "28px" }}>
        <div style={{ ...card, padding: "22px 24px" }}>
          <p style={{ fontSize: "0.72rem", fontWeight: 800, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px" }}>Compliance Health</p>
          {[
            { label: "ITR Filed",           pct: 88, color: C.success },
            { label: "Form 16 Distributed", pct: 100, color: C.accent },
            { label: "TDS Compliance",      pct: 74, color: C.warning },
            { label: "Investment Proofs",   pct: 61, color: "#7c3aed" },
          ].map(({ label, pct, color }) => (
            <div key={label} style={{ marginBottom: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                <span style={{ fontSize: "0.8rem", fontWeight: 600, color: C.text }}>{label}</span>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, color }}>{pct}%</span>
              </div>
              <div style={{ height: "6px", borderRadius: "999px", background: "rgba(30,58,95,0.1)" }}>
                <div style={{ height: "100%", width: `${pct}%`, borderRadius: "999px", background: color, transition: "width 0.7s ease" }} />
              </div>
            </div>
          ))}
        </div>

        <div style={{ ...card, padding: "22px 24px" }}>
          <p style={{ fontSize: "0.72rem", fontWeight: 800, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px" }}>Upcoming Deadlines</p>
          {[
            { date: "Mar 15", label: "Advance Tax Q4",     urgent: true },
            { date: "Mar 31", label: "FY 2025–26 Close",   urgent: true },
            { date: "Apr 30", label: "Form 16 Generation", urgent: false },
            { date: "Jul 31", label: "ITR Filing Deadline", urgent: false },
          ].map(({ date, label, urgent }) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "8px 0", borderBottom: `1px solid ${C.border}` }}>
              <div>
                <p style={{ fontSize: "0.82rem", fontWeight: 600, color: C.text, margin: 0 }}>{label}</p>
                <p style={{ fontSize: "0.7rem", color: C.muted, margin: 0 }}>{date}, 2026</p>
              </div>
              {urgent && <Badge color={C.danger} bg={C.dangerBg}>Urgent</Badge>}
            </div>
          ))}
        </div>
      </div>

      {/* Recent activity */}
      <div style={{ ...card, padding: "22px 24px" }}>
        <p style={{ fontSize: "0.72rem", fontWeight: 800, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "14px" }}>Recent System Activity</p>
        {[
          { who: "CA Priya Sharma",  action: "Reviewed and approved ITR for Rakesh M.",  time: "2 min ago", type: "filing" },
          { who: "HR Admin",         action: "Uploaded Form 16 batch (42 employees).",    time: "1 hr ago",  type: "document" },
          { who: "System",           action: "TDS mismatch flag raised for 3 users.",     time: "3 hr ago",  type: "alert" },
          { who: "Arun Verma",       action: "Logged in from new device (Mumbai, IN).",   time: "5 hr ago",  type: "login" },
          { who: "Super Admin",      action: "Modified access level for Funder role.",    time: "Yesterday", type: "role" },
        ].map(({ who, action, time, type }) => {
          const typeColor = { filing: C.success, document: C.accent, alert: C.danger, login: C.muted, role: "#7c3aed" };
          return (
            <div key={action} style={{ display: "flex", gap: "12px", padding: "9px 0", borderBottom: `1px solid ${C.border}`, alignItems: "flex-start" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: typeColor[type] || C.accent, marginTop: "6px", flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: "0.82rem", fontWeight: 700, color: C.text }}>{who}</span>
                <span style={{ fontSize: "0.82rem", color: C.muted }}>&nbsp;— {action}</span>
              </div>
              <span style={{ fontSize: "0.7rem", color: C.muted, whiteSpace: "nowrap" }}>{time}</span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

function UserManagement() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const users = [
    { name: "Rakesh Mehta",    email: "r.mehta@acme.com",    role: "Employee",  status: "Filed",   fy: "2025–26", risk: "Low" },
    { name: "Sunita Rao",      email: "s.rao@acme.com",      role: "Employee",  status: "Pending", fy: "2025–26", risk: "Med" },
    { name: "Kiran S.",        email: "kiran@acme.com",      role: "Freelancer",status: "In Progress",fy:"2025–26",risk:"Low"},
    { name: "Divya Nair",      email: "d.nair@acme.com",     role: "Employee",  status: "Not Started",fy:"2025–26",risk:"High"},
    { name: "Arjun Kapoor",    email: "a.kapoor@acme.com",   role: "Employee",  status: "Filed",   fy: "2025–26", risk: "Low" },
    { name: "Meera Joshi",     email: "m.joshi@acme.com",    role: "Employee",  status: "Pending", fy: "2025–26", risk: "Med" },
    { name: "Rohit Sharma",    email: "rohit@vendor.com",    role: "Contractor",status: "Filed",   fy: "2025–26", risk: "Low" },
  ];
  const statusColor = { Filed: C.success, Pending: C.warning, "In Progress": C.accent, "Not Started": C.danger };
  const riskColor   = { Low: C.success,   Med: C.warning,     High: C.danger };
  const filtered = users.filter(u =>
    (filter === "all" || u.status.toLowerCase().replace(" ", "-") === filter) &&
    (u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))
  );
  return (
    <motion.div variants={fadeIn} initial="hidden" animate="visible">
      <SectionHeader title="User Management" sub="View, search and manage all registered employees and clients"
        action={<ActionBtn small>+ Add User</ActionBtn>} />

      <div style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
        <input placeholder="Search by name or email…" value={search} onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, minWidth: "240px", padding: "9px 14px", borderRadius: "10px",
            border: `1.5px solid ${C.border}`, background: C.white, color: C.text,
            fontSize: "0.85rem", outline: "none", fontFamily: font.fontFamily }} />
        {["all","filed","pending","in-progress","not-started"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: "9px 16px", borderRadius: "10px",
            border: `1.5px solid ${filter === f ? C.accent : C.border}`,
            background: filter === f ? "rgba(74,127,165,0.12)" : C.white,
            color: filter === f ? C.accentDark : C.muted, fontWeight: 700, fontSize: "0.75rem",
            cursor: "pointer", fontFamily: font.fontFamily, textTransform: "capitalize" }}>
            {f.replace("-", " ")}
          </button>
        ))}
      </div>

      <div style={{ ...card, padding: "0 24px" }}>
        <THead cols={["Name", "Email", "Role", "FY", "Status", "Risk", "Actions"]} />
        {filtered.map(u => (
          <TRow key={u.email} cols={Array(7).fill("1fr")} data={[
            u.name,
            u.email,
            u.role,
            u.fy,
            <Pill key="s" color={statusColor[u.status] || C.muted} bg={`${statusColor[u.status]}20`}>{u.status}</Pill>,
            <Pill key="r" color={riskColor[u.risk] || C.muted} bg={`${riskColor[u.risk]}18`}>{u.risk}</Pill>,
            <div key="a" style={{ display: "flex", gap: "6px" }}>
              <ActionBtn small variant="secondary">View</ActionBtn>
              <ActionBtn small variant="secondary">Edit</ActionBtn>
            </div>,
          ]} />
        ))}
        {filtered.length === 0 && (
          <p style={{ padding: "24px 0", textAlign: "center", color: C.muted, fontSize: "0.85rem" }}>No users match your filter.</p>
        )}
      </div>
    </motion.div>
  );
}

function Compliance() {
  const filings = [
    { name: "Rakesh Mehta",  form: "ITR-1", status: "Filed",    date: "22 Jan 2026", ack: "AAQ123456", ca: "CA Priya" },
    { name: "Sunita Rao",    form: "ITR-2", status: "Pending",  date: "—",           ack: "—",         ca: "CA Priya" },
    { name: "Kiran S.",      form: "ITR-3", status: "Review",   date: "—",           ack: "—",         ca: "Unassigned" },
    { name: "Divya Nair",    form: "ITR-1", status: "Error",    date: "—",           ack: "—",         ca: "CA Rahul" },
    { name: "Arjun Kapoor",  form: "ITR-1", status: "Filed",    date: "18 Jan 2026", ack: "AAQ987321", ca: "CA Priya" },
  ];
  const statusColor = { Filed: C.success, Pending: C.warning, Review: C.accent, Error: C.danger };
  return (
    <motion.div variants={fadeIn} initial="hidden" animate="visible">
      <SectionHeader title="Compliance & Filings" sub="Track, review, and manage all ITR filings and CA workflows"
        action={<ActionBtn small>Bulk Action</ActionBtn>} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: "14px", marginBottom: "24px" }}>
        <StatCard label="Total Filings"    value="248" color={C.accentDark} />
        <StatCard label="Filed"            value="217" color={C.success} />
        <StatCard label="Pending"          value="21"  color={C.warning} />
        <StatCard label="Errors / Flags"   value="7"   color={C.danger} />
        <StatCard label="Under CA Review"  value="3"   color={C.accent} />
      </div>

      <SectionDivider label="Filing Calendar" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "10px", marginBottom: "28px" }}>
        {[
          { month: "Mar 15", label: "Advance Tax Q4 Due",   status: "urgent" },
          { month: "Mar 31", label: "FY 2025–26 Close",     status: "urgent" },
          { month: "Apr 30", label: "Form 16 Dispatch",     status: "upcoming" },
          { month: "Jul 31", label: "ITR Filing Deadline",  status: "upcoming" },
        ].map(({ month, label, status }) => (
          <div key={label} style={{ ...card, padding: "14px 16px", borderLeft: `3px solid ${status === "urgent" ? C.danger : C.accent}` }}>
            <p style={{ fontSize: "0.72rem", fontWeight: 800, color: status === "urgent" ? C.danger : C.accent, marginBottom: "4px" }}>{month}</p>
            <p style={{ fontSize: "0.82rem", fontWeight: 600, color: C.text }}>{label}</p>
          </div>
        ))}
      </div>

      <SectionDivider label="Bulk Filing Status" />
      <div style={{ ...card, padding: "0 24px" }}>
        <THead cols={["Employee", "Form", "Status", "Filed On", "Ack. No.", "CA Assigned"]} />
        {filings.map(f => (
          <TRow key={f.name} cols={Array(6).fill("1fr")} data={[
            f.name, f.form,
            <Pill key="s" color={statusColor[f.status]} bg={`${statusColor[f.status]}20`}>{f.status}</Pill>,
            f.date, f.ack, f.ca,
          ]} />
        ))}
      </div>

      <SectionDivider label="Pending CA Review" />
      <div style={{ ...card, padding: "20px 24px" }}>
        {[
          { user: "Kiran S.",   ca: "Unassigned", notes: "Multiple income sources — needs ITR-3 review", urgent: true },
          { user: "Meera Joshi",ca: "CA Rahul",   notes: "Investment proof mismatch under 80C",          urgent: false },
        ].map(({ user, ca, notes, urgent }) => (
          <div key={user} style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "12px 0", borderBottom: `1px solid ${C.border}` }}>
            <div>
              <span style={{ fontWeight: 700, fontSize: "0.85rem", color: C.text }}>{user}</span>
              <span style={{ fontSize: "0.78rem", color: C.muted, marginLeft: "8px" }}>— {notes}</span>
            </div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              {urgent && <Badge color={C.danger} bg={C.dangerBg}>Urgent</Badge>}
              <span style={{ fontSize: "0.78rem", color: C.muted }}>{ca}</span>
              <ActionBtn small variant="secondary">Assign CA</ActionBtn>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function Payroll() {
  return (
    <motion.div variants={fadeIn} initial="hidden" animate="visible">
      <SectionHeader title="Payroll & Salary Structures" sub="Manage salary templates, TDS computation, and employee mapping"
        action={<ActionBtn small>+ New Template</ActionBtn>} />

      <SectionDivider label="Salary Templates" />
      <div style={{ ...card, padding: "0 24px", marginBottom: "28px" }}>
        <THead cols={["Template Name", "Employees", "Basic %", "HRA %", "Special Allowance", "TDS Status"]} />
        {[
          { name: "Standard – Band A", emp: 142, basic: "40%", hra: "20%", special: "₹12,000/mo", tds: "Active" },
          { name: "Standard – Band B", emp: 78,  basic: "50%", hra: "25%", special: "₹8,500/mo",  tds: "Active" },
          { name: "Senior Management", emp: 14,  basic: "60%", hra: "30%", special: "₹24,000/mo", tds: "Active" },
          { name: "Contractor Base",   emp: 14,  basic: "80%", hra: "—",   special: "—",           tds: "Fixed Rate" },
        ].map(r => (
          <TRow key={r.name} cols={Array(6).fill("1fr")} data={[
            r.name, r.emp, r.basic, r.hra, r.special,
            <Pill key="t" color={C.success} bg={C.successBg}>{r.tds}</Pill>,
          ]} />
        ))}
      </div>

      <SectionDivider label="Tax-Optimisation Recommendations" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))", gap: "14px", marginBottom: "28px" }}>
        {[
          { title: "Rebalance HRA Component", desc: "21 employees in metro cities are under-claiming HRA. Adjusting the structure can save ≈₹2.1L collectively.", tag: "Structure" },
          { title: "NPS Employer Contribution", desc: "Enabling NPS under Sec 80CCD(2) for Band B employees allows tax-free employer contribution up to 10% of salary.", tag: "Benefits" },
          { title: "Leave Travel Allowance", desc: "LTA not configured in Band A template. Employees can claim ₹20,000–₹60,000 per block year.", tag: "Allowance" },
        ].map(({ title, desc, tag }) => (
          <div key={title} style={{ ...card, padding: "18px 20px", borderLeft: `3px solid ${C.accent}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <p style={{ fontWeight: 700, fontSize: "0.88rem", color: C.text, margin: 0 }}>{title}</p>
              <Pill>{tag}</Pill>
            </div>
            <p style={{ fontSize: "0.78rem", color: C.muted, lineHeight: 1.6 }}>{desc}</p>
          </div>
        ))}
      </div>

      <SectionDivider label="Export Payroll Data" />
      <div style={{ ...card, padding: "20px 24px", display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <p style={{ fontWeight: 700, fontSize: "0.88rem", color: C.text, margin: "0 0 4px" }}>Payroll Export</p>
          <p style={{ fontSize: "0.78rem", color: C.muted }}>Download full payroll data for the current financial year in PDF or Excel format.</p>
        </div>
        <ActionBtn small variant="secondary">Export CSV</ActionBtn>
        <ActionBtn small variant="secondary">Export PDF</ActionBtn>
        <ActionBtn small>Generate Form 16 Batch</ActionBtn>
      </div>
    </motion.div>
  );
}

function Documents() {
  const docs = [
    { name: "Form 16 – Rakesh Mehta",  type: "Form 16",  fy: "2025–26", size: "248 KB", uploaded: "22 Jan 2026", access: "Employee" },
    { name: "ITR-V Acknowledgment",    type: "ITR-V",    fy: "2025–26", size: "54 KB",  uploaded: "22 Jan 2026", access: "All" },
    { name: "Salary Certificate – Q3", type: "Payroll",  fy: "2025–26", size: "1.2 MB", uploaded: "15 Dec 2025", access: "HR, CA" },
    { name: "Investment Declaration",  type: "80C Proof",fy: "2025–26", size: "380 KB", uploaded: "5 Jan 2026",  access: "Employee" },
    { name: "GST Certificate – ACME",  type: "GST",      fy: "2025–26", size: "120 KB", uploaded: "1 Apr 2025",  access: "Admin" },
  ];
  return (
    <motion.div variants={fadeIn} initial="hidden" animate="visible">
      <SectionHeader title="Documents & Records" sub="Centralised, year-wise secure document repository"
        action={<ActionBtn small>+ Upload</ActionBtn>} />

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
        {["All", "Form 16", "ITR-V", "Payroll", "GST", "Investments"].map(t => (
          <button key={t} style={{ padding: "7px 15px", borderRadius: "10px", border: `1.5px solid ${C.border}`,
            background: C.white, color: C.muted, fontWeight: 700, fontSize: "0.74rem",
            cursor: "pointer", fontFamily: font.fontFamily }}>
            {t}
          </button>
        ))}
      </div>

      <div style={{ ...card, padding: "0 24px" }}>
        <THead cols={["Document Name", "Type", "FY", "Size", "Uploaded", "Access", "Action"]} />
        {docs.map(d => (
          <TRow key={d.name} cols={Array(7).fill("1fr")} data={[
            d.name, <Pill key="t">{d.type}</Pill>, d.fy, d.size, d.uploaded,
            <Pill key="a" color={C.accent} bg="rgba(74,127,165,0.1)">{d.access}</Pill>,
            <div key="btn" style={{ display: "flex", gap: "6px" }}>
              <ActionBtn small variant="secondary">↓</ActionBtn>
              <ActionBtn small variant="danger">Delete</ActionBtn>
            </div>,
          ]} />
        ))}
      </div>

      <div style={{ ...card, padding: "20px 24px", marginTop: "20px" }}>
        <p style={{ fontSize: "0.72rem", fontWeight: 800, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>Storage Overview</p>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
          <span style={{ fontSize: "0.82rem", color: C.text, fontWeight: 600 }}>4.3 GB used of 20 GB</span>
          <span style={{ fontSize: "0.78rem", color: C.muted }}>21% used</span>
        </div>
        <div style={{ height: "8px", borderRadius: "999px", background: "rgba(30,58,95,0.1)" }}>
          <div style={{ height: "100%", width: "21%", borderRadius: "999px", background: C.accent }} />
        </div>
      </div>
    </motion.div>
  );
}

function Reports() {
  return (
    <motion.div variants={fadeIn} initial="hidden" animate="visible">
      <SectionHeader title="Reports & Analytics" sub="Organisation-wide tax and compliance metrics for FY 2025–26"
        action={<ActionBtn small>Export All</ActionBtn>} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px,1fr))", gap: "14px", marginBottom: "28px" }}>
        <StatCard label="Filing Completion"  value="88%"    color={C.success}   trend={4}  sub="Target: 95%" />
        <StatCard label="Total Tax Saved"    value="₹42.4L" color={C.accentDark}           sub="Across 248 employees" />
        <StatCard label="Total Refunds Due"  value="₹8.1L"  color={C.accent}               sub="31 employees" />
        <StatCard label="Avg TDS Per Emp."   value="₹1.8L"  color={C.text}                 sub="FY 2025–26" />
      </div>

      <SectionDivider label="Filing Completion by Band" />
      <div style={{ ...card, padding: "22px 24px", marginBottom: "24px" }}>
        {[
          { label: "Band A – Standard",    pct: 93, count: "132/142", color: C.success },
          { label: "Band B – Standard",    pct: 83, count: "65/78",   color: C.accent },
          { label: "Senior Management",    pct: 100, count: "14/14",  color: C.accentDark },
          { label: "Contractors",          pct: 71, count: "10/14",   color: C.warning },
        ].map(({ label, pct, count, color }) => (
          <div key={label} style={{ marginBottom: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
              <span style={{ fontSize: "0.82rem", fontWeight: 600, color: C.text }}>{label}</span>
              <span style={{ fontSize: "0.8rem", color: C.muted }}>{count} &nbsp;<strong style={{ color }}>{pct}%</strong></span>
            </div>
            <div style={{ height: "6px", borderRadius: "999px", background: "rgba(30,58,95,0.08)" }}>
              <div style={{ height: "100%", width: `${pct}%`, borderRadius: "999px", background: color, transition: "width 0.7s ease" }} />
            </div>
          </div>
        ))}
      </div>

      <SectionDivider label="Top Deduction Buckets" />
      <div style={{ ...card, padding: "0 24px", marginBottom: "24px" }}>
        <THead cols={["Section", "Description", "Total Claimed (Org)", "Avg per Emp."]} />
        {[
          { sec: "80C",     desc: "ELSS, PPF, LIC, Tuition",     total: "₹24.6L", avg: "₹99,200" },
          { sec: "80D",     desc: "Health Insurance Premium",      total: "₹6.8L",  avg: "₹27,400" },
          { sec: "HRA",     desc: "House Rent Allowance",          total: "₹18.2L", avg: "₹73,400" },
          { sec: "80CCD(2)",desc: "NPS Employer Contribution",     total: "₹3.4L",  avg: "₹24,300" },
          { sec: "24(b)",   desc: "Home Loan Interest",            total: "₹9.1L",  avg: "₹1,30,000" },
        ].map(r => (
          <TRow key={r.sec} cols={Array(4).fill("1fr")} data={[
            <strong key="s">{r.sec}</strong>, r.desc, r.total, r.avg,
          ]} />
        ))}
      </div>

      <SectionDivider label="Downloadable Reports" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", gap: "14px" }}>
        {[
          { title: "Full Compliance Report", desc: "All employees, all filings, FY 2025–26", icon: "📋" },
          { title: "Refund Summary",         desc: "Employees eligible for tax refunds",      icon: "↩" },
          { title: "TDS Reconciliation",     desc: "26AS vs computed TDS mismatch report",    icon: "⚖" },
          { title: "Salary Structure Audit", desc: "All templates and TDS computation",       icon: "₹" },
        ].map(({ title, desc, icon }) => (
          <div key={title} style={{ ...card, padding: "18px 20px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <span style={{ fontSize: "1.3rem" }}>{icon}</span>
              <div>
                <p style={{ fontWeight: 700, fontSize: "0.85rem", color: C.text, margin: "0 0 3px" }}>{title}</p>
                <p style={{ fontSize: "0.74rem", color: C.muted }}>{desc}</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <ActionBtn small variant="secondary">PDF</ActionBtn>
              <ActionBtn small variant="secondary">Excel</ActionBtn>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function OrgSettings() {
  return (
    <motion.div variants={fadeIn} initial="hidden" animate="visible">
      <SectionHeader title="Organisation Settings" sub="Update your organisation profile, compliance identifiers, and billing plan" />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <div style={{ ...card, padding: "24px" }}>
          <SectionDivider label="Organisation Profile" />
          {[
            { label: "Organisation Name", value: "ACME Consulting Pvt. Ltd." },
            { label: "Industry",          value: "Financial Services" },
            { label: "Incorporation",     value: "April 12, 2015" },
            { label: "Registered Address",value: "14B, DLF Cyber City, Gurugram, HR 122002" },
          ].map(({ label, value }) => (
            <div key={label} style={{ marginBottom: "14px" }}>
              <p style={{ fontSize: "0.7rem", fontWeight: 700, color: C.muted, marginBottom: "3px", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</p>
              <p style={{ fontSize: "0.88rem", color: C.text, fontWeight: 600 }}>{value}</p>
            </div>
          ))}
          <ActionBtn small variant="secondary">Edit Profile</ActionBtn>
        </div>

        <div style={{ ...card, padding: "24px" }}>
          <SectionDivider label="Tax Identifiers" />
          {[
            { label: "PAN",      value: "AABCC1234F",               verified: true },
            { label: "GST",      value: "22AABCC1234F1Z3",           verified: true },
            { label: "TAN",      value: "DELA12345B",                verified: true },
            { label: "CIN",      value: "U74999HR2015PTC000000",     verified: false },
          ].map(({ label, value, verified }) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
              <div>
                <p style={{ fontSize: "0.7rem", fontWeight: 700, color: C.muted, marginBottom: "3px", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</p>
                <p style={{ fontSize: "0.88rem", color: C.text, fontWeight: 700, letterSpacing: "0.06em" }}>{value}</p>
              </div>
              <Badge color={verified ? C.success : C.warning} bg={verified ? C.successBg : C.warningBg}>
                {verified ? "Verified" : "Pending"}
              </Badge>
            </div>
          ))}
        </div>

        <div style={{ ...card, padding: "24px" }}>
          <SectionDivider label="Financial Year Configuration" />
          {[
            { label: "Active FY",        value: "2025–26" },
            { label: "FY Period",        value: "Apr 1, 2025 – Mar 31, 2026" },
            { label: "Payroll Cycle",    value: "Monthly (Last working day)" },
            { label: "Regime Default",   value: "New Regime (Sec 115BAC)" },
          ].map(({ label, value }) => (
            <div key={label} style={{ marginBottom: "14px" }}>
              <p style={{ fontSize: "0.7rem", fontWeight: 700, color: C.muted, marginBottom: "3px", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</p>
              <p style={{ fontSize: "0.88rem", color: C.text, fontWeight: 600 }}>{value}</p>
            </div>
          ))}
          <ActionBtn small variant="secondary">Configure FY</ActionBtn>
        </div>

        <div style={{ ...card, padding: "24px" }}>
          <SectionDivider label="Billing & Plan" />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div>
              <p style={{ fontWeight: 800, fontSize: "1.1rem", color: C.accentDark }}>Enterprise Plan</p>
              <p style={{ fontSize: "0.78rem", color: C.muted, marginTop: "2px" }}>Renews Apr 1, 2026 · ₹1,20,000/yr</p>
            </div>
            <Badge color={C.success} bg={C.successBg}>Active</Badge>
          </div>
          {[
            { feature: "Users", limit: "Unlimited" },
            { feature: "Filings", limit: "Unlimited" },
            { feature: "Storage", limit: "20 GB" },
            { feature: "CA Access", limit: "Included" },
          ].map(({ feature, limit }) => (
            <div key={feature} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${C.border}` }}>
              <span style={{ fontSize: "0.8rem", color: C.muted }}>{feature}</span>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: C.text }}>{limit}</span>
            </div>
          ))}
          <div style={{ marginTop: "14px" }}><ActionBtn small>Manage Billing</ActionBtn></div>
        </div>
      </div>
    </motion.div>
  );
}

function Roles() {
  return (
    <motion.div variants={fadeIn} initial="hidden" animate="visible">
      <SectionHeader title="Roles & Permissions" sub="Define and control role-based access across the platform"
        action={<ActionBtn small>+ New Role</ActionBtn>} />

      <SectionDivider label="Role Definitions" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: "14px", marginBottom: "28px" }}>
        {[
          { role: "HR",      level: "Write", count: 4,  desc: "Manages payroll, Form 16, onboarding", color: "#7c3aed" },
          { role: "Admin",   level: "Super", count: 2,  desc: "Full platform access and configuration", color: C.danger },
          { role: "CA",      level: "Write", count: 3,  desc: "Reviews filings, manages client tax",   color: C.accent },
          { role: "Funder",  level: "Read",  count: 1,  desc: "Aggregate reporting and insights only", color: C.success },
        ].map(({ role, level, count, desc, color }) => (
          <div key={role} style={{ ...card, padding: "18px 20px", borderTop: `3px solid ${color}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <span style={{ fontWeight: 800, fontSize: "1rem", color: C.text }}>{role}</span>
              <Pill color={color} bg={`${color}22`}>{level}</Pill>
            </div>
            <p style={{ fontSize: "0.76rem", color: C.muted, marginBottom: "10px", lineHeight: 1.5 }}>{desc}</p>
            <p style={{ fontSize: "0.72rem", color: C.muted }}>{count} member{count > 1 ? "s" : ""}</p>
          </div>
        ))}
      </div>

      <SectionDivider label="Access Matrix" />
      <div style={{ ...card, padding: "0 24px", overflowX: "auto" }}>
        <THead cols={["Feature", "HR", "Admin", "CA", "Funder"]} />
        {[
          { feature: "User Management",     hr: "✓", admin: "✓", ca: "—",  funder: "—" },
          { feature: "Income & Salary",     hr: "✓", admin: "✓", ca: "✓",  funder: "View" },
          { feature: "ITR Filing",          hr: "✓", admin: "✓", ca: "✓",  funder: "—" },
          { feature: "Tax Calculation",     hr: "✓", admin: "✓", ca: "✓",  funder: "View" },
          { feature: "Documents",           hr: "✓", admin: "✓", ca: "✓",  funder: "—" },
          { feature: "Reports",             hr: "View", admin: "✓", ca: "View", funder: "✓" },
          { feature: "Org Settings",        hr: "—", admin: "✓", ca: "—",  funder: "—" },
          { feature: "Roles & Permissions", hr: "—", admin: "✓", ca: "—",  funder: "—" },
          { feature: "Audit Logs",          hr: "View", admin: "✓", ca: "View", funder: "—" },
          { feature: "Billing",             hr: "—", admin: "✓", ca: "—",  funder: "View" },
        ].map(r => (
          <TRow key={r.feature} cols={["2fr","1fr","1fr","1fr","1fr"]} data={[
            r.feature,
            r.hr    !== "—" ? <span key="h" style={{ color: C.success, fontWeight: 700 }}>{r.hr}</span>     : <span key="h" style={{ color: C.muted }}>—</span>,
            r.admin !== "—" ? <span key="a" style={{ color: C.success, fontWeight: 700 }}>{r.admin}</span>  : <span key="a" style={{ color: C.muted }}>—</span>,
            r.ca    !== "—" ? <span key="c" style={{ color: C.accent, fontWeight: 700 }}>{r.ca}</span>      : <span key="c" style={{ color: C.muted }}>—</span>,
            r.funder!== "—" ? <span key="f" style={{ color: C.warning, fontWeight: 700 }}>{r.funder}</span> : <span key="f" style={{ color: C.muted }}>—</span>,
          ]} />
        ))}
      </div>
    </motion.div>
  );
}

function AuditLogs() {
  const logs = [
    { who: "Super Admin",     action: "Modified Write→Super access for CA role",             category: "Role Change",    time: "28 Feb 2026, 11:42",  ip: "103.21.x.x",  critical: true },
    { who: "CA Priya Sharma", action: "Approved ITR-1 for Rakesh Mehta (Ack: AAQ123456)",    category: "Filing",         time: "22 Jan 2026, 14:18",  ip: "49.36.x.x",   critical: false },
    { who: "HR Admin",        action: "Uploaded Form 16 batch (42 records)",                  category: "Document",       time: "21 Jan 2026, 10:05",  ip: "103.21.x.x",  critical: false },
    { who: "Arun Verma",      action: "Login from new device — Mumbai, IN",                   category: "Login",          time: "20 Jan 2026, 08:31",  ip: "117.97.x.x",  critical: true },
    { who: "System",          action: "TDS mismatch flag raised for 3 users",                 category: "Compliance",     time: "18 Jan 2026, 00:00",  ip: "System",       critical: true },
    { who: "HR Admin",        action: "Updated salary structure for Band B (78 employees)",   category: "Payroll",        time: "5 Jan 2026, 17:12",   ip: "103.21.x.x",  critical: false },
  ];
  const catColor = { "Role Change": "#7c3aed", Filing: C.success, Document: C.accent, Login: C.muted, Compliance: C.danger, Payroll: C.warning };
  return (
    <motion.div variants={fadeIn} initial="hidden" animate="visible">
      <SectionHeader title="Audit Logs" sub="Immutable record of all data modifications, logins, and compliance actions"
        action={<ActionBtn small variant="secondary">Export Logs</ActionBtn>} />

      <div style={{ ...card, padding: "0 24px" }}>
        <THead cols={["Actor", "Action", "Category", "IP Address", "Timestamp", "Flag"]} />
        {logs.map(l => (
          <TRow key={l.action} cols={["1.5fr","3fr","1fr","1fr","1.5fr","0.7fr"]} data={[
            <strong key="w" style={{ fontSize: "0.82rem" }}>{l.who}</strong>,
            l.action,
            <Pill key="c" color={catColor[l.category] || C.muted} bg={`${catColor[l.category] || C.muted}20`}>{l.category}</Pill>,
            <span key="ip" style={{ fontFamily: "monospace", fontSize: "0.78rem", color: C.muted }}>{l.ip}</span>,
            <span key="t" style={{ fontSize: "0.76rem", color: C.muted }}>{l.time}</span>,
            l.critical ? <Badge key="f" color={C.danger} bg={C.dangerBg}>Critical</Badge> : <span key="f" style={{ color: C.muted, fontSize: "0.8rem" }}>—</span>,
          ]} />
        ))}
      </div>
    </motion.div>
  );
}

function Support() {
  const tickets = [
    { id: "#T-1042", user: "Sunita Rao",   subject: "Form 16 not received",              status: "Open",     assigned: "HR Admin",   time: "2 hr ago" },
    { id: "#T-1041", user: "Kiran S.",     subject: "ITR form selection confusion",      status: "In Progress", assigned: "CA Priya", time: "5 hr ago" },
    { id: "#T-1039", user: "Meera Joshi",  subject: "80C limit showing incorrect value", status: "Resolved", assigned: "CA Rahul",   time: "Yesterday" },
    { id: "#T-1036", user: "Rohit Sharma", subject: "Can't upload salary slips",         status: "Open",     assigned: "Unassigned", time: "2 days ago" },
  ];
  const statusColor = { Open: C.danger, "In Progress": C.accent, Resolved: C.success };
  return (
    <motion.div variants={fadeIn} initial="hidden" animate="visible">
      <SectionHeader title="Support & Communication" sub="Manage user tickets, CA communication, and system announcements"
        action={<ActionBtn small>+ Announcement</ActionBtn>} />

      <SectionDivider label="Open Tickets" />
      <div style={{ ...card, padding: "0 24px", marginBottom: "24px" }}>
        <THead cols={["Ticket", "User", "Subject", "Status", "Assigned", "Received"]} />
        {tickets.map(t => (
          <TRow key={t.id} cols={["0.7fr","1fr","2fr","1fr","1fr","1fr"]} data={[
            <span key="id" style={{ fontFamily: "monospace", fontSize: "0.8rem", color: C.accent }}>{t.id}</span>,
            t.user, t.subject,
            <Pill key="s" color={statusColor[t.status]} bg={`${statusColor[t.status]}20`}>{t.status}</Pill>,
            t.assigned, t.time,
          ]} />
        ))}
      </div>

      <SectionDivider label="Announcements" />
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {[
          { title: "ITR Filing Deadline — Jul 31, 2026", body: "Remind all employees to complete their ITR filing before July 31, 2026. The CA team will be available for doubt resolution.", pinned: true },
          { title: "New Regime Default — FY 2025–26",    body: "Per CBDT circular, the new tax regime is now default for all salaried employees. Opt-out must be declared explicitly.", pinned: true },
          { title: "System Maintenance — Mar 2, 2026",   body: "Scheduled maintenance window from 1:00 AM to 4:00 AM IST. No data uploads or filings during this period.", pinned: false },
        ].map(({ title, body, pinned }) => (
          <div key={title} style={{ ...card, padding: "18px 20px", borderLeft: `3px solid ${pinned ? C.accent : C.border}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
              <p style={{ fontWeight: 700, fontSize: "0.9rem", color: C.text, margin: 0 }}>{title}</p>
              {pinned && <Pill color={C.accent} bg="rgba(74,127,165,0.1)">📌 Pinned</Pill>}
            </div>
            <p style={{ fontSize: "0.78rem", color: C.muted, lineHeight: 1.6 }}>{body}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ── Section map ───────────────────────────────────────────────
const SECTIONS = {
  overview: Overview, users: UserManagement, compliance: Compliance,
  payroll: Payroll, documents: Documents, reports: Reports,
  org: OrgSettings, roles: Roles, audit: AuditLogs, support: Support,
};

// ═══════════════════════════════════════════════════════════
// ── ROOT COMPONENT ────────────────────────────────────────
// ═══════════════════════════════════════════════════════════

export default function AdminPanel() {
  const router = useRouter();
  const [active, setActive] = useState("overview");
  const [profileOpen, setProfileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const ActiveSection = SECTIONS[active] || Overview;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: C.bg, ...font }}>

      {/* ── Sidebar ── */}
      <aside style={{
        width: sidebarOpen ? "240px" : "64px",
        flexShrink: 0, background: C.sidebar, display: "flex",
        flexDirection: "column", transition: "width 0.22s ease",
        position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 40,
        overflow: "hidden",
      }}>
        {/* Logo */}
        <div style={{ padding: "22px 18px", display: "flex", alignItems: "center", gap: "10px",
          borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "8px",
            background: "linear-gradient(135deg,#1e3a5f,#4a7fa5)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, fontSize: "0.85rem", fontWeight: 900, color: "#fff" }}>A</div>
          {sidebarOpen && (
            <div>
              <p style={{ fontWeight: 900, fontSize: "0.88rem", color: "#fff", margin: 0, letterSpacing: "-0.01em" }}>TaxPlanner</p>
              <p style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.38)", margin: 0, letterSpacing: "0.08em", textTransform: "uppercase" }}>Admin Console</p>
            </div>
          )}
        </div>

        {/* Role badge */}
        {sidebarOpen && (
          <div style={{ margin: "12px 14px", padding: "8px 12px", borderRadius: "8px",
            background: "rgba(74,127,165,0.14)", display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#48bb78", flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "rgba(255,255,255,0.6)", margin: 0, textTransform: "uppercase", letterSpacing: "0.1em" }}>Super Admin</p>
              <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.85)", margin: 0, fontWeight: 600 }}>ACME Consulting</p>
            </div>
          </div>
        )}

        {/* Nav */}
        <nav style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
          {NAV.map(({ key, icon, label }) => (
            <button key={key} onClick={() => setActive(key)}
              title={!sidebarOpen ? label : ""}
              style={{
                width: "100%", display: "flex", alignItems: "center",
                gap: "11px", padding: "10px 18px",
                background: active === key ? C.sidebarActive : "transparent",
                border: "none", cursor: "pointer", textAlign: "left",
                borderLeft: active === key ? `3px solid ${C.accent}` : "3px solid transparent",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => { if (active !== key) e.currentTarget.style.background = C.sidebarHover; }}
              onMouseLeave={(e) => { if (active !== key) e.currentTarget.style.background = "transparent"; }}
            >
              <span style={{ fontSize: "0.9rem", flexShrink: 0, width: "20px", textAlign: "center",
                opacity: active === key ? 1 : 0.6 }}>{icon}</span>
              {sidebarOpen && (
                <span style={{ fontSize: "0.8rem", fontWeight: active === key ? 800 : 500,
                  color: active === key ? "#ffffff" : "rgba(255,255,255,0.55)",
                  letterSpacing: "0.01em", whiteSpace: "nowrap" }}>{label}</span>
              )}
            </button>
          ))}
        </nav>

        {/* Collapse toggle */}
        <button onClick={() => setSidebarOpen(p => !p)}
          style={{ margin: "12px 14px", padding: "8px", borderRadius: "8px", border: "none",
            background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)",
            cursor: "pointer", fontSize: "0.8rem", transition: "background 0.15s" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}>
          {sidebarOpen ? "← Collapse" : "→"}
        </button>
      </aside>

      {/* ── Main ── */}
      <div style={{ marginLeft: sidebarOpen ? "240px" : "64px", flex: 1,
        transition: "margin-left 0.22s ease", display: "flex", flexDirection: "column" }}>

        {/* ── Top Bar ── */}
        <header style={{
          position: "sticky", top: 0, zIndex: 30,
          background: "rgba(238,241,247,0.92)", backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${C.border}`,
          padding: "0 28px", height: "60px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* Left: Org name + FY */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div>
              <span style={{ fontWeight: 800, fontSize: "0.9rem", color: C.text }}>ACME Consulting Pvt. Ltd.</span>
              <span style={{ fontSize: "0.72rem", color: C.muted, marginLeft: "8px" }}>· Super Admin</span>
            </div>
            <select style={{
              padding: "5px 10px", borderRadius: "8px",
              border: `1.5px solid ${C.border}`, background: C.white,
              fontSize: "0.78rem", fontWeight: 700, color: C.accentDark,
              fontFamily: font.fontFamily, cursor: "pointer", outline: "none",
            }}>
              <option>FY 2025–26</option>
              <option>FY 2024–25</option>
            </select>
          </div>

          {/* Right: Notif + Profile */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button style={{ position: "relative", background: "none", border: "none",
              cursor: "pointer", padding: "6px", borderRadius: "8px", fontSize: "1.1rem" }}
              title="Notifications">
              🔔
              <span style={{ position: "absolute", top: "4px", right: "4px", width: "8px", height: "8px",
                borderRadius: "50%", background: C.danger, border: "2px solid #eef1f7" }} />
            </button>

            <div style={{ position: "relative" }}>
              <button onClick={() => setProfileOpen(p => !p)}
                style={{ display: "flex", alignItems: "center", gap: "8px", background: "none",
                  border: "none", cursor: "pointer", padding: "5px 8px", borderRadius: "8px" }}>
                <div style={{ width: "30px", height: "30px", borderRadius: "50%",
                  background: "linear-gradient(135deg,#1e3a5f,#4a7fa5)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontWeight: 900, fontSize: "0.75rem" }}>SA</div>
                <span style={{ fontWeight: 700, fontSize: "0.82rem", color: C.text }}>Super Admin</span>
                <span style={{ fontSize: "0.6rem", color: C.muted }}>▼</span>
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                    style={{ position: "absolute", right: 0, top: "42px", background: C.white,
                      borderRadius: "12px", boxShadow: "0 8px 32px rgba(30,58,95,0.14)",
                      border: `1px solid ${C.border}`, padding: "8px 0", minWidth: "160px", zIndex: 50 }}>
                    {[
                      { label: "Profile",   action: () => { setActive("org"); setProfileOpen(false); } },
                      { label: "Settings",  action: () => { setActive("org"); setProfileOpen(false); } },
                      { label: "Audit Log", action: () => { setActive("audit"); setProfileOpen(false); } },
                      { label: "Sign Out",  action: () => router.push("/signin") },
                    ].map(({ label, action }) => (
                      <button key={label} onClick={action}
                        style={{ width: "100%", padding: "9px 18px", background: "none", border: "none",
                          textAlign: "left", fontSize: "0.82rem", fontWeight: 600,
                          color: label === "Sign Out" ? C.danger : C.text,
                          cursor: "pointer", fontFamily: font.fontFamily }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(30,58,95,0.04)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "none")}>
                        {label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* ── Content ── */}
        <main style={{ flex: 1, padding: "32px 28px", maxWidth: "1200px", width: "100%" }}>
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22 }}>
              <ActiveSection />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
