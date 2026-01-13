import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/posts";

export const alt = "FybreWorks Blog Post";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { meta } = getPostBySlug(slug);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "60px 80px",
          backgroundColor: "#020617",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, #1e293b 0%, transparent 50%), radial-gradient(circle at 75% 75%, #1e293b 0%, transparent 50%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p
              style={{
                fontSize: 20,
                color: "#64748b",
                margin: 0,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              FybreWorks
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <h1
              style={{
                fontSize: 56,
                fontWeight: 700,
                background: "linear-gradient(to right, #f1f5f9, #94a3b8)",
                backgroundClip: "text",
                color: "transparent",
                margin: 0,
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
              }}
            >
              {meta.title}
            </h1>
            {meta.description && (
              <p
                style={{
                  fontSize: 24,
                  color: "#94a3b8",
                  marginTop: 20,
                  lineHeight: 1.4,
                }}
              >
                {meta.description}
              </p>
            )}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <p
              style={{
                fontSize: 18,
                color: "#64748b",
                margin: 0,
              }}
            >
              {new Date(meta.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <span style={{ color: "#334155" }}>·</span>
            <p
              style={{
                fontSize: 18,
                color: "#64748b",
                margin: 0,
              }}
            >
              {meta.readingTime} min read
            </p>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
