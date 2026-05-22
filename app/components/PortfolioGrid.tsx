"use client";

import { useState, useCallback } from "react";

export interface PortfolioItem {
  src: string;
  alt: string;
  label?: string;    // e.g. "A001"
  sublabel?: string; // e.g. "Nudie Jeans"
}

export interface PortfolioGridProps {
  items: PortfolioItem[];
  /**
   * How many items per visual group (2–4).
   * Items in the same group all light up when any one is hovered.
   * Default: 4
   */
  groupSize?: 2 | 3 | 4;
}

// ─── constants ───────────────────────────────────────────────────────────────
const CELL_ASPECT = "8 / 4"; // wide landscape cells matching the reference
const GAP = 3;               // px gap between cells and rows
const DIM_FILTER   = "grayscale(100%) brightness(0.45)";
const COLOR_FILTER = "grayscale(0%) brightness(1)";
const TRANSITION   = "filter 0.45s cubic-bezier(0.4,0,0.2,1), transform 0.45s cubic-bezier(0.4,0,0.2,1)";

// ─── component ───────────────────────────────────────────────────────────────
export default function PortfolioGrid({
  items,
  groupSize = 4,
}: PortfolioGridProps) {
  // index of the hovered item (-1 = none)
  const [hoveredIdx, setHoveredIdx] = useState<number>(-1);

  const getGroupId = useCallback(
    (idx: number) => Math.floor(idx / groupSize),
    [groupSize]
  );

  const isLit = useCallback(
    (idx: number) =>
      hoveredIdx !== -1 && getGroupId(idx) === getGroupId(hoveredIdx),
    [hoveredIdx, getGroupId]
  );

  // build rows: each row = one group
  const rows: PortfolioItem[][] = [];
  for (let i = 0; i < items.length; i += groupSize) {
    rows.push(items.slice(i, i + groupSize));
  }

  return (
    <div
      style={{
        width: "100%",
        background: "#0e0e0e",
        padding: `${GAP}px`,
        boxSizing: "border-box",
        fontFamily: "'Courier New', monospace",
      }}
    >
      {rows.map((row, rowIdx) => {
        const baseIdx = rowIdx * groupSize;
        // first lit item in this row (for showing the label)
        const litItemInRow = row.find((_, i) => isLit(baseIdx + i));
        const labelItem = litItemInRow ?? null;
        const labelVisible = hoveredIdx !== -1 && getGroupId(hoveredIdx) === rowIdx;

        return (
          <div key={rowIdx} style={{ marginBottom: GAP }}>
            {/* Row of cells */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${row.length}, 1fr)`,
                gap: GAP,
              }}
            >
              {row.map((item, colIdx) => {
                const globalIdx = baseIdx + colIdx;
                const lit = isLit(globalIdx);

                return (
                  <div
                    key={globalIdx}
                    onMouseEnter={() => setHoveredIdx(globalIdx)}
                    onMouseLeave={() => setHoveredIdx(-1)}
                    style={{
                      position: "relative",
                      aspectRatio: CELL_ASPECT,
                      overflow: "hidden",
                      cursor: "pointer",
                      background: "#111",
                    }}
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        filter: lit ? COLOR_FILTER : DIM_FILTER,
                        transform: lit ? "scale(1.03)" : "scale(1)",
                        transition: TRANSITION,
                        willChange: "filter, transform",
                      }}
                    />

                    {/* Subtle vignette always present */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)",
                        pointerEvents: "none",
                        opacity: lit ? 0.4 : 0.8,
                        transition: "opacity 0.45s ease",
                      }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Label row — slides in below the group on hover */}
            <div
              style={{
                overflow: "hidden",
                maxHeight: labelVisible ? 40 : 0,
                opacity: labelVisible ? 1 : 0,
                transition: "max-height 0.35s ease, opacity 0.35s ease",
                paddingTop: labelVisible ? 8 : 0,
                paddingLeft: 2,
              }}
            >
              {labelItem && (
                <>
                  {labelItem.label && (
                    <div
                      style={{
                        fontSize: 11,
                        letterSpacing: "0.18em",
                        color: "#888",
                        textTransform: "uppercase",
                        lineHeight: 1.2,
                      }}
                    >
                      {labelItem.label}
                    </div>
                  )}
                  {labelItem.sublabel && (
                    <div
                      style={{
                        fontSize: 12,
                        letterSpacing: "0.06em",
                        color: "#ccc",
                        textTransform: "none",
                        lineHeight: 1.4,
                      }}
                    >
                      {labelItem.sublabel}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
