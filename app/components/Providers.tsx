"use client";

import { useState } from "react";
import LoadingScreen from './LoadingScreen';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.7s ease 0.1s",
          pointerEvents: loaded ? "auto" : "none",
        }}
      >
        {children}
      </div>
    </>
  );
}
