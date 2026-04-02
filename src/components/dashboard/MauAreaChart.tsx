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

const LEGEND = [
  { label: "Monthly Active Users", color: "var(--color-series-2)" },
  { label: "Weekly Active Users",  color: "var(--color-series-1)" },
];

interface MauAreaChartProps {
  data: RevenueDataPoint[];
}

export function MauAreaChart({ data }: MauAreaChartProps) {
  const prefersReduced = useReducedMotion();

  return (
    <ChartCard
      id="mau-chart-title"
      title="User Engagement"
      subtitle="Monthly and weekly active user trends"
      summary="WAU/MAU stickiness ratio climbed from 22% in January to 38% in December — a significant improvement driven by the Q3 feature release and subsequent product improvements."
      legend={LEGEND}
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
            content={<ChartTooltip valueFormatter={(v) => formatCompact(v)} />}
            wrapperStyle={{ pointerEvents: "none" }}
          />
          <Area
            type="monotone"
            dataKey="mau"
            name="Monthly Active Users"
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
            name="Weekly Active Users"
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
