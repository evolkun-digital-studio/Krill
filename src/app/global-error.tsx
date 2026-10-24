"use client";

// Last-resort boundary for errors in the root layout itself; it replaces the whole document,
// so it cannot rely on globals.css and styles itself inline.
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body
        style={{
          font: "15px/1.5 system-ui, -apple-system, sans-serif",
          background: "#fafafa",
          color: "#111",
          display: "grid",
          placeItems: "center",
          minHeight: "100vh",
          margin: 0,
          padding: "1.5rem",
        }}
      >
        <title>This page didn&apos;t load</title>
        <div style={{ maxWidth: "28rem", width: "100%", textAlign: "center", padding: "2rem" }}>
          <h1 style={{ fontSize: "1.25rem", margin: "0 0 0.5rem" }}>This page didn&apos;t load</h1>
          <p style={{ color: "#4b5563", margin: "0 0 1.5rem" }}>
            Something went wrong on our end. You can try refreshing or head back home.
          </p>
          <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => reset()}
              style={{ padding: "0.5rem 1rem", borderRadius: "0.375rem", font: "inherit", cursor: "pointer", border: "1px solid transparent", background: "#111", color: "#fff" }}
            >
              Try again
            </button>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- full reload is intended after a root crash */}
            <a
              href="/"
              style={{ padding: "0.5rem 1rem", borderRadius: "0.375rem", textDecoration: "none", border: "1px solid #d1d5db", background: "#fff", color: "#111" }}
            >
              Go home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
