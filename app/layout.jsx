import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Providers from "./providers";

export const metadata = {
  title: "Impulse Theme — Dune | Warm, earthy essentials",
  description:
    "Soft texture, effortless movement — warm-weather pieces designed to be worn on repeat.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
