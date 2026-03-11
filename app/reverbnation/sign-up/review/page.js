import Link from "next/link";

const SECTIONS = [
  { title: "Account", step: "/reverbnation/sign-up", fields: ["Name", "Email"] },
  { title: "Artist Identity", step: "/reverbnation/sign-up/identity", fields: ["Band name", "Genre", "Location", "Tagline", "About"] },
  { title: "Media", step: "/reverbnation/sign-up/media", fields: ["Profile photo", "Cover photo", "Videos", "Gallery"] },
  { title: "Pricing & Gigs", step: "/reverbnation/sign-up/pricing", fields: ["Hourly rate", "Event types", "Gig requirements"] },
  { title: "Set Lists", step: "/reverbnation/sign-up/set-lists", fields: ["Set list names", "Songs"] },
  { title: "Availability", step: "/reverbnation/sign-up/availability", fields: ["Calendar dates"] },
];

export default function ReviewStep() {
  return (
    <div>
      <p className="rn-body-text mb-6">
        Review your profile before publishing. You can jump back to any section to make changes.
      </p>

      <div className="space-y-3 mb-8">
        {SECTIONS.map((s) => (
          <div
            key={s.title}
            className="flex items-center justify-between p-4 rounded"
            style={{ border: "1px solid var(--rn-section-border)" }}
          >
            <div>
              <div className="text-[14px] font-bold" style={{ color: "var(--rn-slate-700)" }}>
                {s.title}
              </div>
              <div className="text-[12px] mt-0.5" style={{ color: "var(--rn-slate-400)" }}>
                {s.fields.join(" · ")}
              </div>
            </div>
            <Link
              href={s.step}
              className="text-[12px] font-semibold px-3 py-1 rounded"
              style={{ color: "var(--rn-blue)", border: "1px solid var(--rn-blue)" }}
            >
              Edit
            </Link>
          </div>
        ))}
      </div>

      {/* Stripe Connect */}
      <div
        className="p-5 rounded mb-6"
        style={{ background: "var(--rn-slate-50)", border: "1px solid var(--rn-section-border)" }}
      >
        <h3 className="text-[14px] font-bold mb-1" style={{ color: "var(--rn-slate-700)" }}>
          Connect Stripe for Payments
        </h3>
        <p className="text-[13px] mb-3" style={{ color: "var(--rn-slate-500)" }}>
          To receive booking payments, connect a Stripe account. You can do this later from your dashboard.
        </p>
        <button
          className="px-4 py-2 rounded text-[13px] font-semibold cursor-pointer"
          style={{ background: "#635bff", color: "#fff", border: "none" }}
        >
          Connect with Stripe
        </button>
      </div>

      {/* Publish */}
      <button
        className="rn-btn-blue w-full py-3 text-[15px] font-bold cursor-pointer"
      >
        Publish Profile
      </button>
      <p className="text-center text-[12px] mt-2" style={{ color: "var(--rn-slate-400)" }}>
        You can edit everything after publishing.
      </p>
    </div>
  );
}
