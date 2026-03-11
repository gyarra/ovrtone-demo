"use client";

import { useState, useCallback } from "react";
import { C } from "../../components/constants";
import { ContentBox } from "../../components/ui";
import {
  HeroCover,
  KeyDetailItem,
  PhotoGallery,
  AvailabilityCalendar,
  StickyBookingBar,
  VideoEmbed,
  SectionHeading,
} from "../../components/shared";

const PHOTOS = [
  "/ben_hazlewood/web/DSC00209.jpg",
  "/ben_hazlewood/web/DSC00535.jpg",
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
};

const KEY_DETAILS = [
  ["Band Size", ARTIST.bandSize],
  ["Event Types", "Weddings · Corporate · Bars"],
  ["Languages", "English · Spanish"],
  ["Service Area", "Manhattan, Brooklyn, Queens"],
];

export default function ArtistProfilePage() {
  const [activeIdx, setActiveIdx] = useState(null);
  const [selectedSet, setSelectedSet] = useState(0);

  const next = useCallback(() => setActiveIdx(i => (i + 1) % PHOTOS.length), []);
  const prev = useCallback(() => setActiveIdx(i => ((i ?? 0) - 1 + PHOTOS.length) % PHOTOS.length), []);

  return (
    <>
      {/* HERO / COVER */}
      <HeroCover backgroundImage="/ben_hazlewood/ben_hero">
        <div className="pb-4 md:pl-[260px]">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1.5">
              <h1 className="text-white text-[24px] md:text-[40px] leading-[32px] md:leading-[52px]" style={{ fontWeight: 300 }}>
                {ARTIST.name}
              </h1>
            </div>
            <p className="text-[14px] md:text-[18px] text-white/70 italic mb-1" style={{ fontWeight: 300 }}>
              Where performance meets resonance
            </p>
            <p className="text-[13px] md:text-[16px] text-[#ccc]" style={{ fontWeight: 400 }}>
              {ARTIST.genres}&nbsp;&nbsp;{"\u2022"}&nbsp;&nbsp;{ARTIST.location}
            </p>
          </div>
        </div>
      </HeroCover>

      {/* Profile photo bar + Key Details */}
      <div className="relative bg-white pb-3">
        <div className="mx-auto px-4 md:px-9 relative">
          {/* Desktop: absolute avatar + inline details */}
          <div className="hidden md:flex items-center h-[60px]">
            <div
              className="absolute shrink-0 overflow-hidden w-[248px] h-[187px] border-2 border-white -top-[143px] left-9"
            >
              <img src="/ben_hazlewood/ben_avatar_1.jpg" alt={ARTIST.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-1 justify-between" style={{ marginLeft: 272 }}>
              {KEY_DETAILS.map(([label, value]) => (
                <KeyDetailItem key={label} label={label} value={value} />
              ))}
            </div>
          </div>
          {/* Mobile: stacked avatar + details */}
          <div className="md:hidden">
            <div className="flex items-center gap-3 mb-3 -mt-[40px]">
              <div className="shrink-0 overflow-hidden w-[80px] h-[80px] rounded border-2 border-white">
                <img src="/ben_hazlewood/ben_avatar_1.jpg" alt={ARTIST.name} className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {KEY_DETAILS.map(([label, value]) => (
                <KeyDetailItem key={label} label={label} value={value} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="w-full pb-4">
        <div className="bg-white">

          {/* 2. Media Gallery */}
          <div className="border-t border-b border-[rgb(223,228,230)]">
            <ContentBox>

              {/* Videos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                <VideoEmbed videoId="DbMWjkFTmvM" title="Video" />
                <VideoEmbed videoId="x_9uTApdOw0" title="Video 2" />
              </div>

              {/* Gallery */}
              <PhotoGallery
                photos={PHOTOS}
                activeIdx={activeIdx}
                onSelect={(i) => setActiveIdx(activeIdx === i ? null : i)}
                onPrev={prev}
                onNext={next}
                onClose={() => setActiveIdx(null)}
              />
            </ContentBox>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ borderBottom: `1px solid ${C.sectionBorder}` }}>
            {/* Left column: About Us + Gig Requirements + Additional Details */}
            <div className="flex-1 md:border-r" style={{ borderColor: C.sectionBorder }}>
              <ContentBox style={{ borderBottom: `1px solid ${C.sectionBorder}` }}>
                <SectionHeading>About Us</SectionHeading>
                <p className="rn-body-text">{ARTIST.about}</p>
              </ContentBox>

              <ContentBox style={{ borderBottom: `1px solid ${C.sectionBorder}` }}>
                <SectionHeading>Gig Requirements</SectionHeading>
                <div className="rn-body-text leading-[2]">
                  {["Power supply (2 standard outlets minimum)", "Parking / load-in access", "Minimum stage area: 10×8 ft",
                    "Sound check: 30 min before event", "Meals provided for 5 performers"].map(r => (
                    <div key={r}>{r}</div>
                  ))}
                </div>
              </ContentBox>

              <ContentBox>
                <SectionHeading>Performance Details</SectionHeading>
                <div>
                  {[
                    ["Setup/Breakdown", "45 min before · 30 min after"],
                    ["Duration Options", "2hr · 3hr · 4+hr"],
                    ["Booking Lead Time", "Book at least 7 days in advance"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between py-2 border-b border-[var(--rn-slate-100)]">
                      <span className="rn-detail-key">{k}</span>
                      <span className="rn-detail-value">{v}</span>
                    </div>
                  ))}
                </div>
              </ContentBox>
            </div>

            <div className="flex-1">
              <ContentBox style={{ borderBottom: `1px solid ${C.sectionBorder}` }}>
                <SectionHeading>Availability</SectionHeading>
                <AvailabilityCalendar availableDays={[1,2,6,7,8,13,14,15,20,21,22,27,28,29]} />
              </ContentBox>

              <ContentBox>
                <SectionHeading>Set Lists</SectionHeading>
                <div className="flex gap-2 overflow-x-auto">
                  {ARTIST.setLists.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedSet(i)}
                      className="text-left rounded px-3 md:px-4 py-2 md:py-3 text-[13px] md:text-[14px] cursor-pointer transition-colors whitespace-nowrap flex-shrink-0"
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
                  <div className="mt-4 pt-3 border-t border-[var(--rn-slate-100)]">
                    <div className="rn-sub-label mb-2" style={{ fontSize: 11 }}>Songs</div>
                    <div className="divide-y divide-[var(--rn-slate-100)]">
                      {ARTIST.setLists[selectedSet].songs.map((song, i) => (
                        <div key={i} className="flex items-center gap-2.5 py-2">
                          <span className="text-[12px] w-5 text-right tabular-nums" style={{ color: "var(--rn-slate-400)" }}>{i + 1}</span>
                          <span className="text-[13px]" style={{ color: "var(--rn-slate-700)" }}>{song}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </ContentBox>
            </div>
          </div>

        </div>
      </main>

      <StickyBookingBar rate={ARTIST.rate} rateNote={ARTIST.rateNote} />
    </>
  );
}
