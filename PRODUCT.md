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
Age and sex filters, right/left hand data, mean, SD, SE, low and high in pounds. Copy as table, paragraph or bullets. Preserve study categories rather than inferring hand dominance. Mobile-friendly and subtle motion.

## Brand Commitments
User rejected the initial warm-paper/teal implementation after reviewing it. Replacement visual direction is pending selection from three pen.dev CLI concepts in design-options/. Preserve minimal scrolling, table-first access and subtle transitions; the original palette is no longer binding.

Latest preference: simple, clean, clear, modern and light. Dark and warm concepts were rejected. New D / Mono, E / Cloud and F / Lilac options live in design-options/light-round/; selection is pending.

User now requires optional exact-age entry alongside range selection. Map whole ages to published study bands (e.g. 57 to 55–59), explicitly show the matched band, and do not interpolate single-year norms. This feature is designed but not yet implemented, pending visual selection.

## Evidence on Hand
Supplied screenshot of Table 2; PubMed record PMID 3970660; online original article scan. Data must be checked against the scan. No affiliation or endorsement claims.

## Product Principles
- Immediate access to the data.
- Accurate transcription and traceable citation.
- Copy only the currently selected reference values with units and citation.
- Keep the app static and easy to host.
