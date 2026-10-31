# Admin-Seite: Aufträge von Lea

Unter **https://fkramer690.github.io/psychologische-beratung-bartz/admin/** kann Lea mit einem Passwort Änderungen an der Website in Auftrag geben, per Text oder per Diktat über die Handy-Tastatur. Claude Code setzt den Auftrag um, öffnet einen Pull Request, und die Antwort erscheint auf der Admin-Seite. Live geht nichts ohne Fabians Merge.

## Wie es funktioniert

1. `admin/index.html` ist eine statische Seite. Sie wird nur in die GitHub-Pages-Vorschau gelegt (`scripts/admin.mjs` im Workflow `vorschau.yml`), nicht auf die echte Domain.
2. Beim Build verschlüsselt `scripts/admin.mjs` einen GitHub-Token mit Leas Passwort (PBKDF2-SHA-256 mit 600.000 Runden, AES-256-GCM) und legt ihn als `admin/zugang.json` ab. Passwort und Token stehen nie im Repo, sie kommen aus Secrets.
3. Nach der Anmeldung entschlüsselt der Browser den Token und legt damit Issues im **privaten** Auftrags-Repo an bzw. liest dort die Antworten.
4. Im Auftrags-Repo läuft `auftrag.yml`: Claude Code ändert die Website (nur `src/`, `public/`, `docs/`), prüft den Build, die Automatik pusht einen Zweig `lea/auftrag-<Nr>` und öffnet einen PR. Claudes Antwort wird als Kommentar zurückgeschrieben.
5. Fabian mergt den PR → die Vorschau baut neu. Live geht es wie bisher nur über „Veröffentlichen (SFTP)“.

## Einrichtung (einmalig)

**1. Privates Auftrags-Repo anlegen**
- Neues Repo `fkramer690/lea-auftraege`, **privat**, mit README.
- Inhalt: `admin/auftrags-repo/ANWEISUNG.md` → `ANWEISUNG.md` und `admin/auftrags-repo/auftrag.yml` → `.github/workflows/auftrag.yml`.
- Oben rechts **Watch → All Activity**, damit du bei jeder Antwort und jedem neuen PR benachrichtigt wirst.

**2. Token für die Admin-Seite** (github.com → Settings → Developer settings → Fine-grained tokens)
- Repository access: nur `lea-auftraege`.
- Permissions: **Issues: Read and write** (Metadata: Read wird automatisch gesetzt). Sonst nichts.

**3. Token für die Automatik**
- Repository access: nur `psychologische-beratung-bartz`.
- Permissions: **Contents: Read and write**, **Pull requests: Read and write**. Bewusst *ohne* Workflows, damit Claude keine Workflows ändern kann.

**4. Secrets im Website-Repo** (`psychologische-beratung-bartz` → Settings → Secrets and variables → Actions)
- `ADMIN_PASSWORT`: Leas Passwort, **mindestens 16 Zeichen**, am besten vier zufällige Wörter (z. B. „Kiesel Laterne Honig Brücke“). Kürzere Passwörter werden abgelehnt, weil es ohne Server keine Sperre nach Fehlversuchen gibt.
- `ADMIN_GITHUB_TOKEN`: Token aus Schritt 2.
- Optional Variable `ADMIN_REPO`, falls das Auftrags-Repo anders heißt.

**5. Secrets im Auftrags-Repo** (`lea-auftraege` → Settings → Secrets and variables → Actions)
- `CLAUDE_CODE_OAUTH_TOKEN`: lokal `claude setup-token` ausführen (nutzt dein Claude-Abo) **oder** stattdessen `ANTHROPIC_API_KEY` mit einem Ausgabelimit in der Anthropic Console.
- `WEBSITE_TOKEN`: Token aus Schritt 3.

**6. Vorschau neu bauen**: Actions → „Vorschau (GitHub Pages)“ → Run workflow. Danach Lea den Link und das Passwort geben (nicht per E-Mail im Klartext zusammen, am besten mündlich oder per Messenger).

## Schutz und Grenzen

- Ohne Server gibt es keine Sperre nach Fehlversuchen. Darum das lange Passwort. Wer es trotzdem errät, kann nur Aufträge anlegen und lesen, nichts live schalten.
- Tageslimit: mehr als 25 Läufe pro Tag werden abgelehnt (`TAGESLIMIT` in `auftrag.yml`).
- Claude darf nur lesen, Dateien bearbeiten und `npm run build` ausführen. Kein Internet, kein Git, keine Secrets in Reichweite. Änderungen außerhalb von `src/`, `public/`, `docs/` werden verworfen.
- Notbremse: Workflow im Auftrags-Repo deaktivieren oder Token in GitHub löschen.
- Passwort wechseln: Secret `ADMIN_PASSWORT` ändern, Vorschau neu bauen.
- Leas Texte liegen nur im privaten Repo. Die PRs im öffentlichen Website-Repo enthalten nur einen neutralen Titel und die Änderungen selbst.
