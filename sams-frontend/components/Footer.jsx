import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: "var(--ink)",
      color: "rgba(255, 255, 255, 0.4)",
      borderTop: "1px solid rgba(255, 255, 255, 0.06)",
      padding: "40px 48px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "16px",
      fontFamily: "'Montserrat', sans-serif",
      fontSize: "10px",
      fontWeight: 500,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      marginTop: "auto"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "15px", color: "rgba(255,255,255,0.7)", letterSpacing: "0.18em" }}>SAMS</span>
        <span style={{ opacity: 0.25 }}>·</span>
        <span>Faculty of Computing, USJ</span>
      </div>
      
      <p style={{ margin: 0 }}>© 2026 University of Sri Jayewardenepura. All rights reserved.</p>
      
      <div style={{ display: "flex", gap: "24px" }}>
        <Link href="#" style={{ color: "inherit", textDecoration: "none", transition: "color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.color = "#fff"} onMouseOut={(e) => e.currentTarget.style.color = "inherit"}>Privacy Policy</Link>
        <Link href="#" style={{ color: "inherit", textDecoration: "none", transition: "color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.color = "#fff"} onMouseOut={(e) => e.currentTarget.style.color = "inherit"}>Terms of Service</Link>
        <Link href="#" style={{ color: "inherit", textDecoration: "none", transition: "color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.color = "#fff"} onMouseOut={(e) => e.currentTarget.style.color = "inherit"}>Contact Support</Link>
        <Link href="#" style={{ color: "inherit", textDecoration: "none", transition: "color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.color = "#fff"} onMouseOut={(e) => e.currentTarget.style.color = "inherit"}>Academic Calendar</Link>
      </div>
    </footer>
  );
}
