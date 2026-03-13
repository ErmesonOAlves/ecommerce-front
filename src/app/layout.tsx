import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";

const jost = Jost({
  variable:'--font--jost',
  subsets: ["latin"]
})
  

export const metadata: Metadata = {
  title: "Adidas Store - Ecommerce",
  description: "Browse and shop the latest Adidas products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jost.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
