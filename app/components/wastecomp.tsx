"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Introduction from "./content1";
import Casestudy from "./content2";
import Lenis from 'lenis'

const lenis = new Lenis({
  autoRaf: true,
  allowNestedScroll: true
});

gsap.registerPlugin(useGSAP, ScrollTrigger);


export default function Content() {
    const wrapper = useRef<HTMLDivElement>(null);
    const content = useRef<HTMLDivElement>(null);
    const imageContainer = useRef<HTMLDivElement>(null);
    const imgbg = useRef<HTMLImageElement>(null);


      lenis.on('scroll', (e) => {
        console.log(e);
      });
      useGSAP(() => {
       const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper.current,
            start: "top top",
            end: "+=150%",
            scrub: true,
            pin: true,
            markers: true,
          },
        })
        tl.to(imgbg.current, {
          scale: 2,
          z: 350,
          transformOrigin: "center center",
          ease: "power2.inOut",
        }).to(content.current, {
          scale: 1.1,
          transformOrigin: "center center",
          ease: "power2.inOut",
        }, "<" // start at the same time as the previous animation
        )
      })


  return (
    <div className="flex flex-col w-full relative z-1" ref={wrapper}>
      <div className="overflow-hidden" ref={content} >
      <Introduction />
      <Casestudy />
      </div>
      <div className=" bg-center bg-cover bg-no-repeat" ref={imageContainer}>
        <Image ref={imgbg} alt="bgimg" width={10000} height={10000} src={"/destopbottomlayer.png"} className="w-full bg-cover h-full bg-center"></Image>
      </div>
    </div>
  );
}