"use client";

import { useState } from "react";

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

const Annotation = ({ children, side = "right" }) => (
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

const CalendarGrid = () => {
  const days = ["M","T","W","T","F","S","S"];
  const cells = Array.from({ length: 35 }, (_, i) => {
    const day = i - 2;
    if (day < 1 || day > 31) return null;
    const booked = [5, 12, 19].includes(day);
    const blocked = [8, 9, 22, 23, 24].includes(day);
    const available = !booked && !blocked;
    return { day, booked, blocked, available };
  });
  return (
    <div style={{ padding: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontSize: 10, color: "#94a3b8" }}>◀</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: "#334155" }}>March 2026</span>
        <span style={{ fontSize: 10, color: "#94a3b8" }}>▶</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2, textAlign: "center" }}>
        {days.map((d, i) => (
          <div key={i} style={{ fontSize: 9, fontWeight: 700, color: "#94a3b8", padding: 3 }}>{d}</div>
        ))}
        {cells.map((c, i) => (
          <div key={i} style={{
            fontSize: 10, padding: 4, borderRadius: 4,
            background: c ? (c.booked ? "#e2e8f0" : c.blocked ? "#fee2e2" : "#dcfce7") : "transparent",
            color: c ? (c.booked ? "#94a3b8" : c.blocked ? "#ef4444" : "#16a34a") : "transparent",
            fontWeight: c?.available ? 600 : 400,
          }}>
            {c?.day || ""}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 12, marginTop: 8, justifyContent: "center" }}>
        {[["#dcfce7", "Available"], ["#e2e8f0", "Booked"], ["#fee2e2", "Blocked"]].map(([bg, label]) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: bg, border: "1px solid #cbd5e1" }} />
            <span style={{ fontSize: 9, color: "#64748b" }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function ArtistProfileWireframe() {
  const [view, setView] = useState("desktop");

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
              OVRTØNE · Wireframe
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: 0, letterSpacing: -0.5 }}>
              Artist Profile Page
            </h1>
            <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>Public view · Client-facing · Read-only</div>
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

      {/* Wireframe Container */}
      <div style={{
        width: containerWidth, maxWidth: "100%",
        background: "#fff", borderRadius: 12, padding: isMobile ? 16 : 28,
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        border: "1px solid #e2e8f0",
        transition: "width 0.3s ease",
      }}>

        {/* ── 1. HERO SECTION ── */}
        <SectionLabel number="1">Hero Section</SectionLabel>
        <WireframeBox height={isMobile ? 180 : 220} label="Primary Photo / Cover Image">
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            height: "100%", color: "#94a3b8", fontSize: 13, fontWeight: 500,
          }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, marginBottom: 4 }}>🖼️</div>
              <div>Primary Photo from Gallery</div>
              <div style={{ fontSize: 10, color: "#cbd5e1" }}>Artist selects which photo is &quot;primary&quot;</div>
            </div>
          </div>
        </WireframeBox>

        {/* Artist Identity Bar */}
        <div style={{
          display: "flex", gap: isMobile ? 10 : 16, alignItems: "flex-start",
          marginTop: 16, flexDirection: isMobile ? "column" : "row",
        }}>
          {/* Avatar */}
          <WireframeBox style={{ width: isMobile ? 64 : 80, height: isMobile ? 64 : 80, flexShrink: 0 }}>
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              height: "100%", fontSize: 10, color: "#94a3b8", textAlign: "center", padding: 4,
            }}>Avatar</div>
          </WireframeBox>

          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Name + Badges */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <div style={{ fontSize: isMobile ? 18 : 22, fontWeight: 800, color: "#0f172a" }}>Band Name</div>
              <Tag color="#dbeafe" textColor="#1e40af">✓ Verified</Tag>
              <Tag color="#dcfce7" textColor="#166534">🛡 Insured</Tag>
            </div>
            {/* Tagline */}
            <div style={{ fontSize: 13, color: "#64748b", fontStyle: "italic", marginTop: 4 }}>
              &quot;NYC&apos;s Premier Jazz Trio — Crafting Unforgettable Moments&quot;
            </div>
            {/* Genre Tags */}
            <div style={{ marginTop: 8 }}>
              <Tag>Jazz</Tag><Tag>Soul</Tag><Tag>Funk</Tag>
            </div>
            {/* Key Stats */}
            <div style={{ display: "flex", gap: isMobile ? 12 : 20, marginTop: 10, flexWrap: "wrap" }}>
              {[
                ["👍 95%", "24 reviews"],
                ["🎵", "5-piece"],
                ["📅", "Member since Jan 2026"],
                ["🎤", "18 completed gigs"],
              ].map(([icon, label]) => (
                <div key={label} style={{ fontSize: 11, color: "#475569" }}>
                  <span style={{ fontWeight: 700 }}>{icon}</span> {label}
                </div>
              ))}
            </div>
            <Note>Pricing NOT visible to non-logged-in users. Show &quot;$X/hr&quot; only to authenticated clients.</Note>
            <div style={{
              marginTop: 8, padding: "6px 12px", background: "#f1f5f9", borderRadius: 6,
              fontSize: 13, fontWeight: 700, color: "#0f172a", display: "inline-block",
            }}>
              $250 / hour <span style={{ fontWeight: 400, fontSize: 11, color: "#64748b" }}>· 2hr minimum</span>
            </div>
            <Annotation>Minimum booking hours: artist toggles yes/no. If yes → shows minimum.</Annotation>
          </div>
        </div>

        {/* ── 2. MEDIA GALLERY ── */}
        <SectionLabel number="2">Media Gallery</SectionLabel>
        <Note>Videos first, then photos (per SOW). Artists can reorder within each section.</Note>

        {/* Videos */}
        <div style={{ fontSize: 11, fontWeight: 700, color: "#475569", marginBottom: 6, marginTop: 8 }}>
          Videos <span style={{ fontWeight: 400, color: "#94a3b8" }}>(max 2)</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 10 }}>
          {[1, 2].map(i => (
            <WireframeBox key={i} height={isMobile ? 140 : 170} dashed>
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                height: "100%", flexDirection: "column", gap: 4,
              }}>
                <div style={{ fontSize: 32, opacity: 0.4 }}>▶</div>
                <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600 }}>Video {i}</div>
                <div style={{ fontSize: 9, color: "#cbd5e1" }}>Click-to-play · Self-hosted or YouTube embed</div>
              </div>
            </WireframeBox>
          ))}
        </div>
        <Annotation>YouTube integration: embed within Ovrtone (no redirect). Self-hosted preferred for UX consistency.</Annotation>

        {/* Photos */}
        <div style={{ fontSize: 11, fontWeight: 700, color: "#475569", marginBottom: 6, marginTop: 16 }}>
          Photos <span style={{ fontWeight: 400, color: "#94a3b8" }}>(min 3, max 5)</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(3, 1fr)" : "repeat(5, 1fr)", gap: 8 }}>
          {[1, 2, 3, 4, 5].map(i => (
            <WireframeBox key={i} height={isMobile ? 70 : 90} dashed>
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                height: "100%", fontSize: 9, color: "#94a3b8", textAlign: "center", padding: 4,
              }}>
                {i === 1 ? "★ Primary" : `Photo ${i}`}
              </div>
            </WireframeBox>
          ))}
        </div>
        <Note>Hero image is within the gallery. Artist selects one as &quot;primary&quot; (shown in Hero Section above).</Note>

        {/* ── 3. KEY DETAILS BAR ── */}
        <SectionLabel number="3">Key Details Bar</SectionLabel>
        <WireframeBox style={{ padding: isMobile ? 12 : 16 }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1fr 1fr 1fr",
            gap: 12,
          }}>
            {[
              ["Genre", "Jazz · Soul · Funk", "Multi-select tags"],
              ["Band Size", "5-piece", "Solo / Duo / Trio / etc."],
              ["Event Types", "Weddings · Corporate · Bars", "What they typically play"],
              ["Languages", "English · Spanish", "Languages sung"],
            ].map(([title, value, note]) => (
              <div key={title}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.5 }}>{title}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#1e293b", marginTop: 2 }}>{value}</div>
                <div style={{ fontSize: 9, color: "#cbd5e1" }}>{note}</div>
              </div>
            ))}
          </div>
        </WireframeBox>

        {/* ── 4. ABOUT US ── */}
        <SectionLabel number="4">About Us</SectionLabel>
        <WireframeBox style={{ padding: isMobile ? 12 : 16 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>About Us</div>
          <div style={{ height: 60, background: "#f1f5f9", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 11, color: "#94a3b8" }}>Free-text description · Multiple paragraphs</span>
          </div>
          <Note>Separate tagline field vs. About Us body text. Character limit TBD.</Note>
        </WireframeBox>

        {/* ── 5. SET LISTS ── */}
        <SectionLabel number="5">Set Lists</SectionLabel>
        <WireframeBox style={{ padding: isMobile ? 12 : 16 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>Set Lists</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["Cocktail Hour Set · 60min", "Dance Set · 90min", "Dinner Set · 60min"].map(s => (
              <WireframeBox key={s} dashed style={{ padding: "10px 14px", flex: isMobile ? "1 1 100%" : "1 1 auto" }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#334155" }}>{s}</div>
                <div style={{ fontSize: 9, color: "#94a3b8", marginTop: 2 }}>📄 PDF / JPEG upload</div>
              </WireframeBox>
            ))}
          </div>
          <Annotation>Format: PDF/JPEG uploads. Multiple set lists with duration indicators. Custom requests via post-booking messaging.</Annotation>
        </WireframeBox>

        {/* ── 6. GIG REQUIREMENTS ── */}
        <SectionLabel number="6">Gig Requirements</SectionLabel>
        <WireframeBox style={{ padding: isMobile ? 12 : 16 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>Gig Requirements</div>
          <div style={{ fontSize: 12, color: "#475569", lineHeight: 1.8 }}>
            {["⚡ Power supply (2 standard outlets minimum)", "🅿️ Parking / load-in access", "📐 Minimum stage area: 10×8 ft",
              "🔊 Sound check: 30 min before event", "🍽️ Meals provided for 5 performers"].map(r => (
              <div key={r}>{r}</div>
            ))}
          </div>
          <Note>Free-text with bullet points. Platform provides common requirement suggestions as prompts.</Note>
        </WireframeBox>

        {/* ── 7. AVAILABILITY CALENDAR ── */}
        <SectionLabel number="7">Availability Calendar</SectionLabel>
        <WireframeBox label="Monthly Grid · Calendly-style">
          <CalendarGrid />
          <div style={{ padding: "0 12px 8px", borderTop: "1px solid #f1f5f9", marginTop: 4, paddingTop: 8 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>Available Hours</div>
            <div style={{ fontSize: 12, color: "#334155", fontWeight: 600 }}>6:00 PM – 11:00 PM</div>
            <div style={{ fontSize: 9, color: "#94a3b8" }}>One set of available hours per day (no multiple time slots)</div>
          </div>
          <Annotation>Up to 1 year out. Past dates hidden. Booking indicators visible to logged-in users only. Auto-hide from search when unavailable.</Annotation>
        </WireframeBox>

        {/* ── 8. REVIEWS ── */}
        <SectionLabel number="8">Reviews (Thumbs Up / Down)</SectionLabel>
        <WireframeBox style={{ padding: isMobile ? 12 : 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#16a34a" }}>95%</div>
              <div style={{ fontSize: 10, color: "#64748b" }}>positive</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
                <div style={{ flex: 95, height: 8, background: "#dcfce7", borderRadius: 4 }} />
                <div style={{ flex: 5, height: 8, background: "#fee2e2", borderRadius: 4 }} />
              </div>
              <div style={{ fontSize: 11, color: "#94a3b8" }}>👍 23 · 👎 1 · 24 total reviews</div>
            </div>
          </div>
          {/* Individual reviews */}
          <div style={{ marginTop: 12, borderTop: "1px solid #f1f5f9", paddingTop: 12 }}>
            {[
              { name: "The Velvet Lounge", thumb: "👍", text: "Placeholder review text", date: "Feb 2026" },
              { name: "Sarah M.", thumb: "👍", text: "Placeholder review text", date: "Jan 2026" },
            ].map((r, i) => (
              <div key={i} style={{
                display: "flex", gap: 10, alignItems: "flex-start",
                padding: "8px 0", borderBottom: i < 1 ? "1px solid #f8fafc" : "none",
              }}>
                <div style={{ fontSize: 18 }}>{r.thumb}</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#334155" }}>{r.name}</div>
                  <div style={{ fontSize: 10, color: "#94a3b8" }}>{r.date}</div>
                  <div style={{
                    fontSize: 11, color: "#64748b", marginTop: 2,
                    height: 14, background: "#f1f5f9", borderRadius: 3, width: isMobile ? 160 : 300,
                  }} />
                </div>
              </div>
            ))}
          </div>
          <Note>Placement near header (summary) + full section here. Minimum bookings before display TBD.</Note>
        </WireframeBox>

        {/* ── 9. ADDITIONAL DETAILS ── */}
        <SectionLabel number="9">Additional Details</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 10 }}>
          <WireframeBox style={{ padding: 12 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Performance Details</div>
            {[
              ["Setup/Breakdown", "45 min before · 30 min after"],
              ["Performers", "5 musicians"],
              ["Duration Options", "1hr · 2hr · 3hr · 4+hr"],
              ["Booking Lead Time", "Book at least 7 days in advance"],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: "1px solid #f8fafc" }}>
                <span style={{ fontSize: 11, color: "#64748b" }}>{k}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#334155" }}>{v}</span>
              </div>
            ))}
          </WireframeBox>
          <WireframeBox style={{ padding: 12 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Links & Social</div>
            {["🔗 Website", "📸 Instagram", "🎵 Spotify", "📺 YouTube", "🎶 SoundCloud"].map(l => (
              <div key={l} style={{
                padding: "4px 0", fontSize: 11, color: "#475569",
                borderBottom: "1px solid #f8fafc",
              }}>{l}</div>
            ))}
            <div style={{ marginTop: 8, fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>Service Area</div>
            <div style={{ fontSize: 11, color: "#475569" }}>📍 Manhattan, Brooklyn, Queens</div>
            <Note>Optional location blurb. e.g. &quot;Will not travel to the Bronx&quot;</Note>
          </WireframeBox>
        </div>

        {/* ── 10. STICKY BOOKING CTA ── */}
        <SectionLabel number="10">Sticky Booking CTA</SectionLabel>
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
                $250 / hour <span style={{ fontSize: 11, fontWeight: 400, color: "#94a3b8" }}>· 2hr min</span>
              </div>
              <div style={{ fontSize: 10, color: "#64748b" }}>Logged-in users only</div>
            </div>
            <div style={{
              padding: "10px 32px", background: "#3b82f6", borderRadius: 8,
              color: "#fff", fontSize: 14, fontWeight: 700, textAlign: "center",
              width: isMobile ? "100%" : "auto",
            }}>
              Book This Artist
            </div>
          </div>
          <Annotation>Sticky bottom bar on mobile. Fixed sidebar or sticky header on desktop. Button text TBD — &quot;Book This Artist&quot; / &quot;Instant Book&quot; / &quot;Book Now&quot;.</Annotation>
        </WireframeBox>

        {/* ── REPORT ── */}
        <div style={{ textAlign: "center", marginTop: 20, paddingTop: 12, borderTop: "1px solid #f1f5f9" }}>
          <span style={{ fontSize: 10, color: "#cbd5e1", cursor: "pointer" }}>🚩 Report this profile</span>
        </div>

      </div>

      {/* Legend */}
      <div style={{
        width: containerWidth, maxWidth: "100%", marginTop: 20,
        background: "#fff", borderRadius: 10, padding: 16,
        border: "1px solid #e2e8f0",
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#334155", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.8 }}>
          Wireframe Legend
        </div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", fontSize: 10, color: "#64748b" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 20, height: 14, border: "1.5px solid #cbd5e1", borderRadius: 3, background: "#f8fafc" }} />
            Content block
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 20, height: 14, border: "2px dashed #94a3b8", borderRadius: 3, background: "repeating-linear-gradient(45deg, #f8fafc, #f8fafc 2px, #f1f5f9 2px, #f1f5f9 4px)" }} />
            Media placeholder
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 20, height: 14, borderRadius: 3, background: "#fffbeb", border: "1px solid #fde68a" }} />
            ⚡ Design decision
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 20, height: 14, borderRadius: 3, background: "#eef2ff", border: "1px solid #c7d2fe" }} />
            📝 Implementation note
          </div>
        </div>
      </div>
    </div>
  );
}
