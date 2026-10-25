# Grip reference

Static adult grip-strength reference based on Table 2 (p. 71) of Mathiowetz et al. (1985), PMID [3970660](https://pubmed.ncbi.nlm.nih.gov/3970660/).

## Run

No dependencies or build step. Serve this directory with `python3 -m http.server 4173` and open http://localhost:4173. Upload `index.html`, `styles.css`, `app.js`, `data.js`, `favicon.svg`, and `assets/` to any static host. The site uses no external scripts, services, or font requests.

## Behavior

Full table on first load, filters for age and original study sex categories, right/left hand data, and copy as rich table, Markdown, TSV, paragraph, or bullets. Word/Excel copy includes HTML and plain-text tab-separated alternatives. Clipboard restrictions fall back to text, then manual selection. Every export includes pounds and the citation. No patient data is entered or stored.

## Data

`data.js` preserves published precision for mean, SD, SE, low, and high. The 26 source rows include 24 age-specific rows and two pooled rows. Low/high are observed sample ranges, not clinical cutoffs. Right/left does not imply dominance. Data were transcribed from the supplied original Table 2 scan; secondary reproductions sometimes differ (e.g. SE for men 25–29, left hand), so use the original table as authority.

## Font

DM Sans is bundled locally under the SIL Open Font License; see `assets/OFL.txt`.
