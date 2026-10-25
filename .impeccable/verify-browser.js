const p = await browser.getPage('main');
await p.setViewport({width:1440,height:1000});
await p.reload();
await p.evaluate(() => document.fonts.ready);
const results = await p.evaluate(() => {
  const assert = (condition, label) => { if (!condition) throw new Error(label); };
  assert(GRIP_DATA.length === 26, '26 original source rows');
  assert(GRIP_DATA.every(r => ['Men','Women'].every(s => r[s].length === 5 && r[s].every(v => Number.isFinite(Number(v))))), 'complete numeric data');
  let cases = 0;
  for (const option of document.querySelector('#age').options) {
    document.querySelector('#age').value = option.value;
    for (const radio of document.querySelectorAll('input[name=sex]')) {
      radio.checked = true;
      document.querySelector('#age').dispatchEvent(new Event('change', {bubbles:true}));
      const expected = option.value === 'all' ? 26 : 2;
      assert(document.querySelectorAll('#norms-table tbody tr').length === expected, 'filtered row count');
      assert(exportRows().length === expected * (radio.value === 'all' ? 2 : 1), 'export selection matches table');
      assert(document.querySelector('#copy-preview').value.includes('Source:'), 'citation preserved');
      cases++;
    }
  }
  document.querySelector('#age').value = '55–59';
  document.querySelector('input[name=sex][value=Women]').checked = true;
  render();
  assert(document.querySelector('#norms-table tbody td').textContent === '57.3', 'known original sample value');
  for (const format of ['table', 'paragraph', 'bullets']) {
    document.querySelector(`input[name=format][value=${format}]`).checked = true;
    updateCopy();
    const output = document.querySelector('#copy-preview').value;
    assert(output.includes('57.3') && output.includes('47.3'), 'both hands exported');
    assert(!output.includes('101.1'), 'excluded sex not exported');
    assert(output.includes('lb'), 'units included');
    if (format === 'bullets') assert(output.startsWith('• Women'), 'bullets format');
    if (format === 'paragraph') assert(output.startsWith('Women, aged 55–59 years, right hand:'), 'paragraph format');
  }
  document.querySelector('input[name=format][value=table]').checked = true;
  document.querySelector('#table-style').value = 'markdown'; updateCopy();
  assert(document.querySelector('#copy-preview').value.includes('| --- |'), 'markdown separator');
  document.querySelector('#table-style').value = 'tsv'; updateCopy();
  assert(document.querySelector('#copy-preview').value.includes('Age (years)\tSex\tHand'), 'TSV fields');
  document.querySelector('#table-style').value = 'rich'; updateCopy();
  return {filterCases:cases, exportFormats:5, fontLoaded:document.fonts.check('14px "DM Sans"'), desktopOverflow:document.documentElement.scrollWidth>innerWidth};
});
console.log(results);
await p.browserContext().overridePermissions('http://localhost:4173', ['clipboard-read','clipboard-sanitized-write']);
await p.evaluate(() => document.querySelector('#copy-button').click());
await p.waitForFunction(() => document.querySelector('#copy-status').textContent.includes('Copied'));
console.log(await p.evaluate(async () => {
  const items = await navigator.clipboard.read();
  const text = await navigator.clipboard.readText();
  if (!text.includes('57.3') || text.includes('101.1')) throw new Error('clipboard selection mismatch');
  const html = await (await items[0].getType('text/html')).text();
  if (!html.includes('<table') || !html.includes('Source:')) throw new Error('rich table missing');
  return {clipboard:'actual rich HTML and text verified', types:items[0].types};
}));
await p.evaluate(() => document.querySelector('#filters').reset());
await p.waitForFunction(() => document.querySelectorAll('#norms-table tbody tr').length===26);
await p.evaluate(() => {if(!document.querySelector('#reset-filters').disabled) throw new Error('reset state');});
await p.shot({type:'jpeg',maxEdge:1440,quality:85});
await p.setViewport({width:390,height:844});
console.log(await p.evaluate(() => ({mobileWidth:innerWidth, documentWidth:document.documentElement.scrollWidth,tableWidth:document.querySelector('table').scrollWidth,tableViewport:document.querySelector('.table-scroll').clientWidth})));
await p.shot({type:'jpeg',maxEdge:1000,quality:85});
await p.evaluate(() => {document.querySelector('#age').value='55–59';document.querySelector('input[name=sex][value=Women]').checked=true;render();window.scrollTo(0,0)});
await p.shot({type:'jpeg',maxEdge:1000,quality:85});
console.log('PASS: filter combinations, exports, clipboard, reset, responsive widths');
