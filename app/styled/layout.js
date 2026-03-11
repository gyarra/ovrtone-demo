import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata = {
  title: "Ovrtone - Styled Demo",
};

export default function StyledDemoLayout({ children }) {
  return (
    <div className="min-h-screen bg-[var(--rn-page-bg)]" style={{ fontFamily: "var(--rn-font)" }}>
      <div className="max-w-[1200px] mx-auto text-base text-[var(--rn-text-primary)]">
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  );
}
