"use client";

import { motion } from "framer-motion";

const navLinks = [
  {
    heading: "Product",
    links: ["Features", "Pricing", "How It Works"],
  },
  {
    heading: "Company",
    links: ["About", "Blog", "Contact"],
  },
  {
    heading: "Legal",
    links: ["Privacy Policy", "Terms & Conditions", "Refund Policy"],
  },
];

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        background: "linear-gradient(180deg, #1e2d3d 0%, #162030 100%)",
        borderRadius: "28px 28px 0 0",
        marginTop: "0",
        paddingTop: "72px",
        paddingBottom: "40px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px" }}>

        {/* ── Final CTA ── */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "72px",
            padding: "56px 32px",
            background: "rgba(255,255,255,0.04)",
            borderRadius: "20px",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.02em",
              marginBottom: "12px",
            }}
          >
            Ready to Save on Taxes?
          </h2>
          <p
            style={{
              color: "rgba(180,200,225,0.75)",
              fontSize: "1.05rem",
              marginBottom: "32px",
            }}
          >
            Start optimizing your income the smart way.
          </p>
          <button
            style={{
              background: "#4a7fa5",
              color: "#ffffff",
              border: "none",
              borderRadius: "10px",
              padding: "14px 36px",
              fontWeight: 700,
              fontSize: "0.97rem",
              cursor: "pointer",
              letterSpacing: "0.02em",
              transition: "background 0.2s ease, transform 0.15s ease",
              boxShadow: "0 8px 28px rgba(74,127,165,0.45)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#3a6f95";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#4a7fa5";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Start Free
          </button>
        </div>

        {/* ── Nav columns ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "40px",
            marginBottom: "56px",
          }}
        >
          {navLinks.map((col) => (
            <div key={col.heading}>
              <p
                style={{
                  color: "rgba(255,255,255,0.45)",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                }}
              >
                {col.heading}
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {col.links.map((link) => (
                  <li key={link} style={{ marginBottom: "10px" }}>
                    <a
                      href="#"
                      style={{
                        color: "rgba(180,200,225,0.65)",
                        fontSize: "0.9rem",
                        textDecoration: "none",
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(180,200,225,0.65)")}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Divider ── */}
        <div
          style={{ height: "1px", background: "rgba(255,255,255,0.08)", marginBottom: "32px" }}
        />

        {/* ── Bottom row ── */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          {/* Left — identity */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
              <span
                style={{
                  background: "rgba(74,127,165,0.18)",
                  border: "1px solid rgba(74,127,165,0.35)",
                  color: "#7ab3d5",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  padding: "3px 12px",
                  borderRadius: "999px",
                  letterSpacing: "0.04em",
                }}
              >
                Made for India &#127470;&#127475;
              </span>
              <span
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(180,200,225,0.6)",
                  fontSize: "0.75rem",
                  padding: "3px 12px",
                  borderRadius: "999px",
                  fontWeight: 600,
                }}
              >
                &#128274; Secure &amp; Privacy-First
              </span>
            </div>
            <p style={{ color: "rgba(180,200,225,0.4)", fontSize: "0.78rem", marginTop: "4px" }}>
              Built for salaried professionals &amp; freelancers &bull; &copy; {new Date().getFullYear()} Tax Planner
            </p>
          </div>

          {/* Right — social icons */}
          <div style={{ display: "flex", gap: "12px" }}>
            {[
              { icon: <LinkedInIcon />, label: "LinkedIn" },
              { icon: <TwitterIcon />, label: "Twitter" },
              { icon: <GitHubIcon />, label: "GitHub" },
            ].map(({ icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(180,200,225,0.5)",
                  textDecoration: "none",
                  transition: "color 0.2s ease, background 0.2s ease, transform 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.background = "rgba(74,127,165,0.3)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(180,200,225,0.5)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

      </div>
    </motion.footer>
  );
}
