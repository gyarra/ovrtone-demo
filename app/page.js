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
        Where performance meets resonance.
      </p>

      <nav className="mt-8 flex gap-16">
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-xs font-semibold tracking-widest uppercase text-white/30">Original Mocks</h2>
          {[
            { href: "/artists", label: "Artist Search" },
            { href: "/artists/band-1", label: "Artist Profile" },
            { href: "/booking", label: "Booking" },
            { href: "/messages", label: "Messages" },
            { href: "/artist_sign_up", label: "Artist Sign-Up" },
            { href: "/client-profile-1", label: "Client Profile" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-white/50 hover:text-white transition-colors underline underline-offset-2"
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col items-center gap-2">
          <h2 className="text-xs font-semibold tracking-widest uppercase text-white/30">Styled Mocks</h2>
          {[
            { href: "/styled/artists", label: "Artist Search" },
            { href: "/styled/artists/ben-hazlewood", label: "Artist Profile" },
            { href: "/styled/sign-up", label: "Artist Sign-Up" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-white/50 hover:text-white transition-colors underline underline-offset-2"
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
