"use client";

import { useState } from "react";
import { C } from "../../components/constants";
import { Avatar, PlaceholderImg, ContentBox } from "../../components/ui";

const TABS = ["Overview", "Music", "Videos", "Events"];

const ARTIST = {
  name: "The Velvet Groove",
  tagline: "NYC's Premier Jazz Trio — Crafting Unforgettable Moments",
  genres: "Jazz / Soul / Funk",
  location: "New York, NY",
  bandSize: "5-piece",
  rate: "$250 / hour",
  rateNote: "2hr minimum",
  rating: "95%",
  reviews: 24,
  completedGigs: 18,
  memberSince: "Jan 2026",
  about:
    "The Velvet Groove is a dynamic 5-piece ensemble based in New York City, blending jazz, soul, and funk into an unforgettable live experience. With over 18 completed gigs on the Ovrtone platform, they bring professionalism and energy to every event — from intimate cocktail hours to large corporate gatherings.",
  songs: [
    { title: "Midnight in Manhattan", duration: "5:12" },
    { title: "Soulful Stride", duration: "4:28" },
    { title: "Groove Theory", duration: "3:55" },
    { title: "Blue Note Revival", duration: "6:01" },
    { title: "Velvet Hour", duration: "4:44" },
  ],
  setLists: ["Cocktail Hour Set · 60min", "Dance Set · 90min", "Dinner Set · 60min"],
  links: [
    { icon: "web", label: "thevelvetgroove.com" },
    { icon: "music", label: "Spotify" },
    { icon: "music", label: "Apple Music" },
    { icon: "fb", label: "facebook.com/VelvetGroove" },
  ],
};

export default function ArtistProfilePage() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <>
      {/* HERO / COVER */}
      <section className="relative bg-[rgb(31,32,37)]">
        <div className="relative w-full h-[350px]">
          <div className="absolute inset-0" style={{ backgroundColor: "hsl(220, 25%, 25%)" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-transparent" />
        </div>

        <div className="mx-auto px-9 relative -mt-[120px]">
          <div className="flex items-end gap-5 pb-4" style={{ paddingLeft: 260 }}>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1.5">
                <h1 className="text-white text-[40px] leading-[52px]" style={{ fontWeight: 300 }}>
                  {ARTIST.name}
                </h1>
                <button
                  className="flex items-center gap-1.5 px-4 py-2 text-[14px] text-white cursor-pointer"
                  style={{ backgroundColor: "rgba(0,0,0,0.1)", border: "1px solid #fff", fontWeight: 500, borderRadius: 1000 }}
                >
                  Become a Fan
                </button>
              </div>
              <p className="text-[16px] text-[#ccc]" style={{ fontWeight: 400 }}>
                {ARTIST.genres}&nbsp;&nbsp;{"\u2022"}&nbsp;&nbsp;{ARTIST.location}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TAB NAV BAR */}
      <div className="relative bg-white h-[60px] border-b border-[rgb(223,228,230)]">
        <div className="mx-auto px-9 relative h-full flex items-center">
          {/* Profile photo placeholder */}
          <div
            className="absolute shrink-0 overflow-hidden w-[248px] h-[187px] border-2 border-white -top-[143px] left-9 bg-[hsl(220,20%,40%)]"
          />

          <div className="flex items-center h-full ml-[260px] pl-3">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="h-full px-3 text-[18px] cursor-pointer transition-colors"
                style={{
                  color: activeTab === tab ? "rgb(66, 93, 170)" : C.black,
                  fontWeight: 500,
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN CONTENT + SIDEBAR */}
      <main className="flex w-full">
        {/* Content area */}
        <div className="flex-1 bg-white">
          {/* Key Stats Bar */}
          <div className="border-b border-[rgb(223,228,230)] px-8 py-5">
            <div className="flex gap-8 text-[14px]">
              <div><span className="font-bold">{ARTIST.rating}</span> <span className="text-[#999]">rating · {ARTIST.reviews} reviews</span></div>
              <div><span className="font-bold">{ARTIST.bandSize}</span></div>
              <div><span className="text-[#999]">Member since {ARTIST.memberSince}</span></div>
              <div><span className="font-bold">{ARTIST.completedGigs}</span> <span className="text-[#999]">completed gigs</span></div>
            </div>
          </div>

          {/* About */}
          <ContentBox>
            <h4 className="text-[18px] text-black mb-2 font-medium">About</h4>
            <p className="text-[14px] text-[#666] leading-relaxed">{ARTIST.about}</p>
          </ContentBox>

          {/* Featured Songs */}
          <ContentBox style={{ borderTop: `1px solid ${C.sectionBorder}` }}>
            <h4 className="text-[18px] text-black mb-3 font-medium">Featured Songs</h4>
            <div className="divide-y divide-[#eee]">
              {ARTIST.songs.map((song, i) => (
                <div key={i} className="flex items-center py-3 gap-3">
                  <svg width="14" height="14" fill={C.blue} viewBox="0 0 24 24" className="flex-shrink-0"><path d="M8 5v14l11-7z"/></svg>
                  <span className="text-[14px] flex-1">{song.title}</span>
                  <span className="text-[14px] text-[#999] w-[40px] text-right tabular-nums">{song.duration}</span>
                </div>
              ))}
            </div>
          </ContentBox>

          {/* Media Gallery */}
          <div className="border-t border-[rgb(223,228,230)]">
            <ContentBox>
              <h4 className="text-[18px] text-black mb-3 font-medium">Photos &amp; Videos</h4>
              <div className="grid grid-cols-2 gap-4 mb-4">
                {[1, 2].map((i) => (
                  <div key={i} className="relative bg-[#1a1a1a] overflow-hidden" style={{ aspectRatio: "16/10" }}>
                    <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: `hsl(${i * 40 + 200}, 25%, 30%)` }}>
                      <svg width="48" height="48" viewBox="0 0 60 60" fill="none" className="opacity-60">
                        <circle cx="30" cy="30" r="28" stroke="white" strokeWidth="2"/>
                        <path d="M24 18l18 12-18 12z" fill="white"/>
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 overflow-x-auto">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-[140px] h-[95px] rounded overflow-hidden"
                    style={{ backgroundColor: `hsl(${i * 30 + 190}, 25%, ${40 + i * 8}%)` }}
                  />
                ))}
              </div>
            </ContentBox>
          </div>

          {/* Set Lists */}
          <div className="border-t border-[rgb(223,228,230)]">
            <ContentBox>
              <h4 className="text-[18px] text-black mb-3 font-medium">Set Lists</h4>
              <div className="flex gap-3 flex-wrap">
                {ARTIST.setLists.map((s, i) => (
                  <div key={i} className="border border-[#ddd] rounded px-4 py-3 text-[14px] text-[#333]">
                    {s}
                  </div>
                ))}
              </div>
            </ContentBox>
          </div>

          {/* Booking CTA */}
          <div className="border-t border-[rgb(223,228,230)]">
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
          </div>
        </div>

        {/* DARK SIDEBAR */}
        <aside className="w-[400px] shrink-0 bg-[rgb(31,32,37)] text-white">
          <div className="p-6">
            <h4 className="text-[18px] text-white mb-3 font-medium">Artist Details</h4>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                ["Genre", ARTIST.genres],
                ["Band Size", ARTIST.bandSize],
                ["Event Types", "Weddings · Corporate · Bars"],
                ["Languages", "English · Spanish"],
              ].map(([label, value]) => (
                <div key={label}>
                  <div className="text-[10px] text-[rgba(255,255,255,0.5)] uppercase tracking-wide mb-1">{label}</div>
                  <div className="text-[14px] text-white/90">{value}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-2 text-center border-t border-b border-[rgba(255,255,255,0.15)] py-5 mb-6">
              <div>
                <div className="text-[16px] text-white">{ARTIST.rating}</div>
                <div className="text-[10px] text-[rgba(255,255,255,0.5)] uppercase tracking-wide">Rating</div>
              </div>
              <div>
                <div className="text-[16px] text-white">{ARTIST.reviews}</div>
                <div className="text-[10px] text-[rgba(255,255,255,0.5)] uppercase tracking-wide">Reviews</div>
              </div>
              <div>
                <div className="text-[16px] text-white">{ARTIST.completedGigs}</div>
                <div className="text-[10px] text-[rgba(255,255,255,0.5)] uppercase tracking-wide">Gigs</div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {ARTIST.links.map((link, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] flex-shrink-0"
                    style={{ backgroundColor: C.blue, color: "white" }}>
                    {link.icon === "fb" ? "f" : link.icon === "web" ? "W" : "M"}
                  </span>
                  <span className="text-[14px] text-white/80 truncate">{link.label}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-[rgba(255,255,255,0.15)] pt-5">
              <h4 className="text-[18px] text-white mb-3 font-medium">Gig Requirements</h4>
              <ul className="text-[14px] text-white/80 space-y-2 leading-relaxed">
                <li>Power supply (2 standard outlets minimum)</li>
                <li>Parking / load-in access</li>
                <li>Minimum stage area: 10×8 ft</li>
                <li>Sound check: 30 min before event</li>
                <li>Meals provided for 5 performers</li>
              </ul>
            </div>

            <div className="border-t border-[rgba(255,255,255,0.15)] pt-5 mt-6">
              <h4 className="text-[18px] text-white mb-3 font-medium">Service Area</h4>
              <p className="text-[14px] text-white/80">Manhattan, Brooklyn, Queens</p>
            </div>
          </div>
        </aside>
      </main>
    </>
  );
}
