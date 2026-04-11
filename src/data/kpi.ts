import type { KpiData, RevenueDataPoint } from "@/types";

export const kpiData: KpiData[] = [
  {
    id: "mrr",
    label: "Monthly Recurring Revenue",
    value: 118400,
    formatted: "$118,400",
    delta: 14.2,
    deltaPositive: true,
    deltaLabel: "vs last month",
    icon: "TrendingUp",
    colorIndex: 0,
    sparkline: [
      { value: 84100 },
      { value: 91800 },
      { value: 101200 },
      { value: 103600 },
      { value: 107400 },
      { value: 109600 },
      { value: 112800 },
      { value: 118400 },
    ],
  },
  {
    id: "customers",
    label: "Active Customers",
    value: 2847,
    formatted: "2,847",
    delta: 8.6,
    deltaPositive: true,
    deltaLabel: "vs last month",
    icon: "Users",
    colorIndex: 1,
    sparkline: [
      { value: 2290 },
      { value: 2380 },
      { value: 2460 },
      { value: 2530 },
      { value: 2580 },
      { value: 2620 },
      { value: 2720 },
      { value: 2847 },
    ],
  },
  {
    id: "arpu",
    label: "Avg Revenue Per User",
    value: 41.6,
    formatted: "$41.60",
    delta: 5.3,
    deltaPositive: true,
    deltaLabel: "vs last month",
    icon: "DollarSign",
    colorIndex: 2,
    sparkline: [
      { value: 36.7 },
      { value: 37.3 },
      { value: 38.1 },
      { value: 38.9 },
      { value: 39.5 },
      { value: 40.2 },
      { value: 40.9 },
      { value: 41.6 },
    ],
  },
  {
    id: "churn",
    label: "Churn Rate",
    value: 2.4,
    formatted: "2.4%",
    delta: -0.8,
    deltaPositive: true, // down is good for churn
    deltaLabel: "pp vs last month",
    icon: "Activity",
    colorIndex: 3,
    sparkline: [
      { value: 4.1 },
      { value: 3.8 },
      { value: 3.5 },
      { value: 3.4 },
      { value: 3.2 },
      { value: 3.0 },
      { value: 2.7 },
      { value: 2.4 },
    ],
  },
];

/**
 * Derive KPI card data dynamically from a filtered revenue slice.
 * MRR, customers (MAU proxy), and ARPU update with the selected time range.
 * Churn has no time-series source so it remains static.
 */
export function deriveKpiFromRevenue(slice: RevenueDataPoint[]): KpiData[] {
  if (slice.length === 0) return kpiData;

  const first = slice[0];
  const last  = slice[slice.length - 1];
  const pct   = (a: number, b: number) =>
    b !== 0 ? +((a - b) / b * 100).toFixed(1) : 0;

  const firstArpu = first.mrr / first.mau;
  const lastArpu  = last.mrr  / last.mau;

  return [
    {
      id: "mrr",
      label: "Monthly Recurring Revenue",
      value: last.mrr,
      formatted: `$${last.mrr.toLocaleString("en-US")}`,
      delta: pct(last.mrr, first.mrr),
      deltaPositive: last.mrr >= first.mrr,
      deltaLabel: "vs period start",
      icon: "TrendingUp",
      colorIndex: 0,
      sparkline: slice.map((d) => ({ value: d.mrr })),
    },
    {
      id: "customers",
      label: "Active Customers",
      value: last.mau,
      formatted: last.mau.toLocaleString("en-US"),
      delta: pct(last.mau, first.mau),
      deltaPositive: last.mau >= first.mau,
      deltaLabel: "vs period start",
      icon: "Users",
      colorIndex: 1,
      sparkline: slice.map((d) => ({ value: d.mau })),
    },
    {
      id: "arpu",
      label: "Avg Revenue Per User",
      value: lastArpu,
      formatted: `$${lastArpu.toFixed(2)}`,
      delta: pct(lastArpu, firstArpu),
      deltaPositive: lastArpu >= firstArpu,
      deltaLabel: "vs period start",
      icon: "DollarSign",
      colorIndex: 2,
      sparkline: slice.map((d) => ({ value: d.mrr / d.mau })),
    },
    // Churn has no time-series source — keep static
    kpiData[3],
  ];
}
