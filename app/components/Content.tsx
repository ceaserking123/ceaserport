"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const Introduction = () => (
  <section className="h-screen bg-white flex items-center justify-center">
    <h2 className="text-4xl font-bold">Introduction</h2>
  </section>
);

const Casestudy = () => (
  <section className="h-screen bg-gray-100 flex items-center justify-center">
    <h2 className="text-4xl font-bold">Case Study</h2>
  </section>
);

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function UnifiedHero() {
  const containerRef       = useRef<HTMLDivElement>(null);
  const heroRef            = useRef<HTMLElement>(null);
  const skyContainerRef    = useRef<HTMLDivElement>(null);
  const heroCopyRef        = useRef<HTMLDivElement>(null);
  const windowContainerRef = useRef<HTMLDivElement>(null);
  const heroHeaderRef      = useRef<HTMLDivElement>(null);
  const column1Ref         = useRef<HTMLDivElement>(null);
  const column2Ref         = useRef<HTMLDivElement>(null);
  const outroRef           = useRef<HTMLElement>(null);

  // ── Lenis ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    const lenis = new Lenis({ autoRaf: false });

    lenis.on("scroll", ScrollTrigger.update);

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // ── GSAP ───────────────────────────────────────────────────────────────────
  useGSAP(() => {
    if (
      !heroRef.current            ||
      !skyContainerRef.current    ||
      !heroCopyRef.current        ||
      !windowContainerRef.current ||
      !heroHeaderRef.current
    ) return;

    const skyHeight      = skyContainerRef.current.offsetHeight;
    const viewportHeight = window.innerHeight;
    const moveDistance   = skyHeight - viewportHeight;

    gsap.set(heroCopyRef.current, { y: "100%" });

    ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: "+=3000",
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        const p = self.progress;

        // Scale window + header — zoom in first 50%
        const scaleValue = p <= 0.5 ? 1 + p * 10 : 6;
        gsap.set(windowContainerRef.current, { scale: scaleValue });
        gsap.set(heroHeaderRef.current,      { scale: scaleValue, z: p * 500 });

        // Sky drifts upward
        gsap.set(skyContainerRef.current, { y: -moveDistance * p });

        // Hero copy slides up in final 20%
        if (p > 0.8) {
          const reveal = (p - 0.8) / 0.2;
          gsap.set(heroCopyRef.current, { y: `${100 - reveal * 100}%` });
        } else {
          gsap.set(heroCopyRef.current, { y: "100%" });
        }
      },
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full bg-black">

      {/* ══ Hero ══════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative w-screen h-screen overflow-hidden"
      >

        {/* Sky — tall so parallax has room to drift */}
        <div
          ref={skyContainerRef}
          className="absolute top-0 left-0 w-full h-[350vh] will-change-transform"
        >
          <Image
            src="/sky.jpg"
            alt="Sky Background"
            fill
            priority
            className="object-cover object-top"
          />
        </div>

        {/* Hero copy — revealed in final 20% of scroll */}
        <div
          ref={heroCopyRef}
          className="
            absolute inset-0 z-30
            flex items-center justify-center
            will-change-transform overflow-hidden
          "
        >
          <h1 className="
            text-white font-bold text-center
            text-[clamp(3rem,8vw,7rem)] leading-tight
          ">
            Experience the Journey
          </h1>
        </div>

        {/* Window frame — zooms toward camera */}
        <div
          ref={windowContainerRef}
          className="
            absolute inset-0 z-20
            will-change-transform
          "
          style={{ transformOrigin: "center center" }}
        >
          <Image
            src="/musicimg.png"
            alt="Window Frame"
            fill
            className="object-cover object-center"
          />
        </div>

        {/* Editorial foreground text */}
        <div
          ref={heroHeaderRef}
          className="
            absolute inset-0 z-40
            flex items-end justify-between
            p-10 will-change-transform
          "
          style={{ transformOrigin: "center center" }}
        >
          {/* Left column */}
          <div
            ref={column1Ref}
            className="flex flex-col gap-4 max-w-xs"
          >
            <h1 className="
              text-white font-bold leading-none
              text-[clamp(2rem,5vw,4rem)]
            ">
              Discovery
            </h1>
            <p className="text-white/50 text-sm leading-relaxed">
              Exploring the horizons of digital motion and immersive design.
            </p>
          </div>

          {/* Right column */}
          <div
            ref={column2Ref}
            className="flex flex-col items-end gap-4 max-w-xs text-right"
          >
            <p className="text-white/50 text-sm leading-relaxed">
              Inspired by award-winning interactions.
            </p>
            <h1 className="
              text-white font-bold leading-none
              text-[clamp(2rem,5vw,4rem)]
            ">
              2024
            </h1>
          </div>
        </div>

      </section>

      {/* ══ Outro ═════════════════════════════════════════════════════════════ */}
      <section
        ref={outroRef}
        className="
          relative w-screen h-screen
          flex items-center justify-center
          bg-neutral-950
        "
      >
        <h1 className="
          text-white font-bold
          text-[clamp(3rem,8vw,7rem)]
          tracking-tight
        ">
          Keep Exploring
        </h1>
      </section>

    </div>
  );
}