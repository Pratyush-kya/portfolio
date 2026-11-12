import { ImageResponse } from "next/og";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#070b14",
          padding: "60px 80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Background Ambient Glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%)",
          }}
        />

        {/* Top Header Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "8px 20px",
            borderRadius: "9999px",
            backgroundColor: "rgba(6, 78, 59, 0.5)",
            border: "1px solid rgba(16, 185, 129, 0.4)",
            color: "#6ee7b7",
            fontSize: "18px",
            fontWeight: 600,
          }}
        >
          <span
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "#10b981",
            }}
          />
          Available for Summer 2026 Internships
        </div>

        {/* Main Title & Positioning */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.03em",
            }}
          >
            Pratyush Kiran Rath
          </div>
          <div
            style={{
              fontSize: "28px",
              fontWeight: 600,
              color: "#94a3b8",
              maxWidth: "900px",
              lineHeight: 1.3,
            }}
          >
            Computer Science Student @ Centurion University · Systems &amp; Developer Tooling · LLM Telemetry
          </div>
        </div>

        {/* Bottom Metrics Bar */}
        <div
          style={{
            display: "flex",
            gap: "30px",
            width: "100%",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "24px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "14px", color: "#64748b", textTransform: "uppercase" }}>Telemetry Overhead</span>
            <span style={{ fontSize: "28px", fontWeight: 700, color: "#10b981" }}>&lt; 1.2%</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "14px", color: "#64748b", textTransform: "uppercase" }}>Client Privacy</span>
            <span style={{ fontSize: "28px", fontWeight: 700, color: "#06b6d4" }}>100% (0 KB Egress)</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "14px", color: "#64748b", textTransform: "uppercase" }}>Dispatch Latency</span>
            <span style={{ fontSize: "28px", fontWeight: 700, color: "#f43f5e" }}>84 ms</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "14px", color: "#64748b", textTransform: "uppercase" }}>Degree &amp; Class</span>
            <span style={{ fontSize: "28px", fontWeight: 700, color: "#e2e8f0" }}>B.Tech CSE &apos;29</span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
