# psychologische-beratung-bartz.de

Website von **Lea Bartz – Psychologische Beratung Aachen**. Statisch gebaut mit [Astro](https://astro.build), ohne Cookies, ohne Tracking, ohne externe Dienste. Lighthouse mobil: 99–100 in allen vier Kategorien.

## Schnellstart

```bash
npm install
npm run dev          # Vorschau mit Live-Reload auf http://localhost:4321
npm run build        # fertige Website nach dist/
npm run preview      # dist/ lokal ansehen
npm run check:todos  # offene Platzhalter auflisten (nach dem Build)
```

Node 22 (siehe `.nvmrc`).

## Wo was steht

| Was | Wo |
| --- | --- |
| Name, Adresse, E-Mail, **Telefon, Preise, Qualifikationen, USt-IdNr.** | `src/config/site.ts` |
| Häufige Fragen (FAQ-Seite, Startseite, Ablauf & Kosten) | `src/data/faq.ts` |
| Seiten | `src/pages/` (eine Datei pro Seite, Dateiname = URL) |
| Kopf, Fuß, Erstgespräch-Band, FAQ-Liste, Platzhalter | `src/components/` |
| Grundlayout, Meta-Tags, strukturierte Daten | `src/layouts/Base.astro`, `src/lib/schema.ts` |
| Farben, Schriften, Abstände | `src/styles/global.css` |
| Fotos (werden beim Build verkleinert und als WebP ausgeliefert) | `src/assets/fotos/` |
| Logo, Favicons, Vorschaubild, robots.txt, `.htaccess`, Formular-Skript | `public/` |
| Prüfung, Vorschau, Veröffentlichen | `.github/workflows/`, `scripts/` |
| Konzept, SEO-Zuordnung, offene Punkte | `docs/` |

## Seiten

| URL | Zielbegriff | Zweck |
| --- | --- | --- |
| `/` | psychologische Beratung Aachen | Einstieg, Vertrauen, Erstgespräch |
| `/angebote/` | Beratung Aachen (Überblick) | Psychologische Beratung, Formate, Preise |
| `/systemische-beratung-aachen/` | systemische Beratung Aachen | eigenes Angebot |
| `/walk-and-talk-aachen/` | Walk & Talk Aachen, Hangeweiher | eigenes Format, lokales Alleinstellungsmerkmal |
| `/online-beratung/` | psychologische Beratung online | überregional |
| `/ablauf-und-kosten/` | Kosten psychologische Beratung | Preise, Ablauf, Rahmen |
| `/ueber-mich/` | Lea Bartz | Person, Qualifikation, Praxis |
| `/faq/` | Fragen rund um die Beratung | 22 Antworten |
| `/kontakt/` | Erstgespräch Aachen | Formular, Anfahrt |
| `/kontakt/danke/` | – | Bestätigung (noindex) |
| `/impressum/`, `/datenschutz/`, `/404.html` | – | Pflicht |

## Offene Angaben

Fehlende Angaben stehen in `src/config/site.ts` als `null` und erscheinen auf der Seite **gelb markiert**. `npm run build && npm run check:todos` listet alle auf. Vor dem Livegang muss die Liste leer sein. Details: [docs/OFFENE-PUNKTE.md](docs/OFFENE-PUNKTE.md).

## Kontaktformular

Das Formular schickt an `public/kontakt-senden.php`. Das Skript läuft auf jedem PHP-Webspace (z. B. IONOS-Webhosting), verschickt die Anfrage per `mail()` an Lea und leitet auf `/kontakt/danke/` weiter. Nichts wird gespeichert, kein Drittanbieter. Vor dem Livegang einmal testen. Bei einem Hoster ohne PHP (Netlify, Cloudflare Pages) `formAction` in `src/config/site.ts` auf einen anderen Formular-Dienst umstellen.

## Vorschau

Jeder Stand auf `main` wird automatisch als Vorschau veröffentlicht: **https://fkramer690.github.io/psychologische-beratung-bartz/**

Die Vorschau ist für Suchmaschinen gesperrt, zeigt oben den Hinweis „noch nicht live“, und das Kontaktformular sendet dort nichts. Gebaut wird sie von `.github/workflows/vorschau.yml` mit `scripts/vorschau.mjs`. Einmalig nötig: *Settings → Pages → Build and deployment → Source: GitHub Actions*.

## Veröffentlichen

**Empfohlen: IONOS-Webhosting** (die Domain liegt schon bei IONOS, Server in Deutschland, PHP für das Formular).

1. Bei IONOS ein Webhosting-Paket mit SFTP-Zugang nutzen und die Domain darauf zeigen lassen.
2. Im Repository unter *Settings → Secrets and variables → Actions* die Secrets `SFTP_HOST`, `SFTP_USER`, `SFTP_PASSWORD` und `SFTP_PATH` anlegen. `SFTP_PATH` muss ein eigener Ordner nur für diese Website sein, denn der Upload löscht dort alles, was nicht zur Website gehört.
3. Unter *Actions → Veröffentlichen (SFTP) → Run workflow* starten.

`public/.htaccess` erzwingt https und www, leitet die alte Adresse `/faq-1/` auf `/faq/` um, setzt Sicherheits-Header und Caching.

Alternativ läuft `dist/` auf jedem statischen Hoster (Netlify, Cloudflare Pages); dafür liegen `_redirects` und `_headers` bei.

## Nach dem Livegang

- Google Search Console: Domain bestätigen, `https://www.psychologische-beratung-bartz.de/sitemap-index.xml` einreichen.
- Google-Unternehmensprofil anlegen (größter Hebel für die lokale Suche, siehe `docs/KONZEPT.md`).
- Strukturierte Daten mit dem [Rich Results Test](https://search.google.com/test/rich-results) prüfen.
