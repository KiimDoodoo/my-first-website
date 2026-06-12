import type { Metadata, Viewport } from "next";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import ThemeApplier from "@/components/ThemeApplier";

export const metadata: Metadata = {
  title: "Softly · 소프틀리",
  description:
    "하루를 가볍게 들여다보는 작은 기록 공간. 웰니스 체크인 및 개인 기록 앱입니다.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    title: "Softly",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf8f5" },
    { media: "(prefers-color-scheme: dark)", color: "#211e1a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col font-sans">
        <ServiceWorkerRegister />
        <ThemeApplier />
        <I18nProvider>
          <div className="mx-auto flex w-full max-w-md flex-1 flex-col px-5 pb-10">
            {children}
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}
