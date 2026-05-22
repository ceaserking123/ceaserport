"use client";    

import Image from 'next/image';
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import React, {useRef} from 'react';
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText';

export default function Introduction() {
    return (
        <div className="w-full h-screen min-h-9 flex  font-alrevo ml-2 bg-white">
            
            <div className=" w-1/4 h-full flex flex-col ">
            <div className='flex flex-row h-fit items-center mt-2 ml-2'>
                <Image src={"/pheonixdark.png"} alt="ceaser" width={100} height={100} className="w-10 h-10 mr-4" />
                <h1 className="text-4xl font-bold font-aroba">Pheonix</h1>
            </div>

            <div className='mr-5 flex justify-between flex-col h-full '>
                <h1 className='font-romantic from-stone-700 text-[14px]'>Project Overview</h1>
                <p className='font-thin text-[14px] text-right '>Phoenix is a modern e-commerce platform designed to deliver a clean, intuitive, and conversion-focused shopping experience.</p>
                
                <p className='font-thin text-[14px]'>The goal was to build a product that balances aesthetics, usability, and performance, while remaining scalable for future growth.</p>
            </div>
            
            </div>
            <div className=" relative flex min-h-screen w-full flex-col items-start justify-start overflow-hidden text-white">
            <div >
                <BackgroundRippleEffect rows={8} cols={27}  />
            </div>
           
                <div className="flex flex-row w-full h-20  px-5 justify-end pt-5">
                    <h1 className='font-romantic text-4xl pr-2'>Project</h1>
                    <span>01</span>
                </div>
                <div>
                    
                    
                </div>
            
            </div>
        </div>
    )
}