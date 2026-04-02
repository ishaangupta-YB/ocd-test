import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const alt = "Y-BOCS-II OCD Screener";
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background:
            "linear-gradient(135deg, #faf6ef 0%, #efe5d6 45%, #dde8e2 100%)",
          color: "#213337",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "72px",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "#5e6f73",
            display: "flex",
            fontSize: 28,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          Private OCD screening experience
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "flex",
              fontFamily: "Georgia",
              fontSize: 84,
              lineHeight: 1.05,
              maxWidth: "820px",
            }}
          >
            Y-BOCS-II Self-Report OCD Screener
          </div>
          <div
            style={{
              color: "#3d5b57",
              display: "flex",
              fontSize: 34,
              lineHeight: 1.4,
              maxWidth: "920px",
            }}
          >
            Calm guidance, session-only privacy, and supportive next steps based
            on the Y-BOCS-II Self-Report Version.
          </div>
        </div>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            gap: 18,
          }}
        >
          <div
            style={{
              alignItems: "center",
              background: "#4f726d",
              borderRadius: 999,
              color: "#f7f4ec",
              display: "flex",
              fontSize: 28,
              height: 72,
              justifyContent: "center",
              width: 72,
            }}
          >
            O
          </div>
          <div
            style={{
              color: "#5e6f73",
              display: "flex",
              fontSize: 28,
            }}
          >
            Your responses stay in this browser session.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
