"use client";

import { useState } from "react";

export default function Footer() {
  const [nameHovered, setNameHovered] = useState(false);

  return (
    <footer
      className="bg-blue-900 w-full relative overflow-hidden"
      style={{ minHeight: "220px" }}
    >
      {/* ── Top bar ── */}
      <div
        className="flex justify-between items-start px-6 pt-6"
        style={{
          fontFamily: "'Courier New', monospace",
          fontSize: "11px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#c7d2fe", // indigo-200 — readable on blue-900
        }}
      >
        {/* Left links */}
        <p style={{ lineHeight: 1.8 }}>
          LET&apos;S CONNECT ON{" "}
          <a
            href="https://www.linkedin.com/in/ceaser-eghwrudjakpor-535b94197/?skipRedirect=true"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: "underline",
              textUnderlineOffset: "3px",
              color: "inherit",
            }}
          >
            LINKEDIN
          </a>
          , OR TEXT ME ON{" "}
          <a
            href="https://wa.me/2348147367123"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: "underline",
              textUnderlineOffset: "3px",
              color: "inherit",
            }}
          >
            WHATSAPP
          </a>
        </p>

        {/* Right tagline */}
        <p style={{ whiteSpace: "nowrap" }}>LET&apos;S GET CREATIVE.</p>
      </div>

      {/* ── Big blurred name ── */}
      <div className="flex justify-center items-center px-4 pb-8 pt-4">
        <h1
          onMouseEnter={() => setNameHovered(true)}
          onMouseLeave={() => setNameHovered(false)}
          style={{
            fontSize: "clamp(2.8rem, 8.5vw, 8rem)",
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: "-0.01em",
            lineHeight: 1,
            textAlign: "center",
            whiteSpace: "nowrap",
            userSelect: "none",
            cursor: "default",
            // base blur — matches the reference
            filter: nameHovered
              ? "blur(0px)"
              : "blur(6px)",
            transition: "filter 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            // font-family left for the user to set
          }}
        >
          CEASER EGHWRUDJAKPOR
        </h1>
      </div>

      {/* ── Bottom micro line ── */}
      <div
        className="absolute bottom-4 left-0 right-0 flex justify-between px-6"
        style={{
          fontFamily: "'Courier New', monospace",
          fontSize: "9px",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "#6b7280", // muted
        }}
      >
        <span>© 2025 CEASER EGHWRUDJAKPOR</span>
        <span>BASED IN LAGOS, NG</span>
      </div>
    </footer>
  );
}
