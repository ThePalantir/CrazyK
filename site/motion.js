/* Page-specific choreography. No audio, pointer capture or scroll hijacking. */
(() => {
  'use strict';
  const root=document.documentElement;
  const systemMotion=matchMedia('(prefers-reduced-motion: reduce)');
  const output=document.querySelector('.setlist-output');
  const motionButtons=[...document.querySelectorAll('.motion-toggle')];
  let paused=new URLSearchParams(location.search).get('motion')==='reduce';
  let sheetRule;
  const sheet=[...document.styleSheets].find(s=>s.href&&s.href.endsWith('/polish.css'));
  try {const at=sheet.insertRule(':root { --page-progress:0; --hero-travel:0px; --meter-travel:0px; }',sheet.cssRules.length);sheetRule=sheet.cssRules[at].style;} catch(e) { /* motion is optional */ }
  function reduced(){return paused||systemMotion.matches;}
  function syncMotion(){
    const off=reduced();root.classList.toggle('motion-off',off);
    motionButtons.forEach(b=>{b.setAttribute('aria-pressed',String(off));b.setAttribute('aria-label',systemMotion.matches?'Animations reduced by your system setting':off?'Resume decorative animations':'Pause decorative animations');b.querySelector('.motion-label').textContent=off?'Motion off':'Motion on';b.querySelector('.motion-icon').textContent=off?'▷':'Ⅱ';});
    requestUpdate();
  }
  motionButtons.forEach(b=>b.addEventListener('click',()=>{paused=!paused;syncMotion();}));
  systemMotion.addEventListener('change',syncMotion);
  const modes={
    wedding:{title:'YOUR FIRST DANCE.<br>YOUR FAVORITE PEOPLE.',description:'Ceremony music, speeches and a dance floor that feels like you.',occasion:'Wedding',href:'#weddings',link:'Explore wedding packages ↗'},
    karaoke:{title:'YOUR SONG.<br>YOUR MOMENT.',description:'A deep music library, a welcoming host and the kind of night people talk about.',occasion:'Karaoke dance party',href:'#karaoke',link:'Explore karaoke & events ↗'},
    booth:{title:'GET EVERYONE IN.<br>KEEP THE MEMORY.',description:'Customized photo strips, fun props and room for up to 15 guests. Strike a pose.',occasion:'Photo booth',href:'#photobooth',link:'Explore photo booth packages ↗'}
  };
  function chooseTrack(name,explicit){
    const mode=modes[name];if(!mode)return;
    document.querySelectorAll('[data-track]').forEach(b=>{const on=b.dataset.track===name;b.classList.toggle('is-selected',on);b.setAttribute('aria-pressed',String(on));});
    output.dataset.sound=name;
    document.getElementById('track-title').innerHTML=mode.title;
    document.getElementById('track-description').textContent=mode.description;
    const a=document.getElementById('track-link');a.href=mode.href;a.textContent=mode.link;
    output.classList.remove('is-changing');
    requestAnimationFrame(()=>output.classList.add('is-changing'));
    if(explicit){document.getElementById('occasion').value=mode.occasion;document.getElementById('selected-package').value='';}
  }
  document.querySelectorAll('[data-track]').forEach(b=>b.addEventListener('click',()=>chooseTrack(b.dataset.track,true)));
  document.querySelectorAll('[data-package],[data-occasion]').forEach(a=>a.addEventListener('click',()=>{const name=a.dataset.occasion==='Wedding'?'wedding':a.dataset.occasion==='Photo booth'?'booth':'karaoke';chooseTrack(name,false);}));
  // Labels and prices never disappear on scroll-up. Each entrance happens once.
  document.querySelectorAll('.intro h2,.setlist-heading h2,.section-top h2,.karaoke h2,.booth-heading h2,.about h2,.awards h2,.partners h2').forEach(e=>e.setAttribute('data-sc-in',''));
  document.querySelectorAll('.packages,.values,.award-grid').forEach(group=>{group.classList.add('is-staggered');group.setAttribute('data-sc-stagger','55');[...group.children].forEach(e=>e.setAttribute('data-sc-in',''));});
  document.querySelectorAll('.booth-heading figure,.portrait,.booth-gallery figure').forEach(e=>{e.setAttribute('data-sc-in','');e.classList.add('photo-reveal');});
  document.querySelectorAll('main>section:not([data-sc-act])').forEach(e=>e.setAttribute('data-sc-act','flow'));
  const mic=document.querySelector('.mic-art');
  const micEq=document.createElement('div');micEq.className='mic-eq';micEq.setAttribute('aria-hidden','true');micEq.innerHTML='<i></i>'.repeat(20);mic.append(micEq);
  try {
    if(window.ScrollCraft&&typeof window.ScrollCraft.mount==='function'){
      window.ScrollCraft.mount(document.body);root.classList.add('motion-ready');
    }
  } catch(e) {root.classList.remove('motion-ready');}
  const liveTargets=[document.querySelector('.hero'),document.querySelector('.setlist'),document.querySelector('.karaoke')];
  if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(e=>e.target.classList.toggle('is-live',e.isIntersecting)),{rootMargin:'80px'});liveTargets.forEach(e=>observer.observe(e));}else liveTargets.forEach(e=>e.classList.add('is-live'));
  document.addEventListener('visibilitychange',()=>root.classList.toggle('page-hidden',document.hidden));
  // Track visible sections for useful navigation feedback.
  const navLinks=[...document.querySelectorAll('nav a')];
  const sections=navLinks.map(a=>({link:a,section:document.querySelector(a.hash)})).filter(x=>x.section);
  let queued=false;
  const hero=document.querySelector('.hero');
  function update(){
    queued=false;const y=window.scrollY;const max=document.documentElement.scrollHeight-innerHeight;
    if(sheetRule){sheetRule.setProperty('--page-progress',String(Math.max(0,Math.min(1,y/Math.max(1,max)))));const travel=reduced()||innerWidth<761?0:Math.max(0,Math.min(1,y/Math.max(1,hero.offsetHeight)));sheetRule.setProperty('--hero-travel',`${(travel*32).toFixed(2)}px`);sheetRule.setProperty('--meter-travel',`${(-travel*24).toFixed(2)}px`);}
    let active=null;for(const item of sections){if(item.section.getBoundingClientRect().top<180)active=item;}
    sections.forEach(item=>{if(active===item)item.link.setAttribute('aria-current','location');else item.link.removeAttribute('aria-current');});
  }
  function requestUpdate(){if(!queued){queued=true;requestAnimationFrame(update);}}
  window.addEventListener('scroll',requestUpdate,{passive:true});window.addEventListener('resize',requestUpdate,{passive:true});
  let word=0;const words=[...document.querySelectorAll('.rotator b')];
  setInterval(()=>{if(document.hidden||reduced()||!hero.classList.contains('is-live'))return;const prior=words[word];prior.classList.remove('is-on');prior.classList.add('is-out');setTimeout(()=>prior.classList.remove('is-out'),500);word=(word+1)%words.length;words[word].classList.add('is-on');},2800);
  document.querySelector('#inquiry button[type="submit"]').disabled=false;
  syncMotion();
})();
