import Link from "next/link";
import { localeLabels, localeNames, locales, type Locale } from "@/lib/i18n";
import { content } from "@/lib/content";
import { getLegalLinks, legalContent } from "@/lib/legal";
import { LanguageSwitcher } from "@/components/language-switcher";

function getLegalPageUi(locale: Locale, kind: "privacy" | "cookies") {
  const isPrivacy = kind === "privacy";

  if (locale === "tr") {
    return {
      sectionLabel: isPrivacy ? "Gizlilik sayfası" : "Çerez sayfası",
      sectionTitle: isPrivacy ? "Politika başlıkları" : "Politika başlıkları",
      updatedLabel: "Son güncelleme",
      scopeLabel: "Kapsam",
      scopeText: isPrivacy ? "Veri işleme, saklama ve haklar" : "Çerez kullanımı ve tercih yönetimi",
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
      sectionLabel: isPrivacy ? "Datenschutzseite" : "Cookie-Seite",
      sectionTitle: "Richtlinienabschnitte",
      updatedLabel: "Aktualisiert",
      scopeLabel: "Umfang",
      scopeText: isPrivacy ? "Verarbeitung, Speicherung und Rechte" : "Cookie-Nutzung und Präferenzverwaltung",
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
      sectionLabel: isPrivacy ? "صفحة الخصوصية" : "صفحة ملفات الارتباط",
      sectionTitle: "أقسام السياسة",
      updatedLabel: "آخر تحديث",
      scopeLabel: "النطاق",
      scopeText: isPrivacy ? "المعالجة والاحتفاظ والحقوق" : "استخدام ملفات الارتباط وإدارة التفضيلات",
      footerCta: "لنعمل معاً",
      footerSitemap: "خريطة الموقع",
      footerContact: "تواصل",
      footerLanguages: "اللغات",
      footerBackToTop: "العودة للأعلى",
      footerCopyright: "Copyright © Terkib23 2026"
    };
  }

  return {
    sectionLabel: isPrivacy ? "Privacy page" : "Cookie page",
    sectionTitle: "Policy sections",
    updatedLabel: "Last updated",
    scopeLabel: "Scope",
    scopeText: isPrivacy ? "Processing, retention and rights" : "Cookie usage and preference management",
    footerCta: "Work with us",
    footerSitemap: "Sitemap",
    footerContact: "Contact",
    footerLanguages: "Languages",
    footerBackToTop: "Back to top",
    footerCopyright: "Copyright © Terkib23 2026"
  };
}

export function LegalDocument({
  locale,
  kind
}: {
  locale: Locale;
  kind: "privacy" | "cookies";
}) {
  const page = content[locale];
  const doc = legalContent[locale][kind];
  const ui = getLegalPageUi(locale, kind);
  const languageOptions = locales
    .filter((item) => item !== locale)
    .map((item) => ({
      href: `/${item}/${kind === "privacy" ? "privacy-policy" : "cookie-policy"}/`,
      label: localeNames[item]
    }));

  const navItems = page.nav.map((item) => ({
    href: item.href.startsWith("#") ? `/${locale}/${item.href}` : `/${locale}${item.href}`,
    label: item.label
  }));

  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(
    locale === "tr"
      ? "Merhaba, yasal sayfalarınız hakkında bilgi almak istiyorum."
      : "Hello, I would like information about your legal pages."
  )}`;

  const footerLinks = [
    {
      title: ui.footerSitemap,
      items: [
        { label: page.nav[0]?.label ?? "Home", href: `/${locale}/` },
        {
          label: locale === "tr" ? "Paketler" : locale === "de" ? "Pakete" : locale === "ar" ? "الباقات" : "Packages",
          href: `/${locale}/packages/`
        },
        { label: page.nav[1]?.label ?? "References", href: `/${locale}/references/` },
        { label: doc.title, href: `/${locale}/${kind === "privacy" ? "privacy-policy" : "cookie-policy"}/` }
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
        href: `/${item}/${kind === "privacy" ? "privacy-policy" : "cookie-policy"}/`
      }))
    },
    getLegalLinks(locale)
  ];

  return (
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
                <Link key={item.href} href={item.href} className="home-nav-link">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="home-center home-center-compact">
          <div className="home-copy">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              {ui.sectionLabel}
            </p>
            <h1>{doc.title}</h1>
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
          <div className="grid gap-6 border-b border-white/10 pb-10 md:grid-cols-[minmax(0,1.25fr)_minmax(260px,0.75fr)] md:items-end">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/38">{ui.sectionTitle}</p>
              <p className="mt-5 text-lg leading-8 text-white/68 md:text-[21px] md:leading-9">{doc.description}</p>
            </div>

            <div className="grid gap-3 rounded-[24px] border border-white/10 bg-white/[0.03] p-5 md:justify-self-end md:p-6">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/38">{ui.updatedLabel}</p>
                <p className="mt-2 text-base font-semibold text-white/88">{doc.updatedAt}</p>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/38">{ui.scopeLabel}</p>
                <p className="mt-2 text-sm leading-6 text-white/62 md:text-[15px]">{ui.scopeText}</p>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-5">
            {doc.sections.map((section) => (
              <article
                key={section.title}
                className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm md:p-8"
              >
                <h3 className="max-w-4xl font-[var(--font-space)] text-[30px] font-semibold leading-[0.98] tracking-[-0.05em] text-white md:text-[44px]">
                  {section.title}
                </h3>

                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="mt-5 max-w-4xl text-base leading-8 text-white/68 md:text-[18px]">
                    {paragraph}
                  </p>
                ))}

                {section.bullets ? (
                  <ul className="mt-6 grid gap-3 md:gap-4">
                    {section.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="rounded-[18px] border border-white/8 bg-black/10 px-4 py-4 text-base leading-7 text-white/68 md:px-5 md:text-[17px]"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}

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
  );
}
