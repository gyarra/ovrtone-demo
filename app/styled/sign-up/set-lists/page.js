"use client";

import { useState } from "react";

const EMPTY_SET = { name: "", duration: "60 minutes", songs: "" };

export default function SetListsStep() {
  const [setLists, setSetLists] = useState([{ ...EMPTY_SET }]);

  const update = (idx, field, value) => {
    setSetLists((prev) => prev.map((s, i) => (i === idx ? { ...s, [field]: value } : s)));
  };

  const remove = (idx) => setSetLists((prev) => prev.filter((_, i) => i !== idx));

  return (
    <div>
      <p className="rn-body-text mb-4">
        Named set lists help clients understand your range. You can skip this and add them later.
      </p>

      {setLists.map((sl, idx) => (
        <div
          key={idx}
          className="mb-4 p-4 rounded"
          style={{ border: "1px solid var(--rn-section-border)" }}
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-[13px] font-bold" style={{ color: "var(--rn-slate-700)" }}>
              Set List {idx + 1}
            </span>
            {setLists.length > 1 && (
              <button
                onClick={() => remove(idx)}
                className="text-[12px] cursor-pointer"
                style={{ color: "var(--rn-slate-400)" }}
              >
                Remove
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <div>
              <label className="rn-field-label block">Set List Name</label>
              <input
                className="rn-field-input"
                placeholder="e.g. Cocktail Hour Set"
                value={sl.name}
                onChange={(e) => update(idx, "name", e.target.value)}
              />
            </div>
            <div>
              <label className="rn-field-label block">Duration</label>
              <select
                className="rn-field-input"
                value={sl.duration}
                onChange={(e) => update(idx, "duration", e.target.value)}
              >
                <option>30 minutes</option>
                <option>45 minutes</option>
                <option>60 minutes</option>
                <option>90 minutes</option>
                <option>2 hours</option>
                <option>3+ hours</option>
              </select>
            </div>
          </div>

          <div>
            <label className="rn-field-label block">Songs (one per line)</label>
            <textarea
              className="rn-textarea"
              rows={4}
              placeholder={"Fly Me to the Moon\nThe Way You Look Tonight\nCome Fly with Me"}
              value={sl.songs}
              onChange={(e) => update(idx, "songs", e.target.value)}
            />
          </div>
        </div>
      ))}

      {setLists.length < 5 && (
        <button
          onClick={() => setSetLists([...setLists, { ...EMPTY_SET }])}
          className="w-full py-3 rounded text-[13px] font-semibold cursor-pointer transition-colors"
          style={{
            border: "2px dashed var(--rn-section-border)",
            color: "var(--rn-slate-500)",
            background: "transparent",
          }}
        >
          + Add another set list
        </button>
      )}
    </div>
  );
}
