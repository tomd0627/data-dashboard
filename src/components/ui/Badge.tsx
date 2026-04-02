import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface BadgeProps {
  delta: number;
  /** Whether a positive delta is good news (true) or bad news (false) */
  positiveIsGood?: boolean;
  label?: string;
}

export function Badge({ delta, positiveIsGood = true, label }: BadgeProps) {
  const isPositive = delta > 0;
  const isNegative = delta < 0;
  const isGood = positiveIsGood ? isPositive : isNegative;
  const isBad = positiveIsGood ? isNegative : isPositive;

  const color = isGood
    ? "var(--color-positive)"
    : isBad
      ? "var(--color-negative)"
      : "var(--color-text-muted)";

  const bg = isGood
    ? "rgba(74,222,128,0.1)"
    : isBad
      ? "rgba(248,113,113,0.1)"
      : "var(--color-accent-subtle)";

  const sign = delta > 0 ? "+" : "";
  const displayValue = `${sign}${Math.abs(delta).toFixed(1)}${label?.includes("pp") ? "pp" : "%"}`;

  const directionWord = isGood ? "increase" : isBad ? "decrease" : "no change";
  const ariaLabel = `${displayValue} ${directionWord}${label ? ` ${label}` : ""}`;

  const Icon = isPositive ? TrendingUp : isNegative ? TrendingDown : Minus;

  return (
    <span
      aria-label={ariaLabel}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.25rem",
        padding: "0.2rem 0.5rem",
        borderRadius: "999px",
        fontSize: "0.75rem",
        fontWeight: 600,
        color,
        backgroundColor: bg,
        whiteSpace: "nowrap",
      }}
    >
      <Icon size={12} aria-hidden="true" />
      {displayValue}
    </span>
  );
}
