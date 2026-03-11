"use client";

import { useState } from "react";

export default function MediaStep() {
  const [videoUrls, setVideoUrls] = useState([""]);

  return (
    <div>
      {/* Profile Photo */}
      <div className="mb-6">
        <label className="rn-field-label block mb-2">Profile Photo *</label>
        <div className="rn-upload-zone">
          <div className="text-[28px] opacity-40 mb-2">📷</div>
          <div className="text-[13px] mb-2" style={{ color: "var(--rn-slate-500)" }}>
            Square avatar / thumbnail
          </div>
          <div className="text-[11px]" style={{ color: "var(--rn-slate-400)" }}>
            JPG, PNG, or WebP · Max 5 MB
          </div>
          <button className="rn-btn-back mt-3 text-[12px] px-4 py-1.5">Browse files</button>
        </div>
      </div>

      {/* Cover Photo */}
      <div className="mb-6">
        <label className="rn-field-label block mb-2">
          Cover Photo <span className="font-normal" style={{ color: "var(--rn-slate-400)" }}>(optional)</span>
        </label>
        <div className="rn-upload-zone">
          <div className="text-[28px] opacity-40 mb-2">🖼</div>
          <div className="text-[13px] mb-2" style={{ color: "var(--rn-slate-500)" }}>
            Wide banner image (recommended 1200×400)
          </div>
          <div className="text-[11px]" style={{ color: "var(--rn-slate-400)" }}>
            JPG, PNG, or WebP · Max 10 MB
          </div>
          <button className="rn-btn-back mt-3 text-[12px] px-4 py-1.5">Browse files</button>
        </div>
      </div>

      {/* Videos */}
      <div className="mb-6">
        <label className="rn-field-label block mb-2">Videos (YouTube URLs)</label>
        {videoUrls.map((url, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              className="rn-field-input"
              placeholder="https://youtube.com/watch?v=..."
              value={url}
              onChange={(e) => {
                const next = [...videoUrls];
                next[i] = e.target.value;
                setVideoUrls(next);
              }}
            />
            {videoUrls.length > 1 && (
              <button
                onClick={() => setVideoUrls(videoUrls.filter((_, j) => j !== i))}
                className="text-[18px] px-2 cursor-pointer"
                style={{ color: "var(--rn-slate-400)" }}
              >
                ×
              </button>
            )}
          </div>
        ))}
        {videoUrls.length < 5 && (
          <button
            onClick={() => setVideoUrls([...videoUrls, ""])}
            className="text-[13px] font-semibold cursor-pointer mt-1"
            style={{ color: "var(--rn-blue)" }}
          >
            + Add another video
          </button>
        )}
      </div>

      {/* Additional Photos */}
      <div>
        <label className="rn-field-label block mb-2">
          Additional Photos <span className="font-normal" style={{ color: "var(--rn-slate-400)" }}>(up to 12)</span>
        </label>
        <div className="rn-upload-zone">
          <div className="text-[28px] opacity-40 mb-2">📁</div>
          <div className="text-[13px] mb-2" style={{ color: "var(--rn-slate-500)" }}>
            Drag & drop or browse files
          </div>
          <div className="text-[11px]" style={{ color: "var(--rn-slate-400)" }}>
            JPG, PNG, or WebP · Max 10 MB each · Auto-compressed
          </div>
          <button className="rn-btn-back mt-3 text-[12px] px-4 py-1.5">Browse files</button>
        </div>
      </div>
    </div>
  );
}
