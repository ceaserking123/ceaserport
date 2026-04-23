"use client";
import React, { useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const BackgroundRippleEffect = ({
  rows = 8,
  cols = 27,
}: {
  rows?: number;
  cols?: number;
}) => {
  const [clickedCell, setClickedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);

  const [rippleKey, setRippleKey] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={ref}
      className={cn(
        "absolute inset-0 h-full w-full overflow-hidden",
        "[--cell-fill-color:var(--color-black)] [--cell-shadow-color:var(--color-neutral-800)]",
      )}
    >
      <DivGrid
        key={`ripple-${rippleKey}`}
        rows={rows}
        cols={cols}
        clickedCell={clickedCell}
        onCellClick={(row, col) => {
          setClickedCell({ row, col });
          setRippleKey((k) => k + 1);
        }}
        interactive
      />
    </div>
  );
};

type DivGridProps = {
  rows: number;
  cols: number;
  clickedCell: { row: number; col: number } | null;
  onCellClick?: (row: number, col: number) => void;
  interactive?: boolean;
};

type CellStyle = React.CSSProperties & {
  ["--delay"]?: string;
  ["--duration"]?: string;
};

const DivGrid = ({
  rows,
  cols,
  clickedCell = null,
  onCellClick = () => {},
  interactive = true,
}: DivGridProps) => {
  const cells = useMemo(
    () => Array.from({ length: rows * cols }, (_, i) => i),
    [rows, cols],
  );

  return (
    <div
      className="absolute inset-0 grid -z-10"
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
      }}
    >
      {cells.map((idx) => {
        const rowIdx = Math.floor(idx / cols);
        const colIdx = idx % cols;

        const distance = clickedCell
          ? Math.hypot(clickedCell.row - rowIdx, clickedCell.col - colIdx)
          : 0;

        const delay = clickedCell ? Math.max(0, distance * 55) : 0;
        const duration = 200 + distance * 80;

        const style: CellStyle = clickedCell
          ? {
              "--delay": `${delay}ms`,
              "--duration": `${duration}ms`,
            }
          : {};

        return (
          <div
            key={idx}
            className={cn(
              // square cells enforced
              "relative aspect-square",
              // subtle gridline
              "border border-gray-700/10",
              // fill + interaction
              "bg-[var(--cell-fill-color)] transition-colors duration-150 will-change-transform",
              "hover:bg-neutral-800",
              "dark:shadow-[0px_0px_40px_1px_var(--cell-shadow-color)_inset]",
              clickedCell && "animate-cell-ripple [animation-fill-mode:none]",
              !interactive && "pointer-events-none",
            )}
            style={style}
            onClick={
              interactive ? () => onCellClick?.(rowIdx, colIdx) : undefined
            }
          />
        );
      })}
    </div>
  );
};
