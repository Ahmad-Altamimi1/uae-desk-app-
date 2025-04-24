import { NextIntlClientProvider, Locale } from "next-intl";
import {
  getMessages,
  setRequestLocale,
  getTranslations,
} from "next-intl/server";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { routing } from "@/i18n/routing";
import { Metadata } from "next";
import Head from "next/head";
import { APP_URL, defaultLanguage, languages } from "@/constants";
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

export async function generateMetadata(
  props: Omit<Props, "children">
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "RootLayout" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: "/",
      languages: {
        en: "/en",
        ar: "/ar",
      },
    },
    icons: {
      icon: "./app.ico",
    },
  };
}
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  const messages = await getMessages();

  setRequestLocale(locale);
  return (
    <html>
      <body
        dir={locale === "ar" ? "rtl" : "ltr"}
        lang={locale}
        className={`${geistSans.variable} ${geistMono.variable} antialiased
       ${locale === "ar" ? "font-arabic" : "font-english"} bg-gray-100`}
      >
        <Head>
          {languages.map((lang) => (
            <link
              key={lang}
              rel="alternate"
              hrefLang={lang}
              href={APP_URL + lang}
            />
          ))}
          <link
            rel="alternate"
            hrefLang="x-default"
            href={`${APP_URL + defaultLanguage}`}
          />
          <link rel="canonical" href={APP_URL + locale} />
        </Head>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
