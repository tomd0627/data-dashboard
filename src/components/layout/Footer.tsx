export function Footer() {
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
      Built with Next.js, Recharts &amp; Framer Motion — all data is fictional
      and for demonstration purposes only.
    </footer>
  );
}
