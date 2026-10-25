# Grip reference

Static adult grip-strength reference based on Table 2 (p. 71) of Mathiowetz et al. (1985), PMID [3970660](https://pubmed.ncbi.nlm.nih.gov/3970660/).

## Run

No dependencies or build step. Serve this directory with `python3 -m http.server 4173` and open http://localhost:4173. Upload `index.html`, `styles.css`, `app.js`, `settings.js`, `data.js`, `favicon.svg`, and `assets/` to any static host. The site uses no external scripts, services, or font requests.

## Behavior

Full table on first load, filters for age and original study sex categories, right/left hand data, and copy as rich table, Markdown, TSV, paragraph, or bullets. Word/Excel copy includes HTML and plain-text tab-separated alternatives. Clipboard restrictions fall back to text, then manual selection. Every export includes pounds and the citation.

Exact-age entry maps to original study bands (57 → 55–59, 75 and older → 75+). Invalid and under-20 input shows no matching norms and disables copy; no single-year interpolation. Choosing a range clears the exact age. On phones, a selected band displays a compact Measure / Right / Left table; preview and table export options can be expanded.

Settings offers six accent presets, a custom color picker, and reset to purple. Text shades and button labels adjust to maintain contrast. The browser stores only the accent preference; age and filters stay in memory. When storage is blocked, colors still apply for the current visit. No entered ages or filter values are sent to a service.

## Data

`data.js` preserves published precision for mean, SD, SE, low, and high. The 26 source rows include 24 age-specific rows and two pooled rows. Low/high are observed sample ranges, not clinical cutoffs. Right/left does not imply dominance. Data were transcribed from the supplied original Table 2 scan; secondary reproductions sometimes differ (e.g. SE for men 25–29, left hand), so use the original table as authority.

## Font

Geist is bundled locally under the SIL Open Font License; see `assets/Geist-OFL.txt`.

## Verification

Browser checks in `.impeccable/verify-lilac.js` cover 81 exact ages, invalid inputs, exports, actual rich clipboard output, eleven color contrast cases, saved color reload, dialog keyboard/focus behavior, and page overflow at 320, 390, 768, 1024, and 1440px. Storage-denied recovery and reduced-motion behavior were also checked. Static app data is unchanged from the original verified transcription.

## Deployment

Live: https://ogs.stephenjoly.net. See [DEPLOYMENT.md](DEPLOYMENT.md) for the staging-to-production release process.

## Sharing

Open Graph and large-image social cards use the approved purple preview at `assets/grip-sharing-v1.png` (1733 × 907). The canonical URL is https://ogs.stephenjoly.net/. Update the image filename and metadata together when replacing the card so sharing caches can discover the new asset.
