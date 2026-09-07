import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#ffffff",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 4,
            color: "#71717a",
            display: "flex",
          }}
        >
          PALEMBANG, INDONESIA
        </div>
        <div
          style={{
            fontSize: 96,
            fontWeight: 800,
            letterSpacing: -2,
            color: "#09090b",
            display: "flex",
            marginTop: 8,
          }}
        >
          Usman Ramadhan
        </div>
        <div
          style={{
            fontSize: 40,
            fontWeight: 600,
            color: "#09090b",
            display: "flex",
            marginTop: 8,
          }}
        >
          Fullstack Web Developer
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#52525b",
            display: "flex",
            marginTop: 16,
          }}
        >
          Founder Jolink — Juara 3 LKS Web Technologies Sumsel 2026
        </div>
      </div>
    ),
    { ...size }
  );
}
