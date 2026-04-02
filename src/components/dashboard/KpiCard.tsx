"use client";

import { useRef } from "react";

import { motion, useReducedMotion, useInView, type Variants } from "framer-motion";
import { TrendingUp, Users, DollarSign, Activity } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

import { Badge } from "@/components/ui/Badge";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import type { KpiData } from "@/types";

const ICONS = { TrendingUp, Users, DollarSign, Activity };

const COLOR_VARS = [
  "var(--color-series-1)",
  "var(--color-series-2)",
  "var(--color-series-3)",
  "var(--color-series-4)",
];

function formatCounterValue(raw: number, kpi: KpiData): string {
  if (kpi.id === "arpu")   return `$${raw.toFixed(2)}`;
  if (kpi.id === "churn")  return `${raw.toFixed(1)}%`;
  if (kpi.id === "mrr")    return `$${Math.round(raw).toLocaleString("en-US")}`;
  return Math.round(raw).toLocaleString("en-US");
}

const cardVariants: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

interface KpiCardProps {
  data: KpiData;
}

export function KpiCard({ data }: KpiCardProps) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const counter = useAnimatedCounter(
    data.value,
    1200,
    !prefersReduced && inView
  );

  const Icon = ICONS[data.icon];
  const seriesColor = COLOR_VARS[data.colorIndex] ?? "var(--color-accent)";
  const displayValue = prefersReduced ? data.formatted : formatCounterValue(counter, data);

  const ariaLabel = `${data.label}: ${data.formatted} — ${data.delta > 0 ? "up" : "down"} ${Math.abs(data.delta)}${data.deltaLabel.includes("pp") ? " percentage points" : "%"} ${data.deltaLabel}`;

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      aria-label={ariaLabel}
      className="card-hover"
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "12px",
        padding: "1.25rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        cursor: "default",
      }}
    >
      {/* Header row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <span style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)", fontWeight: 500 }}>
          {data.label}
        </span>
        <span
          aria-hidden="true"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            backgroundColor: "var(--color-surface-raised)",
            color: seriesColor,
            flexShrink: 0,
          }}
        >
          <Icon size={16} aria-hidden="true" />
        </span>
      </div>

      {/* Value */}
      <div
        style={{
          fontSize: "1.75rem",
          fontWeight: 700,
          color: "var(--color-text-strong)",
          fontFamily: "var(--font-mono)",
          letterSpacing: "-0.03em",
          lineHeight: 1,
        }}
        aria-hidden="true"
      >
        {displayValue}
      </div>

      {/* Footer row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem" }}>
        <Badge
          delta={data.delta}
          positiveIsGood={data.deltaPositive}
          label={data.deltaLabel}
        />
        {/* Decorative sparkline */}
        <div aria-hidden="true" style={{ width: 80, height: 32 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.sparkline}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={seriesColor}
                strokeWidth={1.5}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}
