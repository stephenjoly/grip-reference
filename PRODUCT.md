# Grip reference

<!-- impeccable:product-schema 1 -->

## Platform
web

## Stack
Plain static HTML, CSS and JavaScript, consistent with the approved static-site brief. No backend or accounts. Hosting target remains open.

## Users
Occupational therapists looking up adult grip strength norms during documentation or assessment.

## Product Purpose
Replace hunting for a PDF with immediate table access and quick copying into clinical documentation.

## Operating Context
The user supplied a scan of Table 2 from Mathiowetz et al. Full table visible first; users filter by age and sex and copy matching values.

## Capabilities and Constraints
Full table on first load. Exact-age entry and range/sex filters, right/left hand data, mean, SD, SE, low and high in pounds. Exact ages map to the published group (57 to 55–59; 75+ uses the final band), never interpolation. Under-20 and invalid inputs show no norms and disable copying. Copy as rich table, Markdown, TSV, paragraph or bullets. Preserve study categories rather than inferring hand dominance. Mobile selected-band tables use Measure / Right / Left columns. Mobile-friendly and subtle motion.

## Brand Commitments
User selected F / Lilac from the pen.dev CLI concepts in design-options/light-round/. Simple, clean, clear, modern and light; dark/warm concepts were rejected. Preserve table-first access, restrained motion, purple default, and Geist typography. Settings lets each user choose an accent preset or custom color. Color is saved locally when browser storage is available; age and filter selections are not persisted or transmitted.

## Evidence on Hand
Supplied screenshot of Table 2; PubMed record PMID 3970660; online original article scan. Data must be checked against the scan. No affiliation or endorsement claims.

## Product Principles
- Immediate access to the data.
- Accurate transcription and traceable citation.
- Copy only the currently selected reference values with units and citation.
- Keep the app static and easy to host.
