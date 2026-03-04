"use client";

import { useState } from "react";
import Link from "next/link";

/* ─── palette & tokens ──────────────────────────────── */
const C = {
  black: "#1a1a1a",
  darkBg: "#2d2d2d",
  headerBg: "#1e1e1e",
  white: "#ffffff",
  lightGray: "#f5f5f5",
  midGray: "#e0e0e0",
  gray: "#999999",
  darkGray: "#666666",
  textPrimary: "#333333",
  textSecondary: "#666666",
  blue: "#2d9cdb",
  blueHover: "#2488c4",
  red: "#e74c3c",
  fan: "#e8513d",
  green: "#27ae60",
  border: "#e0e0e0",
  heroBg: "#3a3a3a",
};

/* ─── mock data ─────────────────────────────────────── */
const SONGS = [
  { title: "Cry", duration: "4:07", bandcamp: false },
  { title: "Do You Like That", duration: "3:32", bandcamp: true },
  { title: "Possession", duration: "3:40", bandcamp: true },
  { title: "New Sensation", duration: "3:35", bandcamp: true },
  { title: "Colors of Leaving", duration: "4:44", bandcamp: true },
];

const PERFORMANCES = [
  { month: "APR", day: "28", year: "2016", venue: "The GRAMMY Museum", location: "in Los Angeles, CA", date: "04.28.16" },
  { month: "MAR", day: "26", year: "2016", venue: "DovFest", location: "in New Cuyama, CA", date: "03.26.16" },
  { month: "MAR", day: "19", year: "2016", venue: "Blind Pig Pub", location: "in Austin, TX", date: "03.19.16" },
];

const COMMENTS = [
  { name: "Daly Redline", text: ". Excellent♡ ☺︎♡♡" },
  { name: "Rosette Cribben", text: "So much creativity coming out of you Le..." },
  { name: "Red Cloud", text: "Your music and (beautiful) voice are so ..." },
];

const FAVORITE_ARTISTS = [
  { name: "King Washington", genre: "Rock / Los Angeles, CA" },
  { name: "Matrimony", genre: "Alternative / Charlotte, NC" },
  { name: "Bravesoul", genre: "Pop / Los Angeles, CA" },
];

const COLLECTIONS = [
  { name: "Indie Pop" },
  { name: "Decompress" },
  { name: "Dark Pop" },
];

const FOOTER_LINKS = {
  ReverbNation: ["Blog", "Careers", "Need Help?", "Forgot Password", "CONNECT"],
  "Artist Membership": ["Overview", "Pricing", "Feature Index"],
  "Artist Development": ["Opportunity Submissions", "Gig Finder"],
  "Artist Tools": ["Advertise on Music Sites", "Sponsored Artists", "Digital Distribution", "Sell Direct", "Fan Reach", "Site Builder", "Marketplace", "Publishing Administration"],
  Policies: ["Terms & Conditions", "Privacy", "Your California Privacy Rights", "Copyright", "Trademark", "Refunds", "Abuse"],
};

const NAV_ITEMS = ["Features", "Discover", "Crowd Picks", "Charts", "Opportunities", "Distribution", "Pricing"];
const TABS = ["Overview", "Music", "Videos", "Events"];
const FOOTER_TABS = ["Artists", "Music Industry", "Fans", "Venues"];

/* ─── tiny components ───────────────────────────────── */

function Avatar({ size = 40, color = "#ccc" }) {
  return (
    <div
      className="rounded-full flex-shrink-0"
      style={{ width: size, height: size, backgroundColor: color }}
    />
  );
}

function PlaceholderImg({ w, h, className = "", style = {} }) {
  return (
    <div
      className={`bg-gray-300 ${className}`}
      style={{ width: w, height: h, minHeight: h, ...style }}
    />
  );
}

function WaveformBar() {
  return (
    <div className="flex items-end gap-[2px] h-[30px]">
      {Array.from({ length: 40 }).map((_, i) => {
        const h = 6 + Math.floor(Math.random() * 24);
        return (
          <div
            key={i}
            className="w-[3px] rounded-sm"
            style={{ height: h, backgroundColor: i < 12 ? C.blue : "#ccc" }}
          />
        );
      })}
    </div>
  );
}

/* ─── MAIN PAGE ─────────────────────────────────────── */
export default function ReverbNationPage() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [footerTab, setFooterTab] = useState("Artists");

  return (
    <div style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", color: C.textPrimary, backgroundColor: C.white }}>

      {/* ═══════ HEADER NAV ═══════ */}
      <header style={{ backgroundColor: C.headerBg }} className="sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto flex items-center h-[50px] px-4 gap-4">
          {/* Logo */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke={C.blue} strokeWidth="2"/><circle cx="10" cy="10" r="4" fill={C.blue}/></svg>
            <span className="text-white font-bold text-[15px] tracking-tight">ReverbNation</span>
          </div>

          {/* Search */}
          <div className="flex items-center bg-[#444] rounded-full px-3 py-1 gap-2 w-[200px]">
            <svg width="14" height="14" fill="none" stroke="#aaa" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>
            <span className="text-[13px] text-[#aaa]">Search ReverbNation</span>
          </div>

          {/* Nav links */}
          <nav className="flex items-center gap-5 ml-2">
            {NAV_ITEMS.map((item) => (
              <span key={item} className="text-[13px] text-[#ccc] hover:text-white cursor-pointer whitespace-nowrap">
                {item}
              </span>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <span className="text-[13px] text-[#ccc] cursor-pointer">Log In</span>
            <button
              className="text-[13px] font-semibold text-white rounded px-4 py-1.5 cursor-pointer"
              style={{ backgroundColor: C.blue }}
            >
              Join For Free
            </button>
          </div>
        </div>
      </header>

      {/* ═══════ HERO SECTION ═══════ */}
      <section style={{ backgroundColor: C.heroBg }} className="relative">
        {/* Cover image placeholder */}
        <div className="max-w-[1200px] mx-auto relative" style={{ height: 240 }}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.5)]" />
          <PlaceholderImg w="100%" h={240} style={{ backgroundColor: "#4a5568" }} />
        </div>

        {/* Artist info overlay */}
        <div className="max-w-[1200px] mx-auto px-4 relative" style={{ marginTop: -80 }}>
          <div className="flex items-end gap-5 pb-4">
            {/* Artist photo */}
            <div className="w-[120px] h-[120px] rounded bg-gray-400 border-4 border-white shadow-lg flex-shrink-0 overflow-hidden">
              <PlaceholderImg w={120} h={120} style={{ backgroundColor: "#7a8a9a" }} />
            </div>

            <div className="pb-1">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-white text-[28px] font-bold leading-tight">Lena Fayre</h1>
                <button className="flex items-center gap-1.5 border border-[#888] rounded px-3 py-1 text-[12px] text-white cursor-pointer hover:bg-white/10">
                  <svg width="12" height="12" fill="white" viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/></svg>
                  Share
                </button>
                <button className="border border-[#888] rounded px-3 py-1 text-[12px] text-white cursor-pointer hover:bg-white/10">
                  Become a Fan
                </button>
              </div>
              <p className="text-[13px] text-[#ccc]">
                Pop / Singer Songwriter / Experimental&nbsp;&nbsp;•&nbsp;&nbsp;Manhattan Beach, CA&nbsp;
                <span className="inline-block w-4 h-3 bg-blue-700 rounded-sm align-middle" title="US Flag" />
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 border-b border-[#555]">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="pb-3 text-[14px] cursor-pointer transition-colors"
                style={{
                  color: activeTab === tab ? C.white : "#aaa",
                  borderBottom: activeTab === tab ? `2px solid ${C.white}` : "2px solid transparent",
                  fontWeight: activeTab === tab ? 600 : 400,
                  marginBottom: -1,
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ MAIN CONTENT (3 columns) ═══════ */}
      <main className="max-w-[1200px] mx-auto px-4 py-6">
        <div className="grid grid-cols-[1fr_1fr_300px] gap-6">

          {/* ─── LEFT COLUMN: Featured Songs ─── */}
          <div>
            <section className="border border-[#e0e0e0] rounded bg-white p-5 mb-6">
              <h2 className="text-[16px] font-bold mb-4">Featured Songs</h2>

              {/* Player */}
              <div className="flex items-center gap-3 mb-3">
                <button
                  className="w-[50px] h-[50px] rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: C.blue }}
                >
                  <svg width="20" height="20" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </button>
                <div className="flex-1">
                  <WaveformBar />
                </div>
                <span className="text-[12px] text-[#999] flex-shrink-0">0:00 / 4:07</span>
              </div>

              <div className="flex gap-4 text-[12px] mb-4" style={{ color: C.blue }}>
                <span className="cursor-pointer">► play all</span>
                <span className="cursor-pointer">↗ share all</span>
                <span className="cursor-pointer">&lt;/&gt; embed</span>
              </div>

              {/* Song list */}
              <div className="divide-y divide-[#eee]">
                {SONGS.map((song, i) => (
                  <div key={i} className="flex items-center py-2.5 gap-3">
                    <span className="text-[18px] text-[#ccc] cursor-pointer">+</span>
                    <svg width="14" height="14" fill={C.blue} viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    <span className="text-[14px] flex-1">{song.title}</span>
                    {song.bandcamp && (
                      <span className="text-[10px] border border-[#ddd] rounded px-2 py-0.5 text-[#666] cursor-pointer">
                        Buy on<br/>Bandcamp
                      </span>
                    )}
                    <span className="text-[13px] text-[#999] w-[40px] text-right">{song.duration}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <span className="text-[13px] cursor-pointer" style={{ color: C.blue }}>All Music »</span>
              </div>
            </section>

            {/* ─── COMMUNITY ─── */}
            <section className="border border-[#e0e0e0] rounded bg-white p-5">
              <h2 className="text-[16px] font-bold mb-3">Community</h2>

              <h3 className="text-[13px] font-bold mb-1">Status</h3>
              <p className="text-[13px] text-[#666] mb-4">
                I am taking a break and planning the next chapter. Stay tuned....
              </p>

              <div className="mb-3">
                <span className="text-[14px] font-bold" style={{ color: C.blue }}>3568 Fans</span>
                <div className="flex gap-1 mt-2 flex-wrap">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <PlaceholderImg key={i} w={42} h={42} className="rounded" style={{ backgroundColor: `hsl(${i * 40 + 200}, 30%, ${60 + i * 3}%)` }} />
                  ))}
                </div>
              </div>

              <button className="border border-[#ddd] rounded px-3 py-1.5 text-[12px] text-[#333] cursor-pointer hover:bg-[#f5f5f5] mb-5">
                Become a Fan
              </button>

              <h3 className="text-[14px] font-bold mb-3" style={{ color: C.red }}>Comments</h3>
              <div className="space-y-4">
                {COMMENTS.map((c, i) => (
                  <div key={i} className="flex gap-3">
                    <Avatar size={36} color={`hsl(${i * 90 + 180}, 25%, 65%)`} />
                    <div>
                      <span className="text-[13px] font-bold block" style={{ color: C.blue }}>{c.name}</span>
                      <span className="text-[13px] text-[#666]">{c.text}</span>
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-4 border border-[#ddd] rounded px-3 py-1.5 text-[12px] text-[#333] cursor-pointer hover:bg-[#f5f5f5]">
                Add Comment
              </button>
            </section>
          </div>

          {/* ─── MIDDLE COLUMN: Featured Video + Past Performances ─── */}
          <div>
            <section className="border border-[#e0e0e0] rounded bg-white p-5 mb-6">
              <h2 className="text-[16px] font-bold mb-4">Featured Video</h2>

              {/* Video placeholder */}
              <div className="relative bg-[#1a1a1a] rounded overflow-hidden mb-3" style={{ aspectRatio: "16/10" }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <PlaceholderImg w="100%" h="100%" style={{ backgroundColor: "#3a3a3a", position: "absolute", inset: 0 }} />
                    <div className="relative z-10">
                      <svg width="50" height="50" viewBox="0 0 50 50" fill="none" className="mx-auto mb-2 opacity-80">
                        <circle cx="25" cy="25" r="24" stroke="white" strokeWidth="2"/>
                        <path d="M20 15l15 10-15 10z" fill="white"/>
                      </svg>
                    </div>
                  </div>
                </div>
                {/* vevo badge */}
                <div className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wide">
                  vevo
                </div>
              </div>

              <h3 className="text-[15px] font-bold mb-1">Cry</h3>
              <p className="text-[12px] text-[#999]">
                Duration · 4:16&nbsp;&nbsp;Views · 551.1K&nbsp;&nbsp;Likes · 1.3K
              </p>

              <div className="mt-4">
                <span className="text-[13px] cursor-pointer" style={{ color: C.blue }}>All Videos »</span>
              </div>
            </section>

            {/* ─── PAST PERFORMANCES ─── */}
            <section className="border border-[#e0e0e0] rounded bg-white p-5">
              <h2 className="text-[16px] font-bold mb-4">Past Performances</h2>

              <div className="divide-y divide-[#eee]">
                {PERFORMANCES.map((p, i) => (
                  <div key={i} className="flex gap-4 py-4">
                    {/* Date block */}
                    <div className="flex-shrink-0 w-[60px] text-center border border-[#e0e0e0] rounded py-2">
                      <div className="text-[11px] font-bold text-[#999] uppercase">{p.month} {p.day}</div>
                      <div className="text-[13px] font-bold text-[#666]">{p.year}</div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-[14px] font-bold">{p.venue}</div>
                      <div className="text-[12px] text-[#999]">{p.location} · {p.date}</div>
                      <span className="text-[12px] cursor-pointer" style={{ color: C.blue }}>Get Directions</span>
                    </div>

                    <button className="self-center text-[18px] text-[#ccc] cursor-pointer">⋯</button>
                  </div>
                ))}
              </div>

              <div className="mt-3">
                <span className="text-[13px] cursor-pointer" style={{ color: C.blue }}>All Past Events »</span>
              </div>
            </section>
          </div>

          {/* ─── RIGHT SIDEBAR ─── */}
          <aside>
            {/* About the Artist */}
            <section className="border border-[#e0e0e0] rounded bg-white p-5 mb-6">
              <h2 className="text-[16px] font-bold mb-3">About the Artist</h2>
              <p className="text-[13px] text-[#666] leading-relaxed mb-2">
                Only 19-years old, Los Angeles indie artist Lena Fayre has already amassed over 20 million 
                Spotify streams and YouTube views, accumulated over 400,000 monthly Spotify listeners, 
                won multiple songwriting awards including Jo...
              </p>
              <span className="text-[13px] cursor-pointer block mb-5" style={{ color: C.blue }}>Read More</span>

              {/* CTA buttons */}
              <div className="flex items-center gap-2 mb-5">
                <button
                  className="text-white text-[13px] font-bold rounded px-4 py-2 cursor-pointer"
                  style={{ backgroundColor: C.fan }}
                >
                  Become a Fan
                </button>
                <button className="w-[36px] h-[36px] border border-[#ddd] rounded flex items-center justify-center cursor-pointer hover:bg-[#f5f5f5]">
                  <svg width="14" height="14" fill="#666" viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/></svg>
                </button>
                <button className="w-[36px] h-[36px] border border-[#ddd] rounded flex items-center justify-center cursor-pointer hover:bg-[#f5f5f5]">
                  <svg width="14" height="14" fill="#666" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 text-center border-t border-b border-[#eee] py-4 mb-5">
                <div>
                  <div className="text-[18px] font-bold">57.8K</div>
                  <div className="text-[10px] text-[#999] uppercase">Song Plays</div>
                </div>
                <div>
                  <div className="text-[18px] font-bold">8K</div>
                  <div className="text-[10px] text-[#999] uppercase">Video Plays</div>
                </div>
                <div>
                  <div className="text-[18px] font-bold">3.6K</div>
                  <div className="text-[10px] text-[#999] uppercase">Total Fans</div>
                </div>
              </div>

              {/* Links */}
              <div className="space-y-3 mb-5">
                {[
                  { icon: "🎵", label: "iTunes" },
                  { icon: "🎵", label: "Amazon Mp3" },
                  { icon: "🌐", label: "lenafayre.com/" },
                  { icon: "f", label: "facebook.com/LenaFayre" },
                ].map((link, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] flex-shrink-0"
                      style={{ backgroundColor: C.blue, color: "white" }}>
                      {link.icon === "f" ? "f" : "♪"}
                    </span>
                    <span className="text-[13px] text-[#333] truncate">{link.label}</span>
                  </div>
                ))}
                <span className="text-[13px] cursor-pointer" style={{ color: C.blue }}>More</span>
              </div>

              {/* Press */}
              <div className="border-t border-[#eee] pt-4">
                <h3 className="text-[15px] font-bold mb-2">Press</h3>
                <p className="text-[13px] text-[#666] italic leading-relaxed mb-2">
                  &quot;2015 Grand Prize Winner John Lennon Songwriting Contest&quot;
                </p>
                <p className="text-[13px] text-[#666] leading-relaxed mb-2">
                  · The John Lennon Songwriting Contest
                </p>
                <span className="text-[13px] cursor-pointer" style={{ color: C.blue }}>Read More</span>
              </div>
            </section>

            {/* Favorite Artists */}
            <section className="border border-[#e0e0e0] rounded bg-white p-5 mb-6">
              <h2 className="text-[15px] font-bold mb-3">Favorite Artists</h2>
              <div className="space-y-3">
                {FAVORITE_ARTISTS.map((a, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Avatar size={36} color={`hsl(${i * 60 + 10}, 40%, 55%)`} />
                    <div>
                      <div className="text-[13px] font-bold">{a.name}</div>
                      <div className="text-[11px] text-[#999]">{a.genre}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Suggested Collections */}
            <section className="border border-[#e0e0e0] rounded bg-white p-5">
              <h2 className="text-[15px] font-bold mb-3">Suggested Collections</h2>
              <div className="space-y-3">
                {COLLECTIONS.map((c, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <PlaceholderImg w={40} h={40} className="rounded" style={{ backgroundColor: `hsl(${i * 50 + 220}, 45%, 45%)` }} />
                    <span className="text-[13px] font-bold">{c.name}</span>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>

        {/* ─── PHOTO GALLERY ROW ─── */}
        <div className="flex gap-3 mt-6 mb-6 overflow-x-auto">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[200px] h-[140px] rounded overflow-hidden"
              style={{ backgroundColor: `hsl(${i * 30 + 190}, 25%, ${40 + i * 8}%)` }}
            />
          ))}
        </div>
      </main>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="border-t border-[#e0e0e0]">
        {/* Tools For tabs */}
        <div className="max-w-[1200px] mx-auto px-4 pt-6">
          <div className="flex items-center gap-6 border-b border-[#e0e0e0] pb-0">
            <span className="text-[14px] font-bold text-[#333] pb-3">Tools For:</span>
            {FOOTER_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setFooterTab(tab)}
                className="pb-3 text-[13px] cursor-pointer"
                style={{
                  color: footerTab === tab ? C.textPrimary : C.gray,
                  borderBottom: footerTab === tab ? "2px solid #333" : "2px solid transparent",
                  fontWeight: footerTab === tab ? 600 : 400,
                  marginBottom: -1,
                }}
              >
                {tab}
              </button>
            ))}

            {/* Social icons */}
            <div className="ml-auto flex gap-2">
              {["BLOG", "f", "𝕏", "▶", "📷", "P"].map((icon, i) => (
                <div
                  key={i}
                  className="w-[28px] h-[28px] rounded flex items-center justify-center text-white text-[11px] font-bold cursor-pointer"
                  style={{ backgroundColor: ["#ff5722", "#3b5998", "#1da1f2", "#ff0000", "#c13584", "#bd081c"][i] }}
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Link columns */}
        <div className="max-w-[1200px] mx-auto px-4 py-8" style={{ backgroundColor: "#f8f8f8" }}>
          <div className="grid grid-cols-5 gap-6">
            {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
              <div key={heading}>
                <h4 className="text-[13px] font-bold mb-3" style={{ color: C.blue }}>
                  {heading}
                </h4>
                <ul className="space-y-1.5">
                  {links.map((link) => (
                    <li key={link}>
                      <span className="text-[12px] text-[#666] cursor-pointer hover:underline">{link}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#e0e0e0] py-4 text-center" style={{ backgroundColor: "#f8f8f8" }}>
          <p className="text-[11px] text-[#999]">© 2006-2026 BandLab Singapore Pte. Ltd.</p>
          <p className="text-[10px] text-[#bbb] mt-1">
            All third party trademarks are the property of the respective trademark owners. ReverbNation is not affiliated with those trademark owners.
          </p>
        </div>
      </footer>
    </div>
  );
}
