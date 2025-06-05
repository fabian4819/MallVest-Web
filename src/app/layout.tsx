import { Eip1193Provider } from "ethers";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "@/context/WalletContext";
import { LoadingProvider } from "@/context/LoadingContext";
import { ChainlinkOracleProvider } from "@/context/ChainlinkOracleContext";

declare global {
  interface Window {
    ethereum: Eip1193Provider;
  }
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "MallVest - Mall Income Tokenization",
  description: "Revolutionizing mall investments through blockchain technology"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-950`}
      >
        <LoadingProvider>
          <WalletProvider>
            <ChainlinkOracleProvider>
              {children}
            </ChainlinkOracleProvider>
          </WalletProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}