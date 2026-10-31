/**
 * Zentrale Stammdaten der Website.
 *
 * Alles, was an mehreren Stellen auftaucht (Name, Adresse, Telefon, Preise),
 * steht nur hier. Änderungen hier wirken auf allen Seiten, im Footer, im
 * Impressum und in den strukturierten Daten für Google.
 *
 * Offene Angaben stehen als `null`. Solange sie fehlen, zeigt die Seite an
 * dieser Stelle einen gelb markierten Platzhalter (siehe `npm run check:todos`).
 */

export const site = {
  url: 'https://www.psychologische-beratung-bartz.de',
  name: 'Psychologische Beratung Bartz',
  person: 'Lea Bartz',
  claim: 'Psychologische Beratung Aachen',
  locale: 'de_DE',

  email: 'lea@psychologische-beratung-bartz.de',

  /** Öffentliche Telefonnummer, z. B. { anzeige: '0241 123 456 78', link: '+4924112345678' }. OFFEN */
  telefon: null as null | { anzeige: string; link: string },
  /** Wann Lea telefonisch am besten erreichbar ist, z. B. 'Mo–Fr 9–12 Uhr'. OFFEN */
  telefonzeiten: null as null | string,

  adresse: {
    strasse: 'Limburger Str. 23',
    plz: '52064',
    ort: 'Aachen',
    stadtteil: 'Burtscheid',
    land: 'DE',
    /** OpenStreetMap, Gebäude Limburger Str. 23 */
    geo: { lat: 50.76395, lng: 6.07281 },
  },

  /** Link für "Route planen" (ohne eingebettete Karte, also ohne Cookies) */
  routeLink:
    'https://www.openstreetmap.org/?mlat=50.76395&mlon=6.07281#map=17/50.76395/6.07281',

  hangeweiher: { lat: 50.75903, lng: 6.0734 },

  preise: {
    /** Bisher: 120 € zzgl. MwSt. für 60 Minuten. Endpreis inkl. MwSt. OFFEN (bei 19 % wären das 142,80 €) */
    sitzung60: null as null | string,
    /** Preis für 90 Minuten. OFFEN */
    sitzung90: null as null | string,
    erstgespraech: 'kostenfrei',
  },

  /** Abschlüsse, Weiterbildungen mit Institut und Jahr, Verbände. OFFEN */
  qualifikationen: null as null | string[],

  /** Für das Impressum. OFFEN */
  ustId: null as null | string,

  /** Ziel des Kontaktformulars. Für IONOS-Webhosting liegt das PHP-Skript bei. */
  formAction: '/kontakt-senden.php',

  social: {
    /** z. B. LinkedIn- oder Instagram-Profil, sobald vorhanden */
    sameAs: [] as string[],
  },
} as const;

export const krisenhilfe = {
  text: 'In akuten Krisen bin ich nicht die richtige Anlaufstelle. Die Telefonseelsorge ist rund um die Uhr kostenlos und anonym erreichbar, im Notfall wähle 112.',
  nummern: [
    { anzeige: '0800 111 0 111', link: '+498001110111' },
    { anzeige: '0800 111 0 222', link: '+498001110222' },
    { anzeige: '116 123', link: '116123' },
  ],
};

export const hinweisHeilkunde =
  'Psychologische und systemische Beratung ist keine Heilkunde. Sie ersetzt keine medizinische oder psychotherapeutische Behandlung und enthält keine Diagnosen.';

export const nav = [
  { href: '/angebote/', label: 'Angebote' },
  { href: '/ablauf-und-kosten/', label: 'Ablauf & Kosten' },
  { href: '/ueber-mich/', label: 'Über mich' },
  { href: '/faq/', label: 'FAQ' },
];

export const angebote: { href: string; titel: string; icon: 'gespraech' | 'system' | 'weg' | 'online'; kurz: string }[] = [
  {
    href: '/angebote/#psychologische-beratung',
    titel: 'Psychologische Beratung',
    icon: 'gespraech',
    kurz: 'Gedanken, Gefühle und Muster sortieren, wenn dich etwas beschäftigt oder du dich weiterentwickeln willst.',
  },
  {
    href: '/systemische-beratung-aachen/',
    titel: 'Systemische Beratung',
    icon: 'system',
    kurz: 'Den Blick auf Beziehungen, Rollen und Umfeld richten und neue Handlungsmöglichkeiten finden.',
  },
  {
    href: '/walk-and-talk-aachen/',
    titel: 'Walk & Talk am Hangeweiher',
    icon: 'weg',
    kurz: 'Nebeneinander gehen statt gegenübersitzen. Beratung in Bewegung, wenige Minuten von der Praxis.',
  },
  {
    href: '/online-beratung/',
    titel: 'Online-Beratung',
    icon: 'online',
    kurz: 'Per Video von zu Hause aus, mit derselben Ruhe und Struktur wie in der Praxis.',
  },
];
