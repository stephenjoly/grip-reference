# Grip reference context

Current implementation follows user-selected F / Lilac from design-options/light-round/. User prefers modern, clean, clear, light UI and rejects dark/warm themes. Pen CLI was used for design exploration; selected desktop reference is exports/r7oIC.png and phone reference is exports/aKB0r.png. Original warm/teal design and A–C/D–E options are historical.

Static HTML/CSS/JS, no backend or build. Purple default with six accent presets and custom picker in Settings. Color alone is saved locally; contrast-adjusted accent text and button labels remain readable. Browser storage denial applies color for the current visit. Exact-age entry maps to published bands; under-20/invalid input returns no norms and disables copy. Phones transpose selected data to Measure/Right/Left and collapse copy preview options.

Data: Mathiowetz et al. (1985), Table 2, p. 71, PMID 3970660. data.js retains all 26 source rows and original precision. Right/left means anatomical side, not dominance. Copy includes selected values, pounds and citation as rich table, Markdown, TSV, paragraph or bullets.

Run: python3 -m http.server 4173. No public deployment or BB Connect pairing configured. Only local preview is available.

Verified 81 exact ages20–100, invalid/under-20 handling, actual rich HTML/text clipboard, eleven preset/custom contrast cases >=4.5:1, local color persistence/reload, Escape/focus return, storage-denied recovery, reduced motion, and no page overflow at320/390/768/1024/1440. Current browser verification source: .impeccable/verify-lilac.js. Screenshots: .impeccable/review/lilac-desktop.jpg, lilac-mobile.jpg, lilac-settings.jpg (ignored by git). DESIGN.md and schema2 sidecar now describe current Lilac/settings implementation. Independent finish review found no material visual defects and scored the persistence documentation fix resolved (ship).

## Hosting

Public GitHub repository: `stephenjoly/grip-reference`. Production hostname: `ogs.stephenjoly.net`. Root Dockerfile serves only app assets with unprivileged Nginx on 8080; deployment procedure is in `DEPLOYMENT.md`.

## Sharing preview

Approved purple card is `assets/grip-sharing-v1.png` (1733 × 907). Open Graph and large-image card metadata point to the canonical public hostname; container and CI asset allowlists include the image.
