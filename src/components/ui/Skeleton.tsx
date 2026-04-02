interface SkeletonProps {
  height?: string | number;
  width?: string | number;
  borderRadius?: string | number;
  style?: React.CSSProperties;
}

export function Skeleton({
  height = "1rem",
  width = "100%",
  borderRadius = "6px",
  style,
}: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className="skeleton"
      style={{
        height,
        width,
        borderRadius,
        ...style,
      }}
    />
  );
}
