import {
  AbstractIntlMessages,
  NextIntlClientProvider,
  Locale,
  hasLocale,
} from "next-intl";
import { Toaster } from "@/components/ui/sonner";
import {
  getMessages,
  setRequestLocale,
  getTranslations,
} from "next-intl/server";
import { Geist, Geist_Mono } from "next/font/google";
import "../../globals.css";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { description } from "@/components/chart-area-interactive";
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
  };
}
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  const messages = await getMessages();

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);
  return (
    <html
      dir={locale === "ar" ? "rtl" : "ltr"}
      lang={typeof window !== "undefined" && locale === "ar" ? "ar" : "en"}
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased
        ${locale === "ar" ? "font-arabic" : "font-english"} bg-gray-100`}
      >
        <NextIntlClientProvider
          messages={JSON.stringify(messages) as unknown as AbstractIntlMessages}
        >
          <SidebarProvider
            style={
              {
                "--sidebar-width": "calc(var(--spacing) * 72)",
                "--header-height": "calc(var(--spacing) * 12)",
              } as React.CSSProperties
            }
          >
            <AppSidebar variant="inset" />
            <SidebarInset>
              <SiteHeader />
              <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                  <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    {children}
                  </div>
                </div>
              </div>
            </SidebarInset>
          </SidebarProvider>
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
