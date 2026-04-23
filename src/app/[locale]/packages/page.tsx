import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PackageGrid, SiteFooter, SiteHeader } from "@/components/site-frame";
import { content } from "@/lib/content";
import { isLocale, locales, type Locale } from "@/lib/i18n";

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

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await getLocale(params);
  const page = content[locale];

  return {
    title: `${page.packagesPage.title} | Terkib23`,
    description: page.packagesPage.intro
  };
}

export default async function PackagesPage({ params }: PageProps) {
  const locale = await getLocale(params);
  const page = content[locale];

  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--text)]">
      <SiteHeader locale={locale} content={page} />
      <main className="section-shell pt-36">
        <div className="max-w-3xl pb-14">
          <Link href={`/${locale}/`} className="text-sm font-bold text-[var(--muted)] hover:text-[var(--text)]">
            ← terkib23
          </Link>
          <h1 className="mt-8 font-[var(--font-space)] text-5xl font-bold leading-tight md:text-7xl">
            {page.packagesPage.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
            {page.packagesPage.intro}
          </p>
          <p className="mt-4 inline-block max-w-full rounded-[20px] bg-[var(--ink)] px-4 py-2 text-sm font-bold leading-6 text-[#eee9e4]">
            {page.packagesPage.note}
          </p>
        </div>
        <PackageGrid packages={page.packagesPage.packages} />
      </main>
      <div className="mt-24">
        <SiteFooter locale={locale} content={page} />
      </div>
    </div>
  );
}
