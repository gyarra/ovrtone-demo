"use client";

import { C } from "../../components/constants";
import { Avatar, PlaceholderImg, ContentBox } from "../../components/ui";

const ARTIST = {
  name: "The Ben Hazlewood Experience",
  tagline: "NYC's Premier Jazz Trio — Crafting Unforgettable Moments",
  genres: "Jazz / Soul / Funk",
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
  return (
    <>
      {/* HERO / COVER */}
      <section className="relative bg-[rgb(31,32,37)]">
        <div className="relative w-full h-[350px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/ben_hero')" }}
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

      {/* Profile photo bar */}
      <div className="relative bg-white h-[60px] border-b border-[rgb(223,228,230)]">
        <div className="mx-auto px-9 relative h-full flex items-center">
          <div
            className="absolute shrink-0 overflow-hidden w-[248px] h-[187px] border-2 border-white -top-[143px] left-9"
          >
            <img src="/ben_avatar_1.jpg" alt={ARTIST.name} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="w-full">
        <div className="bg-white">
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
                <div className="relative bg-[#1a1a1a] overflow-hidden" style={{ aspectRatio: "16/10" }}>
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/DbMWjkFTmvM?rel=0&modestbranding=1&showinfo=0"
                    title="Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="relative bg-[#1a1a1a] overflow-hidden" style={{ aspectRatio: "16/10" }}>
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/x_9uTApdOw0?rel=0&modestbranding=1&showinfo=0"
                    title="Video 2"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
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
      </main>
    </>
  );
}
