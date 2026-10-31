// Listet alle offenen Platzhalter (gelb markiert) der gebauten Website auf.
// Aufruf: npm run build && npm run check:todos
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const funde = new Map();

function durchsuche(ordner) {
  for (const name of readdirSync(ordner)) {
    const pfad = join(ordner, name);
    if (statSync(pfad).isDirectory()) durchsuche(pfad);
    else if (name.endsWith('.html')) {
      const html = readFileSync(pfad, 'utf8');
      for (const [, was] of html.matchAll(/data-todo="([^"]+)"/g)) {
        const seite = '/' + relative(dist, pfad).replace(/index\.html$/, '');
        if (!funde.has(was)) funde.set(was, new Set());
        funde.get(was).add(seite);
      }
    }
  }
}

try {
  durchsuche(dist);
} catch {
  console.error('Kein dist/-Ordner. Bitte zuerst `npm run build` ausführen.');
  process.exit(1);
}

if (!funde.size) {
  console.log('Keine offenen Platzhalter. Bereit für den Livegang.');
} else {
  console.log(`${funde.size} offene Platzhalter:\n`);
  for (const [was, seiten] of funde) console.log(`• ${was}\n    ${[...seiten].join(', ')}`);
  console.log('\nAngaben in src/config/site.ts eintragen bzw. Texte in src/pages/ anpassen.');
}
