import { useEffect, useRef, useState, useCallback } from "react";

const ASCII_CHARS = "█▓▒░ .:;+=xX$&#@▪▫▬▭▮▯■□▸▹►▻▼▽▾▿◀◁◂◃◄◅△▲▴▵";
const ASCII_SIMPLE = "@%#*+=-:. ";

function useAsciiCanvas(imgSrc, cols = 120, colored = true) {
  const canvasRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!imgSrc || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const aspect = img.height / img.width;
      const charW = 7;
      const charH = 13;
      const rows = Math.floor(cols * aspect * (charW / charH));
      canvas.width = cols * charW;
      canvas.height = rows * charH;

      // Draw source image to offscreen canvas to sample pixels
      const off = document.createElement("canvas");
      off.width = cols;
      off.height = rows;
      const octx = off.getContext("2d");
      octx.drawImage(img, 0, 0, cols, rows);
      const pixelData = octx.getImageData(0, 0, cols, rows).data;

      // Draw dark background
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${charH - 1}px "Courier New", monospace`;
      ctx.textBaseline = "top";

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const idx = (row * cols + col) * 4;
          const r = pixelData[idx];
          const g = pixelData[idx + 1];
          const b = pixelData[idx + 2];
          const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

          const charIdx = Math.floor((1 - brightness) * (ASCII_SIMPLE.length - 1));
          const char = ASCII_SIMPLE[charIdx];

          if (colored) {
            // Muted, slightly desaturated color
            const fr = Math.floor(r * 0.7 + 30);
            const fg = Math.floor(g * 0.7 + 30);
            const fb = Math.floor(b * 0.7 + 30);
            ctx.fillStyle = `rgb(${fr},${fg},${fb})`;
          } else {
            const v = Math.floor(brightness * 180 + 40);
            ctx.fillStyle = `rgb(${v},${v},${v})`;
          }

          ctx.fillText(char, col * charW, row * charH);
        }
      }
      setReady(true);
    };
    img.onerror = () => {
      // fallback: draw placeholder ASCII pattern
      const canvas2 = canvasRef.current;
      if (!canvas2) return;
      const ctx2 = canvas2.getContext("2d");
      canvas2.width = cols * 7;
      canvas2.height = 400;
      ctx2.fillStyle = "#0a0a0a";
      ctx2.fillRect(0, 0, canvas2.width, canvas2.height);
      ctx2.font = "12px 'Courier New', monospace";
      ctx2.fillStyle = "#333";
      for (let y = 0; y < 32; y++) {
        for (let x = 0; x < cols; x++) {
          const chars = ASCII_SIMPLE;
          const c = chars[Math.floor(Math.random() * chars.length)];
          ctx2.fillText(c, x * 7, y * 13);
        }
      }
      setReady(true);
    };
    img.src = imgSrc;
  }, [imgSrc, cols, colored]);

  return { canvasRef, ready };
}

function AsciiPanel({ imgSrc, label, description, cols = 110, colored = true }) {
  const { canvasRef, ready } = useAsciiCanvas(imgSrc, cols, colored);
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const wrapRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <div
      ref={wrapRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        position: "relative",
        overflow: "hidden",
        cursor: "none",
        border: "1px solid #1a1a1a",
        background: "#0a0a0a",
        flex: "1 1 0",
        minWidth: 0,
      }}
    >
      {/* Scanline overlay */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
        background: "repeating-linear-gradient(to bottom, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)"
      }} />

      {/* ASCII canvas */}
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "auto",
          imageRendering: "pixelated",
          transition: "opacity 0.6s",
          opacity: ready ? 1 : 0,
        }}
      />

      {/* Label tag */}
      <div style={{
        position: "absolute", bottom: 12, left: 12, zIndex: 3,
       
        fontSize: 10,
        letterSpacing: "0.15em",
        color: "#555",
        textTransform: "uppercase",
        border: "1px solid #222",
        padding: "3px 8px",
        background: "#0a0a0a",
      }}>
        {label}
      </div>

      {/* Corner brackets */}
      {[["top:0;left:0", "border-top:1px solid #ff4400;border-left:1px solid #ff4400"],
        ["top:0;right:0", "border-top:1px solid #ff4400;border-right:1px solid #ff4400"],
        ["bottom:0;left:0", "border-bottom:1px solid #ff4400;border-left:1px solid #ff4400"],
        ["bottom:0;right:0", "border-bottom:1px solid #ff4400;border-right:1px solid #ff4400"]
      ].map(([pos, border], i) => (
        <div key={i} style={{
          position: "absolute", ...Object.fromEntries(pos.split(";").map(s => s.split(":"))),
          width: 18, height: 18, zIndex: 4, pointerEvents: "none",
          ...Object.fromEntries(border.split(";").map(s => s.split(":"))),
        }} />
      ))}

      {/* Mouse-follow tooltip */}
      {hovered && (
        <div style={{
          position: "absolute",
          left: mouse.x + 20,
          top: mouse.y - 10,
          zIndex: 10,
          pointerEvents: "none",
          maxWidth: 220,
          background: "rgba(10,10,10,0.95)",
          border: "1px solid #ff4400",
          padding: "10px 14px",
          
        }}>
          <div style={{
            fontSize: 9, letterSpacing: "0.2em", color: "#ff4400",
            textTransform: "uppercase", marginBottom: 6,
          }}>
            {`// ${label}`}
          </div>
          <div style={{ fontSize: 11, color: "#aaa", lineHeight: 1.6 }}>
            {description}
          </div>
          {/* Cursor dot */}
          <div style={{
            position: "absolute", left: -5, top: "50%", transform: "translateY(-50%)",
            width: 8, height: 8, background: "#ff4400", borderRadius: "50%",
          }} />
        </div>
      )}

      {/* Custom cursor */}
      {hovered && (
        <div style={{
          position: "absolute",
          left: mouse.x - 6,
          top: mouse.y - 6,
          width: 12, height: 12,
          border: "1px solid #ff4400",
          borderRadius: "50%",
          zIndex: 10,
          pointerEvents: "none",
          mixBlendMode: "difference",
        }} />
      )}
    </div>
  );
}


export default function AsciiImageCard({
  image1 = {
    src: "/artboard 37.webp",
    label: "001 — PORTRAIT",
    description: "Drop your image src into the image1 prop. The ASCII renderer samples every pixel and maps brightness to characters.",
  },
  image2 = {
    src: "/artboard 25.webp",
    label: "002 — WORK",
    description: "Drop your second image src into the image2 prop. Hover over either panel to reveal this tooltip.",
  },
  cols = 110,
  colored = true,
}) {
  return (
    <div style={{
      display: "flex",
      
      background: "#050505",
      padding: 2,
      
      position: "relative",
      userSelect: "none",
    }}>
      {/* Top metadata bar */}
      <div style={{
        position: "absolute", top: -22, left: 0, right: 0,
        display: "flex", justifyContent: "space-between",
        fontSize: 9, letterSpacing: "0.2em", color: "#333",
        
        textTransform: "uppercase",
        pointerEvents: "none",
      }}>
        
      </div>

      <AsciiPanel
        imgSrc={image1.src}
        label={image1.label}
        description={image1.description}
        cols={cols}
        colored={colored}
      />
      <AsciiPanel
        imgSrc={image2.src}
        label={image2.label}
        description={image2.description}
        cols={cols}
        colored={colored}
      />
    </div>
  );
}
