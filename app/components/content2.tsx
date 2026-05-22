import React from "react"
import PortfolioGrid, { PortfolioItem } from './PortfolioGrid';
export default function Casestudy () {
    const projects: PortfolioItem[] = [
        { src: "/art1.png",   alt: "ceaserphoto",  label: "A001", sublabel: "Artwork" },
        { src: "/art2.png",alt: "Fit Guide",    label: "A002", sublabel: "Fit Guide" },
        { src: "/art3.png", alt: "Karrara",      label: "A003", sublabel: "Karrara" },
        { src: "/artwork4.png", alt: "Sandisk",      label: "A004", sublabel: "Sandisk" },
        // next group of 4...
        { src: "/chrislogo.jpg",  alt: "Samsøe",       label: "A005", sublabel: "Chris farmhouse" },
        { src: "/chriscolor.jpg",   alt: "ceaserphoto",  label: "A001", sublabel: "Nudie Jeans" },
        { src: "/chrisfarmcom6.jpg",alt: "Fit Guide",    label: "A002", sublabel: "Fit Guide" },
        { src: "/chrisfarmcom7.jpg", alt: "Karrara",      label: "A003", sublabel: "Karrara" },
        //next group of 4...
        { src: "/poster1.jpg", alt: "Sandisk",      label: "A010", sublabel: "Poster designs" },
        { src: "/poster2.png",  alt: "Samsøe",       label: "A005", sublabel: "Samsøe Samsøe" },
        { src: "/poster3.jpg",   alt: "ceaserphoto",  label: "A001", sublabel: "Nudie Jeans" },
        { src: "/poster4.jpg",alt: "Fit Guide",    label: "A002", sublabel: "Fit Guide" },
        //next group of 4...
        { src: "/photo.png", alt: "Karrara",      label: "A013", sublabel: "photo splash" },
        { src: "/photo1.png", alt: "Sandisk",      label: "A004", sublabel: "Sandisk" }, 
        { src: "/photo2.png",  alt: "Samsøe",       label: "A005", sublabel: "Samsøe Samsøe" },
        { src: "/photo4.jpg",   alt: "ceaserphoto",  label: "A001", sublabel: "Nudie Jeans" },
        //next group of 4...
        { src: "/seeds badge.jpg",alt: "Fit Guide",    label: "A022", sublabel: "currator" },
        { src: "/musicimg.png", alt: "Karrara",      label: "A003", sublabel: "Karrara" },
        { src: "/tajacompo.png", alt: "Sandisk",      label: "A004", sublabel: "Sandisk" },
       
      ];
    return (
        <div className=" w-full  ">
            



<PortfolioGrid items={projects} groupSize={4} />
            
        </div>
    )
}