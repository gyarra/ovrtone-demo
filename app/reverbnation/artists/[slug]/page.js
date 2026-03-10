"use client";

import { useState, useCallback } from "react";
import { C } from "../../components/constants";
import { Avatar, PlaceholderImg, ContentBox } from "../../components/ui";

const PHOTOS = [
  "/ben_hazlewood/web/DSC00209.jpg",
  "/ben_hazlewood/web/DSC00535.jpg",
  "/ben_hazlewood/web/DSC00624.jpg",
  "/ben_hazlewood/web/DSC00674.jpg",
  "/ben_hazlewood/web/DSC00721.jpg",
  "/ben_hazlewood/web/DSC02159.jpg",
  "/ben_hazlewood/web/DSC03770.jpg",
  "/ben_hazlewood/web/DSC03809.jpg",
  "/ben_hazlewood/web/DSC03816.jpg",
  "/ben_hazlewood/web/DSC03823.jpg",
  "/ben_hazlewood/web/DSC03903.jpg",
  "/ben_hazlewood/web/DSC03988.jpg",
];

const ARTIST = {
  name: "The Ben Hazlewood Experience",
  genres: "Rock / Soul / Funk",
  location: "New York, NY",
  bandSize: "5-piece",
  rate: "$250 / hour",
  rateNote: "2hr minimum",
  rating: "100%",
  reviews: 11,
  completedGigs: 14,
  memberSince: "Jan 2026",
  about:
    "Ben Haxlewood combines daring vocals with masterful piano skills to create a sound that is both timeless and fresh. With a repertoire that spans sultry jazz standards, soulful originals, and irresistible funk grooves, Ben and his band bring an unforgettable energy to every performance. Whether you're looking for the perfect cocktail hour ambiance or a high-energy dance set, The Ben Hazlewood Experience delivers an unforgettable musical journey that will have your guests talking long after the last note is played.",
  setLists: [
    {
      name: "Cocktail Hour Set · 60min",
      songs: [
        "Fly Me to the Moon",
        "The Way You Look Tonight",
        "Come Fly with Me",
        "My Way",
        "I've Got You Under My Skin",
        "Witchcraft",
        "The Girl from Ipanema",
        "Summer Wind",
      ],
    },
    {
      name: "Dance Set · 90min",
      songs: [
        "Kiss – Prince",
        "1999 – Prince",
        "Get Up (I Feel Like Being a) Sex Machine – James Brown",
        "I Got You (I Feel Good) – James Brown",
        "When Doves Cry – Prince",
        "Living in America – James Brown",
        "Little Red Corvette – Prince",
        "Papa's Got a Brand New Bag – James Brown",
        "Raspberry Beret – Prince",
        "It's a Man's Man's Man's World – James Brown",
      ],
    },
    {
      name: "90s Rock Set · 60min",
      songs: [
        "Are You Gonna Go My Way – Lenny Kravitz",
        "Fly Away – Lenny Kravitz",
        "Black Hole Sun – Soundgarden",
        "Plush – Stone Temple Pilots",
        "It Ain't Over 'til It's Over – Lenny Kravitz",
        "Under the Bridge – Red Hot Chili Peppers",
        "Alive – Pearl Jam",
        "Again – Lenny Kravitz",
      ],
    },
  ],
  links: [
    { icon: "web", label: "thevelvetgroove.com" },
    { icon: "music", label: "Spotify" },
    { icon: "music", label: "Apple Music" },
    { icon: "fb", label: "facebook.com/VelvetGroove" },
  ],
};

export default function ArtistProfilePage() {
  const [activeIdx, setActiveIdx] = useState(null);
  const [selectedSet, setSelectedSet] = useState(0);

  const next = useCallback(() => setActiveIdx(i => (i + 1) % PHOTOS.length), []);
  const prev = useCallback(() => setActiveIdx(i => ((i ?? 0) - 1 + PHOTOS.length) % PHOTOS.length), []);

  return (
    <>
      {/* HERO / COVER */}
      <section className="relative bg-[rgb(31,32,37)]">
        <div className="relative w-full h-[350px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/ben_hazlewood/ben_hero')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-transparent" />
        </div>

        <div className="mx-auto px-9 relative -mt-[120px]">
          <div className="flex items-end gap-5 pb-4" style={{ paddingLeft: 260 }}>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1.5">
                <h1 className="text-white text-[40px] leading-[52px]" style={{ fontWeight: 300 }}>
                  {ARTIST.name}
                </h1>

              </div>
              <p className="text-[18px] text-white/70 italic mb-1" style={{ fontWeight: 300 }}>
                Where performance meets resonance
              </p>
              <p className="text-[16px] text-[#ccc]" style={{ fontWeight: 400 }}>
                {ARTIST.genres}&nbsp;&nbsp;{"\u2022"}&nbsp;&nbsp;{ARTIST.location}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Profile photo bar + Key Details */}
      <div className="relative bg-white h-[60px] pb-3">
        <div className="mx-auto px-9 relative h-full flex items-center">
          <div
            className="absolute shrink-0 overflow-hidden w-[248px] h-[187px] border-2 border-white -top-[143px] left-9"
          >
            <img src="/ben_hazlewood/ben_avatar_1.jpg" alt={ARTIST.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-1 justify-between" style={{ marginLeft: 272 }}>
            {[
              ["Genre", ARTIST.genres],
              ["Band Size", ARTIST.bandSize],
              ["Event Types", "Weddings · Corporate · Bars"],
              ["Languages", "English · Spanish"],
            ].map(([label, value]) => (
              <div key={label}>
                <div className="text-[10px] text-[#999] uppercase tracking-wide font-bold mb-0.5">{label}</div>
                <div className="text-[13px] font-semibold text-[#1e293b]">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="w-full">
        <div className="bg-white">

          {/* 2. Media Gallery */}
          <div className="border-t border-b border-[rgb(223,228,230)]">
            <ContentBox>

              {/* Videos */}
              <div className="grid grid-cols-2 gap-4 mb-5">
                <div className="relative bg-[#1a1a1a] overflow-hidden rounded" style={{ aspectRatio: "16/10" }}>
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/DbMWjkFTmvM?rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&fs=0"
                    title="Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="relative bg-[#1a1a1a] overflow-hidden rounded" style={{ aspectRatio: "16/10" }}>
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/x_9uTApdOw0?rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&fs=0"
                    title="Video 2"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>

              {/* Gallery - main image */}
              <div
                className="rounded overflow-hidden mb-3 relative"
                style={{
                  maxHeight: activeIdx !== null ? 600 : 0,
                  opacity: activeIdx !== null ? 1 : 0,
                  transition: "max-height 0.35s ease, opacity 0.3s ease",
                  aspectRatio: activeIdx !== null ? "16/9" : undefined,
                }}
              >
                {PHOTOS.map((src, i) => (
                  <img
                    key={src}
                    src={src}
                    alt={`Photo ${i + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ opacity: i === activeIdx ? 1 : 0, zIndex: i === activeIdx ? 1 : 0 }}
                  />
                ))}
                {activeIdx !== null && (
                  <>
                    {/* prev / next */}
                    <button
                      onClick={prev}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center text-[18px] cursor-pointer hover:bg-black/70 transition-colors z-10"
                    >
                      ‹
                    </button>
                    <button
                      onClick={next}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center text-[18px] cursor-pointer hover:bg-black/70 transition-colors z-10"
                    >
                      ›
                    </button>
                    {/* close */}
                    <button
                      onClick={() => setActiveIdx(null)}
                      className="absolute top-2 right-3 w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center text-[14px] cursor-pointer hover:bg-black/70 transition-colors z-10"
                    >
                      ✕
                    </button>
                    {/* counter */}
                    <div className="absolute bottom-2 right-3 bg-black/60 text-white text-[11px] px-2 py-0.5 rounded z-10">
                      {activeIdx + 1} / {PHOTOS.length}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnail strip */}
              <div className="flex gap-2 overflow-x-auto pb-1">
                {PHOTOS.map((src, i) => (
                  <button
                    key={src}
                    onClick={() => setActiveIdx(activeIdx === i ? null : i)}
                    className="flex-shrink-0 w-[88px] h-[60px] rounded overflow-hidden cursor-pointer transition-all duration-200 border-2"
                    style={{
                      opacity: activeIdx === null || i === activeIdx ? 1 : 0.5,
                      borderColor: i === activeIdx ? C.blue : "transparent",
                      transform: i === activeIdx ? "scale(1.05)" : "scale(1)",
                    }}
                  >
                    <img src={src} alt={`Thumb ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </ContentBox>
          </div>

          {/* 4. About Us */}
          <ContentBox style={{ borderBottom: `1px solid ${C.sectionBorder}` }}>
            <h4 className="text-[18px] text-black mb-2 font-medium">About Us</h4>
            <p className="text-[14px] text-[#666] leading-relaxed">{ARTIST.about}</p>
          </ContentBox>

          {/* Two-column layout */}
          <div className="flex" style={{ borderBottom: `1px solid ${C.sectionBorder}` }}>
            {/* Left column: Gig Requirements + Additional Details */}
            <div className="flex-1" style={{ borderRight: `1px solid ${C.sectionBorder}` }}>
              <ContentBox style={{ borderBottom: `1px solid ${C.sectionBorder}` }}>
                <h4 className="text-[18px] text-black mb-3 font-medium">Gig Requirements</h4>
                <div className="text-[14px] text-[#666] leading-[2]">
                  {["Power supply (2 standard outlets minimum)", "Parking / load-in access", "Minimum stage area: 10×8 ft",
                    "Sound check: 30 min before event", "Meals provided for 5 performers"].map(r => (
                    <div key={r}>{r}</div>
                  ))}
                </div>
              </ContentBox>

              <ContentBox>
                <h4 className="text-[18px] text-black mb-3 font-medium">Additional Details</h4>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="text-[12px] text-[#94a3b8] uppercase tracking-wide font-bold mb-3">Performance Details</div>
                    {[
                      ["Setup/Breakdown", "45 min before · 30 min after"],
                      ["Duration Options", "1hr · 2hr · 3hr · 4+hr"],
                      ["Booking Lead Time", "Book at least 7 days in advance"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between py-2 border-b border-[#f1f5f9]">
                        <span className="text-[13px] text-[#64748b]">{k}</span>
                        <span className="text-[13px] font-semibold text-[#334155]">{v}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="text-[12px] text-[#94a3b8] uppercase tracking-wide font-bold mb-3">Links &amp; Social</div>
                    {["Website", "Instagram", "Spotify", "YouTube", "SoundCloud"].map(l => (
                      <div key={l} className="py-2 text-[13px] text-[#475569] border-b border-[#f1f5f9]">{l}</div>
                    ))}
                    <div className="text-[12px] text-[#94a3b8] uppercase tracking-wide font-bold mt-4 mb-1">Service Area</div>
                    <div className="text-[13px] text-[#475569]">Manhattan, Brooklyn, Queens</div>
                  </div>
                </div>
              </ContentBox>
            </div>

            {/* Right column: Set Lists */}
            <div className="w-[340px] flex-shrink-0">
              <ContentBox>
                <h4 className="text-[18px] text-black mb-3 font-medium">Set Lists</h4>
                <div className="flex flex-col gap-2">
                  {ARTIST.setLists.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedSet(i)}
                      className="text-left rounded px-4 py-3 text-[14px] cursor-pointer transition-colors"
                      style={{
                        backgroundColor: selectedSet === i ? C.blue : "transparent",
                        color: selectedSet === i ? "#fff" : "#333",
                        border: selectedSet === i ? `1px solid ${C.blue}` : "1px solid #ddd",
                        fontWeight: selectedSet === i ? 600 : 400,
                      }}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
                {ARTIST.setLists[selectedSet].songs.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-[#f1f5f9]">
                    <div className="text-[11px] text-[#94a3b8] uppercase tracking-wide font-bold mb-2">Songs</div>
                    <div className="divide-y divide-[#f1f5f9]">
                      {ARTIST.setLists[selectedSet].songs.map((song, i) => (
                        <div key={i} className="flex items-center gap-2.5 py-2">
                          <span className="text-[12px] text-[#94a3b8] w-5 text-right tabular-nums">{i + 1}</span>
                          <span className="text-[13px] text-[#334155]">{song}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </ContentBox>
            </div>
          </div>

          {/* 9. Booking CTA */}
          <ContentBox>
            <div className="flex items-center justify-between bg-[#0f172a] rounded-lg px-6 py-4">
              <div>
                <div className="text-[16px] font-bold text-white">
                  {ARTIST.rate} <span className="text-[13px] font-normal text-[#94a3b8]">· {ARTIST.rateNote}</span>
                </div>
              </div>
              <button
                className="text-[14px] font-bold text-white rounded px-6 py-2.5 cursor-pointer"
                style={{ backgroundColor: C.blueBtnBg, border: `1px solid ${C.blueBtnBorder}` }}
              >
                Book This Artist
              </button>
            </div>
          </ContentBox>

          {/* Report */}
          <div className="text-center py-4 border-t border-[#f1f5f9]">
            <span className="text-[12px] text-[#cbd5e1] cursor-pointer">🚩 Report this profile</span>
          </div>

        </div>
      </main>
    </>
  );
}
