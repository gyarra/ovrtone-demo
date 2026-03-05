"use client";

import { useState } from "react";
import Link from "next/link";

const WireframeBox = ({ children, className = "", dashed = false, label, height, onClick, style = {} }) => (
  <div
    onClick={onClick}
    className={`relative ${className}`}
    style={{
      border: dashed ? "2px dashed #94a3b8" : "1.5px solid #cbd5e1",
      borderRadius: 8,
      background: dashed ? "repeating-linear-gradient(45deg, #f8fafc, #f8fafc 4px, #f1f5f9 4px, #f1f5f9 8px)" : "#f8fafc",
      minHeight: height || "auto",
      cursor: onClick ? "pointer" : "default",
      ...style,
    }}
  >
    {label && (
      <span style={{
        position: "absolute", top: -10, left: 12,
        background: "#fff", padding: "0 6px",
        fontSize: 10, fontWeight: 700, letterSpacing: 1.2,
        color: "#64748b", textTransform: "uppercase",
      }}>{label}</span>
    )}
    {children}
  </div>
);

const SectionLabel = ({ children, number }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "28px 0 12px" }}>
    <span style={{
      width: 26, height: 26, borderRadius: "50%", background: "#1e293b",
      color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 12, fontWeight: 700, flexShrink: 0,
    }}>{number}</span>
    <span style={{ fontSize: 14, fontWeight: 700, color: "#1e293b", letterSpacing: 0.5, textTransform: "uppercase" }}>
      {children}
    </span>
    <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
  </div>
);

const Tag = ({ children, color = "#e2e8f0", textColor = "#334155" }) => (
  <span style={{
    display: "inline-block", padding: "3px 10px", borderRadius: 20,
    background: color, color: textColor, fontSize: 11, fontWeight: 600,
    marginRight: 4, marginBottom: 4, letterSpacing: 0.3,
  }}>{children}</span>
);

const Annotation = ({ children }) => (
  <div style={{
    fontSize: 10, color: "#f59e0b", fontWeight: 600, fontStyle: "italic",
    padding: "4px 8px", background: "#fffbeb", borderRadius: 4, border: "1px solid #fde68a",
    marginTop: 6, lineHeight: 1.4,
  }}>
    ⚡ {children}
  </div>
);

const Note = ({ children }) => (
  <div style={{
    fontSize: 10, color: "#6366f1", fontWeight: 500,
    padding: "4px 8px", background: "#eef2ff", borderRadius: 4, border: "1px solid #c7d2fe",
    marginTop: 4, lineHeight: 1.4,
  }}>
    📝 {children}
  </div>
);

// ── CONVERSATION DATA ──
const conversations = [
  { id: 1, name: "The Blue Note Trio", lastMsg: "Looking forward to the event! We'll arrive at 6:30 for sound check.", date: "Mar 4", unread: true, status: "Confirmed", avatar: "🎷" },
  { id: 2, name: "Sarah Chen", lastMsg: "Thanks for the great performance last weekend!", date: "Mar 1", unread: false, status: "Completed", avatar: "👤" },
  { id: 3, name: "DJ Pulse", lastMsg: "Booking cancelled by you.", date: "Feb 28", unread: false, status: "Cancelled", avatar: "🎧" },
  { id: 4, name: "Luna Strings Quartet", lastMsg: "We have the full Vivaldi set ready. Any special requests?", date: "Feb 22", unread: true, status: "Confirmed", avatar: "🎻" },
  { id: 5, name: "Marcus Williams Band", lastMsg: "Perfect, thank you!", date: "Feb 15", unread: false, status: "Completed", avatar: "🎤" },
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
  Completed: { bg: "#e2e8f0", text: "#475569" },
  Cancelled: { bg: "#fee2e2", text: "#dc2626" },
};

export default function BookingsMessagesWireframe() {
  const [view, setView] = useState("desktop");
  const [mobilePanel, setMobilePanel] = useState("list"); // list | thread | info
  const [selectedConvo, setSelectedConvo] = useState(0);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const isMobile = view === "mobile";
  const containerWidth = isMobile ? 375 : 960;
  const convo = conversations[selectedConvo];

  return (
    <div style={{
      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
      background: "#f1f5f9",
      minHeight: "100vh",
      padding: isMobile ? "16px 8px" : "24px 16px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}>
      {/* ── PAGE HEADER ── */}
      <div style={{ width: "100%", maxWidth: 1000, marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#64748b", textTransform: "uppercase", marginBottom: 2 }}>
              <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>OVRTØNE</Link> · Wireframe
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: 0, letterSpacing: -0.5 }}>
              Bookings / Messages
            </h1>
            <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}><Link href="/booking" style={{ color: "#3b82f6", textDecoration: "none", fontWeight: 600 }}>← Back to booking</Link></div>
          </div>
          <div style={{ display: "flex", gap: 4, background: "#e2e8f0", borderRadius: 8, padding: 3 }}>
            {["desktop", "mobile"].map(v => (
              <button key={v} onClick={() => { setView(v); setMobilePanel("list"); }} style={{
                padding: "6px 16px", borderRadius: 6, border: "none", cursor: "pointer",
                fontSize: 12, fontWeight: 600, textTransform: "capitalize",
                background: view === v ? "#fff" : "transparent",
                color: view === v ? "#0f172a" : "#64748b",
                boxShadow: view === v ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
              }}>{v}</button>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
           DESKTOP: THREE-PANEL LAYOUT
         ═══════════════════════════════════════════ */}
      {!isMobile && (
        <>
          <SectionLabel number="1">Three-Panel Layout (Desktop)</SectionLabel>
          <div style={{
            width: containerWidth, maxWidth: "100%",
            display: "grid",
            gridTemplateColumns: "240px 1fr 260px",
            background: "#fff", borderRadius: 12,
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            border: "1px solid #e2e8f0",
            overflow: "hidden",
            minHeight: 580,
          }}>

            {/* ── LEFT PANEL: Conversation List ── */}
            <div style={{ borderRight: "1px solid #e2e8f0", display: "flex", flexDirection: "column" }}>
              {/* Panel header */}
              <div style={{
                padding: "14px 14px 10px", borderBottom: "1px solid #f1f5f9",
              }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: "#0f172a" }}>Messages</div>
                <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 2 }}>
                  {conversations.filter(c => c.unread).length} unread
                </div>
              </div>

              {/* Conversation rows */}
              <div style={{ flex: 1, overflowY: "auto" }}>
                {conversations.map((c, i) => (
                  <div
                    key={c.id}
                    onClick={() => setSelectedConvo(i)}
                    style={{
                      padding: "10px 14px",
                      borderBottom: "1px solid #f8fafc",
                      cursor: "pointer",
                      background: selectedConvo === i ? "#f1f5f9" : c.unread ? "#fefce8" : "transparent",
                      transition: "background 0.15s",
                    }}
                  >
                    <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                      {/* Avatar */}
                      <div style={{
                        width: 36, height: 36, borderRadius: "50%", background: "#e2e8f0",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 16, flexShrink: 0,
                      }}>{c.avatar}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{
                            fontSize: 12, fontWeight: c.unread ? 800 : 600,
                            color: c.unread ? "#0f172a" : "#334155",
                            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                          }}>{c.name}</span>
                          <span style={{ fontSize: 9, color: "#94a3b8", flexShrink: 0, marginLeft: 4 }}>{c.date}</span>
                        </div>
                        <div style={{
                          fontSize: 10, color: c.unread ? "#475569" : "#94a3b8",
                          fontWeight: c.unread ? 600 : 400,
                          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                          marginTop: 2,
                        }}>{c.lastMsg}</div>
                        <div style={{ marginTop: 4 }}>
                          <Tag color={statusColors[c.status].bg} textColor={statusColors[c.status].text}>{c.status}</Tag>
                        </div>
                      </div>
                      {/* Unread dot */}
                      {c.unread && (
                        <div style={{
                          width: 8, height: 8, borderRadius: "50%",
                          background: "#3b82f6", flexShrink: 0, marginTop: 4,
                        }} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── CENTER PANEL: Message Thread ── */}
            <div style={{ display: "flex", flexDirection: "column", borderRight: "1px solid #e2e8f0" }}>
              {/* Thread header */}
              <div style={{
                padding: "12px 16px", borderBottom: "1px solid #f1f5f9",
                display: "flex", alignItems: "center", gap: 10,
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%", background: "#e2e8f0",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14,
                }}>{convo.avatar}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>{convo.name}</div>
                  <div style={{ fontSize: 10, color: "#94a3b8" }}>
                    {convo.status === "Confirmed" ? "Responds within a few hours" : convo.status}
                  </div>
                </div>
              </div>

              {/* Messages area */}
              <div style={{ flex: 1, padding: 16, overflowY: "auto", background: "#fafbfc" }}>
                {messages.map((m, i) => {
                  if (m.type === "system") return (
                    <div key={i} style={{ textAlign: "center", margin: "16px 0" }}>
                      <span style={{
                        fontSize: 10, color: "#64748b", fontWeight: 600,
                        background: "#f1f5f9", padding: "4px 12px", borderRadius: 20,
                      }}>
                        {m.text}
                      </span>
                    </div>
                  );
                  if (m.type === "separator") return (
                    <div key={i} style={{
                      textAlign: "center", margin: "20px 0 12px",
                      display: "flex", alignItems: "center", gap: 10,
                    }}>
                      <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
                      <span style={{ fontSize: 10, color: "#94a3b8", fontWeight: 600 }}>{m.date}</span>
                      <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
                    </div>
                  );
                  const isSent = m.type === "sent";
                  return (
                    <div key={i} style={{
                      display: "flex",
                      justifyContent: isSent ? "flex-end" : "flex-start",
                      marginBottom: 10,
                    }}>
                      <div style={{
                        maxWidth: "70%",
                        padding: "8px 12px",
                        borderRadius: 12,
                        borderBottomRightRadius: isSent ? 4 : 12,
                        borderBottomLeftRadius: isSent ? 12 : 4,
                        background: isSent ? "#1e293b" : "#fff",
                        color: isSent ? "#fff" : "#334155",
                        fontSize: 12,
                        lineHeight: 1.5,
                        border: isSent ? "none" : "1px solid #e2e8f0",
                      }}>
                        {m.text}
                        <div style={{
                          fontSize: 9, color: isSent ? "#94a3b8" : "#cbd5e1",
                          marginTop: 4, textAlign: "right",
                        }}>{m.time}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Message input */}
              <div style={{
                padding: "10px 16px", borderTop: "1px solid #f1f5f9",
                display: "flex", gap: 8, alignItems: "center",
              }}>
                <div style={{
                  flex: 1, padding: "10px 12px", background: "#f8fafc",
                  borderRadius: 8, border: "1px solid #e2e8f0",
                  fontSize: 12, color: "#94a3b8",
                }}>Write a message...</div>
                <div style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: "#3b82f6", display: "flex",
                  alignItems: "center", justifyContent: "center",
                  color: "#fff", fontSize: 14, cursor: "pointer",
                }}>↑</div>
              </div>
            </div>

            {/* ── RIGHT PANEL: Booking Info ── */}
            <div style={{ padding: 16, overflowY: "auto" }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: "#0f172a", marginBottom: 12 }}>Booking Details</div>

              {/* Artist/client card */}
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 14 }}>
                <WireframeBox dashed style={{ width: 48, height: 48, flexShrink: 0, borderRadius: 8 }}>
                  <div style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    height: "100%", fontSize: 20,
                  }}>{convo.avatar}</div>
                </WireframeBox>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{convo.name}</div>
                  <span style={{ fontSize: 10, color: "#3b82f6", fontWeight: 600, cursor: "pointer" }}>View profile →</span>
                </div>
              </div>

              {/* Status badge */}
              <Tag color={statusColors[convo.status].bg} textColor={statusColors[convo.status].text}>{convo.status}</Tag>

              {/* Booking details */}
              <div style={{ marginTop: 12 }}>
                {[
                  ["Date", "Sat, Mar 15, 2026"],
                  ["Time", "7:00 – 10:00 PM"],
                  ["Duration", "3 hours"],
                  ["Total", "$750.00"],
                  ["Booking ID", "OVR-2026-A7X"],
                ].map(([k, v]) => (
                  <div key={k} style={{
                    display: "flex", justifyContent: "space-between",
                    padding: "6px 0", borderBottom: "1px solid #f8fafc",
                  }}>
                    <span style={{ fontSize: 11, color: "#64748b" }}>{k}</span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#334155" }}>{v}</span>
                  </div>
                ))}
              </div>

              {/* Payment hold message */}
              <div style={{
                marginTop: 12, padding: "8px 10px", background: "#eef2ff", borderRadius: 6,
                fontSize: 10, color: "#475569", lineHeight: 1.5,
              }}>
                🔒 Payment held securely. Released to artist 24hrs after event.
              </div>

              {/* Cancellation button */}
              {convo.status === "Confirmed" && (
                <div
                  onClick={() => setShowCancelModal(true)}
                  style={{
                    marginTop: 16, padding: "10px 0", textAlign: "center",
                    background: "#fef2f2", borderRadius: 8, border: "1px solid #fecaca",
                    fontSize: 12, fontWeight: 700, color: "#dc2626", cursor: "pointer",
                  }}
                >
                  Initiate Cancellation
                </div>
              )}

              {/* Review prompt for completed */}
              {convo.status === "Completed" && (
                <div style={{
                  marginTop: 16, padding: "10px 0", textAlign: "center",
                  background: "#f0fdf4", borderRadius: 8, border: "1px solid #bbf7d0",
                  fontSize: 12, fontWeight: 700, color: "#166534", cursor: "pointer",
                }}>
                  👍 Leave a Review
                </div>
              )}

              {/* Cancelled state */}
              {convo.status === "Cancelled" && (
                <div style={{
                  marginTop: 16, padding: "8px 10px", background: "#fef2f2", borderRadius: 6,
                  fontSize: 10, color: "#dc2626", lineHeight: 1.5, textAlign: "center",
                }}>
                  This booking has been cancelled. Refunds handled by OVRTØNE admins via Stripe.
                </div>
              )}
            </div>
          </div>


        </>
      )}

      {/* ═══════════════════════════════════════════
           MOBILE: PANEL-SWITCHING LAYOUT
         ═══════════════════════════════════════════ */}
      {isMobile && (
        <>
          {/* Mobile panel tabs */}
          <div style={{
            width: containerWidth, maxWidth: "100%", marginBottom: 12,
            display: "flex", gap: 4, background: "#e2e8f0", borderRadius: 8, padding: 3,
          }}>
            {[
              ["list", "Conversations"],
              ["thread", "Thread"],
              ["info", "Booking Info"],
            ].map(([key, label]) => (
              <button key={key} onClick={() => setMobilePanel(key)} style={{
                flex: 1, padding: "8px 8px", borderRadius: 6, border: "none", cursor: "pointer",
                fontSize: 11, fontWeight: 600,
                background: mobilePanel === key ? "#fff" : "transparent",
                color: mobilePanel === key ? "#0f172a" : "#64748b",
                boxShadow: mobilePanel === key ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
              }}>{label}</button>
            ))}
          </div>

          <div style={{
            width: containerWidth, maxWidth: "100%",
            background: "#fff", borderRadius: 12,
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            border: "1px solid #e2e8f0",
            overflow: "hidden",
            minHeight: 500,
            display: "flex",
            flexDirection: "column",
          }}>
            {/* ── MOBILE: Conversation List ── */}
            {mobilePanel === "list" && (
              <div>
                <div style={{ padding: "14px 16px 10px", borderBottom: "1px solid #f1f5f9" }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: "#0f172a" }}>Messages</div>
                  <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 2 }}>
                    {conversations.filter(c => c.unread).length} unread
                  </div>
                </div>
                {conversations.map((c, i) => (
                  <div
                    key={c.id}
                    onClick={() => { setSelectedConvo(i); setMobilePanel("thread"); }}
                    style={{
                      padding: "12px 16px", borderBottom: "1px solid #f8fafc",
                      cursor: "pointer",
                      background: c.unread ? "#fefce8" : "transparent",
                    }}
                  >
                    <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: "50%", background: "#e2e8f0",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 18, flexShrink: 0,
                      }}>{c.avatar}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: 13, fontWeight: c.unread ? 800 : 600, color: "#0f172a" }}>{c.name}</span>
                          <span style={{ fontSize: 10, color: "#94a3b8" }}>{c.date}</span>
                        </div>
                        <div style={{
                          fontSize: 11, color: "#64748b", marginTop: 2,
                          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                        }}>{c.lastMsg}</div>
                        <Tag color={statusColors[c.status].bg} textColor={statusColors[c.status].text}>{c.status}</Tag>
                      </div>
                      {c.unread && (
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#3b82f6", flexShrink: 0, marginTop: 6 }} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── MOBILE: Message Thread ── */}
            {mobilePanel === "thread" && (
              <div style={{ display: "flex", flexDirection: "column", height: 500 }}>
                {/* Header with back */}
                <div style={{
                  padding: "10px 12px", borderBottom: "1px solid #f1f5f9",
                  display: "flex", alignItems: "center", gap: 10,
                }}>
                  <span onClick={() => setMobilePanel("list")} style={{ fontSize: 18, color: "#94a3b8", cursor: "pointer" }}>←</span>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%", background: "#e2e8f0",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12,
                  }}>{convo.avatar}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{convo.name}</div>
                  </div>
                  <span onClick={() => setMobilePanel("info")} style={{
                    fontSize: 10, color: "#3b82f6", fontWeight: 600, cursor: "pointer",
                  }}>View Booking</span>
                </div>

                {/* Messages */}
                <div style={{ flex: 1, padding: 12, overflowY: "auto", background: "#fafbfc" }}>
                  {messages.map((m, i) => {
                    if (m.type === "system") return (
                      <div key={i} style={{ textAlign: "center", margin: "12px 0" }}>
                        <span style={{ fontSize: 9, color: "#64748b", fontWeight: 600, background: "#f1f5f9", padding: "3px 10px", borderRadius: 20 }}>{m.text}</span>
                      </div>
                    );
                    if (m.type === "separator") return (
                      <div key={i} style={{ textAlign: "center", margin: "16px 0 8px", display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
                        <span style={{ fontSize: 9, color: "#94a3b8", fontWeight: 600 }}>{m.date}</span>
                        <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
                      </div>
                    );
                    const isSent = m.type === "sent";
                    return (
                      <div key={i} style={{ display: "flex", justifyContent: isSent ? "flex-end" : "flex-start", marginBottom: 8 }}>
                        <div style={{
                          maxWidth: "80%", padding: "7px 10px", borderRadius: 12,
                          borderBottomRightRadius: isSent ? 4 : 12,
                          borderBottomLeftRadius: isSent ? 12 : 4,
                          background: isSent ? "#1e293b" : "#fff",
                          color: isSent ? "#fff" : "#334155",
                          fontSize: 12, lineHeight: 1.5,
                          border: isSent ? "none" : "1px solid #e2e8f0",
                        }}>
                          {m.text}
                          <div style={{ fontSize: 9, color: isSent ? "#94a3b8" : "#cbd5e1", marginTop: 3, textAlign: "right" }}>{m.time}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Input */}
                <div style={{ padding: "8px 12px", borderTop: "1px solid #f1f5f9", display: "flex", gap: 8, alignItems: "center" }}>
                  <div style={{ flex: 1, padding: "10px 12px", background: "#f8fafc", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12, color: "#94a3b8" }}>Write a message...</div>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14, cursor: "pointer" }}>↑</div>
                </div>
              </div>
            )}

            {/* ── MOBILE: Booking Info ── */}
            {mobilePanel === "info" && (
              <div style={{ padding: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <span onClick={() => setMobilePanel("thread")} style={{ fontSize: 18, color: "#94a3b8", cursor: "pointer" }}>←</span>
                  <span style={{ fontSize: 14, fontWeight: 800, color: "#0f172a" }}>Booking Details</span>
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 14 }}>
                  <WireframeBox dashed style={{ width: 56, height: 56, flexShrink: 0, borderRadius: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", fontSize: 24 }}>{convo.avatar}</div>
                  </WireframeBox>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>{convo.name}</div>
                    <Tag color={statusColors[convo.status].bg} textColor={statusColors[convo.status].text}>{convo.status}</Tag>
                  </div>
                </div>
                {[
                  ["Date", "Sat, Mar 15, 2026"],
                  ["Time", "7:00 – 10:00 PM"],
                  ["Duration", "3 hours"],
                  ["Total", "$750.00"],
                  ["Booking ID", "OVR-2026-A7X"],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f1f5f9" }}>
                    <span style={{ fontSize: 12, color: "#64748b" }}>{k}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#334155" }}>{v}</span>
                  </div>
                ))}
                <div style={{ marginTop: 14, padding: "8px 10px", background: "#eef2ff", borderRadius: 6, fontSize: 10, color: "#475569", lineHeight: 1.5 }}>
                  🔒 Payment held securely. Released to artist 24hrs after event.
                </div>
                {convo.status === "Confirmed" && (
                  <div onClick={() => setShowCancelModal(true)} style={{
                    marginTop: 16, padding: "12px 0", textAlign: "center",
                    background: "#fef2f2", borderRadius: 8, border: "1px solid #fecaca",
                    fontSize: 13, fontWeight: 700, color: "#dc2626", cursor: "pointer",
                  }}>Initiate Cancellation</div>
                )}
              </div>
            )}
          </div>


        </>
      )}

      {/* ═══════════════════════════════════════════
           CANCELLATION MODAL (overlay)
         ═══════════════════════════════════════════ */}
      {showCancelModal && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 100, padding: 20,
        }}>
          <div style={{
            background: "#fff", borderRadius: 12, padding: 24,
            maxWidth: 400, width: "100%",
            boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
          }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#0f172a", marginBottom: 8 }}>
              Cancel this booking?
            </div>
            <div style={{ fontSize: 12, color: "#64748b", lineHeight: 1.6, marginBottom: 6 }}>
              Are you sure you want to cancel your booking with <strong>The Blue Note Trio</strong> on <strong>Sat, Mar 15</strong>?
            </div>
            <div style={{
              padding: "8px 10px", background: "#fffbeb", borderRadius: 6, border: "1px solid #fde68a",
              fontSize: 11, color: "#92400e", lineHeight: 1.5, marginBottom: 16,
            }}>
              Cancellation policy applies. Refund amount depends on how far in advance you cancel. <span style={{ color: "#3b82f6", fontWeight: 600, cursor: "pointer" }}>View cancellation policy →</span>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <div onClick={() => setShowCancelModal(false)} style={{
                flex: 1, padding: "10px 0", textAlign: "center", borderRadius: 8,
                border: "1.5px solid #cbd5e1", fontSize: 13, fontWeight: 600, color: "#334155", cursor: "pointer",
              }}>Keep Booking</div>
              <div onClick={() => setShowCancelModal(false)} style={{
                flex: 1, padding: "10px 0", textAlign: "center", borderRadius: 8,
                background: "#dc2626", fontSize: 13, fontWeight: 700, color: "#fff", cursor: "pointer",
              }}>Confirm Cancel</div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════
           ANNOTATION SECTIONS (below wireframe)
         ═══════════════════════════════════════════ */}
      <div style={{
        width: Math.min(containerWidth, 960), maxWidth: "100%",
        background: "#fff", borderRadius: 12, padding: isMobile ? 16 : 28,
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        border: "1px solid #e2e8f0",
        marginTop: 20,
      }}>

        {/* ── 2. CONVERSATION LIST DETAILS ── */}
        <SectionLabel number="2">Conversation List Details</SectionLabel>
        <WireframeBox style={{ padding: 14 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>Per Conversation Row (Q3)</div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 8 }}>
            {[
              ["Other party's name", "Artist name for clients, client name for artists"],
              ["Profile thumbnail", "Avatar/image of the other party"],
              ["Last message preview", "Truncated to single line with ellipsis"],
              ["Last message date", "Relative or absolute date"],
              ["Read / unread indicator", "Bold text + blue dot + highlighted bg (Q4)"],
              ["Booking status tag", "Confirmed / Completed / Cancelled"],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", gap: 6, padding: "4px 0" }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#334155" }}>•</span>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#334155" }}>{k}</div>
                  <div style={{ fontSize: 10, color: "#94a3b8" }}>{v}</div>
                </div>
              </div>
            ))}
          </div>
        </WireframeBox>

        {/* ── 3. EMPTY STATES ── */}
        <SectionLabel number="3">Empty States</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 10 }}>
          <WireframeBox style={{ padding: 16, textAlign: "center" }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>🎵</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#334155" }}>No bookings yet</div>
            <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 4, lineHeight: 1.5 }}>
              Browse artists to get started. Your conversations will appear here once you book an artist.
            </div>
            <div style={{
              marginTop: 12, padding: "8px 20px", background: "#3b82f6", borderRadius: 8,
              color: "#fff", fontSize: 12, fontWeight: 700, display: "inline-block",
            }}>Browse Artists</div>
            <div style={{ fontSize: 9, color: "#cbd5e1", marginTop: 8 }}>Client empty state</div>
          </WireframeBox>
          <WireframeBox style={{ padding: 16, textAlign: "center" }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>🎤</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#334155" }}>No bookings yet</div>
            <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 4, lineHeight: 1.5 }}>
              Your conversations will appear here once a client books you. Make sure your profile is complete!
            </div>
            <div style={{
              marginTop: 12, padding: "8px 20px", background: "#f1f5f9", borderRadius: 8,
              color: "#334155", fontSize: 12, fontWeight: 600, display: "inline-block",
              border: "1.5px solid #cbd5e1",
            }}>Edit Profile</div>
            <div style={{ fontSize: 9, color: "#cbd5e1", marginTop: 8 }}>Artist empty state</div>
          </WireframeBox>
        </div>

        {/* ── 4. SYSTEM MESSAGES ── */}
        <SectionLabel number="4">System Messages</SectionLabel>
        <WireframeBox style={{ padding: 14 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 10 }}>In-Thread System Messages (Q15)</div>
          {[
            ["Booking confirmed", "Booking confirmed — Sat, Mar 15, 2026, 7:00–10:00 PM"],
            ["Cancellation requested", "Cancellation requested by Gabriel Y."],
            ["Cancellation completed", "Booking cancelled. Refund processing may take 5–10 business days."],
          ].map(([type, example]) => (
            <div key={type} style={{ textAlign: "center", margin: "8px 0" }}>
              <span style={{
                fontSize: 10, color: "#64748b", fontWeight: 600,
                background: "#f1f5f9", padding: "4px 14px", borderRadius: 20,
                display: "inline-block",
              }}>{example}</span>
              <div style={{ fontSize: 9, color: "#cbd5e1", marginTop: 2 }}>{type}</div>
            </div>
          ))}
        </WireframeBox>

        {/* ── 5. BOOKING STATUS LIFECYCLE ── */}
        <SectionLabel number="5">Booking Status Lifecycle</SectionLabel>
        <WireframeBox style={{ padding: 14 }}>
          <div style={{ display: "flex", gap: isMobile ? 8 : 16, flexDirection: isMobile ? "column" : "row" }}>
            {[
              { status: "Confirmed", desc: "Booking active, event upcoming", actions: "Send messages, Initiate Cancellation" },
              { status: "Completed", desc: "Event date has passed (24+ hrs)", actions: "Send messages, Leave review (👍/👎)" },
              { status: "Cancelled", desc: "Cancellation processed", actions: "View messages (read-only only)" },
            ].map(s => (
              <div key={s.status} style={{ flex: 1, padding: 10, background: "#f8fafc", borderRadius: 8, border: "1px solid #f1f5f9" }}>
                <Tag color={statusColors[s.status].bg} textColor={statusColors[s.status].text}>{s.status}</Tag>
                <div style={{ fontSize: 11, color: "#475569", marginTop: 6, lineHeight: 1.5 }}>{s.desc}</div>
                <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 4 }}>Actions: {s.actions}</div>
              </div>
            ))}
          </div>
        </WireframeBox>

        {/* ── 6. CANCELLATION FLOW ── */}
        <SectionLabel number="6">Cancellation Flow</SectionLabel>
        <WireframeBox style={{ padding: 14 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>Cancellation Sequence (Q19–Q23)</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, alignItems: "center" }}>
            {[
              'Click "Initiate Cancellation"',
              "Confirmation modal appears",
              "User confirms",
              "Status → Cancelled",
              "System message in thread",
              "Email to other party",
              "Button hidden",
              "Refund via Stripe admin",
            ].map((step, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <Tag>{step}</Tag>
                {i < 7 && <span style={{ fontSize: 10, color: "#cbd5e1" }}>→</span>}
              </div>
            ))}
          </div>
        </WireframeBox>

        {/* ── 7. EMAIL NOTIFICATIONS ── */}
        <SectionLabel number="7">Email Notifications</SectionLabel>
        <WireframeBox style={{ padding: 14 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>Notification Triggers (Q24)</div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 6 }}>
            {[
              ["📩 New message received", "Sent to recipient"],
              ["✅ Booking confirmed", "Sent to both parties"],
              ["⚠️ Cancellation requested", "Sent to other party"],
              ["❌ Cancellation completed", "Sent to both parties"],
            ].map(([trigger, detail]) => (
              <div key={trigger} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: "1px solid #f8fafc" }}>
                <span style={{ fontSize: 11, color: "#334155" }}>{trigger}</span>
                <span style={{ fontSize: 10, color: "#94a3b8" }}>{detail}</span>
              </div>
            ))}
          </div>
        </WireframeBox>
      </div>
    </div>
  );
}
