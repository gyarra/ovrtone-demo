"use client";

import { useState } from "react";
import Link from "next/link";

const ARTIST = {
  name: "The Ben Hazlewood Experience",
  genre: "Rock / Soul / Funk",
  rate: 250,
  image: "/ben_hazlewood/ben_avatar_1.jpg",
};

function CalendarGrid({ selected, onSelect }) {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const unavailable = [5, 8, 9, 12, 13, 19, 22, 23, 24, 26];
  const cells = Array.from({ length: 35 }, (_, i) => {
    const day = i - 2;
    if (day < 1 || day > 31) return null;
    return { day, unavailable: unavailable.includes(day) };
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-[12px] cursor-pointer" style={{ color: "var(--rn-slate-400)" }}>◀</span>
        <span className="text-[13px] font-bold" style={{ color: "var(--rn-slate-700)" }}>March 2026</span>
        <span className="text-[12px] cursor-pointer" style={{ color: "var(--rn-slate-400)" }}>▶</span>
      </div>
      <div className="grid grid-cols-7 gap-0.5 text-center">
        {days.map((d, i) => (
          <div key={i} className="text-[9px] font-bold py-1" style={{ color: "var(--rn-slate-400)" }}>{d}</div>
        ))}
        {cells.map((c, i) => {
          const isSelected = c?.day === selected;
          const isUnavail = c?.unavailable;
          return (
            <div
              key={i}
              onClick={() => c && !isUnavail && onSelect(c.day)}
              className="text-[11px] py-1.5 rounded cursor-pointer font-semibold"
              style={{
                background: isSelected ? "var(--rn-slate-900)" : c && !isUnavail ? "var(--rn-available)" : "transparent",
                color: isSelected ? "#fff" : c ? (isUnavail ? "var(--rn-slate-300)" : "#16a34a") : "transparent",
                cursor: c && !isUnavail ? "pointer" : "default",
              }}
            >
              {c?.day || ""}
            </div>
          );
        })}
      </div>
      <div className="flex gap-3 mt-2 justify-center">
        {[
          ["var(--rn-available)", "Available"],
          ["var(--rn-slate-100)", "Unavailable"],
          ["var(--rn-slate-900)", "Selected"],
        ].map(([bg, label]) => (
          <div key={label} className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-sm" style={{ background: bg, border: "1px solid var(--rn-section-border)" }} />
            <span className="text-[9px]" style={{ color: "var(--rn-slate-500)" }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PriceRow({ label, value, muted }) {
  return (
    <div className="flex justify-between py-1.5" style={{ borderBottom: "1px solid var(--rn-slate-100)" }}>
      <span className="text-[12px]" style={{ color: muted ? "var(--rn-slate-400)" : "var(--rn-slate-500)", fontStyle: muted ? "italic" : "normal" }}>{label}</span>
      <span className="text-[12px] font-semibold" style={{ color: muted ? "var(--rn-slate-400)" : "var(--rn-slate-700)", fontStyle: muted ? "italic" : "normal" }}>{value}</span>
    </div>
  );
}

export default function BookingPage() {
  const [screen, setScreen] = useState("booking");
  const [selectedDay, setSelectedDay] = useState(15);
  const [startTime, setStartTime] = useState("7:00 PM");
  const [duration, setDuration] = useState(3);
  const [agreedPolicy, setAgreedPolicy] = useState(false);

  const subtotal = ARTIST.rate * duration;

  const timeOptions = [
    "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
    "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM",
  ];
  const durationOptions = [1, 2, 3, 4, 5, 6];

  // Calculate rough end time
  const startHour = parseInt(startTime) + (startTime.includes("PM") && !startTime.startsWith("12") ? 12 : 0);
  const endHour = startHour + duration;
  const endPeriod = endHour >= 12 ? "AM" : "PM";
  const endDisplay = `${endHour > 12 ? endHour - 12 : endHour}:00 ${endHour >= 24 ? "AM" : endHour >= 12 ? "PM" : "AM"}`;

  if (screen === "confirmation") {
    return (
      <div className="bg-white">
        <div className="mx-auto px-4 md:px-9 py-6 md:py-10 max-w-[700px]">
          {/* Success banner */}
          <div
            className="text-center py-8 px-4 rounded-lg mb-6"
            style={{ background: "#f0fdf4", border: "1px solid #86efac" }}
          >
            <div className="text-[36px] mb-2">✓</div>
            <h1 className="text-[22px] font-extrabold" style={{ color: "var(--rn-slate-900)" }}>
              Booking Confirmed!
            </h1>
            <p className="text-[12px] mt-1" style={{ color: "var(--rn-slate-500)" }}>
              Booking ID: <span className="font-bold" style={{ color: "var(--rn-slate-700)" }}>OVR-2026-03-15-A7X</span>
            </p>
          </div>

          {/* Booking details */}
          <div className="rounded-lg p-5 mb-6" style={{ border: "1px solid var(--rn-section-border)" }}>
            <div className="flex gap-3 items-center mb-4">
              <div className="w-14 h-14 rounded overflow-hidden flex-shrink-0">
                <img src={ARTIST.image} alt={ARTIST.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="text-[16px] font-extrabold" style={{ color: "var(--rn-slate-900)" }}>{ARTIST.name}</div>
                <div className="text-[11px]" style={{ color: "var(--rn-slate-500)" }}>{ARTIST.genre}</div>
              </div>
            </div>
            {[
              ["Date", "Saturday, March 15, 2026"],
              ["Time", `${startTime} – ${endDisplay} (${duration} hours)`],
              ["Total Paid", `$${subtotal.toLocaleString()}.00`],
              ["Payment", "Visa ending in 3456"],
              ["Status", "Confirmed — Payment held securely"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between py-2" style={{ borderBottom: "1px solid var(--rn-slate-100)" }}>
                <span className="text-[12px]" style={{ color: "var(--rn-slate-500)" }}>{k}</span>
                <span className="text-[12px] font-semibold text-right" style={{ color: "var(--rn-slate-700)" }}>{v}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Link
            href="/styled/messages"
            className="rn-btn-blue block text-center no-underline w-full py-3 text-[14px]"
          >
            Go to Messages
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="mx-auto px-4 md:px-9 py-6 md:py-10 max-w-[700px]">
        {/* Back link */}
        <Link
          href="/styled/artists/ben-hazlewood"
          className="text-[12px] font-semibold no-underline mb-4 inline-block"
          style={{ color: "var(--rn-slate-400)" }}
        >
          ← Back to artist profile
        </Link>

        <h1 className="rn-section-heading text-[22px] md:text-[28px] mb-6">Book an Artist</h1>

        {/* ── Artist Summary ── */}
        <div
          className="flex gap-4 items-center p-4 rounded-lg mb-6"
          style={{ border: "1px solid var(--rn-section-border)" }}
        >
          <div className="w-16 h-16 md:w-20 md:h-20 rounded overflow-hidden flex-shrink-0">
            <img src={ARTIST.image} alt={ARTIST.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="text-[18px] font-extrabold" style={{ color: "var(--rn-slate-900)" }}>
              {ARTIST.name}
            </div>
            <div className="text-[12px] mt-0.5" style={{ color: "var(--rn-slate-500)" }}>{ARTIST.genre}</div>
            <div
              className="inline-block mt-1.5 px-2.5 py-1 rounded text-[13px] font-bold"
              style={{ background: "var(--rn-slate-100)", color: "var(--rn-slate-900)" }}
            >
              ${ARTIST.rate} / hour
            </div>
          </div>
        </div>

        {/* ── Date Selection ── */}
        <div className="mb-6">
          <h2 className="rn-label mb-3">Select a Date</h2>
          <div className="p-3 rounded-lg" style={{ border: "1px solid var(--rn-section-border)" }}>
            <CalendarGrid selected={selectedDay} onSelect={setSelectedDay} />
          </div>
        </div>

        {/* ── Time & Duration ── */}
        <div className="mb-6">
          <h2 className="rn-label mb-3">Time & Duration</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="rn-field-label block">Start Time *</label>
              <select
                className="rn-field-input"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              >
                {timeOptions.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="rn-field-label block">Duration *</label>
              <select
                className="rn-field-input"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
              >
                {durationOptions.map((d) => (
                  <option key={d} value={d}>{d} {d === 1 ? "hour" : "hours"}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="rn-field-label block">End Time</label>
              <div
                className="rn-field-input flex items-center gap-1.5"
                style={{ background: "var(--rn-slate-100)" }}
              >
                <span className="font-semibold">{endDisplay}</span>
                <span className="text-[9px]" style={{ color: "var(--rn-slate-400)" }}>auto</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Price Breakdown ── */}
        <div className="mb-6">
          <h2 className="rn-label mb-3">Order Summary</h2>
          <div className="p-4 rounded-lg" style={{ border: "1px solid var(--rn-section-border)" }}>
            <PriceRow label="Artist Rate" value={`$${ARTIST.rate} / hr`} />
            <PriceRow label="Duration" value={`${duration} ${duration === 1 ? "hour" : "hours"}`} />
            <PriceRow label="Subtotal" value={`$${subtotal.toLocaleString()}.00`} />
            <PriceRow label="Platform Fee" value="$0" muted />
            <div className="flex justify-between pt-3 mt-2">
              <span className="text-[14px] font-extrabold" style={{ color: "var(--rn-slate-900)" }}>Total</span>
              <span className="text-[14px] font-extrabold" style={{ color: "var(--rn-slate-900)" }}>
                ${subtotal.toLocaleString()}.00
              </span>
            </div>
            <div
              className="mt-3 p-2.5 rounded text-[11px] leading-relaxed"
              style={{ background: "#eef2ff", color: "var(--rn-slate-600)" }}
            >
              🔒 Your payment is held securely and released to the artist 24 hours after your event.
            </div>
          </div>
        </div>

        {/* ── Cancellation Policy ── */}
        <div className="mb-6">
          <h2 className="rn-label mb-3">Cancellation Policy</h2>
          <div className="p-4 rounded-lg" style={{ border: "1px solid var(--rn-section-border)" }}>
            <label className="flex gap-3 items-start cursor-pointer">
              <input
                type="checkbox"
                checked={agreedPolicy}
                onChange={(e) => setAgreedPolicy(e.target.checked)}
                className="mt-0.5 flex-shrink-0"
              />
              <div>
                <div className="text-[12px] font-semibold" style={{ color: "var(--rn-slate-700)" }}>
                  I acknowledge and agree to the cancellation policy.
                </div>
                <div className="text-[11px] mt-1 leading-relaxed" style={{ color: "var(--rn-slate-400)" }}>
                  Full refund if cancelled 48+ hours before event. 50% refund within 24–48 hours. No refund within 24 hours.
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* ── Terms ── */}
        <div className="mb-6">
          <p className="text-[11px] leading-relaxed" style={{ color: "var(--rn-slate-500)" }}>
            By clicking &ldquo;Instant Book&rdquo;, I agree to Ovrtone&rsquo;s{" "}
            <span className="font-semibold cursor-pointer" style={{ color: "var(--rn-blue)" }}>Terms of Service</span>,{" "}
            <span className="font-semibold cursor-pointer" style={{ color: "var(--rn-blue)" }}>Privacy Policy</span>, and{" "}
            <span className="font-semibold cursor-pointer" style={{ color: "var(--rn-blue)" }}>Booking Terms</span>.
          </p>
        </div>

        {/* ── Payment ── */}
        <div className="mb-6">
          <h2 className="rn-label mb-3">Payment Information</h2>
          <div className="p-4 rounded-lg" style={{ border: "1px solid var(--rn-section-border)" }}>
            <div>
              <label className="rn-field-label block">Card Number *</label>
              <input className="rn-field-input mb-3" placeholder="1234 5678 9012 3456" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="rn-field-label block">Expiration *</label>
                <input className="rn-field-input" placeholder="MM / YY" />
              </div>
              <div>
                <label className="rn-field-label block">CVC *</label>
                <input className="rn-field-input" placeholder="123" />
              </div>
              <div>
                <label className="rn-field-label block">Billing Zip *</label>
                <input className="rn-field-input" placeholder="10001" />
              </div>
            </div>
            <div className="flex gap-1.5 mt-3 items-center">
              <span className="text-[9px]" style={{ color: "var(--rn-slate-400)" }}>Accepted:</span>
              {["Visa", "MC", "Amex", "Discover"].map((c) => (
                <span
                  key={c}
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: "var(--rn-slate-100)", color: "var(--rn-slate-400)" }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Instant Book CTA ── */}
        <div
          className="p-4 rounded-lg flex flex-col md:flex-row items-center justify-between gap-3"
          style={{ background: "var(--rn-slate-900)" }}
        >
          <div>
            <div className="text-[14px] font-bold text-white">
              Total: ${subtotal.toLocaleString()}.00
            </div>
            <div className="text-[10px]" style={{ color: "var(--rn-slate-500)" }}>
              {ARTIST.name} · Sat, Mar {selectedDay} · {startTime}–{endDisplay}
            </div>
          </div>
          <button
            onClick={() => setScreen("confirmation")}
            className="rn-btn-blue w-full md:w-auto px-10 py-3 text-[14px] font-bold"
          >
            Instant Book
          </button>
        </div>
      </div>
    </div>
  );
}
