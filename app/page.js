import Link from "next/link";

export const metadata = {
  title: "Ovrtone - Home",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold tracking-tight">
        OVRTØNE
      </h1>
      <p className="text-lg text-white/60 tracking-wide">
        where performance meets resonance.
      </p>
      <Link
        href="/artists"
        className="mt-6 px-8 py-3 border border-white/30 rounded-lg text-sm font-semibold tracking-widest uppercase hover:bg-white hover:text-black transition-colors"
      >
        Search
      </Link>
    </div>
  );
}
