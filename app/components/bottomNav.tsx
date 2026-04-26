"use client";
import NavButton from "./navbutton";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { navigation } from "../userDTO/navDTO";
import Image from "next/image";
import * as React from "react";

gsap.registerPlugin(useGSAP);
export default function BottomNav() {
    const audioRef = React.useRef<HTMLAudioElement>(null);
    const [playing, setPlaying] = React.useState(false);
    const playMusic = () => {
       if(!audioRef.current) return;
       if(playing) {
            audioRef.current?.play();
       } else {
            audioRef.current?.pause();
       }        
    }

    useGSAP(() => {});
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-transparent w-full   py-4 flex justify-center items-center z-50">
            <div className="flex flex-row gap-4 bg-black/25 backdrop-blur-sm rounded-full px-6 py-2 shadow-lg shadow-teal-900">
            <div>
                <audio ref={audioRef} src="/musicimg.mp3"></audio>
                <Image onClick={playMusic} src="/musicimg.png" alt="Logo" width={24} height={24} className="mr-2 cursor-pointer" />
            </div>
                {
                    navigation.map((navItem) => (
                        <NavButton key={navItem.id} value={navItem.value} />
                    ))
                }
            </div>
            
        </div>
    );
}