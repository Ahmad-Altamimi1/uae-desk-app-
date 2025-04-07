import type { Metadata } from "next";
import {
  AbstractIntlMessages,
  NextIntlClientProvider,
  Locale,
} from "next-intl";
import { getMessages } from "next-intl/server";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import QueryProvider from "@/lib/api/client/queryProvider";
type Props = {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
};
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HOLISTIC LEGACY ACCOUNTING S.P.S L.L.C Attendance",
  description: "Generated by create next app",
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;

  const messages = await getMessages();
  return (
    <html>
      <body
        dir={locale === "ar" ? "rtl" : "ltr"}
        lang={locale}
        className={`${geistSans.variable} ${geistMono.variable} antialiased
         ${locale === "ar" ? "font-arabic" : "font-english"} bg-gray-100`}
      >
        <NextIntlClientProvider messages={messages}>
          <QueryProvider>{children}</QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
