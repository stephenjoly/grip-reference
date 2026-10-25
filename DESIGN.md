---
name: Grip reference
description: Warm paper and teal for a compact clinical reference.
colors:
  paper: "#f7f6f2"
  surface: "#fffefa"
  ink: "#253e38"
  muted: "#58675f"
  teal: "#17594e"
  teal-dark: "#104438"
  wash: "#e9efea"
  line: "#d6dcd4"
  soft-line: "#e9eae3"
  control-border: "#a9b7ac"
  panel: "#eaf0e9"
  panel-border: "#b8c7bb"
  focus: "#2b7b69"
  white: "#ffffff"
typography:
  display:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "34px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.035em"
  title:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "16px"
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: "-0.02em"
  body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1.5
  data:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "12px"
    lineHeight: 1.45
rounded:
  panel: "6px"
  control: "4px"
  segment: "2px"
spacing:
  small: "4px"
  control-gap: "7px"
  compact: "12px"
  inset: "20px"
  section: "24px"
  workspace: "28px"
  page: "40px"
components:
  button-primary:
    backgroundColor: "{colors.teal}"
    textColor: "{colors.white}"
    rounded: "{rounded.control}"
    height: "44px"
    width: "100%"
  button-primary-hover:
    backgroundColor: "{colors.teal-dark}"
  button-reset:
    backgroundColor: "transparent"
    textColor: "{colors.teal}"
    height: "40px"
  select:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0 10px"
    height: "40px"
  segment-selected:
    backgroundColor: "{colors.teal}"
    textColor: "{colors.white}"
    rounded: "{rounded.segment}"
    padding: "0 12px"
    height: "32px"
  format-tab:
    textColor: "{colors.muted}"
    padding: "0 0 11px"
  table:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.data}"
    rounded: "{rounded.panel}"
  copy-panel:
    backgroundColor: "{colors.panel}"
    rounded: "{rounded.panel}"
    padding: "22px 20px"
  preview:
    rounded: "{rounded.control}"
    padding: "12px"
    height: "204px"
---

# Design System: Grip reference

## Overview

**Creative North Star: "The Clinical Reference Sheet"**

Warm paper, deep ink and teal create a quiet working reference. One locally hosted type family and compact controls keep dense values legible. The visual character supports the approved clinical workflow without promotional ornament.

Borders and pale tonal surfaces organize content. Motion is brief feedback: controls change color, refreshed data receives a short wash, and copy confirmation appears in place. Reduced-motion preferences suppress transitions and animation.

**Key Characteristics:**
- Warm paper with restrained teal emphasis.
- Compact typography and tabular numeric alignment.
- Flat surfaces, fine rules and gently rounded controls.
- Native form controls with visible keyboard focus.

## Colors

The palette combines warm neutral surfaces with green ink and a single teal accent family. Frontmatter carries the normative values; CSS custom properties in `styles.css` are the implementation source.

### Primary
- **Teal:** Links, the primary action, selected radio segments, mean values and success feedback.
- **Deep Teal:** Link and primary-action hover state.
- **Focus Teal:** The global keyboard-focus outline.

### Neutral
- **Paper / Surface:** Page canvas and inset control or table surfaces.
- **Ink / Muted:** Primary text and supporting information.
- **Wash / Panel:** Filter and table-header backgrounds, and the copy-tool surface.
- **Line / Soft Line:** Container edges, row groups and quieter column separators.
- **Control Border / Panel Border:** Select outlines and copy-tool separators.
- **White:** Text on selected teal controls.

**The Teal Meaning Rule.** Use teal for actionable, selected or emphasized content; retain readable text and structural borders without relying on color alone.

## Typography

**Display Font:** DM Sans, sans-serif fallback.
**Body Font:** DM Sans, sans-serif fallback.

The same locally hosted variable family carries headings, labels and data. Weight and spacing establish hierarchy; numeric data uses tabular figures.

### Hierarchy
- **Display:** Page heading; desktop size is in frontmatter, reducing to (28px) at the mobile breakpoint.
- **Title:** Section and tool headings; the study heading uses (17px) on larger screens.
- **Body:** Default reading text; increases to (15px) at the wide breakpoint.
- **Label:** Compact field labels; secondary annotations use (11px–13px) with regular weight.
- **Data:** Table values; single-sex views use (14px). Means and age labels use weight (600). Study paragraphs use (12px), line-height (1.8), and a maximum measure of (75ch).

**The Numeric Alignment Rule.** Right-align measurements and use tabular numerals; keep row labels left-aligned.

## Layout

Page regions share a centered maximum width of (1600px), with desktop horizontal insets from the page spacing token. The workspace uses a flexible data column and a (288px) copy panel separated by the workspace gap. At (1500px) and above, the copy panel widens to (310px); at (1150px) and below, page insets become (24px), the panel becomes (260px), and the gap becomes (20px).

At (900px) and below, the copy tool moves under the table and internally uses two columns. At (600px) and below, page insets become (20px), filters wrap, the age select spans the row, and the copy tool becomes a single column. The table retains its numeric structure inside a labelled scroll region, with sticky headers and age cells. Mobile table minimum widths are (790px), or (510px) for a single sex; the scroll region is capped at (570px) high.

Table cells use (7px 10px) padding by default, with breakpoint-specific density adjustments. Print styles remove controls, expose the full table and retain repeating headers.

## Elevation & Depth

No box shadows are used. Pale backgrounds, one-pixel rules and grouped table values provide depth and separation. The copy panel is sticky with a top offset of (20px) only in the desktop workspace; narrow layouts return it to normal document flow.

**The Flat Reference Rule.** Separate working regions through tonal surfaces and fine borders rather than raised cards.

## Shapes

Containers use the panel radius; controls use the control radius, with the smaller segment radius inside radio groups. Tables retain square internal cell geometry. Icons are authored inline SVG strokes, including copy, brand and outbound-link marks.

## Components

### Buttons

The primary copy action is a full-width teal button with a centered label and copy SVG. Hover uses deep teal; active uses a darker shade. The reset action is underlined teal text on a transparent surface. Disabled buttons reduce opacity to (0.5). Global keyboard focus uses a (3px) outline with a (4px) offset.

### Inputs / Fields

Native selects use the surface background, control radius and a one-pixel border that turns teal on hover. The preview is a readonly, vertically resizable textarea with a pale background, compact text and an explicit label. Its text is intentionally preformatted and scrollable.

### Segments and Format Tabs

Sex choices are native radio controls styled as a compact segmented group; the selected segment has a teal fill and white text. Copy-format choices use an underline tab treatment with teal text and weight (600) for selection. Both radio patterns expose a (3px) teal focus outline with a (3px) offset.

### Reference Table

Grouped headers, alternating right/left row pairs and fine age-group rules express structure without full cell boxing. Mean columns receive semibold teal text and a subtle tinted background. The pooled sample has its own pale row treatment. Hover lightly washes the row. Data refresh uses a (220ms) color animation with `cubic-bezier(0.16,1,0.3,1)` easing, suppressed for reduced motion.

### Copy Panel

The tinted container groups format selection, export style, preview and one primary action. Copy status stays in place below the action; the preview remains available for manual copying if clipboard access fails.

### Navigation

The compact header combines a teal wordmark with a small study anchor. Links use understated hover darkening and the global keyboard outline. Outbound study links carry authored SVG arrows.

## Do's and Don'ts

### Do:
- **Do** retain the warm paper, deep ink and teal palette.
- **Do** use semantic table headers, explicit form labels and visible keyboard focus.
- **Do** preserve numeric alignment and contained table scrolling on narrow screens.
- **Do** suppress transition and refresh motion when reduced motion is requested.

### Don't:
- **Don't** replace the flat tonal surfaces with raised, shadowed cards.
- **Don't** introduce a second display family or decorative type treatment.
- **Don't** replace authored SVG icons with text glyphs.
