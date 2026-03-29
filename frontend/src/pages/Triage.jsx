import { useState } from "react";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";
const Triage = () => {
  const [symptoms, setSymptoms] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const navigate = useNavigate();

  const handleAnalyze = async () => {
    if (!symptoms.trim()) return alert("Please describe your symptoms");
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch("http://localhost:5000/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms: symptoms.trim() }),
      });
      const data = await response.json();

      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (err) {
      alert(err.message || "Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    if (!result) return;
    const doc = new jsPDF();
    let y = 20;
    doc.setFontSize(20);
    doc.setTextColor(27, 128, 119);
    doc.text("AI Symptom Analysis Report", 20, y);
    y += 12;
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Date: " + new Date().toLocaleDateString(), 20, y);
    y += 10;
    doc.setFontSize(12);
    doc.setTextColor(30);
    doc.setFont("helvetica", "bold");
    doc.text("Symptoms:", 20, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const sl = doc.splitTextToSize(symptoms, 170);
    doc.text(sl, 20, y);
    y += sl.length * 5 + 6;
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Severity: " + result.severity, 20, y);
    y += 10;
    doc.text("Possible Conditions", 20, y);
    y += 7;
    result.possibleConditions.forEach((c, i) => {
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text(i + 1 + ". " + c.name + " (" + c.probability + ")", 22, y);
      y += 5;
      doc.setFont("helvetica", "normal");
      const d = doc.splitTextToSize(c.description, 165);
      doc.text(d, 25, y);
      y += d.length * 5 + 4;
    });
    y += 4;
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Suggested Medicines", 20, y);
    y += 7;
    result.suggestedMedicines.forEach((m, i) => {
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text(i + 1 + ". " + m.name + " (" + m.type + ")", 22, y);
      y += 5;
      doc.setFont("helvetica", "normal");
      doc.text("Dosage: " + m.dosage, 25, y);
      y += 5;
      if (m.notes) {
        doc.text("Note: " + m.notes, 25, y);
        y += 5;
      }
      y += 3;
    });
    y += 4;
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Recommendations", 20, y);
    y += 7;
    result.recommendations.forEach((r, i) => {
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      const l = doc.splitTextToSize(i + 1 + ". " + r, 165);
      doc.text(l, 22, y);
      y += l.length * 5 + 2;
    });
    y += 4;
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(doc.splitTextToSize(result.disclaimer, 170), 20, y);
    doc.save("symptom-analysis-report.pdf");
  };

const handleBook = () => {
  navigate("/appointment", {
    state: {
      suggestedDepartment: result.suggestedDepartment
    }
  });
};
  const severityColor = {
    Low: "#22c55e",
    Medium: "#f59e0b",
    High: "#ef4444",
    Emergency: "#dc2626",
  };

  return (
    <div
      style={{
        maxWidth: 800,
        margin: "40px auto",
        padding: "0 20px",
        fontFamily: "'Segoe UI', sans-serif",
        color:"black"
      }}
    >
      <h1 style={{ color: "#0d9488", fontSize: 28, textAlign: "center" }}>
        🩺 AI Symptom Analyzer
      </h1>
      <p style={{ textAlign: "center", color: "#666", marginBottom: 30 }}>
        Describe your symptoms and get AI-powered health insights with medicine
        suggestions
      </p>

      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: 24,
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        }}
      >
        <h3 style={{ margin: "0 0 8px" }}>Describe Your Symptoms</h3>
        <p style={{ color: "#888", fontSize: 14, margin: "0 0 12px" }}>
          Be as detailed as possible — include duration, severity, and related
          factors
        </p>
        <textarea
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="e.g. I've had a persistent headache for 3 days, along with mild fever..."
          rows={5}
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 8,
            border: "1px solid #ddd",
            fontSize: 14,
            resize: "none",
            boxSizing: "border-box",
          }}
          disabled={loading}
        />
        <button
          onClick={handleAnalyze}
          disabled={loading || !symptoms.trim()}
          style={{
            width: "100%",
            padding: 14,
            marginTop: 12,
            borderRadius: 8,
            border: "none",
            background: loading
              ? "#94a3b8"
              : "linear-gradient(135deg, #0d9488, #14b8a6)",
            color: "#fff",
            fontSize: 16,
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "⏳ Analyzing..." : "🔍 Analyze Symptoms"}
        </button>
      </div>

      {result && (
        <div style={{ marginTop: 30 }}>
          {/* Severity */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontWeight: 600, fontSize: 18 ,  color: "#fff",}}>Severity:</span>
              <span
                style={{
                  background: severityColor[result.severity] || "#888",
                  color: "#fff",
                  padding: "4px 16px",
                  borderRadius: 20,
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                {result.severity}
              </span>
            </div>
            <button
              onClick={downloadPDF}
              style={{
                padding: "8px 20px",
                borderRadius: 8,
                border: "1px solid #0d9488",
                background: "#fff",
                color: "#0d9488",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              📥 Download PDF
            </button>
          </div>

          {/* Conditions */}
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 20,
              marginBottom: 16,
              boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
            }}
          >
            <h3 style={{ color: "#0d9488", marginTop: 0 }}>
              🩻 Possible Conditions
            </h3>
            {result.possibleConditions.map((c, i) => (
              <div
                key={i}
                style={{
                  background: "#f8fffe",
                  border: "1px solid #e0f2f1",
                  borderRadius: 8,
                  padding: 14,
                  marginBottom: 10,
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <strong>{c.name}</strong>
                  <span
                    style={{
                      fontSize: 12,
                      color:
                        c.probability === "High"
                          ? "#ef4444"
                          : c.probability === "Medium"
                            ? "#f59e0b"
                            : "#22c55e",
                    }}
                  >
                    {c.probability} probability
                  </span>
                </div>
                <p style={{ margin: "6px 0 0", fontSize: 14, color: "#555" }}>
                  {c.description}
                </p>
              </div>
            ))}
          </div>

          {/* Medicines */}
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 20,
              marginBottom: 16,
              boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
            }}
          >
            <h3 style={{ color: "#0d9488", marginTop: 0 }}>
              💊 Suggested Medicines
            </h3>
            {result.suggestedMedicines.map((m, i) => (
              <div
                key={i}
                style={{
                  background: "#f8fffe",
                  border: "1px solid #e0f2f1",
                  borderRadius: 8,
                  padding: 14,
                  marginBottom: 10,
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <strong>{m.name}</strong>
                  <span
                    style={{
                      fontSize: 12,
                      background: "#e0f2f1",
                      padding: "2px 10px",
                      borderRadius: 12,
                    }}
                  >
                    {m.type}
                  </span>
                </div>
                <p style={{ margin: "6px 0 0", fontSize: 14, color: "#555" }}>
                  <b>Dosage:</b> {m.dosage}
                </p>
                {m.notes && (
                  <p style={{ margin: "4px 0 0", fontSize: 14, color: "#555" }}>
                    <b>Note:</b> {m.notes}
                     
                  </p>
                 
                )}
              </div>
            ))}
            <button
              onClick={() =>
                navigate("/pharmacies", {
                  state: {
                    symptoms,
                    aiResult: result,
                  },
                })
              }
              className="bg-teal-700 py-2 px-4 text-white rounded hover:bg-teal-800 transition"
            >
             See Pharmacy near me
            </button>
          </div>

          {/* book an appointment */}
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 20,
              marginBottom: 20,
              boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
            }}
          >
            <h3 style={{ color: "#0d9488", marginTop: 0, marginBottom: 10 }}>
             Consult a Doctor 
            </h3>
            <button
              onClick={() =>
                navigate("/appointment", {
                  state: {
                    symptoms,
                    aiResult: result,
                  },
                })
              }
              className="bg-teal-700 py-2 px-4 text-white rounded hover:bg-teal-800 transition"
            >
              Book Appointment
            </button>
          </div>

          {/* Recommendations */}
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 20,
              marginBottom: 16,
              boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
            }}
          >
            <h3 style={{ color: "#0d9488", marginTop: 0 }}>
              ✅ Recommendations
            </h3>
            <ol style={{ paddingLeft: 20 }}>
              {result.recommendations.map((r, i) => (
                <li
                  key={i}
                  style={{ marginBottom: 6, fontSize: 14, color: "#555" }}
                >
                  {r}
                </li>
              ))}
            </ol>
          </div>

          {/* When to see doctor */}
          <div
            style={{
              background: "#fffbeb",
              border: "1px solid #fde68a",
              borderRadius: 12,
              padding: 20,
              marginBottom: 16,
            }}
          >
            <h3 style={{ color: "#b45309", marginTop: 0 }}>
              ⚠️ When to See a Doctor
            </h3>
            <p style={{ fontSize: 14, color: "#555", margin: 0 }}>
              {result.whenToSeeDoctor}
            </p>
          </div>

          {/* Disclaimer */}
          <p
            style={{
              background: "#f1f5f9",
              borderRadius: 8,
              padding: 14,
              fontSize: 12,
              color: "#888",
            }}
          >
            ⚠️ {result.disclaimer}
          </p>
        </div>
      )}
    </div>
  );
};

export default Triage;
