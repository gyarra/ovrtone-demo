"use client";

import { useState } from "react";
import Link from "next/link";
import { ContentBox } from "../components/ui";

const GENRES = [
  "Jazz", "R&B", "Soul", "Rock", "Funk", "Latin",
  "Classical", "Country", "Electronic", "Hip-Hop",
  "Blues", "Folk", "Indie", "Afrobeats",
];

const SAMPLE_ARTISTS = [
  { name: "The Ben Hazlewood Experience", genre: ["Rock", "Soul", "Funk"], price: 250, rating: 100, reviews: 11, bandSize: "5-piece", bookings: 14, image: "/ben_hazlewood/ben_avatar_1.jpg" },
  { name: "The Velvet Keys", genre: ["Jazz", "Soul"], price: 250, rating: 95, reviews: 24, bandSize: "5-piece", bookings: 18, image: "/bands/band_1.avif" },
  { name: "Neon Groove Collective", genre: ["Funk", "R&B"], price: 300, rating: 88, reviews: 12, bandSize: "4-piece", bookings: 9, image: "/bands/band_2.avif" },
  { name: "Burning Ember", genre: ["Folk", "Indie"], price: 150, rating: 100, reviews: 8, bandSize: "Duo", bookings: 14, image: "/bands/band_3.avif" },
  { name: "Los Sonidos", genre: ["Latin", "Jazz"], price: 275, rating: 92, reviews: 31, bandSize: "6-piece", bookings: 27, image: "/bands/band_4.avif", imagePosition: "center bottom" },
  { name: "Midnight Standard", genre: ["Jazz"], price: 200, rating: 97, reviews: 45, bandSize: "Trio", bookings: 42, image: "/bands/band_5.avif" },
];

function GenreTag({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1 rounded-full text-[11px] font-semibold cursor-pointer transition-colors"
      style={{
        background: active ? "var(--rn-blue)" : "var(--rn-slate-100)",
        color: active ? "#fff" : "var(--rn-slate-600)",
        border: "none",
      }}
    >
      {children}
    </button>
  );
}

function FilterDropdown({ label, active, open, onToggle, children }) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="px-4 py-2 rounded text-[12px] font-semibold cursor-pointer flex items-center gap-1.5"
        style={{
          border: active ? "2px solid var(--rn-blue)" : "1px solid var(--rn-section-border)",
          background: active ? "rgba(44,156,233,0.08)" : "var(--rn-white)",
          color: active ? "var(--rn-blue)" : "var(--rn-slate-700)",
        }}
      >
        {label}
        <span className="text-[9px] opacity-60">{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div
          className="absolute top-[calc(100%+6px)] left-0 z-10 rounded-lg p-4 min-w-[280px]"
          style={{
            background: "var(--rn-white)",
            border: "1px solid var(--rn-section-border)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

function ArtistCard({ artist }) {
  return (
    <Link href="/styled/artists/ben-hazlewood" className="no-underline block">
      <div
        className="flex flex-col md:flex-row overflow-hidden rounded transition-shadow hover:shadow-md"
        style={{ border: "1px solid var(--rn-section-border)", background: "var(--rn-white)" }}
      >
        {/* Thumbnail */}
        <div className="w-[140px] h-[140px] flex-shrink-0 overflow-hidden">
          <img
            src={artist.image}
            alt={artist.name}
            className="w-full h-full object-cover"
            style={artist.imagePosition ? { objectPosition: artist.imagePosition } : undefined}
          />
        </div>

        {/* Info */}
        <div className="flex-1 p-3.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[15px] font-bold" style={{ color: "var(--rn-slate-900)" }}>
              {artist.name}
            </span>
            <span
              className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
              style={{ background: "rgba(44,156,233,0.12)", color: "var(--rn-blue)" }}
            >
              ✓
            </span>
          </div>

          <div className="flex flex-wrap gap-1 mt-1.5">
            {artist.genre.map((g) => (
              <span
                key={g}
                className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                style={{ background: "var(--rn-slate-100)", color: "var(--rn-slate-600)" }}
              >
                {g}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 md:gap-4 mt-2 text-[11px]" style={{ color: "var(--rn-slate-600)" }}>
            <span className="font-bold" style={{ color: "var(--rn-slate-900)" }}>
              ${artist.price}/hr
            </span>
            <span>
              👍 {artist.rating}%{" "}
              <span style={{ color: "var(--rn-slate-400)" }}>({artist.reviews})</span>
            </span>
            <span>{artist.bandSize}</span>
            <span style={{ color: "var(--rn-slate-400)" }}>Booked {artist.bookings}×</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function ArtistSearch() {
  const [openFilter, setOpenFilter] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [sortOption, setSortOption] = useState("low");
  const [sortOpen, setSortOpen] = useState(false);
  const [priceMin, setPriceMin] = useState(50);
  const [priceMax, setPriceMax] = useState(5000);

  const toggleFilter = (f) => setOpenFilter(openFilter === f ? null : f);
  const toggleGenre = (g) =>
    setSelectedGenres((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
    );

  const hasFilters = selectedGenres.length > 0;
  const resultCount = hasFilters ? 18 : 42;

  return (
    <div className="bg-white">
      <div className="px-4 md:px-9 py-6 md:py-8">
        {/* Page title */}
        <h1 className="rn-section-heading text-[22px] md:text-[28px] mb-6">
          Find an Artist
        </h1>

        {/* Filter bar */}
        <div className="flex gap-2 flex-wrap items-start mb-6">
          {/* Genre */}
          <FilterDropdown
            label={hasFilters ? `Genre (${selectedGenres.length})` : "Genre"}
            active={hasFilters}
            open={openFilter === "genre"}
            onToggle={() => toggleFilter("genre")}
          >
            <div className="rn-label mb-2">Select Genres</div>
            <div className="flex flex-wrap gap-1.5">
              {GENRES.map((g) => (
                <GenreTag key={g} active={selectedGenres.includes(g)} onClick={() => toggleGenre(g)}>
                  {g}
                </GenreTag>
              ))}
            </div>
          </FilterDropdown>

          {/* Date */}
          <FilterDropdown
            label="Date"
            active={false}
            open={openFilter === "date"}
            onToggle={() => toggleFilter("date")}
          >
            <div className="rn-label mb-2">Select a Date</div>
            <MiniCalendar />
          </FilterDropdown>

          {/* Price */}
          <FilterDropdown
            label="Price"
            active={false}
            open={openFilter === "price"}
            onToggle={() => toggleFilter("price")}
          >
            <div className="rn-label mb-2">Hourly Rate</div>
            <div className="flex justify-between text-[12px] font-semibold mb-1" style={{ color: "var(--rn-slate-700)" }}>
              <span>${priceMin.toLocaleString()}</span>
              <span>${priceMax >= 5000 ? "5,000+" : priceMax.toLocaleString()}</span>
            </div>
            <div className="relative h-8 flex items-center">
              {/* Track background */}
              <div className="absolute w-full h-1 rounded-full" style={{ background: "var(--rn-slate-100)" }} />
              {/* Active range */}
              <div
                className="absolute h-1 rounded-full"
                style={{
                  background: "var(--rn-blue)",
                  left: `${((priceMin - 50) / 4950) * 100}%`,
                  right: `${100 - ((priceMax - 50) / 4950) * 100}%`,
                }}
              />
              {/* Min thumb */}
              <input
                type="range"
                min={50}
                max={5000}
                step={50}
                value={priceMin}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  if (v < priceMax) setPriceMin(v);
                }}
                className="price-range-thumb"
              />
              {/* Max thumb */}
              <input
                type="range"
                min={50}
                max={5000}
                step={50}
                value={priceMax}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  if (v > priceMin) setPriceMax(v);
                }}
                className="price-range-thumb"
              />
            </div>
          </FilterDropdown>

          {/* Clear all */}
          {hasFilters && (
            <button
              onClick={() => setSelectedGenres([])}
              className="px-3 py-2 rounded text-[11px] font-semibold cursor-pointer"
              style={{
                border: "1px solid var(--rn-section-border)",
                background: "var(--rn-white)",
                color: "var(--rn-slate-400)",
              }}
            >
              Clear All
            </button>
          )}
        </div>

        {/* Active filter chips */}
        {hasFilters && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {selectedGenres.map((g) => (
              <button
                key={g}
                onClick={() => toggleGenre(g)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold cursor-pointer"
                style={{
                  background: "rgba(44,156,233,0.08)",
                  color: "var(--rn-blue)",
                  border: "none",
                }}
              >
                {g} <span className="opacity-60">×</span>
              </button>
            ))}
          </div>
        )}

        {/* Results header */}
        <div className="flex justify-between items-center flex-wrap gap-2 mb-4">
          <div>
            <span className="text-[14px] font-bold" style={{ color: "var(--rn-slate-900)" }}>
              {resultCount} artists
            </span>
            <span className="text-[12px] ml-1" style={{ color: "var(--rn-slate-400)" }}>
              {hasFilters ? "match your filters" : "available"}
            </span>
          </div>

          {/* Sort */}
          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="px-3 py-1.5 rounded text-[11px] cursor-pointer flex items-center gap-1.5"
              style={{
                border: "1px solid var(--rn-section-border)",
                background: "var(--rn-slate-100)",
                color: "var(--rn-slate-600)",
              }}
            >
              Sort:{" "}
              <span className="font-bold" style={{ color: "var(--rn-slate-700)" }}>
                {sortOption === "low" ? "Price: Low → High" : "Price: High → Low"}
              </span>
              <span className="text-[9px] opacity-60">{sortOpen ? "▲" : "▼"}</span>
            </button>
            {sortOpen && (
              <div
                className="absolute top-[calc(100%+4px)] right-0 z-10 rounded-lg overflow-hidden min-w-[180px]"
                style={{
                  background: "var(--rn-white)",
                  border: "1px solid var(--rn-section-border)",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                }}
              >
                {[
                  { key: "low", label: "Price: Low → High" },
                  { key: "high", label: "Price: High → Low" },
                ].map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => { setSortOption(opt.key); setSortOpen(false); }}
                    className="block w-full text-left px-3.5 py-2 text-[12px] cursor-pointer border-none"
                    style={{
                      background: sortOption === opt.key ? "rgba(44,156,233,0.08)" : "var(--rn-white)",
                      color: sortOption === opt.key ? "var(--rn-blue)" : "var(--rn-slate-700)",
                      fontWeight: sortOption === opt.key ? 700 : 500,
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Artist cards */}
        <div className="flex flex-col gap-2.5">
          {SAMPLE_ARTISTS.map((a, i) => (
            <ArtistCard key={i} artist={a} />
          ))}
        </div>

        {/* Load more */}
        <div className="text-center mt-6">
          <button
            className="rn-btn-blue px-8"
          >
            Load More Artists
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Mini Calendar ── */
function MiniCalendar() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const cells = Array.from({ length: 35 }, (_, i) => {
    const day = i - 2;
    if (day < 1 || day > 31) return null;
    const unavail = [5, 12, 19, 8, 9, 22, 23, 24].includes(day);
    return { day, unavail };
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-[10px] cursor-pointer" style={{ color: "var(--rn-slate-400)" }}>◀</span>
        <span className="text-[11px] font-bold" style={{ color: "var(--rn-slate-700)" }}>March 2026</span>
        <span className="text-[10px] cursor-pointer" style={{ color: "var(--rn-slate-400)" }}>▶</span>
      </div>
      <div className="grid grid-cols-7 gap-0.5 text-center">
        {days.map((d, i) => (
          <div key={i} className="text-[9px] font-bold py-0.5" style={{ color: "var(--rn-slate-400)" }}>
            {d}
          </div>
        ))}
        {cells.map((c, i) => (
          <div
            key={i}
            className="text-[10px] py-1 rounded cursor-pointer"
            style={{
              color: c ? (c.unavail ? "var(--rn-slate-300)" : "var(--rn-slate-700)") : "transparent",
              fontWeight: 400,
            }}
          >
            {c?.day || ""}
          </div>
        ))}
      </div>
    </div>
  );
}
