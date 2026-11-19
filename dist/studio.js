(() => {
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const reveal=new IntersectionObserver(entries=>entries.forEach(({target,isIntersecting})=>{if(isIntersecting)target.classList.add('is-visible');}),{threshold:.08});
 document.querySelectorAll('[data-studio-reveal]').forEach(el=>reveal.observe(el));
 if(!reduced.matches)document.body.classList.add('studio-motion');
 let frame=0;
 function update(){frame=0;document.querySelectorAll('.studio-page:not([hidden]) [data-expand]').forEach(el=>{
   const p=Math.max(0,Math.min(1,(innerHeight-el.getBoundingClientRect().top)/(innerHeight*.9)));
   el.style.width=reduced.matches?'94%':`${(innerWidth<781?92:65)+p*(innerWidth<781?8:35)}%`;
 });}
 function queue(){if(!frame)frame=requestAnimationFrame(update);}
 addEventListener('scroll',queue,{passive:true});addEventListener('resize',queue,{passive:true});document.addEventListener('contentroutechange',queue);
 reduced.addEventListener('change',()=>{document.body.classList.toggle('studio-motion',!reduced.matches);queue();});
 function clocks(){document.querySelectorAll('[data-team-zone]').forEach(el=>{el.textContent=new Intl.DateTimeFormat('en-GB',{timeZone:el.dataset.teamZone,hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date());});}
 clocks();setInterval(clocks,60000);queue();
})();
