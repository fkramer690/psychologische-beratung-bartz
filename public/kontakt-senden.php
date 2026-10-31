<?php
/**
 * Kontaktformular → E-Mail an Lea.
 *
 * Läuft auf jedem PHP-Webspace mit mail()-Funktion (z. B. IONOS-Webhosting).
 * Keine Datenbank, keine Speicherung auf dem Server, keine Drittanbieter.
 *
 * Anpassen: EMPFAENGER und ABSENDER. Der Absender muss eine Adresse der
 * eigenen Domain sein, sonst landen die Mails im Spam.
 */

declare(strict_types=1);

const EMPFAENGER = 'lea@psychologische-beratung-bartz.de';
const ABSENDER   = 'website@psychologische-beratung-bartz.de';
const DANKE      = '/kontakt/danke/';
const FEHLER     = '/kontakt/?fehler=1#formular-titel';

function weiter(string $ziel): void {
    header('Location: ' . $ziel, true, 303);
    exit;
}

function feld(string $name, int $max): string {
    $wert = isset($_POST[$name]) && is_string($_POST[$name]) ? trim($_POST[$name]) : '';
    $wert = str_replace("\0", '', $wert);
    return mb_substr($wert, 0, $max, 'UTF-8');
}

function einzeilig(string $wert): string {
    return trim(preg_replace('/[\r\n\t]+/', ' ', $wert) ?? '');
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    weiter('/kontakt/');
}

// Spam-Falle: Dieses Feld ist für Menschen unsichtbar.
if (feld('website', 200) !== '') {
    weiter(DANKE);
}

$name        = einzeilig(feld('name', 120));
$email       = einzeilig(feld('email', 200));
$telefon     = einzeilig(feld('telefon', 40));
$format      = einzeilig(feld('format', 20));
$nachricht   = feld('nachricht', 4000);
$einwilligung = feld('einwilligung', 5) === 'ja';

if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || !$einwilligung) {
    weiter(FEHLER);
}

if (!in_array($format, ['Praxis', 'Online', 'Egal'], true)) {
    $format = 'Egal';
}

$zeit = (new DateTime('now', new DateTimeZone('Europe/Berlin')))->format('d.m.Y, H:i');

$text  = "Neue Anfrage über die Website\n";
$text .= "================================\n\n";
$text .= "Name:      {$name}\n";
$text .= "E-Mail:    {$email}\n";
$text .= "Telefon:   " . ($telefon !== '' ? $telefon : '–') . "\n";
$text .= "Format:    {$format}\n";
$text .= "Gesendet:  {$zeit} Uhr\n";
$text .= "Einwilligung Datenschutz (Art. 9 DSGVO): ja\n\n";
$text .= "Nachricht:\n" . ($nachricht !== '' ? $nachricht : '–') . "\n";

$betreff = '=?UTF-8?B?' . base64_encode('Anfrage Erstgespräch: ' . $name) . '?=';

$header = implode("\r\n", [
    'From: =?UTF-8?B?' . base64_encode('Website Lea Bartz') . '?= <' . ABSENDER . '>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
]);

$ok = mail(EMPFAENGER, $betreff, $text, $header, '-f' . ABSENDER);

weiter($ok ? DANKE : FEHLER);
