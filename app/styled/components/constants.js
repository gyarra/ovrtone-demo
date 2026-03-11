/* ─── palette & tokens ──── */
/* Canonical values live in the CSS file as --rn-* custom properties.
   This JS mirror is kept for inline styles that can't use CSS vars. */
export const C = {
  black: "var(--rn-black)",
  sidebarBg: "var(--rn-sidebar-bg)",
  coverBg: "var(--rn-sidebar-bg)",
  white: "var(--rn-white)",
  pageBg: "var(--rn-page-bg)",
  contentBg: "var(--rn-content-bg)",
  textPrimary: "var(--rn-text-primary)",
  textSecondary: "var(--rn-text-secondary)",
  textMuted: "var(--rn-text-muted)",
  blue: "var(--rn-blue)",
  blueBtnBg: "var(--rn-blue-btn)",
  blueBtnBorder: "var(--rn-blue-btn-border)",
  fan: "var(--rn-fan)",
  border: "var(--rn-border)",
  sectionBorder: "var(--rn-section-border)",
};

export const FONT = "var(--rn-font)";

export const NAV_ITEMS = ["Features", "Discover", "Crowd Picks", "Charts", "Opportunities", "Distribution", "Pricing"];

export const FOOTER_LINKS = {
  Ovrtone: ["Blog", "Careers", "Need Help?"],
  Policies: ["Terms & Conditions", "Privacy", "Refunds"],
};
