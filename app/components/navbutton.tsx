"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface NavButtonProps {
  onClick?: () => void;
  value: string;
}

export default function NavButton({ onClick, value }: NavButtonProps) {
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
    <button
      onClick={handleClick}
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
    </button>
  );
}
