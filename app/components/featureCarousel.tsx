"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const features = [
  {
    id: "deals",
    description: "Process of brand setup",
    panel: "/firstbg.png",
  },
  {
    id: "companies",
    description: "Character design my fav.",
    panel: "/herobgimg2.png",
  },
  {
    id: "contacts",
    description: "Grow your business with the right key.",
    panel: "/destoptoplayer.png",
  },
  {
    id: "custom",
    description: "Build from ground up.",
    panel: "/musicimg.png",
  },
];

export default function FeaturesCarousel() {
  const [active, setActive] = useState(0);
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);

  const ROWS = 8;
  const COLS = 8;

  // ── 1. Amplified Breathing Effect (Overwrites, Doesn't Kill) ──────────────
  useEffect(() => {
    const cells = gridContainerRef.current?.querySelectorAll(".grid-cell");
    if (!cells || cells.length === 0) return;

    const cellArray = Array.from(cells) as HTMLDivElement[];

    const ambientPulse = setInterval(() => {
      // Pick 4 random unique blocks to bounce
      const shuffled = [...cellArray].sort(() => 0.5 - Math.random());
      const selectedCells = shuffled.slice(0, 4);
      
      // Higher Z peaks for more dramatic breathing
      gsap.to(selectedCells, {
        z: () => Math.random() * 55 + 20,
        duration: 0.7,
        yoyo: true,
        repeat: 1,
        ease: "sine.inOut",
        // Crucial: 'auto' elegantly overrides matching properties on a cell-by-cell 
        // basis when a transition hits, creating that organic "skipping a beat" feel.
        overwrite: "auto" 
      });
    }, 200);

    return () => clearInterval(ambientPulse);
  }, [active]);

  // ── 2. The Dynamic Slide Transition ──────────────────────────────────────
  const handleSelect = (nextIndex: number) => {
    if (nextIndex === active || isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const cells = gridContainerRef.current?.querySelectorAll(".grid-cell");
    if (!cells || cells.length === 0) {
      setActive(nextIndex);
      isAnimatingRef.current = false;
      return;
    }

    const transitionStyles = ["center", "edges"] as const;
    const chosenStyle = transitionStyles[Math.floor(Math.random() * transitionStyles.length)];

    // Snappy outward explosion wave
    gsap.to(cells, {
      z: () => Math.random() * 160 + 80,
      rotationX: () => Math.random() * 50 - 25,
      rotationY: () => Math.random() * 50 - 25,
      opacity: 0.2,
      duration: 0.35, 
      stagger: {
        grid: [ROWS, COLS],
        from: chosenStyle,
        amount: 0.25,
      },
      ease: "power3.inOut",
      overwrite: "auto",
      onComplete: () => {
        setActive(nextIndex);

        // Snap back down smoothly into position
        gsap.to(cells, {
          z: 0,
          rotationX: 0,
          rotationY: 0,
          opacity: 1,
          duration: 0.5,
          stagger: {
            grid: [ROWS, COLS],
            from: chosenStyle === "center" ? "edges" : "center",
            amount: 0.25,
          },
          ease: "power4.out",
          overwrite: "auto",
          onComplete: () => {
            isAnimatingRef.current = false;
          },
        });
      },
    });
  };

  // ── 3. Hybrid Automatic 4-Second Loop + Mouse Interaction ───────────────
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimatingRef.current) {
        const next = (active + 1) % features.length;
        handleSelect(next);
      }
    }, 4000); // Triggers automatically every 4 seconds

    return () => clearInterval(interval);
  }, [active]);

  return (
    <section className="flex flex-col mx-auto w-screen h-screen justify-center items-center relative bg-[#090909] font-mono antialiased overflow-hidden p-6 gap-16">
      
      {/* 3D Viewport Box — Permanently Scaled Up 20% (scale-120 / 1.2) */}
      <div 
        className="relative flex items-center justify-center scale-125 w-[360px] h-[360px] md:w-[420px] md:h-[420px] will-change-transform"
        style={{ perspective: "1200px" }}
      >
        <div
          ref={gridContainerRef}
          className="w-full h-full grid select-none"
          style={{
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            gridTemplateRows: `repeat(${ROWS}, 1fr)`,
            transformStyle: "preserve-3d",
          }}
        >
          {Array.from({ length: ROWS * COLS }).map((_, index) => {
            const r = Math.floor(index / COLS);
            const c = index % COLS;

            const posX = (c / (COLS - 1)) * 100;
            const posY = (r / (ROWS - 1)) * 100;

            return (
              <div
                key={index}
                className="grid-cell relative w-full h-full border-[0.25px] border-black/50 bg-neutral-900"
                style={{
                  backgroundImage: `url(${features[active].panel})`,
                  backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
                  backgroundPosition: `${posX}% ${posY}%`,
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Centered Descriptions Control Area */}
      <div className="flex flex-col items-center justify-center gap-3 max-w-lg text-center z-20">
        {features.map((f, i) => (
          <div
            key={f.id}
            onMouseEnter={() => handleSelect(i)} // Interrupts auto-cycle instantly on hover
            className="cursor-pointer py-1 block"
          >
            <p
              className={`text-[11px] tracking-wider transition-all duration-300 font-light ${
                active === i 
                  ? "text-orange-500 scale-105 font-semibold brightness-125" 
                  : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              {f.description}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
}