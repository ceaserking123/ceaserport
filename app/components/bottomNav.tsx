"use client";

import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { navigation } from "../userDTO/navDTO";
import Image from "next/image";
import * as React from "react";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList
} from "@/components/ui/navigation-menu";
import { useRef, forwardRef } from "react";

gsap.registerPlugin(useGSAP);

const BottomNav = forwardRef<HTMLDivElement>((props, ref) => {
    const pathname = usePathname();

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    const audioRef = useRef<HTMLAudioElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const [playing, setPlaying] = React.useState(false);
    
    // Optimized GSAP Animation using useGSAP for auto-cleanup
    useGSAP(() => {
        if (!audioRef.current || !imgRef.current) return;
        
        if (playing) {
            audioRef.current.play().catch(() => {
                // Handle modern browser autoplay blocks gracefully
                setPlaying(false);
            });
            
            gsap.to(imgRef.current, {
                rotate: 360,
                repeat: -1,
                duration: 4,
                ease: "none",
            });
        } else {
            audioRef.current.pause();
            gsap.killTweensOf(imgRef.current);
            // Smoothly reset rotation back to 0 instead of snapping
            gsap.to(imgRef.current, { rotate: 0, duration: 0.3 });
        }
    }, [playing]);
    
    const playMusic = () => setPlaying(prev => !prev);

    return (
        /* 1. Replaced w-screen with left-0 right-0 to avoid horizontal layout breaking
          2. Added pointer-events-none so the invisible container doesn't block underlying page clicks
        */
        <div
            ref={ref}
            className="fixed bottom-0 left-0 right-0 py-4 flex justify-center items-center z-50 font-romantic pointer-events-none"
        >
            {/* Added pointer-events-auto here so the navbar elements are clickable again */}
            <div className="flex flex-row gap-4 bg-black/40 backdrop-blur-md rounded-full px-6 py-2 shadow-sm shadow-zinc-500/50 pointer-events-auto">
                <div className="w-10 h-10 rounded-full bg-black relative isolation-auto">
                    <audio loop ref={audioRef} src="/musicimg.mp3"></audio>
                    <Image
                        ref={imgRef}
                        onClick={playMusic}
                        src="/artboard 25.webp"
                        alt="Logo"
                        width={40} // Adjusted to match container size
                        height={40}
                        className="cursor-pointer rounded-full w-full h-full object-cover"
                    />
                </div>

                <NavigationMenu>
                    <NavigationMenuList>
                        {navigation.map((navItem) => (
                            <NavigationMenuItem key={navItem.href}>
                                <NavigationMenuLink
                                    href={navItem.href}
                                    className={`px-4 py-2 rounded transition text-sm text-white hover:bg-orange-100 hover:text-black ${isActive(navItem.href) ? "hidden" : ""}`}
                                >
                                    {navItem.value}
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>

            {/* Added pointer-events-auto to the status bar pill */}
            <div className="flex items-center absolute right-6 h-12 justify-between gap-3 bg-black/25 backdrop-blur-sm rounded-full overflow-hidden font-romantic pointer-events-auto">
                <div className="min-w-18 h-full flex items-center justify-center max-sm:hidden px-2">
                    <h1 className="text-sm text-white hover:text-white/70 font-medium flex">
                        {pathname === "/" ? "/home" : pathname}
                    </h1>
                </div>

                <div className="flex flex-row border-2 border-white rounded-full justify-center items-center px-2 max-lg:hidden mr-2 ">
                    <span className="mr-2 bg-white w-2 h-2 rounded-full"></span>
                    <h3 className="text-white text-[10px]">AVAILABLE FOR WORK</h3>
                </div>
            </div>
        </div>
    );
});

BottomNav.displayName = 'BottomNav';
export default BottomNav;