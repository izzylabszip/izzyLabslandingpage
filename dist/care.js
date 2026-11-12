"use strict";
(() => {
  const casePage = document.querySelector('#work-carenearby');
  const preview = document.querySelector('.care-hover-cover');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const careLinks = document.querySelectorAll('.home-work-list [data-home-project],.menu-projects [data-home-project],[data-all-work]');
  const backdrop=document.querySelector('.care-hover-backdrop');
  const covers={
    care:{name:'CareNearby',route:'#work-carenearby',image:'./assets/carenearby/logo-cover.webp',category:'Product Design, Healthcare',copy:['Care that feels personal.','Support that stays close.','A simpler way to connect.']},
    glow:{name:'Glow',route:'#work-glow',image:'./assets/glow/cover.webp',category:'Product Design, Beauty',copy:['Discover your next favourite.','Make a little time for you.','Beauty, on your terms.']},
    lami:{name:'Lami Nepal',route:'#work-lami',image:'./assets/lami/cover.webp',category:'Product Design, Matchmaking',copy:['A familiar tradition.','A thoughtful digital experience.','A meaningful new beginning.']},
    all:{name:'All work',route:'#all-work',image:'./assets/izzylabs-infinity-chrome.png',category:'Originals & partnerships',copy:[]}
  };
  let previewKey='care',transitionDestination=null;
  function setPreview(key) {
    if(!covers[key])return;
    previewKey=key;const p=covers[key];
    preview.href=pagePath(p.route);preview.setAttribute('aria-label',key==='all'?'Explore all work':'Open '+p.name+' case study');
    preview.dataset.preview=key;backdrop.dataset.preview=key;
    preview.querySelector('img').src=p.image;backdrop.querySelector('img').src=p.image;
    preview.querySelector('strong').textContent=p.name;
    const label=preview.querySelector('p');label.firstChild.textContent=p.category+' ';
    backdrop.querySelector('h2').textContent=p.name;
    backdrop.querySelector('.care-cover-category').textContent=p.category;
    backdrop.querySelector('.care-cover-description').replaceChildren(...p.copy.flatMap((line,i)=>i?[document.createElement('br'),document.createTextNode(line)]:[document.createTextNode(line)]));
  }
  // Inline SVG avoids missing arrow glyphs in the display/font fallbacks.
  document.querySelectorAll('.care-help-links [aria-hidden]').forEach(icon => {
    icon.innerHTML = '<svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M6 18 18 6M6 6h12v12"/></svg>';
  });
  let hideTimer = 0, transition = null, transitionLayer = null, transitionToken = 0;
  function hidePreview() {
    clearTimeout(hideTimer);
    document.body.classList.remove('care-preview-active','work-preview-all');
    preview.setAttribute('aria-hidden', 'true');
    preview.tabIndex = -1;
  }
  function showPreview(key=previewKey) {
    clearTimeout(hideTimer);
    if (document.body.classList.contains('case-view') && !document.body.classList.contains('menu-open')) return;
    setPreview(key);
    document.body.classList.toggle('work-preview-all',key==='all');
    document.body.classList.add('care-preview-active');
    preview.setAttribute('aria-hidden', 'false');
    preview.tabIndex = 0;
  }
  const deferHide = () => { clearTimeout(hideTimer); hideTimer = setTimeout(hidePreview, 1400); };
  careLinks.forEach(link => {
    const key=link.hasAttribute('data-all-work')?'all':link.dataset.homeProject;
    link.addEventListener('pointerenter', () => { if (finePointer.matches) showPreview(key); });
    link.addEventListener('pointerleave', deferHide);
    link.addEventListener('focus', () => { if (link.matches(':focus-visible')) showPreview(key); });
    link.addEventListener('blur', deferHide);
  });
  preview.addEventListener('pointerenter', () => showPreview());
  preview.addEventListener('pointerleave', deferHide);
  preview.addEventListener('focus', () => showPreview());
  preview.addEventListener('blur', deferHide);
  preview.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if(previewKey==='all')window.openStudioCase('all');else openProject(previewKey);
  });
  document.querySelector('.menu-toggle').addEventListener('click', hidePreview);
  document.querySelectorAll('[data-all-work]').forEach(link=>link.addEventListener('click',event=>{if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;event.preventDefault();window.openStudioCase('all');}));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') hidePreview(); });
  document.addEventListener('pointerdown', event => {
    if (!preview.contains(event.target) && !event.target.closest('[data-home-project],[data-all-work]')) hidePreview();
  });
  function tweenBox(layer, from, to, duration) {
    let raf = 0, reject, done = false;
    const finished = new Promise((resolve, fail) => {
      reject = fail;
      const started = performance.now();
      const tick = now => {
        const elapsed = now - started;
        const progress = Math.min(1,elapsed/duration);
        const eased = progress < .5 ? 4*progress**3 : 1-((-2*progress+2)**3)/2;
        for (const key of ['left','top','width','height','borderRadius']) {
          const a = from[key] || 0, b = to[key] || 0;
          layer.style[key] = (a+(b-a)*eased)+'px';
        }
        if (progress === 1) { done = true; resolve(); }
        else raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    return {finished,cancel(){cancelAnimationFrame(raf);if(!done){done=true;reject(new DOMException('Transition cancelled','AbortError'));}}};
  }
  function clearTransition() {
    transitionToken++;
    if (transition) { transition.cancel(); transition = null; }
    if (transitionLayer) { transitionLayer.remove(); transitionLayer = null; }
    document.body.classList.remove('care-transitioning', 'care-revealing');
    transitionDestination=null;
    // Heavy 3D initialization must not steal frames from the page entrance.
    if (!casePage.hidden) setTimeout(loadModels,100);
  }
  window.openStudioCase = async (key='care') => {
    if(!covers[key])return;
    if (transitionLayer) return;
    setPreview(key);
    const destination=covers[key].route;
    const targetPage=document.querySelector(destination);
    transitionDestination=destination;
    if (projectDialog.open) projectDialog.close();
    const bounds = preview.getBoundingClientRect();
    // Touch entry uses the same visible-sized card, without requiring a hover first.
    const width = Math.min(bounds.width || 280, innerWidth - 32);
    const start = {left:innerWidth-width-16,top:innerHeight-width/1.6-16,width,height:width/1.6};
    if (finePointer.matches && bounds.width) Object.assign(start,{left:bounds.left,top:bounds.top,width:bounds.width,height:bounds.height});
    const alreadyHere = routeId() === destination;
    const animate = !motion.matches && !alreadyHere;
    const token = ++transitionToken;
    if (animate) {
      transitionLayer = document.createElement('div');
      transitionLayer.className = 'care-transition-layer';
      transitionLayer.setAttribute('aria-hidden', 'true');
      const artwork = preview.querySelector('img').cloneNode();
      transitionLayer.append(artwork);
      Object.assign(transitionLayer.style, {left:start.left+'px',top:start.top+'px',width:start.width+'px',height:start.height+'px'});
      document.body.append(transitionLayer);
      document.body.classList.add('care-transitioning');
    }
    closeMenu(); hidePreview();
    const navigate = () => { if (!alreadyHere) history.pushState(null, '', pagePath(destination)); routeView(); };
    if (!animate) { navigate();transitionDestination=null;return; }
    const frame = r => ({left:r.left+'px',top:r.top+'px',width:r.width+'px',height:r.height+'px'});
    const full = {left:0,top:0,width:innerWidth,height:innerHeight};
    try {
      // First fill the viewport. Do not reveal the destination until the cover is full.
      transition = tweenBox(transitionLayer,{...start,borderRadius:12},full,660);
      await transition.finished;
      if (token !== transitionToken) return;
      Object.assign(transitionLayer.style,frame(full),{borderRadius:'0px'});
      transition.cancel(); transition = null;
      navigate();
      await new Promise(resolve => requestAnimationFrame(resolve));
      if (token !== transitionToken || targetPage.hidden) return;
      document.body.classList.add('care-revealing');
      const end = targetPage.querySelector('.care-hero-media').getBoundingClientRect();
      transition = tweenBox(transitionLayer,full,end,820);
      await transition.finished;
    } catch (error) {
      // An explicit cancel is expected on back/resize; surface other failures.
      if (error.name !== 'AbortError') console.warn('CareNearby entrance:', error.message);
    }
    finally { if (token === transitionToken) clearTransition(); }
  };
  window.openCareCase=()=>window.openStudioCase('care');
  window.addEventListener('resize', () => {
    if (!transitionLayer) return;
    const destination=transitionDestination;
    clearTransition();
    if (destination&&routeId()!==destination) { history.pushState(null, '', pagePath(destination)); routeView(); }
  });
  window.addEventListener('popstate', clearTransition);
  // Load locally bundled 3D only when the case study is visited.
  let modelsRequested = false;
  function loadModels() {
    if (casePage.hidden || modelsRequested || transitionLayer) return;
    modelsRequested = true;
    import('./care-3d.js').then(module => module.initCareModels()).catch(() => {
      modelsRequested = false; // The screenshot compositions remain available as a fallback.
    });
  }
  document.addEventListener('contentroutechange', () => {
    if (transitionDestination&&routeId()!==transitionDestination) clearTransition();
    loadModels();
  });
  loadModels();

  const steps = [...casePage.querySelectorAll('[data-care-step]')];
  const screens = [...casePage.querySelectorAll('[data-care-screen]')];
  const labels = ['01 / Choose your care', '02 / Make a plan', '03 / Choose your caregiver'];
  function selectStep(index, focus = false) {
    if (!Number.isInteger(index) || index < 0 || index >= steps.length) return;
    steps.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
    screens.forEach((screen, i) => {
      screen.hidden = i !== index;
      screen.classList.toggle('is-entering', i === index && !motion.matches);
    });
    casePage.querySelector('[data-care-step-label]').textContent = labels[index];
    if (focus) steps[index].focus({preventScroll: true});
  }
  steps.forEach((button, index) => {
    button.addEventListener('click', () => selectStep(index));
    button.addEventListener('keydown', event => {
      if (!['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? steps.length - 1 : (index + (/Down|Right/.test(event.key) ? 1 : -1) + steps.length) % steps.length;
      selectStep(next, true);
    });
  });

  const reveals = [...document.querySelectorAll('.care-case [data-care-reveal]')];
  if ('IntersectionObserver' in window && !motion.matches) {
    document.body.classList.add('care-motion-ready');
    const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }), {threshold: .12});
    reveals.forEach(element => revealObserver.observe(element));
  }

  const film = document.querySelector('#care-film');
  function playFilm() { film.play().catch(() => {}); }
  let filmVisible = false;
  function updateFilm() {
    const blocked = document.hidden || casePage.hidden || document.body.classList.contains('menu-open') || document.body.classList.contains('has-overlay');
    if (blocked || !filmVisible || motion.matches) film.pause();
    else playFilm();
  }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      filmVisible = entries[0].isIntersecting;
      updateFilm();
    }, {threshold: .45}).observe(film);
  }
  new MutationObserver(updateFilm).observe(document.body, {attributes: true, attributeFilter: ['class']});
  document.addEventListener('visibilitychange', updateFilm);

  let scrollFrame = 0;
  const scenes = [...casePage.querySelectorAll('[data-care-parallax]')];
  const story = casePage.querySelector('.care-device-story');
  const deviceScene = story.querySelector('.care-device-scene');
  let storyProgress = 0;
  function updateStory() {
    if (casePage.hidden) return;
    const rect = story.getBoundingClientRect();
    const target = motion.matches ? 1 : Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height - deviceScene.clientHeight)));
    storyProgress += (target-storyProgress) * .18;
    const x = Math.max(0,Math.min(1,(storyProgress-.04)/.5));
    const spread = x*x*(3-2*x);
    deviceScene.style.setProperty('--care-open',String(spread));
    deviceScene.style.setProperty('--care-progress',String(Math.max(.02,storyProgress)));
    if (deviceScene.dataset.mounted !== 'ready') {
      const beat = storyProgress < .26 ? 0 : storyProgress < .72 ? 1 : 2;
      deviceScene.querySelector('[data-care-scene-step]').textContent = ['01 / A familiar welcome','02 / Find your support','03 / Bring care closer'][beat];
      deviceScene.querySelector('[data-care-scene-title]').textContent = ['Care starts here.','More choice. Less searching.','A connection that matters.'][beat];
    }
    if (Math.abs(target-storyProgress)>.001) queueDepth();
  }
  function updateDepth() {
    scrollFrame = 0;
    if (casePage.hidden) return;
    updateStory();
    if (motion.matches) return;
    for (const scene of scenes) {
      const rect = scene.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > innerHeight) continue;
      const offset = Math.max(-18, Math.min(18, (innerHeight / 2 - rect.top - rect.height / 2) * .045));
      scene.style.setProperty('--care-shift', offset.toFixed(2) + 'px');
    }
  }
  const queueDepth = () => { if (!scrollFrame && !casePage.hidden) scrollFrame = requestAnimationFrame(updateDepth); };
  const infoDialog = document.querySelector('.care-info-dialog');
  const infoContent = {
    careers: ['Join our team', 'We’re building thoughtful digital products at izzyLabs. Future opportunities and details about working with us will appear here.'],
    privacy: ['Privacy', 'This page will explain what information izzyLabs collects, how it is used, and how to contact us about your data. The full privacy notice is being prepared.'],
    accessibility: ['Accessibility', 'We want our website to be welcoming and usable. This page will describe our accessibility approach and how to report barriers. A formal accessibility review is still to come.']
  };
  let infoTrigger = null;
  document.querySelectorAll('[data-care-info]').forEach(button => button.addEventListener('click', () => {
    const [title,copy] = infoContent[button.dataset.careInfo];
    infoTrigger = button;
    infoDialog.querySelector('h2').textContent = title;
    infoDialog.querySelector('[data-care-info-copy]').textContent = copy;
    infoDialog.showModal(); document.body.classList.add('has-overlay');
  }));
  infoDialog.querySelector('.care-info-close').addEventListener('click',()=>infoDialog.close());
  infoDialog.addEventListener('click',event=>{if(event.target===infoDialog){const r=infoDialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)infoDialog.close();}});
  infoDialog.addEventListener('close',()=>{syncScrollLock();infoTrigger?.focus({preventScroll:true});});
  window.addEventListener('scroll', queueDepth, {passive: true});
  window.addEventListener('resize', queueDepth, {passive: true});
  document.addEventListener('contentroutechange', () => { hidePreview(); updateFilm(); queueDepth(); });
  motion.addEventListener('change', () => {
    if (motion.matches) {
      document.body.classList.remove('care-motion-ready');
      scenes.forEach(scene => scene.style.setProperty('--care-shift', '0px'));
    }
    updateFilm();
  });
  queueDepth();
})();
