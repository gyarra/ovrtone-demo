"use client";

import { C } from "./constants";

/* ─── Section Heading ─── */
export function SectionHeading({ children, className = "" }) {
  return <h4 className={`rn-section-heading mb-3 ${className}`}>{children}</h4>;
}

/* ─── Key Detail Item (label + value pair) ─── */
export function KeyDetailItem({ label, value }) {
  return (
    <div>
      <div className="rn-label mb-0.5">{label}</div>
      <div className="text-[13px] font-semibold text-[var(--rn-slate-800)]">{value}</div>
    </div>
  );
}

/* ─── Hero / Cover Section ─── */
export function HeroCover({ backgroundImage, children }) {
  return (
    <section className="relative bg-[var(--rn-sidebar-bg)]">
      <div className="relative w-full h-[200px] md:h-[350px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${backgroundImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-transparent" />
      </div>
      <div className="mx-auto px-4 md:px-9 relative -mt-[80px] md:-mt-[120px]">
        {children}
      </div>
    </section>
  );
}

/* ─── Photo Gallery with lightbox ─── */
export function PhotoGallery({ photos, activeIdx, onSelect, onPrev, onNext, onClose }) {
  return (
    <>
      {/* Main image */}
      <div
        className="rounded overflow-hidden mb-3 relative"
        style={{
          maxHeight: activeIdx !== null ? 600 : 0,
          opacity: activeIdx !== null ? 1 : 0,
          transition: "max-height 0.35s ease, opacity 0.3s ease",
          aspectRatio: activeIdx !== null ? "16/9" : undefined,
        }}
      >
        {photos.map((src, i) => (
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
            <button onClick={onPrev} className="rn-gallery-btn left-2">‹</button>
            <button onClick={onNext} className="rn-gallery-btn right-2">›</button>
            <button
              onClick={onClose}
              className="absolute top-2 right-3 w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center text-[14px] cursor-pointer hover:bg-black/70 transition-colors z-10"
            >
              ✕
            </button>
            <div className="absolute bottom-2 right-3 bg-black/60 text-white text-[11px] px-2 py-0.5 rounded z-10">
              {activeIdx + 1} / {photos.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {photos.map((src, i) => (
          <button
            key={src}
            onClick={() => onSelect(i)}
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
    </>
  );
}

/* ─── Availability Calendar ─── */
export function AvailabilityCalendar({ availableDays = [], totalDays = 30, offset = 5 }) {
  const totalCells = Math.ceil((totalDays + offset) / 7) * 7;
  return (
    <div>
      <div className="grid grid-cols-7 gap-1 text-center text-[12px]">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
          <div key={d} className="rn-sub-label py-1" style={{ fontSize: 12 }}>{d}</div>
        ))}
        {Array.from({ length: totalCells }, (_, i) => {
          const day = i - offset;
          const isValid = day >= 1 && day <= totalDays;
          const available = availableDays.includes(day);
          return (
            <div
              key={i}
              className="py-1.5 rounded"
              style={{
                color: !isValid ? "transparent" : available ? "var(--rn-slate-700)" : "var(--rn-slate-300)",
                backgroundColor: isValid ? (available ? "var(--rn-available)" : "var(--rn-unavailable)") : "transparent",
              }}
            >
              {isValid ? day : ""}
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-4 mt-3 text-[11px]" style={{ color: "var(--rn-slate-400)" }}>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: "var(--rn-available)" }} />
          Available
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: "var(--rn-unavailable)" }} />
          Unavailable
        </div>
      </div>
    </div>
  );
}

/* ─── Sticky Booking Bar ─── */
export function StickyBookingBar({ rate, rateNote, buttonText = "Book This Artist" }) {
  return (
    <div className="rn-sticky-bar">
      <div className="mx-auto px-4 md:px-9 py-3 flex items-center justify-between">
        <div className="text-[16px] font-bold text-white">
          {rate} <span className="text-[13px] font-normal" style={{ color: "var(--rn-slate-400)" }}>· {rateNote}</span>
        </div>
        <button className="rn-btn-blue">{buttonText}</button>
      </div>
    </div>
  );
}

/* ─── Video Embed ─── */
export function VideoEmbed({ videoId, title = "Video" }) {
  return (
    <div className="relative bg-[#1a1a1a] overflow-hidden rounded" style={{ aspectRatio: "16/10" }}>
      <iframe
        className="absolute inset-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&fs=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
