import { formatCurrencyCompact, formatCompact } from "./utils";

export const SERIES_COLORS = [
  "var(--color-series-1)",
  "var(--color-series-2)",
  "var(--color-series-3)",
  "var(--color-series-4)",
  "var(--color-series-5)",
  "var(--color-series-6)",
  "var(--color-series-7)",
];

export function getSeriesColor(index: number): string {
  return SERIES_COLORS[index % SERIES_COLORS.length];
}

export function currencyTickFormatter(value: number): string {
  return formatCurrencyCompact(value);
}

export function compactTickFormatter(value: number): string {
  return formatCompact(value);
}

export function percentTickFormatter(value: number): string {
  return `${value}%`;
}

/** Common axis style props for Recharts */
export const axisStyle = {
  tick: { fill: "var(--color-text-muted)", fontSize: 12, fontFamily: "inherit" },
  axisLine: { stroke: "var(--color-border-subtle)" },
  tickLine: { stroke: "transparent" },
};

export const gridStyle = {
  stroke: "var(--color-border-subtle)",
  strokeDasharray: "3 3",
};

export const tooltipStyle = {
  backgroundColor: "var(--color-surface-raised)",
  border: "1px solid var(--color-border)",
  borderRadius: "8px",
  color: "var(--color-text-base)",
  fontSize: 13,
  boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
};
