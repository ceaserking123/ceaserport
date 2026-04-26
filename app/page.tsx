"use client";
import Image from "next/image";
import Navbar from "./components/Navbar";
import Hero from "./components/hero";
import Content from "./components/Content";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { useInView } from "./components/useInView";

export default function Home() {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(contentRef);
  return (
    <div className="font-romantic ">
     <Navbar />
     <Hero />
     <Content />
    </div>
  )}