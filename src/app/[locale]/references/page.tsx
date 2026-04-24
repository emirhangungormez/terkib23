import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { localeLabels, localeNames, locales, isLocale, type Locale } from "@/lib/i18n";
import { content } from "@/lib/content";
import { getLegalLinks } from "@/lib/legal";
import { LanguageSwitcher } from "@/components/language-switcher";
import { absoluteUrl, breadcrumbSchema, buildPageMetadata } from "@/lib/site";

type PageProps = {
  params: Promise<{ locale: string }>;
};

type ReferenceSite = {
  name: string;
  href: string;
  note: Record<Locale, string>;
};

const referenceSites: ReferenceSite[] = [
  {
    name: "beratung-ipek.de",
    href: "https://beratung-ipek.de",
    note: {
      tr: "Kurumsal tanıtım ve hizmet sunumu",
      de: "Unternehmensauftritt und Servicepräsentation",
      en: "Company presentation and service structure",
      ar: "عرض تعريفي واضح للخدمات والهوية"
    }
  },
  {
    name: "steuerhilfe-ipek.de",
    href: "https://steuerhilfe-ipek.de",
    note: {
      tr: "Güven veren vergi danışmanlığı arayüzü",
      de: "Vertrauensvolle Steuerhilfe-Oberfläche",
      en: "Trust-focused tax assistance website",
      ar: "واجهة موثوقة لخدمات المساعدة الضريبية"
    }
  },
  {
    name: "exof-dienstleistung.de",
    href: "https://exof-dienstleistung.de",
    note: {
      tr: "Hizmet odaklı net site yapısı",
      de: "Klare Struktur für ein Dienstleistungsunternehmen",
      en: "Clear service-focused presentation",
      ar: "هيكل واضح لموقع خدمات"
    }
  },
  {
    name: "dhcicekcim.com",
    href: "https://dhcicekcim.com",
    note: {
      tr: "Ürün odaklı vitrin ve iletişim akışı",
      de: "Produktfokus mit klarer Kontaktführung",
      en: "Product-facing showcase and contact flow",
      ar: "واجهة عرض للمنتجات مع تدفق تواصل واضح"
    }
  },
  {
    name: "kuran23.com",
    href: "https://kuran23.emirhangungorme.com.tr",
    note: {
      tr: "İçerik ağırlıklı sade bilgi mimarisi",
      de: "Inhaltsstarke und ruhige Informationsarchitektur",
      en: "Content-heavy structure with quiet hierarchy",
      ar: "بنية معلومات هادئة لمحتوى كثيف"
    }
  },
  {
    name: "sidre.tr",
    href: "https://sidre.tr",
    note: {
      tr: "Marka odaklı temiz landing page kurgusu",
      de: "Markenorientierte klare Landingpage",
      en: "Brand-led clean landing page system",
      ar: "صفحة هبوط نظيفة وموجهة للعلامة"
    }
  },
  {
    name: "terkib23.com",
    href: "https://terkib23.emirhangungormez.com.tr",
    note: {
      tr: "Stüdyonun kendi marka ve teklif alanı",
      de: "Eigener Marken- und Angebotsauftritt des Studios",
      en: "Studio brand system and offer flow",
      ar: "نظام العلامة ومسار العرض الخاص بالاستوديو"
    }
  }
];

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

  return buildPageMetadata({
    locale,
    slug: "/references/",
    title: page.referencesPage.title,
    description: page.referencesPage.intro,
    keywords: ["web design references", "portfolio", "case studies", "multilingual websites"]
  });
}

function pageUi(locale: Locale) {
  if (locale === "tr") {
    return {
      heroTitle: "Referanslarımızı inceliyorsunuz.",
      heroText: "Canlıya alınmış web projelerini doğrudan bağlantılarıyla ve aynı akış içinde listeliyoruz.",
      footerCta: "Birlikte çalışalım",
      footerSitemap: "Site Haritası",
      footerContact: "İletişim",
      footerLanguages: "Diller",
      footerBackToTop: "Başa dön",
      footerCopyright: "Copyright © Terkib23 2026"
    };
  }

  if (locale === "de") {
    return {
      heroTitle: "Sie sehen unsere Referenzen.",
      heroText: "Live veröffentlichte Webprojekte mit direktem Zugriff und klarer Struktur.",
      footerCta: "Arbeiten wir zusammen",
      footerSitemap: "Sitemap",
      footerContact: "Kontakt",
      footerLanguages: "Sprachen",
      footerBackToTop: "Zurück nach oben",
      footerCopyright: "Copyright © Terkib23 2026"
    };
  }

  if (locale === "ar") {
    return {
      heroTitle: "أنتم تشاهدون مراجعنا.",
      heroText: "نعرض مشاريع الويب المنشورة بروابط مباشرة وبنفس الإيقاع البصري.",
      footerCta: "لنعمل معاً",
      footerSitemap: "خريطة الموقع",
      footerContact: "تواصل",
      footerLanguages: "اللغات",
      footerBackToTop: "العودة للأعلى",
      footerCopyright: "Copyright © Terkib23 2026"
    };
  }

  return {
    heroTitle: "You are viewing our references.",
    heroText: "Live web projects listed with direct links and a consistent visual rhythm.",
    footerCta: "Work with us",
    footerSitemap: "Sitemap",
    footerContact: "Contact",
    footerLanguages: "Languages",
    footerBackToTop: "Back to top",
    footerCopyright: "Copyright © Terkib23 2026"
  };
}

export default async function ReferencesPage({ params }: PageProps) {
  const locale = await getLocale(params);
  const page = content[locale];
  const ui = pageUi(locale);
  const breadcrumbs = breadcrumbSchema([
    { name: "Terkib23", url: absoluteUrl(`/${locale}/`) },
    { name: page.referencesPage.title, url: absoluteUrl(`/${locale}/references/`) }
  ]);
  const languageOptions = locales
    .filter((item) => item !== locale)
    .map((item) => ({
      href: `/${item}/references/`,
      label: localeNames[item]
    }));
  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(
    locale === "tr"
      ? "Merhaba, referanslarınız hakkında bilgi almak istiyorum."
      : "Hello, I would like information about your references."
  )}`;

  const navItems = [
    {
      href: `/${locale}/`,
      label: locale === "tr" ? "Anasayfa" : locale === "de" ? "Startseite" : locale === "ar" ? "الرئيسية" : "Home"
    },
    {
      href: `/${locale}/references/`,
      label: locale === "tr" ? "Referanslar" : locale === "de" ? "Referenzen" : locale === "ar" ? "المراجع" : "References"
    },
    {
      href: "#footer",
      label: locale === "tr" ? "İletişim" : locale === "de" ? "Kontakt" : locale === "ar" ? "تواصل" : "Contact"
    }
  ];

  const footerLinks = [
    {
      title: ui.footerSitemap,
      items: [
        { label: navItems[0].label, href: `/${locale}/` },
        { label: locale === "tr" ? "Paketler" : locale === "de" ? "Pakete" : locale === "ar" ? "الباقات" : "Packages", href: `/${locale}/packages/` },
        { label: navItems[1].label, href: `/${locale}/references/` },
        { label: navItems[2].label, href: "#footer" }
      ]
    },
    {
      title: ui.footerContact,
      items: [
        { label: page.contact.email, href: `mailto:${page.contact.email}` },
        { label: "WhatsApp", href: whatsappHref },
        { label: "LinkedIn", href: "https://www.linkedin.com" }
      ]
    },
    {
      title: ui.footerLanguages,
      items: locales.map((item) => ({
        label: localeLabels[item],
        href: `/${item}/references/`
      }))
    },
    getLegalLinks(locale)
  ];

  return (
    <>
      <SeoJsonLd data={breadcrumbs} />
      <main className="home-shell" id="top">
        <section className="home-canvas home-canvas-compact">
        <div className="home-topbar" dir="ltr">
          <Link href={`/${locale}/`} className="home-brand" aria-label="Terkib23 home">
            <span className="home-brand-mark" aria-hidden="true">
              <span />
            </span>
            terkib23
          </Link>

          <div className="home-toolbar">
            <LanguageSwitcher currentLabel={localeNames[locale]} options={languageOptions} />
            <nav className="home-nav" aria-label="Primary">
              {navItems.map((item) => (
                <Link key={item.label} href={item.href} className="home-nav-link">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="home-center home-center-compact">
          <div className="home-copy">
            <h1>{ui.heroTitle}</h1>
            <p>{ui.heroText}</p>
          </div>
        </div>

        <div className="home-lower-stage">
          <div className="home-stripes" aria-hidden="true">
            <span className="home-stripe home-stripe-gold" />
            <span className="home-stripe home-stripe-copper" />
            <span className="home-stripe home-stripe-red" />
            <span className="home-stripe home-stripe-wine" />
          </div>
        </div>
        </section>

        <section className="home-info-band">
          <div className="home-info-shell">
            <div className="home-copy max-w-none pb-10">
              <h2>{page.referencesPage.title}</h2>
            </div>

            <div className="home-info-stack">
              {referenceSites.map((site, index) => (
                <article key={site.name} className="home-info-card">
                  <div className="home-info-question">
                    <h3>
                      <a href={site.href} target="_blank" rel="noreferrer" className="reference-title-link">
                        {site.name}
                      </a>
                    </h3>
                    <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <p className="home-info-text">{site.note[locale]}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <footer id="footer" className="home-footer" dir="ltr">
          <div className="home-footer-shell">
            <div className="home-footer-hero">
              <h2>{ui.footerCta}</h2>
              <a href={`mailto:${page.contact.email}`} className="home-footer-mail">
                {page.contact.email}
              </a>
            </div>

            <div className="home-footer-links">
              {footerLinks.map((group) => (
                <div key={group.title} className="home-footer-column">
                  <h3>{group.title}</h3>
                  <div className="home-footer-list">
                    {group.items.map((item) => (
                      <Link
                        key={`${group.title}-${item.href}-${item.label}`}
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="home-footer-bottom">
              <div className="home-footer-wordmark">TERKIB23</div>
              <div className="home-footer-meta">
                <a href="#top">{ui.footerBackToTop} ↑</a>
                <p>{ui.footerCopyright}</p>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
