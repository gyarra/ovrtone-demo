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
  return (
    <div className="flex items-end gap-[2px] h-[30px]">
      {Array.from({ length: 40 }).map((_, i) => {
        const h = 6 + Math.floor(Math.random() * 24);
        return (
          <div
            key={i}
            className="w-[3px] rounded-sm"
            style={{ height: h, backgroundColor: i < 12 ? C.blue : "#ccc" }}
          />
        );
      })}
    </div>
  );
}

export function ContentBox({ children, className = "", style = {} }) {
  return (
    <div
      className={className}
      style={{
        padding: 32,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
