"use client";

import { ChannelBarChart } from "@/components/dashboard/ChannelBarChart";
import { KpiGrid } from "@/components/dashboard/KpiGrid";
import { MauAreaChart } from "@/components/dashboard/MauAreaChart";
import { PlanDonutChart } from "@/components/dashboard/PlanDonutChart";
import { RetentionHeatmap } from "@/components/dashboard/RetentionHeatmap";
import { RevenueLineChart } from "@/components/dashboard/RevenueLineChart";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { channelsData, kpiData, plansData, retentionData } from "@/data";
import { useTimeRange } from "@/hooks/useTimeRange";

export default function DashboardPage() {
  const { timeRange, setTimeRange, getFilteredRevenue } = useTimeRange();
  const revenueFiltered = getFilteredRevenue();

  return (
    <>
      <Header timeRange={timeRange} onTimeRangeChange={setTimeRange} />

      <main
        id="main-content"
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        {/* KPI Cards */}
        <section aria-labelledby="kpi-heading">
          <h2 id="kpi-heading" className="sr-only">
            Key Performance Indicators
          </h2>
          <KpiGrid data={kpiData} />
        </section>

        {/* Top chart row */}
        <section
          aria-label="Revenue and acquisition charts"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))",
            gap: "1rem",
          }}
        >
          <RevenueLineChart data={revenueFiltered} />
          <ChannelBarChart data={channelsData} />
        </section>

        {/* Bottom chart row */}
        <section
          aria-label="Plan distribution and retention charts"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))",
            gap: "1rem",
          }}
        >
          <PlanDonutChart data={plansData} />
          <RetentionHeatmap data={retentionData} />
        </section>

        {/* Full-width area chart */}
        <section aria-label="User engagement trend">
          <MauAreaChart data={revenueFiltered} />
        </section>
      </main>

      <Footer />
    </>
  );
}
