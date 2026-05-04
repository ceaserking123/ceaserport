'use client';

import Image from "next/image";
import Link from "next/link";
import { navigation, myInfo } from '../userDTO/navDTO';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/CustomEase";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { TextPlugin } from "gsap/TextPlugin";
import { Observer, MorphSVGPlugin } from "gsap/all"; // ✅ MorphSVGPlugin added
import { useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { usePathname } from "next/navigation";
import { SplitText } from "gsap/all";

gsap.registerPlugin(
  ScrambleTextPlugin,
  TextPlugin,
  CustomEase,
  useGSAP,
  Observer,
  SplitText,
  MorphSVGPlugin // ✅ registered
);

export default function Navbar() {
  const activePath = useRef<HTMLHeadingElement | null>(null);
  const logosvg = useRef<SVGSVGElement | null>(null);
  const morphCircle = useRef<SVGPathElement | null>(null);
  const textinfo = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLHeadingElement | null>(null);

  const pathname = usePathname(); // ✅ declared before isActive

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  // ---- Main animation useGSAP ----
  useGSAP(() => {
    if(!menuRef.current) return;
    const menuSplit = SplitText.create(menuRef.current, { type: "chars", charsClass: "menu-char" });
    const menuTl = gsap.timeline({ paused: true });
    menuTl.to(menuSplit.chars, { y: -25, duration: 0.5, ease: "power3.out", stagger:0.05, color: "rgb(194 65 12)" });
    Observer.create({
      target: menuRef.current,
      type: "pointer",
      onHover: () => menuTl.play(),
      onHoverEnd: () => menuTl.reverse(),
    })
    // Logo morph
    if (!logosvg.current || !morphCircle.current) return;

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
      onHover: () => morphTl.play(),
      onHoverEnd: () => morphTl.reverse(),
    });

    // Rotating text info
    if (!textinfo.current) return;

    const elements = gsap.utils.toArray<HTMLElement>(textinfo.current.children);

    gsap.set(elements, { autoAlpha: 0, y: 20 });

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

    elements.forEach((el) => {
      tl.to(el, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      }).to(el, {
        autoAlpha: 0,
        y: -20,
        duration: 0.6,
        delay: 1,
        ease: "power3.in",
      });
    });

    return () => tl.kill();
  }, []);

  // ---- Dropdown open animation ----
  useGSAP(() => {
    if (open && activePath.current) {
      gsap.fromTo(
        activePath.current,
        { x: 20, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );
    }
  }, [open]);

  const navEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { x: 10, duration: 0.2 });
  };

  const navLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { x: 0, duration: 0.2 });
  };

  return (
    <main className="flex justify-between w-screen h-16 items-center">

      {/* ---- Left: info ticker ---- */}
      <div className="w-1/3 visible max-sm:hidden flex items-center ml-4">
        <div className="w-7 h-7 bg-blue-700 flex justify-center items-center mr-5 relative">
          <span className="w-6 h-6 block overflow-hidden relative justify-center items-center">
            <span className="h-4 w-4 bg-orange-700 block mb-0.5"></span>
            <span className="h-2 w-2 bg-orange-700 block mt-0.5"></span>
          </span>
        </div>

        <div ref={textinfo} className="relative h-5 overflow-hidden w-full"> {/* ✅ typo fixed */}
          {myInfo.map((info) => (
            <span key={info.id} className="absolute left-0 top-0 text-sm w-full">
              {info.value}
            </span>
          ))}
        </div>
      </div>

      {/* ---- Center: Logo ---- */}
      <div className="w-1/3 items-center flex justify-center flex-col">

        {/* ✅ Logo SVG — clean style, no conflicting fill */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          className="w-10 h-10 cursor-pointer"
          ref={logosvg}
          style={{ fill: "rgb(194 65 12)" }} // orange-700 as inline so MorphSVG can read it
        >
          <path d="M61.8,50H7.5v43.1h43.1c-8.76,0-15.86-19.3-15.86-43.1ZM25.3,73.4c-3.15,0-5.71-2.56-5.71-5.71s2.56-5.71,5.71-5.71,5.71,2.56,5.71,5.71-2.56,5.71-5.71,5.71Z M41.8,24.1c0-2.79,2.26-5.06,5.06-5.06V6.44H7.5v43.1h43.1V33.1c-2.79,0-5.06-2.26-5.06-5.06Z M25.3,32.8c-3.15,0-5.71-2.56-5.71-5.71s2.56-5.71,5.71-5.71,5.71,2.56,5.71,5.71-2.56,5.71-5.71,5.71Z" />
        </svg>

        {/* ✅ Morph target — ref on <path>, hidden via dimensions not display:none */}
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

        <p className="text-sm">CEASER</p>
      </div>

      {/* ---- Right: Nav dropdown ---- */}
      <div id="Navigation" className="w-1/3 items-center flex justify-center">
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <div className="group flex items-center justify-between cursor-pointer bg-black w-62.5 rounded-sm h-10 px-4 text-white">
              <div className="block overflow-hidden h-5 ">
                <h1 ref={menuRef}>Menu <br/> Menu</h1>
                
              </div>
              <span>
                <EllipsisVertical className="block group-data-[state=open]:hidden" />
                <div className="hidden group-data-[state=open]:block">
                  <h1 ref={activePath} className="text-orange-700">
                    {pathname === "/" ? "Home" : pathname}
                  </h1>
                </div>
              </span>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="bg-transparent border-0 shadow-none text-black w-62.5 rounded-sm p-2 overflow-visible font-romantic">
            <DropdownMenuGroup>
              {navigation.map((link) => (
                <DropdownMenuItem
                  key={link.href}
                  asChild
                  onMouseEnter={navEnter}
                  onMouseLeave={navLeave}
                  className={`px-4 py-2 rounded-sm transition-all flex items-center border-0 backdrop-blur-sm gap-2 mb-1 ${
                    isActive(link.href)
                      ? "text-orange-700 bg-black/30 hidden"
                      : "hover:bg-black/40"
                  }`}
                >
                  <Link href={link.href} className="flex items-center gap-2 w-full">
                    {link.icon && <link.icon size={16} />}
                    {link.value}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

    </main>
  );
}