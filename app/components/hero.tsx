"use client"

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react"
import { texts } from "../userDTO/navDTO";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin( SplitText);
export default function Hero() {
    const nameref = useRef<HTMLDivElement | null>(null);
    const porttext = useRef<HTMLHeadingElement | null>(null);
    const welcometext = useRef<HTMLParagraphElement | null>(null);

    useGSAP(() => {
        const el = nameref.current;

        // --- SplitText + char intro ---
        let splitport: any;
        try {
            if (porttext.current) {
                splitport = SplitText.create(porttext.current, { type: "chars" });
                gsap.from(splitport.chars, {
                    y: 50,
                    autoAlpha: 0,
                    stagger: 0.05,
                    ease: "back.out(1.7)",
                    duration: 1,
                });
                gsap.set(splitport.chars, { clearProps: "transform,opacity" });
            }
        } catch (e) {
            // fail silently if SplitText isn't available
            splitport = null;
        }

        // find all "o" chars (case-insensitive)
        const targetChars: HTMLElement[] = (splitport?.chars ?? []).filter((char: HTMLElement) =>
            String(char.textContent).toLowerCase() === "o"
        );

        // optional per-target initial animation (keeps them independent)
        targetChars.forEach((char) => {
            gsap.to(char, {
                scale: 1.2,
                color: "#f97316",
                duration: 0.5,
                ease: "power2.out",
                delay: 0.5
            });
            // subtle continuous rotate per char (each has its own tween)
            gsap.to(char, {
                rotate: 360,
                duration: 10,
                repeat: -1,
                ease: "circ.inOut"
            });
        });

        if (!el) return;

        // measure half of the scrollWidth (we duplicate content so half is one full set)
        const width = el.scrollWidth / 4; // duplicated once in JSX, so divide by 4 for slower smooth scroll
        if (!width) return;

        const tl = gsap.timeline({ repeat: -1 });
        tl.to(el, {
            x: `-=${width}`,
            duration: 40,
            ease: "none",
            modifiers: {
                x: gsap.utils.unitize((x) => parseFloat(x) % width)
            }
        });

        // --- per-char mouse handlers (mouseenter + mouseleave) ---
        const listeners: { el: HTMLElement; enter: EventListener; leave: EventListener }[] = [];

        targetChars.forEach((char) => {
            char.style.cursor = "pointer";

            const onEnter = () => {
                // animate only this char
                gsap.to(char, {
                    scale: 2,
                    color: "#22c55e",
                    duration: 0.25,
                    ease: "power2.out",
                });
            };
            const onLeave = () => {
                // revert only this char
                gsap.to(char, {
                    scale: 1.2,
                    color: "#f97316",
                    duration: 0.25,
                    ease: "power2.out",
                });
            };

            char.addEventListener("mouseenter", onEnter);
            char.addEventListener("mouseleave", onLeave);

            listeners.push({ el: char, enter: onEnter, leave: onLeave });
        });
        const welcomeChar = SplitText.create(welcometext.current, { type: "chars" });

            gsap.from(welcomeChar.chars, {
                y: 20,
                autoAlpha: 0,
                stagger: 0.05,
                ease: "power3.out",
                duration: 0.6,
            });

        return () => {
            // cleanup
            tl.kill();
            // remove per-char listeners and kill their tweens
            listeners.forEach(({ el, enter, leave }) => {
                el.removeEventListener("mouseenter", enter);
                el.removeEventListener("mouseleave", leave);
                gsap.killTweensOf(el);
            });
            // kill any SplitText generated tweens (if needed)
            if (splitport?.chars) {
                splitport.chars.forEach((c: HTMLElement) => gsap.killTweensOf(c));
                try { splitport.revert(); } catch (e) { /* ignore */ }
            }
        };
    });

    return(
        <section className="hero">
            <div className="overflow-hidden flex flex-col items-center justify-center h-full text-center gap-6">
                {/* duplicate texts array for seamless scrolling */}
                <div ref={nameref} className="flex whitespace-nowrap  marquee overflow-hidden">
                    {[...texts, ...texts].map((text, i) => (
                        <span key={i} className="text-9xl flex">
                            {text}
                        </span>
                    ))}
                </div>
                <div className=" w-full h-28 flex flex-col items-center justify-center ">
                    <p className="mb-2" ref= {welcometext}>welcome to my</p>
                    <h2 ref= {porttext} className="text-6xl">Portfolio</h2>
                </div>

            </div>
        </section>
    )
}