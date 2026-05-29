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
import Explore from "./explore";
import AsciiImageCard from './AsciiImageCard';

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

  // ── Lenis Smooth Scroll ──────────────────────────────────────────────────
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

  // ── GSAP Timeline & ScrollTrigger ────────────────────────────────────────
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
    
    // We only want to pull up the overflow depth of the sky content
    const moveDistance   = skyHeight - viewportHeight;

    // Set layout starting points properly
    gsap.set(heroCopyRef.current, { yPercent: 100 });
    gsap.set(heroHeaderRef.current, { z: 0, transformOrigin: "center center" });
    gsap.set(windowContainerRef.current, { transformOrigin: "center center" });

    // Built-in GSAP Timeline behaves beautifully with scrubs over onUpdate loops
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        // Multiplied pin duration based on visual scale targets so scroll feels natural
        end: "+=4000", 
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true, // Recalculates dynamically if screen resizes
      }
    });

    tl.to([windowContainerRef.current, heroHeaderRef.current], {
      scale: 10,
      z: 500,
      duration: 2,
      ease: "power1.inOut"
    })
    .to(skyContainerRef.current, {
      y: -moveDistance,
      duration: 2,
      ease: "none"
    }, 0) // Starts concurrently with the zoom animation
    .to(heroCopyRef.current, {
      yPercent: 0,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.5"); // Pulls the typography layer into view near the tail end of the scroll

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full bg-black text-blue-900">

      {/* ══ Hero ═══════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative w-screen h-screen overflow-hidden bg-black"
      >

        {/* Sky Container — Set to absolute with normal rendering bounds to contain children */}
        <div
          ref={skyContainerRef}
          className="absolute top-0 left-0 w-screen flex flex-col will-change-transform bg-[#171717]"
        >
          <div className="relative w-screen h-screen min-h-screen shrink-0">
            <Image
              src="/artboard 27.webp"
              alt="Sky Background"
              fill
              priority
              className="object-cover object-top pointer-events-none z-0"
            />
          </div>
          
          <div className="w-screen min-h-screen flex items-center justify-center relative overflow-hidden bg-blue-900 shrink-0">
            <Summary />
          </div>

          <div className="w-screen min-h-screen bg-blue-900 shrink-0">
            <Explore />
          </div>

          <div className="w-screen min-h-screen bg-blue-900 z-10 shrink-0">
            <AsciiImageCard
              image1={{
                src: "/artboard 1.webp",
                label: "SELF",
                description: "Designer & developer based in Lagos. Building raw digital experiences from the ground up."
              }}
              image2={{
                src: "/artboard 25.webp",
                label: "WORK",
                description: "Full-stack portfolio. Brutalist UIs, performant systems, obsessive details."
              }}
              cols={110}
              colored={true}
            />
          </div>
        </div>

        {/* Hero copy — revealed at the bottom edge */}
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
        >
          <Image
            src="/herobgimg1.webp"
            alt="Window Frame"   
            fill
            priority
            className="object-cover object-top w-screen h-screen pointer-events-none"
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
        >
          {/* Left column */}
          <div ref={column1Ref} className="flex flex-col gap-4 max-w-xs text-blue-900 mr-auto">
            <h1 className="text-blue-900 font-bold leading-none text-[clamp(2rem,5vw,4rem)]">
              Discovery
            </h1>
            <p className="text-blue-900 text-sm leading-relaxed">
              Exploring the horizons of digital motion and immersive design.
            </p>
          </div>

          {/* Right column */}
          <div ref={column2Ref} className="flex flex-col items-end gap-4 max-w-xs text-right ml-auto">
            <p className="text-blue-900 text-sm leading-relaxed">
              Inspired by award-winning interactions.
            </p>
          </div>
        </div>

        {/* Subtle radial overlay block to clean blend gaps between zoom and elements */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none z-25" />

      </section>

      {/* ══ Outro ═════════════════════════════════════════════════════════════ */}
      <section
        ref={outroRef}
        className="relative flex flex-col items-center justify-center bg-black z-40"
      >
        <h1 className="
          text-white font-bold
          text-[clamp(3rem,8vw,7rem)]
          tracking-tight pt-20
        ">
          Keep Exploring
        </h1>
        <Casestudy />
        <Introduction />
      </section>

    </div>
  );
}