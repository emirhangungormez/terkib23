import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";

export const siteUrl = "https://terkib23.emirhangungormez.com.tr";
export const siteName = "Terkib23";

export const localePathLabels: Record<Locale, string> = {
  tr: "tr-TR",
  de: "de-DE",
  en: "en-US",
  ar: "ar"
};

function localizedPath(locale: Locale, slug = "") {
  return `/${locale}${slug}`;
}

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

export function buildAlternates(slug = "") {
  return {
    canonical: localizedPath("tr", slug),
    languages: {
      tr: localizedPath("tr", slug),
      de: localizedPath("de", slug),
      en: localizedPath("en", slug),
      ar: localizedPath("ar", slug),
      "x-default": localizedPath("tr", slug)
    }
  };
}

export function buildPageMetadata({
  locale,
  title,
  description,
  slug = "",
  keywords
}: {
  locale: Locale;
  title: string;
  description: string;
  slug?: string;
  keywords?: string[];
}): Metadata {
  const url = absoluteUrl(localizedPath(locale, slug));

  return {
    title: title === siteName ? { absolute: title } : title,
    description,
    keywords,
    alternates: buildAlternates(slug),
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: localePathLabels[locale],
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
    }
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    email: "han23studio@gmail.com",
    foundingLocation: {
      "@type": "Place",
      name: "Turkey"
    },
    areaServed: ["Turkey", "Germany", "Europe", "Middle East"],
    sameAs: [
      "https://www.linkedin.com",
      `${siteUrl}/tr/references/`
    ]
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    inLanguage: ["tr", "de", "en", "ar"],
    publisher: {
      "@type": "Organization",
      name: siteName
    }
  };
}

export function serviceSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteName,
    url: absoluteUrl(`/${locale}/`),
    email: "han23studio@gmail.com",
    areaServed: ["Turkey", "Germany", "Europe"],
    availableLanguage: ["Turkish", "German", "English", "Arabic"],
    serviceType: "Multilingual website design and development",
    brand: {
      "@type": "Brand",
      name: siteName
    }
  };
}

export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}
