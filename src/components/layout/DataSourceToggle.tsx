"use client";

export type DataSource = "mock" | "live";

interface DataSourceToggleProps {
  value: DataSource;
  onChange: (source: DataSource) => void;
  /** Shown as a badge when live is active, e.g. "npm · react" */
  liveLabel?: string;
}

export function DataSourceToggle({
  value,
  onChange,
  liveLabel = "npm · react",
}: DataSourceToggleProps) {
  const isMock = value === "mock";
  const isLive = value === "live";

  return (
    <fieldset
      style={{ display: "flex", alignItems: "center", gap: "0.25rem", border: "none", padding: 0, margin: 0 }}
    >
      <legend className="sr-only">Data source</legend>
      <button
        type="button"
        aria-pressed={isMock}
        onClick={() => onChange("mock")}
        style={{
          padding: "0.3rem 0.625rem",
          borderRadius: "6px",
          border: isMock ? "1px solid var(--color-accent)" : "1px solid transparent",
          background: isMock ? "var(--color-accent-subtle)" : "transparent",
          color: isMock ? "var(--color-accent)" : "var(--color-text-muted)",
          fontSize: "0.75rem",
          fontWeight: isMock ? 600 : 400,
          cursor: "pointer",
          transition: "all 0.15s ease",
          fontFamily: "inherit",
        }}
      >
        Mock
      </button>

      <button
        type="button"
        aria-pressed={isLive}
        onClick={() => onChange("live")}
        style={{
          padding: "0.3rem 0.625rem",
          borderRadius: "6px",
          border: isLive ? "1px solid var(--color-accent)" : "1px solid transparent",
          background: isLive ? "var(--color-accent-subtle)" : "transparent",
          color: isLive ? "var(--color-accent)" : "var(--color-text-muted)",
          fontSize: "0.75rem",
          fontWeight: isLive ? 600 : 400,
          cursor: "pointer",
          transition: "all 0.15s ease",
          fontFamily: "inherit",
        }}
      >
        Live
      </button>

      {isLive && (
        <span
          className="datasource-badge"
          style={{
            fontSize: "0.6875rem",
            color: "var(--color-text-muted)",
            background: "var(--color-surface-raised)",
            border: "1px solid var(--color-border-subtle)",
            borderRadius: "4px",
            padding: "0.1rem 0.375rem",
            fontFamily: "var(--font-mono)",
            whiteSpace: "nowrap",
          }}
        >
          {liveLabel}
        </span>
      )}
    </fieldset>
  );
}
