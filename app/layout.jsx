import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Impulse Theme — Dune | Warm, earthy essentials",
  description:
    "Soft texture, effortless movement — warm-weather pieces designed to be worn on repeat.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
