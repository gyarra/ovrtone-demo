import Header from "./components/Header";
import Footer from "./components/Footer";
import { FONT } from "./components/constants";

export const metadata = {
  title: "Ovrtone - ReverbNation",
};

export default function ReverbNationLayout({ children }) {
  return (
    <div className="text-base text-[rgb(51,51,51)] bg-[#edf0f1]" style={{ fontFamily: FONT }}>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
