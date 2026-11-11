// A fictional motion concept, not live location or an app feature simulation.
const clamp = value => Math.max(0, Math.min(1, value));
const smooth = value => { const x = clamp(value); return x*x*(3-2*x); };
export function journeyFrame(progress) {
  const p = clamp(progress);
  return {
    progress:p,
    route:smooth((p-.28)/.52),
    match:smooth((p-.13)/.12) * (1-smooth((p-.67)/.14)),
    arrival:smooth((p-.78)/.12),
    beat:p < .3 ? 0 : p < .8 ? 1 : 2
  };
}

function initJourney() {
  const story=document.querySelector('.care-journey');
  if (!story) return;
  const casePage=story.closest('.care-case');
  const stage=story.querySelector('.care-journey-stage');
  const route=story.querySelector('.care-map-route');
  const traveller=story.querySelector('.care-map-traveller');
  const routeLength=route.getTotalLength();
  const controls=[...story.querySelectorAll('[data-journey-step]')];
  const copy=[...story.querySelectorAll('[data-journey-copy]')];
  const title=story.querySelector('[data-journey-phone-title]');
  const status=story.querySelector('[data-journey-status]');
  const moments=document.querySelector('.care-moments');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let visible=false, momentsVisible=false, raf=0, current=0, manual=0, beat=-1;
  function blocked() { return document.hidden || casePage.hidden || document.body.classList.contains('menu-open') || document.body.classList.contains('has-overlay'); }
  function render(progress) {
    const f=journeyFrame(progress);
    for (const [key,value] of Object.entries({'journey-progress':f.progress,'route-progress':f.route,match:f.match,arrival:f.arrival})) story.style.setProperty('--'+key,value.toFixed(5));
    const position=route.getPointAtLength(f.route*routeLength);
    traveller.setAttribute('transform',`translate(${position.x.toFixed(2)} ${position.y.toFixed(2)})`);
    if (f.beat === beat) return;
    beat=f.beat;
    controls.forEach((button,i)=>button.setAttribute('aria-pressed',String(i===beat)));
    copy.forEach((panel,i)=>{panel.hidden=i!==beat;});
    title.textContent=['Someone nearby.','On the way to you.','A warm welcome.'][beat];
    status.textContent=['Find a little support, nearby.','Connected · Your visit is next.','Arrived · Time for your visit.'][beat];
  }
  function update() {
    raf=0;
    if (blocked() || !visible) return;
    const rect=story.getBoundingClientRect();
    const target=reduced.matches ? manual : clamp(-rect.top/Math.max(1,rect.height-stage.clientHeight));
    current=reduced.matches ? target : current+(target-current)*.13;
    render(current);
    if (Math.abs(target-current)>.0002) queue();
  }
  function queue() { if (!raf && visible && !blocked()) raf=requestAnimationFrame(update); }
  function activity() {
    const active=!blocked();
    story.classList.toggle('is-active',visible && active && !reduced.matches);
    moments.classList.toggle('is-in-view',momentsVisible && active && !reduced.matches);
    if (active) queue(); else { cancelAnimationFrame(raf); raf=0; }
  }
  controls.forEach((button,i)=>button.addEventListener('click',()=>{
    manual=[.08,.55,.94][i];
    if (reduced.matches) { current=manual; render(manual); return; }
    const top=scrollY+story.getBoundingClientRect().top;
    window.scrollTo({top:top+manual*(story.offsetHeight-stage.clientHeight),behavior:'smooth'});
  }));
  controls.forEach((button,i)=>button.addEventListener('keydown',event=>{
    if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
    event.preventDefault();
    const next=event.key==='Home'?0:event.key==='End'?2:(i+(event.key==='ArrowRight'?1:2))%3;
    controls[next].focus({preventScroll:true});controls[next].click();
  }));
  new IntersectionObserver(entries=>{
    for(const entry of entries){if(entry.target===story)visible=entry.isIntersecting;else momentsVisible=entry.isIntersecting;}
    activity();
  },{threshold:0}).observe(story);
  new IntersectionObserver(entries=>{momentsVisible=entries[0].isIntersecting;activity();},{threshold:.15}).observe(moments);
  new MutationObserver(activity).observe(document.body,{attributes:true,attributeFilter:['class']});
  document.addEventListener('visibilitychange',activity);
  document.addEventListener('contentroutechange',activity);
  reduced.addEventListener('change',activity);
  window.addEventListener('scroll',queue,{passive:true});
  window.addEventListener('resize',queue,{passive:true});
  render(0);
}
if (typeof document !== 'undefined') initJourney();
