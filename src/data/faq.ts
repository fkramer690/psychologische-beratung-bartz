/**
 * Häufige Fragen. Quelle: FAQ der bisherigen Website, neu gegliedert und um
 * typische Fragen von Ratsuchenden ergänzt. Antworten dürfen einfaches HTML enthalten.
 */
import { site, krisenhilfe } from '../config/site';
import { preis60Html, preis90Html } from '../lib/format';

export type Frage = { frage: string; antwort: string; gruppe: Gruppe };
export type Gruppe = 'Erstgespräch' | 'Beratung' | 'Kosten & Organisatorisches' | 'Praxis & Formate' | 'Rahmen';

const krise = krisenhilfe.nummern.map((n) => `<a href="tel:${n.link}">${n.anzeige}</a>`).join(', ');

export const fragen: Frage[] = [
  // Erstgespräch
  {
    gruppe: 'Erstgespräch',
    frage: 'Was passiert im kostenlosen Erstgespräch?',
    antwort:
      '<p>Das Erstgespräch dauert 20–30 Minuten und ist noch keine Beratungssitzung. Wir lernen uns kennen, du erzählst, was dich zu mir führt, und wir schauen gemeinsam, welches Angebot zu deiner Situation passt. So kannst du in Ruhe entscheiden, ob du dich mit mir und meiner Art der Begleitung wohlfühlst.</p>',
  },
  {
    gruppe: 'Erstgespräch',
    frage: 'Muss ich mich auf das Erstgespräch vorbereiten?',
    antwort:
      '<p>Nein. Du musst nichts mitbringen und kein Thema „fertig formuliert“ haben. Es reicht, wenn du so kommst, wie du bist.</p>',
  },
  {
    gruppe: 'Erstgespräch',
    frage: 'Ist das Erstgespräch wirklich kostenlos?',
    antwort:
      '<p>Ja, in jedem Fall. Auch wenn du dich danach gegen eine Beratung entscheidest, entstehen dir keine Kosten. Der Termin ist trotzdem verbindlich gebucht: Wenn du ihn nicht wahrnehmen kannst, sag bitte mindestens 24 Stunden vorher ab.</p>',
  },
  {
    gruppe: 'Erstgespräch',
    frage: 'Wo findet das Erstgespräch statt?',
    antwort:
      '<p>In meiner Praxis in Aachen-Burtscheid oder online per Video, ganz wie es dir lieber ist. Als Walk &amp; Talk biete ich das Erstgespräch nicht an.</p>',
  },

  // Beratung
  {
    gruppe: 'Beratung',
    frage: 'Mit welchen Anliegen kann ich zu dir kommen?',
    antwort:
      '<p>Mit allem, was dich gerade beschäftigt und was du sortieren möchtest: Druck und Erschöpfung im Job, berufliche Entscheidungen und Neuorientierung, Konflikte im Team oder in der Familie, Umbrüche wie eine Trennung oder eine neue Lebensphase, Selbstwert und Grenzen. Beratung ist auch dann sinnvoll, wenn nichts „schlimm“ ist und du dich einfach bewusst weiterentwickeln willst.</p>',
  },
  {
    gruppe: 'Beratung',
    frage: 'Wie viele Sitzungen brauche ich?',
    antwort:
      '<p>Die Beratung ist kurz- bis mittelfristig angelegt. Meist sind es etwa 6–8 Sitzungen, je nach Thema auch weniger oder mehr. Eine langfristige Verpflichtung gibt es nicht: Du entscheidest immer nur über den nächsten Termin.</p>',
  },
  {
    gruppe: 'Beratung',
    frage: 'Wie läuft eine Beratung ab?',
    antwort:
      '<p>Zu Beginn halten wir in einem kurzen Beratungsvertrag den Rahmen und die gegenseitigen Erwartungen fest. Eine Sitzung dauert 60 oder 90 Minuten. Ich arbeite mit systemischen Fragen, Perspektivwechseln, Ressourcenarbeit und Modellen aus der Kommunikationspsychologie. Nach jeder Sitzung bekommst du eine kurze Zusammenfassung per E-Mail, damit du deine Themen und Fortschritte gut nachverfolgen kannst.</p>',
  },
  {
    gruppe: 'Beratung',
    frage: 'Gibst du mir konkrete Ratschläge?',
    antwort:
      '<p>Eher selten. Statt fertiger Lösungen begleite ich dich dabei, eigene Perspektiven zu entwickeln, Zusammenhänge zu erkennen und Entscheidungen zu treffen, die zu dir passen. So bleibt das Ergebnis deins und trägt auch nach der Beratung.</p>',
  },
  {
    gruppe: 'Beratung',
    frage: 'Ist die Beratung vertraulich?',
    antwort:
      '<p>Ja. Die gesamte Beratung, auch das Erstgespräch, unterliegt der Verschwiegenheit. Was du mir erzählst, bleibt zwischen uns.</p>',
  },

  // Kosten
  {
    gruppe: 'Kosten & Organisatorisches',
    frage: 'Was kostet eine Sitzung?',
    antwort: `<p>Eine Sitzung von 60 Minuten kostet ${preis60Html()}, 90 Minuten kosten ${preis90Html()}, jeweils inklusive Mehrwertsteuer. Das Erstgespräch ist immer kostenfrei. Alle Details findest du unter <a href="/ablauf-und-kosten/">Ablauf &amp; Kosten</a>.</p>`,
  },
  {
    gruppe: 'Kosten & Organisatorisches',
    frage: 'Übernimmt die Krankenkasse die Kosten?',
    antwort:
      '<p>Nein. Psychologische Beratung ist keine Heilbehandlung, sondern eine Privatleistung, und wird deshalb von gesetzlichen und privaten Krankenkassen nicht erstattet. Bei beruflichen Themen lohnt sich manchmal eine Nachfrage beim Arbeitgeber.</p>',
  },
  {
    gruppe: 'Kosten & Organisatorisches',
    frage: 'Wie bezahle ich?',
    antwort: '<p>Nach jeder Sitzung, bar vor Ort, per Sofortüberweisung oder als Vorkasse.</p>',
  },
  {
    gruppe: 'Kosten & Organisatorisches',
    frage: 'Was passiert, wenn ich einen Termin absagen muss?',
    antwort:
      '<p>Bitte sag Termine mindestens 24 Stunden vorher ab. Kurzfristig abgesagte oder versäumte Termine muss ich leider vollständig berechnen.</p>',
  },
  {
    gruppe: 'Kosten & Organisatorisches',
    frage: 'Gibt es auch Termine abends?',
    antwort:
      '<p>Ja. Viele Menschen haben Beruf, Kinder, Tiere oder andere Verpflichtungen. Deshalb sind Termine auch außerhalb klassischer Öffnungszeiten möglich. Sprich mich einfach darauf an.</p>',
  },

  // Praxis & Formate
  {
    gruppe: 'Praxis & Formate',
    frage: 'Wo ist die Praxis?',
    antwort: `<p>In der ${site.adresse.strasse}, ${site.adresse.plz} ${site.adresse.ort}, im Stadtteil Burtscheid. Der Hangeweiher, an dem das Walk &amp; Talk stattfindet, liegt nur wenige Gehminuten entfernt. <a href="/kontakt/#anfahrt">Zur Anfahrt</a></p>`,
  },
  {
    gruppe: 'Praxis & Formate',
    frage: 'Ist die Praxis barrierefrei?',
    antwort:
      '<p>Leider nicht. Die Räume sind nur über Treppen erreichbar. Wenn das für dich ein Hindernis ist, können wir gern online oder beim Walk &amp; Talk arbeiten.</p>',
  },
  {
    gruppe: 'Praxis & Formate',
    frage: 'Ich habe eine Tierhaarallergie. Ist das ein Problem?',
    antwort:
      '<p>Ich habe einen Hund, er ist während der Beratung aber nicht in den Räumen. Ein Luftreiniger sorgt zusätzlich für angenehme, gut verträgliche Raumluft.</p>',
  },
  {
    gruppe: 'Praxis & Formate',
    frage: 'Darf ich mein Kind oder meinen Hund mitbringen?',
    antwort:
      '<p>Ja, wenn es dir hilft. Die Verantwortung bleibt dabei bei dir. Falls die Sitzung durch Störungen nicht sinnvoll weitergehen kann, entscheidest du, wie wir weitermachen.</p>',
  },
  {
    gruppe: 'Praxis & Formate',
    frage: 'Kann ich das Format wechseln?',
    antwort:
      '<p>Ja. Ob Praxis, online oder Walk &amp; Talk kannst du für jede Sitzung frei wählen. Nicht jede Methode passt zu jedem Format, das besprechen wir dann gemeinsam. Walk &amp; Talk biete ich nur bei Tageslicht an.</p>',
  },

  // Rahmen
  {
    gruppe: 'Rahmen',
    frage: 'Was ist der Unterschied zwischen Beratung und Psychotherapie?',
    antwort:
      '<p>Psychotherapie behandelt psychische Erkrankungen und ist Heilkunde. Meine Beratung gehört nicht dazu: Ich stelle keine Diagnosen und behandle keine Erkrankungen. Beratung richtet sich an Menschen, die sich reflektieren, sortieren oder weiterentwickeln möchten.</p>',
  },
  {
    gruppe: 'Rahmen',
    frage: 'Für wen ist die Beratung nicht geeignet?',
    antwort: `<p>Für Menschen in akuten Krisen oder mit behandlungsbedürftigen psychischen Erkrankungen. Dann sind ärztliche oder psychotherapeutische Fachleute die richtige Anlaufstelle. Die Telefonseelsorge ist rund um die Uhr kostenlos und anonym erreichbar: ${krise}. Im Notfall wähle 112.</p>`,
  },
  {
    gruppe: 'Rahmen',
    frage: 'Wer ist bei dir willkommen?',
    antwort:
      '<p>Jede und jeder, unabhängig von Herkunft, Identität, Lebensform oder persönlicher Geschichte. Wichtig ist nur, dass du bereit bist, dich mit deinen Themen auseinanderzusetzen und deinen eigenen Weg zu gestalten.</p>',
  },
];

export const gruppen: Gruppe[] = ['Erstgespräch', 'Beratung', 'Kosten & Organisatorisches', 'Praxis & Formate', 'Rahmen'];

export const auswahl = (...titel: string[]) => fragen.filter((f) => titel.includes(f.frage));
