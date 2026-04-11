// ─── KPI ────────────────────────────────────────────────────────

export interface SparklinePoint {
  value: number;
}

export interface KpiData {
  id: string;
  label: string;
  value: number;
  /** Formatted display string, e.g. "$118,400" */
  formatted: string;
  delta: number;
  /** Positive = good (even for churn where delta is negative) */
  deltaPositive: boolean;
  deltaLabel: string;
  /** Lucide icon name */
  icon: "TrendingUp" | "Users" | "DollarSign" | "Activity";
  /** Series color token index (1–7) */
  colorIndex: number;
  sparkline: SparklinePoint[];
  /** Optional override for animated counter formatting */
  format?: "currency" | "currency-decimal" | "number" | "compact" | "percent";
}

// ─── Revenue / Time Series ──────────────────────────────────────

export interface RevenueDataPoint {
  month: string;
  mrr: number;
  newMrr: number;
  expansionMrr: number;
  mau: number;
  wau: number;
}

// ─── Channels ───────────────────────────────────────────────────

export interface ChannelDataPoint {
  channel: string;
  q2: number;
  q3: number;
  q4: number;
}

// ─── Plans ──────────────────────────────────────────────────────

export interface PlanDataPoint {
  id: string;
  name: string;
  customers: number;
  mrr: number;
  pricePerMonth: number;
}

// ─── Retention ──────────────────────────────────────────────────

export interface RetentionCohort {
  /** e.g. "May '24" */
  label: string;
  /** Retention % for weeks 1–8 */
  weeks: number[];
}

// ─── Time Range ─────────────────────────────────────────────────

export type TimeRange = "7d" | "30d" | "90d" | "1y";
