"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useReducedMotion } from "framer-motion";
import { ChartTooltip } from "@/components/ui/ChartTooltip";
import { ChartCard } from "./ChartCard";
import { axisStyle, gridStyle } from "@/lib/chart-utils";
import { formatCurrencyCompact } from "@/lib/utils";
import type { RevenueDataPoint } from "@/types";

const LEGEND = [
  { label: "Total MRR",      color: "var(--color-series-1)" },
  { label: "New MRR",        color: "var(--color-series-2)" },
  { label: "Expansion MRR",  color: "var(--color-series-3)" },
];

interface RevenueLineChartProps {
  data: RevenueDataPoint[];
}

export function RevenueLineChart({ data }: RevenueLineChartProps) {
  const prefersReduced = useReducedMotion();

  return (
    <ChartCard
      id="revenue-chart-title"
      title="Revenue Trend"
      subtitle="Monthly recurring revenue breakdown"
      summary="MRR grew 181% over 12 months, from $42,000 in January to $118,400 in December. Expansion MRR accelerated in Q3, reflecting product-led growth from the July feature release."
      legend={LEGEND}
    >
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
          <CartesianGrid {...gridStyle} vertical={false} />
          <XAxis dataKey="month" {...axisStyle} />
          <YAxis
            tickFormatter={formatCurrencyCompact}
            {...axisStyle}
            width={52}
          />
          <Tooltip
            content={
              <ChartTooltip
                valueFormatter={(v) => formatCurrencyCompact(v)}
              />
            }
            wrapperStyle={{ pointerEvents: "none" }}
          />
          <Line
            type="monotone"
            dataKey="mrr"
            name="Total MRR"
            stroke="var(--color-series-1)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 5, strokeWidth: 0 }}
            isAnimationActive={!prefersReduced}
            animationDuration={800}
            animationEasing="ease-out"
          />
          <Line
            type="monotone"
            dataKey="newMrr"
            name="New MRR"
            stroke="var(--color-series-2)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 5, strokeWidth: 0 }}
            isAnimationActive={!prefersReduced}
            animationDuration={900}
            animationEasing="ease-out"
          />
          <Line
            type="monotone"
            dataKey="expansionMrr"
            name="Expansion MRR"
            stroke="var(--color-series-3)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 5, strokeWidth: 0 }}
            isAnimationActive={!prefersReduced}
            animationDuration={1000}
            animationEasing="ease-out"
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
