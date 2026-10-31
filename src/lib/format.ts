import { site } from '../config/site';

/** HTML-Platzhalter (gleiches Markup wie Todo.astro) für Texte, die als String gebaut werden. */
export function todoHtml(was: string) {
  return `<mark class="todo" data-todo="${was}">[${was}]</mark>`;
}

export function preis60Html() {
  return site.preise.sitzung60 ? `${site.preise.sitzung60}` : todoHtml('Preis 60 Min. inkl. MwSt.');
}

export function preis90Html() {
  return site.preise.sitzung90 ? `${site.preise.sitzung90}` : todoHtml('Preis 90 Min. inkl. MwSt.');
}

/** Entfernt HTML für strukturierte Daten. */
export function ohneHtml(html: string) {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}
