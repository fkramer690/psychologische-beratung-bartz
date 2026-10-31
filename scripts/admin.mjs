// Legt die Admin-Seite für Leas Aufträge in die Vorschau (dist/admin/).
//
// Die Seite ist rein statisch. Den GitHub-Zugangsschlüssel, mit dem sie
// Aufträge im privaten Auftrags-Repo anlegt, bekommt sie nur verschlüsselt:
// Schlüssel abgeleitet aus dem Passwort (PBKDF2-SHA-256, 600.000 Runden),
// verschlüsselt mit AES-256-GCM. Erst Leas Passwort entschlüsselt ihn im Browser.
// Passwort und Schlüssel stehen nie im Repo, sie kommen aus GitHub-Secrets.
//
// Umgebungsvariablen (im Workflow aus den Repository-Secrets):
//   ADMIN_PASSWORT       Leas Passwort, mindestens 16 Zeichen
//   ADMIN_GITHUB_TOKEN   Fine-grained Token, nur Issues lesen/schreiben im Auftrags-Repo
//   ADMIN_REPO           optional, Standard: fkramer690/lea-auftraege
//
// Aufruf: node scripts/admin.mjs
import { mkdir, copyFile, writeFile } from 'node:fs/promises';
import { pbkdf2Sync, randomBytes, createCipheriv } from 'node:crypto';
import { join } from 'node:path';

const ZIEL = join('dist', 'admin');
const RUNDEN = 600_000;
const MINDESTLAENGE = 16;

const passwort = process.env.ADMIN_PASSWORT ?? '';
const token = process.env.ADMIN_GITHUB_TOKEN ?? '';
const repo = process.env.ADMIN_REPO || 'fkramer690/lea-auftraege';

await mkdir(ZIEL, { recursive: true });
await copyFile(join('admin', 'index.html'), join(ZIEL, 'index.html'));

let zugang;
if (!passwort || !token) {
  zugang = { nichtEingerichtet: true };
  console.warn('Admin-Seite: ADMIN_PASSWORT oder ADMIN_GITHUB_TOKEN fehlt, Anmeldung ist deaktiviert.');
} else if (passwort.length < MINDESTLAENGE) {
  zugang = { nichtEingerichtet: true };
  console.warn(`Admin-Seite: ADMIN_PASSWORT ist kürzer als ${MINDESTLAENGE} Zeichen, Anmeldung ist deaktiviert.`);
} else {
  const salt = randomBytes(16);
  const iv = randomBytes(12);
  const schluessel = pbkdf2Sync(passwort, salt, RUNDEN, 32, 'sha256');
  const cipher = createCipheriv('aes-256-gcm', schluessel, iv);
  const daten = Buffer.concat([cipher.update(JSON.stringify({ token, repo }), 'utf8'), cipher.final(), cipher.getAuthTag()]);
  zugang = {
    v: 1,
    iter: RUNDEN,
    salt: salt.toString('base64'),
    iv: iv.toString('base64'),
    daten: daten.toString('base64'),
  };
  console.log(`Admin-Seite: Zugang für ${repo} verschlüsselt.`);
}

await writeFile(join(ZIEL, 'zugang.json'), JSON.stringify(zugang));
