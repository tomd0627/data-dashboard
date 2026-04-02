"use client";

import {
  BarChart,
  Bar,
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
import type { ChannelDataPoint } from "@/types";

const LEGEND = [
  { label: "Q2 2024", color: "var(--color-series-1)" },
  { label: "Q3 2024", color: "var(--color-series-2)" },
  { label: "Q4 2024", color: "var(--color-series-3)" },
];

interface ChannelBarChartProps {
  data: ChannelDataPoint[];
}

export function ChannelBarChart({ data }: ChannelBarChartProps) {
  const prefersReduced = useReducedMotion();

  return (
    <ChartCard
      id="channel-chart-title"
      title="Acquisition by Channel"
      subtitle="New customers acquired per quarter"
      summary="SEO overtook SEM as the top acquisition channel in Q3 2024 following a content investment. Email conversion continued to climb, while SEM spend was gradually reallocated."
      legend={LEGEND}
    >
      <ResponsiveContainer width="100%" height={260}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 4, right: 16, bottom: 0, left: 8 }}
          barCategoryGap="30%"
          barGap={3}
        >
          <CartesianGrid {...gridStyle} horizontal={false} />
          <XAxis type="number" {...axisStyle} />
          <YAxis
            type="category"
            dataKey="channel"
            {...axisStyle}
            width={52}
          />
          <Tooltip
            content={<ChartTooltip valueFormatter={(v) => `${v} customers`} />}
            wrapperStyle={{ pointerEvents: "none" }}
            cursor={{ fill: "var(--color-surface-hover)" }}
          />
          <Bar
            dataKey="q2"
            name="Q2 2024"
            fill="var(--color-series-1)"
            radius={[0, 3, 3, 0]}
            isAnimationActive={!prefersReduced}
            animationDuration={700}
          />
          <Bar
            dataKey="q3"
            name="Q3 2024"
            fill="var(--color-series-2)"
            radius={[0, 3, 3, 0]}
            isAnimationActive={!prefersReduced}
            animationDuration={800}
          />
          <Bar
            dataKey="q4"
            name="Q4 2024"
            fill="var(--color-series-3)"
            radius={[0, 3, 3, 0]}
            isAnimationActive={!prefersReduced}
            animationDuration={900}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
