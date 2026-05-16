"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

const features = [
  {
    id: "deals",
    label: "Manages deals",
    description: "Performs all the operations of creating, receiving and updating transactions.",
    panel: "/firstbg.png",
  },
  {
    id: "companies",
    label: "Manages companies",
    description: "Supports deep integration with companies entity in CRM and associations.",
    panel: "/herobgimg2.png",
  },
  {
    id: "contacts",
    label: "Manages contacts",
    description: "Knows how to handle contacts, manage them and link them to deals and companies.",
    panel: "/destoptoplayer.png",
  },
  {
    id: "custom",
    label: "Manages custom entities",
    description: "Processes custom entities with configured parameters.",
    panel: "/musicimg.png",
  },
];

export default function FeaturesCarousel() {
  const [active, setActive]   = useState(0); // ✅ index instead of id — easier for next/prev
  const intervalRef           = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressRef           = useRef<HTMLDivElement>(null);  // progress bar
  const progressTweenRef      = useRef<gsap.core.Tween | null>(null);

  const DURATION = 5; 

  // ── Advance to next slide ─────────────────────────────────────────────────
  const goToNext = (currentIndex: number) => {
    const next = (currentIndex + 1) % features.length;
    setActive(next);
    return next;
  };

  // ── Start progress bar + auto-advance ────────────────────────────────────
  const startCycle = (index: number) => {
    // Kill any existing tween and interval
    progressTweenRef.current?.kill();
    if (intervalRef.current) clearTimeout(intervalRef.current);

    // Reset progress bar to 0
    gsap.set(progressRef.current, { scaleX: 0, transformOrigin: "left center" });

    // Animate progress bar from 0 → full width over DURATION seconds
    progressTweenRef.current = gsap.to(progressRef.current, {
      scaleX: 1,
      duration: DURATION,
      ease: "none",       // linear — feels like a timer
      onComplete: () => {
        const next = goToNext(index);
        startCycle(next); // restart cycle for next slide
      },
    });
  };

  // ── Manual select — resets the timer ─────────────────────────────────────
  const handleSelect = (index: number) => {
    setActive(index);
    startCycle(index);
  };

  // ── Start on mount ────────────────────────────────────────────────────────
  useEffect(() => {
    startCycle(0);
    return () => {
      progressTweenRef.current?.kill();
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, []);

  return (
    <section className="flex flex-row max-sm:w-full mx-auto w-full h-full justify-center items-center">

      {/* Left — feature list */}
      <div className="flex flex-col gap-1  w-1/2  p-6 rounded-2xl overflow-hidden">
        

        {features.map((f, i) => (
          <div
            key={f.id}
            onMouseEnter={() => handleSelect(i)}  // ✅ hover resets timer
            className={`
              px-5 py-4 rounded-lg cursor-pointer border transition-all duration-300
              ${active === i
                ? "bg-yellow-600 border-yellow-500"
                : "border-transparent hover:bg-yellow-100"
              }
            `}
          >
            
            <p className="text-sm text-gray-600 leading-relaxed">
              {f.description}
            </p>

            {/* ── Per-item progress bar — only visible on active item ── */}
            {active === i && (
              <div className="mt-3 h-[2px] w-full bg-yellow-200 rounded-full overflow-hidden">
                <div
                  ref={progressRef}
                  className="h-full bg-yellow-900 rounded-full"
                  style={{ transformOrigin: "left center", transform: "scaleX(0)" }}
                />
              </div>
            )}
          </div>
        ))}

      </div>

      {/* Right — preview panel */}
      <div className="flex  w-1/2  ">
        <div className="relative flex items-center justify-center overflow-hidden w-full h-80 lg:h-96 hover:rotate-6 transition-transform duration-500">
          {features.map((f, i) => (
            <div
              key={f.id}
              className={`
                absolute inset-0 transition-opacity duration-500 ease-in-out items-center justify-center
                ${active === i ? "opacity-100" : "opacity-0 pointer-events-none"}
              `}
            >
              <Image
                src={f.panel}
                alt={f.label}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center "
              />
            </div>
          ))}

          {/* Slide counter */}
          <div className="absolute bottom-3 right-4 text-white/60 text-xs tracking-widest z-10">
            {active + 1} / {features.length}
          </div>
        </div>
      </div>

    </section>
  );
}