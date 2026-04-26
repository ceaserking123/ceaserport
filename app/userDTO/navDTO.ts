import { DoorOpen, Ellipsis } from "lucide-react";
import React from "react";

interface LinkDto {
    value: string;
    href: string;
    id?: number
    icon?: React.ComponentType<any>;
}
export const navigation : LinkDto[] = [
    { value: "Home", href: "/"},
    { value: "Portfolio", href: "/portfolio", icon: Ellipsis },
    { value: "About", href: "/about", icon: DoorOpen},
    { value: "Contact", href: "/contact" },
];  

export const myInfo : LinkDto[] = [
    { value: "professional graphics designer", id: 1 },
    { value: "prolific web developer", id: 2 },
    { value: "lover of art work", id: 3 },
    { value: "tech enthusiast", id: 4 },
]

export const texts : string[] = [
    "CEASER EGHWRUDJAKPOR",
    "CEASER EGHWRUDJAKPOR",
    "CEASER EGHWRUDJAKPOR",
    
  ];