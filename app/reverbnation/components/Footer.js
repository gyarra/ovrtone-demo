"use client";

import { useState } from "react";
import { C, FOOTER_LINKS, FOOTER_TABS } from "./constants";

export default function Footer() {
  const [footerTab, setFooterTab] = useState("Artists");

  return (
    <footer className="border-t border-[#ddd]" style={{ backgroundColor: C.pageBg }}>
      <div className="max-w-[1200px] mx-auto px-6 pt-6">
        <div className="flex items-center gap-6 border-b border-[#ddd] pb-0">
          <span className="text-[14px] font-bold text-[#333] pb-3">Tools For:</span>
          {FOOTER_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setFooterTab(tab)}
              className="pb-3 text-[14px] cursor-pointer"
              style={{
                color: footerTab === tab ? C.textPrimary : C.textMuted,
                borderBottom: footerTab === tab ? "2px solid #333" : "2px solid transparent",
                fontWeight: footerTab === tab ? 600 : 400,
                marginBottom: -1,
              }}
            >
              {tab}
            </button>
          ))}

          <div className="ml-auto flex gap-2">
            {[
              { label: "BLOG", bg: "#ff5722" },
              { label: "f", bg: "#3b5998" },
              { label: "X", bg: "#1da1f2" },
              { label: "YT", bg: "#ff0000" },
              { label: "IG", bg: "#c13584" },
              { label: "P", bg: "#bd081c" },
            ].map((icon, i) => (
              <div
                key={i}
                className="w-[28px] h-[28px] rounded flex items-center justify-center text-white text-[11px] font-bold cursor-pointer"
                style={{ backgroundColor: icon.bg }}
              >
                {icon.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-8">
        <div className="grid grid-cols-5 gap-6">
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h6 className="text-[16px] font-bold text-black mb-3">{heading}</h6>
              <ul className="space-y-1.5">
                {links.map((link) => (
                  <li key={link}>
                    <span className="text-[13px] text-[#666] cursor-pointer hover:underline">{link}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-[#ddd] py-4 text-center">
        <p className="text-[12px] text-[#999]">{"\u00A9"} 2006-2026 BandLab Singapore Pte. Ltd.</p>
        <p className="text-[11px] text-[#bbb] mt-1">
          All third party trademarks are the property of the respective trademark owners. Ovrtone is not affiliated with those trademark owners.
        </p>
      </div>
    </footer>
  );
}
