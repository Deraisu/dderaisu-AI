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
    <main style={{ padding: "20px" }}>
      <h1>Gemini AI Chat</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Tulis pertanyaan..."
        />
        <button type="submit" disabled={loading}>
          {loading ? "Mengirim..." : "Kirim"}
        </button>
      </form>
      <div style={{ marginTop: "20px" }}>
        <strong>Jawaban:</strong>
        <p>{result}</p>
      </div>
    </main>
  );
}