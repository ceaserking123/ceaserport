import { useEffect, useRef } from "react";

export default function GrainOverlay({ opacity = 0.18, fps = 24, tileSize = 128 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    let lastTime = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const generateGrain = (size) => {
      const offscreen = document.createElement("canvas");
      offscreen.width = size;
      offscreen.height = size;
      const oc = offscreen.getContext("2d");
      const id = oc.createImageData(size, size);
      const buf = id.data;
      for (let i = 0; i < buf.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        buf[i] = buf[i + 1] = buf[i + 2] = v;
        buf[i + 3] = 255;
      }
      oc.putImageData(id, 0, 0);
      return offscreen;
    };

    const draw = (ts) => {
      animId = requestAnimationFrame(draw);
      if (ts - lastTime < 1000 / fps) return;
      lastTime = ts;
      const tile = generateGrain(tileSize);
      const pat = ctx.createPattern(tile, "repeat");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = pat;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    animId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [fps, tileSize]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 9999,
        opacity,
        mixBlendMode: "overlay", // or "screen" for lighter look
      }}
    />
  );
}