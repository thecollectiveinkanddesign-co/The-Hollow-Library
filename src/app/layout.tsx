import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Hollow Library | An Archive of Imagined Worlds",
  description:
    "An independent archive for fanfiction, original fiction, extraordinary stories and the people who write them.",
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