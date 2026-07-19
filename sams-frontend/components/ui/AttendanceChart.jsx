"use client";
import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from "recharts";

/* ─── Custom Recharts Tooltip ─────────────────────────────────── */
function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'var(--ink, #1a1714)', color: '#fff', padding: '10px 16px',
        borderRadius: 14, fontSize: 12, fontFamily: 'Montserrat, sans-serif',
        boxShadow: '0 8px 24px rgba(26,23,20,0.25)', border: 'none',
      }}>
        <div style={{ fontWeight: 600, marginBottom: 2 }}>{label}</div>
        <div style={{ color: 'var(--gold-light, #d4b07a)', fontSize: 11 }}>
          Attendance: {payload[0].value}%
        </div>
      </div>
    );
  }
  return null;
}

/* ─── Custom Recharts Dot ─────────────────────────────────────── */
function CustomDot(props) {
  const { cx, cy } = props;
  return (
    <circle cx={cx} cy={cy} r={5} fill="#fff" stroke="var(--gold, #b8965a)" strokeWidth={2.5} />
  );
}

export function AttendanceChart({ data, labels }) {
  // Map input data & labels into the array of objects Recharts expects
  const chartData = data.map((val, idx) => ({
    name: labels[idx] || `Wk ${idx + 1}`,
    att: val
  }));

  return (
    <div style={{ width: '100%', height: 260, marginTop: 10 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(26,23,20,0.06)" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fontFamily: 'Montserrat, sans-serif', fill: 'var(--ink-light, #9a9490)' }}
            axisLine={{ stroke: 'rgba(26,23,20,0.08)' }}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fontSize: 11, fontFamily: 'Montserrat, sans-serif', fill: 'var(--ink-light, #9a9490)' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--gold-light, #d4b07a)', strokeDasharray: '4 4' }} />
          <Line
            type="monotone"
            dataKey="att"
            stroke="var(--gold, #b8965a)"
            strokeWidth={2.5}
            dot={<CustomDot />}
            activeDot={{ r: 7, fill: 'var(--gold, #b8965a)', stroke: '#fff', strokeWidth: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
