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
import { formatCurrencyCompact, formatCompact } from "@/lib/utils";
import type { RevenueDataPoint } from "@/types";

const MOCK_LEGEND = [
  { label: "Total MRR",      color: "var(--color-series-1)" },
  { label: "New MRR",        color: "var(--color-series-2)" },
  { label: "Expansion MRR",  color: "var(--color-series-3)" },
];

const LIVE_LEGEND = [
  { label: "Total Downloads",   color: "var(--color-series-1)" },
  { label: "New Growth",        color: "var(--color-series-2)" },
  { label: "Returning Users",   color: "var(--color-series-3)" },
];

interface RevenueLineChartProps {
  data: RevenueDataPoint[];
  isLive?: boolean;
}

export function RevenueLineChart({ data, isLive = false }: RevenueLineChartProps) {
  const prefersReduced = useReducedMotion();
  const legend    = isLive ? LIVE_LEGEND : MOCK_LEGEND;
  const yFmt      = isLive ? formatCompact : formatCurrencyCompact;
  const title     = isLive ? "Download Trends"    : "Revenue Trend";
  const subtitle  = isLive ? "Monthly npm package downloads (react)" : "Monthly recurring revenue breakdown";
  const summary   = isLive
    ? "Live download data from the npm registry for the react package. Total, new-growth, and returning-user download segments shown over the selected period."
    : "MRR grew 181% over 12 months, from $42,000 in January to $118,400 in December. Expansion MRR accelerated in Q3, reflecting product-led growth from the July feature release.";
  const line1Name = isLive ? "Total Downloads"  : "Total MRR";
  const line2Name = isLive ? "New Growth"        : "New MRR";
  const line3Name = isLive ? "Returning Users"   : "Expansion MRR";

  return (
    <ChartCard
      id="revenue-chart-title"
      title={title}
      subtitle={subtitle}
      summary={summary}
      legend={legend}
    >
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
          <CartesianGrid {...gridStyle} vertical={false} />
          <XAxis dataKey="month" {...axisStyle} />
          <YAxis tickFormatter={yFmt} {...axisStyle} width={52} />
          <Tooltip
            content={<ChartTooltip valueFormatter={yFmt} />}
            wrapperStyle={{ pointerEvents: "none" }}
          />
          <Line
            type="monotone"
            dataKey="mrr"
            name={line1Name}
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
            name={line2Name}
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
            name={line3Name}
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
