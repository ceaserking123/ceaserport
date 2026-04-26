'use client';

import Image from "next/image"
import Link from "next/link";
import { navigation, myInfo } from '../userDTO/navDTO';
import Logo from "./logo";
import NavButton from "./navbutton";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/CustomEase";
import { forwardRef } from "react";

import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { TextPlugin } from "gsap/TextPlugin";
import { useRef, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuGroup,
    DropdownMenuSeparator

} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Ellipsis, EllipsisVertical } from "lucide-react";
import { usePathname } from "next/navigation";

gsap.registerPlugin(ScrambleTextPlugin, TextPlugin, CustomEase, useGSAP);

export default function Navbar() {
  
    const navContent = useRef<HTMLDivElement | null>(null);
    const activePath = useRef<HTMLHeadingElement | null>(null);
    const [open, setOpen] = useState(false)
   

  const isActive = (href: string) => {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
};
    const textinfo = useRef<HTMLDivElement | null>(null);
    
    const pathname = usePathname();
    

    useGSAP(() => {
      
        gsap.set(navContent.current, { autoAlpha: 0, y: -20 });
        if (!textinfo.current) return;

        const elements = gsap.utils.toArray<HTMLElement>(
            textinfo.current.children
        );

        // Hide everything immediately (NO FLASH)
        gsap.set(elements, { autoAlpha: 0, y: 20 });
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

        elements.forEach((el) => {
            tl.to(el, {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              ease: "power3.out"
            })
            .to(el, {
              autoAlpha: 0,
              y: -20,
              duration: 0.6,
              delay: 1,
              ease: "power3.in"
            });
          });
        
          return () => tl.kill();

    },[]);
    useGSAP(() => {
      if(open && activePath.current) {
        gsap.fromTo(activePath.current,{
          x: 20,
          opacity: 0,
        }, {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out"
        })
      }
    }, [open]);
 const navEnter = (e: React.MouseEvent<HTMLDivElement>) => {
  gsap.to(e.currentTarget, {
    x: 10,
    duration: 0.2,
  });
};

const navLeave = (e: React.MouseEvent<HTMLDivElement>) => {
  gsap.to(e.currentTarget, {
    x: 0,
    duration: 0.2,
  });
};
   
    return (
        <main className="flex justify-between w-screen h-16 items-center">
            <div className=" w-1/3 visible max-sm:hidden flex items-center ml-4">
                <div className="w-7 h-7 bg-blue-700  flex justify-center items-center mr-5 relative ">
                    <span className="w-6 h-6 block  overflow-hidden relative justify-center items-center">
                        <span className="h-4 w-4 bg-orange-700 block mb-0.5"></span>
                        <span className="h-2 w-2 bg-orange-700 block mt-0.5"></span>

                    </span>
                </div>

                <div ref={textinfo}  className="relative h-5 overflow-hidd w-full">
                    {myInfo.map((info, idx) => (
                        <span key={info.id} className="absolute left-0 top-0 text-sm w-full">
                            {info.value}
                            {/* {idx !== myInfo.length - 1 ? ',' : ''} */}
                        </span>
                    ))}
                </div>
            </div>
            <div className="w-1/3 items-center flex justify-center flex-col">
                <Logo className="w-10 h-10 text-orange-700" />

                <p className="text-sm ">CEASER</p>
            </div>
            <div id="Navigation" className="w-1/3 items-center flex justify-center">
            
            
<DropdownMenu open={open} onOpenChange={setOpen}>
  <DropdownMenuTrigger asChild >
    <div className="group flex items-center justify-between cursor-pointer bg-black w-62.5 rounded-sm h-10 px-4 text-white">
      <h1>Menu</h1>

      <span>
        <EllipsisVertical className="block group-data-[state=open]:hidden" />
        <div className="hidden group-data-[state=open]:block" >
         <h1 ref={activePath}  className="text-orange-700">{pathname === "/" ? "Home" : pathname}</h1>
         </div>
      </span>
    </div>
  </DropdownMenuTrigger>

  <DropdownMenuContent className="bg-transparent border-0 shadow-none text-black w-62.5 rounded-sm p-2 overflow-visible font-romantic ">
    <DropdownMenuGroup>
      {navigation.map((link) => (
        <DropdownMenuItem
          key={link.href}
          asChild
          onMouseEnter={navEnter}
          onMouseLeave={navLeave}
          className={`px-4 py-2 rounded-sm transition-all flex items-center bg-transperent border-0 backdrop-blur-sm gap-[11] mb-1 ${
            isActive(link.href)
              ? "text-orange-700 bg-black/30 hidden"
              : "hover:bg-black/40"
          }`}
        >
          <Link href={link.href} className="flex items-center gap-2 w-full">
            
            {/* ✅ ICON SUPPORT */}
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
    )
}