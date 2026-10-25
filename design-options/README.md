# Grip reference design options

Created with the authenticated pen.dev CLI in headless interactive mode. No app source code changed during this design round.

Open `grip-design-options.pen` in Pen. It contains three editable desktop screens, three mobile screens, and a comparison board. Keep `exports/` beside the file: the comparison board references these exported screen images.

| Option | Direction | Desktop | Phone |
| --- | --- | --- | --- |
| A | Cobalt clarity — bright white, cobalt, direct table layout | exports/dZ0SC.png | exports/OMKwq.png |
| B | Editorial warmth — Newsreader type, cream, terracotta, left lookup rail | exports/HM0LP.png | exports/Vp1Qf.png |
| C | Graphite focus — dark green charcoal, lime means, adjacent copy preview | exports/gUc1t.png | exports/Zy6Kt.png |

The desktop designs show the default full reference. Phone designs show the selected state: exact age 57, Women, matched to the original 55–59 group. Phones transpose the selected table into Measure / Right / Left columns to avoid horizontal scrolling.

## Exact-age behavior for implementation

- Keep both exact-age entry and range selection.
- An entered whole age selects the published group: 57 → 55–59; 75 and above → 75+.
- Show the matched band explicitly. Never interpolate or imply single-year norms.
- Under 20: show that the study supplies no norms for that age; do not substitute 20–24.
- Invalid or fractional input receives an inline explanation. Empty input restores the unfiltered table.
- Selecting a range clears the exact age to avoid contradictory controls.
- Copy output keeps the reference band, anatomical hand labels, units, all measures, and citation.

Designs are mockups, not functional prototypes. Final visual direction is pending user choice; exact-age handling has not yet been added to the running app. Data comes from the existing verified `data.js` file.

Checked all six screen exports visually. The CLI flags A's rightmost cell boundaries because of floating-point sizing (1216.0000000000003 vs 1216px); no text is clipped. Fixed a genuine heading overflow in B. No source data was modified.
