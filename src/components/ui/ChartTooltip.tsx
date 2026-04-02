interface TooltipEntry {
  dataKey?: string | number;
  name?: string | number;
  value?: string | number | Array<string | number>;
  color?: string;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string | number;
  valueFormatter?: (value: number, name: string) => string;
}

export function ChartTooltip({ active, payload, label, valueFormatter }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div
      style={{
        backgroundColor: "var(--color-surface-raised)",
        border: "1px solid var(--color-border)",
        borderRadius: "8px",
        padding: "0.625rem 0.875rem",
        boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
        fontSize: "0.8125rem",
        minWidth: "140px",
      }}
    >
      {label != null && (
        <p
          style={{
            color: "var(--color-text-muted)",
            marginBottom: "0.375rem",
            fontWeight: 500,
          }}
        >
          {label}
        </p>
      )}
      {payload.map((entry, i) => (
        <div
          key={`${entry.dataKey ?? i}`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "0.2rem",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: entry.color,
              flexShrink: 0,
            }}
          />
          <span style={{ color: "var(--color-text-muted)", flex: 1 }}>
            {entry.name}
          </span>
          <span
            style={{
              color: "var(--color-text-strong)",
              fontWeight: 600,
              fontFamily: "var(--font-mono)",
            }}
          >
            {valueFormatter && typeof entry.value === "number"
              ? valueFormatter(entry.value, String(entry.name ?? ""))
              : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
}
