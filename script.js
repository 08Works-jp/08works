const menu=document.querySelector('.menu');const nav=document.querySelector('.nav nav');menu.addEventListener('click',()=>{const opened=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(opened));});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}));document.getElementById('year').textContent=new Date().getFullYear();


// 08WORKS / SECRET GARAGE — triple tap, shutter and exploratory hotspots.
(()=>{
const logo=document.getElementById('secret-logo'),overlay=document.getElementById('secret-overlay'),flash=document.getElementById('secret-flash'),close=document.getElementById('secret-close'),detail=document.getElementById('garage-detail'),back=document.getElementById('garage-back');
let count=0,last=0,previousFocus=null;const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const zones={projects:['AREA 01','PROJECTS','制作実績・カスタムワーク・グラフィック。08Worksの仕事を紹介するショーケース。'],archive:['AREA 02','ARCHIVE','ラフ、試作、デザインの途中経過。完成品の裏側にあるアイデアの保管庫。'],apparel:['AREA 03','APPAREL LAB','パーカー・Tシャツ・プリント。ボディ選びから仕上がりまでを探る実験室。'],drop:['AREA 04','SECRET DROP','限定企画や新作予告のスペース。次の公開まで、STAY TUNED.']};
function tap(){let now=Date.now();if(now-last>1100)count=0;last=now;count++;logo.classList.remove('charge','glitch','burst');void logo.offsetWidth;if(count===1)logo.classList.add('charge');if(count===2)logo.classList.add('glitch');if(count>=3){count=0;logo.classList.add('burst');flash.classList.remove('fire');void flash.offsetWidth;if(!reduced)flash.classList.add('fire');previousFocus=document.activeElement;setTimeout(()=>{overlay.classList.add('show');overlay.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';detail.hidden=true;close.focus()},reduced?0:350)}}
function hide(){overlay.classList.remove('show');overlay.setAttribute('aria-hidden','true');document.body.style.overflow='';detail.hidden=true;(previousFocus||logo).focus()}
logo.addEventListener('click',tap);logo.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();tap()}});close.addEventListener('click',hide);
document.querySelectorAll('[data-zone]').forEach(btn=>btn.addEventListener('click',()=>{const [n,t,d]=zones[btn.dataset.zone];document.getElementById('garage-number').textContent=n;document.getElementById('garage-title').textContent=t;document.getElementById('garage-description').textContent=d;renderGarageItems(btn.dataset.zone);detail.hidden=false;back.focus()}));back.addEventListener('click',()=>{detail.hidden=true;document.querySelector('[data-zone]').focus()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&overlay.classList.contains('show')){if(!detail.hidden){detail.hidden=true;back.blur()}else hide()}if(e.key==='Tab'&&overlay.classList.contains('show')){const focusables=[...overlay.querySelectorAll('button:not([disabled])')].filter(el=>el.getClientRects().length);if(!focusables.length)return;const first=focusables[0],last=focusables[focusables.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
})();

// Entries are maintained in garage-content.js. Use DOM APIs for safe text rendering.
function renderGarageItems(zone){
 const root=document.getElementById('garage-items'),empty=document.getElementById('garage-empty');
 root.replaceChildren();
 const items=(window.GARAGE_CONTENT||[]).filter(x=>x.zone===zone && x.published!==false);
 empty.hidden=items.length>0;
 items.forEach(item=>{
  const card=document.createElement('article');card.className='garage-item';
  if(item.image){const img=document.createElement('img');img.src=item.image;img.alt=item.title||'制作写真';img.loading='lazy';card.append(img)}
  const body=document.createElement('div');body.className='garage-item-body';
  if(item.date){const date=document.createElement('span');date.className='garage-item-date';date.textContent=item.date;body.append(date)}
  const title=document.createElement('h4');title.textContent=item.title||'UNTITLED';body.append(title);
  if(item.description){const desc=document.createElement('p');desc.textContent=item.description;body.append(desc)}
  if(item.link && /^https:\/\//.test(item.link)){const a=document.createElement('a');a.href=item.link;a.target='_blank';a.rel='noopener noreferrer';a.textContent='VIEW MORE ↗';body.append(a)}
  card.append(body);root.append(card);
 });
}

// Discreet headlight toggle. No hopping or popup.
(()=>{
 const trigger=document.getElementById('impala-hotspot'), scene=document.querySelector('.garage-scene');
 if(!trigger||!scene)return;
 trigger.addEventListener('click',()=>{
  const on=scene.classList.toggle('lights-on');
  trigger.setAttribute('aria-pressed',String(on));
  trigger.setAttribute('aria-label',on?'インパラのヘッドライトを消灯':'インパラのヘッドライトを点灯');
 });
})();
// Exit garage before navigating to the public contact section.
document.getElementById('garage-contact-link')?.addEventListener('click',()=>{document.getElementById('secret-close')?.click();});
