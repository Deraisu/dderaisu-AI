"use client";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult("");

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setResult(data.result || "Tidak ada jawaban");
    setLoading(false);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#d4f5d0", // soft green
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "30px",
          width: "100%",
          maxWidth: "500px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1 style={{ textAlign: "center", color: "#2f4f2f" }}>
          🤖 Dera Chatbot AI
        </h1>
        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
          <input
            className="chat-input"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask Dera Anything...."
            style={{
              width: "100%",
              padding: "12px 15px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              outline: "none",
              fontSize: "16px",
              marginBottom: "12px",
              color: "#7a7a7a",
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#4caf50",
              color: "white",
              fontSize: "16px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "background 0.3s ease",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#45a049")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#4caf50")
            }
          >
            {loading ? "Mengirim..." : "Kirim"}
          </button>
        </form>
        {result && (
          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              background: "#f1f8f1",
              borderRadius: "8px",
              border: "1px solid #c8e6c9",
              color: "#2e7d32",
            }}
          >
            <strong>Jawaban:</strong>
            <p style={{ marginTop: "8px" }}>{result}</p>
          </div>
        )}
      </div>
    </main>
  );
}