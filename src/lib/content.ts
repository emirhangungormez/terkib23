import type { Locale } from "./i18n";

type NavItem = {
  label: string;
  href: string;
};

export type PackageItem = {
  name: string;
  price: string;
  summary: string;
  features: string[];
  example?: string;
  highlighted?: boolean;
};

export type RevisionItem = {
  label: string;
  price: string;
};

export type ReferenceItem = {
  title: string;
  sector: string;
  market: string;
  summary: string;
  href?: string;
  image?: string;
};

export type SiteContent = {
  meta: {
    title: string;
    description: string;
  };
  nav: NavItem[];
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primary: string;
    secondary: string;
    proof: string[];
  };
  sections: {
    servicesTitle: string;
    servicesIntro: string;
    services: string[];
    technologyTitle: string;
    technologyIntro: string;
    technologies: string[];
    processTitle: string;
    processIntro: string;
    process: string[];
    finalTitle: string;
    finalText: string;
    finalCta: string;
  };
  packagesPage: {
    title: string;
    intro: string;
    note: string;
    packages: PackageItem[];
    revisions: RevisionItem[];
  };
  referencesPage: {
    title: string;
    intro: string;
    emptyTitle: string;
    emptyText: string;
    references: ReferenceItem[];
  };
  contact: {
    label: string;
    email: string;
  };
};

const packageTemplate: Record<Locale, PackageItem[]> = {
  tr: [
    {
      name: "Landing Page (Tek Sayfa)",
      price: "500 €",
      summary: "Tek hizmet ya da marka anlatımı için modern tasarımlı, mobil uyumlu ve hızlı tek sayfa site.",
      features: ["Tek sayfa yapı", "Mobil uyumlu arayüz", "Temel SEO altyapısı", "Hızlı açılış"],
      example: "beratung-ipek.de"
    },
    {
      name: "Multi-Page (Çok Sayfalı)",
      price: "650 €",
      summary: "Anasayfa, hakkımızda, hizmetler ve iletişim akışıyla 5-6 sayfalı kurumsal site yapısı.",
      highlighted: true,
      features: ["5-6 sayfa yapı", "Mobil uyumlu arayüz", "Düzenli içerik akışı", "İletişim formu", "Galeri veya referans alanı"],
      example: "betamarinsaat.com"
    },
    {
      name: "Dinamik Site (Yönetim Panelli)",
      price: "850 €",
      summary: "Yönetim paneli üzerinden metinleri, görselleri ve temel sayfa içeriklerini sonradan kendiniz güncelleyebileceğiniz site.",
      features: [
        "Talep edilen sayfa sayısına göre yapı",
        "Mobil uyumlu arayüz",
        "İletişim formu",
        "Yönetim paneli",
        "Metin ve görsel güncelleme",
        "Ölçeklenebilirlik",
        "Güvenlik yapıları ve şifre koruma"
      ],
      example: "dhcicekcim.com"
    }
  ],
  de: [
    {
      name: "Landing Page",
      price: "500 €",
      summary: "Eine fokussierte One-Page-Website mit modernem Design, responsiver Darstellung und schneller Ladezeit.",
      features: ["Einzelseiten-Struktur", "Responsive Oberfläche", "Basis-SEO-Struktur", "Schneller Start"],
      example: "beratung-ipek.de"
    },
    {
      name: "Multi-Page",
      price: "650 €",
      summary: "Mehrseitige Website mit Startseite, Über uns, Leistungen und Kontakt auf bis zu 5-6 Seiten.",
      highlighted: true,
      features: ["5-6 Seiten", "Responsive Oberfläche", "Klare Inhaltsstruktur", "Kontaktformular", "Galerie oder Referenzbereich"],
      example: "betamarinsaat.com"
    },
    {
      name: "Dynamische Website",
      price: "850 €",
      summary: "Website mit Administrationsbereich, damit Texte, Bilder und zentrale Seiteninhalte später eigenständig gepflegt werden können.",
      features: [
        "Flexible Struktur mit 5-8 Seiten",
        "Responsive Oberfläche",
        "Kontaktformular",
        "Admin-Panel",
        "Text- und Bildbearbeitung",
        "Erweiterbare Inhaltsstruktur"
      ],
      example: "dhcicekcim.com"
    }
  ],
  en: [
    {
      name: "Landing Page",
      price: "500 €",
      summary: "A focused one-page website with modern design, responsive layout and fast loading.",
      features: ["Single-page structure", "Responsive interface", "Basic SEO setup", "Fast launch"],
      example: "beratung-ipek.de"
    },
    {
      name: "Multi-Page",
      price: "650 €",
      summary: "A multi-page site with Home, About, Services and Contact across up to 5-6 pages.",
      highlighted: true,
      features: ["5-6 page structure", "Responsive interface", "Clear content flow", "Contact form", "Gallery or references section"],
      example: "betamarinsaat.com"
    },
    {
      name: "Dynamic Site",
      price: "850 €",
      summary: "A website with an admin panel that lets you update text, visuals and core page content on your own later on.",
      features: [
        "Flexible 5-8 page structure",
        "Responsive interface",
        "Contact form",
        "Admin panel",
        "Text and visual updates",
        "Expandable content structure"
      ],
      example: "dhcicekcim.com"
    }
  ],
  ar: [
    {
      name: "صفحة هبوط",
      price: "500 €",
      summary: "موقع من صفحة واحدة بتصميم حديث وواجهة متجاوبة وسرعة تحميل عالية.",
      features: ["هيكل صفحة واحدة", "واجهة متجاوبة", "أساسيات SEO", "إطلاق سريع"]
    },
    {
      name: "موقع متعدد الصفحات",
      price: "650 €",
      summary: "موقع متعدد الصفحات يشمل الرئيسية ومن نحن والخدمات والتواصل حتى 5-6 صفحات.",
      highlighted: true,
      features: ["هيكل 5-6 صفحات", "واجهة متجاوبة", "تدفق محتوى واضح", "نموذج تواصل", "معرض أو قسم مراجع"]
    },
    {
      name: "موقع ديناميكي",
      price: "850 €",
      summary: "موقع مع لوحة إدارة يتيح لكم تعديل النصوص والصور والمحتوى الأساسي للصفحات لاحقاً بأنفسكم.",
      features: [
        "هيكل مرن من 5-8 صفحات",
        "واجهة متجاوبة",
        "نموذج تواصل",
        "لوحة إدارة",
        "تعديل النصوص والصور",
        "بنية محتوى قابلة للتوسع"
      ]
    }
  ]
};

const revisionTemplate: Record<Locale, RevisionItem[]> = {
  tr: [
    { label: "İçerik revizesi", price: "50 €" },
    { label: "Yapısal ekleme", price: "75 €" },
    { label: "Tam güncelleme paketi", price: "100 €" }
  ],
  de: [
    { label: "Inhaltsrevision", price: "50 €" },
    { label: "Strukturelle Ergänzung", price: "75 €" },
    { label: "Komplett-Update-Paket", price: "100 €" }
  ],
  en: [
    { label: "Content revision", price: "50 €" },
    { label: "Structural addition", price: "75 €" },
    { label: "Full update package", price: "100 €" }
  ],
  ar: [
    { label: "تعديل المحتوى", price: "50 €" },
    { label: "إضافة هيكلية", price: "75 €" },
    { label: "باقة تحديث كاملة", price: "100 €" }
  ]
};

export const content: Record<Locale, SiteContent> = {
  tr: {
    meta: {
      title: "Terkib23 | Çok Dilli Web Ajansı",
      description: "Türkiye ve Avrupa için çok dilli, hızlı ve profesyonel web siteleri."
    },
    nav: [
      { label: "Paketler", href: "/packages/" },
      { label: "Referanslar", href: "/references/" },
      { label: "İletişim", href: "#footer" }
    ],
    hero: {
      eyebrow: "Türkiye ve Avrupa için web üretimi",
      title: "terkib23",
      subtitle: "Çok dilli, hızlı ve profesyonel web sitelerini tasarım sistemi disipliniyle kuruyoruz.",
      primary: "Teklif Al",
      secondary: "Paketleri Gör",
      proof: ["TR / DE / EN / AR", "Türkiye ve Avrupa sunucuları", "AI destekli üretim"]
    },
    sections: {
      servicesTitle: "Net kapsam, temiz teslim",
      servicesIntro: "Tanıtım sitelerini, dil yapısını ve yayın sürecini tek akışta yönetiyoruz.",
      services: ["Çok dilli web sitesi", "Tanıtım sayfaları", "Paket ve referans yapısı", "Bakım ve yayın desteği"],
      technologyTitle: "Kendi sistemimizle üretim",
      technologyIntro: "Tekrar kullanılabilir arayüz blokları, hızlı statik yayın ve AI destekli içerik üretimi.",
      technologies: ["Next.js", "TypeScript", "Tasarım kütüphanesi", "SEO altyapısı", "Cloudflare Pages", "AI destekli süreç"],
      processTitle: "Profesyonel süreç",
      processIntro: "Keşiften yayına kadar kararlar, içerik ve teslim planı net tutulur.",
      process: ["Keşif", "Teklif", "Tasarım", "Geliştirme", "Yayın", "Destek"],
      finalTitle: "Yeni sitenizi sade ve güçlü kuralım.",
      finalText: "İlk görüşmede kapsamı, dili, yayın hedefini ve paket ihtiyacını netleştiriyoruz.",
      finalCta: "İletişime Geç"
    },
    packagesPage: {
      title: "Web Sitesi Hizmeti Fiyat Listesi",
      intro: "Türkçe PDF fiyat listesine göre güncellendi. Aşağıda web sitesi paketleri için başlangıç fiyatları yer alır.",
      note: "Güncelleme ve revize fiyatları: içerik revizesi 50 €, yapısal ekleme 75 €, tam güncelleme paketi 100 €.",
      packages: packageTemplate.tr,
      revisions: revisionTemplate.tr
    },
    referencesPage: {
      title: "Referanslar",
      intro: "Tamamlanan işler burada sektör, pazar ve dil kapsamıyla listelenir.",
      emptyTitle: "Referans alanı hazır",
      emptyText: "Proje isimleri, bağlantılar ve görseller paylaşıldığında bu sayfa doğrudan doldurulabilir.",
      references: []
    },
    contact: {
      label: "han23studio@gmail.com",
      email: "han23studio@gmail.com"
    }
  },
  de: {
    meta: {
      title: "Terkib23 | Mehrsprachige Webagentur",
      description: "Mehrsprachige, schnelle und professionelle Websites für die Türkei und Europa."
    },
    nav: [
      { label: "Pakete", href: "/packages/" },
      { label: "Referenzen", href: "/references/" },
      { label: "Kontakt", href: "#footer" }
    ],
    hero: {
      eyebrow: "Webproduktion für die Türkei und Europa",
      title: "terkib23",
      subtitle: "Wir entwickeln mehrsprachige Websites mit klarer Struktur, eigenem Designsystem und professionellem Launch.",
      primary: "Anfragen",
      secondary: "Pakete ansehen",
      proof: ["TR / DE / EN / AR", "Server in der Türkei und in Europa", "KI-gestützte Produktion"]
    },
    sections: {
      servicesTitle: "Klarer Umfang, saubere Übergabe",
      servicesIntro: "Wir verbinden Website, Sprachstruktur und Veröffentlichung in einem ruhigen Prozess.",
      services: ["Mehrsprachige Websites", "Präsentationsseiten", "Pakete und Referenzen", "Wartung und Launch-Support"],
      technologyTitle: "Produktion mit eigenem System",
      technologyIntro: "Wiederverwendbare UI-Bausteine, schnelle statische Auslieferung und KI-gestützte Inhalte.",
      technologies: ["Next.js", "TypeScript", "Designbibliothek", "SEO-Struktur", "Cloudflare Pages", "KI-Prozess"],
      processTitle: "Professioneller Ablauf",
      processIntro: "Von der Erstklärung bis zum Launch bleiben Entscheidungen, Inhalte und Übergabe transparent.",
      process: ["Discovery", "Angebot", "Design", "Entwicklung", "Launch", "Support"],
      finalTitle: "Ihre neue Website: klar, schnell und mehrsprachig.",
      finalText: "Im ersten Gespräch klären wir Umfang, Sprache, Hosting und Paketbedarf.",
      finalCta: "Kontakt aufnehmen"
    },
    packagesPage: {
      title: "Website-Preisübersicht",
      intro: "Nach der PDF-Preisliste aktualisiert. Unten sehen Sie die Einstiegspreise der Website-Pakete.",
      note: "Update- und Revisionspreise: Inhaltsrevision 50 €, strukturelle Ergänzung 75 €, Komplett-Update-Paket 100 €.",
      packages: packageTemplate.de,
      revisions: revisionTemplate.de
    },
    referencesPage: {
      title: "Referenzen",
      intro: "Abgeschlossene Projekte werden hier nach Branche, Markt und Sprachumfang gezeigt.",
      emptyTitle: "Referenzbereich ist vorbereitet",
      emptyText: "Sobald Projektnamen, Links und Bilder vorliegen, kann diese Seite direkt gefüllt werden.",
      references: []
    },
    contact: {
      label: "han23studio@gmail.com",
      email: "han23studio@gmail.com"
    }
  },
  en: {
    meta: {
      title: "Terkib23 | Multilingual Web Agency",
      description: "Fast, multilingual and professional websites for Turkey and Europe."
    },
    nav: [
      { label: "Packages", href: "/packages/" },
      { label: "References", href: "/references/" },
      { label: "Contact", href: "#footer" }
    ],
    hero: {
      eyebrow: "Web production for Turkey and Europe",
      title: "terkib23",
      subtitle: "We build multilingual websites with a disciplined design system, fast delivery and a professional launch flow.",
      primary: "Request Offer",
      secondary: "View Packages",
      proof: ["TR / DE / EN / AR", "Turkey and Europe servers", "AI-assisted production"]
    },
    sections: {
      servicesTitle: "Clear scope, clean delivery",
      servicesIntro: "Websites, language structure and launch work are handled in one focused process.",
      services: ["Multilingual websites", "Presentation pages", "Packages and references", "Care and launch support"],
      technologyTitle: "Built with our own system",
      technologyIntro: "Reusable interface blocks, fast static delivery and AI-assisted content workflows.",
      technologies: ["Next.js", "TypeScript", "Design library", "SEO foundation", "Cloudflare Pages", "AI workflow"],
      processTitle: "Professional process",
      processIntro: "From discovery to launch, scope, content and delivery stay clear.",
      process: ["Discovery", "Offer", "Design", "Development", "Launch", "Support"],
      finalTitle: "A quieter, stronger website for your work.",
      finalText: "The first call defines scope, language, hosting target and package needs.",
      finalCta: "Contact"
    },
    packagesPage: {
      title: "Website Service Price List",
      intro: "Updated from the PDF price sheet. The website package starting prices are shown below.",
      note: "Update and revision pricing: content revision 50 €, structural addition 75 €, full update package 100 €.",
      packages: packageTemplate.en,
      revisions: revisionTemplate.en
    },
    referencesPage: {
      title: "References",
      intro: "Completed work will be listed here by sector, market and language scope.",
      emptyTitle: "Reference area is ready",
      emptyText: "Once project names, links and images are provided, this page can be filled without structural changes.",
      references: []
    },
    contact: {
      label: "han23studio@gmail.com",
      email: "han23studio@gmail.com"
    }
  },
  ar: {
    meta: {
      title: "Terkib23 | وكالة مواقع متعددة اللغات",
      description: "مواقع سريعة واحترافية متعددة اللغات لتركيا وأوروبا."
    },
    nav: [
      { label: "الباقات", href: "/packages/" },
      { label: "المراجع", href: "/references/" },
      { label: "تواصل", href: "#footer" }
    ],
    hero: {
      eyebrow: "إنتاج مواقع لتركيا وأوروبا",
      title: "terkib23",
      subtitle: "نبني مواقع متعددة اللغات بنظام تصميم واضح، وتسليم سريع، ومسار نشر احترافي.",
      primary: "اطلب عرضاً",
      secondary: "عرض الباقات",
      proof: ["TR / DE / EN / AR", "خوادم في تركيا وأوروبا", "إنتاج مدعوم بالذكاء الاصطناعي"]
    },
    sections: {
      servicesTitle: "نطاق واضح وتسليم نظيف",
      servicesIntro: "نربط الموقع وبنية اللغات والنشر ضمن مسار واحد منظم.",
      services: ["مواقع متعددة اللغات", "صفحات تعريفية", "باقات ومراجع", "دعم النشر والصيانة"],
      technologyTitle: "إنتاج بنظامنا الخاص",
      technologyIntro: "مكونات واجهة قابلة لإعادة الاستخدام، نشر ثابت سريع، ومحتوى مدعوم بالذكاء الاصطناعي.",
      technologies: ["Next.js", "TypeScript", "مكتبة تصميم", "بنية SEO", "Cloudflare Pages", "مسار AI"],
      processTitle: "مسار احترافي",
      processIntro: "من الاكتشاف إلى النشر تبقى القرارات والمحتوى والتسليم واضحة.",
      process: ["اكتشاف", "عرض", "تصميم", "تطوير", "نشر", "دعم"],
      finalTitle: "لننشئ موقعاً واضحاً وقوياً لكم.",
      finalText: "في الاتصال الأول نحدد النطاق واللغة وهدف النشر والباقات المناسبة.",
      finalCta: "تواصل معنا"
    },
    packagesPage: {
      title: "قائمة أسعار خدمات المواقع",
      intro: "تم تحديثها وفق ملف PDF. أسعار البداية لباقات المواقع موضحة أدناه.",
      note: "أسعار التحديث والمراجعة: تعديل المحتوى 50 €، إضافة هيكلية 75 €، باقة تحديث كاملة 100 €.",
      packages: packageTemplate.ar,
      revisions: revisionTemplate.ar
    },
    referencesPage: {
      title: "المراجع",
      intro: "سيتم عرض الأعمال المنجزة حسب القطاع والسوق ونطاق اللغة.",
      emptyTitle: "قسم المراجع جاهز",
      emptyText: "عند توفير أسماء المشاريع والروابط والصور يمكن تعبئة الصفحة مباشرة.",
      references: []
    },
    contact: {
      label: "han23studio@gmail.com",
      email: "han23studio@gmail.com"
    }
  }
};
