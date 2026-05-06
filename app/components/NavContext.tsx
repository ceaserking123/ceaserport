"use client";

import { createContext, useContext, useRef, useState, useEffect, ReactNode } from 'react';
import { gsap } from 'gsap';

interface NavContextType {
  firstNavRef: React.RefObject<HTMLElement | null>;
  secondNavRef: React.RefObject<HTMLElement | null>;
  firstNavInView: boolean;
}

const NavContext = createContext<NavContextType | null>(null);

export function NavProvider({ children }: { children: ReactNode }) {
  const [firstNavInView, setFirstNavInView] = useState(true);
  const firstNavRef = useRef<HTMLElement | null>(null);
  const secondNavRef = useRef<HTMLElement | null>(null);

  // Watch the first nav visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setFirstNavInView(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (firstNavRef.current) observer.observe(firstNavRef.current);
    return () => observer.disconnect();
  }, []);

  // Animate second nav in/out based on first nav visibility
  useEffect(() => {
    const secondNav = secondNavRef.current;
    if (!secondNav) return;

    if (!firstNavInView) {
      gsap.fromTo(
        secondNav,
        { y: -100, opacity: 0, display: 'block' },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
      );
    } else {
      gsap.to(secondNav, {
        y: -100,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => { gsap.set(secondNav, { display: 'none' }); return undefined; },
      });
    }
  }, [firstNavInView]);

  return (
    <NavContext.Provider value={{ firstNavRef, secondNavRef, firstNavInView }}>
      {children}
    </NavContext.Provider>
  );
}

export const useNav = () => useContext(NavContext);