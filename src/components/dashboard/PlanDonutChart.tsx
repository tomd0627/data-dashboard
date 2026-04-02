"use client";

import { useReducedMotion } from "framer-motion";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { formatCurrencyCompact } from "@/lib/utils";
import type { PlanDataPoint } from "@/types";

import { ChartCard } from "./ChartCard";

const COLORS = [
  "var(--color-series-6)",
  "var(--color-series-2)",
  "var(--color-series-1)",
  "var(--color-series-3)",
];

interface PlanDonutChartProps {
  data: PlanDataPoint[];
}

function DonutTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: PlanDataPoint; value: number }>;
}) {
  if (!active || !payload?.length) return null;
  const plan = payload[0].payload;
  return (
    <div
      style={{
        backgroundColor: "var(--color-surface-raised)",
        border: "1px solid var(--color-border)",
        borderRadius: "8px",
        padding: "0.625rem 0.875rem",
        fontSize: "0.8125rem",
        boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
      }}
    >
      <p style={{ color: "var(--color-text-strong)", fontWeight: 600, marginBottom: "0.25rem" }}>
        {plan.name}
      </p>
      <p style={{ color: "var(--color-text-muted)", margin: "0.1rem 0" }}>
        Customers:{" "}
        <strong style={{ color: "var(--color-text-base)" }}>
          {plan.customers.toLocaleString()}
        </strong>
      </p>
      {plan.mrr > 0 && (
        <p style={{ color: "var(--color-text-muted)", margin: "0.1rem 0" }}>
          MRR contribution:{" "}
          <strong style={{ color: "var(--color-text-base)" }}>
            {formatCurrencyCompact(plan.mrr)}
          </strong>
        </p>
      )}
      {plan.pricePerMonth > 0 && (
        <p style={{ color: "var(--color-text-muted)", margin: "0.1rem 0" }}>
          Price:{" "}
          <strong style={{ color: "var(--color-text-base)" }}>
            ${plan.pricePerMonth}/mo
          </strong>
        </p>
      )}
    </div>
  );
}

export function PlanDonutChart({ data }: PlanDonutChartProps) {
  const prefersReduced = useReducedMotion();
  const totalMrr = data.reduce((sum, p) => sum + p.mrr, 0);
  const totalCustomers = data.reduce((sum, p) => sum + p.customers, 0);

  const legend = data.map((plan, i) => ({
    label: `${plan.name} (${Math.round((plan.customers / totalCustomers) * 100)}%)`,
    color: COLORS[i],
  }));

  return (
    <ChartCard
      id="plan-chart-title"
      title="Plan Distribution"
      subtitle="Customer share by subscription tier"
      summary={`Enterprise accounts represent only 9% of customers but contribute approximately 39% of total MRR — a strong signal of product-market fit with high-value accounts. Total ARR is ${formatCurrencyCompact(totalMrr * 12)}.`}
      legend={legend}
    >
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          {/* Center label rendered as an SVG overlay */}
          <text
            x="50%"
            y="44%"
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ fill: "var(--color-text-muted)", fontSize: 11, fontFamily: "inherit" }}
          >
            Total ARR
          </text>
          <text
            x="50%"
            y="56%"
            textAnchor="middle"
            dominantBaseline="middle"
            style={{
              fill: "var(--color-text-strong)",
              fontSize: 15,
              fontWeight: 700,
              fontFamily: "var(--font-mono)",
            }}
          >
            {formatCurrencyCompact(totalMrr * 12)}
          </text>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="52%"
            outerRadius="72%"
            dataKey="customers"
            nameKey="name"
            paddingAngle={3}
            isAnimationActive={!prefersReduced}
            animationDuration={800}
            label={false}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            content={<DonutTooltip />}
            wrapperStyle={{ pointerEvents: "none" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
