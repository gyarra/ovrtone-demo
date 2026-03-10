"use client";

import { useState } from "react";
import { C, FOOTER_LINKS } from "./constants";

export default function Footer() {

  return (
    <footer className="border-t border-[#ddd]" style={{ backgroundColor: C.pageBg }}>
      <div className="max-w-[1200px] mx-auto px-6 py-8">
        <div className="flex justify-between">
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
        <p className="text-[12px] text-[#999]">{"\u00A9"} 2026 Ovrtone LLC</p>
        <p className="text-[11px] text-[#bbb] mt-1">
          All third party trademarks are the property of the respective trademark owners. Ovrtone is not affiliated with trademark owners.
        </p>
      </div>
    </footer>
  );
}
