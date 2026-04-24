import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { HomeExperience } from "@/components/site-frame";
import { content } from "@/lib/content";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata, organizationSchema, serviceSchema, websiteSchema } from "@/lib/site";

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

  return buildPageMetadata({
    locale,
    title: page.meta.title,
    description: page.meta.description,
    keywords: ["multilingual website", "web design", "Next.js", "Cloudflare Pages", "Turkey", "Germany"]
  });
}

export default async function LocaleHome({ params }: PageProps) {
  const locale = await getLocale(params);
  const page = content[locale];

  return (
    <>
      <SeoJsonLd data={[organizationSchema(), websiteSchema(), serviceSchema(locale)]} />
      <HomeExperience locale={locale} content={page} />
    </>
  );
}
