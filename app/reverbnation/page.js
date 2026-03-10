"use client";

import { useState } from "react";
import { C } from "./components/constants";
import { Avatar, PlaceholderImg, WaveformBar, ContentBox } from "./components/ui";

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
  { name: "Daly Redline", text: ". Excellent\u2661 \u10E6\u0B9C\u10E6\u2661" },
  { name: "Rosette Cribben", text: "So much creativity coming out of you Lena...Great expressive vocals..." },
  { name: "Red Cloud", text: "Your music and (beautiful) voice are so well mixed up, that the general impression is..." },
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

const TABS = ["Overview", "Music", "Videos", "Events"];

/* ─── MAIN PAGE ─────────────────────────────────────── */
export default function OvrtonePage() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <>
      {/* HERO / COVER PHOTO */}
      <section className="relative bg-[rgb(31,32,37)]">
        <div className="relative w-full h-[430px]">
          <div
            className="absolute inset-0 bg-cover bg-[rgb(31,32,37)]"
            style={{ backgroundImage: "url('/reverb_background.jpeg')", backgroundPosition: "center top" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-transparent" />
        </div>

        <div className="mx-auto px-9 relative -mt-[120px]">
          <div className="flex items-end gap-5 pb-4" style={{ paddingLeft: 260 }}>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1.5">
                <h1 className="text-white text-[40px] leading-[52px]" style={{ fontWeight: 300 }}>
                  Lena Fayre
                </h1>
                <button
                  className="flex items-center gap-1.5 px-4 py-2 text-[14px] text-white cursor-pointer"
                  style={{ backgroundColor: "rgba(0,0,0,0.1)", border: "1px solid #fff", fontWeight: 500, borderRadius: 1000 }}
                >
                  <svg width="12" height="12" fill="white" viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/></svg>
                  Share
                </button>
                <button
                  className="px-4 py-2 text-[14px] text-white cursor-pointer"
                  style={{ backgroundColor: "rgba(0,0,0,0.1)", border: "1px solid #fff", fontWeight: 500, borderRadius: 1000 }}
                >
                  Become a Fan
                </button>
              </div>
              <p className="text-[16px] text-[#ccc]" style={{ fontWeight: 400 }}>
                Pop / Singer-Songwriter / Experimental&nbsp;&nbsp;{"\u2022"}&nbsp;&nbsp;Manhattan Beach, CA&nbsp;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TAB NAV BAR (white, with profile photo overlapping into hero) */}
      <div className="relative bg-white h-[60px] border-b border-[rgb(223,228,230)]">
        <div className="mx-auto px-9 relative h-full flex items-center">
          {/* Profile photo - overlaps hero and nav bar */}
          <div
            className="absolute shrink-0 overflow-hidden w-[248px] h-[187px] border-2 border-white -top-[143px] left-9"
          >
            <img src="/lena_profile_pic.jpeg" alt="Lena Fayre" className="w-full h-full object-cover" />
          </div>

          {/* Tabs - offset to the right of the profile photo */}
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

      {/* MAIN CONTENT (white content + dark sidebar) */}
      <main className="flex w-full">
        {/* Content area */}
        <div className="flex-1 bg-white align-top">
          <div>
            <div className="border-b border-[rgb(223,228,230)]">

              {/* ROW 1: Featured Songs + Featured Video */}
              <div className="grid grid-cols-2">
                <ContentBox>
                  <h4 className="text-[18px] text-black mb-2 font-medium">Featured Songs</h4>

                  <div className="flex items-center gap-3 mb-3">
                    <button
                      className="w-[50px] h-[50px] rounded-full flex items-center justify-center flex-shrink-0 bg-[rgb(58,158,224)]"
                    >
                      <svg width="20" height="20" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </button>
                    <div className="flex-1">
                      <WaveformBar />
                    </div>
                    <span className="text-[12px] text-[#999] flex-shrink-0 tabular-nums">0:00 / 4:07</span>
                  </div>

                  <div className="flex gap-4 text-[13px] mb-4" style={{ color: C.blue }}>
                    <span className="cursor-pointer">play all</span>
                    <span className="cursor-pointer">share all</span>
                    <span className="cursor-pointer">embed</span>
                  </div>

                  <div className="divide-y divide-[#eee]">
                    {SONGS.map((song, i) => (
                      <div key={i} className="flex items-center py-3 gap-3">
                        <span className="text-[18px] text-[#ccc] cursor-pointer leading-none">+</span>
                        <svg width="14" height="14" fill={C.blue} viewBox="0 0 24 24" className="flex-shrink-0"><path d="M8 5v14l11-7z"/></svg>
                        <span className="text-[14px] flex-1">{song.title}</span>
                        {song.bandcamp && (
                          <span className="text-[10px] border border-[#ddd] rounded px-2 py-0.5 text-[#666] cursor-pointer whitespace-nowrap">
                            Buy on Bandcamp
                          </span>
                        )}
                        <span className="text-[14px] text-[#999] w-[40px] text-right tabular-nums">{song.duration}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4">
                    <span className="text-[14px] font-bold cursor-pointer" style={{ color: C.blue }}>All Music</span>
                  </div>
                </ContentBox>

                <ContentBox style={{ borderLeft: `1px solid ${C.sectionBorder}` }}>
                  <h4 className="text-[18px] text-black mb-2 font-medium">Featured Video</h4>

                  <div className="relative bg-[#1a1a1a] overflow-hidden mb-3" style={{ aspectRatio: "16/10" }}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PlaceholderImg w="100%" h="100%" style={{ backgroundColor: "#3a3a3a", position: "absolute", inset: 0 }} />
                      <div className="relative z-10">
                        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="mx-auto opacity-80">
                          <circle cx="30" cy="30" r="28" stroke="white" strokeWidth="2"/>
                          <path d="M24 18l18 12-18 12z" fill="white"/>
                        </svg>
                      </div>
                    </div>
                    <div className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wider">
                      vevo
                    </div>
                  </div>

                  <h3 className="text-[16px] font-bold mb-1 cursor-pointer" style={{ color: C.blue }}>Cry</h3>
                  <p className="text-[13px] text-[#999]">
                    Duration - 4:16&nbsp;&nbsp;&nbsp;Views - 551.1K&nbsp;&nbsp;&nbsp;Likes - 1.3K
                  </p>

                  <div className="mt-4">
                    <span className="text-[14px] font-bold cursor-pointer" style={{ color: C.blue }}>All Videos</span>
                  </div>
                </ContentBox>
              </div>

              {/* ROW 2: Photo Gallery */}
              <div className="flex gap-3 py-8 overflow-x-auto px-8" style={{ borderTop: `1px solid ${C.sectionBorder}`, borderBottom: `1px solid ${C.sectionBorder}` }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-[190px] h-[130px] rounded overflow-hidden"
                    style={{ backgroundColor: `hsl(${i * 30 + 190}, 25%, ${40 + i * 8}%)` }}
                  />
                ))}
              </div>

              {/* ROW 3: Community + Past Performances */}
              <div className="grid grid-cols-2">
                <ContentBox>
                  <h4 className="text-[18px] text-black mb-3 font-medium">Community</h4>

                  <h6 className="text-[14px] font-bold mb-1">Status</h6>
                  <p className="text-[14px] text-[#666] mb-5 leading-relaxed">
                    I am taking a break and planning the next chapter. Stay tuned....
                  </p>

                  <div className="mb-4">
                    <a className="text-[16px] font-bold cursor-pointer" style={{ color: C.blue }}>3568 Fans</a>
                    <div className="flex gap-1.5 mt-2 flex-wrap">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <PlaceholderImg key={i} w={38} h={38} className="rounded" style={{ backgroundColor: `hsl(${i * 35 + 200}, 25%, ${55 + i * 3}%)` }} />
                      ))}
                    </div>
                  </div>

                  <button
                    className="text-[14px] text-white font-bold rounded-[3px] px-4 py-2 cursor-pointer mb-6"
                    style={{ backgroundColor: C.blueBtnBg, border: `1px solid ${C.blueBtnBorder}` }}
                  >
                    Become A Fan
                  </button>

                  <div>
                    <a className="text-[16px] font-bold cursor-pointer block mb-3" style={{ color: C.blue }}>Comments</a>
                    <div className="space-y-4">
                      {COMMENTS.map((c, i) => (
                        <div key={i} className="flex gap-3">
                          <Avatar size={38} color={`hsl(${i * 90 + 180}, 25%, 60%)`} />
                          <div className="min-w-0">
                            <a className="text-[14px] font-bold block cursor-pointer" style={{ color: C.blue }}>{c.name}</a>
                            <span className="text-[14px] text-[#666]">{c.text}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button className="mt-4 border border-[#ddd] rounded-[3px] px-3 py-1.5 text-[13px] text-[#333] cursor-pointer hover:bg-[#f5f5f5]">
                      Add Comment
                    </button>
                  </div>
                </ContentBox>

                <ContentBox style={{ borderLeft: `1px solid ${C.sectionBorder}` }}>
                  <h4 className="text-[18px] text-black mb-3 font-medium">Past Performances</h4>

                  <div className="divide-y divide-[#eee]">
                    {PERFORMANCES.map((p, i) => (
                      <div key={i} className="flex gap-4 py-4">
                        <div className="flex-shrink-0 w-[65px] text-center border border-[#e0e0e0] rounded py-2.5 bg-white">
                          <div className="text-[12px] font-bold text-[#999] uppercase tracking-wide">{p.month} {p.day}</div>
                          <div className="text-[14px] font-bold text-[#666]">{p.year}</div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="text-[15px] font-bold">{p.venue}</div>
                          <div className="text-[13px] text-[#999]">{p.location} - {p.date}</div>
                          <a className="text-[13px] cursor-pointer" style={{ color: C.blue }}>Get Directions</a>
                        </div>

                        <button className="self-center text-[18px] text-[#ccc] cursor-pointer">{"\u22EF"}</button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3">
                    <span className="text-[14px] cursor-pointer" style={{ color: C.blue }}>All Past Events</span>
                  </div>
                </ContentBox>
              </div>
            </div>
          </div>
        </div>

        {/* DARK SIDEBAR */}
        <aside className="w-[400px] shrink-0 bg-[rgb(31,32,37)] text-white align-top">
          <div className="p-6">
            <div className="pb-6 mb-0">
              <h4 className="text-[18px] text-white mb-3 font-medium">About the Artist</h4>
              <p className="text-[14px] text-white/90 leading-[22.4px] mb-2">
                Only 19-years old, Los Angeles indie artist Lena Fayre has already amassed over 20 million
                Spotify streams and YouTube views, accumulated over 400,000 monthly Spotify listeners,
                won multiple songwriting awards including Jo...
              </p>
              <a className="text-[14px] cursor-pointer block mb-6" style={{ color: C.blue }}>Read More</a>

              <div className="flex items-center gap-2 mb-6">
                <button
                  className="text-white text-[14px] font-bold rounded-[3px] px-4 py-2 cursor-pointer"
                  style={{ backgroundColor: C.blueBtnBg, border: `1px solid ${C.blueBtnBorder}` }}
                >
                  Become A Fan
                </button>
                <button className="w-[36px] h-[36px] border border-[#555] rounded-[3px] flex items-center justify-center cursor-pointer hover:border-[#888]">
                  <svg width="14" height="14" fill="white" opacity="0.7" viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/></svg>
                </button>
                <button className="w-[36px] h-[36px] border border-[#555] rounded-[3px] flex items-center justify-center cursor-pointer hover:border-[#888]">
                  <svg width="14" height="14" fill="white" opacity="0.7" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center border-t border-b border-[rgba(255,255,255,0.15)] py-5 mb-6">
                <div>
                  <div className="text-[16px] text-white">57.8K</div>
                  <div className="text-[10px] text-[rgba(255,255,255,0.5)] uppercase tracking-wide">Song Plays</div>
                </div>
                <div>
                  <div className="text-[16px] text-white">8K</div>
                  <div className="text-[10px] text-[rgba(255,255,255,0.5)] uppercase tracking-wide">Video Plays</div>
                </div>
                <div>
                  <div className="text-[16px] text-white">3.6K</div>
                  <div className="text-[10px] text-[rgba(255,255,255,0.5)] uppercase tracking-wide">Total Fans</div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {[
                  { icon: "music", label: "iTunes" },
                  { icon: "music", label: "Amazon Mp3" },
                  { icon: "web", label: "lenafayre.com/" },
                  { icon: "fb", label: "facebook.com/LenaFayre" },
                ].map((link, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] flex-shrink-0"
                      style={{ backgroundColor: C.blue, color: "white" }}>
                      {link.icon === "fb" ? "f" : link.icon === "web" ? "W" : "M"}
                    </span>
                    <span className="text-[14px] text-white/80 truncate">{link.label}</span>
                  </div>
                ))}
                <a className="text-[14px] cursor-pointer" style={{ color: C.blue }}>More</a>
              </div>

              <div className="border-t border-[rgba(255,255,255,0.15)] pt-5">
                <h4 className="text-[18px] text-white mb-3 font-medium">Press</h4>
                <p className="text-[14px] text-white/80 leading-relaxed mb-1">
                  {"\u201C"}Artists You Should Know: Lena Fayre. Los Angeles-based artist Lena Fayre has made some very impressive strides in her brief nineteen years...{"\u201D"}
                </p>
                <p className="text-[13px] text-white/60 mb-2">
                  - Eric J. Lawrence, <span style={{ color: C.blue }} className="cursor-pointer">KCRW Music Blog</span>
                </p>
                <a className="text-[14px] cursor-pointer" style={{ color: C.blue }}>Read More</a>
              </div>
            </div>

            <div className="border-t border-[rgba(255,255,255,0.15)] pt-5 pb-5 px-6">
              <h4 className="text-[16px] text-white/70 mb-3" style={{ fontWeight: 400 }}>Favorite Artists</h4>
              <div className="space-y-3">
                {FAVORITE_ARTISTS.map((a, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Avatar size={36} color={`hsl(${i * 60 + 10}, 35%, 50%)`} />
                    <div>
                      <div className="text-[14px] font-bold text-white">{a.name}</div>
                      <div className="text-[12px] text-white/50">{a.genre}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-[rgba(255,255,255,0.15)] pt-5 px-6 pb-6">
              <h4 className="text-[16px] text-white/70 mb-3" style={{ fontWeight: 400 }}>Suggested Collections</h4>
              <div className="space-y-3">
                {COLLECTIONS.map((c, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <PlaceholderImg w={40} h={40} className="rounded" style={{ backgroundColor: `hsl(${i * 50 + 220}, 45%, 40%)` }} />
                    <span className="text-[14px] font-bold text-white">{c.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </main>
    </>
  );
}
