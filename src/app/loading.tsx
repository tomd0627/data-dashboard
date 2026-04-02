import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div
      aria-label="Loading dashboard"
      aria-busy="true"
      style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
      }}
    >
      {/* KPI skeletons */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1rem",
        }}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "12px",
              padding: "1.25rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            <Skeleton height="0.875rem" width="60%" />
            <Skeleton height="2rem" width="70%" />
            <Skeleton height="2rem" width="100%" borderRadius="8px" />
          </div>
        ))}
      </div>

      {/* Chart skeletons */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))",
          gap: "1rem",
        }}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "12px",
              padding: "1.25rem",
            }}
          >
            <Skeleton height="1rem" width="40%" style={{ marginBottom: "0.5rem" }} />
            <Skeleton height="0.75rem" width="60%" style={{ marginBottom: "1rem" }} />
            <Skeleton height="280px" />
          </div>
        ))}
      </div>
    </div>
  );
}
