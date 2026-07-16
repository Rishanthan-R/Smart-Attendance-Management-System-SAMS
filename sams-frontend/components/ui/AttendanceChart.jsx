/* ═══════════════════════════════════════════════════════════════════
   components/ui/AttendanceChart.jsx
   ---------------------------------------------------------------------
   WHY THIS FILE EXISTS
   A self-contained inline SVG bar chart, used once on the dashboard
   to show the 7-week attendance trend. Kept as its own component
   (rather than a chunk of JSX inside the page) so it's easy to find,
   test, or later swap for a charting library without touching the
   rest of the dashboard.

═══════════════════════════════════════════════════════════════════ */
"use client";

export function AttendanceChart({ data, labels }) {
  const h = 120;
  const barW = 28;
  const gap = 14;
  const totalW = data.length * (barW + gap) - gap;

  // Compute points: X centers at the middle of the column, Y is scaled to height
  const points = data.map((v, i) => ({
    x: i * (barW + gap) + barW / 2,
    y: h - (v / 100) * h,
    val: v
  }));

  // Create path command
  const d = points.reduce((acc, p, i) => i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`, "");

  // Create fill path command (closing the area at the bottom)
  const fillD = points.length > 0 
    ? `${d} L ${points[points.length - 1].x} ${h} L ${points[0].x} ${h} Z` 
    : "";

  const gridLines = [0, h / 2, h];

  return (
    <svg viewBox={`0 0 ${totalW + 2} ${h + 36}`} width="100%" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--gold, #b8965a)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--gold, #b8965a)" stopOpacity="0.0" />
        </linearGradient>
      </defs>

      {/* Background grid lines */}
      {gridLines.map((yVal, idx) => (
        <line 
          key={idx} 
          x1={points[0]?.x || 0} 
          y1={yVal} 
          x2={points[points.length - 1]?.x || totalW} 
          y2={yVal} 
          stroke="var(--border, rgba(26,23,20,0.06))" 
          strokeDasharray="4 4" 
        />
      ))}

      {/* Gradient area under the line */}
      {fillD && <path d={fillD} fill="url(#chartGradient)" />}

      {/* Main line */}
      {d && (
        <path 
          d={d} 
          fill="none" 
          stroke="var(--gold, #b8965a)" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
      )}

      {/* Circle markers and labels */}
      {points.map((p, i) => {
        const isCurrent = i === data.length - 1;
        return (
          <g key={i}>
            {/* Value label above the node */}
            <text 
              x={p.x} 
              y={p.y - 10} 
              textAnchor="middle" 
              fontSize="9" 
              fill={isCurrent ? "var(--gold-dark,#8a6e3a)" : "var(--ink-muted,#5a5650)"} 
              fontFamily="Montserrat,sans-serif" 
              fontWeight="600"
            >
              {p.val}%
            </text>

            {/* Circle node */}
            <circle
              cx={p.x}
              cy={p.y}
              r={isCurrent ? 5 : 3.5}
              fill={isCurrent ? "var(--gold, #b8965a)" : "#fff"}
              stroke="var(--gold, #b8965a)"
              strokeWidth={isCurrent ? 2 : 1.5}
            />

            {/* Week label below chart */}
            <text 
              x={p.x} 
              y={h + 18} 
              textAnchor="middle" 
              fontSize="9" 
              fill="var(--ink-light,#9a9490)" 
              fontFamily="Montserrat,sans-serif"
            >
              {labels[i]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
