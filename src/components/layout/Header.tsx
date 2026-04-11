"use client";

import { BarChart2 } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { TimeRangeSelector } from "@/components/dashboard/TimeRangeSelector";
import { DataSourceToggle, type DataSource } from "@/components/layout/DataSourceToggle";
import type { TimeRange } from "@/types";

interface HeaderProps {
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
  dataSource: DataSource;
  onDataSourceChange: (source: DataSource) => void;
}

export function Header({ timeRange, onTimeRangeChange, dataSource, onDataSourceChange }: HeaderProps) {
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
          padding: "0.5rem 1.5rem",
          minHeight: "60px",
          display: "flex",
          flexWrap: "wrap",
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

        {/* Spacer — collapses on mobile so controls wrap to their own row */}
        <div style={{ flex: 1 }} />

        {/* Controls group — wraps to full-width row on narrow viewports */}
        <div className="header-controls" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <DataSourceToggle value={dataSource} onChange={onDataSourceChange} />
          <div
            aria-hidden="true"
            className="header-separator"
            style={{ width: "1px", height: "20px", background: "var(--color-border-subtle)", flexShrink: 0 }}
          />
          <TimeRangeSelector value={timeRange} onChange={onTimeRangeChange} />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
