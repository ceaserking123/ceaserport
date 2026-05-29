import React from "react"
import PortfolioGrid, { PortfolioItem } from './PortfolioGrid';
export default function Casestudy () {
    const projects: PortfolioItem[] = [
        { src: "/art1j.jpg",   alt: "ceaserphoto",  label: "A001", sublabel: "Artwork" },
        { src: "/art2.webp",alt: "Fit Guide",    label: "A002", sublabel: "Fit Guide" },
        { src: "/art3.png", alt: "Karrara",      label: "A003", sublabel: "Karrara" },
        { src: "/artboard 2.webp", alt: "Sandisk",      label: "A004", sublabel: "Sandisk" },
        // next group of 4...
        { src: "/artboard 16.webp",  alt: "Samsøe",       label: "A005", sublabel: "Chris farmhouse" },
        { src: "/artboard 17.webp",   alt: "ceaserphoto",  label: "A001", sublabel: "Nudie Jeans" },
        { src: "/artboard 19.webp",alt: "Fit Guide",    label: "A002", sublabel: "Fit Guide" },
        { src: "/artboard 20.webp", alt: "Karrara",      label: "A003", sublabel: "Karrara" },
        //next group of 4...
        { src: "/artboard 12.webp", alt: "Sandisk",      label: "A010", sublabel: "Poster designs" },
        { src: "/artboard 18.webp",  alt: "Samsøe",       label: "A005", sublabel: "Samsøe Samsøe" },
        { src: "/artboard 23.webp",   alt: "ceaserphoto",  label: "A001", sublabel: "Nudie Jeans" },
        { src: "/artboard 24.webp",alt: "Fit Guide",    label: "A002", sublabel: "Fit Guide" },
        //next group of 4...
        { src: "/artboard 11.webp", alt: "Karrara",      label: "A013", sublabel: "photo splash" },
        { src: "/artboard 13.webp", alt: "Sandisk",      label: "A004", sublabel: "Sandisk" }, 
        { src: "/artboard 14.webp",  alt: "Samsøe",       label: "A005", sublabel: "Samsøe Samsøe" },
        { src: "/artboard 39.webp",   alt: "ceaserphoto",  label: "A001", sublabel: "Nudie Jeans" },
        //next group of 4...
        { src: "/artboard 26.webp",alt: "Fit Guide",    label: "A022", sublabel: "currator" },
        { src: "/artboard 25.webp", alt: "Karrara",      label: "A003", sublabel: "Karrara" },
        
       
      ];
    return (
        <div className=" w-full  ">
            



<PortfolioGrid items={projects} groupSize={4} />
            
        </div>
    )
}