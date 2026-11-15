'use strict';
const $ = (selector) => document.querySelector(selector);
const ageSelect = $('#age');
const exactAge = $('#exact-age');
const birthday = $('#birthday');
let birthdayAge = null;
let ageError = '';
const mobileQuery = matchMedia('(max-width: 600px)');
const setPreviewLayout = () => { $('#copy-details').open = !mobileQuery.matches; };
setPreviewLayout();
mobileQuery.addEventListener('change', setPreviewLayout);
const citation = 'Mathiowetz V, Kashman N, Volland G, Weber K, Dowe M, Rogers S. (1985). Grip and pinch strength: Normative data for adults. Arch Phys Med Rehabil. 66(2):69–74. Table 2, p. 71. https://pubmed.ncbi.nlm.nih.gov/3970660/';
const metrics = ['Mean', 'SD', 'SE', 'Low', 'High'];
let currentText = '';
let currentHtml = '';
let copyTimer;
let revision = 0;
for (const age of new Set(GRIP_DATA.map(row => row.age))) {
  ageSelect.add(new Option(age === 'All subjects' ? 'All subjects (pooled)' : age, age));
}
function selection() {
  const sex = $('input[name="sex"]:checked').value;
  return { rows: ageError ? [] : GRIP_DATA.filter(row => ageSelect.value === 'all' || row.age === ageSelect.value), sexes: sex === 'all' ? ['Men', 'Women'] : [sex] };
}
function setAgeMode(mode) {
  $('#filters').dataset.ageMode = mode;
  $(`input[name="age-mode"][value="${mode}"]`).checked = true;
}
function selectAge(value) {
  ageError = '';
  ageSelect.value = 'all';
  if (value) {
    const age = Number(value);
    if (!/^[+-]?\d+$/.test(value) || !Number.isSafeInteger(age)) ageError = 'Enter a whole age in years, such as 57.';
    else if (age < 20) ageError = 'This study provides norms for adults aged 20 and older.';
    else ageSelect.value = age >= 75 ? '75+' : `${Math.floor(age / 5) * 5}–${Math.floor(age / 5) * 5 + 4}`;
  }
}
// Compare calendar dates, rather than parsing a birthday as a UTC instant.
// A February 29 birthday advances on March 1 in a non-leap year.
function ageFromBirthday(value, today = new Date()) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(0);
  date.setUTCFullYear(year, month - 1, day);
  if (year < 1 || date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return null;
  const current = [today.getFullYear(), today.getMonth() + 1, today.getDate()];
  const beforeBirthday = current[1] < month || (current[1] === month && current[2] < day);
  const age = current[0] - year - Number(beforeBirthday);
  return age < 0 ? null : age;
}
function readExactAge() {
  birthday.value = ''; birthdayAge = null;
  selectAge(exactAge.value.trim());
  setAgeMode('exact'); render();
}
function readBirthday() {
  exactAge.value = ''; birthdayAge = null;
  selectAge('');
  if (birthday.validity.badInput) ageError = 'Enter a complete, valid date of birth.';
  else if (birthday.value) {
    birthdayAge = ageFromBirthday(birthday.value);
    if (birthdayAge === null) ageError = 'Enter a valid date of birth on or before today.';
    else selectAge(String(birthdayAge));
  }
  setAgeMode('birthday'); render();
}
function exportRows() {
  const {rows, sexes} = selection();
  return rows.flatMap(row => sexes.map(sex => [row.age, sex, row.hand === 'R' ? 'Right' : 'Left', ...row[sex]]));
}
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[char]));
}
function updateCopy() {
  revision++;
  clearTimeout(copyTimer);
  $('#copy-status').textContent = '';
  const format = $('input[name="format"]:checked').value;
  const rows = exportRows();
  const headings = ['Age (years)', 'Sex', 'Hand', ...metrics.map(metric => `${metric} (lb)`)];
  const tsv = [headings, ...rows].map(row => row.join('\t')).join('\n');
  const source = `Source: ${citation}`;
  const ageNote = birthdayAge !== null && !ageError ? `Age today: ${birthdayAge} years. Reference age group: ${ageSelect.value} years.` : '';
  if (format === 'table') {
    const markdown = [headings, headings.map(() => '---'), ...rows].map(row => `| ${row.join(' | ')} |`).join('\n');
    currentText = `${$('#table-style').value === 'markdown' ? markdown : tsv}\n\n${source}`;
  } else {
    const statements = rows.map(([age, sex, hand, mean, sd, se, low, high]) => `${sex}, ${age === 'All subjects' ? 'all subjects (pooled)' : `aged ${age} years`}, ${hand.toLowerCase()} hand: mean ${mean} lb, SD ${sd} lb, SE ${se} lb, observed range ${low}–${high} lb.`);
    currentText = (format === 'bullets' ? statements.map(text => `• ${text}`).join('\n') : statements.join('\n\n')) + `\n\n${source}`;
  }
  if (ageNote) currentText += `\n\n${ageNote}`;
  currentHtml = `<table style="border-collapse:collapse"><caption>Adult grip strength norms (pounds)</caption><thead><tr>${headings.map(value => `<th style="border:1px solid #999;padding:6px;text-align:left">${escapeHtml(value)}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map(value => `<td style="border:1px solid #999;padding:6px">${escapeHtml(value)}</td>`).join('')}</tr>`).join('')}</tbody></table>${ageNote ? `<p>${escapeHtml(ageNote)}</p>` : ''}<p>${escapeHtml(source)}</p>`;
  $('#table-style-field').hidden = format !== 'table';
  $('#copy-preview').value = currentText;
  $('#copy-preview').classList.toggle('prose', format !== 'table');
  $('#copy-button').disabled = rows.length === 0;
  if (!rows.length) {
    currentText = ''; currentHtml = '';
    $('#copy-preview').value = '';
    $('#copy-preview').placeholder = 'Choose an age with available norms to copy reference values.';
  } else $('#copy-preview').placeholder = '';
  $('#copy-count').textContent = `${rows.length} entries`;
  $('#copy-button span').textContent = `Copy ${format === 'bullets' ? 'bullet points' : format}`;
}
function render() {
  const {rows, sexes} = selection();
  $('#norms-table thead').innerHTML = `<tr><th rowspan="2" scope="col">Age<span>years</span></th><th rowspan="2" scope="col">Hand</th>${sexes.map(sex => `<th class="group" colspan="5" scope="colgroup">${sex}<span>lb</span></th>`).join('')}</tr><tr>${sexes.map(() => metrics.map((metric, i) => `<th scope="col" class="${i === 0 ? 'mean group-start' : ''}">${metric}</th>`).join('')).join('')}</tr>`;
  $('#norms-table tbody').innerHTML = rows.map(row => `<tr class="${row.hand === 'R' ? 'age-start' : ''} ${row.age === 'All subjects' ? 'pooled' : ''}"><th scope="row" class="age-cell">${row.hand === 'R' ? row.age : `<span class="sr-only">${row.age}</span>`}</th><th scope="row" class="hand-cell">${row.hand === 'R' ? 'Right' : 'Left'}</th>${sexes.map(sex => row[sex].map((value, i) => `<td class="${i === 0 ? 'mean group-start' : ''}">${value}</td>`).join('')).join('')}</tr>`).join('');
  $('#norms-table').classList.toggle('single-sex', sexes.length === 1);
  const band = ageSelect.value === 'all' ? 'All age groups' : ageSelect.value === 'All subjects' ? 'All subjects · pooled sample' : `Ages ${ageSelect.value}`;
  $('#selection-title').textContent = ageError ? 'No matching norms' : band;
  $('#result-count').textContent = `${sexes.join(' & ')} · ${rows.length} rows`;
  $('#reset-filters').disabled = ageSelect.value === 'all' && sexes.length === 2 && !exactAge.value && !birthday.value && !birthday.validity.badInput;
  const feedback = $('#age-feedback');
  const birthdayMode = $('#filters').dataset.ageMode === 'birthday';
  feedback.hidden = !ageError && !exactAge.value.trim() && !birthdayMode;
  feedback.classList.toggle('error', Boolean(ageError));
  const calculatedAge = birthdayMode && birthdayAge !== null ? `Age ${birthdayAge} today · ` : '';
  feedback.textContent = calculatedAge + (ageError || (birthdayMode ? birthdayAge !== null ? `Uses the published ${ageSelect.value} age group. Birthday is not saved.` : 'Enter a birthday to calculate age today and find the matching norms. Birthday is not saved.' : exactAge.value.trim() ? `${Number(exactAge.value)} years matches the ${ageSelect.value} age group.` : ''));
  exactAge.setAttribute('aria-invalid', String(Boolean(ageError) && !birthdayMode));
  birthday.setAttribute('aria-invalid', String(Boolean(ageError) && birthdayMode));
  $('#empty-state').hidden = rows.length > 0;
  $('#empty-message').textContent = ageError;
  $('.table-scroll').hidden = !rows.length;
  $('.table-key').hidden = !rows.length;
  $('.scroll-hint').hidden = !rows.length;
  $('#copy-selection').textContent = `${ageError ? 'No matching norms' : band} · ${sexes.join(' & ')}`;
  const compact = rows.length === 2 && ageSelect.value !== 'all';
  $('.data-area').classList.toggle('has-mobile-results', compact);
  $('#mobile-results').innerHTML = compact ? sexes.map(sex => `<div class="mobile-measures"><table><caption>${sex} · ${band} · lb</caption><thead><tr><th scope="col">Measure</th><th scope="col">Right</th><th scope="col">Left</th></tr></thead><tbody>${metrics.map((metric, i) => `<tr class="${i === 0 ? 'mean-row' : ''}"><th scope="row">${metric}</th><td>${rows.find(row => row.hand === 'R')[sex][i]}</td><td>${rows.find(row => row.hand === 'L')[sex][i]}</td></tr>`).join('')}</tbody></table></div>`).join('') : '';
  updateCopy();
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    $('.data-area').animate([{backgroundColor:getComputedStyle(document.documentElement).getPropertyValue('--wash')}, {backgroundColor:'transparent'}], {duration:220, easing:'cubic-bezier(0.16,1,0.3,1)'});
  }
}
$('#filters').addEventListener('submit', event => event.preventDefault());
exactAge.addEventListener('input', readExactAge);
birthday.addEventListener('input', readBirthday);
birthday.addEventListener('change', readBirthday);
$('#filters').addEventListener('change', event => {
  if (event.target === ageSelect) {
    exactAge.value = ''; birthday.value = ''; birthdayAge = null; ageError = ''; setAgeMode('group');
  } else if (event.target.name === 'age-mode') {
    exactAge.value = ''; birthday.value = ''; birthdayAge = null; ageError = '';
    ageSelect.value = 'all';
    setAgeMode(event.target.value);
  }
  render();
});
$('#filters').addEventListener('reset', () => { queueMicrotask(() => { ageError = ''; birthdayAge = null; setAgeMode('exact'); render(); }); });
$('#clear-invalid').addEventListener('click', () => $('#filters').reset());
document.querySelectorAll('input[name="format"]').forEach(input => input.addEventListener('change', updateCopy));
$('#table-style').addEventListener('change', updateCopy);
$('#copy-button').addEventListener('click', async () => {
  if (!exportRows().length) return;
  const button = $('#copy-button');
  const version = revision;
  const text = currentText;
  const html = currentHtml;
  button.disabled = true;
  let copied = false;
  try {
    const rich = $('input[name="format"]:checked').value === 'table' && $('#table-style').value === 'rich';
    if (rich && navigator.clipboard?.write && window.ClipboardItem) {
      try {
        await navigator.clipboard.write([new ClipboardItem({'text/plain':new Blob([text], {type:'text/plain'}), 'text/html':new Blob([html], {type:'text/html'})})]);
        copied = true;
      } catch { /* Some browsers allow text copying but not HTML. */ }
    }
    if (!copied && navigator.clipboard?.writeText) {
      try { await navigator.clipboard.writeText(text); copied = true; } catch { /* Try local-file fallback. */ }
    }
    if (!copied) {
      const field = document.createElement('textarea');
      field.value = text; field.style.position = 'fixed'; field.style.left = '-9999px';
      document.body.append(field); field.select();
      copied = document.execCommand('copy'); field.remove(); button.focus();
    }
    if (version !== revision) return;
    if (!copied) throw new Error('clipboard unavailable');
    $('#copy-status').textContent = 'Copied. Ready to paste.';
    button.querySelector('span').textContent = 'Copied!';
    copyTimer = setTimeout(updateCopy, 2600);
  } catch {
    if (version !== revision) return;
    $('#copy-status').textContent = 'Copy blocked. Select the preview and copy manually.';
    $('#copy-details').open = true;
    $('#copy-preview').focus(); $('#copy-preview').select();
  } finally { button.disabled = !exportRows().length; }
});
render();
