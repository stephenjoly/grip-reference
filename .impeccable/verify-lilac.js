const p = await browser.getPage('main');
await p.setCacheEnabled(false);
const errors = []; p.on('pageerror', e => errors.push(e.message));
await p.setViewport({width:1440,height:1000});
await p.goto('http://localhost:4173');
await p.evaluate(() => document.fonts.ready);
console.log(await p.evaluate(() => {
  const check = (value, message) => {if (!value) throw Error(message);};
  const age = document.querySelector('#exact-age');
  const enter = value => {age.value=String(value); age.dispatchEvent(new Event('input',{bubbles:true}));};
  let count=0;
  for(let n=20;n<=100;n++) {enter(n); check(ageSelect.value===(n>=75?'75+':`${Math.floor(n/5)*5}–${Math.floor(n/5)*5+4}`),'age band '+n);check(exportRows().length===4,'both sexes / both hands');count++;}
  for(const value of ['19','-1','57.5','abc','1e2']) {enter(value);check(exportRows().length===0 && document.querySelector('#copy-button').disabled,'invalid age must not export '+value);}
  enter('57');document.querySelector('input[name=sex][value=Women]').checked=true;render();
  for(const format of ['table','paragraph','bullets']) {document.querySelector(`input[name=format][value=${format}]`).checked=true;updateCopy();check(currentText.includes('57.3')&&currentText.includes('47.3')&&!currentText.includes('101.1'),'selected export');check(currentText.includes('lb')&&currentText.includes('1985'),'units and citation');}
  document.querySelector('input[name=format][value=table]').checked=true;document.querySelector('#table-style').value='rich';updateCopy();
  ageSelect.value='75+';ageSelect.dispatchEvent(new Event('change',{bubbles:true}));check(age.value===''&&exportRows().length===2,'range clears exact age');
  document.querySelector('#filters').reset();
  return {exactAgeCases:count,invalidCases:5,exports:'selected values, units, citation'};
}));
await p.waitForFunction(()=>document.querySelectorAll('#norms-table tbody tr').length===26);
await p.evaluate(()=>{document.querySelector('#open-settings').focus();document.querySelector('#open-settings').click();});
await p.keyboard.press('Escape');
console.log(await p.evaluate(()=>({dialogClosed:!document.querySelector('dialog').open,focusReturned:document.activeElement.id==='open-settings'})));
console.log(await p.evaluate(()=>{
  const lum=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);
  const contrast=(a,b)=>(Math.max(lum(a),lum(b))+.05)/(Math.min(lum(a),lum(b))+.05);
  const root=document.documentElement;
  const variable=n=>getComputedStyle(root).getPropertyValue(n).trim();
  const custom=document.querySelector('#custom-accent');
  const colors=['#7052d6','#2465df','#0f766e','#be3f71','#b45309','#475569','#ffffff','#ffff00','#000000','#7f7f7f','#eeeeff'];
  for(const color of colors){custom.value=color;custom.dispatchEvent(new Event('input',{bubbles:true}));if(contrast(variable('--accent'),variable('--on-accent'))<4.5||contrast(variable('--accent-ink'),'#ffffff')<4.5||contrast(variable('--accent-ink'),variable('--wash'))<4.5)throw Error('contrast '+color);}
  document.querySelector('input[name=accent][value="#2465df"]').checked=true;document.querySelector('input[name=accent][value="#2465df"]').dispatchEvent(new Event('change',{bubbles:true}));
  return {colorCases:colors.length,contrast:'WCAG 4.5:1 checked'};
}));
await p.reload();
console.log(await p.evaluate(()=>{if(getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()!=='#2465df')throw Error('color did not persist');document.querySelector('#reset-accent').click();return {colorPersistence:true};}));
await p.browserContext().overridePermissions('http://localhost:4173',['clipboard-read','clipboard-sanitized-write']);
await p.evaluate(()=>{const a=document.querySelector('#exact-age');a.value='57';a.dispatchEvent(new Event('input',{bubbles:true}));document.querySelector('input[name=sex][value=Women]').checked=true;render();document.querySelector('#copy-button').click();});
await p.waitForFunction(()=>document.querySelector('#copy-status').textContent.includes('Copied'));
console.log(await p.evaluate(async()=>{const values=await navigator.clipboard.readText();const items=await navigator.clipboard.read();if(!values.includes('57.3')||values.includes('101.1')||!items[0].types.includes('text/html'))throw Error('clipboard mismatch');return {clipboard:'rich table + text verified'};}));
for(const width of [320,390,768,1024,1440]) {await p.setViewport({width,height:900});const overflow=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth);if(overflow)throw Error('page overflow '+width);}
await p.setViewport({width:1440,height:1000});
await p.evaluate(async()=>{document.querySelector('#filters').reset();await Promise.all(document.getAnimations().map(a=>a.finished.catch(()=>{})));window.scrollTo(0,0);});
await p.shot({type:'jpeg',fullPage:true,maxEdge:1800,quality:85});
await p.setViewport({width:390,height:844});
await p.evaluate(async()=>{const a=document.querySelector('#exact-age');a.value='57';a.dispatchEvent(new Event('input',{bubbles:true}));document.querySelector('input[name=sex][value=Women]').checked=true;render();await Promise.all(document.getAnimations().map(a=>a.finished.catch(()=>{})));window.scrollTo(0,0);});
await p.shot({type:'jpeg',fullPage:true,maxEdge:1800,quality:85});
await p.evaluate(()=>document.querySelector('#open-settings').click());
await p.shot({type:'jpeg',maxEdge:1000,quality:85});
console.log({pageErrors:errors, responsive:'320,390,768,1024,1440 checked',result:'PASS'});
