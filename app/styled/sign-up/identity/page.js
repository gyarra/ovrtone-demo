"use client";

import { useState } from "react";

const GENRES = [
  "Jazz", "Rock", "Pop", "R&B", "Soul", "Funk", "Latin", "Classical",
  "Country", "Electronic", "Hip-Hop", "Reggae", "Blues", "Folk", "Indie",
  "World", "Afrobeats",
];

export default function IdentityStep() {
  const [selected, setSelected] = useState([]);

  const toggle = (g) =>
    setSelected((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : prev.length < 5 ? [...prev, g] : prev
    );

  return (
    <div>
      <div className="mb-4">
        <label className="rn-field-label block">Artist / Band Name *</label>
        <input className="rn-field-input" placeholder="e.g. The Brooklyn Jazz Collective" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="rn-field-label block">Band Size</label>
          <select className="rn-field-input">
            <option value="">Select band size</option>
            <option>Solo</option>
            <option>Duo</option>
            <option>Trio</option>
            <option>4-piece</option>
            <option>5+ piece</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="rn-field-label block">
          Tagline <span className="font-normal" style={{ color: "var(--rn-slate-400)" }}>(optional · max 100 chars)</span>
        </label>
        <input className="rn-field-input" placeholder="e.g. NYC's Premier Jazz Trio" maxLength={100} />
      </div>

      <div className="mb-4">
        <label className="rn-field-label block">
          About Us <span className="font-normal" style={{ color: "var(--rn-slate-400)" }}>(500–1000 chars)</span>
        </label>
        <textarea className="rn-textarea" placeholder="Tell clients about your act, style, and experience..." rows={4} />
      </div>

      <div>
        <label className="rn-field-label block mb-2">
          Genre * <span className="font-normal" style={{ color: "var(--rn-slate-400)" }}>(select up to 5)</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {GENRES.map((g) => {
            const isSelected = selected.includes(g);
            return (
              <button
                key={g}
                onClick={() => toggle(g)}
                className="px-3 py-1.5 rounded-full text-[12px] font-semibold cursor-pointer transition-colors"
                style={{
                  backgroundColor: isSelected ? "var(--rn-blue)" : "var(--rn-white)",
                  color: isSelected ? "#fff" : "var(--rn-slate-600)",
                  border: isSelected ? "1px solid var(--rn-blue)" : "1px solid var(--rn-section-border)",
                }}
              >
                {g}
              </button>
            );
          })}
        </div>
        <div className="rn-field-note mt-2">{selected.length} of 5 selected</div>
      </div>
    </div>
  );
}
