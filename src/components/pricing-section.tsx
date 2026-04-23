"use client";

import { useMemo, useState, type FormEvent } from "react";
import type { Locale } from "@/lib/i18n";
import type { PackageItem, RevisionItem } from "@/lib/content";

type PricingCopy = {
  kicker: string;
  title: string;
  text: string;
};

type RevisionCopy = {
  title: string;
  text: string;
};

type PricingSectionProps = {
  locale: Locale;
  packages: PackageItem[];
  revisions: RevisionItem[];
  pricingUi: PricingCopy;
  revisionUi: RevisionCopy;
  contactEmail: string;
};

type FormUi = {
  ctaTitle: string;
  ctaLink: string;
  ctaText: string;
  toggle: string;
  active: string;
  formTitle: string;
  formText: string;
  advantage: string;
  contactTitle: string;
  purposeTitle: string;
  optionalTitle: string;
  helper: string;
  name: string;
  company: string;
  email: string;
  websiteType: string;
  traffic: string;
  pageCount: string;
  languages: string;
  modules: string;
  noteLabel: string;
  notePlaceholder: string;
  pickOne: string;
  submit: string;
  normalResult: string;
  customResult: string;
  purposeOptions: Record<string, string>;
  sections: Record<string, string>;
  trafficOptions: Record<string, string>;
  pageOptions: Record<string, string>;
  languageOptions: Record<string, string>;
  moduleOptions: Record<string, string>;
};

function formatEuro(value: number, locale: Locale, fractionDigits = 0) {
  const localeMap: Record<Locale, string> = {
    tr: "tr-TR",
    de: "de-DE",
    en: "en-US",
    ar: "ar-EG"
  };

  return `${new Intl.NumberFormat(localeMap[locale], {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits
  }).format(value)} €`;
}

function discountedPrice(value: string, locale: Locale) {
  const amount = Number.parseFloat(value.replace(",", ".").replace(/[^\d.]/g, ""));

  if (Number.isNaN(amount)) {
    return { original: value, current: value, badge: "" };
  }

  const rates = [10, 11, 12, 13, 14, 15];
  const bestRate = rates.reduce(
    (best, rate) => {
      const exactOriginal = amount / (1 - rate / 100);
      const roundedOriginal = Math.round(exactOriginal);
      const distance = Math.abs(exactOriginal - roundedOriginal);

      if (distance < best.distance) {
        return { rate, distance, roundedOriginal };
      }

      return best;
    },
    { rate: 10, distance: Number.POSITIVE_INFINITY, roundedOriginal: Math.round(amount / 0.9) }
  );

  return {
    original: formatEuro(bestRate.roundedOriginal, locale),
    current: formatEuro(amount, locale),
    badge:
      locale === "tr"
        ? `%${bestRate.rate} indirim`
        : locale === "de"
          ? `${bestRate.rate}% Rabatt`
          : locale === "ar"
            ? `خصم ${bestRate.rate}%`
            : `${bestRate.rate}% off`
  };
}
function sanitizeSingleLine(value: string, maxLength: number) {
  return value
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .slice(0, maxLength)
    .trimStart();
}

function sanitizeMultiLine(value: string, maxLength: number) {
  return value
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "")
    .replace(/\r\n/g, "\n")
    .slice(0, maxLength)
    .trimStart();
}

function isEmailValid(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getFormUi(locale: Locale): FormUi {
  if (locale === "tr") {
    return {
      ctaTitle: "%15 indirim alın",
      ctaLink: "Formu doldurun",
      ctaText: " ve projenize özel fiyat avantajını görün.",
      toggle: "İndirimli fiyatları görün",
      active: "İndirim aktif",
      formTitle: "Fiyatlar sabit, size özel indirim ve kapsam netleştirmesi için bilgilerinizi bırakın.",
      formText: "Kısa bir ön analiz yapıp size en uygun çözümle geri dönüş sağlayalım.",
      advantage: "Formu dolduran projelere özel fiyat avantajı uygulanır.",
      contactTitle: "İletişim bilgileri",
      purposeTitle: "Projenizin amacı nedir?",
      optionalTitle: "Opsiyonel detaylar",
      helper: "Detay vermeniz, size daha doğru fiyat ve çözüm sunmamızı sağlar.",
      name: "Ad Soyad",
      company: "İşletme",
      email: "E-posta",
      websiteType: "Web sitesi türü",
      traffic: "Tahmini trafik",
      pageCount: "Sayfa sayısı",
      languages: "Diller",
      modules: "Gerekli modüller",
      noteLabel: "Özel talepler",
      notePlaceholder: "Kısaca ihtiyacınızı anlatın",
      pickOne: "Seçin",
      submit: "Mail gönder",
      normalResult: "Seçimleriniz mevcut paket yapımıza uygun görünüyor. İsterseniz uygun paketi netleştirip mail hazırlayalım.",
      customResult: "Fiyat paketleri sisteminize uygun görünmüyor. Size özel fiyat çıkarılması planlanıyor. Mail gönderilsin mi?",
      purposeOptions: {
        leads: "Yeni müşteri kazanmak",
        image: "Kurumsal görünüm",
        refresh: "Mevcut siteyi yenilemek",
        pricing: "Sadece fiyat almak"
      },
      sections: {
        corporate: "Kurumsal",
        commerce: "E-ticaret",
        app: "Web uygulaması"
      },
      trafficOptions: {
        low: "0 – 1.000",
        medium: "1.000 – 10.000",
        high: "10.000+"
      },
      pageOptions: {
        small: "1–3",
        standard: "3–7",
        large: "7+"
      },
      languageOptions: {
        tr: "Türkçe",
        de: "Almanca",
        en: "İngilizce",
        ar: "Arapça",
        other: "Başka dil"
      },
      moduleOptions: {
        contact: "İletişim formu",
        blog: "Blog / içerik",
        commerce: "E-ticaret",
        accounts: "Üyelik sistemi",
        admin: "Yönetim paneli"
      }
    };
  }

  if (locale === "de") {
    return {
      ctaTitle: "15% Rabatt sichern",
      ctaLink: "Formular ausfüllen",
      ctaText: " und Ihren projektspezifischen Preisvorteil sehen.",
      toggle: "Rabattpreise anzeigen",
      active: "Rabatt aktiv",
      formTitle: "Die Preise sind fix. Hinterlassen Sie Ihre Daten für einen möglichen Rabatt und eine präzisere Umfangseinschätzung.",
      formText: "Wir machen eine kurze Voranalyse und melden uns mit der passendsten Lösung zurück.",
      advantage: "Für ausgefüllte Formulare kann ein individueller Preisvorteil angewendet werden.",
      contactTitle: "Kontaktdaten",
      purposeTitle: "Was ist das Ziel Ihres Projekts?",
      optionalTitle: "Optionale Projektdetails",
      helper: "Mehr Details helfen uns, Preis und Lösung genauer einzuordnen.",
      name: "Vor- und Nachname",
      company: "Unternehmen",
      email: "E-Mail",
      websiteType: "Website-Typ",
      traffic: "Geschätzter Traffic",
      pageCount: "Seitenanzahl",
      languages: "Sprachen",
      modules: "Benötigte Module",
      noteLabel: "Spezielle Anforderungen",
      notePlaceholder: "Beschreiben Sie kurz Ihren Bedarf",
      pickOne: "Wählen Sie",
      submit: "Mail senden",
      normalResult: "Ihre Auswahl wirkt passend zu unserer aktuellen Paketstruktur. Wenn Sie möchten, bereiten wir die passende Anfrage-Mail vor.",
      customResult: "Die Paketpreise scheinen für Ihr System nicht passend zu sein. Für Sie wird ein individuelles Angebot vorbereitet. Soll die Mail gesendet werden?",
      purposeOptions: {
        leads: "Neue Kunden gewinnen",
        image: "Unternehmensauftritt",
        refresh: "Bestehende Website erneuern",
        pricing: "Nur Preis anfragen"
      },
      sections: {
        corporate: "Unternehmen",
        commerce: "E-Commerce",
        app: "Web-Anwendung"
      },
      trafficOptions: {
        low: "0 – 1.000",
        medium: "1.000 – 10.000",
        high: "10.000+"
      },
      pageOptions: {
        small: "1–3",
        standard: "3–7",
        large: "7+"
      },
      languageOptions: {
        tr: "Türkisch",
        de: "Deutsch",
        en: "Englisch",
        ar: "Arabisch",
        other: "Andere Sprache"
      },
      moduleOptions: {
        contact: "Kontaktformular",
        blog: "Blog / Inhalte",
        commerce: "E-Commerce",
        accounts: "Mitgliedssystem",
        admin: "Admin-Panel"
      }
    };
  }

  if (locale === "ar") {
    return {
      ctaTitle: "احصل على خصم 15%",
      ctaLink: "املأ النموذج",
      ctaText: " وشاهد السعر الأنسب لمشروعك.",
      toggle: "عرض الأسعار المخفضة",
      active: "الخصم مفعّل",
      formTitle: "الأسعار ثابتة. اترك معلوماتك لنوضح النطاق بدقة ونراجع لك إمكانية الخصم.",
      formText: "سنقوم بمراجعة سريعة ثم نعود إليك بالحل الأنسب.",
      advantage: "قد يتم تطبيق ميزة سعر خاصة على المشاريع التي تُكمل النموذج.",
      contactTitle: "معلومات التواصل",
      purposeTitle: "ما الهدف من مشروعك؟",
      optionalTitle: "تفاصيل إضافية اختيارية",
      helper: "كلما أضفت تفاصيل أكثر، استطعنا اقتراح سعر وحل أدق.",
      name: "الاسم الكامل",
      company: "الجهة / النشاط",
      email: "البريد الإلكتروني",
      websiteType: "نوع الموقع",
      traffic: "الزيارات المتوقعة",
      pageCount: "عدد الصفحات",
      languages: "اللغات",
      modules: "المزايا المطلوبة",
      noteLabel: "طلبات خاصة",
      notePlaceholder: "اشرح احتياجك باختصار",
      pickOne: "اختر",
      submit: "إرسال البريد",
      normalResult: "اختياراتك تبدو مناسبة لهيكل باقاتنا الحالي. يمكننا تجهيز رسالة الطلب المناسبة.",
      customResult: "يبدو أن الباقات الحالية لا تناسب نظامك بالكامل. سنخطط لك عرضاً مخصصاً. هل نرسل البريد؟",
      purposeOptions: {
        leads: "الحصول على عملاء جدد",
        image: "حضور مهني للعلامة",
        refresh: "تحديث موقع موجود",
        pricing: "معرفة السعر فقط"
      },
      sections: {
        corporate: "موقع تعريفي",
        commerce: "تجارة إلكترونية",
        app: "تطبيق ويب"
      },
      trafficOptions: {
        low: "0 - 1,000",
        medium: "1,000 - 10,000",
        high: "10,000+"
      },
      pageOptions: {
        small: "1-3",
        standard: "3-7",
        large: "7+"
      },
      languageOptions: {
        tr: "التركية",
        de: "الألمانية",
        en: "الإنجليزية",
        ar: "العربية",
        other: "لغة أخرى"
      },
      moduleOptions: {
        contact: "نموذج تواصل",
        blog: "مدونة / محتوى",
        commerce: "متجر إلكتروني",
        accounts: "نظام عضويات",
        admin: "لوحة إدارة"
      }
    };
  }

  return {
    ctaTitle: "Get 15% off",
    ctaLink: "Fill out the form",
    ctaText: " and see your project-specific pricing advantage.",
    toggle: "View discounted prices",
    active: "Discount active",
    formTitle: "Prices are fixed. Leave your details for a possible discount and clearer scope definition.",
    formText: "We will do a short pre-analysis and come back with the most suitable solution.",
    advantage: "A special pricing advantage may be applied to projects that complete the form.",
    contactTitle: "Contact details",
    purposeTitle: "What is the goal of your project?",
    optionalTitle: "Optional project details",
    helper: "Adding more detail helps us suggest a more accurate price and solution.",
    name: "Full name",
    company: "Company",
    email: "Email",
    websiteType: "Website type",
    traffic: "Estimated traffic",
    pageCount: "Page count",
    languages: "Languages",
    modules: "Required modules",
    noteLabel: "Special requests",
    notePlaceholder: "Briefly describe what you need",
    pickOne: "Choose",
    submit: "Send mail",
    normalResult: "Your selections look compatible with our current package structure. We can prepare the matching inquiry email.",
    customResult: "The package prices do not seem suitable for your system. A custom quote is being planned for you. Send the email?",
    purposeOptions: {
      leads: "Generate new customers",
      image: "Corporate presence",
      refresh: "Refresh an existing site",
      pricing: "Just get pricing"
    },
    sections: {
      corporate: "Corporate",
      commerce: "E-commerce",
      app: "Web application"
    },
    trafficOptions: {
      low: "0 – 1,000",
      medium: "1,000 – 10,000",
      high: "10,000+"
    },
    pageOptions: {
      small: "1–3",
      standard: "3–7",
      large: "7+"
    },
    languageOptions: {
      tr: "Turkish",
      de: "German",
      en: "English",
      ar: "Arabic",
      other: "Other language"
    },
    moduleOptions: {
      contact: "Contact form",
      blog: "Blog / content",
      commerce: "E-commerce",
      accounts: "Membership system",
      admin: "Admin panel"
    }
  };
}

export function PricingSection({
  locale,
  packages,
  revisions,
  pricingUi,
  revisionUi,
  contactEmail
}: PricingSectionProps) {
  const formUi = getFormUi(locale);
  const [showDiscount, setShowDiscount] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showOptional, setShowOptional] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    projectPurpose: "",
    websiteType: "",
    traffic: "",
    pageCount: "",
    languages: [] as string[],
    modules: [] as string[],
    note: ""
  });

  const maxFeatureCount = Math.max(...packages.map((pkg) => pkg.features.length));

  const pricingRows = useMemo(
    () => [
      {
        label: locale === "tr" ? "Fiyat" : locale === "de" ? "Preis" : locale === "ar" ? "السعر" : "Price",
        values: packages.map((pkg) => {
          const priceState = discountedPrice(pkg.price, locale);
          return showDiscount ? priceState : priceState.original;
        })
      },
      {
        label: locale === "tr" ? "Özet" : locale === "de" ? "Zusammenfassung" : locale === "ar" ? "الملخص" : "Summary",
        values: packages.map((pkg) => pkg.summary)
      },
      ...Array.from({ length: maxFeatureCount }, (_, index) => ({
        label:
          locale === "tr"
            ? `Kapsam ${index + 1}`
            : locale === "de"
              ? `Leistung ${index + 1}`
              : locale === "ar"
                ? `الميزة ${index + 1}`
                : `Feature ${index + 1}`,
        values: packages.map((pkg) => pkg.features[index] ?? "—")
      }))
    ],
    [locale, maxFeatureCount, packages, showDiscount]
  );

  const toggleArrayValue = (field: "languages" | "modules", value: string) => {
    setFormData((current) => ({
      ...current,
      [field]: current[field].includes(value)
        ? current[field].filter((item) => item !== value)
        : [...current[field], value]
    }));
  };

  const isCustomFlow =
    formData.websiteType === "app" ||
    formData.modules.includes("commerce") ||
    formData.modules.includes("accounts") ||
    formData.modules.includes("admin") ||
    formData.traffic === "high" ||
    /entegrasyon|crm|erp|api|özel|rezervasyon|pazar yeri|chatbot|otomasyon|mobil|uygulama|integration|custom/i.test(
      formData.note
    );

  const isReadyForResult =
    Boolean(formData.name.trim()) &&
    Boolean(formData.company.trim()) &&
    Boolean(formData.email.trim()) &&
    isEmailValid(formData.email.trim()) &&
    Boolean(formData.projectPurpose);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isReadyForResult) {
      return;
    }

    const safeName = sanitizeSingleLine(formData.name, 80).trim();
    const safeCompany = sanitizeSingleLine(formData.company, 100).trim();
    const safeEmail = sanitizeSingleLine(formData.email, 120).trim();
    const safeNote = sanitizeMultiLine(formData.note, 1200).trim();
    const subject =
      locale === "tr"
        ? isCustomFlow
          ? "Özel fiyat teklifi talebi"
          : "Paket uyumlu teklif talebi"
        : locale === "de"
          ? isCustomFlow
            ? "Anfrage für individuelles Angebot"
            : "Anfrage für passendes Paketangebot"
          : locale === "ar"
            ? isCustomFlow
              ? "طلب عرض سعر مخصص"
              : "طلب عرض مناسب للباقة"
            : isCustomFlow
              ? "Custom quote request"
              : "Package-compatible quote request";

    const body = [
      `${formUi.name}: ${safeName}`,
      `${formUi.company}: ${safeCompany}`,
      `${formUi.email}: ${safeEmail}`,
      `${formUi.purposeTitle}: ${
        formData.projectPurpose
          ? formUi.purposeOptions[formData.projectPurpose as keyof typeof formUi.purposeOptions] ?? formData.projectPurpose
          : "-"
      }`,
      `${formUi.websiteType}: ${formData.websiteType
        ? formUi.sections[formData.websiteType as keyof typeof formUi.sections] ?? formData.websiteType
        : "-"}`,
      `${formUi.traffic}: ${formData.traffic
        ? formUi.trafficOptions[formData.traffic as keyof typeof formUi.trafficOptions] ?? formData.traffic
        : "-"}`,
      `${formUi.pageCount}: ${formData.pageCount
        ? formUi.pageOptions[formData.pageCount as keyof typeof formUi.pageOptions] ?? formData.pageCount
        : "-"}`,
      `${formUi.languages}: ${translateList(formData.languages, formUi.languageOptions)}`,
      `${formUi.modules}: ${translateList(formData.modules, formUi.moduleOptions)}`,
      `${formUi.noteLabel}: ${safeNote || "-"}`
    ].join("\n");

    window.location.assign(`mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  return (
    <section id="pricing" className="home-pricing-band">
      <div className="home-pricing-shell">
        <div className="home-pricing-head">
          <div className="home-pricing-copy">
            <p className="home-pricing-kicker">{pricingUi.kicker}</p>
            <h2>{pricingUi.title}</h2>
            <p>{pricingUi.text}</p>
          </div>

          <div className="home-pricing-top-actions">
            <button
              type="button"
              className={`home-pricing-toggle home-pricing-toggle-compact ${showDiscount ? "is-active" : ""}`}
              onClick={() => setShowDiscount((current) => !current)}
              aria-pressed={showDiscount}
            >
              <span>{showDiscount ? formUi.active : formUi.toggle}</span>
              <span className="home-pricing-toggle-switch" aria-hidden="true">
                <span className="home-pricing-toggle-knob" />
              </span>
            </button>
          </div>
        </div>

        <div className="home-pricing-grid">
          <div className="home-pricing-table-wrap">
            <table className="home-pricing-table">
              <thead>
                <tr>
                  <th>{locale === "tr" ? "Paket" : locale === "de" ? "Paket" : locale === "ar" ? "الباقة" : "Package"}</th>
                  {packages.map((pkg) => (
                    <th key={pkg.name} className={pkg.highlighted ? "is-highlighted" : ""}>
                      {pkg.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pricingRows.map((row) => (
                  <tr key={row.label}>
                    <td className="home-pricing-row-label">{row.label}</td>
                    {row.values.map((value, index) => (
                      <td
                        key={`${row.label}-${packages[index]?.name}`}
                        className={`${packages[index]?.highlighted ? "is-highlighted " : ""}${
                          row.label === (locale === "tr" ? "Fiyat" : locale === "de" ? "Preis" : locale === "ar" ? "السعر" : "Price") ? "is-price" : ""
                        }`.trim()}
                      >
                        {typeof value === "object" && value !== null && "original" in value ? (
                          <span className="home-price-stack">
                            <span className="home-price-current">{value.current}</span>
                            <span className="home-price-badge">{value.badge}</span>
                            <span className="home-price-old">{value.original}</span>
                          </span>
                        ) : (
                          value
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="home-pricing-table-wrap home-pricing-table-wrap-secondary">
            <div className="home-pricing-subcopy">
              <h3>{revisionUi.title}</h3>
              <p>{revisionUi.text}</p>
            </div>

            <table className="home-pricing-table home-pricing-table-secondary">
              <thead>
                <tr>
                  <th>{locale === "tr" ? "İşlem" : locale === "de" ? "Leistung" : locale === "ar" ? "الخدمة" : "Service"}</th>
                  <th>{locale === "tr" ? "Fiyat" : locale === "de" ? "Preis" : locale === "ar" ? "السعر" : "Price"}</th>
                </tr>
              </thead>
              <tbody>
                {revisions.map((row) => (
                  <tr key={row.label}>
                    <td>{row.label}</td>
                    <td className="is-price">{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="home-pricing-cta">
          <h3>{formUi.ctaTitle}</h3>
          <p>
            <button type="button" className="home-pricing-form-link" onClick={() => setShowForm((current) => !current)}>
              {formUi.ctaLink}
            </button>
            {formUi.ctaText}
          </p>

          <button
            type="button"
            className={`home-pricing-toggle ${showDiscount ? "is-active" : ""}`}
            onClick={() => setShowDiscount((current) => !current)}
            aria-pressed={showDiscount}
          >
            <span>{showDiscount ? formUi.active : formUi.toggle}</span>
            <span className="home-pricing-toggle-switch" aria-hidden="true">
              <span className="home-pricing-toggle-knob" />
            </span>
          </button>

          <div className={`home-inline-discount-panel ${showForm ? "is-open" : ""}`} aria-hidden={!showForm}>
            <div className="home-inline-discount-panel-inner">
              <h4 className="home-form-intro-title" id="discount-form-title">
                {formUi.formTitle}
              </h4>
              <p className="home-form-intro-text">{formUi.formText}</p>

              <form className="home-brief-form" onSubmit={handleSubmit} noValidate>
                <p className="home-brief-form-note">{formUi.advantage}</p>

                <section className="home-brief-section">
                  <div className="home-brief-section-head">
                    <h5>{formUi.contactTitle}</h5>
                  </div>
                  <div className="home-brief-grid home-brief-grid-3">
                    <input
                      type="text"
                      placeholder={formUi.name}
                      value={formData.name}
                      onChange={(event) =>
                        setFormData((current) => ({ ...current, name: sanitizeSingleLine(event.target.value, 80) }))
                      }
                      autoComplete="name"
                      minLength={2}
                      maxLength={80}
                      required
                    />
                    <input
                      type="text"
                      placeholder={formUi.company}
                      value={formData.company}
                      onChange={(event) =>
                        setFormData((current) => ({ ...current, company: sanitizeSingleLine(event.target.value, 100) }))
                      }
                      autoComplete="organization"
                      minLength={2}
                      maxLength={100}
                      required
                    />
                    <input
                      type="email"
                      placeholder={formUi.email}
                      value={formData.email}
                      onChange={(event) =>
                        setFormData((current) => ({ ...current, email: sanitizeSingleLine(event.target.value, 120) }))
                      }
                      autoComplete="email"
                      inputMode="email"
                      maxLength={120}
                      required
                    />
                  </div>
                </section>

                <section className="home-brief-section">
                  <div className="home-brief-section-head">
                    <h5>{formUi.purposeTitle}</h5>
                  </div>
                  <div className="home-brief-grid home-brief-grid-purpose">
                    {Object.entries(formUi.purposeOptions).map(([value, label]) => (
                      <label key={value} className={`home-brief-choice ${formData.projectPurpose === value ? "is-selected" : ""}`}>
                        <input
                          type="radio"
                          name="projectPurpose"
                          checked={formData.projectPurpose === value}
                          onChange={() => setFormData((current) => ({ ...current, projectPurpose: value }))}
                        />
                        <span>{label}</span>
                      </label>
                    ))}
                  </div>
                </section>

                <section className="home-brief-section home-brief-section-optional">
                  <button
                    type="button"
                    className={`home-brief-toggle ${showOptional ? "is-open" : ""}`}
                    onClick={() => setShowOptional((current) => !current)}
                    aria-expanded={showOptional}
                  >
                    <span>{formUi.optionalTitle}</span>
                    <span className="home-brief-toggle-icon" aria-hidden="true">
                      {showOptional ? "−" : "+"}
                    </span>
                  </button>

                  <div className={`home-brief-panel ${showOptional ? "is-open" : ""}`}>
                    <div className="home-brief-grid home-brief-grid-3">
                      <label className="home-brief-field">
                        <span>{formUi.websiteType}</span>
                        <select
                          value={formData.websiteType}
                          onChange={(event) => setFormData((current) => ({ ...current, websiteType: event.target.value }))}
                        >
                          <option value="">{formUi.pickOne}</option>
                          {Object.entries(formUi.sections).map(([value, label]) => (
                            <option key={value} value={value}>
                              {label}
                            </option>
                          ))}
                        </select>
                      </label>

                      <label className="home-brief-field">
                        <span>{formUi.traffic}</span>
                        <select
                          value={formData.traffic}
                          onChange={(event) => setFormData((current) => ({ ...current, traffic: event.target.value }))}
                        >
                          <option value="">{formUi.pickOne}</option>
                          {Object.entries(formUi.trafficOptions).map(([value, label]) => (
                            <option key={value} value={value}>
                              {label}
                            </option>
                          ))}
                        </select>
                      </label>

                      <label className="home-brief-field">
                        <span>{formUi.pageCount}</span>
                        <select
                          value={formData.pageCount}
                          onChange={(event) => setFormData((current) => ({ ...current, pageCount: event.target.value }))}
                        >
                          <option value="">{formUi.pickOne}</option>
                          {Object.entries(formUi.pageOptions).map(([value, label]) => (
                            <option key={value} value={value}>
                              {label}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>

                    <div className="home-brief-grid home-brief-grid-2">
                      <section className="home-brief-subsection">
                        <h6>{formUi.languages}</h6>
                        <div className="home-brief-chipset">
                          {Object.entries(formUi.languageOptions).map(([value, label]) => (
                            <label key={value} className={`home-brief-chip ${formData.languages.includes(value) ? "is-selected" : ""}`}>
                              <input
                                type="checkbox"
                                checked={formData.languages.includes(value)}
                                onChange={() => toggleArrayValue("languages", value)}
                              />
                              <span>{label}</span>
                            </label>
                          ))}
                        </div>
                      </section>

                      <section className="home-brief-subsection">
                        <h6>{formUi.modules}</h6>
                        <div className="home-brief-chipset">
                          {Object.entries(formUi.moduleOptions).map(([value, label]) => (
                            <label key={value} className={`home-brief-chip ${formData.modules.includes(value) ? "is-selected" : ""}`}>
                              <input
                                type="checkbox"
                                checked={formData.modules.includes(value)}
                                onChange={() => toggleArrayValue("modules", value)}
                              />
                              <span>{label}</span>
                            </label>
                          ))}
                        </div>
                      </section>
                    </div>

                    <label className="home-brief-field">
                      <span>{formUi.noteLabel}</span>
                      <textarea
                        placeholder={formUi.notePlaceholder}
                        value={formData.note}
                        onChange={(event) =>
                          setFormData((current) => ({ ...current, note: sanitizeMultiLine(event.target.value, 1200) }))
                        }
                        maxLength={1200}
                        rows={5}
                      />
                    </label>
                  </div>
                </section>

                <section className="home-brief-footer">
                  <p className="home-brief-helper">{formUi.helper}</p>
                  {isReadyForResult ? (
                    <div className={`home-brief-result ${isCustomFlow ? "is-custom" : ""}`}>
                      <p>{isCustomFlow ? formUi.customResult : formUi.normalResult}</p>
                      <button type="submit">{formUi.submit}</button>
                    </div>
                  ) : (
                    <button type="submit" className="home-brief-submit" disabled>
                      {formUi.submit}
                    </button>
                  )}
                </section>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
