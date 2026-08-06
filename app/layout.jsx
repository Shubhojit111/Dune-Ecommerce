import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Impulse Theme — Dune | Warm, earthy essentials",
  description:
    "Soft texture, effortless movement — warm-weather pieces designed to be worn on repeat.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
