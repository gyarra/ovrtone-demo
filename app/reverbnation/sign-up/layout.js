"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const STEPS = [
  { id: 1, name: "Account", path: "/reverbnation/sign-up" },
  { id: 2, name: "Identity", path: "/reverbnation/sign-up/identity" },
  { id: 3, name: "Media", path: "/reverbnation/sign-up/media" },
  { id: 4, name: "Pricing", path: "/reverbnation/sign-up/pricing" },
  { id: 5, name: "Set Lists", path: "/reverbnation/sign-up/set-lists" },
];

function ProgressBar({ currentIdx }) {
  return (
    <div className="flex items-center gap-1 mb-6 overflow-x-auto pb-2">
      {STEPS.map((s, i) => {
        const isActive = i === currentIdx;
        const isDone = i < currentIdx;
        return (
          <div key={s.id} className="flex items-center flex-shrink-0">
            <Link
              href={s.path}
              className="flex flex-col items-center gap-1 no-underline"
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold"
                style={{
                  backgroundColor: isActive
                    ? "var(--rn-blue)"
                    : isDone
                    ? "var(--rn-blue)"
                    : "var(--rn-slate-100)",
                  color: isActive || isDone ? "#fff" : "var(--rn-slate-500)",
                  border: isActive
                    ? "2px solid var(--rn-blue)"
                    : isDone
                    ? "2px solid var(--rn-blue)"
                    : "2px solid var(--rn-slate-300)",
                }}
              >
                {isDone ? "✓" : s.id}
              </div>
              <span
                className="text-[9px] font-semibold text-center max-w-[60px] leading-tight hidden md:block"
                style={{
                  color: isActive
                    ? "var(--rn-blue)"
                    : isDone
                    ? "var(--rn-blue)"
                    : "var(--rn-slate-400)",
                }}
              >
                {s.name}
              </span>
            </Link>
            {i < STEPS.length - 1 && (
              <div
                className="w-4 md:w-8 h-[2px] mx-1"
                style={{
                  backgroundColor: i < currentIdx ? "var(--rn-blue)" : "var(--rn-slate-200, #e2e8f0)",
                  marginBottom: 16,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function NavButtons({ currentIdx }) {
  const isFirst = currentIdx === 0;
  const isLast = currentIdx === STEPS.length - 1;
  const prevPath = isFirst ? null : STEPS[currentIdx - 1].path;
  const nextPath = isLast ? null : STEPS[currentIdx + 1].path;

  return (
    <div
      className="flex justify-between items-center mt-6 pt-4"
      style={{ borderTop: "1px solid var(--rn-slate-100)" }}
    >
      {prevPath ? (
        <Link href={prevPath} className="rn-btn-back no-underline">
          ← Back
        </Link>
      ) : (
        <span />
      )}
      {nextPath ? (
        <Link href={nextPath} className="rn-btn-blue no-underline">
          Next →
        </Link>
      ) : (
        <Link href="/reverbnation/artists/ben-hazlewood" className="rn-btn-blue no-underline">
          View Profile →
        </Link>
      )}
    </div>
  );
}

export default function SignUpLayout({ children }) {
  const pathname = usePathname();
  const currentIdx = STEPS.findIndex((s) => s.path === pathname);
  const step = STEPS[currentIdx] || STEPS[0];

  return (
    <div className="bg-white">
      <div className="mx-auto px-4 md:px-9 py-6 md:py-10 max-w-[800px]">
        {/* Step header */}
        <div className="mb-2">
          <div className="rn-sub-label mb-1">
            Step {step.id} of {STEPS.length}
          </div>
          <h1 className="rn-section-heading text-[22px] md:text-[28px] mb-4">
            {step.name}
          </h1>
        </div>

        <ProgressBar currentIdx={currentIdx >= 0 ? currentIdx : 0} />

        {/* Step content */}
        {children}

        {/* Navigation */}
        <NavButtons currentIdx={currentIdx >= 0 ? currentIdx : 0} />
      </div>
    </div>
  );
}
