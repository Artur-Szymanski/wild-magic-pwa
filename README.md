# Wild Magic Surge 2024 — wersja testowa

To prosta statyczna aplikacja PWA przeznaczona do publikacji na GitHub Pages.

## Pliki

- `index.html` — struktura ekranu
- `style.css` — wygląd
- `app.js` — losowanie i wyświetlanie efektów
- `effects.json` — tabela efektów
- `manifest.json` — dane instalacyjnej aplikacji PWA
- `service-worker.js` — działanie offline
- `icons/` — ikony aplikacji

## Ważne

Plik `effects.json` zawiera wyłącznie autorskie dane demonstracyjne, a nie oficjalną tabelę z podręcznika.

## Uruchomienie lokalne

Ze względu na użycie `fetch()` i service workera aplikacji nie należy uruchamiać przez zwykłe dwukrotne kliknięcie pliku `index.html`.
Najprościej będzie opublikować ją na GitHub Pages albo uruchomić przez lokalny serwer HTTP.
