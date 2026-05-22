"use client";

import Navbar from "../components/Navbar";
import Image from "next/image";
import { useEffect, useState } from 'react';
import gsap from "gsap";
import { Observer, SplitText, MorphSVGPlugin } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import BottomNav from "../components/bottomNav";
import AboutPage from "../components/AboutPage";
import GrainOverlay from "../components/grainoverlay";
import ContactPage from "../components/ContactPage";
gsap.registerPlugin(Observer, SplitText, useGSAP, MorphSVGPlugin);

export default function Contact() {
  const logosvg = useRef<SVGSVGElement | null>(null);
  const morphCircle = useRef<SVGPathElement | null>(null); // ✅ on the <path> now
  const nameRef = useRef<HTMLHeadingElement | null>(null);
  const abouth1 = useRef<HTMLHeadingElement | null>(null);

  useGSAP(() => {
    if (!logosvg.current || !morphCircle.current) return;

    // ---- Logo morph ----
    const logoPath = logosvg.current.querySelector("path");
    if (!logoPath) return;

    const morphTl = gsap.timeline({ paused: true });
    morphTl.to(logoPath, {
      duration: 0.8,
      morphSVG: {
        shape: morphCircle.current,
        shapeIndex: "auto",
      },
      ease: "power2.inOut",
    });

    Observer.create({
      target: logosvg.current,
      type: "pointer",
      preventDefault: false,
      onHover: () => morphTl.play(),
      onHoverEnd: () => morphTl.reverse(),
    });

    // ---- Name slide-in animation ----
    if (!nameRef.current) return;

    const split = new SplitText(nameRef.current, {    type: "chars, words" ,
      charsClass: "char++",
    });

    // set initial state — below and invisible
    gsap.set(split.chars, { yPercent: 100, opacity: 0,  });

    Observer.create({
      target: document.querySelector(".name-trigger"), // the visible placeholder
      type: "pointer",
      preventDefault: false,
      onHover: () => {
        gsap.to(split.chars, {
          yPercent: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.05,
        });
      },
      onHoverEnd: () => {
        gsap.to(split.chars, {
          yPercent: 100,
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
          stagger: 0.05,
        });
      },
    });
  });

  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    // ✅ Fix
<div className="flex flex-col relative bg-blue-900 min-h-screen overflow-y-auto">
      <div className="h-16 items-center flex flex-row  justify-between px-10">
        <div className="w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex justify-center items-center mr-5 relative">

          {/* ✅ Both paths share the same viewBox now */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            className="w-6 h-6"
            ref={logosvg}
          >
            <defs>
              <style>{`.cls-1 { fill: #ffffff; stroke-width: 0px; }`}</style>
            </defs>
            {/* ✅ Redrawn to fit 0 0 100 100 viewBox — same shape, normalized */}
            <path
              className="cls-1"
              d="M61.8,50H7.5v43.1h43.1c-8.76,0-15.86-19.3-15.86-43.1ZM25.3,73.4c-3.15,0-5.71-2.56-5.71-5.71s2.56-5.71,5.71-5.71,5.71,2.56,5.71,5.71-2.56,5.71-5.71,5.71Z
               M41.8,24.1c0-2.79,2.26-5.06,5.06-5.06V6.44H7.5v43.1h43.1V33.1c-2.79,0-5.06-2.26-5.06-5.06Z
               M25.3,32.8c-3.15,0-5.71-2.56-5.71-5.71s2.56-5.71,5.71-5.71,5.71,2.56,5.71,5.71-2.56,5.71-5.71,5.71Z"
            />
          </svg>

          {/* ✅ ref is on the <path>, hidden off-screen not with display:none */}
          <svg
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            style={{ position: "absolute", pointerEvents: "none", opacity: 0, width: 0, height: 0 }}
          >
            <path
              ref={morphCircle}
              d="M50,1 A49,49 0 1,0 50,99 A49,49 0 1,0 50,1 Z"
            />
          </svg>
        </div>

  
      </div>


    
<div className="name-trigger relative overflow-hidden">
  <h1
    ref={nameRef}
    className="font-romantic font-extrabold text-8xl text-blue-300 pl-10"
  >
    CST
  </h1>
  <h1 className="font-romantic font-extrabold text-8xl text-blue-300 absolute right-10 top-0">
    Contact Me
  </h1>
</div>
        <ContactPage/>
      
      <BottomNav />
      <GrainOverlay opacity={0.2} fps={40} tileSize={200} />
    </div>
  );
}