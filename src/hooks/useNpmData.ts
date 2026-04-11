"use client";

import { useEffect, useState } from "react";
import type { KpiData, RevenueDataPoint } from "@/types";

// ─── npm registry API types ─────────────────────────────────────

interface NpmDownloadDay {
  downloads: number;
  day: string; // "YYYY-MM-DD"
}

interface NpmApiResponse {
  start: string;
  end: string;
  package: string;
  downloads: NpmDownloadDay[];
}

// ─── Transform ──────────────────────────────────────────────────

const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function transformNpmData(json: NpmApiResponse): RevenueDataPoint[] {
  // Group daily entries by "YYYY-MM"
  const monthMap = new Map<string, NpmDownloadDay[]>();
  for (const item of json.downloads) {
    const key = item.day.slice(0, 7); // "YYYY-MM"
    if (!monthMap.has(key)) monthMap.set(key, []);
    monthMap.get(key)!.push(item);
  }

  const sortedMonths = Array.from(monthMap.entries()).sort(([a], [b]) =>
    a.localeCompare(b)
  );

  return sortedMonths.map(([key, days], i) => {
    const monthIndex = parseInt(key.slice(5, 7), 10) - 1;
    const total = days.reduce((s, d) => s + d.downloads, 0);
    const prevTotal =
      i > 0
        ? sortedMonths[i - 1][1].reduce((s, d) => s + d.downloads, 0)
        : total;
    const growth = Math.max(0, total - prevTotal);

    // Last 7 days of the month as a weekly proxy
    const lastWeek = days.slice(-7).reduce((s, d) => s + d.downloads, 0);

    return {
      month: MONTH_LABELS[monthIndex],
      mrr: total,
      newMrr: growth,
      expansionMrr: Math.round(total * 0.08),
      mau: total,
      wau: lastWeek,
    };
  });
}

// ─── KPI derivation for npm live data ───────────────────────────

export function deriveKpiFromNpm(slice: RevenueDataPoint[]): KpiData[] {
  if (slice.length === 0) {
    return [
      { id: "npm_total",  label: "Monthly Downloads",  value: 0, formatted: "0",    delta: 0, deltaPositive: true,  deltaLabel: "vs period start", icon: "TrendingUp",  colorIndex: 0, sparkline: [], format: "compact" },
      { id: "npm_weekly", label: "Avg Weekly Downloads", value: 0, formatted: "0",  delta: 0, deltaPositive: true,  deltaLabel: "vs period start", icon: "Users",       colorIndex: 1, sparkline: [], format: "compact" },
      { id: "npm_daily",  label: "Avg Daily Downloads",  value: 0, formatted: "0",  delta: 0, deltaPositive: true,  deltaLabel: "vs period start", icon: "DollarSign",  colorIndex: 2, sparkline: [], format: "compact" },
      { id: "npm_growth", label: "Month-over-Month Growth", value: 0, formatted: "0%", delta: 0, deltaPositive: true, deltaLabel: "vs period start", icon: "Activity", colorIndex: 3, sparkline: [], format: "percent" },
    ];
  }

  const first = slice[0];
  const last  = slice[slice.length - 1];
  const pct   = (a: number, b: number) =>
    b !== 0 ? +((a - b) / b * 100).toFixed(1) : 0;

  const firstDaily = first.mrr / 30;
  const lastDaily  = last.mrr  / 30;
  const firstWeekly = first.wau;
  const lastWeekly  = last.wau;

  const growthRate = pct(last.mrr, first.mrr);

  return [
    {
      id: "npm_total",
      label: "Monthly Downloads",
      value: last.mrr,
      formatted: last.mrr.toLocaleString("en-US"),
      delta: pct(last.mrr, first.mrr),
      deltaPositive: last.mrr >= first.mrr,
      deltaLabel: "vs period start",
      icon: "TrendingUp",
      colorIndex: 0,
      sparkline: slice.map((d) => ({ value: d.mrr })),
      format: "compact",
    },
    {
      id: "npm_weekly",
      label: "Avg Weekly Downloads",
      value: lastWeekly,
      formatted: lastWeekly.toLocaleString("en-US"),
      delta: pct(lastWeekly, firstWeekly),
      deltaPositive: lastWeekly >= firstWeekly,
      deltaLabel: "vs period start",
      icon: "Users",
      colorIndex: 1,
      sparkline: slice.map((d) => ({ value: d.wau })),
      format: "compact",
    },
    {
      id: "npm_daily",
      label: "Avg Daily Downloads",
      value: lastDaily,
      formatted: lastDaily.toLocaleString("en-US"),
      delta: pct(lastDaily, firstDaily),
      deltaPositive: lastDaily >= firstDaily,
      deltaLabel: "vs period start",
      icon: "DollarSign",
      colorIndex: 2,
      sparkline: slice.map((d) => ({ value: d.mrr / 30 })),
      format: "compact",
    },
    {
      id: "npm_growth",
      label: "Period Growth Rate",
      value: growthRate,
      formatted: `${growthRate.toFixed(1)}%`,
      delta: growthRate,
      deltaPositive: growthRate >= 0,
      deltaLabel: "total over period",
      icon: "Activity",
      colorIndex: 3,
      sparkline: slice.map((_, i, arr) => {
        if (i === 0) return { value: 0 };
        const prev = arr[i - 1].mrr;
        const curr = arr[i].mrr;
        return { value: prev !== 0 ? +((curr - prev) / prev * 100).toFixed(1) : 0 };
      }),
      format: "percent",
    },
  ];
}

// ─── Hook ───────────────────────────────────────────────────────

interface UseNpmDataResult {
  data: RevenueDataPoint[] | null;
  loading: boolean;
  error: string | null;
}

export function useNpmData(packageName = "react"): UseNpmDataResult {
  const [data, setData]       = useState<RevenueDataPoint[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`https://api.npmjs.org/downloads/range/last-year/${packageName}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<NpmApiResponse>;
      })
      .then((json) => {
        setData(transformNpmData(json));
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load live npm data");
        setLoading(false);
      });
  }, [packageName]);

  return { data, loading, error };
}
