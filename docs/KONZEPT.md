# Konzept der neuen Website

Kurzfassung der Best Practices, nach denen die Seite gebaut ist, und was gegenüber der Baukasten-Seite besser ist. Stand 31.10.2026.

## Ziel

Menschen aus Aachen und Umgebung, die etwas sortieren oder verändern wollen, sollen Lea finden, ihr vertrauen und ein kostenloses Erstgespräch anfragen. Jede Seite führt deshalb auf **eine** Handlung hin: „Erstgespräch vereinbaren“.

## Konversion

| Prinzip | Umsetzung |
| --- | --- |
| Klarer Hauptbutton, früh und wiederholt | „Kostenloses Erstgespräch“ im Kopf (immer sichtbar), im Hero, nach Ablauf, im dunklen Abschlussband jeder Seite, im Footer; auf dem Handy als fester Button unten |
| Angst vor dem ersten Schritt nehmen | Mikrotext „20–30 Minuten · kostenfrei · vertraulich“, „Du musst nichts vorbereiten“, Ablauf in 3 Schritten |
| Überschrift aus Sicht der Ratsuchenden | „Raum für Klarheit, wenn dich etwas nicht loslässt“ statt Fachbegriffe; „Kennst du das?“ mit konkreten Anliegen |
| Vertrauen | 15+ Jahre People & Culture, Foto und Stimme von Lea, Qualifikationen (offen), Verschwiegenheit, transparente Preise, Grenzen der Beratung offen benannt |
| Wenig Reibung im Formular | 2 Pflichtfelder + Einwilligung, Nachricht optional, Wunschformat per Klick, Danke-Seite mit nächsten Schritten |
| Mehrere Kontaktwege | Formular, E-Mail, Telefon (sobald Nummer da ist) |
| Preise sichtbar | eigene Seite „Ablauf & Kosten“, Preis-Kacheln auf „Angebote“, FAQ |

## SEO

- **Ein Zielbegriff pro Seite**, damit sich die Seiten nicht gegenseitig Konkurrenz machen (vorher zielten Start, Angebote und Über mich alle auf „psychologische Beratung Aachen“). Zuordnung siehe README.
- **Eigene Seiten für Systemische Beratung, Walk & Talk und Online-Beratung**: mehr Einstiegspunkte aus Google, Walk & Talk am Hangeweiher ist ein lokales Alleinstellungsmerkmal.
- **Lokale Signale**: Adresse mit Stadtteil Burtscheid, Hangeweiher, Aachen in Titeln und Überschriften, NAP (Name, Adresse, Telefon) überall identisch, Geo-Koordinaten.
- **Strukturierte Daten** (JSON-LD): `ProfessionalService` mit Adresse, Geo, Angeboten; `Person` für Lea; `Service` je Angebotsseite; `FAQPage`; `BreadcrumbList`; `WebSite`.
- **Technik**: statisches HTML, kein JavaScript außer einer Zeile für Formularfehler, Bilder automatisch als WebP in passenden Größen, lazy loading, Schriften lokal, Sitemap und robots.txt, saubere URLs mit Schrägstrich, 301 von `/faq-1/`.
- **Titles 40–55 Zeichen, Descriptions 140–155 Zeichen**, jede Seite genau eine H1, alle Bilder mit Alt-Text.
- **KI-Suchen** (Google AI Overviews, ChatGPT): klare Fakten zu Angebot, Ort, Preis und Ablauf in Fließtext und FAQ; laut DataForSEO erscheint bei allen geprüften Aachen-Suchen eine KI-Übersicht.

## Recht und Vertrauen

- Keine Cookies, kein Tracking, keine Google Fonts von Google-Servern, keine eingebettete Karte → kein Cookie-Banner nötig.
- Einwilligung nach Art. 9 DSGVO im Formular (Gesundheitsdaten möglich).
- Hinweis „keine Heilkunde“ und Krisennummern auf jeder Seite; keine Begriffe wie Therapie, Patient, Behandlung, Psychologin.
- Endpreise inkl. MwSt. (Preisangabenverordnung).

## Design

Corporate Design „Stufe“ (siehe `lea-homepage/corporate-design/LEITFADEN.md` im Projektordner): Papier als Fläche, Tinte für Text, Taupe für Buttons, Schieferblau für Links, Sand für ruhige Flächen, Kreisbögen aus dem Siegel als Motiv. Jost für Überschriften, Open Sans für Text. Kontraste nach WCAG AA geprüft (Lighthouse Barrierefreiheit 100).

## Messwerte (Lighthouse mobil, lokal)

| Seite | Leistung | Barrierefreiheit | Best Practices | SEO | LCP |
| --- | --- | --- | --- | --- | --- |
| Start | 100 | 100 | 100 | 100 | 1,9 s |
| Angebote | 100 | 100 | 100 | 100 | 1,9 s |
| Kontakt | 100 | 100 | 100 | 100 | 1,4 s |
| Walk & Talk | 99 | 100 | 100 | 100 | 2,2 s |

Zum Vergleich die Baukasten-Seite: Leistung mobil 45–66, LCP 11,9–12,4 s, 2,2 MB. Die neue Startseite wiegt 173 KB.

## Wichtigster Hebel außerhalb der Website

Bei 9 von 10 Aachen-Suchen steht oben ein Kartenblock mit drei Praxen (DataForSEO, 31.10.2026). Ohne **Google-Unternehmensprofil** mit Bewertungen kommt Lea dort nicht hinein. Nach dem Livegang: Profil anlegen (Kategorie z. B. „Psychologische Beratung“), dieselbe Adresse und Telefonnummer wie auf der Website, Link auf die Startseite, erste Klient:innen um Bewertungen bitten. Danach Einträge in lokalen Verzeichnissen als erste Backlinks.
