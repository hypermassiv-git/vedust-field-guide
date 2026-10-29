import type { Metadata } from "next";
import { Cinzel, Quicksand } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Disclaimer } from "@/components/Disclaimer";
import "./globals.css";

const quicksand = Quicksand({ subsets: ["latin"], variable: "--font-quicksand" });
const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-cinzel" });

const TITLE = "The veDUST Field Guide";
const DESCRIPTION = "Every veDUST character, frame, Legendary path and Character Magic item, explained simply.";

export const metadata: Metadata = {
  title: { default: TITLE, template: `%s | ${TITLE}` },
  description: DESCRIPTION,
  openGraph: { type: "website", siteName: TITLE, title: TITLE, description: DESCRIPTION },
  twitter: { card: "summary", title: TITLE, description: DESCRIPTION },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${quicksand.variable} ${cinzel.variable}`}>
      {/* Browser extensions (e.g. ColorZilla) add attributes to <body> before React loads. */}
      <body className="font-sans antialiased" suppressHydrationWarning>
        <div className="relative isolate overflow-x-clip pb-24 md:pb-0">
          <Nav />
          {children}
          <Disclaimer />
        </div>
      </body>
    </html>
  );
}
