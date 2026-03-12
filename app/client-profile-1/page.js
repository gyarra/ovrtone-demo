"use client";

// ════════════════════════════════════════════════════════════════
// OVRTØNE Wireframe: Client Profile Page
//
// Page:     Client Profile (public, artist-facing, read-only)
// Sections: 8 numbered sections
// Source:   Client Profile Brainstorm — March 2026
// ════════════════════════════════════════════════════════════════

import { useState } from "react";
import Link from "next/link";

// ── Primitives ────────────────────────────────────────────────

const WireframeBox = ({ children, className = "", dashed = false, label, height, onClick, style = {} }) => (
  <div
    onClick={onClick}
    className={`relative ${className}`}
    style={{
      border: dashed ? "2px dashed #94a3b8" : "1.5px solid #cbd5e1",
      borderRadius: 8,
      background: dashed
        ? "repeating-linear-gradient(45deg, #f8fafc, #f8fafc 4px, #f1f5f9 4px, #f1f5f9 8px)"
        : "#f8fafc",
      minHeight: height || "auto",
      cursor: onClick ? "pointer" : "default",
      ...style,
    }}
  >
    {label && (
      <span style={{
        position: "absolute", top: -10, left: 12,
        background: "#fff", padding: "0 6px",
        fontSize: 10, fontWeight: 700, letterSpacing: 1.2,
        color: "#64748b", textTransform: "uppercase",
      }}>{label}</span>
    )}
    {children}
  </div>
);

const Tag = ({ children, color = "#e2e8f0", textColor = "#334155" }) => (
  <span style={{
    display: "inline-block", padding: "3px 10px", borderRadius: 20,
    background: color, color: textColor, fontSize: 11, fontWeight: 600,
    marginRight: 4, marginBottom: 4, letterSpacing: 0.3,
  }}>{children}</span>
);

const SectionLabel = ({ children, number }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "28px 0 12px" }}>
    <span style={{
      width: 26, height: 26, borderRadius: "50%", background: "#1e293b",
      color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 12, fontWeight: 700, flexShrink: 0,
    }}>{number}</span>
    <span style={{ fontSize: 14, fontWeight: 700, color: "#1e293b", letterSpacing: 0.5, textTransform: "uppercase" }}>
      {children}
    </span>
    <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
  </div>
);

const Annotation = ({ children }) => (
  <div style={{
    fontSize: 10, color: "#f59e0b", fontWeight: 600, fontStyle: "italic",
    padding: "4px 8px", background: "#fffbeb", borderRadius: 4,
    border: "1px solid #fde68a", marginTop: 6, lineHeight: 1.4,
  }}>
    ⚡ {children}
  </div>
);

const Note = ({ children }) => (
  <div style={{
    fontSize: 10, color: "#6366f1", fontWeight: 500,
    padding: "4px 8px", background: "#eef2ff", borderRadius: 4,
    border: "1px solid #c7d2fe", marginTop: 4, lineHeight: 1.4,
  }}>
    📝 {children}
  </div>
);

// ── Main Component ─────────────────────────────────────────────

export default function ClientProfileWireframe() {
  const [view, setView] = useState("desktop");
  const isMobile = view === "mobile";
  const containerWidth = isMobile ? 375 : 820;

  const photos = Array.from({ length: 9 }, (_, i) => i);
  const completionItems = [
    { label: "Venue name", done: true },
    { label: "Photos", done: true },
    { label: "Who are we?", done: true },
    { label: "Working with us", done: false },
    { label: "Address", done: true },
    { label: "Venue type", done: true },
    { label: "Website URL", done: false },
  ];
  const completePct = Math.round((completionItems.filter(i => i.done).length / completionItems.length) * 100);

  return (
    <div style={{
      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
      background: "#f1f5f9",
      minHeight: "100vh",
      padding: isMobile ? "16px 8px" : "24px 16px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}>

      {/* ── PAGE HEADER ── */}
      <div style={{ width: "100%", maxWidth: 880, marginBottom: 20 }}>
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between", flexWrap: "wrap", gap: 12,
        }}>
          <div>
            <div style={{
              fontSize: 11, fontWeight: 700, letterSpacing: 2,
              color: "#64748b", textTransform: "uppercase", marginBottom: 2,
            }}>
              <Link href="/" style={{ color: "#64748b", textDecoration: "none" }}>OVRTØNE</Link> · Wireframe
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: 0, letterSpacing: -0.5 }}>
              Client Profile Page
            </h1>
            <div style={{ fontSize: 11, marginTop: 2 }}>
              <Link href="/" style={{ color: "#3b82f6", textDecoration: "none", fontWeight: 600 }}>← Back to home</Link>
            </div>
          </div>
          <div style={{ display: "flex", gap: 4, background: "#e2e8f0", borderRadius: 8, padding: 3 }}>
            {["desktop", "mobile"].map(v => (
              <button key={v} onClick={() => setView(v)} style={{
                padding: "6px 16px", borderRadius: 6, border: "none", cursor: "pointer",
                fontSize: 12, fontWeight: 600, textTransform: "capitalize",
                background: view === v ? "#fff" : "transparent",
                color: view === v ? "#0f172a" : "#64748b",
                boxShadow: view === v ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
              }}>{v}</button>
            ))}
          </div>
        </div>
      </div>

      {/* ── WIREFRAME CONTAINER ── */}
      <div style={{
        width: containerWidth, maxWidth: "100%",
        background: "#fff", borderRadius: 12,
        padding: isMobile ? 16 : 28,
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        border: "1px solid #e2e8f0",
        transition: "width 0.3s ease",
      }}>

        {/* ── 1. IDENTITY BAR ── */}
        <SectionLabel number="1">Identity Bar</SectionLabel>
        <WireframeBox style={{ padding: isMobile ? 12 : 16 }}>
          <div style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "center",
            gap: isMobile ? 12 : 16,
          }}>
            {/* Avatar / Logo */}
            <WireframeBox dashed style={{
              width: isMobile ? 64 : 80, height: isMobile ? 64 : 80,
              flexShrink: 0, display: "flex",
              alignItems: "center", justifyContent: "center",
              borderRadius: 10,
            }}>
              <span style={{ fontSize: 22, opacity: 0.4 }}>🏛️</span>
            </WireframeBox>

            {/* Name + meta */}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: isMobile ? 17 : 20, fontWeight: 800, color: "#0f172a", letterSpacing: -0.3 }}>
                The Velvet Lounge
              </div>
              <div style={{ fontSize: 11, color: "#64748b", marginTop: 2, marginBottom: 6 }}>
                📍 Williamsburg, Brooklyn, NY
              </div>
              <div>
                <Tag color="#dbeafe" textColor="#1e40af">Bar / Lounge</Tag>
                <Tag color="#dcfce7" textColor="#166534">Verified Venue</Tag>
                <Tag>Recurring Host</Tag>
              </div>
            </div>

            {/* Stats */}
            {!isMobile && (
              <div style={{
                display: "flex", gap: 20, flexShrink: 0,
                borderLeft: "1px solid #f1f5f9", paddingLeft: 20,
              }}>
                {[
                  ["🎶", "47", "Bookings"],
                  ["🗓️", "Mar 2024", "Member since"],
                  ["👥", "50–100", "Audience size"],
                ].map(([icon, val, lbl]) => (
                  <div key={lbl} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 11, marginBottom: 2 }}>{icon}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#1e293b" }}>{val}</div>
                    <div style={{ fontSize: 9, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.5 }}>{lbl}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mobile stats row */}
          {isMobile && (
            <div style={{ display: "flex", gap: 16, marginTop: 10, paddingTop: 10, borderTop: "1px solid #f1f5f9" }}>
              {[["🎶 47 Bookings"], ["👥 50–100 cap"], ["🗓️ Since Mar '24"]].map(s => (
                <div key={s[0]} style={{ fontSize: 10, color: "#64748b" }}>{s[0]}</div>
              ))}
            </div>
          )}
        </WireframeBox>

        {/* ── 2. PHOTO GALLERY ── */}
        <SectionLabel number="2">Photo Gallery</SectionLabel>
        {/* Hero photo */}
        <WireframeBox dashed height={isMobile ? 160 : 200} label="Primary / Hero Photo">
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            height: "100%", flexDirection: "column", gap: 6,
          }}>
            <div style={{ fontSize: 32, opacity: 0.4 }}>🖼️</div>
            <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600 }}>Primary venue photo</div>
            <div style={{ fontSize: 9, color: "#cbd5e1" }}>Shown large · Set as primary via drag-to-reorder</div>
          </div>
        </WireframeBox>

        {/* Photo grid — remaining 8 */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(3, 1fr)" : "repeat(5, 1fr)",
          gap: 6, marginTop: 6,
        }}>
          {photos.map(i => (
            <WireframeBox key={i} dashed height={isMobile ? 56 : 72}>
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                height: "100%", fontSize: 9, color: "#94a3b8",
              }}>
                Photo {i + 2}
              </div>
            </WireframeBox>
          ))}
          {/* Add photo slot */}
          <WireframeBox dashed height={isMobile ? 56 : 72} style={{ border: "2px dashed #cbd5e1" }}>
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              height: "100%", fontSize: 16, color: "#cbd5e1",
            }}>+</div>
          </WireframeBox>
        </div>

        {/* ── 3. WHO ARE WE? ── */}
        <SectionLabel number="3">Who Are We?</SectionLabel>
        <WireframeBox style={{ padding: isMobile ? 12 : 16 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>
            About This Venue
          </div>
          {/* Simulated paragraph text blocks */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              "We're a rooftop cocktail lounge in Williamsburg featuring live jazz three nights a week.",
              "Our intimate space seats up to 80 guests and has been hosting independent artists since 2019.",
            ].map((txt, i) => (
              <div key={i} style={{
                background: "#f1f5f9", borderRadius: 4, padding: "8px 10px",
                fontSize: 12, color: "#475569", lineHeight: 1.6,
              }}>{txt}</div>
            ))}
            <div style={{ height: 12, background: "#f1f5f9", borderRadius: 3, width: "55%" }} />
          </div>
          <div style={{ marginTop: 8, fontSize: 9, color: "#cbd5e1", textAlign: "right" }}>
            847 / 2,000 characters
          </div>
        </WireframeBox>

        {/* ── 4. WORKING WITH US ── */}
        <SectionLabel number="4">Information About Working With Us</SectionLabel>
        <WireframeBox style={{ padding: isMobile ? 12 : 16 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>
            Practical Details for Artists
          </div>
          <div style={{ fontSize: 12, color: "#475569", lineHeight: 1.9 }}>
            {[
              "🎙️ Stage: 12×10 ft raised platform, can accommodate up to 6 performers",
              "🔊 PA system provided (Yamaha DZR12) · 2× floor monitors",
              "🅿️ Load-in via rear alley on Bedford Ave · Street parking available",
              "⏰ Sound check: 30 min before doors open · Venue opens at 8 PM",
              "🍽️ Meals provided for all performers",
              "🚫 Noise curfew: 1:00 AM · No amplified music after midnight on weekdays",
            ].map((item, i) => (
              <div key={i} style={{
                padding: "4px 0",
                borderBottom: i < 5 ? "1px solid #f8fafc" : "none",
              }}>{item}</div>
            ))}
          </div>
          <div style={{ marginTop: 8, fontSize: 9, color: "#cbd5e1", textAlign: "right" }}>
            612 / 2,000 characters
          </div>
        </WireframeBox>

        {/* ── 5. VENUE DETAILS ── */}
        <SectionLabel number="5">Venue Details</SectionLabel>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: 10,
        }}>
          {/* Left: key-value pairs */}
          <WireframeBox style={{ padding: isMobile ? 12 : 16 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>
              Venue Info
            </div>
            {[
              ["Venue Type", "Bar / Lounge"],
              ["Audience Size", "50–100 guests"],
              ["Contact Name", "Marcus Rivera"],
              ["Member Since", "March 2024"],
              ["Total Bookings", "47 completed"],
            ].map(([k, v]) => (
              <div key={k} style={{
                display: "flex", justifyContent: "space-between",
                padding: "5px 0", borderBottom: "1px solid #f8fafc",
              }}>
                <span style={{ fontSize: 11, color: "#64748b" }}>{k}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#334155" }}>{v}</span>
              </div>
            ))}
          </WireframeBox>

          {/* Right: links + tags */}
          <WireframeBox style={{ padding: isMobile ? 12 : 16 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>
              Links & Tags
            </div>
            <div style={{ padding: "5px 0", borderBottom: "1px solid #f8fafc", fontSize: 11, color: "#475569" }}>
              🔗 thevelvetlounge.nyc
            </div>
            <div style={{ marginTop: 10 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>
                Music Genres Typically Booked
              </div>
              <div>
                <Tag>Jazz</Tag>
                <Tag>Soul</Tag>
                <Tag>R&B</Tag>
                <Tag>Blues</Tag>
                <Tag>Funk</Tag>
              </div>
            </div>
            <div style={{ marginTop: 10 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>
                Event Types
              </div>
              <div>
                <Tag color="#fffbeb" textColor="#92400e">Live Performance</Tag>
                <Tag color="#fffbeb" textColor="#92400e">Private Hire</Tag>
              </div>
            </div>
          </WireframeBox>
        </div>

        {/* ── 6. ADDRESS ── */}
        <SectionLabel number="6">Address</SectionLabel>
        <WireframeBox style={{ padding: isMobile ? 12 : 16 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 10 }}>
            Venue Address
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
            <div style={{ fontSize: 20, marginTop: 2 }}>📍</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#1e293b" }}>The Velvet Lounge</div>
              <div style={{ fontSize: 13, color: "#475569", lineHeight: 1.7 }}>
                387 Bedford Avenue<br />
                Brooklyn, NY 11211
              </div>
              <div style={{ marginTop: 6 }}>
                <Tag color="#dcfce7" textColor="#166534">Full address visible</Tag>
              </div>
            </div>
          </div>
          {/* No map placeholder — out of scope */}
          <div style={{
            marginTop: 12, padding: "8px 12px",
            background: "#f8fafc", borderRadius: 6, border: "1px solid #e2e8f0",
            fontSize: 10, color: "#94a3b8", textAlign: "center",
          }}>
            Map integration — out of scope for MVP · Address displayed as text only
          </div>
        </WireframeBox>
      </div>
    </div>
  );
}
