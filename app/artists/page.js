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

const Tag = ({ children, color = "#e2e8f0", textColor = "#334155", onRemove }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: 4,
    padding: "3px 10px", borderRadius: 20,
    background: color, color: textColor, fontSize: 11, fontWeight: 600,
    marginRight: 4, marginBottom: 4, letterSpacing: 0.3,
  }}>
    {children}
    {onRemove && <span style={{ cursor: "pointer", opacity: 0.6, fontSize: 13, lineHeight: 1 }}>×</span>}
  </span>
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

/* ── Artist Result Card ── */
const ArtistCard = ({ name, genre, price, rating, reviews, bandSize, bookings, isMobile }) => (
  <Link href="/artists/band-1" style={{ textDecoration: "none", color: "inherit" }}>
  <WireframeBox style={{ padding: 0, overflow: "hidden", cursor: "pointer" }}>
    <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row" }}>
      {/* Thumbnail */}
      <div style={{
        width: isMobile ? "100%" : 140, height: isMobile ? 160 : "auto", minHeight: isMobile ? 0 : 130,
        background: "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        <div style={{ textAlign: "center", color: "#94a3b8" }}>
          <div style={{ fontSize: 28 }}>🎵</div>
          <div style={{ fontSize: 9, marginTop: 2 }}>Photo</div>
        </div>
      </div>
      {/* Info */}
      <div style={{ flex: 1, padding: isMobile ? 12 : 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>{name}</div>
          <Tag color="#dbeafe" textColor="#1e40af">✓</Tag>
        </div>
        <div style={{ marginTop: 4 }}>
          {genre.map(g => <Tag key={g}>{g}</Tag>)}
        </div>
        <div style={{
          display: "flex", gap: isMobile ? 10 : 16, marginTop: 8, flexWrap: "wrap",
          fontSize: 11, color: "#475569",
        }}>
          <span style={{ fontWeight: 700, color: "#0f172a" }}>${price}/hr</span>
          <span>👍 {rating}% <span style={{ color: "#94a3b8" }}>({reviews})</span></span>
          <span>🎸 {bandSize}</span>
          <span style={{ color: "#94a3b8" }}>Booked {bookings}×</span>
        </div>
      </div>
    </div>
  </WireframeBox>
  </Link>
);

/* ── Filter Button (closed state) ── */
const FilterButton = ({ label, active, children, expanded, onToggle, isMobile }) => (
  <div style={{ position: "relative" }}>
    <button
      onClick={onToggle}
      style={{
        padding: "8px 16px", borderRadius: 8,
        border: active ? "2px solid #3b82f6" : "1.5px solid #cbd5e1",
        background: active ? "#eff6ff" : "#fff",
        color: active ? "#1d4ed8" : "#334155",
        fontSize: 12, fontWeight: 600, cursor: "pointer",
        display: "flex", alignItems: "center", gap: 6,
        whiteSpace: "nowrap",
      }}
    >
      {label} <span style={{ fontSize: 10, opacity: 0.6 }}>{expanded ? "▲" : "▼"}</span>
    </button>
    {expanded && (
      <div style={{
        position: "absolute", top: "calc(100% + 6px)", left: 0,
        background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 10,
        boxShadow: "0 8px 32px rgba(0,0,0,0.12)", padding: 14,
        zIndex: 10, minWidth: isMobile ? 260 : 300,
      }}>
        {children}
      </div>
    )}
  </div>
);

/* ── Mini Calendar for Date Filter ── */
const MiniCalendar = () => {
  const days = ["M","T","W","T","F","S","S"];
  const cells = Array.from({ length: 35 }, (_, i) => {
    const day = i - 2;
    if (day < 1 || day > 31) return null;
    const unavail = [5, 12, 19, 8, 9, 22, 23, 24].includes(day);
    const selected = day === 15;
    return { day, unavail, selected };
  });
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <span style={{ fontSize: 10, color: "#94a3b8", cursor: "pointer" }}>◀</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: "#334155" }}>March 2026</span>
        <span style={{ fontSize: 10, color: "#94a3b8", cursor: "pointer" }}>▶</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2, textAlign: "center" }}>
        {days.map((d, i) => (
          <div key={i} style={{ fontSize: 9, fontWeight: 700, color: "#94a3b8", padding: 2 }}>{d}</div>
        ))}
        {cells.map((c, i) => (
          <div key={i} style={{
            fontSize: 10, padding: 3, borderRadius: 4,
            background: c?.selected ? "#3b82f6" : "transparent",
            color: c ? (c.selected ? "#fff" : c.unavail ? "#cbd5e1" : "#334155") : "transparent",
            fontWeight: c?.selected ? 700 : 400,
            cursor: c && !c.unavail ? "pointer" : "default",
          }}>
            {c?.day || ""}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function ArtistSearchWireframe() {
  const [view, setView] = useState("desktop");
  const [openFilter, setOpenFilter] = useState(null);
  const [pageState, setPageState] = useState("default");
  const [sortOption, setSortOption] = useState("low");
  const [sortOpen, setSortOpen] = useState(false);

  const isMobile = view === "mobile";
  const containerWidth = isMobile ? 375 : 860;

  const toggleFilter = (f) => setOpenFilter(openFilter === f ? null : f);

  const sampleArtists = [
    { name: "The Velvet Keys", genre: ["Jazz", "Soul"], price: 250, rating: 95, reviews: 24, bandSize: "5-piece", bookings: 18 },
    { name: "Neon Groove Collective", genre: ["Funk", "R&B"], price: 300, rating: 88, reviews: 12, bandSize: "4-piece", bookings: 9 },
    { name: "Acoustic Ember", genre: ["Folk", "Indie"], price: 150, rating: 100, reviews: 8, bandSize: "Duo", bookings: 14 },
    { name: "Los Sonidos", genre: ["Latin", "Jazz"], price: 275, rating: 92, reviews: 31, bandSize: "6-piece", bookings: 27 },
    { name: "Midnight Standard", genre: ["Jazz"], price: 200, rating: 97, reviews: 45, bandSize: "Trio", bookings: 42 },
  ];

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
      {/* Page Header */}
      <div style={{ width: "100%", maxWidth: 900, marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#64748b", textTransform: "uppercase", marginBottom: 2 }}>
              <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>OVRTØNE</Link> · Wireframe
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: 0, letterSpacing: -0.5 }}>
              Search for Artist
            </h1>
            <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}><Link href="/" style={{ color: "#3b82f6", textDecoration: "none", fontWeight: 600 }}>← Back to home</Link></div>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {/* View toggle */}
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
            {/* State toggle */}
            <div style={{ display: "flex", gap: 4, background: "#e2e8f0", borderRadius: 8, padding: 3 }}>
              {["default", "filtered", "empty", "few"].map(s => (
                <button key={s} onClick={() => setPageState(s)} style={{
                  padding: "6px 10px", borderRadius: 6, border: "none", cursor: "pointer",
                  fontSize: 10, fontWeight: 600, textTransform: "capitalize",
                  background: pageState === s ? "#fff" : "transparent",
                  color: pageState === s ? "#0f172a" : "#64748b",
                  boxShadow: pageState === s ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                }}>{s === "few" ? "1-3 results" : s}</button>
              ))}
            </div>
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

        {/* ── 1. FILTER BAR ── */}
        <SectionLabel number="1">Filter Bar</SectionLabel>

        <div style={{
          display: "flex", gap: 8, flexWrap: "wrap", alignItems: "flex-start",
        }}>
          {/* Genre Filter */}
          <FilterButton
            label={pageState === "filtered" ? "Jazz ×" : "Genre"}
            active={pageState === "filtered"}
            expanded={openFilter === "genre"}
            onToggle={() => toggleFilter("genre")}
            isMobile={isMobile}
          >
            <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>
              Select Genres <span style={{ fontWeight: 400 }}>(multi-select)</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {["Jazz (24)", "R&B (18)", "Soul (15)", "Rock (12)", "Funk (8)", "Latin (11)", "Classical (3)", "Country (2)", "Electronic (6)", "Hip-Hop (9)", "Blues (7)", "Folk (5)", "Indie (4)", "Afrobeats (6)"].map(g => (
                <Tag key={g}>{g}</Tag>
              ))}
            </div>
          </FilterButton>

          {/* Date Filter */}
          <FilterButton
            label={pageState === "filtered" ? "Mar 15 ×" : "Date"}
            active={pageState === "filtered"}
            expanded={openFilter === "date"}
            onToggle={() => toggleFilter("date")}
            isMobile={isMobile}
          >
            <MiniCalendar />
            <div style={{ marginTop: 10, paddingTop: 8, borderTop: "1px solid #f1f5f9" }}>
              <div style={{ fontSize: 10, color: "#64748b", lineHeight: 1.5 }}>
                Select single date Select
              </div>
            </div>
          </FilterButton>

          {/* Price Filter */}
          <FilterButton
            label={pageState === "filtered" ? "$100–$300 ×" : "Price"}
            active={pageState === "filtered"}
            expanded={openFilter === "price"}
            onToggle={() => toggleFilter("price")}
            isMobile={isMobile}
          >
            <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 10 }}>
              Hourly Rate
            </div>
            {/* Slider mockup */}
            <div style={{ padding: "0 4px" }}>
              <div style={{ position: "relative", height: 20, display: "flex", alignItems: "center" }}>
                <div style={{ width: "100%", height: 4, background: "#e2e8f0", borderRadius: 2, position: "relative" }}>
                  <div style={{
                    position: "absolute", left: "15%", right: "40%", height: 4,
                    background: "#3b82f6", borderRadius: 2,
                  }} />
                </div>
                <div style={{
                  position: "absolute", left: "15%", transform: "translateX(-50%)",
                  width: 16, height: 16, borderRadius: "50%", background: "#fff",
                  border: "2px solid #3b82f6", boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                }} />
                <div style={{
                  position: "absolute", left: "60%", transform: "translateX(-50%)",
                  width: 16, height: 16, borderRadius: "50%", background: "#fff",
                  border: "2px solid #3b82f6", boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 11, fontWeight: 600, color: "#334155" }}>
                <span>$100</span>
                <span>$300</span>
              </div>
            </div>
            <div style={{ textAlign: "center", fontSize: 10, color: "#94a3b8", marginTop: 6 }}>
              Default: &quot;Any price&quot; (no filter applied)
            </div>
          </FilterButton>

          {/* Clear All (only when filtered) */}
          {pageState === "filtered" && (
            <button style={{
              padding: "8px 14px", borderRadius: 8,
              border: "1.5px solid #e2e8f0", background: "#fff",
              color: "#94a3b8", fontSize: 11, fontWeight: 600, cursor: "pointer",
            }}>
              Clear All
            </button>
          )}
        </div>


        {/* ── 3. RESULTS HEADER ── */}
        <SectionLabel number="2">Results Header</SectionLabel>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 8,
        }}>
          <div>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>
              {pageState === "empty" ? "0" : pageState === "few" ? "2" : pageState === "filtered" ? "18" : "42"} artists
            </span>
            <span style={{ fontSize: 12, color: "#94a3b8" }}>
              {pageState === "filtered" ? " match your filters" : " available"}
            </span>
          </div>
          {/* Sort */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setSortOpen(!sortOpen)}
              style={{
                padding: "6px 14px", borderRadius: 8,
                border: "1.5px solid #cbd5e1", background: "#f8fafc",
                display: "inline-flex", alignItems: "center", gap: 6,
                cursor: "pointer", fontSize: 11,
              }}
            >
              <span style={{ color: "#64748b" }}>Sort:</span>
              <span style={{ fontWeight: 700, color: "#334155" }}>
                {sortOption === "low" ? "Price: Low → High" : "Price: High → Low"} {sortOpen ? "▲" : "▼"}
              </span>
            </button>
            {sortOpen && (
              <div style={{
                position: "absolute", top: "calc(100% + 4px)", right: 0,
                background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 8,
                boxShadow: "0 4px 16px rgba(0,0,0,0.1)", zIndex: 10,
                overflow: "hidden", minWidth: 180,
              }}>
                {["low", "high"].map(opt => (
                  <button
                    key={opt}
                    onClick={() => { setSortOption(opt); setSortOpen(false); }}
                    style={{
                      display: "block", width: "100%", padding: "8px 14px",
                      border: "none", background: sortOption === opt ? "#eff6ff" : "#fff",
                      color: sortOption === opt ? "#1d4ed8" : "#334155",
                      fontSize: 12, fontWeight: sortOption === opt ? 700 : 500,
                      cursor: "pointer", textAlign: "left",
                    }}
                  >
                    {opt === "low" ? "Price: Low → High" : "Price: High → Low"}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Active Filters Chips (when filtered) */}
        {pageState === "filtered" && (
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginTop: 8 }}>
            <Tag color="#eff6ff" textColor="#1d4ed8" onRemove>Jazz</Tag>
            <Tag color="#eff6ff" textColor="#1d4ed8" onRemove>Mar 15, 2026</Tag>
            <Tag color="#eff6ff" textColor="#1d4ed8" onRemove>$100–$300/hr</Tag>
          </div>
        )}

        {/* ── 4. ARTIST RESULT CARDS ── */}
        <SectionLabel number="3">Artist Result Cards</SectionLabel>

        {/* DEFAULT / FILTERED states */}
        {(pageState === "default" || pageState === "filtered") && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {sampleArtists.map((a, i) => (
              <ArtistCard key={i} {...a} isMobile={isMobile} />
            ))}

            {/* Pagination / Load More */}
            <div style={{ textAlign: "center", marginTop: 12 }}>
              <WireframeBox style={{ padding: "10px 32px", display: "inline-block", cursor: "pointer" }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#3b82f6" }}>Load More Artists</span>
              </WireframeBox>
            </div>
          </div>
        )}

        {/* EMPTY state */}
        {pageState === "empty" && (
          <WireframeBox style={{ padding: isMobile ? 24 : 40, textAlign: "center" }} height={200}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>🎵</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#334155", marginBottom: 6 }}>
              No artists match your filters
            </div>
            <div style={{ fontSize: 13, color: "#94a3b8", marginBottom: 16, maxWidth: 360, margin: "0 auto 16px" }}>
              Try broadening your search by removing a filter or adjusting your date and price range.
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
              <span style={{
                padding: "8px 20px", borderRadius: 8, background: "#3b82f6",
                color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer",
              }}>Clear All Filters</span>
              <span style={{
                padding: "8px 20px", borderRadius: 8, border: "1.5px solid #e2e8f0",
                color: "#475569", fontSize: 12, fontWeight: 600, cursor: "pointer",
              }}>Remove Date Filter</span>
              <span style={{
                padding: "8px 20px", borderRadius: 8, border: "1.5px solid #e2e8f0",
                color: "#475569", fontSize: 12, fontWeight: 600, cursor: "pointer",
              }}>Remove Price Filter</span>
            </div>
            <Note>Suggest removing specific filters. Show &quot;Clear All&quot; prominently.</Note>
          </WireframeBox>
        )}

        {/* FEW RESULTS state (1–3) */}
        {pageState === "few" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {sampleArtists.slice(0, 2).map((a, i) => (
              <ArtistCard key={i} {...a} isMobile={isMobile} />
            ))}

            {/* Broaden prompt */}
            <WireframeBox style={{ padding: 16, textAlign: "center", borderStyle: "dashed" }} dashed>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 4 }}>
                Only 2 results match your filters
              </div>
              <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 10 }}>
                Broaden your search to discover more artists
              </div>
              <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
                <span style={{
                  padding: "6px 14px", borderRadius: 6, border: "1.5px solid #e2e8f0",
                  color: "#475569", fontSize: 11, fontWeight: 600, cursor: "pointer",
                }}>Remove Date Filter</span>
                <span style={{
                  padding: "6px 14px", borderRadius: 6, border: "1.5px solid #e2e8f0",
                  color: "#475569", fontSize: 11, fontWeight: 600, cursor: "pointer",
                }}>Expand Price Range</span>
              </div>
              <Annotation>When only 1–3 results: show a prompt to broaden. Consider &quot;You might also like...&quot; in future iterations.</Annotation>
            </WireframeBox>
          </div>
        )}

      </div>
    </div>
  );
}
