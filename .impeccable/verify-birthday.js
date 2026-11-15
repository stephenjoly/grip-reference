const p = await browser.getPage('main');
await p.setCacheEnabled(false);
const errors=[];p.on('pageerror',e=>errors.push(e.message));
await p.setViewport({width:1440,height:1000});
await p.goto('http://localhost:4175');
await p.evaluate(()=>document.fonts.ready);
console.log(await p.evaluate(async()=>{
 const check=(ok,msg)=>{if(!ok)throw Error(msg)};
 const cases=[
 ['1969-11-15',2026,11,14,56],['1969-11-15',2026,11,15,57],['1969-11-15',2026,11,16,57],
 ['2000-02-29',2025,2,28,24],['2000-02-29',2025,3,1,25],['2000-02-29',2024,2,29,24],
 ['2006-12-31',2026,1,1,19],['2006-12-31',2026,12,31,20],
 ['2026-11-16',2026,11,15,null],['2027-01-01',2026,11,15,null],
 ['2025-02-29',2026,11,15,null],['2000-04-31',2026,11,15,null],['0000-01-01',2026,11,15,null],['',2026,11,15,null]
 ];
 for(const [value,y,m,d,expected]of cases)check(ageFromBirthday(value,new Date(y,m-1,d,0,5))===expected,'calendar '+value+' on '+[y,m,d]);
 const choose=mode=>{const field=document.querySelector(`input[name="age-mode"][value="${mode}"]`);field.checked=true;field.dispatchEvent(new Event('change',{bubbles:true}));};
 const today=new Date();const isoAge=age=>[today.getFullYear()-age,String(today.getMonth()+1).padStart(2,'0'),String(today.getDate()).padStart(2,'0')].join('-');
 const enter=value=>{birthday.value=value;birthday.dispatchEvent(new Event('input',{bubbles:true}));};
 choose('birthday');
 for(let age=20;age<=100;age++){
  enter(isoAge(age));check(birthdayAge===age,'calculated age '+age);
  check(ageSelect.value===(age>=75?'75+':`${Math.floor(age/5)*5}–${Math.floor(age/5)*5+4}`),'band '+age);
  check(exportRows().length===4,'norm rows '+age);
 }
 enter(isoAge(57));document.querySelector('input[name=sex][value=Women]').checked=true;render();
 for(const format of ['table','paragraph','bullets']){
  document.querySelector(`input[name=format][value=${format}]`).checked=true;updateCopy();
  check(currentText.includes('57.3')&&currentText.includes('47.3')&&currentText.includes('Age today: 57 years.'),'copy '+format);
  check(!currentText.includes(birthday.value)&&!currentHtml.includes(birthday.value),'birthday privacy');
 }
 for(const value of [isoAge(19),isoAge(0),isoAge(-1)]){enter(value);check(!exportRows().length&&document.querySelector('#copy-button').disabled,'unsupported date '+value);}
 enter(isoAge(57));choose('exact');check(birthday.value===''&&birthdayAge===null,'mode clears birthday');
 exactAge.value='57';exactAge.dispatchEvent(new Event('input',{bubbles:true}));check(ageSelect.value==='55–59','exact age preserved');
 choose('group');ageSelect.value='75+';ageSelect.dispatchEvent(new Event('change',{bubbles:true}));check(exportRows().length===2,'group preserved');
 choose('birthday');enter(isoAge(57));document.querySelector('#filters').reset();await Promise.resolve();
 check(birthday.value===''&&birthdayAge===null&&exportRows().length===52,'reset');
 choose('birthday');enter(isoAge(57));document.querySelector('input[name=sex][value=Women]').checked=true;render();
 document.querySelector('input[name=format][value=table]').checked=true;document.querySelector('#table-style').value='rich';updateCopy();
 return {calendarCases:cases.length,birthdayAges:81,invalidAndUnder20:'PASS',modeSwitchReset:'PASS',exportAndPrivacy:'PASS'};
}));
await p.browserContext().overridePermissions('http://localhost:4175',['clipboard-read','clipboard-sanitized-write']);
await p.evaluate(()=>document.querySelector('#copy-button').focus());
await p.keyboard.press('Enter');
await p.waitForFunction(()=>document.querySelector('#copy-status').textContent.includes('Copied'));
console.log(await p.evaluate(async()=>{const text=await navigator.clipboard.readText();if(!text.includes('Age today: 57 years.')||text.includes(birthday.value))throw Error('clipboard');return {clipboard:'age + norms, no birthday'};}));
for(const width of [320,390,768,1024,1440]){
 await p.setViewport({width,height:900});
 for(const mode of ['exact','birthday','group']){
  await p.evaluate(mode=>{const r=document.querySelector(`input[name="age-mode"][value="${mode}"]`);r.checked=true;r.dispatchEvent(new Event('change',{bubbles:true}));},mode);
  if(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('overflow '+width+' '+mode);
 }
}
await p.evaluate(()=>{const r=document.querySelector('input[name="age-mode"][value="birthday"]');r.checked=true;r.dispatchEvent(new Event('change',{bubbles:true}));birthday.value='1969-11-15';birthday.dispatchEvent(new Event('input',{bubbles:true}));document.querySelector('input[name=sex][value=Women]').checked=true;render();});
await p.setViewport({width:1440,height:1000});await p.shot({type:'jpeg',maxEdge:1400,quality:80});
await p.setViewport({width:390,height:844});await p.shot({type:'jpeg',fullPage:true,maxEdge:1500,quality:80});
if(errors.length)throw Error(errors.join(';'));
console.log({responsive:'3 modes × 5 widths',pageErrors:errors,result:'PASS'});
