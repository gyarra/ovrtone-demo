"use client";

import { useState } from "react";
import { AvailabilityCalendar } from "../../components/shared";

export default function AvailabilityStep() {
  const [available, setAvailable] = useState([1, 2, 6, 7, 8, 13, 14, 15, 20, 21, 22, 27, 28, 29]);

  const toggleDay = (day) => {
    setAvailable((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <div>
      <p className="rn-body-text mb-4">
        Mark your available dates. If you skip this step, all future dates will be treated as available.
      </p>

      <div className="p-4 rounded mb-4" style={{ border: "1px solid var(--rn-section-border)" }}>
        <AvailabilityCalendar availableDays={available} />
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => {
            const weekdays = Array.from({ length: 30 }, (_, i) => i + 1).filter((d) => {
              const dayOfWeek = (d + 5) % 7;
              return dayOfWeek >= 1 && dayOfWeek <= 5;
            });
            setAvailable(weekdays);
          }}
          className="text-[12px] font-semibold cursor-pointer px-3 py-1.5 rounded"
          style={{ border: "1px solid var(--rn-section-border)", color: "var(--rn-slate-600)", background: "var(--rn-white)" }}
        >
          Weekdays only
        </button>
        <button
          onClick={() => {
            const weekends = Array.from({ length: 30 }, (_, i) => i + 1).filter((d) => {
              const dayOfWeek = (d + 5) % 7;
              return dayOfWeek === 0 || dayOfWeek === 6;
            });
            setAvailable(weekends);
          }}
          className="text-[12px] font-semibold cursor-pointer px-3 py-1.5 rounded"
          style={{ border: "1px solid var(--rn-section-border)", color: "var(--rn-slate-600)", background: "var(--rn-white)" }}
        >
          Weekends only
        </button>
        <button
          onClick={() => setAvailable(Array.from({ length: 30 }, (_, i) => i + 1))}
          className="text-[12px] font-semibold cursor-pointer px-3 py-1.5 rounded"
          style={{ border: "1px solid var(--rn-section-border)", color: "var(--rn-slate-600)", background: "var(--rn-white)" }}
        >
          All available
        </button>
        <button
          onClick={() => setAvailable([])}
          className="text-[12px] font-semibold cursor-pointer px-3 py-1.5 rounded"
          style={{ border: "1px solid var(--rn-section-border)", color: "var(--rn-slate-600)", background: "var(--rn-white)" }}
        >
          Clear all
        </button>
      </div>
    </div>
  );
}
