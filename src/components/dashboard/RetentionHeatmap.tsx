"use client";

import { useReducedMotion } from "framer-motion";
import { useRef, useState, useCallback, type KeyboardEvent } from "react";
import { ChartCard } from "./ChartCard";
import type { RetentionCohort } from "@/types";

const WEEK_LABELS = ["Wk 1", "Wk 2", "Wk 3", "Wk 4", "Wk 5", "Wk 6", "Wk 7", "Wk 8"];

function getRetentionColor(pct: number): string {
  // Interpolate from --color-surface-raised (0%) → amber (100%)
  // We use opacity on a fixed amber fill for simplicity
  const clamped = Math.max(0, Math.min(100, pct));
  const opacity = 0.08 + (clamped / 100) * 0.85;
  return `rgba(245, 158, 11, ${opacity.toFixed(2)})`;
}

function getTextColor(pct: number): string {
  return pct > 55 ? "rgba(0,0,0,0.85)" : "var(--color-text-base)";
}

interface RetentionHeatmapProps {
  data: RetentionCohort[];
}

export function RetentionHeatmap({ data }: RetentionHeatmapProps) {
  const prefersReduced = useReducedMotion();
  const [focusedCell, setFocusedCell] = useState<[number, number]>([0, 0]);
  const cellRefs = useRef<(HTMLDivElement | null)[][]>(
    data.map(() => Array(8).fill(null))
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>, row: number, col: number) => {
      const numRows = data.length;
      const numCols = 8;
      let nextRow = row;
      let nextCol = col;

      switch (e.key) {
        case "ArrowRight":
          nextCol = Math.min(col + 1, numCols - 1);
          break;
        case "ArrowLeft":
          nextCol = Math.max(col - 1, 0);
          break;
        case "ArrowDown":
          nextRow = Math.min(row + 1, numRows - 1);
          break;
        case "ArrowUp":
          nextRow = Math.max(row - 1, 0);
          break;
        default:
          return;
      }

      e.preventDefault();
      setFocusedCell([nextRow, nextCol]);
      cellRefs.current[nextRow]?.[nextCol]?.focus();
    },
    [data.length]
  );

  return (
    <ChartCard
      id="retention-chart-title"
      title="Cohort Retention"
      subtitle="8-week retention by acquisition month"
      summary="Cohorts acquired from September 2024 onward show markedly higher Week 4–8 retention — a step-change improvement attributed to a product fix shipped before that cohort's first session."
    >
      <div
        role="grid"
        aria-label="Cohort retention matrix, 8 cohorts by 8 weeks"
        style={{ overflowX: "auto", paddingBottom: "0.25rem" }}
      >
        <div style={{ minWidth: "480px" }}>
          {/* Column headers */}
          <div
            role="row"
            style={{
              display: "grid",
              gridTemplateColumns: "80px repeat(8, 1fr)",
              gap: "3px",
              marginBottom: "3px",
            }}
          >
            <div role="columnheader" aria-label="Cohort">
              <span className="sr-only">Cohort</span>
            </div>
            {WEEK_LABELS.map((wk) => (
              <div
                key={wk}
                role="columnheader"
                style={{
                  fontSize: "0.6875rem",
                  color: "var(--color-text-muted)",
                  textAlign: "center",
                  padding: "0 0 0.25rem",
                  fontWeight: 500,
                }}
              >
                {wk}
              </div>
            ))}
          </div>

          {/* Data rows */}
          {data.map((cohort, rowIdx) => (
            <div
              key={cohort.label}
              role="row"
              aria-label={cohort.label}
              style={{
                display: "grid",
                gridTemplateColumns: "80px repeat(8, 1fr)",
                gap: "3px",
                marginBottom: "3px",
              }}
            >
              {/* Row header */}
              <div
                role="rowheader"
                style={{
                  fontSize: "0.6875rem",
                  color: "var(--color-text-muted)",
                  display: "flex",
                  alignItems: "center",
                  fontWeight: 500,
                  paddingRight: "0.5rem",
                }}
              >
                {cohort.label}
              </div>

              {/* Cells */}
              {cohort.weeks.map((pct, colIdx) => {
                const isFocused =
                  focusedCell[0] === rowIdx && focusedCell[1] === colIdx;
                const delay = prefersReduced
                  ? 0
                  : rowIdx * 0.04 + colIdx * 0.01;

                return (
                  <div
                    key={colIdx}
                    ref={(el) => {
                      if (cellRefs.current[rowIdx]) {
                        cellRefs.current[rowIdx][colIdx] = el;
                      }
                    }}
                    role="gridcell"
                    tabIndex={isFocused ? 0 : -1}
                    aria-label={`${cohort.label}, ${WEEK_LABELS[colIdx]}: ${pct}% retained`}
                    onKeyDown={(e) => handleKeyDown(e, rowIdx, colIdx)}
                    onFocus={() => setFocusedCell([rowIdx, colIdx])}
                    style={{
                      backgroundColor: getRetentionColor(pct),
                      borderRadius: "4px",
                      height: "32px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.6875rem",
                      fontWeight: 600,
                      color: getTextColor(pct),
                      cursor: "default",
                      opacity: 0,
                      animation: prefersReduced
                        ? "none"
                        : `fadeIn 0.3s ease ${delay}s forwards`,
                      outline: isFocused ? "2px solid var(--color-focus)" : "none",
                      outlineOffset: "1px",
                    }}
                  >
                    {pct}%
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </ChartCard>
  );
}
