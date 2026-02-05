'use client';

import Image from "next/image"
import Link from "next/link";
import { navigation, myInfo } from '../userDTO/navDTO';
import Logo from "./logo";
import NavButton from "./navbutton";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/CustomEase";

import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { TextPlugin } from "gsap/TextPlugin";
import { useRef } from "react";

gsap.registerPlugin(ScrambleTextPlugin, TextPlugin, CustomEase);

export default function Navbar() {
    const textinfo = useRef<HTMLDivElement | null>(null);

    useGSAP(() => {
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

    });

    return (
        <main className="flex justify-between w-full h-16 items-center">
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
                <ul>
                    {
                        navigation.map((link, index) => (
                            <Link href={link.value.toLowerCase() === 'home' ? `/` : ` ${link.value.toLowerCase()}`} key={index + 1}>
                                <NavButton value={link.value}  />
                            </Link>
                        ))
                    }
                </ul>
            </div>
        </main>
    )
}