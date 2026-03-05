"use client";

import { useState } from "react";
import Link from "next/link";

// ── Primitives ──────────────────────────────────────────────────

const WireframeBox = ({ children, className = "", dashed = false, label, height, onClick, style = {} }) => (
  <div
    onClick={onClick}
    className={`relative ${className}`}
    style={{
      border: dashed ? "2px dashed #94a3b8" : "1.5px solid #cbd5e1",
      borderRadius: 8,
      background: dashed
        ? "repeating-linear-gradient(45deg,#f8fafc,#f8fafc 4px,#f1f5f9 4px,#f1f5f9 8px)"
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
  <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "20px 0 10px" }}>
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

const FieldRow = ({ label, placeholder, note, height = 36 }) => (
  <div style={{ marginBottom: 10 }}>
    <div style={{ fontSize: 11, fontWeight: 700, color: "#475569", marginBottom: 3 }}>{label}</div>
    <WireframeBox style={{ padding: "0 12px", minHeight: height, display: "flex", alignItems: "center" }}>
      <span style={{ fontSize: 11, color: "#94a3b8" }}>{placeholder}</span>
    </WireframeBox>
    {note && <div style={{ fontSize: 9, color: "#94a3b8", marginTop: 2 }}>{note}</div>}
  </div>
);

const CalendarGrid = () => {
  const days = ["M","T","W","T","F","S","S"];
  const cells = Array.from({ length: 35 }, (_, i) => {
    const day = i - 2;
    if (day < 1 || day > 31) return null;
    const blocked = [8, 9, 22, 23].includes(day);
    return day >= 1 && day <= 31 ? { day, blocked } : null;
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
            background: c ? (c.blocked ? "#fee2e2" : "#dcfce7") : "transparent",
            color: c ? (c.blocked ? "#ef4444" : "#16a34a") : "transparent",
            fontWeight: c && !c.blocked ? 600 : 400,
          }}>
            {c?.day || ""}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 12, marginTop: 8, justifyContent: "center" }}>
        {[["#dcfce7", "Available"], ["#fee2e2", "Blocked"]].map(([bg, label]) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: bg, border: "1px solid #cbd5e1" }} />
            <span style={{ fontSize: 9, color: "#64748b" }}>{label}</span>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 9, color: "#94a3b8", textAlign: "center", marginTop: 6 }}>
        Tap a date to toggle · Bulk: Block all weekdays / Block all weekends
      </div>
    </div>
  );
};

// ── Step Definitions ─────────────────────────────────────────────

const steps = [
  { id: 1, name: "Create Account", required: true },
  { id: 2, name: "Artist Identity", required: true },
  { id: 3, name: "Genre & Pricing", required: true },
  { id: 4, name: "Upload Media", required: true },
  { id: 5, name: "About & Gig Req.", required: false },
  { id: 6, name: "Set Lists", required: false },
  { id: 7, name: "Availability", required: false },
  { id: 8, name: "Review & Publish", required: true },
];

// ── Step Content ─────────────────────────────────────────────────

function StepContent({ step, isMobile }) {
  if (step === 1) return (
    <>
      <SectionLabel number="1">Create Account</SectionLabel>
      <WireframeBox style={{ padding: isMobile ? 12 : 20 }}>
        <div style={{ fontSize: 10, color: "#64748b", marginBottom: 12, fontStyle: "italic" }}>
          Standard account creation — establishes credentials and user identity.
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 10 }}>
          <FieldRow label="First Name *" placeholder="First name" />
          <FieldRow label="Last Name *" placeholder="Last name" note="Used for account management & Stripe payouts" />
        </div>
        <FieldRow label="Email Address *" placeholder="artist@example.com" note="Must be unique · Used for login and notifications" />
        <FieldRow label="Password *" placeholder="••••••••" note="Minimum complexity TBD (e.g. 8+ characters)" />
        <FieldRow label="Confirm Password *" placeholder="••••••••" />
        {/* ToS checkbox */}
        <WireframeBox style={{ padding: "10px 14px", marginTop: 4 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
            <div style={{ width: 14, height: 14, border: "1.5px solid #cbd5e1", borderRadius: 3, marginTop: 1, flexShrink: 0 }} />
            <span style={{ fontSize: 11, color: "#475569" }}>
              I agree to the <span style={{ textDecoration: "underline", color: "#3b82f6" }}>Terms of Service</span> and <span style={{ textDecoration: "underline", color: "#3b82f6" }}>Privacy Policy</span>
            </span>
          </div>
        </WireframeBox>
      </WireframeBox>
    </>
  );

  if (step === 2) return (
    <>
      <SectionLabel number="2">Artist Identity</SectionLabel>
      <WireframeBox style={{ padding: isMobile ? 12 : 20 }}>
        <div style={{ fontSize: 10, color: "#64748b", marginBottom: 12, fontStyle: "italic" }}>
          Public-facing name and avatar — appears in search results, messaging, and profile header.
        </div>
        <FieldRow label="Artist / Band Name *" placeholder="e.g. The Brooklyn Jazz Collective" note="Public display name · Can differ from personal name" />
        {/* Profile photo + band size */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 10, marginTop: 4 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#475569", marginBottom: 3 }}>Profile Photo *</div>
            <WireframeBox dashed height={120} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <div style={{ fontSize: 28, opacity: 0.35 }}>📷</div>
              <div style={{ fontSize: 10, color: "#94a3b8", textAlign: "center" }}>Square avatar / thumbnail<br />JPG · PNG · WebP</div>
              <div style={{ padding: "4px 14px", border: "1.5px solid #cbd5e1", borderRadius: 6, fontSize: 10, color: "#64748b" }}>Browse files</div>
            </WireframeBox>
            <div style={{ fontSize: 9, color: "#94a3b8", marginTop: 3 }}>Strongly encouraged · Profiles without photo reduce trust</div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#475569", marginBottom: 3 }}>Band Size</div>
            <WireframeBox style={{ padding: "0 12px", minHeight: 36, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 11, color: "#94a3b8" }}>Select band size</span>
              <span style={{ fontSize: 11, color: "#94a3b8" }}>▾</span>
            </WireframeBox>
            <div style={{ fontSize: 9, color: "#94a3b8", marginTop: 3 }}>Options: Solo · Duo · Trio · 4-piece · 5+ piece</div>
            <div style={{ marginTop: 8, fontSize: 10, color: "#64748b", background: "#f8fafc", border: "1.5px solid #e2e8f0", borderRadius: 6, padding: "6px 10px" }}>
              ℹ️ Not in SOW · High value for client decision-making · Confirm scope
            </div>
          </div>
        </div>
      </WireframeBox>
    </>
  );

  if (step === 3) return (
    <>
      <SectionLabel number="3">Genre & Pricing</SectionLabel>
      <WireframeBox style={{ padding: isMobile ? 12 : 20 }}>
        <div style={{ fontSize: 10, color: "#64748b", marginBottom: 12, fontStyle: "italic" }}>
          Primary search and filter criteria — two most critical fields for discoverability.
        </div>
        {/* Genre */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#475569", marginBottom: 6 }}>Genre * <span style={{ fontWeight: 400, color: "#94a3b8" }}>(multi-select · max 5)</span></div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {["Jazz", "Rock", "Pop", "R&B", "Soul", "Funk", "Latin", "Classical", "Country", "Electronic", "Hip-Hop", "Reggae", "Blues", "Folk", "Indie", "World", "Afrobeats"].map((g, i) => (
              <div key={g} style={{
                padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 600, cursor: "pointer",
                border: "1.5px solid #cbd5e1",
                background: i < 2 ? "#dbeafe" : "#f8fafc",
                color: i < 2 ? "#1e40af" : "#475569",
              }}>{g}</div>
            ))}
          </div>
          <div style={{ fontSize: 9, color: "#94a3b8", marginTop: 4 }}>Pill/tag selectors · Selected shown in blue · Sub-genres deferred to post-launch</div>
        </div>
        {/* Pricing */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 10 }}>
          <div>
            <FieldRow label="Hourly Rate * (USD)" placeholder="$250 / hr" note="Minimum $50/hr floor enforced · No upper ceiling · Visible to logged-in users only" />
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#475569", marginBottom: 3 }}>Minimum Hours</div>
            <WireframeBox style={{ padding: "0 12px", minHeight: 36, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 11, color: "#94a3b8" }}>No minimum (default)</span>
              <span style={{ fontSize: 11, color: "#94a3b8" }}>▾</span>
            </WireframeBox>
            <div style={{ fontSize: 9, color: "#94a3b8", marginTop: 2 }}>Options: No min · 1hr · 2hr · 3hr · 4hr</div>
          </div>
        </div>
      </WireframeBox>
    </>
  );

  if (step === 4) return (
    <>
      <SectionLabel number="4">Upload Media</SectionLabel>
      <WireframeBox style={{ padding: isMobile ? 12 : 20 }}>
        <div style={{ fontSize: 10, color: "#64748b", marginBottom: 12, fontStyle: "italic" }}>
          Most critical step for profile quality — clients use media to evaluate artists. Min 1 item required.
        </div>
        {/* Videos */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#475569", marginBottom: 6 }}>Videos (YouTube URLs)</div>
          <FieldRow label="" placeholder="🔗 Paste YouTube URL — e.g. https://youtube.com/watch?v=..." />
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 8, marginTop: 4 }}>
            {["Video 1", "Video 2", "+ Add video"].map((v, i) => (
              <WireframeBox key={v} dashed height={90} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4 }}>
                {i < 2 ? (
                  <>
                    <div style={{ fontSize: 24, opacity: 0.35 }}>▶</div>
                    <div style={{ fontSize: 10, color: "#94a3b8" }}>{v}</div>
                    <div style={{ fontSize: 9, color: "#cbd5e1" }}>Thumbnail preview</div>
                  </>
                ) : (
                  <>
                    <div style={{ fontSize: 20, color: "#cbd5e1" }}>＋</div>
                    <div style={{ fontSize: 10, color: "#94a3b8" }}>Add video</div>
                  </>
                )}
              </WireframeBox>
            ))}
          </div>
          <div style={{ fontSize: 9, color: "#94a3b8", marginTop: 3 }}>YouTube only for MVP · Reorderable via drag handles · Click-to-play on profile</div>
        </div>
        {/* Photos */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#475569", marginBottom: 6 }}>Photos <span style={{ fontWeight: 400, color: "#94a3b8" }}>(max 5 · JPEG · PNG · WebP)</span></div>
          <WireframeBox dashed height={70} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, marginBottom: 8 }}>
            <div style={{ fontSize: 18, opacity: 0.35 }}>📁</div>
            <div style={{ fontSize: 10, color: "#94a3b8" }}>Drag & drop or Browse files · Max 10 MB/image · Auto-compressed</div>
          </WireframeBox>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${isMobile ? 3 : 5}, 1fr)`, gap: 6 }}>
            {["Photo 1 ★", "Photo 2", "Photo 3", "+ Add", "+ Add"].map((p, i) => (
              <WireframeBox key={i} dashed height={60} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 9, color: "#94a3b8", textAlign: "center" }}>{p}</span>
              </WireframeBox>
            ))}
          </div>
          <div style={{ fontSize: 9, color: "#94a3b8", marginTop: 3 }}>★ = Primary / hero image · Reorderable · Upload progress per file</div>
        </div>
        {/* Minimum note */}
        <div style={{ marginTop: 10, padding: 10, background: "#f0fdf4", border: "1.5px solid #bbf7d0", borderRadius: 6 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#166534" }}>✓ Minimum Requirement</div>
          <div style={{ fontSize: 10, color: "#15803d", marginTop: 2 }}>
            At least 1 video or photo required to proceed · Profile completeness indicator nudges artists to add more
          </div>
        </div>
      </WireframeBox>
    </>
  );

  if (step === 5) return (
    <>
      <SectionLabel number="5">About & Gig Requirements <span style={{ fontSize: 11, fontWeight: 500, color: "#94a3b8", textTransform: "none" }}>(optional)</span></SectionLabel>
      <WireframeBox style={{ padding: isMobile ? 12 : 20 }}>
        <div style={{ fontSize: 10, color: "#64748b", marginBottom: 12, fontStyle: "italic" }}>
          Helps clients understand the artist and logistical needs. Can be skipped and filled in later from Edit Profile.
        </div>
        {/* Tagline */}
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#475569", marginBottom: 3 }}>
            Tagline / Headline <span style={{ fontWeight: 400, color: "#94a3b8" }}>(optional · max 100 chars)</span>
          </div>
          <WireframeBox style={{ padding: "0 12px", minHeight: 36, display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: 11, color: "#94a3b8" }}>e.g. NYC&apos;s Premier Jazz Trio</span>
          </WireframeBox>
          <div style={{ fontSize: 9, color: "#94a3b8", marginTop: 2 }}>Not in SOW · Significantly improves search result card · Confirm scope</div>
        </div>
        {/* About Us */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#475569", marginBottom: 3 }}>About Us <span style={{ fontWeight: 400, color: "#94a3b8" }}>(500–1000 chars)</span></div>
          <WireframeBox style={{ padding: 10, minHeight: 80 }}>
            <div style={{ height: 60, background: "#f1f5f9", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 10, color: "#94a3b8" }}>Free-text · Single paragraph for MVP · Plain text</span>
            </div>
          </WireframeBox>
        </div>
        {/* Gig Requirements */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#475569", marginBottom: 6 }}>Gig Requirements</div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 4, marginBottom: 8 }}>
            {[
              "⚡ Power supply needed",
              "🏠 Covered performance area",
              "🚪 Load-in access",
              "🅿️ Parking for performers",
              "📐 Minimum stage size",
              "🎭 Green room / backstage",
              "🎵 Sound check time",
            ].map((r) => (
              <div key={r} style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 0" }}>
                <div style={{ width: 14, height: 14, border: "1.5px solid #cbd5e1", borderRadius: 3, flexShrink: 0 }} />
                <span style={{ fontSize: 11, color: "#475569" }}>{r}</span>
              </div>
            ))}
          </div>
          <WireframeBox style={{ padding: 10, minHeight: 50 }}>
            <div style={{ height: 36, background: "#f1f5f9", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 10, color: "#94a3b8" }}>Additional requirements (free text)</span>
            </div>
          </WireframeBox>
        </div>
      </WireframeBox>
    </>
  );

  if (step === 6) return (
    <>
      <SectionLabel number="6">Set Lists <span style={{ fontSize: 11, fontWeight: 500, color: "#94a3b8", textTransform: "none" }}>(optional)</span></SectionLabel>
      <WireframeBox style={{ padding: isMobile ? 12 : 20 }}>
        <div style={{ fontSize: 10, color: "#64748b", marginBottom: 12, fontStyle: "italic" }}>
          Named set lists that clients can browse. Can be skipped and added later from Edit Profile.
        </div>
        {/* Set list cards */}
        {["Set List 1", "Set List 2"].map((sl, i) => (
          <WireframeBox key={sl} style={{ padding: 12, marginBottom: 10 }}>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr", gap: 10, marginBottom: 8 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#475569", marginBottom: 3 }}>Set List Name</div>
                <WireframeBox style={{ padding: "0 10px", minHeight: 32, display: "flex", alignItems: "center" }}>
                  <span style={{ fontSize: 11, color: "#94a3b8" }}>{i === 0 ? "Jazz Cocktail Hour" : "Dance Set"}</span>
                </WireframeBox>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#475569", marginBottom: 3 }}>Duration</div>
                <WireframeBox style={{ padding: "0 10px", minHeight: 32, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 11, color: "#94a3b8" }}>{i === 0 ? "60 minutes" : "90 minutes"}</span>
                  <span style={{ fontSize: 10, color: "#94a3b8" }}>▾</span>
                </WireframeBox>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#475569", marginBottom: 3 }}>Song List <span style={{ fontWeight: 400, color: "#94a3b8" }}>(one song per line)</span></div>
              <WireframeBox style={{ padding: 8, minHeight: 64 }}>
                <div style={{ height: 50, background: "#f1f5f9", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 10, color: "#94a3b8" }}>Free text · No PDF/JPEG uploads</span>
                </div>
              </WireframeBox>
            </div>
          </WireframeBox>
        ))}
        {/* Add another */}
        <WireframeBox dashed style={{ padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, cursor: "pointer" }}>
          <span style={{ fontSize: 16, color: "#94a3b8" }}>＋</span>
          <span style={{ fontSize: 11, color: "#64748b", fontWeight: 600 }}>Add another set list</span>
        </WireframeBox>
        <div style={{ marginTop: 10, padding: 8, background: "#eff6ff", border: "1.5px solid #bfdbfe", borderRadius: 6 }}>
          <div style={{ fontSize: 10, color: "#1e40af" }}>ℹ️ &quot;Clients love seeing your set lists!&quot; nudge displayed · No minimum enforced</div>
        </div>
      </WireframeBox>
    </>
  );

  if (step === 7) return (
    <>
      <SectionLabel number="7">Availability <span style={{ fontSize: 11, fontWeight: 500, color: "#94a3b8", textTransform: "none" }}>(optional)</span></SectionLabel>
      <WireframeBox style={{ padding: isMobile ? 12 : 20 }}>
        <div style={{ fontSize: 10, color: "#64748b", marginBottom: 12, fontStyle: "italic" }}>
          If skipped, all future dates treated as available by default. Can be managed from Edit Profile later.
        </div>
        <CalendarGrid />
        {/* Bulk actions */}
        <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
          {["Block all weekdays", "Block all weekends", "Clear all blocks"].map(a => (
            <WireframeBox key={a} style={{ padding: "6px 12px" }}>
              <span style={{ fontSize: 11, color: "#475569", fontWeight: 600 }}>{a}</span>
            </WireframeBox>
          ))}
        </div>
      </WireframeBox>
    </>
  );

  if (step === 8) return (
    <>
      <SectionLabel number="8">Review & Publish</SectionLabel>
      <WireframeBox style={{ padding: isMobile ? 12 : 20 }}>
        <div style={{ fontSize: 10, color: "#64748b", marginBottom: 12, fontStyle: "italic" }}>
          Read-only preview of the profile as it will appear to clients. Edit buttons allow jumping back to any step.
        </div>
        {/* Preview card */}
        <div style={{ border: "1.5px solid #cbd5e1", borderRadius: 10, overflow: "hidden", marginBottom: 14 }}>
          {/* Cover */}
          <WireframeBox dashed height={80} style={{ borderRadius: 0, border: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 11, color: "#94a3b8" }}>Profile Photo / Cover Preview</span>
          </WireframeBox>
          <div style={{ padding: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 6 }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: "#0f172a" }}>The Brooklyn Jazz Collective</div>
                <div style={{ marginTop: 4 }}>
                  <Tag color="#dbeafe" textColor="#1e40af">Jazz</Tag>
                  <Tag color="#dbeafe" textColor="#1e40af">Soul</Tag>
                  <Tag>5-piece</Tag>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1e293b" }}>$250 / hr</div>
                <div style={{ fontSize: 10, color: "#94a3b8" }}>2hr minimum</div>
              </div>
            </div>
            {/* Review links for each section */}
            {[
              ["Artist Identity", "2"],
              ["Genre & Pricing", "3"],
              ["Media", "4"],
              ["About & Gig Req.", "5"],
              ["Set Lists", "6"],
              ["Availability", "7"],
            ].map(([label, num]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 0", borderBottom: "1px solid #f1f5f9" }}>
                <span style={{ fontSize: 11, color: "#475569" }}>{label}</span>
                <span style={{ fontSize: 10, color: "#3b82f6", cursor: "pointer", fontWeight: 600 }}>Edit ✎</span>
              </div>
            ))}
          </div>
        </div>
        {/* Draft note */}
        <div style={{ padding: 10, background: "#f8fafc", border: "1.5px solid #e2e8f0", borderRadius: 6, marginBottom: 12 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#475569" }}>💾 Auto-save</div>
          <div style={{ fontSize: 10, color: "#64748b", marginTop: 2 }}>Progress is auto-saved throughout wizard · Closing browser resumes from last step · Profile stays in &quot;draft&quot; (not visible) until published</div>
        </div>
        {/* Stripe Connect nudge */}
        <div style={{ padding: 10, background: "#eff6ff", border: "1.5px solid #bfdbfe", borderRadius: 6, marginBottom: 12 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#1e40af" }}>💳 Stripe Connect (Post-publish)</div>
          <div style={{ fontSize: 10, color: "#1e3a8a", marginTop: 2 }}>
            Stripe Connect onboarding happens after publish · Prompt: &quot;Set up your payment account to start getting paid.&quot;
          </div>
        </div>
        {/* Publish CTA */}
        <div style={{ background: "#0f172a", borderRadius: 10, padding: isMobile ? 12 : 16 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: isMobile ? "column" : "row", gap: 10 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Ready to go live?</div>
              <div style={{ fontSize: 10, color: "#64748b", marginTop: 2 }}>Profile visible immediately after publish to logged-in users</div>
            </div>
            <div style={{ padding: "10px 32px", background: "#3b82f6", borderRadius: 8, color: "#fff", fontSize: 14, fontWeight: 700, textAlign: "center", width: isMobile ? "100%" : "auto" }}>
              Publish Profile
            </div>
          </div>
        </div>
        {/* Post-publish state */}
        <div style={{ marginTop: 10, padding: 10, background: "#f0fdf4", border: "1.5px solid #bbf7d0", borderRadius: 6 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#166534" }}>✓ After Publishing</div>
          <div style={{ fontSize: 10, color: "#15803d", marginTop: 2 }}>Redirected to live public profile · Confirmation message · Nudge to complete any skipped optional steps</div>
        </div>
      </WireframeBox>
    </>
  );

  return null;
}

// ── Progress Indicator ───────────────────────────────────────────

function ProgressIndicator({ currentStep, isMobile, onStepClick }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: isMobile ? 2 : 4,
      marginBottom: 20,
      overflowX: "auto",
      paddingBottom: 4,
    }}>
      {steps.map((s, i) => {
        const isActive = s.id === currentStep;
        const isDone = s.id < currentStep;
        return (
          <div key={s.id} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
            <div
              onClick={() => isDone && onStepClick(s.id)}
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "column",
                alignItems: "center",
                gap: 3,
                cursor: isDone ? "pointer" : "default",
              }}
            >
              {/* Circle */}
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontWeight: 700,
                background: isActive ? "#0f172a" : isDone ? "#16a34a" : s.required ? "#e2e8f0" : "#f1f5f9",
                color: isActive ? "#fff" : isDone ? "#fff" : s.required ? "#475569" : "#94a3b8",
                border: isActive ? "2px solid #0f172a" : isDone ? "2px solid #16a34a" : s.required ? "2px solid #cbd5e1" : "2px dashed #cbd5e1",
              }}>
                {isDone ? "✓" : s.id}
              </div>
              {/* Label */}
              {!isMobile && (
                <div style={{
                  fontSize: 9, fontWeight: 600, textAlign: "center",
                  color: isActive ? "#0f172a" : isDone ? "#16a34a" : "#94a3b8",
                  maxWidth: 70, lineHeight: 1.2,
                }}>{s.name}</div>
              )}
              {!s.required && !isMobile && (
                <div style={{ fontSize: 8, color: "#cbd5e1", textAlign: "center" }}>optional</div>
              )}
            </div>
            {/* Connector line */}
            {i < steps.length - 1 && (
              <div style={{
                width: isMobile ? 10 : 16,
                height: 2,
                background: s.id < currentStep ? "#16a34a" : "#e2e8f0",
                marginBottom: isMobile ? 0 : 22,
                marginLeft: 4, marginRight: 4,
              }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Nav Buttons ──────────────────────────────────────────────────

function NavButtons({ currentStep, setStep, isMobile }) {
  const stepInfo = steps.find(s => s.id === currentStep);
  const isFirst = currentStep === 1;
  const isLast = currentStep === 8;
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      marginTop: 20, paddingTop: 14, borderTop: "1px solid #f1f5f9",
      flexDirection: isMobile ? "column" : "row", gap: isMobile ? 8 : 0,
    }}>
      {/* Back */}
      <div
        onClick={() => !isFirst && setStep(s => s - 1)}
        style={{
          padding: "8px 20px", borderRadius: 7, border: "1.5px solid #cbd5e1",
          fontSize: 12, fontWeight: 600, color: isFirst ? "#cbd5e1" : "#475569",
          cursor: isFirst ? "default" : "pointer", background: "#fff",
          width: isMobile ? "100%" : "auto", textAlign: "center",
        }}>
        ← Back
      </div>
      <div style={{ display: "flex", gap: 8, width: isMobile ? "100%" : "auto", flexDirection: isMobile ? "column-reverse" : "row" }}>
        {/* Skip (optional steps only) */}
        {!stepInfo?.required && !isLast && (
          <div
            onClick={() => setStep(s => s + 1)}
            style={{
              padding: "8px 16px", borderRadius: 7, border: "1.5px solid #e2e8f0",
              fontSize: 12, fontWeight: 600, color: "#94a3b8",
              cursor: "pointer", background: "#f8fafc",
              textAlign: "center",
            }}>
            Skip for now
          </div>
        )}
        {/* Next / Publish */}
        <div
          onClick={() => !isLast && setStep(s => s + 1)}
          style={{
            padding: "8px 28px", borderRadius: 7,
            background: isLast ? "#3b82f6" : "#0f172a",
            color: "#fff", fontSize: 12, fontWeight: 700,
            cursor: isLast ? "default" : "pointer",
            textAlign: "center",
            minWidth: 100,
          }}>
          {isLast ? "Publish Profile" : "Next →"}
        </div>
      </div>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────

export default function ArtistSignUpWireframe() {
  const [view, setView] = useState("desktop");
  const [currentStep, setCurrentStep] = useState(1);
  const isMobile = view === "mobile";
  const containerWidth = isMobile ? 375 : 820;

  return (
    <div style={{
      fontFamily: "'DM Sans','Helvetica Neue',sans-serif",
      background: "#f1f5f9",
      minHeight: "100vh",
      padding: isMobile ? "16px 8px" : "24px 16px",
      display: "flex", flexDirection: "column", alignItems: "center",
    }}>

      {/* ── Header ── */}
      <div style={{ width: "100%", maxWidth: 880, marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#64748b", textTransform: "uppercase", marginBottom: 2 }}>
              <Link href="/" style={{ color: "#64748b", textDecoration: "none" }}>OVRTØNE</Link> · Wireframe
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: 0, letterSpacing: -0.5 }}>
              Artist Sign-Up Flow
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

      {/* ── Wireframe Container ── */}
      <div style={{
        width: containerWidth, maxWidth: "100%",
        background: "#fff", borderRadius: 12, padding: isMobile ? 16 : 28,
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)", border: "1px solid #e2e8f0",
        transition: "width 0.3s ease",
      }}>

        {/* Progress indicator */}
        <ProgressIndicator currentStep={currentStep} isMobile={isMobile} onStepClick={setCurrentStep} />

        {/* Step header */}
        <div style={{
          background: "#f8fafc", border: "1.5px solid #e2e8f0", borderRadius: 8,
          padding: "10px 16px", marginBottom: 4,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: "#64748b", textTransform: "uppercase" }}>
              Step {currentStep} of {steps.length}
            </div>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#0f172a", marginTop: 1 }}>
              {steps.find(s => s.id === currentStep)?.name}
            </div>
          </div>
          <div>
            {steps.find(s => s.id === currentStep)?.required ? (
              <Tag color="#dcfce7" textColor="#166534">Required</Tag>
            ) : (
              <Tag color="#e2e8f0" textColor="#64748b">Optional</Tag>
            )}
          </div>
        </div>

        {/* Step content */}
        <StepContent step={currentStep} isMobile={isMobile} />

        {/* Navigation */}
        <NavButtons currentStep={currentStep} setStep={setCurrentStep} isMobile={isMobile} />

      </div>


    </div>
  );
}
