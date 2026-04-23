import { Gmail } from "developer-icons";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { localeLabels, localeNames, locales } from "@/lib/i18n";
import type { PackageItem, ReferenceItem, SiteContent } from "@/lib/content";
import { getLegalLinks } from "@/lib/legal";
import { PricingSection } from "@/components/pricing-section";
import { LanguageSwitcher } from "@/components/language-switcher";

function localizedHref(locale: Locale, href: string) {
  if (href.startsWith("#")) {
    return href;
  }

  return `/${locale}${href}`;
}

export function SiteHeader({
  locale,
  content
}: {
  locale: Locale;
  content: SiteContent;
}) {
  const languageOptions = locales
    .filter((item) => item !== locale)
    .map((item) => ({
      href: `/${item}/`,
      label: localeNames[item]
    }));


  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div
        className="section-shell flex flex-col items-start gap-3 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
        dir="ltr"
      >
        <Link
          href={`/${locale}/`}
          className="group flex shrink-0 items-center gap-2 font-[var(--font-space)] text-[22px] font-bold tracking-normal text-[var(--text)]"
          aria-label="Terkib23 home"
        >
          <span className="grid size-4 place-items-center rounded-[3px] bg-[var(--ink)] transition-transform duration-300 group-hover:rotate-6">
            <span className="block size-2 rounded-[2px] bg-[var(--gold)]" />
          </span>
          terkib23
        </Link>

        <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-end">
          <LanguageSwitcher currentLabel={localeNames[locale]} options={languageOptions} />
          <nav className="hidden items-center gap-7 text-sm font-medium text-[var(--text)]/75 md:flex">
            {content.nav.map((item) => (
              <Link
                key={item.href}
                href={localizedHref(locale, item.href)}
                className="transition-colors hover:text-[var(--text)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

      </div>
    </header>
  );
}

export function Hero({
  locale,
  content
}: {
  locale: Locale;
  content: SiteContent;
}) {
  return (
    <section className="noise relative min-h-[92svh] overflow-hidden bg-[var(--paper)]">
      <div className="relative z-10 flex min-h-[92svh] flex-col justify-between pt-28">
        <div className="section-shell grid flex-1 place-items-center py-20 text-center">
          <div className="max-w-4xl">
            <p className="reveal-up text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              {content.hero.eyebrow}
            </p>
            <h1 className="reveal-up reveal-late mt-5 font-[var(--font-space)] text-[clamp(72px,14vw,196px)] font-bold leading-[0.82] tracking-normal text-[var(--text)]">
              {content.hero.title}
            </h1>
            <p className="reveal-up reveal-last mx-auto mt-7 max-w-2xl text-balance text-lg leading-8 text-[var(--muted)] md:text-xl">
              {content.hero.subtitle}
            </p>
            <div className="reveal-up reveal-last mt-9 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`mailto:${content.contact.email}`}
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[var(--ink)] px-6 text-sm font-bold text-[#eee9e4] transition-transform duration-300 hover:-translate-y-0.5"
              >
                <span aria-hidden="true">-&gt;</span>
                {content.hero.primary}
              </a>
              <Link
                href={`/${locale}/packages/`}
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[var(--line)] px-6 text-sm font-bold text-[var(--text)] transition-colors hover:bg-white/50"
              >
                <span aria-hidden="true">~</span>
                {content.hero.secondary}
              </Link>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="h-9 bg-[var(--gold)]" />
          <div className="h-9 bg-[var(--red)]" />
          <div className="h-9 bg-[var(--wine)]" />
          <div className="bg-[var(--ink)] py-6">
            <div className="section-shell flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center text-sm text-white/58">
              {content.hero.proof.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeExperience({
  locale,
  content
}: {
  locale: Locale;
  content: SiteContent;
}) {
  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(
    locale === "tr"
      ? "Merhaba, Terkib23 için bilgi almak istiyorum."
      : "Hello, I would like information about Terkib23."
  )}`;

  const ui =
    locale === "tr"
      ? {
          heroTitle: "Yenilikçi web siteleri geliştiriyoruz.",
          heroText: "Kurumsal markalar için güven veren, yenilik odaklı ve uzun ömürlü web altyapıları tasarlıyoruz.",
          primaryTitle: "Mail at",
          primaryText: "Hızlı iletişim ve teklif akışı",
          secondaryTitle: "Referansları incele",
          secondaryText: "Tamamlanan işlerden örnekler",
          note: "Önceliğimiz kurumsal ve profesyonel web sitesi projeleri.",
          scrollPrompt: "Markanız için ne inşa ediyoruz",
          scrollTitle: "Yenilik, güven ve mühendislik odağında dijital sistemler."
        }
      : locale === "de"
        ? {
            heroTitle: "Willkommen bei Terkib23.",
            heroText: "Lassen Sie uns den Umfang klären und die passende Struktur für Ihr Projekt wählen.",
            primaryTitle: "E-Mail senden",
            primaryText: "Schneller Kontakt und Angebotsfluss",
            secondaryTitle: "Referenzen ansehen",
            secondaryText: "Beispiele abgeschlossener Projekte",
            note: "Derzeit werden nur React-basierte Webprojekte unterstützt.",
            scrollPrompt: "Was entwickeln wir für Ihre Marke",
            scrollTitle: "Mehrsprachige Websites mit klarer Struktur und moderner Umsetzung."
          }
        : {
            heroTitle: "Welcome to Terkib23.",
            heroText: "Let's define the scope first and choose the right structure together.",
            primaryTitle: "Send email",
            primaryText: "Fast contact and offer flow",
            secondaryTitle: "Review references",
            secondaryText: "Examples of completed work",
            note: "We currently only support React-based web projects.",
            scrollPrompt: "What are we building for your brand",
            scrollTitle: "Modern, credible and scalable digital experiences."
          };


  const languageOptions = locales
    .filter((item) => item !== locale)
    .map((item) => ({
      href: `/${item}/`,
      label: localeNames[item]
    }));

  const infoSections =
    locale === "tr"
      ? [
          {
            kicker: "Soru 01",
            title: "Web sitesi yaptırmak size ne kazandırır?",
            text: "Web sitesi, markanızın dijital vitrini ve güven unsurudur. Sosyal medya hızlı erişim sağlar ancak tek başına yeterli değildir. Profesyonel bir web sitesi ile müşterilerinize güven verir, markanızın prestijini artırır ve Google üzerinden müşteri kazanabilirsiniz. Özellikle Google reklamları ve arama sonuçlarından müşteri elde etmek istiyorsanız, web sitesi olmazsa olmazdır."
          },
          {
            kicker: "Soru 02",
            title: "Sizi diğer ajanslardan farklı yapan nedir?",
            text: "Hazır şablon kullanmıyoruz. Her projeyi sıfırdan, markanıza özel olarak tasarlıyoruz. Tasarım odaklı çalışıyor, modern teknolojiler kullanıyor ve AI destekli üretim süreçleri ile hızlı ve kaliteli sonuç alıyoruz. Ayrıca Türkiye'de mühendislerden oluşan küçük ve odaklı bir yazılım ekibiyiz. Teknik altyapımızı ve çalışmalarımızı incelemek için: Emirhan Güngörmez."
          },
          {
            kicker: "Soru 03",
            title: "Web sitesi ne kadar sürede teslim edilir?",
            text: "Çoğu kurumsal web sitesi 2–5 gün içerisinde yayına alınır. AI destekli üretim süreçlerimiz sayesinde hızlı teslim sağlarken kaliteyi korumaya devam ediyoruz."
          },
          {
            kicker: "Soru 04",
            title: "SEO uyumlu site yapıyor musunuz?",
            text: "Evet. Web sitenizi teknik olarak SEO ve yeni nesil arama sistemlerine, AI tabanlı aramalar dahil, uyumlu şekilde geliştiriyoruz. Site yapısı Google'a uygun kurulur, Google Search Console entegrasyonu yapılır ve arama motorlarının sitenizi doğru şekilde taraması sağlanır. Ancak SEO altyapısı tek başına yeterli değildir; reklam ve pazarlama çalışmaları yapılmazsa rekabet yüksek sektörlerde geri planda kalabilirsiniz."
          },
          {
            kicker: "Soru 05",
            title: "Web sitesi hızlı olacak mı?",
            text: "Evet. Performans önceliklerimizden biridir. Web siteniz hızlı açılacak şekilde optimize edilir, Google'ın kendi analiz araçlarıyla test edilir ve yüksek performans skorları hedeflenir.",
            linkLabel: "PageSpeed Insights",
            linkHref: "https://pagespeed.web.dev/"
          },
          {
            kicker: "Soru 06",
            title: "Siteyi sonradan kendim güncelleyebilir miyim?",
            text: "Standart projelerde yönetim paneli sunmuyoruz. Güncellemeler ve revizeler tarafımızdan yapılır ve bunun için ayrı bir fiyatlandırma tablomuz bulunur. Ancak projeniz sürekli içerik güncellemesi gerektiriyorsa, isteğe bağlı olarak size özel bir admin panel geliştirebiliriz."
          },
          {
            kicker: "Soru 07",
            title: "Revize ve değişiklik süreci nasıl işliyor?",
            text: "Yayına alınan projelerde yapılacak değişiklikler talebe göre hızlı şekilde uygulanır. Küçük düzenlemeler, içerik güncellemeleri ve tasarım değişiklikleri revize kapsamı içinde değerlendirilir ve fiyatlandırma tablomuz üzerinden ilerler."
          },
          {
            kicker: "Soru 08",
            title: "Sadece web sitesi mi yapıyorsunuz?",
            text: "Hayır. İhtiyaca göre e-ticaret sistemleri, web tabanlı özel yazılımlar, AI chatbot sistemleri ve otomasyon çözümleri gibi projeler de geliştiriyoruz."
          },
          {
            kicker: "Soru 09",
            title: "Proje süreci nasıl ilerliyor?",
            text: "Süreç sade ve şeffaftır: ihtiyaç analizi, tasarım, geliştirme, test ve yayın. Tüm aşamalarda sizinle iletişim halinde ilerliyoruz."
          },
          {
            kicker: "Soru 10",
            title: "Web sitesi yaptıktan sonra reklam veriyor musunuz?",
            text: "Hayır. Reklam yönetimi hizmeti sunmuyoruz. Biz web sitenizin teknik altyapısını hazırlarız; SEO uyumu, hızlı yapı ve doğru indeksleme buna dahildir. Ancak müşteri kazanımı için reklam ve pazarlama çalışmaları ayrıca yapılmalıdır."
          }
        ]
      : [
          {
            kicker: locale === "de" ? "System" : "System",
            title: content.sections.technologyTitle,
            text: content.sections.technologyIntro,
            items: content.sections.technologies
          },
          {
            kicker: locale === "de" ? "Leistungen" : "Services",
            title: content.sections.servicesTitle,
            text: content.sections.servicesIntro,
            items: content.sections.services
          },
          {
            kicker: locale === "de" ? "Ablauf" : "Process",
            title: content.sections.processTitle,
            text: content.sections.processIntro,
            items: content.sections.process
          }
        ];

  const navItems = [
    {
      href: `/${locale}/`,
      label: locale === "tr" ? "Anasayfa" : locale === "de" ? "Startseite" : "Home"
    },
    {
      href: `/${locale}/references/`,
      label: locale === "tr" ? "Referanslar" : locale === "de" ? "Referenzen" : "References"
    },
    {
      href: `/${locale}/#footer`,
      label: locale === "tr" ? "İletişim" : locale === "de" ? "Kontakt" : "Contact"
    }
  ];

  const footerUi =
    locale === "tr"
      ? {
          cta: "Birlikte çalışalım",
          sitemap: "Site Haritası",
          contact: "İletişim",
          languages: "Diller",
          backToTop: "Başa dön",
          copyright: "Copyright © Terkib23 2026"
        }
      : locale === "de"
        ? {
            cta: "Arbeiten wir zusammen",
            sitemap: "Sitemap",
            contact: "Kontakt",
            languages: "Sprachen",
            backToTop: "Zurück nach oben",
            copyright: "Copyright © Terkib23 2026"
          }
        : {
            cta: "Work with us",
            sitemap: "Sitemap",
            contact: "Contact",
            languages: "Languages",
            backToTop: "Back to top",
            copyright: "Copyright © Terkib23 2026"
          };

  const footerLinks = [
    {
      title: footerUi.sitemap,
      items: [
        { label: navItems[0].label, href: `/${locale}/` },
        { label: locale === "tr" ? "Paketler" : locale === "de" ? "Pakete" : "Packages", href: `/${locale}/packages/` },
        { label: navItems[1].label, href: `/${locale}/references/` },
        { label: navItems[2].label, href: `mailto:${content.contact.email}` }
      ]
    },
    {
      title: footerUi.contact,
      items: [
        { label: content.contact.email, href: `mailto:${content.contact.email}` },
        { label: "WhatsApp", href: whatsappHref },
        { label: "LinkedIn", href: "https://www.linkedin.com" }
      ]
    },
    {
      title: footerUi.languages,
      items: locales.map((item) => ({
        label: localeLabels[item],
        href: `/${item}/`
      }))
    },
    getLegalLinks(locale)
  ];

  const pricingUi =
    locale === "tr"
      ? {
          kicker: "Paketler",
          title: "Web sitesi fiyatları.",
          text: "Kapsama göre şekillenen başlangıç fiyatlarını aşağıda görebilirsiniz. Özel geliştirme, ek modül ve kapsam genişlemeleri ayrıca tekliflendirilir."
        }
      : locale === "de"
        ? {
          kicker: "Pakete",
          title: "Website-Preise.",
          text: "Unten sehen Sie die Einstiegspreise je nach Umfang. Individuelle Entwicklung, Zusatzmodule und erweiterter Umfang werden separat angeboten."
        }
        : {
            kicker: "Packages",
            title: "Website pricing.",
            text: "Below are the starting prices based on scope. Custom development, extra modules and expanded scope are quoted separately."
          };

  const revisionUi =
    locale === "tr"
      ? {
          title: "Güncelleme ve revize fiyatları",
          text: "Mevcut site üzerinde talep edilen içerik, yapı ve kapsam güncellemeleri ayrı tabloda listelenir."
        }
      : locale === "de"
        ? {
            title: "Update- und Revisionspreise",
            text: "Inhalts-, Struktur- und Umfangsänderungen für bestehende Websites sind unten separat gelistet."
          }
        : {
            title: "Update and revision pricing",
            text: "Content, structure and scope changes for existing websites are listed separately below."
          };
  const resolvedUi =
    locale === "ar"
      ? {
          heroTitle: "مرحباً بكم في Terkib23.",
          heroText: "لنحدّد نطاق المشروع أولاً ونبني له الهيكل المناسب بوضوح.",
          primaryTitle: "إرسال بريد",
          primaryText: "تواصل سريع ومسار عرض واضح",
          secondaryTitle: "عرض المراجع",
          secondaryText: "نماذج من الأعمال المنجزة",
          note: "نركّز حالياً على مواقع الويب الاحترافية والمشاريع الرقمية العملية.",
          scrollPrompt: "ماذا نبني لعلامتكم",
          scrollTitle: "تجارب رقمية حديثة وموثوقة وقابلة للتوسع."
        }
      : ui;

  const resolvedInfoSections =
    locale === "ar"
      ? [
          {
            kicker: "النظام",
            title: content.sections.technologyTitle,
            text: content.sections.technologyIntro,
            items: content.sections.technologies
          },
          {
            kicker: "الخدمات",
            title: content.sections.servicesTitle,
            text: content.sections.servicesIntro,
            items: content.sections.services
          },
          {
            kicker: "العملية",
            title: content.sections.processTitle,
            text: content.sections.processIntro,
            items: content.sections.process
          }
        ]
      : infoSections;

  const resolvedNavItems =
    locale === "ar"
      ? [
          { href: `/${locale}/`, label: "الرئيسية" },
          { href: `/${locale}/references/`, label: "المراجع" },
          { href: `/${locale}/#footer`, label: "التواصل" }
        ]
      : navItems;

  const resolvedFooterUi =
    locale === "ar"
      ? {
          cta: "لنبدأ العمل معاً",
          sitemap: "خريطة الموقع",
          contact: "التواصل",
          languages: "اللغات",
          backToTop: "العودة للأعلى",
          copyright: "Copyright © Terkib23 2026"
        }
      : footerUi;

  const resolvedFooterLinks =
    locale === "ar"
      ? [
          {
            title: resolvedFooterUi.sitemap,
            items: [
              { label: resolvedNavItems[0].label, href: `/${locale}/` },
              { label: "الباقات", href: `/${locale}/packages/` },
              { label: resolvedNavItems[1].label, href: `/${locale}/references/` },
              { label: resolvedNavItems[2].label, href: `mailto:${content.contact.email}` }
            ]
          },
          {
            title: resolvedFooterUi.contact,
            items: [
              { label: content.contact.email, href: `mailto:${content.contact.email}` },
              {
                label: "WhatsApp",
                href: `https://wa.me/?text=${encodeURIComponent("مرحباً، أريد الحصول على معلومات عن Terkib23.")}`
              },
              { label: "LinkedIn", href: "https://www.linkedin.com" }
            ]
          },
          {
            title: resolvedFooterUi.languages,
            items: locales.map((item) => ({
              label: localeLabels[item],
              href: `/${item}/`
            }))
          },
          getLegalLinks(locale)
        ]
      : footerLinks;

  const resolvedCards = [
    {
      href: `mailto:${content.contact.email}`,
      title: resolvedUi.primaryTitle,
      text: resolvedUi.primaryText,
      dark: true
    },
    {
      href: `/${locale}/references/`,
      title: resolvedUi.secondaryTitle,
      text: resolvedUi.secondaryText,
      dark: false
    }
  ];

  const resolvedPricingUi =
    locale === "ar"
      ? {
          kicker: "الباقات",
          title: "أسعار مواقع الويب.",
          text: "فيما يلي أسعار البداية بحسب نطاق المشروع. التطوير المخصص والإضافات وتوسّع النطاق تُسعّر بشكل منفصل."
        }
      : pricingUi;

  const resolvedRevisionUi =
    locale === "ar"
      ? {
          title: "أسعار التحديثات والتعديلات",
          text: "تغييرات المحتوى والبنية والنطاق للمواقع الحالية مدرجة أدناه بشكل منفصل."
        }
      : revisionUi;

  const pricingLinkLabel =
    locale === "ar" ? "عرض الأسعار" : locale === "de" ? "Preise ansehen" : locale === "tr" ? "Fiyatları incele" : "View pricing";


  return (
    <main className="home-shell" id="top">
      <section className="home-canvas">
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
              {resolvedNavItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="home-nav-link"
                  target={item.href.startsWith("mailto:") ? "_self" : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="home-center">
          <div className="home-copy">
            <h1>{resolvedUi.heroTitle}</h1>
            <p>{resolvedUi.heroText}</p>
            <Link href="#pricing" className="home-hero-pricing-link">
              {pricingLinkLabel}
            </Link>
          </div>
        </div>

        <div className="home-option-panel">
          {resolvedCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              target={card.href.startsWith("http") ? "_blank" : undefined}
              rel={card.href.startsWith("http") ? "noreferrer" : undefined}
              className={`home-option-card ${card.dark ? "is-dark" : ""}`}
            >
              {card.title === resolvedUi.primaryTitle ? (
                <span className="home-option-icon is-dark" aria-hidden="true">
                  <Gmail size={24} />
                </span>
              ) : null}
              <strong>{card.title}</strong>
              <span>{card.text}</span>
            </Link>
          ))}
        </div>

        <div className="home-lower-stage">
          <div className="home-stripes" aria-hidden="true">
            <span className="home-stripe home-stripe-gold" />
            <span className="home-stripe home-stripe-copper" />
            <span className="home-stripe home-stripe-red" />
            <span className="home-stripe home-stripe-wine" />
          </div>

          <div className="home-stage-fill">
            <div className="home-stage-note" dir="ltr">
              <span aria-hidden="true">i</span>
              <p>{resolvedUi.note}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="home-info-band">
        <div className="home-info-shell">
          <div className="home-info-stack">
            {resolvedInfoSections.map((section) => (
              <article key={section.title} className="home-info-card">
                <div className="home-info-question">
                  <h3>{section.title.replace(/\?$/, "")}</h3>
                  <span aria-hidden="true">?</span>
                </div>
                <p className="home-info-text">{section.text}</p>
                {"linkHref" in section && section.linkHref ? (
                  <a
                    href={section.linkHref}
                    target="_blank"
                    rel="noreferrer"
                    className="home-info-link"
                  >
                    {section.linkLabel}
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <PricingSection
        locale={locale}
        packages={content.packagesPage.packages}
        revisions={content.packagesPage.revisions}
        pricingUi={resolvedPricingUi}
        revisionUi={resolvedRevisionUi}
        contactEmail={content.contact.email}
      />

      <footer id="footer" className="home-footer" dir="ltr">
        <div className="home-footer-shell">
          <div className="home-footer-hero">
            <h2>{resolvedFooterUi.cta}</h2>
            <a href={`mailto:${content.contact.email}`} className="home-footer-mail">
              {content.contact.email}
            </a>
          </div>

          <div className="home-footer-links">
            {resolvedFooterLinks.map((group) => (
              <div key={group.title} className="home-footer-column">
                <h3>{group.title}</h3>
                <div className="home-footer-list">
                  {group.items.map((item) => (
                    <Link
                      key={`${group.title}-${item.label}`}
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
              <a href="#top">{resolvedFooterUi.backToTop} ↑</a>
              <p>{resolvedFooterUi.copyright}</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

export function HomeSections({
  locale,
  content
}: {
  locale: Locale;
  content: SiteContent;
}) {
  return (
    <main className="bg-[var(--ink)] text-[var(--paper)]">
      <section className="section-shell grid gap-12 py-24 text-[#eee9e4] md:grid-cols-[0.95fr_1.05fr] md:py-32">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--gold)]">
            Services
          </p>
          <h2 className="mt-4 max-w-xl font-[var(--font-space)] text-4xl font-bold leading-tight md:text-6xl">
            {content.sections.servicesTitle}
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-8 text-white/62">
            {content.sections.servicesIntro}
          </p>
        </div>
        <div className="grid content-start gap-px overflow-hidden rounded-[8px] border border-white/10 bg-white/10">
          {content.sections.services.map((item, index) => (
            <div
              key={item}
              className="group flex items-center justify-between bg-[var(--ink)] px-5 py-5 transition-colors hover:bg-white/[0.04]"
            >
              <span className="text-lg font-semibold">{item}</span>
              <span className="text-sm text-white/35 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-[var(--paper)] py-24 text-[var(--text)] md:py-32">
        <div className="section-shell">
          <div className="max-w-2xl">
            <h2 className="font-[var(--font-space)] text-4xl font-bold leading-tight md:text-6xl">
              {content.sections.technologyTitle}
            </h2>
            <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
              {content.sections.technologyIntro}
            </p>
          </div>
          <div className="mt-14 grid gap-px overflow-hidden rounded-[8px] border border-[var(--line)] bg-[var(--line)] md:grid-cols-3">
            {content.sections.technologies.map((item) => (
              <div
                key={item}
                className="min-h-28 bg-[var(--paper)] p-6 transition-colors hover:bg-white/45"
              >
                <span className="font-[var(--font-space)] text-2xl font-bold">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-24 text-[#eee9e4] md:py-32">
        <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="font-[var(--font-space)] text-4xl font-bold leading-tight md:text-6xl">
              {content.sections.processTitle}
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-8 text-white/62">
              {content.sections.processIntro}
            </p>
          </div>
          <ol className="grid gap-4">
            {content.sections.process.map((item, index) => (
              <li
                key={item}
                className="flex items-center justify-between border-b border-white/12 pb-4 text-xl font-semibold"
              >
                <span>{item}</span>
                <span className="font-[var(--font-space)] text-2xl text-[var(--gold)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="contact" className="bg-[var(--paper)] py-20 text-[var(--text)]">
        <div className="section-shell flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h2 className="font-[var(--font-space)] text-4xl font-bold leading-tight md:text-6xl">
              {content.sections.finalTitle}
            </h2>
            <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
              {content.sections.finalText}
            </p>
          </div>
          <a
            href={`mailto:${content.contact.email}`}
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[var(--ink)] px-6 text-sm font-bold text-[#eee9e4] transition-transform duration-300 hover:-translate-y-0.5"
          >
            <span aria-hidden="true">-&gt;</span>
            {content.sections.finalCta}
          </a>
        </div>
      </section>

      <SiteFooter locale={locale} content={content} />
    </main>
  );
}

export function PackageGrid({ packages }: { packages: PackageItem[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {packages.map((item) => (
        <article
          key={item.name}
          className={`rounded-[8px] border p-6 ${
            item.highlighted
              ? "border-[var(--gold)] bg-[var(--ink)] text-[#eee9e4]"
              : "border-[var(--line)] bg-white/35 text-[var(--text)]"
          }`}
        >
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
            <h2 className="min-w-0 font-[var(--font-space)] text-3xl font-bold">{item.name}</h2>
            <span
              className={`shrink-0 rounded-full px-3 py-1 text-sm font-bold ${
                item.highlighted ? "bg-[var(--gold)] text-[var(--ink)]" : "bg-[var(--ink)] text-[#eee9e4]"
              }`}
            >
              {item.price}
            </span>
          </div>
          <p className={`mt-5 min-h-20 leading-7 ${item.highlighted ? "text-white/66" : "text-[var(--muted)]"}`}>
            {item.summary}
          </p>
          <ul className="mt-8 grid gap-3">
            {item.features.map((feature) => (
              <li key={feature} className="flex gap-3">
                <span className={item.highlighted ? "text-[var(--gold)]" : "text-[var(--red)]"}>*</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

export function References({
  locale,
  content
}: {
  locale: Locale;
  content: SiteContent["referencesPage"];
}) {
  const ui =
    locale === "tr"
      ? {
          emptyEyebrow: "Seçilen işler",
          flowTitle: "Referans akışı",
          flowItems: ["Proje adı ve sektör", "Pazar ve dil kapsamı", "Kısa teslim özeti", "Canlı link veya önizleme"],
          cta: "Projeyi incele"
        }
      : locale === "de"
        ? {
            emptyEyebrow: "Ausgewählte Arbeiten",
            flowTitle: "Referenzfluss",
            flowItems: ["Projektname und Branche", "Markt und Sprachumfang", "Kurze Lieferzusammenfassung", "Live-Link oder Vorschau"],
            cta: "Projekt ansehen"
          }
        : locale === "ar"
          ? {
              emptyEyebrow: "أعمال مختارة",
              flowTitle: "تدفق المراجع",
              flowItems: ["اسم المشروع والقطاع", "السوق ونطاق اللغات", "ملخص قصير للتسليم", "رابط مباشر أو معاينة"],
              cta: "عرض المشروع"
            }
          : {
              emptyEyebrow: "Selected work",
              flowTitle: "Reference flow",
              flowItems: ["Project name and sector", "Market and language scope", "Short delivery summary", "Live link or preview"],
              cta: "View project"
            };

  if (content.references.length === 0) {
    return (
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[8px] border border-[var(--line)] bg-white/45 p-8 md:p-12">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--red)]">{ui.emptyEyebrow}</p>
          <h2 className="mt-5 font-[var(--font-space)] text-3xl font-bold md:text-5xl">{content.emptyTitle}</h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            {content.emptyText}
          </p>
        </div>
        <div className="rounded-[8px] border border-[var(--line)] bg-[var(--ink)] p-8 text-[#eee9e4] md:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--gold)]">{ui.flowTitle}</p>
          <ul className="mt-6 grid gap-4 text-base leading-7 text-white/70">
            {ui.flowItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {content.references.map((item: ReferenceItem) => (
        <article key={item.title} className="rounded-[8px] border border-[var(--line)] bg-white/45 p-6 transition-colors hover:bg-white/70 md:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--red)]">{item.sector}</p>
          <div className="mt-4 flex items-start justify-between gap-4">
            <h2 className="font-[var(--font-space)] text-3xl font-bold">{item.title}</h2>
            <span className="rounded-full border border-[var(--line)] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
              {item.market}
            </span>
          </div>
          <p className="mt-5 leading-7 text-[var(--muted)]">{item.summary}</p>
          {item.href ? (
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[var(--text)] transition-colors hover:text-[var(--red)]"
            >
              {ui.cta}
              <span aria-hidden="true">-&gt;</span>
            </a>
          ) : null}
        </article>
      ))}
    </div>
  );
}

export function SiteFooter({
  locale,
  content
}: {
  locale: Locale;
  content: SiteContent;
}) {
  const legalLinks = getLegalLinks(locale).items;

  return (
    <footer id="footer" className="border-t border-white/10 bg-[var(--ink)] py-8 text-[#eee9e4]">
      <div className="section-shell flex flex-col justify-between gap-4 text-sm text-white/55 md:flex-row md:items-center">
        <Link href={`/${locale}/`} className="font-[var(--font-space)] text-lg font-bold text-white">
          terkib23
        </Link>
        <div className="flex flex-col items-start gap-2 md:items-end">
          <a href={`mailto:${content.contact.email}`} className="hover:text-white">
            {content.contact.label}
          </a>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {legalLinks.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

