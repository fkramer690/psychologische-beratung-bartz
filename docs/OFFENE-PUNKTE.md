# Offene Punkte vor dem Livegang

Stand: 31.10.2026. Die gelb markierten Platzhalter listet `npm run build && npm run check:todos` automatisch auf.

## 1. Angaben von Lea (Platzhalter auf der Seite)

| Angabe | Wo eintragen | Hinweis |
| --- | --- | --- |
| Telefonnummer und Erreichbarkeit | `src/config/site.ts` → `telefon`, `telefonzeiten` | Erscheint im Footer, Kontakt, Impressum, mobilen Anruf-Button und in den strukturierten Daten. Fehlt heute auf der Live-Seite komplett. |
| Preis 60 Minuten inkl. MwSt. | `site.ts` → `preise.sitzung60` | Bisher „120 € zzgl. MwSt.“. Gegenüber Privatpersonen muss der Endpreis stehen (Preisangabenverordnung). Bei 19 % wären es 142,80 €. Falls Lea Kleinunternehmerin ist: 120 € und Hinweis „gemäß § 19 UStG keine Umsatzsteuer“. |
| Preis 90 Minuten inkl. MwSt. | `site.ts` → `preise.sitzung90` | Steht bisher nirgends. |
| Weiterbildungen mit Institut, Umfang, Jahr; Verband | `site.ts` → `qualifikationen` (Liste) | Wichtigstes Vertrauenssignal für Ratsuchende. Erscheint auf „Über mich“ und als `hasCredential` in den strukturierten Daten. |
| USt-IdNr. | `site.ts` → `ustId` | Falls keine vorhanden: Absatz in `src/pages/impressum.astro` löschen. |
| Videoplattform für Online-Beratung | `src/pages/online-beratung.astro` (2 Stellen) | z. B. Zoom, Teams, Jitsi, RED connect. |
| Parken und Bushaltestelle | `src/pages/kontakt/index.astro` | Ein Satz reicht. |
| Hosting-Anbieter, Log-Speicherdauer, Löschfrist Anfragen, Datum | `src/pages/datenschutz.astro` | Hängt an der Hosting-Entscheidung. |
| Gestaltung im Impressum | `src/pages/impressum.astro` | Optional, sonst Absatz löschen. |

## 2. Neue Texte, die Lea bestätigen sollte

Diese Aussagen stehen nicht auf der alten Seite. Sie sind aus Best Practices und Leas Profil abgeleitet und sollten von ihr geprüft werden:

- **Anliegen** auf der Startseite („Kennst du das?“), auf `/angebote/` und `/systemische-beratung-aachen/`: Druck im Job, Entscheidungen, Konflikte im Team oder in der Familie, Trennung/Umbruch, Muster in Beziehungen, Grenzen setzen, Rollenwechsel. Treffen die die häufigsten Themen ihrer Klient:innen?
- **Walk & Talk bei Regen** (`/walk-and-talk-aachen/`): „Bei richtig schlechtem Wetter sprechen wir kurz vorher ab, ob wir in die Praxis oder online wechseln.“ Gilt das so?
- **Walk & Talk zum selben Preis** wie in der Praxis.
- **Treffpunkt** „bekommst du mit der Terminbestätigung“.
- **Systembrett** als Methode (es ist auf einem ihrer Fotos zu sehen) und online „in angepasster Form“.
- **Online-Beratung** „von überall in Deutschland“, auf Deutsch.
- **Krankenkasse:** „Bei beruflichen Themen lohnt sich manchmal eine Nachfrage beim Arbeitgeber.“
- **Werte** auf „Über mich“ (ruhig, strukturiert, wertschätzend, auf Augenhöhe) sind aus ihren eigenen Formulierungen zusammengefasst.

## 3. Rechtliches

- Impressum und Datenschutzerklärung sind sorgfältige Entwürfe, aber keine Rechtsberatung. Vor dem Livegang von einem Rechtstext-Dienst (z. B. IT-Recht Kanzlei, eRecht24) oder einer Anwältin prüfen lassen.
- Das Formular fragt eine **ausdrückliche Einwilligung** ab, weil Nachrichten an eine psychologische Beratung Gesundheitsdaten enthalten können (Art. 9 DSGVO).
- Begriffe: Die Seite nutzt bewusst nicht „Psychologin“, „Therapie“, „Patient“ oder „Behandlung“. „Psychologin“ setzt in der Regel ein Psychologiestudium voraus; Psychotherapie ist Heilkunde. Der Hinweis „keine Heilkunde“ steht auf jeder Seite im Footer.
- Krisenhinweis mit Telefonseelsorge steht auf jeder Seite.

## 4. Fotos

Die Fotos stammen von der bisherigen Website. Laut Jev-Check und eigener Einschätzung wirken einige KI-generiert. Für Vertrauen und das Google-Unternehmensprofil sind echte Fotos von Lea, der Praxis und dem Hangeweiher deutlich besser. Neue Fotos einfach in `src/assets/fotos/` unter gleichem Namen ersetzen; Größe und Format erledigt der Build.

## 5. Ausbaustufen (wenn Lea das anbietet)

- **Paarberatung Aachen** (110 Suchen/Monat, „Paartherapie Aachen“ 390) und **Coaching Aachen** (260): je eine eigene Seite nach dem Muster von `/systemische-beratung-aachen/`, Eintrag in `angebote` in `site.ts`.
- **Online-Terminbuchung** für das Erstgespräch (z. B. Cal.com, selbst gehostet oder EU-Anbieter) statt nur Formular.
- **Stimmen von Klient:innen**, sobald es Google-Bewertungen gibt (nur mit Einverständnis, anonymisiert).
- **Ratgeber-Artikel** zu typischen Fragen (z. B. „Beratung oder Therapie – was passt zu mir?“) für Sichtbarkeit in Google und KI-Antworten.
