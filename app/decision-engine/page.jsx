"use client";

import { useEffect, useMemo, useState } from "react";

const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000";

const panelStyle = {
  border: "1px solid rgba(30,58,95,0.12)",
  borderRadius: "16px",
  background: "#ffffff",
  boxShadow: "0 10px 30px rgba(12,27,46,0.08)",
};

function prettyJson(value) {
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

export default function DecisionEnginePage() {
  const [rules, setRules] = useState([]);
  const [loadingRules, setLoadingRules] = useState(false);
  const [rulesError, setRulesError] = useState("");

  const [ruleForm, setRuleForm] = useState({
    name: "high_credit_priority",
    condition: '{"income": ">50000", "credit_score": ">=700"}',
    action: "APPROVE_PREMIUM",
    priority: "100",
  });
  const [ruleStatus, setRuleStatus] = useState("");

  const [evaluationInput, setEvaluationInput] = useState('{"income": 62000, "credit_score": 735}');
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [evaluationError, setEvaluationError] = useState("");

  const apiLinks = useMemo(
    () => ({
      rules: `${backendBaseUrl}/api/rules/`,
      evaluate: `${backendBaseUrl}/api/evaluate/`,
    }),
    []
  );

  async function fetchRules() {
    setLoadingRules(true);
    setRulesError("");

    try {
      const response = await fetch(apiLinks.rules);
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.detail || "Failed to fetch rules.");
      }

      setRules(payload);
    } catch (error) {
      setRulesError(error.message || "Failed to fetch rules.");
    } finally {
      setLoadingRules(false);
    }
  }

  useEffect(() => {
    fetchRules();
  }, []);

  async function handleCreateRule(event) {
    event.preventDefault();
    setRuleStatus("");

    try {
      const parsedCondition = JSON.parse(ruleForm.condition);
      const payload = {
        name: ruleForm.name.trim(),
        condition: parsedCondition,
        action: ruleForm.action.trim(),
        priority: Number(ruleForm.priority),
      };

      const response = await fetch(apiLinks.rules, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const responseData = await response.json();

      if (!response.ok) {
        setRuleStatus(`Create failed: ${prettyJson(responseData)}`);
        return;
      }

      setRuleStatus(`Rule created: ${responseData.name}`);
      await fetchRules();
    } catch (error) {
      setRuleStatus(`Create failed: ${error.message}`);
    }
  }

  async function handleEvaluate(event) {
    event.preventDefault();
    setEvaluationError("");
    setEvaluationResult(null);

    try {
      const parsedInput = JSON.parse(evaluationInput);
      const response = await fetch(apiLinks.evaluate, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input_data: parsedInput }),
      });
      const payload = await response.json();

      if (!response.ok) {
        setEvaluationError(prettyJson(payload));
        return;
      }

      setEvaluationResult(payload);
    } catch (error) {
      setEvaluationError(error.message || "Evaluation failed.");
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #edf3fa 0%, #f8fbff 60%, #ffffff 100%)",
        color: "#0f1f35",
        padding: "36px 20px 64px",
        fontFamily: "var(--font-nunito, 'Segoe UI', sans-serif)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <header style={{ marginBottom: "26px" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#4a7fa5" }}>
            Integrated Frontend + Backend
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.1rem)", margin: "6px 0 10px", fontWeight: 900, letterSpacing: "-0.02em" }}>
            Rule-Based Decision Engine
          </h1>
          <p style={{ fontSize: "0.95rem", color: "#5a6b81", maxWidth: "780px" }}>
            This page calls your Django APIs directly. You can create rules, list them by priority,
            and evaluate input data against the active rule set.
          </p>
          <p style={{ fontSize: "0.8rem", color: "#64748b", marginTop: "8px" }}>
            Backend URL: {backendBaseUrl}
          </p>
        </header>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "16px",
            marginBottom: "16px",
          }}
        >
          <article style={{ ...panelStyle, padding: "20px" }}>
            <h2 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 800 }}>Create Rule</h2>
            <p style={{ color: "#64748b", fontSize: "0.82rem", margin: "6px 0 14px" }}>
              Condition format example: {`{"income": ">50000", "credit_score": ">=700"}`}
            </p>

            <form onSubmit={handleCreateRule} style={{ display: "grid", gap: "10px" }}>
              <input
                value={ruleForm.name}
                onChange={(e) => setRuleForm((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Rule name"
                style={{ padding: "10px 12px", borderRadius: "10px", border: "1px solid #d3dce8", fontSize: "0.9rem" }}
                required
              />
              <textarea
                value={ruleForm.condition}
                onChange={(e) => setRuleForm((prev) => ({ ...prev, condition: e.target.value }))}
                rows={4}
                style={{ padding: "10px 12px", borderRadius: "10px", border: "1px solid #d3dce8", fontSize: "0.85rem", fontFamily: "Consolas, monospace" }}
                required
              />
              <input
                value={ruleForm.action}
                onChange={(e) => setRuleForm((prev) => ({ ...prev, action: e.target.value }))}
                placeholder="Action"
                style={{ padding: "10px 12px", borderRadius: "10px", border: "1px solid #d3dce8", fontSize: "0.9rem" }}
                required
              />
              <input
                type="number"
                value={ruleForm.priority}
                onChange={(e) => setRuleForm((prev) => ({ ...prev, priority: e.target.value }))}
                placeholder="Priority"
                style={{ padding: "10px 12px", borderRadius: "10px", border: "1px solid #d3dce8", fontSize: "0.9rem" }}
                required
              />

              <button
                type="submit"
                style={{
                  border: "none",
                  borderRadius: "10px",
                  padding: "11px 14px",
                  fontWeight: 800,
                  cursor: "pointer",
                  color: "#fff",
                  background: "linear-gradient(135deg, #1f4b7b, #4a7fa5)",
                }}
              >
                Save Rule
              </button>
            </form>

            {ruleStatus ? (
              <p style={{ marginTop: "12px", fontSize: "0.82rem", color: "#1e3a5f", whiteSpace: "pre-wrap" }}>{ruleStatus}</p>
            ) : null}
          </article>

          <article style={{ ...panelStyle, padding: "20px" }}>
            <h2 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 800 }}>Evaluate Input</h2>
            <p style={{ color: "#64748b", fontSize: "0.82rem", margin: "6px 0 14px" }}>
              Submit an input payload to receive the decision and matched rule.
            </p>

            <form onSubmit={handleEvaluate} style={{ display: "grid", gap: "10px" }}>
              <textarea
                value={evaluationInput}
                onChange={(e) => setEvaluationInput(e.target.value)}
                rows={6}
                style={{ padding: "10px 12px", borderRadius: "10px", border: "1px solid #d3dce8", fontSize: "0.85rem", fontFamily: "Consolas, monospace" }}
                required
              />
              <button
                type="submit"
                style={{
                  border: "none",
                  borderRadius: "10px",
                  padding: "11px 14px",
                  fontWeight: 800,
                  cursor: "pointer",
                  color: "#fff",
                  background: "linear-gradient(135deg, #205c49, #2d8f70)",
                }}
              >
                Run Evaluation
              </button>
            </form>

            {evaluationError ? (
              <pre
                style={{
                  marginTop: "12px",
                  padding: "10px",
                  borderRadius: "10px",
                  background: "#fff1f2",
                  border: "1px solid #fecdd3",
                  color: "#9f1239",
                  fontSize: "0.78rem",
                  whiteSpace: "pre-wrap",
                }}
              >
                {evaluationError}
              </pre>
            ) : null}

            {evaluationResult ? (
              <pre
                style={{
                  marginTop: "12px",
                  padding: "10px",
                  borderRadius: "10px",
                  background: "#effaf3",
                  border: "1px solid #b7ebca",
                  color: "#166534",
                  fontSize: "0.78rem",
                  whiteSpace: "pre-wrap",
                }}
              >
                {prettyJson(evaluationResult)}
              </pre>
            ) : null}
          </article>
        </section>

        <section style={{ ...panelStyle, padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
            <h2 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 800 }}>Rules (priority order)</h2>
            <button
              type="button"
              onClick={fetchRules}
              style={{ border: "1px solid #c9d7e8", background: "#fff", borderRadius: "8px", padding: "7px 12px", cursor: "pointer", fontWeight: 700 }}
            >
              Refresh
            </button>
          </div>

          {loadingRules ? <p style={{ color: "#64748b", fontSize: "0.85rem" }}>Loading rules...</p> : null}
          {rulesError ? <p style={{ color: "#be123c", fontSize: "0.85rem" }}>{rulesError}</p> : null}

          {!loadingRules && !rulesError && rules.length === 0 ? (
            <p style={{ color: "#64748b", fontSize: "0.85rem" }}>No rules found yet. Create your first rule above.</p>
          ) : null}

          {!loadingRules && rules.length > 0 ? (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "720px" }}>
                <thead>
                  <tr style={{ textAlign: "left", borderBottom: "1px solid #e2e8f0" }}>
                    <th style={{ padding: "10px 8px", fontSize: "0.72rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em" }}>Priority</th>
                    <th style={{ padding: "10px 8px", fontSize: "0.72rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em" }}>Name</th>
                    <th style={{ padding: "10px 8px", fontSize: "0.72rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em" }}>Action</th>
                    <th style={{ padding: "10px 8px", fontSize: "0.72rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em" }}>Condition</th>
                  </tr>
                </thead>
                <tbody>
                  {rules.map((rule) => (
                    <tr key={rule.id} style={{ borderBottom: "1px solid #f0f4f9" }}>
                      <td style={{ padding: "11px 8px", fontWeight: 800, color: "#1e3a5f" }}>{rule.priority}</td>
                      <td style={{ padding: "11px 8px", fontWeight: 700 }}>{rule.name}</td>
                      <td style={{ padding: "11px 8px", color: "#0f766e", fontWeight: 700 }}>{rule.action}</td>
                      <td style={{ padding: "11px 8px", fontFamily: "Consolas, monospace", fontSize: "0.78rem", color: "#334155" }}>
                        {prettyJson(rule.condition)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </section>
      </div>
    </main>
  );
}
