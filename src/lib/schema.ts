/** Strukturierte Daten (schema.org, JSON-LD) für Google und KI-Suchen. */
import { site, angebote } from '../config/site';

const praxisId = `${site.url}/#praxis`;
const personId = `${site.url}/#lea-bartz`;
const websiteId = `${site.url}/#website`;

export function basisSchema() {
  const adresse = {
    '@type': 'PostalAddress',
    streetAddress: site.adresse.strasse,
    postalCode: site.adresse.plz,
    addressLocality: site.adresse.ort,
    addressRegion: 'Nordrhein-Westfalen',
    addressCountry: site.adresse.land,
  };

  const praxis: Record<string, unknown> = {
    '@type': 'ProfessionalService',
    '@id': praxisId,
    name: site.name,
    alternateName: `${site.person} – ${site.claim}`,
    url: `${site.url}/`,
    email: site.email,
    image: `${site.url}/vorschaubild-1200x630.png`,
    logo: `${site.url}/favicon-512.png`,
    description:
      'Psychologische und systemische Beratung in Aachen-Burtscheid, online und als Walk & Talk am Hangeweiher. Nicht heilkundlich. Kostenloses Erstgespräch.',
    address: adresse,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.adresse.geo.lat,
      longitude: site.adresse.geo.lng,
    },
    areaServed: [
      { '@type': 'City', name: 'Aachen' },
      { '@type': 'AdministrativeArea', name: 'StädteRegion Aachen' },
    ],
    founder: { '@id': personId },
    knowsLanguage: 'de',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Beratungsangebote',
      itemListElement: angebote.map((a) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: a.titel, url: `${site.url}${a.href}` },
      })),
    },
  };
  if (site.telefon) praxis.telephone = site.telefon.link;
  if (site.social.sameAs.length) praxis.sameAs = site.social.sameAs;

  const person: Record<string, unknown> = {
    '@type': 'Person',
    '@id': personId,
    name: site.person,
    givenName: 'Lea',
    familyName: 'Bartz',
    jobTitle: 'Psychologische und systemische Beraterin',
    worksFor: { '@id': praxisId },
    url: `${site.url}/ueber-mich/`,
    image: `${site.url}/lea-bartz.jpg`,
    workLocation: { '@id': praxisId },
  };
  if (site.qualifikationen?.length) person.hasCredential = site.qualifikationen;

  const website = {
    '@type': 'WebSite',
    '@id': websiteId,
    url: `${site.url}/`,
    name: site.name,
    inLanguage: 'de-DE',
    publisher: { '@id': praxisId },
  };

  return [praxis, person, website];
}

export function breadcrumbSchema(pfad: { name: string; href: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Start', href: '/' }, ...pfad].map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.name,
      item: `${site.url}${p.href}`,
    })),
  };
}

export function serviceSchema(opts: { name: string; href: string; beschreibung: string; serviceType: string }) {
  return {
    '@type': 'Service',
    name: opts.name,
    serviceType: opts.serviceType,
    description: opts.beschreibung,
    url: `${site.url}${opts.href}`,
    provider: { '@id': praxisId },
    areaServed: { '@type': 'City', name: 'Aachen' },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `${site.url}/kontakt/`,
    },
  };
}

export function faqSchema(fragen: { frage: string; antwort: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: fragen.map((f) => ({
      '@type': 'Question',
      name: f.frage,
      acceptedAnswer: { '@type': 'Answer', text: f.antwort },
    })),
  };
}
