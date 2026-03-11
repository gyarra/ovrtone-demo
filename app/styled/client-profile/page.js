"use client";

import { useState } from "react";
import { C } from "../components/constants";
import { ContentBox } from "../components/ui";
import { SectionHeading, KeyDetailItem } from "../components/shared";

const VENUE = {
  name: "The Velvet Lounge",
  type: "Bar / Lounge",
  location: "Williamsburg, Brooklyn, NY",
  address: ["387 Bedford Avenue", "Brooklyn, NY 11211"],
  about: [
    "We're a rooftop cocktail lounge in Williamsburg featuring live jazz three nights a week.",
    "Our intimate space seats up to 80 guests and has been hosting independent artists since 2019.",
  ],
  workingWithUs: [
    "Stage: 12×10 ft raised platform, can accommodate up to 6 performers",
    "PA system provided (Yamaha DZR12) · 2× floor monitors",
    "Load-in via rear alley on Bedford Ave · Street parking available",
    "Sound check: 30 min before doors open · Venue opens at 8 PM",
    "Meals provided for all performers",
    "Noise curfew: 1:00 AM · No amplified music after midnight on weekdays",
  ],
  stats: { bookings: 47, memberSince: "Mar 2024", audienceSize: "50–100" },
  genres: ["Jazz", "Soul", "R&B", "Blues", "Funk"],
  eventTypes: ["Live Performance", "Private Hire"],
  website: "thevelvetlounge.nyc",
};

const VENUE_DETAILS = [
  ["Venue Type", "Bar / Lounge"],
  ["Audience Size", "50–100 guests"],
  ["Contact Name", "Marcus Rivera"],
  ["Member Since", "March 2024"],
  ["Total Bookings", "47 completed"],
];

const completionItems = [
  { label: "Venue name", done: true },
  { label: "Photos", done: true },
  { label: "Who are we?", done: true },
  { label: "Working with us", done: false },
  { label: "Address", done: true },
  { label: "Venue type", done: true },
  { label: "Website URL", done: false },
];

function GenreTag({ children }) {
  return (
    <span
      className="inline-block rounded-full text-[11px] font-semibold mr-1 mb-1"
      style={{ padding: "3px 10px", background: "#dbeafe", color: "#1e40af" }}
    >
      {children}
    </span>
  );
}

function EventTag({ children }) {
  return (
    <span
      className="inline-block rounded-full text-[11px] font-semibold mr-1 mb-1"
      style={{ padding: "3px 10px", background: "#fffbeb", color: "#92400e" }}
    >
      {children}
    </span>
  );
}

export default function ClientProfilePage() {
  const completePct = Math.round(
    (completionItems.filter((i) => i.done).length / completionItems.length) * 100,
  );

  return (
    <>
      {/* HERO / COVER — venue-style with dark background */}
      <section className="relative bg-[var(--rn-sidebar-bg)]">
        <div className="relative w-full h-[160px] md:h-[280px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/styled/hero_background.jpeg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-transparent" />
        </div>
        <div className="relative mx-auto px-4 md:px-9 -mt-[80px] md:-mt-[120px] pb-4">
          <div className="flex items-end gap-4 md:gap-6">
            {/* Venue avatar */}
            <div className="shrink-0 overflow-hidden w-[80px] h-[80px] md:w-[120px] md:h-[120px] rounded border-2 border-white bg-white flex items-center justify-center">
              <span className="text-[36px] md:text-[48px]">🏛️</span>
            </div>
            <div className="pb-1">
              <h1
                className="text-white text-[22px] md:text-[36px] leading-[28px] md:leading-[44px]"
                style={{ fontWeight: 300 }}
              >
                {VENUE.name}
              </h1>
              <p className="text-[13px] md:text-[16px] text-[#ccc]" style={{ fontWeight: 400 }}>
                {VENUE.type}&nbsp;&nbsp;{"\u2022"}&nbsp;&nbsp;{VENUE.location}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="bg-white pb-3" style={{ borderBottom: `1px solid ${C.sectionBorder}` }}>
        <div className="mx-auto px-4 md:px-9">
          {/* Desktop stats */}
          <div className="hidden md:flex items-center gap-8 pt-3">
            <KeyDetailItem label="Bookings" value={VENUE.stats.bookings} />
            <KeyDetailItem label="Member Since" value={VENUE.stats.memberSince} />
            <KeyDetailItem label="Audience Size" value={VENUE.stats.audienceSize} />
            <div className="flex-1" />
            <div className="flex gap-1">
              <span
                className="inline-block rounded-full text-[11px] font-semibold"
                style={{ padding: "3px 10px", background: "#dcfce7", color: "#166534" }}
              >
                Verified Venue
              </span>
              <span
                className="inline-block rounded-full text-[11px] font-semibold"
                style={{ padding: "3px 10px", background: C.pageBg, color: C.textSecondary }}
              >
                Recurring Host
              </span>
            </div>
          </div>
          {/* Mobile stats */}
          <div className="md:hidden grid grid-cols-3 gap-3 pt-3">
            <KeyDetailItem label="Bookings" value={VENUE.stats.bookings} />
            <KeyDetailItem label="Since" value={VENUE.stats.memberSince} />
            <KeyDetailItem label="Capacity" value={VENUE.stats.audienceSize} />
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="w-full pb-4">
        <div className="bg-white">
          {/* Two-column layout */}
          <div
            className="grid grid-cols-1 md:grid-cols-2"
            style={{ borderBottom: `1px solid ${C.sectionBorder}` }}
          >
            {/* Left column: About + Working With Us */}
            <div className="flex-1 md:border-r" style={{ borderColor: C.sectionBorder }}>
              <ContentBox style={{ borderBottom: `1px solid ${C.sectionBorder}` }}>
                <SectionHeading>Who Are We?</SectionHeading>
                <div className="rn-body-text">
                  {VENUE.about.map((p, i) => (
                    <p key={i} className={i < VENUE.about.length - 1 ? "mb-3" : ""}>{p}</p>
                  ))}
                </div>
              </ContentBox>

              <ContentBox style={{ borderBottom: `1px solid ${C.sectionBorder}` }}>
                <SectionHeading>Working With Us</SectionHeading>
                <div className="rn-body-text leading-[2]">
                  {VENUE.workingWithUs.map((item, i) => (
                    <div key={i}>{item}</div>
                  ))}
                </div>
              </ContentBox>

              <ContentBox>
                <SectionHeading>Address</SectionHeading>
                <div className="text-[14px] font-bold" style={{ color: C.textPrimary }}>
                  {VENUE.name}
                </div>
                <div className="rn-body-text mt-1">
                  {VENUE.address.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              </ContentBox>
            </div>

            {/* Right column: Details + Links & Tags + Completeness */}
            <div className="flex-1">
              <ContentBox style={{ borderBottom: `1px solid ${C.sectionBorder}` }}>
                <SectionHeading>Venue Details</SectionHeading>
                <div>
                  {VENUE_DETAILS.map(([k, v]) => (
                    <div
                      key={k}
                      className="flex justify-between py-2 border-b border-[var(--rn-slate-100)]"
                    >
                      <span className="rn-detail-key">{k}</span>
                      <span className="rn-detail-value">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <div className="rn-label mb-1.5">Website</div>
                  <span className="text-[13px] font-semibold" style={{ color: C.blue }}>
                    {VENUE.website}
                  </span>
                </div>
              </ContentBox>

              <ContentBox style={{ borderBottom: `1px solid ${C.sectionBorder}` }}>
                <SectionHeading>Genres & Event Types</SectionHeading>
                <div className="rn-label mb-2">Genres Typically Booked</div>
                <div className="mb-4">
                  {VENUE.genres.map((g) => (
                    <GenreTag key={g}>{g}</GenreTag>
                  ))}
                </div>
                <div className="rn-label mb-2">Event Types</div>
                <div>
                  {VENUE.eventTypes.map((e) => (
                    <EventTag key={e}>{e}</EventTag>
                  ))}
                </div>
              </ContentBox>

              <ContentBox>
                <SectionHeading>Profile Completeness</SectionHeading>

                {/* Progress header */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[13px] font-semibold" style={{ color: C.textPrimary }}>
                    Your profile is {completePct}% complete
                  </span>
                  <span
                    className="text-[12px] font-bold"
                    style={{ color: completePct >= 80 ? "#16a34a" : "#f59e0b" }}
                  >
                    {completePct}%
                  </span>
                </div>

                {/* Progress bar */}
                <div
                  className="flex h-2 rounded-full overflow-hidden mb-4"
                  style={{ background: C.pageBg }}
                >
                  <div
                    className="rounded-full transition-all"
                    style={{
                      width: `${completePct}%`,
                      background: completePct >= 80 ? "#16a34a" : "#f59e0b",
                    }}
                  />
                </div>

                {/* Checklist */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                  {completionItems.map(({ label, done }) => (
                    <div
                      key={label}
                      className="flex items-center gap-1.5 py-0.5 text-[11px]"
                      style={{ color: done ? C.textPrimary : C.textMuted }}
                    >
                      <span
                        className="w-4 h-4 rounded flex-shrink-0 flex items-center justify-center text-[9px]"
                        style={{
                          background: done ? "#dcfce7" : C.pageBg,
                          border: done ? "1px solid #86efac" : `1px solid ${C.border}`,
                        }}
                      >
                        {done ? "✓" : ""}
                      </span>
                      {label}
                    </div>
                  ))}
                </div>

                <div
                  className="mt-3 rounded text-[11px] leading-relaxed"
                  style={{
                    padding: "8px 10px",
                    background: "#fffbeb",
                    border: "1px solid #fde68a",
                    color: "#92400e",
                  }}
                >
                  Complete your profile so artists know what to expect at your venue.
                </div>
              </ContentBox>
            </div>
          </div>

          {/* Profile Actions */}
          <ContentBox>
            <div className="flex gap-2.5 flex-col md:flex-row">
              <button
                className="rn-btn-blue flex-1 text-center"
                style={{ padding: "10px 20px" }}
              >
                Edit Profile
              </button>
              <button
                className="rn-btn-back flex-1 text-center"
                style={{ padding: "10px 20px" }}
              >
                Preview as Artist
              </button>
            </div>
          </ContentBox>
        </div>
      </main>
    </>
  );
}
