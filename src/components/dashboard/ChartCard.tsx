"use client";

import { useRef, type ReactNode } from "react";

import { motion, useReducedMotion, useInView, type Variants } from "framer-motion";

const cardVariants: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

interface LegendItem {
  label: string;
  color: string;
}

interface ChartCardProps {
  id: string;
  title: string;
  subtitle?: string;
  summary: string; // screen-reader description of the chart finding
  legend?: LegendItem[];
  children: ReactNode;
}

export function ChartCard({
  id,
  title,
  subtitle,
  summary,
  legend,
  children,
}: ChartCardProps) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.article
      ref={ref}
      variants={prefersReduced ? undefined : cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      aria-labelledby={id}
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "12px",
        padding: "1.25rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        <h2
          id={id}
          style={{
            fontSize: "0.9375rem",
            fontWeight: 600,
            color: "var(--color-text-strong)",
            margin: 0,
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)", margin: 0 }}>
            {subtitle}
          </p>
        )}
      </div>

      {/* Screen-reader chart summary */}
      <p id={`${id}-summary`} className="sr-only">
        {summary}
      </p>

      {/* Optional legend */}
      {legend && (
        <ul
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem",
            listStyle: "none",
            padding: 0,
            margin: 0,
          }}
          aria-label="Chart legend"
        >
          {legend.map((item) => (
            <li
              key={item.label}
              style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.75rem", color: "var(--color-text-muted)" }}
            >
              <span
                aria-hidden="true"
                style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: item.color, flexShrink: 0 }}
              />
              {item.label}
            </li>
          ))}
        </ul>
      )}

      {/* Chart slot */}
      <div className="chart-area" style={{ flex: 1 }} aria-describedby={`${id}-summary`}>
        {children}
      </div>
    </motion.article>
  );
}
