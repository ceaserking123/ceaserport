"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface NavButtonProps {
  onClick?: () => void;
  value: string;
  href: string
}

export default function NavButton({ onClick, value, href }: NavButtonProps) {
  const currentPath = usePathname();
  const [active, setActive] = useState(false);

  // Default onClick if none provided
  const handleClick = onClick ?? (() => {
    console.log("Button clicked");
  });


  // ✅ Check active state when pathname changes
  useEffect(() => {
    // Normalize both path and value
    const normalizedValue = value.toLowerCase();
    const isActive =
      currentPath === "/" && normalizedValue === "home"
        ? true
        : currentPath === `/${normalizedValue}`;

    setActive(isActive);
  }, [currentPath, value]);

  return (
    <Link
      onClick={(e) => {
       console.log(href)
       
        handleClick();
      }}
      href={`/${href}`} // Ensure href is lowercase
      className={`px-4 py-2 rounded transition text-sm ${
        active ? "text-orange-700" : "text-black hover:bg-orange-100"
      }`}
    >
      {active ? (
        <>
          <span className="mr-2 text-orange-700">•</span>
          {value}
        </>
      ) : (
        value
      )}
    </Link>
  );
}
