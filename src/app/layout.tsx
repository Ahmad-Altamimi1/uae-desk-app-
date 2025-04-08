import { NextIntlClientProvider, Locale, hasLocale } from "next-intl";
import { Toaster } from "@/components/ui/sonner";
import {
  getMessages,
  setRequestLocale,
  getTranslations,
} from "next-intl/server";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ReactNode } from "react";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import Header from "@/components/layout/header";
import { AppSidebar } from "@/components/layout/app-sidebar";
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

export async function generateMetadata(props: Omit<Props, "children">) {
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
      icons: {
        icon: "./app.ico",
      },
    },
  };
}
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  const messages = await getMessages();

  // Enable static rendering
  setRequestLocale(locale);
  return (
    <html>
      <body
        dir={locale === "ar" ? "rtl" : "ltr"}
        lang={locale}
        className={`${geistSans.variable} ${geistMono.variable} antialiased
       ${locale === "ar" ? "font-arabic" : "font-english"} bg-gray-100`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}

          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
