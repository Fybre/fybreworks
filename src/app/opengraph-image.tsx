import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "FybreWorks";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#020617",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, #1e293b 0%, transparent 50%), radial-gradient(circle at 75% 75%, #1e293b 0%, transparent 50%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              fontSize: 72,
              fontWeight: 700,
              background: "linear-gradient(to right, #f1f5f9, #94a3b8)",
              backgroundClip: "text",
              color: "transparent",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            FybreWorks
          </h1>
          <p
            style={{
              fontSize: 28,
              color: "#94a3b8",
              marginTop: 16,
            }}
          >
            Notes, projects, and experiments.
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
