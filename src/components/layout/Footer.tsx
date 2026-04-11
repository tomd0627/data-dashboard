interface FooterProps {
  isLive?: boolean;
}

export function Footer({ isLive = false }: FooterProps) {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--color-border-subtle)",
        color: "var(--color-text-muted)",
        fontSize: "0.75rem",
        textAlign: "center",
        padding: "1.25rem 1rem",
      }}
    >
      Built with Next.js, Recharts &amp; Framer Motion —{" "}
      {isLive ? (
        <>
          live mode data sourced from the{" "}
          <a
            href="https://github.com/npm/registry/blob/main/docs/download-counts.md"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "inherit", textDecoration: "underline" }}
          >
            npm registry public API
          </a>
          .
        </>
      ) : (
        "all data is fictional and for demonstration purposes only."
      )}
    </footer>
  );
}
