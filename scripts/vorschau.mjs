// Macht aus dem fertigen Build (dist/) eine Vorschau, die unter einem
// Unterpfad läuft, z. B. https://fkramer690.github.io/psychologische-beratung-bartz/
//
// - setzt den Unterpfad vor alle Links, Bilder, Schriften und Formular-Ziele
// - sperrt die Vorschau für Suchmaschinen (noindex + robots.txt),
//   damit Google keine Kopie der echten Domain findet
// - blendet oben einen schmalen Hinweis "Vorschau" ein
//
// Aufruf: VORSCHAU_BASIS=/psychologische-beratung-bartz node scripts/vorschau.mjs
import { readdir, readFile, writeFile, rm } from 'node:fs/promises';
import { join } from 'node:path';

const DIST = 'dist';
const basis = (process.env.VORSCHAU_BASIS ?? '').replace(/\/+$/, '');

async function* dateien(ordner) {
  for (const eintrag of await readdir(ordner, { withFileTypes: true })) {
    const pfad = join(ordner, eintrag.name);
    if (eintrag.isDirectory()) yield* dateien(pfad);
    else yield pfad;
  }
}

// "/x" -> "<basis>/x", aber nicht "//cdn..." und nicht bereits umgeschrieben
const mitBasis = (pfad) =>
  pfad.startsWith('/') && !pfad.startsWith('//') && !pfad.startsWith(basis + '/') ? basis + pfad : pfad;

const HINWEIS =
  '<div style="background:#2F3A3A;color:#fff;font:600 13px/1.4 system-ui,sans-serif;padding:6px 16px;text-align:center">' +
  'Vorschau der neuen Website, noch nicht live. Das Kontaktformular sendet hier nichts.</div>';

function html(text) {
  let neu = text
    .replace(/\b(href|src|action|poster)="(\/[^"]*)"/g, (_, attr, pfad) => `${attr}="${mitBasis(pfad)}"`)
    .replace(/\bsrcset="([^"]*)"/g, (_, liste) =>
      `srcset="${liste
        .split(',')
        .map((teil) => teil.trim().replace(/^(\S+)/, (pfad) => mitBasis(pfad)))
        .join(', ')}"`,
    )
    .replace(/url\((['"]?)(\/[^)'"]*)\1\)/g, (_, q, pfad) => `url(${q}${mitBasis(pfad)}${q})`);

  neu = neu.replace(/<meta name="robots"[^>]*>/g, '');
  neu = neu.replace('<head>', '<head><meta name="robots" content="noindex, nofollow" />');
  neu = neu.replace(/<body([^>]*)>/, (tag) => tag + HINWEIS);
  return neu;
}

let anzahl = 0;
for await (const datei of dateien(DIST)) {
  if (datei.endsWith('.html')) {
    await writeFile(datei, html(await readFile(datei, 'utf8')));
    anzahl++;
  } else if (datei.endsWith('.css')) {
    const text = await readFile(datei, 'utf8');
    await writeFile(datei, text.replace(/url\((['"]?)(\/[^)'"]*)\1\)/g, (_, q, p) => `url(${q}${mitBasis(p)}${q})`));
  } else if (datei.endsWith('.webmanifest')) {
    const manifest = JSON.parse(await readFile(datei, 'utf8'));
    for (const icon of manifest.icons ?? []) icon.src = mitBasis(icon.src);
    if (manifest.start_url) manifest.start_url = mitBasis(manifest.start_url);
    await writeFile(datei, JSON.stringify(manifest, null, 2));
  }
}

await writeFile(join(DIST, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
// Nur für echtes Hosting gedacht, in der Vorschau unnötig
for (const datei of ['sitemap-index.xml', 'sitemap-0.xml', '_headers', '_redirects', '.htaccess', 'kontakt-senden.php']) {
  await rm(join(DIST, datei), { force: true });
}
// GitHub Pages soll Ordner mit Unterstrich (_astro) nicht ausfiltern
await writeFile(join(DIST, '.nojekyll'), '');

console.log(`Vorschau vorbereitet: ${anzahl} HTML-Dateien, Basis "${basis || '/'}"`);
