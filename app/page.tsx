"use client";
import Navbar from "./components/Navbar";
import Hero from "./components/hero";
import Content from "./components/Content";
import BottomNav from "./components/bottomNav";
import { useEffect, useRef, useState } from 'react';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}

export default function Home() {
  const [firstNavRef, firstNavInView] = useInView(0.1);
  const bottomRef = useRef<HTMLDivElement | null>(null);  // Updated to HTMLDivElement

  useGSAP(() => {
    const el = bottomRef.current;
    if (!el) return;

    if (!firstNavInView) {
      // Pop IN
      gsap.fromTo(el,
        { opacity: 0, scale: 0.5, y: 40 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }
      );
    } else {
      // Pop OUT
      gsap.to(el, {
        opacity: 0,
        scale: 0.5,
        y: 40,
        duration: 0.5,
        ease: "back.in(1.7)",
      });
    }
  }, [firstNavInView]);

  return (
    <div className="font-romantic w-full overflow-hidden relative">
      <div ref={firstNavRef}>
        <Navbar />
      </div>
      <Hero />
      <Content />
      <BottomNav ref={bottomRef}   />  {/* ref passed directly, no wrapper div */}
    </div>
  );
}