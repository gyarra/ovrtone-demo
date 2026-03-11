import { C } from "./constants";

export function Avatar({ size = 40, color = "#ccc" }) {
  return (
    <div
      className="rounded-full flex-shrink-0"
      style={{ width: size, height: size, backgroundColor: color }}
    />
  );
}

export function PlaceholderImg({ w, h, className = "", style = {} }) {
  return (
    <div
      className={`bg-gray-300 ${className}`}
      style={{ width: w, height: h, minHeight: h, ...style }}
    />
  );
}

export function WaveformBar() {
  /* Use a seeded pattern instead of Math.random() to avoid hydration mismatches */
  const heights = [12, 28, 8, 22, 16, 30, 10, 24, 18, 26, 14, 20, 6, 28, 12, 24, 18, 30, 8, 22, 16, 26, 10, 20, 14, 28, 6, 24, 18, 30, 12, 22, 8, 26, 16, 20, 14, 28, 10, 24];
  return (
    <div className="flex items-end gap-[2px] h-[30px]">
      {heights.map((h, i) => (
        <div
          key={i}
          className="w-[3px] rounded-sm"
          style={{ height: h, backgroundColor: i < 12 ? "var(--rn-blue)" : "#ccc" }}
        />
      ))}
    </div>
  );
}

export function ContentBox({ children, className = "", style = {} }) {
  return (
    <div
      className={`px-4 py-5 md:p-8 ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
