"use client";

export function Footer() {
  return (
    <footer style={{ background: "var(--ink,#1a1714)", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "28px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, fontFamily: "Montserrat,sans-serif", fontSize: 9, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontFamily: "Cormorant Garamond,serif", fontSize: 14, color: "rgba(255,255,255,0.6)", letterSpacing: "0.2em" }}>SAMS</span>
        <span style={{ opacity: 0.3 }}>·</span>
        <span>Faculty of Computing, USJ</span>
      </div>
      <p>© {new Date().getFullYear()} University of Sri Jayewardenepura. All rights reserved.</p>
      <div style={{ display: "flex", gap: 20 }}>
        {["Privacy Policy", "Terms of Service", "Contact Support", "Academic Calendar"].map(l => (
          <a key={l} href="#" style={{ color: "inherit", textDecoration: "none" }}
            onMouseEnter={e => e.target.style.color = "var(--gold-light,#d4b07a)"}
            onMouseLeave={e => e.target.style.color = "inherit"}>{l}</a>
        ))}
      </div>
    </footer>
  );
}
