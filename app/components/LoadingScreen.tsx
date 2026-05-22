"use client";

import { useEffect, useRef, useState } from "react";
import GrainOverlay from "./grainoverlay";

interface LoadingScreenProps {
  onComplete: () => void;
}

// Each layer has its own counter, delay, and duration
const LAYERS = [
  { delay: 0,    duration: 1800 },
  { delay: 300,  duration: 1900 },
  { delay: 600,  duration: 2000 },
  { delay: 900,  duration: 2100 },
];

// Total time = last layer delay + its duration + exit pause
// = 900 + 2100 + 400 = 3400ms before exit begins

function useCounter(duration: number, delay: number, onDone?: () => void) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    let startTime: number | null = null;

    const ease = (t: number) => t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const tick = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const t = Math.min(elapsed / duration, 1);
      const value = Math.floor(ease(t) * 100);
      setCount(value);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setCount(100);
        onDone?.();
      }
    };

    const timeout = setTimeout(() => {
      rafRef.current = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [duration, delay, onDone]);

  return count;
}

function Layer({
  index,
  delay,
  duration,
  onDone,
}: {
  index: number;
  delay: number;
  duration: number;
  onDone?: () => void;
}) {
  const count = useCounter(duration, delay, onDone);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  // Each layer slides up from below with a staggered entrance
  return (
    <div
      className="absolute inset-0 flex items-center justify-center bg-blue-900"
      style={{
        // Layer 0 is at the bottom of the stack, layer 3 on top
        // They slide UP into view one by one
        transform: visible ? "translateY(0%)" : "translateY(100%)",
        transition: `transform 0.75s cubic-bezier(0.76, 0, 0.24, 1)`,
        zIndex: index + 1,
      }}
    >
      {/* Subtle inner vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,20,0.35) 100%)",
        }}
      />

      {/* Number — slides in from bottom when layer appears */}
      <div
        className="relative z-10 overflow-hidden"
        style={{ lineHeight: 1 }}
      >
        <span
          className="block text-white font-thin select-none"
          style={{
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontSize: "clamp(5rem, 22vw, 16rem)",
            letterSpacing: "-0.04em",
            transform: visible ? "translateY(0%)" : "translateY(110%)",
            transition: `transform 0.75s cubic-bezier(0.76, 0, 0.24, 1)`,
            transitionDelay: "0.05s",
            opacity: 0.92,
          }}
        >
          {String(count).padStart(2, "0")}
        </span>
      </div>

      {/* Layer index label — bottom left */}
      <div
        className="absolute bottom-10 left-10 text-white/20"
        style={{
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          fontSize: "10px",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          fontWeight: 300,
        }}
      >
        {String(index + 1).padStart(2, "0")} / 04
      </div>

      {/* Thin progress line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10">
        <div
          className="h-full bg-white/40 transition-none"
          style={{ width: `${count}%` }}
        />
      </div>
    </div>
  );
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [leaving, setLeaving] = useState(false);

  // Called when the last (4th) layer's counter finishes
  const handleLastDone = () => {
    setTimeout(() => {
      setLeaving(true);
      setTimeout(onComplete, 800);
    }, 350);
  };

  return (
    <div
      className="fixed inset-0 bg-blue-900 overflow-hidden"
      style={{ zIndex: 9999 }}
    >
      {/* All 4 layers stack absolutely inside this root */}
      <div
        className="absolute inset-0"
        style={{
          opacity: leaving ? 0 : 1,
          transform: leaving ? "scale(1.03)" : "scale(1)",
          transition: "opacity 0.75s ease, transform 0.75s ease",
        }}
      >
        {LAYERS.map((layer, i) => (
          <Layer
            key={i}
            index={i}
            delay={layer.delay}
            duration={layer.duration}
            onDone={i === LAYERS.length - 1 ? handleLastDone : undefined}
          />
        ))}
      </div>
      <GrainOverlay opacity={0.2} fps={40} tileSize={200} />
    </div>
  );
}
