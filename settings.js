/* Color is the only preference persisted. Ages and filter selections are not stored. */
(() => {
  'use strict';
  const root = document.documentElement;
  const dialog = document.querySelector('#settings-dialog');
  const custom = document.querySelector('#custom-accent');
  const status = document.querySelector('#settings-status');
  const key = 'grip-reference-accent';
  const defaultColor = '#7052d6';
  const valid = color => typeof color === 'string' && /^#[\da-f]{6}$/i.test(color);
  const rgb = hex => [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16));
  const hex = channels => '#' + channels.map(n => Math.round(n).toString(16).padStart(2, '0')).join('');
  const mix = (color, target, amount) => hex(rgb(color).map((n, i) => n + (rgb(target)[i] - n) * amount));
  const luminance = color => rgb(color).map(n => {
    const value = n / 255;
    return value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4;
  }).reduce((sum, n, i) => sum + n * [.2126, .7152, .0722][i], 0);
  const contrast = (a, b) => (Math.max(luminance(a), luminance(b)) + .05) / (Math.min(luminance(a), luminance(b)) + .05);
  function apply(color, persist = false) {
    if (!valid(color)) return;
    color = color.toLowerCase();
    const wash = mix(color, '#ffffff', .92);
    const paper = mix(color, '#ffffff', .97);
    let ink = color;
    // A separate text shade preserves readable accents even with very pale custom colors.
    for (let i = 0; i < 100 && Math.min(contrast(ink, wash), contrast(ink, paper), contrast(ink, '#ffffff')) < 4.5; i++) ink = mix(ink, '#000000', .06);
    const onAccent = contrast('#ffffff', color) >= 4.5 ? '#ffffff' : contrast('#181b22', color) >= 4.5 ? '#181b22' : '#000000';
    const hover = mix(color, onAccent === '#ffffff' ? '#000000' : '#ffffff', .1);
    const properties = {'--accent':color, '--accent-ink':ink, '--accent-hover':hover, '--accent-hover-ink':mix(ink, '#000000', .15), '--on-accent':onAccent, '--wash':wash, '--mean':mix(color, '#ffffff', .97), '--paper':paper};
    Object.entries(properties).forEach(([property, value]) => root.style.setProperty(property, value));
    custom.value = color;
    const matching = [...document.querySelectorAll('input[name="accent"]')].find(input => input.value === color);
    (matching || document.querySelector('#custom-accent-choice')).checked = true;
    document.querySelector('meta[name="theme-color"]').content = color;
    if (persist) {
      try { localStorage.setItem(key, color); status.textContent = 'Accent color saved in this browser.'; }
      catch { status.textContent = 'Color applied for this visit. Browser storage is unavailable.'; }
    }
  }
  let saved;
  try { saved = localStorage.getItem(key); }
  catch { status.textContent = 'Color applies for this visit. Browser storage is unavailable.'; }
  apply(valid(saved) ? saved : defaultColor);
  document.querySelector('#open-settings').addEventListener('click', () => dialog.showModal());
  document.querySelectorAll('input[name="accent"]').forEach(input => input.addEventListener('change', () => apply(input.value === 'custom' ? custom.value : input.value, true)));
  custom.addEventListener('input', () => apply(custom.value, true));
  document.querySelector('#reset-accent').addEventListener('click', () => apply(defaultColor, true));
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
})();
