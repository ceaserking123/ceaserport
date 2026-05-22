"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable);
}

const servicesData = [
  {
    id: "concept",
    title: "Concept Development",
    image: "/firstbg.png",
    description: "Come to us with an idea—or even just a goal—and we'll build the entire creative vision from start to finish. From viral social moments to large-scale productions, we develop bold, strategic concepts that cut through the noise.",
    bullets: ["Creative strategy", "Storyboarding", "Campaign direction", "Narrative development", "Moodboards", "Visual Treatments"]
  },
  {
    id: "production",
    title: "Production",
    image: "/herobgimg2.png",
    description: "No matter the scale, we bring productions to life with precision. Backed by a global network of top-tier creatives, we handle everything—crew, gear, logistics—so shoots run seamlessly from pre-production to final cut.",
    bullets: ["Commercial video production", "Studio photography", "Social content", "Talent casting", "Gear sourcing", "Global management"]
  },
  {
    id: "uiux",
    title: "UI/UX Design",
    image: "/destoptoplayer.png",
    description: "We craft digital interfaces that feel completely intuitive while looking striking. By marrying thorough user research with clean visual aesthetics, we make your product simple to use and impossible to ignore.",
    bullets: ["User research", "Wireframing", "Interactive prototypes", "Design systems", "Usability testing", "Mobile & Web UI"]
  },
  {
    id: "graphics",
    title: "Graphic Design",
    image: "/musicimg.png",
    description: "Building strong visual identities through bold creative execution. We translate your company goals into memorable logos, packaging layouts, and physical brand assets that instantly connect with your audience.",
    bullets: ["Brand identity", "Logo design", "Packaging assets", "Print collateral", "Vector illustration", "Typography layout"]
  },
  {
    id: "web-design",
    title: "Web Design",
    image: "/firstbg.png",
    description: "Immersive digital experiences built to convert visitors into die-hard fans. We design responsive, lighting-fast websites that balances layouts, custom visual assets, and animations seamlessly.",
    bullets: ["Responsive layouts", "E-commerce frontends", "Landing page optimization", "Interaction design", "SEO-ready structures", "Webflow/Framer development"]
  },
  {
    id: "marketing",
    title: "Digital Marketing",
    image: "/herobgimg2.png",
    description: "Amplifying your digital presence where it matters most. We craft target-driven campaigns, visually-arresting social content strategies, and growth pipelines to turn attention into active revenue streams.",
    bullets: ["Performance campaigns", "Social asset planning", "Growth pipelines", "Content creation", "Audience targeting", "Conversion tracking"]
  }
];

export default function Explore() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const slider = sliderRef.current;
    const container = containerRef.current;
    if (!slider || !container) return;

    // Helper function to figure out where the edge ends
    const getMaxDrag = () => -(slider.scrollWidth - container.clientWidth );
    const getStartOffset = () => container.clientWidth * 0.2;
    const getMinDrag = () => getStartOffset();
    gsap.set(slider, { x: getStartOffset() });

    function updateButtonStates() {
      const x = gsap.getProperty(slider, "x") as number;
      const minDrag = getMinDrag();
      const maxDrag = getMaxDrag();
      
      setCanScrollLeft(x < minDrag -10);
      setCanScrollRight(x > maxDrag + 10);
    }

  
    const draggable = Draggable.create(slider, {
      type: "x",
      bounds: {
        minX: getMinDrag(),
        maxX: getMaxDrag()
      },
      edgeResistance: 0.75,

      liveSnap: true,
      onDrag: updateButtonStates,
      onRelease: updateButtonStates,
    })[0];

    // Force check on mount and window adjustments
    const handleResize = () => {
      draggable.update();
      updateButtonStates();
    };

    window.addEventListener("resize", handleResize);
    // Initial calculation delayed slightly to let layout build securely
    setTimeout(updateButtonStates, 100);

    return () => {
      window.removeEventListener("resize", handleResize);
      draggable.kill();
    };
  }, []);

  // ── Button Controls ──────────────────────────────────────────────────────
  const scroll = (direction: "left" | "right") => {
    const slider = sliderRef.current;
    const container = containerRef.current;
    if (!slider || !container) return;

    const currentX = gsap.getProperty(slider, "x") as number;
    const cardWidth = 420;
    const gap = 24;
    const step = cardWidth + gap; 
    const maxDrag = -(slider.scrollWidth - container.clientWidth);

    let targetX = direction === "left" ? currentX + step : currentX - step;
    
    // Safety clamp bounds checking
    if (targetX > 0) targetX = 0;
    if (targetX < maxDrag) targetX = maxDrag;

    gsap.to(slider, {
      x: targetX,
      duration: 0.4,
      ease: "power2.out",
      onUpdate: () => {
        const x = gsap.getProperty(slider, "x") as number;
        setCanScrollLeft(x < -10);
        setCanScrollRight(x > maxDrag + 10);
      }
    });
  };

  return (
    <section className="w-full min-h-screen bg-[#050505] text-[#FFFFFF] font-sans px-6 py-16 md:px-16 flex flex-col justify-center select-none overflow-hidden">
      
      {/* Navigation Top Header Layer */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between mb-12">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
          Services
        </h2>
        
        {/* Navigation Arrows Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`w-12 h-12 rounded-md border flex items-center justify-center transition-all duration-200 ${
              canScrollLeft 
                ? "border-neutral-800 bg-neutral-900/60 text-white hover:bg-neutral-800 active:scale-95" 
                : "border-neutral-900 text-neutral-700 cursor-not-allowed opacity-40"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`w-12 h-12 rounded-md border flex items-center justify-center transition-all duration-200 ${
              canScrollRight 
                ? "border-neutral-800 bg-neutral-900/60 text-white hover:bg-neutral-800 active:scale-95" 
                : "border-neutral-900 text-neutral-700 cursor-not-allowed opacity-40"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Visible Outer Clipping Track Viewport Container */}
      <div ref={containerRef} className="w-full max-w-7xl mx-auto overflow-visible cursor-grab active:cursor-grabbing">
        
        {/* The Linear Sliding Rail */}
        <div 
          ref={sliderRef} 
          className="flex gap-6 will-change-transform"
          style={{ width: "max-content" }}
        >
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="w-[310px] sm:w-[420px] bg-[#0c0c0c] border border-neutral-900 rounded-xl p-8 flex flex-col justify-between shrink-0 min-h-[620px] hover:border-neutral-800 transition-colors duration-300"
            >
              <div>
                {/* Graphics Product Preview Container Frame */}
                <div className="w-full h-52 flex items-center justify-center relative mb-8 overflow-hidden pointer-events-none">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="max-h-full max-w-[80%] object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.65)]"
                  />
                </div>

                <h3 className="text-2xl font-semibold tracking-tight mb-4 text-neutral-100">
                  {service.title}
                </h3>
                
                <p className="text-[13px] leading-relaxed text-neutral-400 font-light tracking-wide mb-6">
                  {service.description}
                </p>
              </div>

              {/* Dual-Column Grid Bullet Items Layout */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 pt-6 border-t border-neutral-900">
                {service.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <svg 
                      className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[11px] font-normal text-neutral-400 tracking-wide leading-tight">
                      {bullet}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      </div>

    </section>
  );
}