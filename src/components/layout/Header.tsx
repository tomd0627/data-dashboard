"use client";

import { BarChart2 } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { TimeRangeSelector } from "@/components/dashboard/TimeRangeSelector";
import type { TimeRange } from "@/types";

interface HeaderProps {
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
}

export function Header({ timeRange, onTimeRangeChange }: HeaderProps) {
  return (
    <header
      role="banner"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        backgroundColor: "var(--color-nav-bg)",
        borderBottom: "1px solid var(--color-border-subtle)",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 1.5rem",
          height: "60px",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        {/* Logo + title */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
          <BarChart2
            size={22}
            aria-hidden="true"
            style={{ color: "var(--color-accent)" }}
          />
          <span
            className="header-title"
            style={{
              fontWeight: 700,
              fontSize: "1rem",
              color: "var(--color-text-strong)",
              letterSpacing: "-0.02em",
            }}
          >
            Pulse Analytics
          </span>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Controls */}
        <TimeRangeSelector value={timeRange} onChange={onTimeRangeChange} />
        <ThemeToggle />
      </div>
    </header>
  );
}
