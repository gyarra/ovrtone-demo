"use client";

import { useState } from "react";
import Link from "next/link";

const WireframeBox = ({ children, className = "", dashed = false, label, height, onClick, style = {} }) => (
  <div
    onClick={onClick}
    className={`relative ${className}`}
    style={{
      border: dashed ? "2px dashed #94a3b8" : "1.5px solid #cbd5e1",
      borderRadius: 8,
      background: dashed ? "repeating-linear-gradient(45deg, #f8fafc, #f8fafc 4px, #f1f5f9 4px, #f1f5f9 8px)" : "#f8fafc",
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
    padding: "4px 8px", background: "#fffbeb", borderRadius: 4, border: "1px solid #fde68a",
    marginTop: 6, lineHeight: 1.4,
  }}>
    ⚡ {children}
  </div>
);

const Note = ({ children }) => (
  <div style={{
    fontSize: 10, color: "#6366f1", fontWeight: 500,
    padding: "4px 8px", background: "#eef2ff", borderRadius: 4, border: "1px solid #c7d2fe",
    marginTop: 4, lineHeight: 1.4,
  }}>
    📝 {children}
  </div>
);

const FieldLabel = ({ children, required }) => (
  <div style={{ fontSize: 11, fontWeight: 700, color: "#475569", marginBottom: 4 }}>
    {children} {required && <span style={{ color: "#ef4444" }}>*</span>}
  </div>
);

const SelectField = ({ label, value, hint }) => (
  <WireframeBox style={{ padding: "8px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <span style={{ fontSize: 12, color: value ? "#334155" : "#94a3b8", fontWeight: value ? 600 : 400 }}>{value || label}</span>
    <span style={{ fontSize: 10, color: "#94a3b8" }}>▾</span>
  </WireframeBox>
);

const CalendarGrid = () => {
  const days = ["M","T","W","T","F","S","S"];
  const cells = Array.from({ length: 35 }, (_, i) => {
    const day = i - 2;
    if (day < 1 || day > 31) return null;
    const booked = [5, 12, 13, 19, 26].includes(day);
    const blocked = [8, 9, 22, 23, 24].includes(day);
    const selected = day === 15;
    const available = !booked && !blocked && !selected;
    return { day, booked, blocked, available, selected };
  });
  return (
    <div style={{ padding: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontSize: 10, color: "#94a3b8", cursor: "pointer" }}>◀</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: "#334155" }}>March 2026</span>
        <span style={{ fontSize: 10, color: "#94a3b8", cursor: "pointer" }}>▶</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2, textAlign: "center" }}>
        {days.map((d, i) => (
          <div key={i} style={{ fontSize: 9, fontWeight: 700, color: "#94a3b8", padding: 3 }}>{d}</div>
        ))}
        {cells.map((c, i) => (
          <div key={i} style={{
            fontSize: 10, padding: 4, borderRadius: 4,
            background: c
              ? (c.selected ? "#1e293b" : c.booked ? "#e2e8f0" : c.blocked ? "#fee2e2" : "#dcfce7")
              : "transparent",
            color: c
              ? (c.selected ? "#fff" : c.booked ? "#94a3b8" : c.blocked ? "#ef4444" : "#16a34a")
              : "transparent",
            fontWeight: c?.available || c?.selected ? 600 : 400,
            cursor: c?.available ? "pointer" : "default",
          }}>
            {c?.day || ""}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 12, marginTop: 8, justifyContent: "center" }}>
        {[["#dcfce7", "Available"], ["#e2e8f0", "Booked"], ["#fee2e2", "Blocked"], ["#1e293b", "Selected"]].map(([bg, label]) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: bg, border: "1px solid #cbd5e1" }} />
            <span style={{ fontSize: 9, color: "#64748b" }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function BookAnArtistWireframe() {
  const [view, setView] = useState("desktop");
  const [screen, setScreen] = useState("booking");

  const isMobile = view === "mobile";
  const containerWidth = isMobile ? 375 : 820;

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
      {/* Header */}
      <div style={{ width: "100%", maxWidth: 880, marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#64748b", textTransform: "uppercase", marginBottom: 2 }}>
              <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>OVRTØNE</Link> · Wireframe
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: 0, letterSpacing: -0.5 }}>
              Book an Artist — {screen === "booking" ? "Booking Flow" : "Confirmation"}
            </h1>
            <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}><Link href="/artists/band-1" style={{ color: "#3b82f6", textDecoration: "none", fontWeight: 600 }}>← Back to artist</Link></div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {/* Screen toggle */}
            <div style={{ display: "flex", gap: 4, background: "#e2e8f0", borderRadius: 8, padding: 3 }}>
              {["booking", "confirmation"].map(s => (
                <button key={s} onClick={() => setScreen(s)} style={{
                  padding: "6px 12px", borderRadius: 6, border: "none", cursor: "pointer",
                  fontSize: 11, fontWeight: 600, textTransform: "capitalize",
                  background: screen === s ? "#fff" : "transparent",
                  color: screen === s ? "#0f172a" : "#64748b",
                  boxShadow: screen === s ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                }}>{s}</button>
              ))}
            </div>
            {/* View toggle */}
            <div style={{ display: "flex", gap: 4, background: "#e2e8f0", borderRadius: 8, padding: 3 }}>
              {["desktop", "mobile"].map(v => (
                <button key={v} onClick={() => setView(v)} style={{
                  padding: "6px 12px", borderRadius: 6, border: "none", cursor: "pointer",
                  fontSize: 11, fontWeight: 600, textTransform: "capitalize",
                  background: view === v ? "#fff" : "transparent",
                  color: view === v ? "#0f172a" : "#64748b",
                  boxShadow: view === v ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                }}>{v}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════ BOOKING FLOW ═══════════════ */}
      {screen === "booking" && (
        <div style={{
          width: containerWidth, maxWidth: "100%",
          background: "#fff", borderRadius: 12, padding: isMobile ? 16 : 28,
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          border: "1px solid #e2e8f0",
          transition: "width 0.3s ease",
        }}>

          {/* ── BACK NAVIGATION ── */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 16, color: "#94a3b8", cursor: "pointer" }}>←</span>
            <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500 }}>Back to artist profile</span>
          </div>

          {/* ── 1. ARTIST SUMMARY CARD ── */}
          <SectionLabel number="1">Artist Summary Card</SectionLabel>
          <WireframeBox style={{ padding: isMobile ? 12 : 16 }}>
            <div style={{
              display: "flex", gap: isMobile ? 10 : 16, alignItems: "center",
            }}>
              {/* Thumbnail */}
              <WireframeBox dashed style={{ width: isMobile ? 64 : 80, height: isMobile ? 64 : 80, flexShrink: 0 }}>
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  height: "100%", fontSize: 9, color: "#94a3b8", textAlign: "center", padding: 4,
                }}>Artist Image</div>
              </WireframeBox>
              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: isMobile ? 16 : 20, fontWeight: 800, color: "#0f172a" }}>The Blue Note Trio</div>
                <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>Jazz</div>
                <div style={{
                  marginTop: 6, padding: "4px 10px", background: "#f1f5f9", borderRadius: 6,
                  fontSize: 13, fontWeight: 700, color: "#0f172a", display: "inline-block",
                }}>
                  $250 / hour
                </div>
              </div>
            </div>
          </WireframeBox>

          {/* ── 2. DATE SELECTION ── */}
          <SectionLabel number="2">Date Selection</SectionLabel>
          <WireframeBox label="Availability Calendar · OpenTable-style">
            <CalendarGrid />
          </WireframeBox>

          {/* ── 3. TIME & DURATION ── */}
          <SectionLabel number="3">Time & Duration Selection</SectionLabel>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
            gap: 10,
          }}>
            <div>
              <FieldLabel required>Start Time</FieldLabel>
              <SelectField value="7:00 PM" />
            </div>
            <div>
              <FieldLabel required>Duration</FieldLabel>
              <SelectField value="3 hours" />
            </div>
            <div>
              <FieldLabel>End Time</FieldLabel>
              <WireframeBox style={{
                padding: "8px 12px", background: "#f1f5f9",
                display: "flex", alignItems: "center",
              }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#334155" }}>10:00 PM</span>
                <span style={{ fontSize: 9, color: "#94a3b8", marginLeft: 6 }}>auto-calculated</span>
              </WireframeBox>
            </div>
          </div>

          {/* ── 4. PRICE BREAKDOWN ── */}
          <SectionLabel number="4">Price Breakdown</SectionLabel>
          <WireframeBox style={{ padding: isMobile ? 12 : 16 }} label="Dynamic · Updates in Real Time">
            <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 10 }}>
              Order Summary
            </div>
            {[
              ["Artist Rate", "$250 / hr"],
              ["Duration", "3 hours"],
              ["Subtotal", "$750.00"],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #f1f5f9" }}>
                <span style={{ fontSize: 12, color: "#64748b" }}>{k}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#334155" }}>{v}</span>
              </div>
            ))}
            {/* Platform fee — reserved space */}
            <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #f1f5f9" }}>
              <span style={{ fontSize: 12, color: "#94a3b8", fontStyle: "italic" }}>Platform Fee</span>
              <span style={{ fontSize: 12, color: "#94a3b8", fontStyle: "italic" }}>TBD</span>
            </div>
            {/* Total */}
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0 4px", marginTop: 4 }}>
              <span style={{ fontSize: 14, fontWeight: 800, color: "#0f172a" }}>Total</span>
              <span style={{ fontSize: 14, fontWeight: 800, color: "#0f172a" }}>$750.00</span>
            </div>
            {/* Fund hold message */}
            <div style={{
              marginTop: 10, padding: "8px 10px", background: "#eef2ff", borderRadius: 6,
              fontSize: 11, color: "#475569", lineHeight: 1.5,
            }}>
              🔒 Your payment is held securely and released to the artist 24 hours after your event.
            </div>
          </WireframeBox>

          {/* ── 5. CANCELLATION POLICY ── */}
          <SectionLabel number="5">Cancellation Policy</SectionLabel>
          <WireframeBox style={{ padding: isMobile ? 12 : 16 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <WireframeBox style={{
                width: 20, height: 20, flexShrink: 0, borderRadius: 4,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontSize: 10, color: "#94a3b8" }}>☐</span>
              </WireframeBox>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#334155", lineHeight: 1.5 }}>
                  I acknowledge and agree to the cancellation policy.
                </div>
                <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 4, lineHeight: 1.5 }}>
                  Cancellation policy text goes here. Specific rules are TBD — placeholder for Airbnb/Rover-style tiered policy.
                </div>
                <div style={{ marginTop: 6 }}>
                  <span style={{ fontSize: 11, color: "#3b82f6", fontWeight: 600, cursor: "pointer" }}>View full cancellation policy →</span>
                </div>
              </div>
            </div>
          </WireframeBox>

          {/* ── 6. TERMS AGREEMENT ── */}
          <SectionLabel number="6">Terms Agreement</SectionLabel>
          <WireframeBox style={{ padding: isMobile ? 12 : 16 }}>
            <div style={{ fontSize: 11, color: "#64748b", lineHeight: 1.6 }}>
              By clicking "Instant Book", I agree to OVRTØNE's{" "}
              <span style={{ color: "#3b82f6", fontWeight: 600, cursor: "pointer" }}>Terms of Service</span>,{" "}
              <span style={{ color: "#3b82f6", fontWeight: 600, cursor: "pointer" }}>Privacy Policy</span>, and{" "}
              <span style={{ color: "#3b82f6", fontWeight: 600, cursor: "pointer" }}>Booking Terms</span>.
            </div>
          </WireframeBox>

          {/* ── 7. STRIPE PAYMENT FORM ── */}
          <SectionLabel number="7">Payment Information</SectionLabel>
          <WireframeBox style={{ padding: isMobile ? 12 : 16 }} label="Stripe Embedded Form">
            <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 12 }}>
              Payment Method
            </div>
            {/* Card number */}
            <FieldLabel required>Card Number</FieldLabel>
            <WireframeBox style={{ padding: "10px 12px", marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12, color: "#94a3b8" }}>1234 5678 9012 3456</span>
                <div style={{ display: "flex", gap: 4 }}>
                  {["💳"].map((c, i) => (
                    <span key={i} style={{ fontSize: 14, opacity: 0.4 }}>{c}</span>
                  ))}
                </div>
              </div>
            </WireframeBox>

            {/* Exp / CVC / Zip row */}
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1fr 1fr",
              gap: 10,
            }}>
              <div>
                <FieldLabel required>Expiration</FieldLabel>
                <WireframeBox style={{ padding: "10px 12px" }}>
                  <span style={{ fontSize: 12, color: "#94a3b8" }}>MM / YY</span>
                </WireframeBox>
              </div>
              <div>
                <FieldLabel required>CVC</FieldLabel>
                <WireframeBox style={{ padding: "10px 12px" }}>
                  <span style={{ fontSize: 12, color: "#94a3b8" }}>123</span>
                </WireframeBox>
              </div>
              {!isMobile && (
                <div>
                  <FieldLabel required>Billing Zip</FieldLabel>
                  <WireframeBox style={{ padding: "10px 12px" }}>
                    <span style={{ fontSize: 12, color: "#94a3b8" }}>10001</span>
                  </WireframeBox>
                </div>
              )}
            </div>
            {isMobile && (
              <div style={{ marginTop: 10 }}>
                <FieldLabel required>Billing Zip</FieldLabel>
                <WireframeBox style={{ padding: "10px 12px" }}>
                  <span style={{ fontSize: 12, color: "#94a3b8" }}>10001</span>
                </WireframeBox>
              </div>
            )}

            {/* Accepted cards */}
            <div style={{ marginTop: 12, display: "flex", gap: 6, alignItems: "center" }}>
              <span style={{ fontSize: 9, color: "#94a3b8" }}>Accepted:</span>
              {["Visa", "MC", "Amex", "Discover"].map(c => (
                <Tag key={c} color="#f1f5f9" textColor="#94a3b8">{c}</Tag>
              ))}
            </div>
          </WireframeBox>

          {/* ── 8. INSTANT BOOK CTA ── */}
          <SectionLabel number="8">Instant Book CTA</SectionLabel>
          <WireframeBox style={{
            padding: isMobile ? 12 : 16,
            background: "#0f172a", borderColor: "#0f172a",
            borderRadius: 10,
          }}>
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              flexDirection: isMobile ? "column" : "row", gap: 10,
            }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>
                  Total: $750.00
                </div>
                <div style={{ fontSize: 10, color: "#64748b" }}>
                  The Blue Note Trio · Sat, Mar 15 · 7:00–10:00 PM
                </div>
              </div>
              <button
                onClick={() => setScreen("confirmation")}
                style={{
                  padding: "12px 40px", background: "#3b82f6", borderRadius: 8,
                  color: "#fff", fontSize: 14, fontWeight: 700, textAlign: "center",
                  width: isMobile ? "100%" : "auto", cursor: "pointer", border: "none",
                }}
              >
                Instant Book
              </button>
            </div>
          </WireframeBox>

          {/* ── ERROR STATE EXAMPLE ── */}
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#475569", marginBottom: 6 }}>
              Error State <span style={{ fontWeight: 400, color: "#94a3b8" }}>(shown on payment failure)</span>
            </div>
            <WireframeBox style={{ padding: 12, borderColor: "#fca5a5", background: "#fef2f2" }}>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <span style={{ fontSize: 14 }}>⚠️</span>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#dc2626" }}>Payment could not be processed</div>
                  <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>Please check your card details and try again. Your date and time selections have been preserved.</div>
                </div>
              </div>
            </WireframeBox>
          </div>

        </div>
      )}

      {/* ═══════════════ CONFIRMATION SCREEN ═══════════════ */}
      {screen === "confirmation" && (
        <div style={{
          width: containerWidth, maxWidth: "100%",
          background: "#fff", borderRadius: 12, padding: isMobile ? 16 : 28,
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          border: "1px solid #e2e8f0",
          transition: "width 0.3s ease",
        }}>

          {/* ── 9. CONFIRMATION HEADER ── */}
          <SectionLabel number="9">Booking Confirmation</SectionLabel>

          {/* Success banner */}
          <WireframeBox style={{
            padding: isMobile ? 16 : 24,
            background: "#f0fdf4", borderColor: "#86efac",
            textAlign: "center",
          }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>✓</div>
            <div style={{ fontSize: isMobile ? 18 : 22, fontWeight: 800, color: "#0f172a" }}>Booking Confirmed!</div>
            <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>
              Booking ID: <span style={{ fontWeight: 700, color: "#334155" }}>OVR-2026-03-15-A7X</span>
            </div>
          </WireframeBox>

          {/* Booking details card */}
          <div style={{ marginTop: 16 }}>
            <WireframeBox style={{ padding: isMobile ? 12 : 16 }}>
              <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 16 }}>
                <WireframeBox dashed style={{ width: 56, height: 56, flexShrink: 0 }}>
                  <div style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    height: "100%", fontSize: 8, color: "#94a3b8", textAlign: "center",
                  }}>Image</div>
                </WireframeBox>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: "#0f172a" }}>The Blue Note Trio</div>
                  <div style={{ fontSize: 11, color: "#64748b" }}>Jazz</div>
                </div>
              </div>
              {[
                ["Date", "Saturday, March 15, 2026"],
                ["Time", "7:00 PM – 10:00 PM (3 hours)"],
                ["Total Paid", "$750.00"],
                ["Payment", "Visa ending in 3456"],
                ["Status", "Confirmed — Payment held securely"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid #f1f5f9" }}>
                  <span style={{ fontSize: 12, color: "#64748b" }}>{k}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#334155", textAlign: "right" }}>{v}</span>
                </div>
              ))}
            </WireframeBox>
          </div>

          {/* Primary CTA: Go to Messages */}
          <div style={{
            marginTop: 16, padding: "12px 0",
            display: "flex", gap: 10,
            flexDirection: isMobile ? "column" : "row",
          }}>
            <Link href="/messages" style={{
              flex: 1, padding: "12px 24px", background: "#3b82f6", borderRadius: 8,
              color: "#fff", fontSize: 14, fontWeight: 700, textAlign: "center", cursor: "pointer",
              textDecoration: "none",
            }}>
              Go to Messages
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
