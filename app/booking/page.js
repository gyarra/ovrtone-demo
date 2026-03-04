"use client";

import { useState } from "react";

// ─── Palette ────────────────────────────────────────────────────────────────
const W = {
  bg: "#f5f5f5",
  surface: "#ffffff",
  border: "#d1d5db",
  borderDark: "#9ca3af",
  muted: "#e5e7eb",
  mutedDark: "#9ca3af",
  text: "#374151",
  textLight: "#6b7280",
  accent: "#3b82f6",
  available: "#bbf7d0",
  availableBorder: "#16a34a",
  unavailable: "#e5e7eb",
  placeholder: "#f3f4f6",
};

// ─── Primitive Components ────────────────────────────────────────────────────
const WBox = ({ children, style = {}, dashed = false }) => (
  <div style={{
    border: `1px ${dashed ? "dashed" : "solid"} ${W.border}`,
    borderRadius: 4,
    padding: 12,
    background: W.surface,
    ...style
  }}>{children}</div>
);

const WImage = ({ label, w = "100%", h = 80 }) => (
  <div style={{
    width: w, height: h, background: W.muted,
    border: `1px solid ${W.border}`, borderRadius: 4,
    display: "flex", alignItems: "center", justifyContent: "center",
    flexDirection: "column", gap: 4, flexShrink: 0
  }}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={W.mutedDark} strokeWidth="1.5">
      <line x1="3" y1="3" x2="21" y2="21" /><line x1="21" y1="3" x2="3" y2="21" />
      <rect x="3" y="3" width="18" height="18" rx="2" />
    </svg>
    <span style={{ fontSize: 10, color: W.textLight, fontFamily: "monospace" }}>{label}</span>
  </div>
);

const WButton = ({ children, primary = false, full = false, small = false, style = {}, onClick }) => (
  <button onClick={onClick} style={{
    padding: small ? "6px 12px" : "10px 16px",
    background: primary ? W.text : W.surface,
    color: primary ? "#fff" : W.text,
    border: `1px solid ${primary ? W.text : W.border}`,
    borderRadius: 4,
    fontSize: small ? 11 : 13,
    fontFamily: "monospace",
    cursor: "pointer",
    width: full ? "100%" : "auto",
    fontWeight: primary ? 600 : 400,
    ...style
  }}>{children}</button>
);

const WInput = ({ placeholder, value, style = {} }) => (
  <div style={{
    border: `1px solid ${W.border}`, borderRadius: 4,
    padding: "8px 10px", background: W.placeholder,
    fontSize: 12, fontFamily: "monospace", color: W.textLight,
    ...style
  }}>{value || placeholder}</div>
);

const WSelect = ({ label, value }) => (
  <div style={{
    border: `1px solid ${W.border}`, borderRadius: 4,
    padding: "8px 10px", background: W.placeholder,
    fontSize: 12, fontFamily: "monospace", color: value ? W.text : W.textLight,
    display: "flex", justifyContent: "space-between", alignItems: "center"
  }}>
    <span>{value || label}</span>
    <span style={{ color: W.mutedDark }}>▾</span>
  </div>
);

const WLabel = ({ children, style = {} }) => (
  <div style={{ fontSize: 11, fontFamily: "monospace", color: W.textLight, marginBottom: 4, ...style }}>
    {children}
  </div>
);

const WHeading = ({ children, size = 14, style = {} }) => (
  <div style={{ fontSize: size, fontFamily: "monospace", fontWeight: 700, color: W.text, ...style }}>
    {children}
  </div>
);

const WDivider = ({ style = {} }) => (
  <div style={{ height: 1, background: W.muted, margin: "12px 0", ...style }} />
);

const WAnnotation = ({ number, children, style = {} }) => (
  <div style={{
    display: "flex", gap: 8, alignItems: "flex-start",
    fontSize: 11, fontFamily: "monospace", color: W.text, ...style
  }}>
    <span style={{
      background: W.accent, color: "#fff", borderRadius: "50%",
      width: 18, height: 18, display: "flex", alignItems: "center",
      justifyContent: "center", fontSize: 10, fontWeight: 700, flexShrink: 0, marginTop: 1
    }}>{number}</span>
    <span style={{ lineHeight: 1.5 }}>{children}</span>
  </div>
);

const WCheckbox = ({ label }) => (
  <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
    <div style={{
      width: 14, height: 14, border: `1px solid ${W.border}`,
      borderRadius: 2, background: W.surface, flexShrink: 0, marginTop: 2
    }} />
    <span style={{ fontSize: 11, fontFamily: "monospace", color: W.textLight, lineHeight: 1.5 }}>{label}</span>
  </div>
);

const WTag = ({ children, color = W.muted, textColor = W.textLight }) => (
  <span style={{
    background: color, color: textColor, padding: "2px 8px",
    borderRadius: 12, fontSize: 11, fontFamily: "monospace"
  }}>{children}</span>
);

// ─── Mini Calendar ───────────────────────────────────────────────────────────
const MiniCalendar = ({ onSelectDate, selectedDate }) => {
  const [month, setMonth] = useState("March 2026");
  const days = [
    null, null, null, null, null, null, 1,
    2, 3, 4, 5, 6, 7, 8,
    9, 10, 11, 12, 13, 14, 15,
    16, 17, 18, 19, 20, 21, 22,
    23, 24, 25, 26, 27, 28, 29,
    30, 31
  ];
  const unavailable = new Set([3, 8, 9, 15, 22, 29]);
  return (
    <div style={{ border: `1px solid ${W.border}`, borderRadius: 4, background: W.surface }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "8px 12px", borderBottom: `1px solid ${W.muted}`
      }}>
        <button onClick={() => {}} style={{ background: "none", border: "none", cursor: "pointer", color: W.textLight, fontSize: 14 }}>‹</button>
        <span style={{ fontSize: 12, fontFamily: "monospace", fontWeight: 700, color: W.text }}>{month}</span>
        <button onClick={() => {}} style={{ background: "none", border: "none", cursor: "pointer", color: W.textLight, fontSize: 14 }}>›</button>
      </div>
      <div style={{ padding: 8 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2, marginBottom: 4 }}>
          {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => (
            <div key={d} style={{ textAlign: "center", fontSize: 9, fontFamily: "monospace", color: W.textLight, padding: "2px 0" }}>{d}</div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2 }}>
          {days.map((d, i) => {
            if (!d) return <div key={i} />;
            const isUnavail = unavailable.has(d);
            const isSelected = selectedDate === d;
            return (
              <div key={i} onClick={() => !isUnavail && onSelectDate(d)} style={{
                textAlign: "center", fontSize: 10, fontFamily: "monospace",
                padding: "4px 2px", borderRadius: 3, cursor: isUnavail ? "not-allowed" : "pointer",
                background: isSelected ? W.text : isUnavail ? W.unavailable : W.available,
                color: isSelected ? "#fff" : isUnavail ? W.mutedDark : "#166534",
                border: `1px solid ${isSelected ? W.text : isUnavail ? W.border : W.availableBorder}`,
                opacity: isUnavail ? 0.6 : 1,
              }}>{d}</div>
            );
          })}
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 8, padding: "4px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 10, height: 10, background: W.available, border: `1px solid ${W.availableBorder}`, borderRadius: 2 }} />
            <span style={{ fontSize: 9, fontFamily: "monospace", color: W.textLight }}>Available</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 10, height: 10, background: W.unavailable, border: `1px solid ${W.border}`, borderRadius: 2 }} />
            <span style={{ fontSize: 9, fontFamily: "monospace", color: W.textLight }}>Unavailable</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Price Breakdown ─────────────────────────────────────────────────────────
const PriceBreakdown = ({ hours }) => {
  const rate = 250;
  const subtotal = rate * hours;
  const fee = 0; // TBD
  const total = subtotal + fee;
  return (
    <WBox style={{ background: W.placeholder }}>
      <WHeading size={12} style={{ marginBottom: 8 }}>Price Breakdown</WHeading>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontFamily: "monospace", color: W.text }}>
          <span>${rate}/hr × {hours} hour{hours > 1 ? "s" : ""}</span>
          <span>${subtotal.toLocaleString()}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontFamily: "monospace", color: W.textLight }}>
          <span>Platform fee</span>
          <span style={{ color: W.mutedDark }}>TBD</span>
        </div>
        <WDivider style={{ margin: "4px 0" }} />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontFamily: "monospace", color: W.text, fontWeight: 700 }}>
          <span>Total</span>
          <span>${total.toLocaleString()}</span>
        </div>
      </div>
    </WBox>
  );
};

// ─── Screen 1: Booking Flow ──────────────────────────────────────────────────
const BookingScreen = ({ onBook, breakpoint }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [hours, setHours] = useState(2);
  const isDesktop = breakpoint === "desktop";

  const ArtistCard = () => (
    <WBox>
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        <WImage label="artist_photo" w={64} h={64} />
        <div style={{ flex: 1 }}>
          <WHeading size={13}>Jazz Ensemble Name</WHeading>
          <div style={{ fontSize: 12, fontFamily: "monospace", color: W.textLight, marginTop: 2 }}>Jazz, Soul</div>
          <div style={{ fontSize: 13, fontFamily: "monospace", color: W.text, marginTop: 4, fontWeight: 600 }}>$250 / hr</div>
        </div>
      </div>
    </WBox>
  );

  const DateTimeSection = () => (
    <WBox>
      <WHeading size={12} style={{ marginBottom: 10 }}>Select Date &amp; Time</WHeading>
      <MiniCalendar onSelectDate={setSelectedDate} selectedDate={selectedDate} />
      {selectedDate && (
        <div style={{ marginTop: 10, padding: "6px 10px", background: W.available, border: `1px solid ${W.availableBorder}`, borderRadius: 4, fontSize: 11, fontFamily: "monospace", color: "#166534" }}>
          ✓ Selected: March {selectedDate}, 2026
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 10 }}>
        <div>
          <WLabel>Start Time</WLabel>
          <WSelect label="Select time..." value="7:00 PM" />
        </div>
        <div>
          <WLabel>Duration</WLabel>
          <WSelect label="# hours..." value={`${hours} hours`} />
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
        {[1, 2, 3, 4].map(h => (
          <button key={h} onClick={() => setHours(h)} style={{
            padding: "4px 12px", borderRadius: 12,
            background: hours === h ? W.text : W.surface,
            color: hours === h ? "#fff" : W.textLight,
            border: `1px solid ${hours === h ? W.text : W.border}`,
            fontSize: 11, fontFamily: "monospace", cursor: "pointer"
          }}>{h} hr{h > 1 ? "s" : ""}</button>
        ))}
        <button onClick={() => setHours(5)} style={{
          padding: "4px 12px", borderRadius: 12,
          background: hours === 5 ? W.text : W.surface,
          color: hours === 5 ? "#fff" : W.textLight,
          border: `1px solid ${hours === 5 ? W.text : W.border}`,
          fontSize: 11, fontFamily: "monospace", cursor: "pointer"
        }}>4+ hrs</button>
      </div>
    </WBox>
  );

  const PaymentSection = () => (
    <WBox>
      <WHeading size={12} style={{ marginBottom: 10 }}>Payment</WHeading>
      <div style={{
        background: "#fffbeb", border: "1px solid #fcd34d",
        borderRadius: 4, padding: "8px 10px", marginBottom: 10,
        fontSize: 11, fontFamily: "monospace", color: "#92400e"
      }}>
        🔒 Your payment is held securely and released to the artist 24 hours after your event.
      </div>
      <WLabel>Card Number</WLabel>
      <WInput placeholder="•••• •••• •••• ••••" style={{ marginBottom: 8 }} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
        <div>
          <WLabel>Expiration</WLabel>
          <WInput placeholder="MM / YY" />
        </div>
        <div>
          <WLabel>CVC</WLabel>
          <WInput placeholder="•••" />
        </div>
      </div>
      <WLabel>Billing ZIP</WLabel>
      <WInput placeholder="10001" style={{ marginBottom: 8 }} />
      <div style={{
        display: "flex", gap: 6, alignItems: "center",
        padding: "6px 8px", background: W.placeholder,
        border: `1px solid ${W.border}`, borderRadius: 4, marginBottom: 8
      }}>
        <span style={{ fontSize: 11, fontFamily: "monospace", color: W.textLight }}>Powered by</span>
        <span style={{ fontSize: 11, fontFamily: "monospace", fontWeight: 700, color: W.text }}>Stripe</span>
        <span style={{ fontSize: 11, fontFamily: "monospace", color: W.mutedDark, marginLeft: "auto" }}>[ Apple Pay ] [ Google Pay ] — TBD</span>
      </div>
    </WBox>
  );

  const TermsSection = () => (
    <WBox>
      <WCheckbox label="I have read and agree to the Cancellation Policy. [Policy details TBD — link to Terms of Service]" />
      <div style={{ marginTop: 8 }}>
        <WCheckbox label="I agree to the OVRTØNE Terms of Service and Privacy Policy." />
      </div>
    </WBox>
  );

  if (isDesktop) {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 16, alignItems: "start" }}>
        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <DateTimeSection />
          <PaymentSection />
          <TermsSection />
          <WButton primary full onClick={onBook}>Instant Book</WButton>
          <div style={{ textAlign: "center", fontSize: 10, fontFamily: "monospace", color: W.textLight }}>
            By clicking Instant Book, you agree to the booking terms above.
          </div>
        </div>
        {/* Right column — sticky summary */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, position: "sticky", top: 0 }}>
          <ArtistCard />
          <PriceBreakdown hours={hours} />
        </div>
      </div>
    );
  }

  // Mobile — stacked
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <ArtistCard />
      <DateTimeSection />
      <PriceBreakdown hours={hours} />
      <PaymentSection />
      <TermsSection />
      <WButton primary full onClick={onBook}>Instant Book</WButton>
      <div style={{ textAlign: "center", fontSize: 10, fontFamily: "monospace", color: W.textLight }}>
        By clicking Instant Book, you agree to the booking terms above.
      </div>
    </div>
  );
};

// ─── Screen 2: Confirmation ──────────────────────────────────────────────────
const ConfirmationScreen = ({ onMessages }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
    <WBox style={{ textAlign: "center", padding: 24 }}>
      <div style={{ fontSize: 32, marginBottom: 8 }}>✓</div>
      <WHeading size={16} style={{ marginBottom: 4 }}>Booking Confirmed!</WHeading>
      <div style={{ fontSize: 12, fontFamily: "monospace", color: W.textLight }}>
        A confirmation email has been sent to your inbox.
      </div>
    </WBox>
    <WBox>
      <WHeading size={12} style={{ marginBottom: 10 }}>Booking Details</WHeading>
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
        <WImage label="artist_photo" w={52} h={52} />
        <div>
          <WHeading size={12}>Jazz Ensemble Name</WHeading>
          <div style={{ fontSize: 11, fontFamily: "monospace", color: W.textLight }}>Jazz, Soul</div>
        </div>
      </div>
      <WDivider />
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {[
          ["Booking ID", "#OVR-20260315-0042"],
          ["Date", "March 15, 2026"],
          ["Time", "7:00 PM – 9:00 PM"],
          ["Duration", "2 hours"],
          ["Total Paid", "$500.00"],
        ].map(([label, value]) => (
          <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontFamily: "monospace" }}>
            <span style={{ color: W.textLight }}>{label}</span>
            <span style={{ color: W.text, fontWeight: label === "Total Paid" ? 700 : 400 }}>{value}</span>
          </div>
        ))}
      </div>
    </WBox>
    <WBox style={{ background: W.placeholder }}>
      <WHeading size={12} style={{ marginBottom: 6 }}>What Happens Next</WHeading>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {[
          "Messaging with your artist is now unlocked.",
          "Your payment is held securely until 24 hours after your event.",
          "You may initiate a cancellation from the Messages page.",
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", gap: 8, fontSize: 11, fontFamily: "monospace", color: W.textLight }}>
            <span style={{ color: W.accent, fontWeight: 700 }}>→</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </WBox>
    <WButton primary full onClick={onMessages}>Go to Messages</WButton>
    <WButton full>Back to Artist Profile</WButton>
  </div>
);

// ─── Screen 3: Payment Error State ──────────────────────────────────────────
const ErrorScreen = ({ onRetry }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
    <WBox style={{ textAlign: "center", padding: 24, borderColor: "#fca5a5" }}>
      <div style={{ fontSize: 28, marginBottom: 8 }}>✗</div>
      <WHeading size={14} style={{ marginBottom: 4, color: "#dc2626" }}>Payment Failed</WHeading>
      <div style={{ fontSize: 12, fontFamily: "monospace", color: W.textLight, marginBottom: 12 }}>
        Your payment could not be processed. Please check your card details and try again.
      </div>
      <div style={{
        display: "inline-block", padding: "6px 12px",
        background: "#fef2f2", border: "1px solid #fca5a5",
        borderRadius: 4, fontSize: 11, fontFamily: "monospace", color: "#dc2626"
      }}>
        Error: Card declined — Insufficient funds
      </div>
    </WBox>
    <WBox>
      <WHeading size={12} style={{ marginBottom: 10 }}>Your selections are preserved</WHeading>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {[["Date", "March 15, 2026"], ["Time", "7:00 PM"], ["Duration", "2 hours"], ["Total", "$500.00"]].map(([k, v]) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontFamily: "monospace" }}>
            <span style={{ color: W.textLight }}>{k}</span>
            <span style={{ color: W.text }}>{v}</span>
          </div>
        ))}
      </div>
    </WBox>
    <WButton primary full onClick={onRetry}>Try Again with New Card</WButton>
    <WButton full>Use Saved Card on File</WButton>
  </div>
);

// ─── Annotation Panel ────────────────────────────────────────────────────────
const AnnotationPanel = ({ screen }) => {
  const notes = {
    booking: {
      title: "Book an Artist — Single Page Flow",
      flow: "Artist Profile → [Booking Flow] → Confirmation",
      items: [
        { n: 1, text: "Back arrow navigates to artist profile. Artist info is read-only (name, genre, hourly rate, photo)." },
        { n: 2, text: "Calendar shows green (available) and grey (unavailable) dates. Only green dates are selectable. Clicking grey = no-op. Range: up to 1 year." },
        { n: 3, text: "Duration dropdown (1, 2, 3, 4+ hours). Price breakdown updates dynamically as duration changes." },
        { n: 4, text: "Platform fee line item reserved — rate TBD, may be zero or hidden at launch." },
        { n: 5, text: "Fund-hold message: 'Held securely, released 24hrs after event.' Never use the word 'escrow'." },
        { n: 6, text: "Stripe embedded form (Elements). Apple Pay / Google Pay support TBD. Card fields: number, expiry, CVC, billing ZIP." },
        { n: 7, text: "Cancellation policy checkbox — policy text TBD, links to Terms of Service." },
        { n: 8, text: "Desktop: two-column layout (form left, summary card sticky right). Mobile: stacked single column." },
      ],
      open: [
        "Deposit vs. full payment — SOW page 3 says 'deposit/full' but page 9 does not list deposits. Needs resolution.",
        "Apple Pay / Google Pay — include if Stripe Elements supports with minimal added complexity.",
        "Saved payment methods — requires Stripe customer object; improve repeat-client UX.",
        "Race condition: if a date is booked between page load and submission, show error and refresh calendar.",
        "Single-page flow assumes Stripe embedded form is compatible — confirm during implementation.",
      ]
    },
    confirmation: {
      title: "Booking Confirmation Screen",
      flow: "Booking Flow → [Confirmation] → Messages",
      items: [
        { n: 1, text: "Confirmation email sent automatically on successful booking." },
        { n: 2, text: "Booking ID displayed for reference (format: OVR-[date]-[sequence])." },
        { n: 3, text: "'Go to Messages' CTA is the primary action — messaging is unlocked immediately after booking." },
        { n: 4, text: "'What Happens Next' section sets expectations for fund-hold timeline and cancellation path." },
        { n: 5, text: "ICS calendar download — TBD. Low-effort, high-value; recommend including if straightforward." },
      ],
      open: [
        "ICS calendar file download — confirm implementation effort.",
        "Should artist receive a notification at this point? (implied yes — email notifications are in scope).",
      ]
    },
    error: {
      title: "Payment Error State",
      flow: "Booking Flow → [Payment Failed] → Retry",
      items: [
        { n: 1, text: "Card-specific error messages via Stripe (e.g., 'Insufficient funds', 'Card declined')." },
        { n: 2, text: "All date/time selections are preserved — client should not need to re-select." },
        { n: 3, text: "Two retry paths: try a new card, or use a saved card on file (if saved cards are supported)." },
      ],
      open: [
        "Saved cards on file — depends on whether Stripe customer objects are implemented.",
        "How many retry attempts before the booking attempt is cleared?",
      ]
    }
  };

  const n = notes[screen];
  return (
    <div style={{
      borderTop: `2px solid ${W.border}`, marginTop: 24,
      paddingTop: 16, display: "flex", flexDirection: "column", gap: 12
    }}>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 240 }}>
          <WHeading size={11} style={{ marginBottom: 8, color: W.accent }}>ANNOTATIONS</WHeading>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {n.items.map(item => <WAnnotation key={item.n} number={item.n}>{item.text}</WAnnotation>)}
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 240 }}>
          <WHeading size={11} style={{ marginBottom: 8, color: "#f59e0b" }}>OPEN QUESTIONS</WHeading>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {n.open.map((q, i) => (
              <div key={i} style={{ display: "flex", gap: 8, fontSize: 11, fontFamily: "monospace", color: W.text }}>
                <span style={{ color: "#f59e0b", fontWeight: 700, flexShrink: 0 }}>?</span>
                <span style={{ lineHeight: 1.5 }}>{q}</span>
              </div>
            ))}
          </div>
          <WHeading size={11} style={{ marginTop: 12, marginBottom: 6, color: W.mutedDark }}>FLOW</WHeading>
          <div style={{ fontSize: 11, fontFamily: "monospace", color: W.textLight }}>{n.flow}</div>
        </div>
      </div>
    </div>
  );
};

// ─── Main App ────────────────────────────────────────────────────────────────
export default function BookingPage() {
  const [screen, setScreen] = useState("booking");
  const [breakpoint, setBreakpoint] = useState("mobile");

  const bpWidth = { mobile: 375, tablet: 520, desktop: "100%" };
  const screenLabels = { booking: "Book an Artist", confirmation: "Confirmation", error: "Payment Error" };

  return (
    <div style={{ minHeight: "100vh", background: "#e5e7eb", padding: 16, fontFamily: "monospace" }}>

      {/* ── Toolbar ── */}
      <div style={{
        background: W.surface, border: `1px solid ${W.border}`, borderRadius: 6,
        padding: "10px 16px", marginBottom: 16,
        display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap"
      }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: W.text }}>
          OVRTØNE / {screenLabels[screen]}
        </span>

        {/* Screen switcher */}
        <div style={{ display: "flex", gap: 4, marginLeft: "auto" }}>
          {Object.entries(screenLabels).map(([key, label]) => (
            <button key={key} onClick={() => setScreen(key)} style={{
              padding: "4px 10px", fontSize: 11, fontFamily: "monospace",
              background: screen === key ? W.text : W.surface,
              color: screen === key ? "#fff" : W.textLight,
              border: `1px solid ${screen === key ? W.text : W.border}`,
              borderRadius: 4, cursor: "pointer"
            }}>{label}</button>
          ))}
        </div>

        {/* Breakpoint switcher */}
        <div style={{ display: "flex", gap: 4 }}>
          {["mobile", "tablet", "desktop"].map(bp => (
            <button key={bp} onClick={() => setBreakpoint(bp)} style={{
              padding: "4px 10px", fontSize: 11, fontFamily: "monospace",
              background: breakpoint === bp ? W.accent : W.surface,
              color: breakpoint === bp ? "#fff" : W.textLight,
              border: `1px solid ${breakpoint === bp ? W.accent : W.border}`,
              borderRadius: 4, cursor: "pointer"
            }}>{bp === "mobile" ? "📱 375" : bp === "tablet" ? "📟 520" : "🖥 full"}</button>
          ))}
        </div>
      </div>

      {/* ── Canvas ── */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{
          width: bpWidth[breakpoint],
          maxWidth: "100%",
          border: `2px solid ${W.borderDark}`,
          borderRadius: 8,
          background: W.surface,
          overflow: "hidden"
        }}>
          {/* Page header / nav bar */}
          <div style={{
            background: W.bg, borderBottom: `1px solid ${W.border}`,
            padding: "10px 16px", display: "flex", alignItems: "center", gap: 10
          }}>
            <button style={{
              background: "none", border: `1px solid ${W.border}`, borderRadius: 4,
              padding: "4px 8px", fontSize: 12, cursor: "pointer", color: W.text
            }}>← Back</button>
            <span style={{ fontSize: 13, fontWeight: 700, color: W.text }}>
              {screenLabels[screen]}
            </span>
          </div>

          {/* Page content */}
          <div style={{ padding: 16, background: W.bg }}>
            {screen === "booking" && (
              <BookingScreen
                breakpoint={breakpoint}
                onBook={() => setScreen("confirmation")}
              />
            )}
            {screen === "confirmation" && (
              <ConfirmationScreen onMessages={() => {}} />
            )}
            {screen === "error" && (
              <ErrorScreen onRetry={() => setScreen("booking")} />
            )}
          </div>
        </div>
      </div>

      {/* ── Annotations ── */}
      <div style={{
        background: W.surface, border: `1px solid ${W.border}`,
        borderRadius: 6, padding: 16, marginTop: 16,
        maxWidth: bpWidth[breakpoint] === "100%" ? "100%" : "max-content",
        margin: "16px auto 0"
      }}>
        <AnnotationPanel screen={screen} />
      </div>

    </div>
  );
}
