(() => {
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const stories=[...document.querySelectorAll('[data-studio-story]')];
 let raf=0;
 const progress=new Map(stories.map(s=>[s,0]));
 const clamp=x=>Math.max(0,Math.min(1,x));
 function update(){
  raf=0;let moving=false;
  for(const story of stories){
   if(story.closest('.care-case').hidden)continue;
   const scene=story.querySelector('.studio-device-scene'),r=story.getBoundingClientRect();
   const target=reduced.matches?1:clamp(-r.top/Math.max(1,r.height-scene.clientHeight));
   const p=reduced.matches?1:progress.get(story)+(target-progress.get(story))*.15;progress.set(story,p);
   const x=clamp((p-.04)/.55),spread=x*x*(3-2*x);
   story.style.setProperty('--studio-spread',spread);story.style.setProperty('--care-progress',Math.max(.02,p));
   const beat=p<.27?0:p<.74?1:2;
   const key=story.closest('.studio-case').id.replace('work-','');
   scene.querySelector('[data-studio-beat]').textContent=['01 / Discover','02 / Make it personal','03 / Bring it together'][beat];
   scene.querySelector('[data-studio-title]').textContent=window.studioCases[key].labels[beat];
   if(Math.abs(target-p)>.001)moving=true;
  }
  if(moving)queue();
 }
 function queue(){if(!raf&&!document.hidden&&!document.body.classList.contains('menu-open'))raf=requestAnimationFrame(update);}
 document.querySelectorAll('.studio-case').forEach(page=>{
  const buttons=[...page.querySelectorAll('[data-studio-step]')],screens=[...page.querySelectorAll('[data-studio-screen]')];
  const select=i=>{buttons.forEach((b,j)=>b.setAttribute('aria-pressed',String(j===i)));screens.forEach((s,j)=>s.hidden=j!==i);};
  buttons.forEach((button,i)=>{
   button.addEventListener('click',()=>select(i));
   button.addEventListener('keydown',e=>{if(!['ArrowDown','ArrowRight','ArrowUp','ArrowLeft','Home','End'].includes(e.key))return;e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?2:(i+(/Down|Right/.test(e.key)?1:2))%3;select(next);buttons[next].focus({preventScroll:true});});
  });
 });
 const animated=[...document.querySelectorAll('.studio-brand-section')];
 const visible=new Set();
 function sync(){const active=!document.hidden&&!document.body.classList.contains('has-overlay')&&!reduced.matches;animated.forEach(el=>el.classList.toggle('is-in-view',active&&visible.has(el)&&!el.closest('.care-case').hidden));queue();}
 new IntersectionObserver(entries=>{entries.forEach(e=>e.isIntersecting?visible.add(e.target):visible.delete(e.target));sync();},{threshold:.1}).observe(animated[0]);
 new IntersectionObserver(entries=>{entries.forEach(e=>e.isIntersecting?visible.add(e.target):visible.delete(e.target));sync();},{threshold:.1}).observe(animated[1]);
 new MutationObserver(sync).observe(document.body,{attributes:true,attributeFilter:['class']});
 window.addEventListener('scroll',queue,{passive:true});window.addEventListener('resize',queue,{passive:true});document.addEventListener('contentroutechange',sync);document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',sync);queue();
})();
