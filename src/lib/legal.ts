import type { Locale } from "@/lib/i18n";

type LegalSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

type LegalDocument = {
  title: string;
  description: string;
  updatedAt: string;
  sections: LegalSection[];
};

type CookieBannerCopy = {
  title: string;
  text: string;
  acceptAll: string;
  necessaryOnly: string;
  learnMore: string;
};

type LegalUi = {
  footerGroup: string;
  privacyLabel: string;
  cookieLabel: string;
  privacy: LegalDocument;
  cookies: LegalDocument;
  banner: CookieBannerCopy;
};

export const legalContent: Record<Locale, LegalUi> = {
  tr: {
    footerGroup: "Yasal",
    privacyLabel: "Gizlilik ve Veri Koruma",
    cookieLabel: "Çerez Politikası",
    banner: {
      title: "Çerez tercihleri",
      text: "Bu sürümde yalnızca sitenin çalışması ve tercih kaydınızın saklanması için gerekli teknik depolama kullanılmaktadır. Analitik, reklam veya Google benzeri isteğe bağlı izleme teknolojileri varsayılan olarak etkin değildir.",
      acceptAll: "Tamam",
      necessaryOnly: "Sadece gerekli",
      learnMore: "Çerez politikasını aç"
    },
    privacy: {
      title: "Gizlilik ve Veri Koruma Bildirimi",
      description: "Bu metin, siteyi ziyaret ettiğinizde işlenebilecek temel kişisel veriler, bunların neden işlendiği, kimlerle paylaşılabileceği ve hangi temel haklara sahip olabileceğiniz hakkında kısa bilgi verir.",
      updatedAt: "23 Nisan 2026",
      sections: [
        {
          title: "Veri sorumlusu",
          paragraphs: [
            "Bu internet sitesi Terkib23 adıyla yayınlanır ve site üzerindeki temel veri işleme kararları siteyi işleten kişi veya ekip tarafından alınır.",
            "Kişisel verilerinizle ilgili sorularınızı ve temel hak kullanım taleplerinizi han23studio@gmail.com adresine iletebilirsiniz."
          ]
        },
        {
          title: "Kapsam ve işlenen veri kategorileri",
          bullets: [
            "Doğrudan paylaştığınız veriler: ad, e-posta adresi ve mesaj içeriği",
            "Teknik erişim verileri: IP adresi, istek zamanı, user-agent ve temel güvenlik/hata kayıtları",
            "Tercih verileri: çerez bannerı seçiminizi tutan `terkib23_cookie_choice_v1` kaydı"
          ]
        },
        {
          title: "İşleme amaçları ve hukuki sebepler",
          bullets: [
            "İletişim taleplerini yanıtlamak",
            "Sitenin güvenliğini ve teknik işleyişini sağlamak",
            "Tercih kaydınızı hatırlamak",
            "Gerekirse hukuki yükümlülükleri yerine getirmek ve hakları korumak"
          ]
        },
        {
          title: "Google ve benzeri araçlar",
          paragraphs: [
            "Mevcut kod incelemesinde Google Analytics, Google Ads, Tag Manager, Meta Pixel, Hotjar, Clarity, YouTube veya Maps gibi ziyaretçi izleme araçları tespit edilmemiştir.",
            "`next/font/google` kullanımı ise Next.js tarafından self-host edildiği için ziyaretçi tarayıcısından Google’a doğrudan font isteği gönderilmesi beklenmez."
          ]
        },
        {
          title: "Paylaşım ve aktarım",
          bullets: [
            "Barındırma, güvenlik, altyapı veya e-posta hizmeti sağlayıcıları",
            "Yetkili kamu kurumları ve hukuken yetkili merciler",
            "Açtığınız harici platformlar kendi kurallarına göre veri işleyebilir"
          ]
        },
        {
          title: "Saklama süresi",
          paragraphs: [
            "İletişim verileri yalnızca gerekli olduğu süre boyunca tutulur.",
            "Teknik kayıtlar güvenlik ve hata takibi için sınırlı süreyle saklanır.",
            "Tercih kaydı siz silene kadar tarayıcınızda kalabilir."
          ]
        },
        {
          title: "Haklarınız",
          bullets: [
            "Erişim, düzeltme, silme, itiraz ve benzeri yasal haklarınız olabilir",
            "Başvurularınızı han23studio@gmail.com adresine iletebilirsiniz"
          ]
        }
      ]
    },
    cookies: {
      title: "Çerez Politikası",
      description: "Bu politika, sitede kullanılan gerekli çerez ve benzeri tercih kayıtları hakkında temel bilgi verir.",
      updatedAt: "23 Nisan 2026",
      sections: [
        {
          title: "Kapsam",
          paragraphs: ["Bu sayfada çerezler ve benzeri tarayıcı içi tercih kayıtları hakkında temel bilgi yer alır."]
        },
        {
          title: "Aktif olan kayıtlar",
          bullets: [
            "`terkib23_cookie_choice_v1`: çerez bannerı seçiminizi hatırlamak için kullanılır",
            "Gerekirse sunucu veya altyapı tarafında güvenlik ve oturum kayıtları oluşabilir"
          ]
        },
        {
          title: "Aktif olmadığı görülen araçlar",
          paragraphs: [
            "Mevcut kod incelemesinde Google Analytics, Google Ads, Tag Manager, Meta Pixel, Hotjar, Clarity ve benzeri izleme araçları tespit edilmemiştir.",
            "`next/font/google` kullanımı ziyaretçi tarafında Google’a doğrudan font isteği anlamına gelmez; fontlar uygulama tarafından sunulur."
          ]
        },
        {
          title: "Tercih yönetimi",
          paragraphs: [
            "Banner seçiminiz tarayıcınıza kaydedilir.",
            "İsterseniz tarayıcı ayarlarınızdan çerezleri ve site verilerini silebilirsiniz.",
            "İleride analitik veya reklam araçları eklenirse bu politika ayrıca güncellenir."
          ]
        }
      ]
    }
  },
  de: {
    footerGroup: "Rechtliches",
    privacyLabel: "Datenschutz",
    cookieLabel: "Cookie-Richtlinie",
    banner: {
      title: "Cookie-Einstellungen",
      text: "In dieser Version werden nur technisch notwendige Speicherungen für den Betrieb der Website und zur Speicherung Ihrer Präferenz verwendet. Analyse-, Werbe- oder vergleichbare optionale Tracking-Technologien sind standardmäßig nicht aktiv.",
      acceptAll: "OK",
      necessaryOnly: "Nur notwendige",
      learnMore: "Cookie-Richtlinie öffnen"
    },
    privacy: {
      title: "Datenschutzinformation",
      description: "Diese Information erläutert, welche personenbezogenen Daten beim Besuch der Terkib23-Website verarbeitet werden können, zu welchen Zwecken dies geschieht, auf welcher Rechtsgrundlage dies erfolgt, an welche Empfängerkategorien Daten übermittelt werden können, wie lange Daten gespeichert werden und welche Rechte Ihnen nach EU-Recht und türkischem Recht zustehen können.",
      updatedAt: "23 April 2026",
      sections: [
        {
          title: "Verantwortlicher",
          paragraphs: [
            "Diese Website wird unter dem Namen Terkib23 betrieben. Die grundlegenden Entscheidungen über die Verarbeitung personenbezogener Daten werden von der Person oder dem kleinen Team getroffen, das die Website betreibt.",
            "Datenschutzbezogene Anfragen und grundlegende Betroffenenrechte können an han23studio@gmail.com gerichtet werden."
          ]
        },
        {
          title: "Umfang und Datenkategorien",
          bullets: [
            "Von Ihnen direkt mitgeteilte Daten, z. B. Name, E-Mail-Adresse und Nachrichteninhalt in E-Mails",
            "Technische Zugriffs- und Sicherheitsdaten wie IP-Adresse, Zeitstempel, User-Agent, Referrer sowie Fehler- und Sicherheitsprotokolle",
            "Im Browser gespeicherte Präferenzdaten, insbesondere der Eintrag `terkib23_cookie_choice_v1`"
          ]
        },
        {
          title: "Zwecke und Rechtsgrundlagen",
          bullets: [
            "Beantwortung von Anfragen und Durchführung vorvertraglicher Schritte",
            "Sicherer und stabiler Betrieb der Website, Missbrauchsprävention und Fehleranalyse",
            "Speicherung notwendiger Präferenzen",
            "Erfüllung rechtlicher Pflichten und Wahrung eigener Rechte",
            "Im EU-Kontext kommen je nach Verarbeitung insbesondere berechtigte Interessen, vorvertragliche Maßnahmen und gegebenenfalls Einwilligung in Betracht",
            "Im türkischen Kontext können insbesondere berechtigtes Interesse, Erforderlichkeit zur Vertragsbegründung oder -erfüllung, rechtliche Verpflichtung oder die Geltendmachung, Ausübung oder Verteidigung von Rechten einschlägig sein"
          ]
        },
        {
          title: "Google-Technologien und Drittanbieter",
          paragraphs: [
            "Im aktuellen Code wurden keine aktiven Integrationen von Google Analytics, Google Ads, Google Tag Manager, Meta Pixel, Hotjar, Clarity, Google Maps, YouTube-Embeds oder vergleichbaren Besucher-Tracking-Diensten festgestellt.",
            "Im Code wird `next/font/google` genutzt. Nach der Next.js-Dokumentation werden diese Schriften jedoch beim Build selbst gehostet, sodass der Browser des Besuchers beim Seitenaufruf keine direkten Font-Anfragen an Google sendet.",
            "Sollten künftig Analyse-, Marketing- oder eingebettete Drittanbieter-Dienste aktiviert werden, müssen diese Hinweise und gegebenenfalls das Einwilligungsmanagement entsprechend erweitert werden."
          ]
        },
        {
          title: "Empfänger und internationale Übermittlungen",
          paragraphs: [
            "Empfänger können Hosting-, Infrastruktur-, CDN-, Sicherheits- oder E-Mail-Dienstleister sein, soweit dies für den Betrieb oder die Kommunikation erforderlich ist. Externe Plattformen wie WhatsApp oder LinkedIn verarbeiten Daten eigenverantwortlich, wenn Sie entsprechende Links anklicken.",
            "Befinden sich eingesetzte Dienstleister außerhalb der Türkei oder außerhalb des EWR, kann eine grenzüberschreitende Übermittlung stattfinden. Solche Übermittlungen sind jeweils anhand der konkret eingesetzten Dienste nach Kapitel V DSGVO und den aktuellen Regeln des türkischen Datenschutzrechts zu bewerten."
          ]
        },
        {
          title: "Speicherdauer",
          paragraphs: [
            "Kontakt- und Angebotsdaten werden nur so lange gespeichert, wie dies für die Bearbeitung Ihrer Anfrage, eine mögliche Zusammenarbeit, rechtliche Pflichten oder die Abwehr bzw. Durchsetzung von Ansprüchen erforderlich ist.",
            "Technische Logdaten werden nur so lange aufbewahrt, wie dies für Sicherheit, Betriebsstabilität und Fehlersuche notwendig ist. Browser-Präferenzdaten bleiben auf Ihrem Gerät gespeichert, bis Sie diese löschen oder ändern."
          ]
        },
        {
          title: "Ihre Rechte",
          bullets: [
            "Nach DSGVO können Ihnen insbesondere Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerspruch und Widerruf einer Einwilligung zustehen",
            "Nach dem türkischen Datenschutzrecht können Ihnen insbesondere Rechte nach Art. 11 KVKK zustehen",
            "Sie können sich an han23studio@gmail.com wenden",
            "Daneben können Sie sich an die zuständige Aufsichtsbehörde bzw. in der Türkei an die Kişisel Verileri Koruma Kurumu wenden"
          ]
        }
      ]
    },
    cookies: {
      title: "Cookie-Richtlinie",
      description: "Diese Richtlinie beschreibt die auf der Terkib23-Website verwendeten Cookies und ähnlichen Speichertechnologien, die aktuell aktive technische Speicherung, derzeit nicht aktive Tracking-Technologien sowie Ihre Steuerungsmöglichkeiten.",
      updatedAt: "23 April 2026",
      sections: [
        { title: "Geltungsbereich", paragraphs: ["Diese Richtlinie erfasst Cookies sowie vergleichbare Technologien wie `localStorage` oder `sessionStorage`, soweit Informationen auf Ihrem Endgerät gespeichert oder daraus ausgelesen werden."] },
        { title: "Aktiv verwendete Technologien", bullets: ["`terkib23_cookie_choice_v1` zur Speicherung Ihrer Banner-Präferenz", "Technisch notwendige Sitzungs-, Sicherheits- oder Integritätsmechanismen, soweit sie vom Hosting oder der Infrastruktur benötigt werden"] },
        { title: "Derzeit nicht aktiv", paragraphs: ["Im aktuellen Code wurden keine aktiven Besucher-Tracking-Dienste wie Google Analytics, Google Ads, Google Tag Manager, Meta Pixel, Hotjar oder Clarity festgestellt.", "Auch bei `next/font/google` ist nach der Next.js-Dokumentation von Self-Hosting auszugehen, sodass keine direkten Font-Anfragen des Browsers an Google erwartet werden."] },
        { title: "Rechtsgrundlage und Einwilligung", paragraphs: ["Technisch notwendige Speicherungen können im gesetzlich zulässigen Umfang ohne gesonderte Einwilligung erfolgen. Analyse-, Marketing- oder Profiling-Technologien müssen – soweit erforderlich – vorab transparent erklärt und standardmäßig deaktiviert bleiben, bis eine wirksame Einwilligung vorliegt."] },
        { title: "Verwaltung", paragraphs: ["Sie können Ihre Präferenz über das Banner festlegen und Browserdaten jederzeit löschen oder blockieren. Externe Plattformen wie LinkedIn oder WhatsApp verwalten eigene Cookies nach ihren jeweiligen Richtlinien."] }
      ]
    }
  },
  en: {
    footerGroup: "Legal",
    privacyLabel: "Privacy Notice",
    cookieLabel: "Cookie Policy",
    banner: {
      title: "Cookie preferences",
      text: "This version only uses technical storage that is necessary for the site to work and to remember your preference. Analytics, advertising, or similar optional tracking technologies are not enabled by default.",
      acceptAll: "OK",
      necessaryOnly: "Necessary only",
      learnMore: "Open cookie policy"
    },
    privacy: {
      title: "Privacy Notice",
      description: "This notice explains what personal data may be processed when you visit the Terkib23 website, the purposes and legal bases for that processing, the categories of recipients, retention periods, cross-border transfer scenarios, and the main rights you may have under EU and Turkish data protection rules.",
      updatedAt: "April 23, 2026",
      sections: [
        {
          title: "Controller",
          paragraphs: [
            "This website is published under the name Terkib23. The main decisions about how personal data is handled on the site are taken by the person or small team operating it.",
            "Privacy-related questions and basic rights requests can be sent to han23studio@gmail.com."
          ]
        },
        {
          title: "Data categories",
          bullets: [
            "Data you provide directly, such as your name, email address and message content shared in email communications",
            "Technical access and security data such as IP address, timestamps, user-agent, referrer and error/security logs",
            "Browser-stored preference data, including the `terkib23_cookie_choice_v1` preference entry"
          ]
        },
        {
          title: "Purposes and legal bases",
          bullets: [
            "Replying to enquiries and taking pre-contractual steps",
            "Running the site securely, preventing abuse and investigating errors",
            "Remembering necessary preferences",
            "Complying with legal obligations and protecting legal claims",
            "For EU visitors, legal bases may include legitimate interests, steps taken at your request prior to entering into a contract, and consent where applicable",
            "For processing assessed under Turkish law, relevant grounds may include legitimate interest, contractual necessity, legal obligation, and necessity for the establishment, exercise or protection of a right"
          ]
        },
        {
          title: "Google technologies and third parties",
          paragraphs: [
            "The current code review did not identify active visitor-side integrations of Google Analytics, Google Ads, Google Tag Manager, Meta Pixel, Hotjar, Clarity, Google Maps, YouTube embeds or similar tracking services.",
            "The code uses `next/font/google`. According to the Next.js documentation, this self-hosts the font files at build time, so the visitor browser is not expected to send direct font requests to Google when loading the site.",
            "If analytics, marketing tags, embedded media, or similar third-party services are added later, this notice and the cookie information should be updated accordingly."
          ]
        },
        {
          title: "Recipients and international transfers",
          paragraphs: [
            "Recipients may include hosting, infrastructure, CDN, security or email service providers where required for site operation or communications. External services such as WhatsApp or LinkedIn process data under their own responsibility once you choose to follow those links.",
            "If service providers are located outside your country, outside Turkey or outside the EEA, cross-border transfers may occur. Such transfers should be assessed against GDPR Chapter V and the current Turkish cross-border transfer rules for the actual services in use."
          ]
        },
        {
          title: "Retention",
          paragraphs: [
            "Contact and quote-related data is kept only for as long as necessary for handling your request, a possible business relationship, legal obligations, or the defence and enforcement of claims.",
            "Technical logs are retained only for as long as needed for security, stability and troubleshooting. Browser preference data remains on your device until you delete or change it."
          ]
        },
        {
          title: "Your rights",
          bullets: [
            "Under the GDPR you may have rights of access, rectification, erasure, restriction, portability, objection and withdrawal of consent where relevant",
            "Under Turkish law you may have rights under Article 11 of the KVKK",
            "You can contact us at han23studio@gmail.com",
            "You may also complain to a competent supervisory authority or, in Turkey, to the Kişisel Verileri Koruma Kurumu"
          ]
        }
      ]
    },
    cookies: {
      title: "Cookie Policy",
      description: "This policy explains the cookies and similar client-side storage technologies used on the Terkib23 website, what is currently active, what is currently not active, and how you can manage your preferences.",
      updatedAt: "April 23, 2026",
      sections: [
        { title: "Scope", paragraphs: ["This policy covers cookies and similar technologies such as `localStorage` or `sessionStorage` where information is stored on or read from your device."] },
        { title: "Currently active technologies", bullets: ["`terkib23_cookie_choice_v1` to remember your banner preference", "Technically necessary session, security, integrity or request-handling mechanisms used by hosting or infrastructure where needed"] },
        { title: "Currently not active", paragraphs: ["The current code review did not identify active Google Analytics, Google Ads, Google Tag Manager, Meta Pixel, Hotjar, Clarity or similar visitor-tracking services.", "For `next/font/google`, the Next.js documentation indicates self-hosting, so the visitor browser is not expected to request fonts directly from Google."] },
        { title: "Legal basis and consent", paragraphs: ["Technically necessary storage may be used without separate consent to the extent permitted by applicable law. Analytics, advertising, profiling or similar optional technologies should remain off by default and, where required, should only be activated after valid prior consent."] },
        { title: "Managing your choice", paragraphs: ["You can set your preference through the banner and you can also delete or block site data in your browser settings. External platforms such as LinkedIn or WhatsApp manage their own cookies under their own policies."] }
      ]
    }
  },
  ar: {
    footerGroup: "قانوني",
    privacyLabel: "الخصوصية",
    cookieLabel: "سياسة ملفات الارتباط",
    banner: {
      title: "تفضيلات ملفات الارتباط",
      text: "يستخدم هذا الإصدار فقط التخزين التقني الضروري لتشغيل الموقع وتذكّر تفضيلك. تقنيات التحليلات أو الإعلانات أو التتبع الاختيارية ليست مفعلة افتراضياً.",
      acceptAll: "حسناً",
      necessaryOnly: "الضرورية فقط",
      learnMore: "فتح سياسة ملفات الارتباط"
    },
    privacy: {
      title: "إشعار الخصوصية",
      description: "يوضح هذا الإشعار ما هي البيانات الشخصية التي قد تتم معالجتها عند زيارة موقع Terkib23، وأغراض المعالجة وأسسها النظامية، وفئات المتلقين، ومدد الاحتفاظ، وحالات النقل الدولي المحتملة، والحقوق الأساسية التي قد تكون متاحة لكم بموجب القواعد الأوروبية والتركية.",
      updatedAt: "23 أبريل 2026",
      sections: [
        { title: "مسؤول المعالجة", paragraphs: ["يُنشر هذا الموقع باسم Terkib23، وتتخذ القرارات الأساسية المتعلقة بمعالجة البيانات من قبل الشخص أو الفريق الصغير الذي يدير الموقع. ويمكن إرسال طلبات الخصوصية الأساسية إلى البريد الإلكتروني han23studio@gmail.com."] },
        { title: "فئات البيانات", bullets: ["البيانات التي تقدمونها مباشرة مثل الاسم والبريد الإلكتروني ومحتوى الرسالة عبر المراسلات", "بيانات الوصول والأمن مثل عنوان IP والطابع الزمني ومعلومات المتصفح وسجلات الأخطاء", "بيانات التفضيلات المخزنة في المتصفح بما في ذلك `terkib23_cookie_choice_v1`"] },
        { title: "الأغراض والأسس النظامية", bullets: ["الرد على الطلبات واتخاذ الخطوات السابقة للتعاقد", "تشغيل الموقع بشكل آمن ومستقر ومنع إساءة الاستخدام وتحليل الأعطال", "تذكّر التفضيلات الضرورية", "الامتثال للالتزامات القانونية وحماية الحقوق", "بالنسبة لزوار الاتحاد الأوروبي قد تشمل الأسس النظامية المصلحة المشروعة أو الخطوات السابقة للتعاقد أو الموافقة عند اللزوم"] },
        { title: "تقنيات Google والأطراف الثالثة", paragraphs: ["لم تظهر مراجعة الكود الحالية وجود تكامل نشط مع Google Analytics أو Google Ads أو Google Tag Manager أو Meta Pixel أو Hotjar أو Clarity أو خرائط Google أو تضمين YouTube أو خدمات تتبع مشابهة.", "يستخدم الكود `next/font/google`، إلا أن توثيق Next.js يوضح أن الخطوط تُستضاف ذاتياً وقت البناء، لذلك لا يُتوقع أن يرسل متصفح الزائر طلبات خطوط مباشرة إلى Google عند تصفح الموقع."] },
        { title: "المتلقون والنقل الدولي", paragraphs: ["قد تشمل فئات المتلقين مزودي الاستضافة والبنية التحتية وCDN والأمن أو البريد الإلكتروني عند الحاجة. أما المنصات الخارجية مثل WhatsApp وLinkedIn فتتعامل مع البيانات بصفتها مسؤولة مستقلة عندما تختارون فتح تلك الروابط.", "إذا كان بعض المزودين خارج بلدكم أو خارج تركيا أو خارج المنطقة الاقتصادية الأوروبية فقد يحدث نقل دولي للبيانات، ويجب تقييمه وفق قواعد GDPR والقواعد التركية السارية بحسب الخدمة المستخدمة فعلياً."] },
        { title: "مدة الاحتفاظ والحقوق", paragraphs: ["يتم الاحتفاظ ببيانات التواصل فقط للمدة اللازمة لمعالجة الطلب أو العلاقة المحتملة أو الالتزامات القانونية أو حماية المطالبات. أما السجلات التقنية فتُحتفظ بها فقط للمدة اللازمة للأمن والاستقرار والتحقيق في الأعطال.", "قد تكون لكم حقوق مثل الوصول والتصحيح والمحو والتقييد والاعتراض وقابلية النقل أو الحقوق المنصوص عليها في المادة 11 من KVKK، ويمكنكم مراسلتنا على han23studio@gmail.com."] }
      ]
    },
    cookies: {
      title: "سياسة ملفات الارتباط",
      description: "توضح هذه السياسة ملفات الارتباط وتقنيات التخزين المشابهة المستخدمة في موقع Terkib23، وما هو مفعّل حالياً، وما هو غير مفعّل حالياً، وكيف يمكنكم إدارة تفضيلاتكم.",
      updatedAt: "23 أبريل 2026",
      sections: [
        { title: "النطاق", paragraphs: ["تشمل هذه السياسة ملفات الارتباط والتقنيات المشابهة مثل `localStorage` أو `sessionStorage` عندما يتم تخزين معلومات على جهازكم أو قراءتها منه."] },
        { title: "التقنيات المفعلة حالياً", bullets: ["`terkib23_cookie_choice_v1` لتذكّر اختياركم في الشريط", "أي آليات جلسة أو أمان أو سلامة طلب لازمة تقنياً وتستخدمها الاستضافة أو البنية التحتية عند الحاجة"] },
        { title: "غير المفعّل حالياً", paragraphs: ["لم تُظهر مراجعة الكود الحالية وجود Google Analytics أو Google Ads أو Google Tag Manager أو Meta Pixel أو Hotjar أو Clarity أو خدمات تتبع مشابهة فعالة للزائر.", "وبالنسبة إلى `next/font/google` تشير وثائق Next.js إلى الاستضافة الذاتية للخطوط، لذلك لا يُتوقع طلب الخطوط مباشرة من Google من متصفح الزائر."] },
        { title: "الأساس النظامي والموافقة", paragraphs: ["يمكن استخدام التخزين التقني الضروري دون موافقة منفصلة في الحدود التي يسمح بها القانون. أما التحليلات أو الإعلانات أو التتبع الاختياري فيجب أن تبقى متوقفة افتراضياً ولا تُفعّل إلا بعد تقديم معلومات واضحة والحصول على موافقة صحيحة عند الاقتضاء."] },
        { title: "إدارة التفضيلات", paragraphs: ["يمكنكم تحديد تفضيلكم عبر الشريط، كما يمكنكم حذف أو حظر بيانات الموقع من إعدادات المتصفح. وتدير المنصات الخارجية مثل LinkedIn أو WhatsApp ملفاتها الخاصة وفق سياساتها المستقلة."] }
      ]
    }
  }
};

export function getLegalLinks(locale: Locale) {
  const ui = legalContent[locale];

  return {
    title: ui.footerGroup,
    items: [
      { label: ui.privacyLabel, href: `/${locale}/privacy-policy/` },
      { label: ui.cookieLabel, href: `/${locale}/cookie-policy/` }
    ]
  };
}
