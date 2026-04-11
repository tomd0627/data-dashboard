"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import { KpiGrid } from "@/components/dashboard/KpiGrid";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import type { DataSource } from "@/components/layout/DataSourceToggle";
import { channelsData, plansData, retentionData } from "@/data";
import { deriveKpiFromRevenue } from "@/data/kpi";
import { useTimeRange } from "@/hooks/useTimeRange";
import { useNpmData, deriveKpiFromNpm } from "@/hooks/useNpmData";

function ChartSkeleton() {
  return (
    <div
      className="skeleton"
      style={{ borderRadius: "12px", minHeight: "340px" }}
    />
  );
}

const RevenueLineChart = dynamic(
  () => import("@/components/dashboard/RevenueLineChart").then((m) => m.RevenueLineChart),
  { loading: () => <ChartSkeleton />, ssr: false }
);

const ChannelBarChart = dynamic(
  () => import("@/components/dashboard/ChannelBarChart").then((m) => m.ChannelBarChart),
  { loading: () => <ChartSkeleton />, ssr: false }
);

const PlanDonutChart = dynamic(
  () => import("@/components/dashboard/PlanDonutChart").then((m) => m.PlanDonutChart),
  { loading: () => <ChartSkeleton />, ssr: false }
);

const RetentionHeatmap = dynamic(
  () => import("@/components/dashboard/RetentionHeatmap").then((m) => m.RetentionHeatmap),
  { loading: () => <ChartSkeleton />, ssr: false }
);

const MauAreaChart = dynamic(
  () => import("@/components/dashboard/MauAreaChart").then((m) => m.MauAreaChart),
  { loading: () => <ChartSkeleton />, ssr: false }
);

export default function DashboardPage() {
  const [dataSource, setDataSource] = useState<DataSource>("mock");
  const { timeRange, setTimeRange, getFilteredRevenue } = useTimeRange();
  const npm = useNpmData("react");

  const isLive = dataSource === "live";
  const liveFiltered = getFilteredRevenue(npm.data ?? undefined);
  const revenueFiltered = isLive ? liveFiltered : getFilteredRevenue();
  const kpiCards = isLive
    ? deriveKpiFromNpm(liveFiltered)
    : deriveKpiFromRevenue(revenueFiltered);

  // Show skeletons for the data-driven charts while live data loads
  const showSkeleton = isLive && npm.loading;

  return (
    <>
      <Header
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
        dataSource={dataSource}
        onDataSourceChange={setDataSource}
      />

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
          <KpiGrid data={kpiCards} />
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
          {showSkeleton ? (
            <ChartSkeleton />
          ) : (
            <RevenueLineChart data={revenueFiltered} isLive={isLive} />
          )}
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
          {showSkeleton ? (
            <ChartSkeleton />
          ) : (
            <MauAreaChart data={revenueFiltered} isLive={isLive} />
          )}
        </section>
      </main>

      <Footer isLive={isLive} />
    </>
  );
}
