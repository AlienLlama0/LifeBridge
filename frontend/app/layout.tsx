import type { Metadata } from "next";
import { Baloo_Da_2, Hind_Siliguri, Roboto_Mono } from "next/font/google";
import { AuthProvider } from "@/lib/auth-context";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EmergencyButton from "@/components/EmergencyButton";

const baloo = Baloo_Da_2({
  subsets: ["bengali", "latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-baloo",
});

const hind = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
  title: "লাইফব্রিজ | এই মুহূর্তে খালি বেড ও আইসিইউ খুঁজুন",
  description:
    "সংকটের সময় দ্রুত জানুন কোন হাসপাতালে এখন বেড, আইসিইউ বা ভেন্টিলেটর খালি আছে।",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className={`${baloo.variable} ${hind.variable} ${robotoMono.variable}`}>
      <body className="font-body bg-canvas text-ink min-h-screen flex flex-col">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <EmergencyButton floating />
        </AuthProvider>
      </body>
    </html>
  );
}
