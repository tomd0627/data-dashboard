"use client";

import { useState } from "react";
import type { TimeRange } from "@/types";
import type { RevenueDataPoint } from "@/types";
import { revenueData } from "@/data";

const RANGE_MONTHS: Record<TimeRange, number> = {
  "7d": 1,   // ~1 month of data
  "30d": 3,
  "90d": 6,
  "1y": 12,
};

export function useTimeRange() {
  const [timeRange, setTimeRange] = useState<TimeRange>("1y");

  function getFilteredRevenue(): RevenueDataPoint[] {
    const months = RANGE_MONTHS[timeRange];
    return revenueData.slice(-months);
  }

  return { timeRange, setTimeRange, getFilteredRevenue };
}
