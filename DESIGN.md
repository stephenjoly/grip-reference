---
name: Grip reference
description: Lilac, cool white and Geist for a compact clinical reference.
colors:
  accent: "#7052d6"
  accent-ink: "#7052d6"
  accent-hover: "#654ac1"
  accent-hover-ink: "#5f46b6"
  on-accent: "#ffffff"
  wash: "#f4f1fc"
  mean: "#fbfafe"
  paper: "#fbfafe"
  surface: "#ffffff"
  ink: "#242235"
  muted: "#706c85"
  line: "#e6e2ef"
  soft-line: "#efedf5"
  control-border: "#c8c2d7"
  preview: "#fafafd"
typography:
  display:
    fontFamily: "Geist, sans-serif"
    fontSize: "30px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Geist, sans-serif"
    fontSize: "16px"
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Geist, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Geist, sans-serif"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.5
  data:
    fontFamily: "Geist, sans-serif"
    fontSize: "12px"
    lineHeight: 1.45
rounded:
  control: "5px"
  table: "6px"
  panel: "8px"
  dialog: "10px"
spacing:
  small: "4px"
  compact: "12px"
  filter-inset: "18px"
  panel-inset: "20px"
  section: "24px"
  page: "32px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.control}"
    height: "42px"
    width: "100%"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
  button-reset:
    backgroundColor: "transparent"
    textColor: "{colors.accent-ink}"
    height: "40px"
  select:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0 12px"
    height: "42px"
  segment-selected:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.control}"
    padding: "0 15px"
    height: "40px"
  format-tab:
    textColor: "{colors.muted}"
    padding: "0 0 11px"
  table:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.data}"
    rounded: "{rounded.table}"
  copy-panel:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.panel}"
    padding: "20px"
  preview:
    backgroundColor: "{colors.preview}"
    textColor: "{colors.muted}"
    padding: "12px"
    height: "180px"
---

# Design System: Grip reference

## Overview

**Creative North Star: "The Lilac Reference Sheet"**

Cool white surfaces, dark violet ink and a configurable lilac accent make a quiet working reference. The user selected F / Lilac from `design-options/light-round/exports/r7oIC.png` and `aKB0r.png`. Geist, compact controls and aligned measurements carry the visual identity.

Fine borders and pale tinted surfaces organize the work. Brief color feedback accompanies controls and data changes; reduced-motion preferences suppress it. Purple is the default identity, while Settings allows the accent to follow the user's preference.

**Key Characteristics:**
- Cool white surfaces with a configurable lilac accent.
- Locally hosted Geist and tabular numeric alignment.
- Flat working regions, fine borders and gently rounded controls.
- Compact mobile measurement tables and a disclosed copy preview.

## Colors

A single accent family sits against cool neutral surfaces. Frontmatter records the active default after `settings.js` applies the purple preference; the initial CSS fallback uses slightly different pale tints. `styles.css` and the derivation in `settings.js` remain the implementation authority.

### Primary
- **Lilac Accent:** Filled actions and selected sex segments.
- **Accent Ink / Hover Ink:** Readable means, links, focus rings and hover text. Legacy CSS variables named `--teal` and `--teal-dark` are aliases for these roles, not a separate identity.
- **Accent Hover / On Accent:** Filled-action feedback and contrast-selected foreground.

### Neutral
- **Paper / Surface:** Tinted page ground and white table, filter and copy surfaces.
- **Ink / Muted:** Main text and supporting information.
- **Wash / Mean:** Table headers, selected/pooled states, feedback and mean-cell tint.
- **Line / Soft Line / Control Border:** Container edges, quieter table separators and field outlines.
- **Preview:** Slightly tinted readonly export area.

Settings offers Purple, Blue, Teal, Rose, Amber and Slate plus a native custom color picker. Wash mixes the accent with white at (92%); mean and paper use (97%). Accent text darkens until it reaches contrast (4.5:1) against wash, paper and white. Filled-action foreground is selected for contrast. Only the accent preference persists in browser storage; age and filter selections remain transient. Storage failure leaves the accent usable for the visit.

**The Accent Meaning Rule.** Use the current accent for actions, selection and emphasized measurements; derive readable text and foreground shades rather than hardcoding purple across components.

## Typography

**Display Font:** Geist, sans-serif fallback.
**Body Font:** Geist, sans-serif fallback.

The locally hosted variable font at `assets/geist.ttf` supplies weights (100–900). Weight, size and spacing establish hierarchy without a separate display family.

### Hierarchy
- **Display:** Page title reduces to (27px) at (600px), then (25px) at (370px).
- **Title:** Section and tool headings; Settings uses (20px), the study heading (17px).
- **Body:** Default reading text rises to (15px) at the inherited wide breakpoint (1500px). Intro copy uses (13px), or (12px) on mobile.
- **Label:** Filter labels use the frontmatter role; mobile labels and secondary metadata use (11px–12px).
- **Data:** Tabular figures and right alignment; desktop means use weight (500), single-sex tables use (14px). Compact mobile tables use (14px), with mean values at (25px), weight (600). Study text uses (12px), line-height (1.8), maximum measure (75ch).

**The Numeric Alignment Rule.** Right-align measurements and use tabular numerals; keep row labels left-aligned.

## Layout

Header, main and footer share a centered maximum width of (1536px) and horizontal insets from the page token. Desktop places horizontal filters above a flexible data table and a sticky copy rail (258px) with a (24px) gap. At (1440px) and above the rail becomes (280px). At (1100px) and below, page insets become (24px), the rail (240px), and the gap (20px).

At (900px) and below the workspace stacks; the copy area uses two columns until mobile. At (600px) and below the header is (76px) high, filters become a two-column grid, and an age-mode switch selects exact age or age group. A selected age band renders compact measurement tables with Right and Left columns, replacing the wide table. Unfiltered data retains contained table scrolling with sticky headings and age cells. At (370px) and below page insets reduce to (16px).

The mobile copy area is borderless and single-column. Its preview and table options sit in a native disclosure, collapsed initially on mobile and open on larger screens. Print hides controls, mobile summaries and Settings, and restores the full table with repeating headers.

## Elevation & Depth

Working surfaces are flat, separated by fine rules and tinted fills. Only Settings is lifted: its modal uses a restrained shadow (`0 4px 8px #24223515`) over a dim backdrop (`#24223555`). Selected accent swatches use an inset one-pixel emphasis. The desktop copy panel is sticky at (20px); stacked layouts restore normal flow.

**The Flat Reference Rule.** Separate working regions through tonal surfaces and fine borders; reserve the small shadow and dim backdrop for the Settings modal.

## Shapes

Controls have gently curved corners, with distinct table, panel and modal radii recorded in frontmatter. Internal table cells stay square. Borders are generally one pixel. Icons are authored inline SVG strokes; swatch color samples are small rounded squares.

## Components

### Buttons

The full-width copy action uses accent fill and contrast-selected foreground. Hover uses the derived accent-hover shade; active retains that shade. Reset is underlined accent text. Settings is a quiet text-and-SVG header action. Disabled buttons reduce opacity to (0.5). Global keyboard focus uses a (3px) accent-ink outline with a (4px) offset.

### Inputs / Fields

Labelled native selects and exact-age text input share the control geometry. Exact age maps into an adult reference band: (57) selects (55–59), and (75+) is the final band. Unsupported input shows visible feedback and an invalid border; it does not fabricate values. The readonly preview is resizable, preformatted for tables and wrapped for prose; its mobile height is (150px). Copy failure opens the disclosure for manual copying.

### Segments and Format Tabs

Sex choices are native radio inputs with separate tinted tiles and filled selection. Copy formats use underlined radio tabs; selection adds accent text and weight (600). Focus remains visible on the styled label. The mobile age switch uses accent text and weight to mark its selected mode.

### Reference Table

Grouped headers, age rules and subtle column separators retain the table's numeric structure. Means use accent ink and a pale tint. Pooled rows receive a wash; row hover uses the same family. Compact mobile tables show a caption with sex, age band and units, then a prominent mean row and smaller remaining measurements.

On data change, the data region washes from the current wash to transparent for (220ms) with `cubic-bezier(0.16,1,0.3,1)`. The animation is skipped when reduced motion is requested; CSS transitions are also disabled.

### Copy Panel

A white bordered desktop rail groups copy format, table options, preview and action. Mobile drops the outer border and puts preview/options behind disclosure. Status remains adjacent to the action. Copy content follows the current selection.

### Navigation

The header pairs the dark Geist wordmark and accent SVG with study and Settings actions. Supporting links use muted text; actionable study links use accent ink and its darker hover shade.

### Settings

A native dialog contains two-column preset swatches, a custom picker, reset and Done. Selected presets show both border and inset emphasis. The chosen accent applies immediately and updates the browser theme color. Reset restores purple.

## Do's and Don'ts

### Do:
- **Do** retain cool white surfaces and derive accent roles from Settings.
- **Do** use semantic table headers, explicit field labels and visible keyboard focus.
- **Do** preserve numeric alignment and compact selected-band tables on mobile.
- **Do** suppress transitions and the data wash when reduced motion is requested.
- **Do** persist only the accent preference, with a usable visit-only fallback.

### Don't:
- **Don't** restore the superseded warm-paper teal identity as the default.
- **Don't** turn flat working regions into raised cards.
- **Don't** introduce a second display family or replace authored SVGs with text glyphs.
- **Don't** hardcode accent foregrounds that bypass contrast adjustment.
