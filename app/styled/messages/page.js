"use client";

import { useState } from "react";
import { C, FONT } from "../components/constants";
import { ContentBox } from "../components/ui";
import { SectionHeading } from "../components/shared";

// ── CONVERSATION DATA ──
const conversations = [
  { id: 1, name: "The Blue Note Trio", lastMsg: "Looking forward to the event! We'll arrive at 6:30 for sound check.", date: "Mar 4", unread: true, status: "Confirmed", image: "/bands/band_1.avif" },
  { id: 2, name: "Sarah Chen", lastMsg: "Thanks for the great performance last weekend!", date: "Mar 1", unread: false, status: "Completed", image: "/ben_hazlewood/ben_avatar_1.jpg" },
  { id: 3, name: "DJ Pulse", lastMsg: "Booking cancelled by you.", date: "Feb 28", unread: false, status: "Cancelled", image: "/bands/band_2.avif" },
  { id: 4, name: "Luna Strings Quartet", lastMsg: "We have the full Vivaldi set ready. Any special requests?", date: "Feb 22", unread: true, status: "Confirmed", image: "/bands/band_3.avif" },
  { id: 5, name: "Marcus Williams Band", lastMsg: "Perfect, thank you!", date: "Feb 15", unread: false, status: "Completed", image: "/bands/band_5.avif" },
];

// ── MESSAGE DATA ──
const messages = [
  { type: "system", text: "Booking confirmed — Sat, Mar 15, 2026, 7:00–10:00 PM", date: "Mar 4, 2026" },
  { type: "received", text: "Hey! Thanks for booking us. We're excited about your event. Just wanted to confirm — is the venue address 42 W 33rd St?", time: "10:15 AM", date: "Mar 4, 2026" },
  { type: "sent", text: "Yes, that's correct! The venue is on the 2nd floor. There's a loading dock in the back for equipment.", time: "10:22 AM" },
  { type: "received", text: "Perfect. We'll need about 45 minutes for setup. Can we arrive at 6:15?", time: "10:28 AM" },
  { type: "sent", text: "6:15 works great. I'll let the building manager know. Is there anything else you need?", time: "10:35 AM" },
  { type: "separator", date: "Mar 5, 2026" },
  { type: "received", text: "Looking forward to the event! We'll arrive at 6:30 for sound check. One quick question — will there be power outlets near the stage area?", time: "9:41 AM", date: "Mar 5, 2026" },
];

const statusColors = {
  Confirmed: { bg: "#dcfce7", text: "#166534" },
  Completed: { bg: "#f1f5f9", text: "#475569" },
  Cancelled: { bg: "#fee2e2", text: "#dc2626" },
};

const BOOKING_DETAILS = [
  ["Date", "Sat, Mar 15, 2026"],
  ["Time", "7:00 – 10:00 PM"],
  ["Duration", "3 hours"],
  ["Total", "$750.00"],
];

function StatusTag({ status }) {
  const s = statusColors[status];
  return (
    <span
      className="inline-block rounded-full text-[11px] font-semibold"
      style={{ padding: "3px 10px", background: s.bg, color: s.text }}
    >
      {status}
    </span>
  );
}

function ConvoAvatar({ image, size = 40 }) {
  return (
    <div
      className="rounded-full flex-shrink-0 overflow-hidden"
      style={{ width: size, height: size }}
    >
      <img src={image} alt="" className="w-full h-full object-cover" />
    </div>
  );
}

function MessageBubble({ m }) {
  if (m.type === "system") {
    return (
      <div className="text-center my-4">
        <span
          className="rn-label inline-block rounded-full"
          style={{ padding: "4px 12px", background: C.pageBg, letterSpacing: 0 }}
        >
          {m.text}
        </span>
      </div>
    );
  }
  if (m.type === "separator") {
    return (
      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px" style={{ background: C.sectionBorder }} />
        <span className="rn-label" style={{ letterSpacing: 0 }}>{m.date}</span>
        <div className="flex-1 h-px" style={{ background: C.sectionBorder }} />
      </div>
    );
  }

  const isSent = m.type === "sent";
  return (
    <div className={`flex ${isSent ? "justify-end" : "justify-start"} mb-2.5`}>
      <div
        className="max-w-[70%] rn-body-text"
        style={{
          padding: "8px 12px",
          fontSize: 13,
          borderRadius: 12,
          borderBottomRightRadius: isSent ? 4 : 12,
          borderBottomLeftRadius: isSent ? 12 : 4,
          background: isSent ? C.sidebarBg : C.white,
          color: isSent ? C.white : C.textPrimary,
          border: isSent ? "none" : `1px solid ${C.sectionBorder}`,
        }}
      >
        {m.text}
        <div className="text-[9px] mt-1 text-right" style={{ color: C.textMuted }}>{m.time}</div>
      </div>
    </div>
  );
}

export default function MessagesPage() {
  const [selectedConvo, setSelectedConvo] = useState(0);
  const [mobilePanel, setMobilePanel] = useState("list");
  const [showCancelModal, setShowCancelModal] = useState(false);

  const convo = conversations[selectedConvo];
  const unreadCount = conversations.filter((c) => c.unread).length;

  /* ═══ Conversation List ═══ */
  const ConversationList = ({ onSelect }) => (
    <div className="overflow-y-auto">
      <ContentBox style={{ borderBottom: `1px solid ${C.sectionBorder}`, padding: "14px 16px 10px" }}>
        <SectionHeading>Messages</SectionHeading>
        <div className="rn-label mt-0.5">{unreadCount} unread</div>
      </ContentBox>
      {conversations.map((c, i) => (
        <div
          key={c.id}
          onClick={() => onSelect(i)}
          className="cursor-pointer transition-colors px-4 py-3"
          style={{
            borderBottom: `1px solid ${C.sectionBorder}`,
            background: selectedConvo === i ? C.pageBg : c.unread ? "#fefce8" : "transparent",
          }}
        >
          <div className="flex gap-2.5 items-start">
            <ConvoAvatar image={c.image} size={40} />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <span className="text-[13px]" style={{ fontWeight: c.unread ? 700 : 500, color: C.textPrimary }}>
                  {c.name}
                </span>
                <span className="text-[10px]" style={{ color: C.textMuted }}>{c.date}</span>
              </div>
              <div className="text-[11px] mt-0.5 truncate" style={{ color: C.textSecondary }}>
                {c.lastMsg}
              </div>
              <div className="mt-1">
                <StatusTag status={c.status} />
              </div>
            </div>
            {c.unread && (
              <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ background: C.blue }} />
            )}
          </div>
        </div>
      ))}
    </div>
  );

  /* ═══ Message Thread ═══ */
  const MessageThread = ({ showBackBtn, onBack, onViewBooking }) => (
    <div className="flex flex-col h-full">
      {/* Thread header */}
      <div className="flex items-center gap-2.5 px-4 py-2.5" style={{ borderBottom: `1px solid ${C.sectionBorder}` }}>
        {showBackBtn && (
          <span onClick={onBack} className="text-lg cursor-pointer" style={{ color: C.textMuted }}>←</span>
        )}
        <ConvoAvatar image={convo.image} size={28} />
        <div className="flex-1">
          <div className="text-[13px] font-bold" style={{ color: C.textPrimary }}>{convo.name}</div>
        </div>
        {onViewBooking && (
          <span onClick={onViewBooking} className="text-[10px] font-semibold cursor-pointer" style={{ color: C.blue }}>
            View Booking
          </span>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3" style={{ background: C.pageBg }}>
        {messages.map((m, i) => (
          <MessageBubble key={i} m={m} />
        ))}
      </div>

      {/* Compose */}
      <div className="flex items-center gap-2 px-4 py-2.5" style={{ borderTop: `1px solid ${C.sectionBorder}` }}>
        <input
          type="text"
          placeholder="Write a message..."
          className="rn-field-input flex-1"
          style={{ borderRadius: 3 }}
        />
        <button className="rn-btn-blue flex items-center justify-center" style={{ width: 36, height: 36, padding: 0, borderRadius: 3 }}>
          ↑
        </button>
      </div>
    </div>
  );

  /* ═══ Booking Info Panel ═══ */
  const BookingInfoPanel = ({ showBackBtn, onBack }) => (
    <ContentBox className="overflow-y-auto">
      {showBackBtn && (
        <div className="flex items-center gap-2 mb-4">
          <span onClick={onBack} className="text-lg cursor-pointer" style={{ color: C.textMuted }}>←</span>
          <SectionHeading>Booking Details</SectionHeading>
        </div>
      )}
      {!showBackBtn && <SectionHeading>Booking Details</SectionHeading>}

      {/* Artist card */}
      <div className="flex gap-2.5 items-center mt-4 mb-3.5">
        <ConvoAvatar image={convo.image} size={48} />
        <div>
          <div className="text-[13px] font-bold" style={{ color: C.textPrimary }}>{convo.name}</div>
          <span className="text-[10px] font-semibold cursor-pointer" style={{ color: C.blue }}>View profile →</span>
        </div>
      </div>

      <StatusTag status={convo.status} />

      {/* Details */}
      <div className="mt-3">
        {BOOKING_DETAILS.map(([k, v]) => (
          <div key={k} className="flex justify-between py-2 border-b border-[var(--rn-slate-100)]">
            <span className="rn-detail-key">{k}</span>
            <span className="rn-detail-value">{v}</span>
          </div>
        ))}
      </div>

      {/* Payment hold */}
      <div
        className="mt-3 rounded text-[11px] leading-relaxed"
        style={{ padding: "8px 10px", background: "#eef2ff", color: C.textSecondary }}
      >
        🔒 Payment held securely. Released to artist 24hrs after event.
      </div>

      {/* Cancellation button */}
      {convo.status === "Confirmed" && (
        <div
          onClick={() => setShowCancelModal(true)}
          className="mt-4 py-2.5 text-center rounded text-[12px] font-bold cursor-pointer"
          style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626" }}
        >
          Initiate Cancellation
        </div>
      )}

      {/* Review prompt */}
      {convo.status === "Completed" && (
        <div className="mt-4 py-2.5 text-center rounded text-[12px] font-bold cursor-pointer" style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#166534" }}>
          Leave a Review
        </div>
      )}

      {/* Cancelled state */}
      {convo.status === "Cancelled" && (
        <div className="mt-4 rounded text-center text-[11px] leading-relaxed" style={{ padding: "8px 10px", background: "#fef2f2", color: "#dc2626" }}>
          This booking has been cancelled. Refunds handled by OVRTØNE admins via Stripe.
        </div>
      )}
    </ContentBox>
  );

  return (
    <>
      {/* ═══ DESKTOP: THREE-PANEL LAYOUT ═══ */}
      <div
        className="hidden md:grid overflow-hidden bg-white"
        style={{
          gridTemplateColumns: "260px 1fr 280px",
          border: `1px solid ${C.sectionBorder}`,
          minHeight: 560,
        }}
      >
        {/* Left: Conversations */}
        <div style={{ borderRight: `1px solid ${C.sectionBorder}` }}>
          <ConversationList onSelect={(i) => setSelectedConvo(i)} />
        </div>

        {/* Center: Thread */}
        <div style={{ borderRight: `1px solid ${C.sectionBorder}` }}>
          <MessageThread />
        </div>

        {/* Right: Booking Info */}
        <BookingInfoPanel />
      </div>

      {/* ═══ MOBILE: PANEL-SWITCHING LAYOUT ═══ */}
      <div className="md:hidden">
        {/* Tab switcher */}
        <div className="flex gap-1 mb-3 rounded p-0.5" style={{ background: C.pageBg }}>
          {[
            ["list", "Conversations"],
            ["thread", "Thread"],
            ["info", "Booking Info"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setMobilePanel(key)}
              className="flex-1 py-2 rounded border-none cursor-pointer text-[12px] font-semibold transition-colors"
              style={{
                background: mobilePanel === key ? C.white : "transparent",
                color: mobilePanel === key ? C.textPrimary : C.textMuted,
                boxShadow: mobilePanel === key ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <div
          className="overflow-hidden flex flex-col bg-white"
          style={{ border: `1px solid ${C.sectionBorder}`, minHeight: 500 }}
        >
          {mobilePanel === "list" && (
            <ConversationList
              onSelect={(i) => { setSelectedConvo(i); setMobilePanel("thread"); }}
            />
          )}

          {mobilePanel === "thread" && (
            <div style={{ height: 500 }}>
              <MessageThread
                showBackBtn
                onBack={() => setMobilePanel("list")}
                onViewBooking={() => setMobilePanel("info")}
              />
            </div>
          )}

          {mobilePanel === "info" && (
            <BookingInfoPanel showBackBtn onBack={() => setMobilePanel("thread")} />
          )}
        </div>
      </div>

      {/* ═══ CANCELLATION MODAL ═══ */}
      {showCancelModal && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] p-5" style={{ background: "rgba(0,0,0,0.4)" }}>
          <div className="w-full max-w-[400px] bg-white rounded p-6" style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}>
            <div className="rn-section-heading mb-2">Cancel this booking?</div>
            <p className="rn-body-text mb-1.5" style={{ fontSize: 12 }}>
              Are you sure you want to cancel your booking with <strong>The Blue Note Trio</strong> on <strong>Sat, Mar 15</strong>?
            </p>
            <div
              className="rounded text-[11px] leading-relaxed mb-4"
              style={{ padding: "8px 10px", background: "#fffbeb", border: "1px solid #fde68a", color: "#92400e" }}
            >
              Cancellation policy applies. Refund amount depends on how far in advance you cancel.{" "}
              <span className="font-semibold cursor-pointer" style={{ color: C.blue }}>View cancellation policy →</span>
            </div>
            <div className="flex gap-2.5">
              <button onClick={() => setShowCancelModal(false)} className="rn-btn-back flex-1 text-center" style={{ padding: "10px 0" }}>
                Keep Booking
              </button>
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 rounded text-[13px] font-bold text-white cursor-pointer border-none"
                style={{ padding: "10px 0", background: "#dc2626" }}
              >
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
