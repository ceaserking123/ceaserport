"use client";

import { useState } from "react";

const tabs = [
  {
    id: "bio",
    label: "BIO",
    content: (
      <p>
        Ceaser Eghwrudjakpor is an entrepreneur, conceptual artist, and more. operating at the intersection of technology and
        creative strategy. Born in Warri Nigeria, 
        his work defies easy categorization—part vision, part execution, entirely
        singular.
      </p>
    ),
  },
  {
    id: "projects",
    label: "PROJECTS",
    content: (
      <ul className="space-y-2">
        <li>
          <a href="#" className="underline underline-offset-2 hover:opacity-60 transition-opacity">
            Lucid Furniture — an E-commerce for wood furniture with a focus on sustainability and craftsmanship
          </a>
        </li>
        <li>
          <a href="#" className="underline underline-offset-2 hover:opacity-60 transition-opacity">
            Seeds — a marketplace for farmers and their products, designed to empower agricultural communities and promote sustainable practices
          </a>
        </li>
        <li>
          <a href="#" className="underline underline-offset-2 hover:opacity-60 transition-opacity">
            Phoenxi — a modern e-commerce platform designed to deliver a clean, intuitive, and conversion-focused shopping experience.
          </a>
        </li>
      </ul>
    ),
  },
  {
    id: "speaking",
    label: "SPEAKING",
    content: (
      <ul className="space-y-2">
        <li>AI is the future of Designing</li>
        <li>IoT: where to Start</li>
        <li>What is the future of commerce, and how to position yourself</li>
        <li>Next step</li>
      </ul>
    ),
  },
  {
    id: "investments",
    label: "INVESTMENTS",
    content: (
      <p>
        Invested in tools that put him at the front of creative ventures and emerging technologies, including early stakes in companies like Figma, Notion, and Runway.
      </p>
    ),
  },
  
  {
    id: "friends",
    label: "FRIENDS",
    content: (
      <p>
        A curated circle of collaborators, creatives, and co-conspirators.
        If you're reading this, you probably already know who you are.
      </p>
    ),
  },
];

export default function AboutPage() {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  return (
    <div
      className="min-h-[35rem] w-full relative font-romantic text-white flex justify-center items-center"
      
    >
 
      {/* Main layout */}
      <main className="h-full flex items-center">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* LEFT — Hero text */}
          <div className="space-y-6">
            <h1
              className="text-4xl md:text-5xl lg:text-[3.2rem] leading-[1.15] font-bold tracking-wider uppercase"
              
            >
              CEASER IS AN
              ENTREPRENEUR AND CONCEPTUAL
              ARTIST.
            </h1>

            <p
              className="text-xs tracking-[0.18em] uppercase text-blue-300"
            
            >
              YOU MAY KNOW HIM FOR{" "}
              <a href="#" className="underline underline-offset-2">THIS</a>,{" "}
              <a href="#" className="underline underline-offset-2">THIS</a>,{" "}
              <a href="#" className="underline underline-offset-2">THIS</a>,
              AND PROBABLY{" "}
              <a href="#" className="underline underline-offset-2">THIS</a> TOO.
            </p>
          </div>

          {/* RIGHT — Accordion tabs */}
          <div
            className="w-full"
            style={{ borderTop: "1px solid #b5aea4" }}
          >
            {tabs.map((tab) => {
              const isOpen = hoveredTab === tab.id;
              return (
                <div
                  key={tab.id}
                  style={{ borderBottom: "1px solid #b5aea4" }}
                  onMouseEnter={() => setHoveredTab(tab.id)}
                  onMouseLeave={() => setHoveredTab(null)}
                >
                  {/* Tab header */}
                  <div
                    className="flex items-center justify-between py-4 cursor-default select-none"
                  >
                    <span
                      className="text-xs tracking-[0.2em] font-semibold text-white"
                    >
                      {tab.label}
                    </span>
                    <span
                      className="text-lg leading-none transition-transform duration-300 text-blue-300"
                      style={{
                        
                        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                        display: "inline-block",
                      }}
                    >
                      +
                    </span>
                  </div>

                  {/* Expandable content */}
                  <div
                    className="overflow-hidden transition-all duration-300 ease-in-out"
                    style={{
                      maxHeight: isOpen ? "300px" : "0px",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div
                      className="pb-5 text-xs leading-relaxed tracking-wide pr-4 text-blue-300"
                      
                    >
                      {tab.content}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </main>
    </div>
  );
}
