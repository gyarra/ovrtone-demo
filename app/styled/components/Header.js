import Link from "next/link";

export default function Header() {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[4003] bg-black h-[55px]">
        <div className="max-w-[1200px] mx-auto flex items-center h-full px-4 gap-4">
          <Link href="/" className="flex items-center flex-shrink-0 no-underline">
            <span className="text-[22px] font-bold tracking-tight"><span className="text-[var(--rn-blue)]">Ø</span><span className="text-white">vrtone</span></span>
          </Link>

          <div className="ml-auto flex items-center gap-3">
            <span className="text-[16px] text-white cursor-pointer">Log In</span>
            <button className="rn-btn-blue text-[16px]">
              Join
            </button>
          </div>
        </div>
      </header>
      <div className="h-[55px]" />
    </>
  );
}
