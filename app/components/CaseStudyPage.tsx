"use client";

import { useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface CaseStudyProps {
  project?: {
    title: string;
    subtitle: string;
    description: string;
    agency: string;
    client: string;
    responsibilities: string[];
    development: string[];
    year: string;
    images: { src: string; alt: string; caption?: string }[];
  };
}

// ─── Mock data (swap with real props/fetch) ───────────────────────────────────
const DEFAULT_PROJECT = {
  title: "PROJECT",
  subtitle: "LOOPED",
  description:
    "Customer service shouldn't feel like a maze of dead ends and unhelpful bots. That's why we changed the game with voice assistants that actually understand and resolve customer needs. To bring that contrast to life, we created Looped: a customer service nightmare, a playful take on the chaos of old-school call centers.",
  agency: "STUDIO FREIGHT",
  client: "POLYAI",
  responsibilities: [
    "CREATIVE DIRECTION",
    "ART DIRECTION",
    "UX DESIGN",
    "UI DESIGN",
    "MOTION DESIGN",
  ],
  development: ["DARKROOM ENGINEERING"],
  year: "2024",
  images: [
    { src: "/case1.png", alt: "Game screen 1", caption: "New Challenge dialog — the call is answered." },
    { src: "/case2.png", alt: "Game screen 2", caption: "01:29 — navigating the call centre maze." },
    { src: "/case3.png", alt: "Game screen 3", caption: "Glitchy says: PolyAI keeps callers on track." },
    { src: "/case4.png", alt: "Game screen 4", caption: "End state — the nightmare is over." },
  ],
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function CaseStudyPage({ project = DEFAULT_PROJECT }: CaseStudyProps) {
  const [activeImg, setActiveImg] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@200;300;400&display=swap');

        :root {
          --bg: #060608;
          --surface: #0e0e12;
          --border: rgba(255,255,255,0.07);
          --accent: #ffffff;
          --muted: rgba(255,255,255,0.3);
          --label: rgba(255,255,255,0.18);
          --mono: 'DM Mono', monospace;
          --sans: 'DM Sans', sans-serif;
          --display: 'Bebas Neue', sans-serif;
        }

        html, body {
          scrollbar-width: none;
          overflow: hidden;
        }
        html::-webkit-scrollbar,
        body::-webkit-scrollbar { display: none; }

        .cs-root {
          background: var(--bg);
          min-height: 100vh;
          color: #fff;
          font-family: var(--sans);
          overflow: hidden;
        }

        /* ── Hero ── */
        .cs-hero {
          display: grid;
          grid-template-columns: 380px 1fr;
          min-height: 100vh;
          border-bottom: 1px solid var(--border);
        }

        @media (max-width: 900px) {
          .cs-hero { grid-template-columns: 1fr; }
          .cs-hero-right { display: none; }
        }

        /* Left panel */
        .cs-hero-left {
          padding: 48px 40px 56px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-right: 1px solid var(--border);
          position: sticky;
          top: 0;
          height: 100vh;
          overflow-y: auto;
          scrollbar-width: none;
        }
        .cs-hero-left::-webkit-scrollbar { display: none; }

        .cs-back {
          font-family: var(--mono);
          font-size: 9px;
          letter-spacing: 0.25em;
          color: var(--muted);
          text-transform: uppercase;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: color 0.2s;
        }
        .cs-back:hover { color: #fff; }
        .cs-back::before {
          content: '←';
          font-size: 12px;
        }

        .cs-title-block { margin-top: auto; padding-top: 40px; }

        .cs-eyebrow {
          font-family: var(--mono);
          font-size: 9px;
          letter-spacing: 0.3em;
          color: var(--label);
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .cs-title {
          font-family: var(--display);
          font-size: clamp(4.5rem, 8vw, 6.5rem);
          line-height: 0.95;
          letter-spacing: 0.02em;
          color: #fff;
          margin: 0 0 4px;
        }

        .cs-subtitle {
          font-family: var(--display);
          font-size: clamp(4.5rem, 8vw, 6.5rem);
          line-height: 0.95;
          letter-spacing: 0.02em;
          color: rgba(255,255,255,0.18);
          margin: 0 0 32px;
        }

        .cs-description {
          font-family: var(--mono);
          font-size: 10.5px;
          line-height: 1.85;
          color: rgba(255,255,255,0.45);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          max-width: 300px;
        }

        /* Meta grid */
        .cs-meta {
          margin-top: 48px;
          padding-top: 32px;
          border-top: 1px solid var(--border);
          display: grid;
          gap: 24px;
        }

        .cs-meta-group {}

        .cs-meta-label {
          font-family: var(--mono);
          font-size: 8px;
          letter-spacing: 0.3em;
          color: var(--label);
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .cs-meta-value {
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 0.12em;
          color: rgba(255,255,255,0.7);
          text-transform: uppercase;
          line-height: 1.9;
        }

        /* ── Right / scroll panel ── */
        .cs-hero-right {
          overflow-y: auto;
          padding: 48px 56px;
          display: flex;
          flex-direction: column;
          gap: 40px;
          scrollbar-width: none;
        }
        .cs-hero-right::-webkit-scrollbar { display: none; }

        /* ── Image cards ── */
        .cs-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 4px;
          overflow: hidden;
          cursor: zoom-in;
          transition: border-color 0.25s, transform 0.3s;
          position: relative;
        }
        .cs-card:hover {
          border-color: rgba(255,255,255,0.16);
          transform: translateY(-3px);
        }

        .cs-card-inner {
          width: 100%;
          aspect-ratio: 16/9;
          background: #111117;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .cs-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* placeholder when no image */
        .cs-card-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #0e0e14 0%, #161620 100%);
        }

        .cs-card-placeholder-label {
          font-family: var(--mono);
          font-size: 9px;
          letter-spacing: 0.3em;
          color: var(--label);
          text-transform: uppercase;
        }

        .cs-card-caption {
          padding: 14px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--border);
        }

        .cs-card-caption-text {
          font-family: var(--mono);
          font-size: 9px;
          letter-spacing: 0.18em;
          color: var(--muted);
          text-transform: uppercase;
        }

        .cs-card-index {
          font-family: var(--mono);
          font-size: 8px;
          letter-spacing: 0.2em;
          color: var(--label);
        }

        /* ── Lightbox ── */
        .cs-lightbox {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(0,0,0,0.92);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: zoom-out;
          backdrop-filter: blur(8px);
          animation: lb-in 0.2s ease;
        }

        @keyframes lb-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .cs-lightbox img {
          max-width: 90vw;
          max-height: 85vh;
          object-fit: contain;
          border: 1px solid var(--border);
          border-radius: 4px;
        }

        .cs-lightbox-close {
          position: absolute;
          top: 24px;
          right: 28px;
          font-family: var(--mono);
          font-size: 9px;
          letter-spacing: 0.3em;
          color: var(--muted);
          cursor: pointer;
          text-transform: uppercase;
          transition: color 0.2s;
        }
        .cs-lightbox-close:hover { color: #fff; }

        /* ── Nav dot ── */
        .cs-year-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--mono);
          font-size: 8px;
          letter-spacing: 0.28em;
          color: var(--label);
          text-transform: uppercase;
        }
        .cs-year-badge::before {
          content: '';
          display: block;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
        }

        /* ── Two-up layout for last 2 cards ── */
        .cs-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        @media (max-width: 700px) {
          .cs-grid-2 { grid-template-columns: 1fr; }
        }

        /* scroll fade-in */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cs-card { animation: fadeUp 0.5s ease both; }
        .cs-card:nth-child(1) { animation-delay: 0.05s; }
        .cs-card:nth-child(2) { animation-delay: 0.12s; }
        .cs-card:nth-child(3) { animation-delay: 0.19s; }
        .cs-card:nth-child(4) { animation-delay: 0.26s; }
      `}</style>

      {activeImg !== null && (
        <div className="cs-lightbox" onClick={() => setActiveImg(null)}>
          <span className="cs-lightbox-close">ESC / CLOSE</span>
          <img src={project.images[activeImg].src} alt={project.images[activeImg].alt} />
        </div>
      )}

      <div className="cs-root">
        <div className="cs-hero">

          {/* ── LEFT — sticky meta panel ── */}
          <aside className="cs-hero-left">
            <a href="/" className="cs-back">Work</a>

            <div className="cs-title-block">
              <p className="cs-eyebrow">Case Study</p>
              <h1 className="cs-title">{project.title}</h1>
              <h2 className="cs-subtitle">{project.subtitle}</h2>
              <p className="cs-description">{project.description}</p>
            </div>

            <div className="cs-meta">
              <div className="cs-meta-group">
                <p className="cs-meta-label">Agency</p>
                <p className="cs-meta-value">{project.agency}</p>
              </div>

              <div className="cs-meta-group">
                <p className="cs-meta-label">Client</p>
                <p className="cs-meta-value">{project.client}</p>
              </div>

              <div className="cs-meta-group">
                <p className="cs-meta-label">Responsibilities</p>
                <p className="cs-meta-value">
                  {project.responsibilities.map((r, i) => (
                    <span key={i} style={{ display: "block" }}>{r}</span>
                  ))}
                </p>
              </div>

              <div className="cs-meta-group">
                <p className="cs-meta-label">Development</p>
                <p className="cs-meta-value">
                  {project.development.map((d, i) => (
                    <span key={i} style={{ display: "block" }}>{d}</span>
                  ))}
                </p>
              </div>

              <div className="cs-year-badge">{project.year}</div>
            </div>
          </aside>

          {/* ── RIGHT — scrollable image cards ── */}
          <div className="cs-hero-right" ref={scrollRef}>

            {/* First two cards full-width */}
            {project.images.slice(0, 2).map((img, i) => (
              <div
                key={i}
                className="cs-card"
                onClick={() => setActiveImg(i)}
              >
                <div className="cs-card-inner">
                  {img.src && img.src !== "/" ? (
                    <img src={img.src} alt={img.alt} />
                  ) : (
                    <div className="cs-card-placeholder">
                      <span className="cs-card-placeholder-label">
                        {img.alt}
                      </span>
                    </div>
                  )}
                </div>
                {img.caption && (
                  <div className="cs-card-caption">
                    <span className="cs-card-caption-text">{img.caption}</span>
                    <span className="cs-card-index">
                      {String(i + 1).padStart(2, "0")} / {String(project.images.length).padStart(2, "0")}
                    </span>
                  </div>
                )}
              </div>
            ))}

            {/* Last two cards side-by-side */}
            {project.images.length > 2 && (
              <div className="cs-grid-2">
                {project.images.slice(2).map((img, i) => (
                  <div
                    key={i + 2}
                    className="cs-card"
                    onClick={() => setActiveImg(i + 2)}
                  >
                    <div
                      className="cs-card-inner"
                      style={{ aspectRatio: "4/3" }}
                    >
                      {img.src && img.src !== "/" ? (
                        <img src={img.src} alt={img.alt} />
                      ) : (
                        <div className="cs-card-placeholder">
                          <span className="cs-card-placeholder-label">
                            {img.alt}
                          </span>
                        </div>
                      )}
                    </div>
                    {img.caption && (
                      <div className="cs-card-caption">
                        <span className="cs-card-caption-text" style={{ fontSize: "8px" }}>
                          {img.caption}
                        </span>
                        <span className="cs-card-index">
                          {String(i + 3).padStart(2, "0")} / {String(project.images.length).padStart(2, "0")}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}
