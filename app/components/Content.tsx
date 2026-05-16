"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Introduction from "./content1";
import Casestudy from "./content2";
import Summary from "./summary";


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
    const moveDistance   = skyHeight + viewportHeight;

    gsap.set(heroCopyRef.current, { y: "100%" });
    
    gsap.set(heroHeaderRef.current, { z: 0 , transformOrigin: "left center", scale: 1 });

  
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: "+=7000",
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        const p = self.progress;

        // Scale window + header — zoom in first 50%
        const scaleValue = p <= 0.7 ? 1 + p * 9 : 9;
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

      {/* ══ Hero ═══════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative w-screen h-screen overflow-hidden bg-purple-600"
      >

        {/* Sky — tall so parallax has room to drift */}
        <div
          ref={skyContainerRef}
          className="absolute top-0 left-0 w-screen  bg-emerald-800 will-change-transform "
        >
          <Image
            src="/firstbg.png"
            alt="Sky Background"
            width={10000}
            height={10000}
            className="object-cover object-top pointer-events-none"
          />
          <div className=" bg-white/80 px-4 py-2 rounded w-screen h-screen flex items-center justify-center overflow-hidden">
            <Summary />
          </div>
          <h1 className="w-screen h-screen bg-blue-600 pointer-events-none"> hello world</h1>
          
        </div>

        {/* Hero copy — revealed in final 20% of scroll */}
        <div
          ref={heroCopyRef}
          className="
            absolute inset-0 z-30
            flex items-center justify-center
            will-change-transform overflow-hidden bg-amber-600 pointer-events-none
          "
        >
          <h1 className="
            text-white font-bold text-center
            text-[clamp(3rem,8vw,7rem)] leading-tight pointer-events-none
          ">
            Experience the Journey
          </h1>
        </div>

        {/* Window frame — zooms toward camera */}
        <div
          ref={windowContainerRef}
          className="
            absolute inset-0 z-20
            will-change-transform pointer-events-none
          "
          style={{ transformOrigin: "center center" }}
        >
          <Image
            src="/herobgimg1.webp"
            alt="Window Frame"   
            width={10000}
            height={10000}
            quality={100}
            sizes="100vw"
            className="object-cover object-top w-screen h-screen pointer-events-none"
            style={{transform: "translateZ(0)"}}
          />
        </div>

        {/* Editorial foreground text */}
        <div
          ref={heroHeaderRef}
          className="
            absolute inset-0 z-40
            flex items-center justify-center
            p-10 will-change-transform pointer-events-none
          "
          style={{ transformOrigin: "center center" }}
        >
          {/* Left column */}
          <div
            ref={column1Ref}
            className="flex flex-col gap-4 max-w-xs text-black"
          >
            <h1 className="
              text-black font-bold leading-none
              text-[clamp(2rem,5vw,4rem)]
            ">
              Discovery
            </h1>
            <p className="text-black text-sm leading-relaxed">
              Exploring the horizons of digital motion and immersive design.
            </p>
          </div>

          {/* Right column */}
          <div
            ref={column2Ref}
            className="flex flex-col items-end gap-4 max-w-xs text-right"
          >
            <p className="text-black text-sm leading-relaxed">
              Inspired by award-winning interactions.
            </p>
            
          </div>
        </div>

      </section>

      {/* ══ Outro ═════════════════════════════════════════════════════════════ */}
      <section
        ref={outroRef}
        className="
          relative 
          flex flex-col items-center justify-center
          
        "
      >
        <h1 className="
          text-white font-bold
          text-[clamp(3rem,8vw,7rem)]
          tracking-tight
        ">
          Keep Exploring
        </h1>
        <Casestudy />
        <Introduction />
      </section>

    </div>
  );
}