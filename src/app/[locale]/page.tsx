import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomeExperience } from "@/components/site-frame";
import { content } from "@/lib/content";
import { isLocale, type Locale } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: string }>;
};

async function getLocale(params: PageProps["params"]): Promise<Locale> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return locale;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await getLocale(params);
  const page = content[locale];

  return {
    title: page.meta.title,
    description: page.meta.description,
    alternates: {
      canonical: `/${locale}/`,
      languages: {
        tr: "/tr/",
        de: "/de/",
        en: "/en/",
        ar: "/ar/"
      }
    }
  };
}

export default async function LocaleHome({ params }: PageProps) {
  const locale = await getLocale(params);
  const page = content[locale];

  return <HomeExperience locale={locale} content={page} />;
}
