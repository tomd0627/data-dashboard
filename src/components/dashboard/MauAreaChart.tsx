"use client";

import { useReducedMotion } from "framer-motion";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ChartTooltip } from "@/components/ui/ChartTooltip";
import { axisStyle, gridStyle } from "@/lib/chart-utils";
import { formatCompact } from "@/lib/utils";
import type { RevenueDataPoint } from "@/types";

import { ChartCard } from "./ChartCard";

const MOCK_LEGEND = [
  { label: "Monthly Active Users", color: "var(--color-series-2)" },
  { label: "Weekly Active Users",  color: "var(--color-series-1)" },
];

const LIVE_LEGEND = [
  { label: "Monthly Downloads", color: "var(--color-series-2)" },
  { label: "Weekly Downloads",  color: "var(--color-series-1)" },
];

interface MauAreaChartProps {
  data: RevenueDataPoint[];
  isLive?: boolean;
}

export function MauAreaChart({ data, isLive = false }: MauAreaChartProps) {
  const prefersReduced = useReducedMotion();
  const legend   = isLive ? LIVE_LEGEND : MOCK_LEGEND;
  const title    = isLive ? "Download Engagement"                   : "User Engagement";
  const subtitle = isLive ? "Monthly and weekly npm download trends" : "Monthly and weekly active user trends";
  const summary  = isLive
    ? "Live download engagement from the npm registry. Monthly and weekly download volumes shown for the selected period."
    : "WAU/MAU stickiness ratio climbed from 22% in January to 38% in December — a significant improvement driven by the Q3 feature release and subsequent product improvements.";
  const mauName  = isLive ? "Monthly Downloads" : "Monthly Active Users";
  const wauName  = isLive ? "Weekly Downloads"  : "Weekly Active Users";

  return (
    <ChartCard
      id="mau-chart-title"
      title={title}
      subtitle={subtitle}
      summary={summary}
      legend={legend}
    >
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="mauGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="var(--color-series-2)" stopOpacity={0.25} />
              <stop offset="95%" stopColor="var(--color-series-2)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="wauGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="var(--color-series-1)" stopOpacity={0.25} />
              <stop offset="95%" stopColor="var(--color-series-1)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid {...gridStyle} vertical={false} />
          <XAxis dataKey="month" {...axisStyle} />
          <YAxis tickFormatter={formatCompact} {...axisStyle} width={40} />
          <Tooltip
            content={<ChartTooltip valueFormatter={formatCompact} />}
            wrapperStyle={{ pointerEvents: "none" }}
          />
          <Area
            type="monotone"
            dataKey="mau"
            name={mauName}
            stroke="var(--color-series-2)"
            strokeWidth={2}
            fill="url(#mauGradient)"
            dot={false}
            activeDot={{ r: 5, strokeWidth: 0 }}
            isAnimationActive={!prefersReduced}
            animationDuration={800}
          />
          <Area
            type="monotone"
            dataKey="wau"
            name={wauName}
            stroke="var(--color-series-1)"
            strokeWidth={2}
            fill="url(#wauGradient)"
            dot={false}
            activeDot={{ r: 5, strokeWidth: 0 }}
            isAnimationActive={!prefersReduced}
            animationDuration={900}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
