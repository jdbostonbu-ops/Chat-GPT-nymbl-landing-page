import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nymbl | Marketing Automation for Busy Owners",
  description: "Nymbl automates marketing systems for owner-operators who are too busy running the business to market it.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
