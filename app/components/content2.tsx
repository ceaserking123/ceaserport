import React from "react"
import PortfolioGrid, { PortfolioItem } from './PortfolioGrid';
export default function Casestudy () {
    const projects: PortfolioItem[] = [
        { src: "/artwork.png",   alt: "ceaserphoto",  label: "A001", sublabel: "Nudie Jeans" },
        { src: "/herobgimg1.png",alt: "Fit Guide",    label: "A002", sublabel: "Fit Guide" },
        { src: "/musicimg.png", alt: "Karrara",      label: "A003", sublabel: "Karrara" },
        { src: "/destoptopplayer.png", alt: "Sandisk",      label: "A004", sublabel: "Sandisk" },
        // next group of 4...
        { src: "/firstbg.png",  alt: "Samsøe",       label: "A005", sublabel: "Samsøe Samsøe" },
        { src: "/artwork.png",   alt: "ceaserphoto",  label: "A001", sublabel: "Nudie Jeans" },
        { src: "/herobgimg1.png",alt: "Fit Guide",    label: "A002", sublabel: "Fit Guide" },
        { src: "/musicimg.png", alt: "Karrara",      label: "A003", sublabel: "Karrara" },
        { src: "/destoptopplayer.png", alt: "Sandisk",      label: "A004", sublabel: "Sandisk" },
        { src: "/firstbg.png",  alt: "Samsøe",       label: "A005", sublabel: "Samsøe Samsøe" },
        { src: "/artwork.png",   alt: "ceaserphoto",  label: "A001", sublabel: "Nudie Jeans" },
        { src: "/herobgimg1.png",alt: "Fit Guide",    label: "A002", sublabel: "Fit Guide" },
        { src: "/musicimg.png", alt: "Karrara",      label: "A003", sublabel: "Karrara" },
        { src: "/destoptopplayer.png", alt: "Sandisk",      label: "A004", sublabel: "Sandisk" }, { src: "/firstbg.png",  alt: "Samsøe",       label: "A005", sublabel: "Samsøe Samsøe" },
        { src: "/artwork.png",   alt: "ceaserphoto",  label: "A001", sublabel: "Nudie Jeans" },
        { src: "/herobgimg1.png",alt: "Fit Guide",    label: "A002", sublabel: "Fit Guide" },
        { src: "/musicimg.png", alt: "Karrara",      label: "A003", sublabel: "Karrara" },
        { src: "/destoptopplayer.png", alt: "Sandisk",      label: "A004", sublabel: "Sandisk" },
        // ...
      ];
    return (
        <div className=" w-full  ">
            



<PortfolioGrid items={projects} groupSize={4} />
            
        </div>
    )
}