# Project context

User approved and requested a plain static grip strength reference for OTs. Full original table first, age/sex filters, copying as tables/paragraphs/bullets, mobile layout, subtle motion. Impeccable is the requested design skill; approved warm-paper/ink/teal direction is recorded in DESIGN.md.

Source: Mathiowetz et al. (1985), Table 2, page 71; PMID 3970660. Preserve original precision and anatomical right/left labels. `data.js` contains all 26 source rows. No backend, account, build tool, or patient records. Hosting target and final product name remain unconfirmed; current name is Grip reference.

Run with `python3 -m http.server 4173`. No deployment performed. Browser verification covers desktop/mobile, filtering/reset, copy content and clipboard behavior.

Verified 42 age/sex combinations, five export formats, actual rich HTML + text clipboard output, manual-select recovery when copying is blocked, reduced motion (zero animations), font loading, reset, and no page overflow at 1440px/390px. Screenshots under `.impeccable/review/` are ignored by git. Independent Impeccable finish review scored its sole SVG-icon fix resolved (ship). No public hosting or BB Connect pairing configured.
