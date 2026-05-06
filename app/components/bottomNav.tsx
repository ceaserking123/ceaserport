"use client";
import NavButton from "./navbutton";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { navigation } from "../userDTO/navDTO";
import Image from "next/image";
import * as React from "react";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList
} from "@/components/ui/navigation-menu";
import { useRef } from "react";
import { Observer } from 'gsap/all';
import { forwardRef } from "react";


gsap.registerPlugin(useGSAP);
export default function BottomNav({props, ref}: {props?: any, ref: React.Ref<HTMLDivElement>}) {
    const pathname = usePathname();
    const secondNavRef = useRef<HTMLDivElement>(null);

    const isActive = (href: string) => {
      if (href === "/") return pathname === "/";
      return pathname.startsWith(href);
    };
      
        
        
    const audioRef = useRef<HTMLAudioElement>(null);
    const imgRef = useRef<HTMLImageElement>(null)
    const [playing, setPlaying] = React.useState(false);
   
    React.useEffect(() => {
        if (!audioRef.current || !imgRef.current) return;
    
        if (playing) {
            audioRef.current.play();
            gsap.to(imgRef.current, {
                rotate: 360,
                repeat: -1,
                duration: 4,
                ease: "none",
                // paused: true
            });
        } else {
            audioRef.current.pause();
            gsap.killTweensOf(imgRef.current);
            //gsap.set(imgRef.current, { rotate: 0 });
        }
    }, [playing]);
    
    const playMusic = () => {
        setPlaying(prev => !prev);
    };

    useGSAP(() => {});
   
    return (
        <div className="fixed bottom-0 left-0 right-0  w-full   py-4 flex justify-center items-center z-50 font-romantic" ref={ref} style={{
            position: 'fixed',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
            opacity: 0,  // hidden by default, GSAP controls it
          }}>
            <div className="flex flex-row gap-4 bg-black/25 backdrop-blur-sm rounded-full px-6 py-2 shadow-sm shadow-zinc-500/50">
            <div className=" w-10 h-10 rounded-full bg-black relative">
                <audio loop ref={audioRef} src="/musicimg.mp3"></audio>
                <Image ref={imgRef} onClick={playMusic} src="/musicimg.png" alt="Logo" width={24} height={24} className="mr-2 cursor-pointer rounded-full w-full h-full bject-cover " />
            </div>
                { <NavigationMenu>
                    <NavigationMenuList>
                        {navigation.map((navItem) => (
                            <NavigationMenuItem key={navItem.href}>
                                <NavigationMenuLink href={navItem.href} className={`px-4 py-2 rounded transition text-sm text-white hover:bg-orange-100 ${isActive(navItem.href) ? "hidden" : ""}`}>

                                    {navItem.value}
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>

                </NavigationMenu>
                   
                }
                
            </div>
            <div className="flex  items-center absolute right-6  h-10 justify-between  gap-3 bg-black/25 backdrop-blur-sm rounded-full overflow-hidden font-serif">
            <div className="min-w-18 h-full   flex items-center justify-center max-sm:hidden px-2">
                <h1 className="text-sm text-black/50 hover:text-black font-medium flex  " >{pathname === "/" ? "/home" : pathname}</h1>
                </div>
                <div className="flex flex-row border-2 border-green-800 rounded-full justify-center items-center px-2 max-lg:hidden mr-2">
                    <span className="mr-2 bg-green-800 w-2 h-2 rounded-full backdrop-blur-sm"></span>
                    <h3 className="text-green-800 text-[10px]">AVAILABLE FOR WORK</h3>
                </div>
                
                
            </div>
            <div>
    
            </div>
        </div>
    );
}