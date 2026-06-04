import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Bertuğ Taş — ML Engineer & Data Scientist";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000000",
          color: "#f5f5f5",
          padding: 72,
          fontFamily: "Arial, Helvetica, sans-serif",
          border: "1px solid rgba(103,232,249,0.24)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#67e8f9",
            fontSize: 28,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <span>BT.dev</span>
          <span>Izmir, TR</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 104,
              fontWeight: 900,
              letterSpacing: -4,
              lineHeight: 0.95,
            }}
          >
            Bertuğ Taş
          </div>
          <div
            style={{
              width: 108,
              height: 2,
              background: "#67e8f9",
            }}
          />
          <div
            style={{
              fontSize: 34,
              color: "#a1a1aa",
              letterSpacing: 1,
            }}
          >
            ML Engineer & Data Scientist
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 18,
            color: "#71717a",
            fontSize: 26,
          }}
        >
          <span>Machine Learning</span>
          <span>/</span>
          <span>Computer Vision</span>
          <span>/</span>
          <span>MLOps</span>
        </div>
      </div>
    ),
    size,
  );
}
