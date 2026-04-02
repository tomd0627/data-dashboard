"use client";

import type { TimeRange } from "@/types";

const RANGES: { value: TimeRange; label: string }[] = [
  { value: "7d",  label: "7D"  },
  { value: "30d", label: "30D" },
  { value: "90d", label: "90D" },
  { value: "1y",  label: "1Y"  },
];

interface TimeRangeSelectorProps {
  value: TimeRange;
  onChange: (range: TimeRange) => void;
}

export function TimeRangeSelector({ value, onChange }: TimeRangeSelectorProps) {
  return (
    <div
      role="group"
      aria-label="Filter dashboard by time range"
      style={{ display: "flex", gap: "0.25rem" }}
    >
      {RANGES.map((range) => {
        const isActive = value === range.value;
        return (
          <button
            key={range.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(range.value)}
            style={{
              padding: "0.3rem 0.625rem",
              borderRadius: "6px",
              border: isActive ? "1px solid var(--color-accent)" : "1px solid transparent",
              background: isActive ? "var(--color-accent-subtle)" : "transparent",
              color: isActive ? "var(--color-accent)" : "var(--color-text-muted)",
              fontSize: "0.75rem",
              fontWeight: isActive ? 600 : 400,
              cursor: "pointer",
              transition: "all 0.15s ease",
              fontFamily: "inherit",
            }}
          >
            {range.label}
          </button>
        );
      })}
    </div>
  );
}
