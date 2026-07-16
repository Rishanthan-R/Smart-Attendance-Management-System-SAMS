"use client";
import React from "react";
import StatusBadge from "./StatusBadge";
import { IconAlertCircle } from "../ui/Icons";

export default function AttendanceTable({ records = [] }) {
  return (
    <div className="sams-table-wrap">
      <table className="sams-table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Reg. Number</th>
            <th>Check-in Time</th>
            <th>GPS Distance</th>
            <th>Verification</th>
          </tr>
        </thead>
        <tbody>
          {records.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "36px 0", color: "var(--ink-light)" }}>
                No attendance logs found for this query.
              </td>
            </tr>
          ) : (
            records.map((r, idx) => {
              const distanceNum = parseFloat(r.distance);
              const isFar = distanceNum > 50;

              return (
                <tr key={r.id || idx} style={{
                  animation: idx === 0 ? "fade-up 0.5s ease-out forwards" : "none"
                }}>
                  {/* Name */}
                  <td style={{ fontWeight: 500, color: "var(--ink)" }}>{r.name}</td>
                  
                  {/* Registration Number */}
                  <td style={{ fontFamily: "monospace" }}>{r.regNumber}</td>
                  
                  {/* Check-in Time */}
                  <td>{r.time}</td>
                  
                  {/* GPS Distance */}
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ color: isFar ? "#c0392b" : "inherit" }}>
                        {r.distance}m
                      </span>
                      {isFar && (
                        <span 
                          title="GPS mismatch: Student reported outside hall parameters"
                          style={{ color: "#c0392b", display: "flex" }}
                        >
                          <IconAlertCircle size={13} />
                        </span>
                      )}
                    </div>
                  </td>
                  
                  {/* Status badge */}
                  <td>
                    <StatusBadge status={r.status || (isFar ? "GPS Rejected" : "Verified")} />
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
