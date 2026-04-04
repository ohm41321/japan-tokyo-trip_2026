import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tokyo Trip 2026 - Travel Planner",
  description: "7-day Tokyo trip itinerary with checklist and maps",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
