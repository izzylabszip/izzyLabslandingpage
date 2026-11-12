"use strict";

const projects = {
  glow: {
    title: "Glow",
    category: "Our original",
    type: "izzyLabs original",
    discipline: "Beauty & self-care",
    tagline: "Beauty bookings, made personal.",
    description: "A beauty marketplace bringing local artists, personal services, and simpler bookings into one experience.",
    meta: ["Product design", "Application development"],
    artWord: "Glow",
    artLine: "A little time for you.",
    heading: "A little more time for you.",
    overview: "Glow is a beauty-services marketplace connecting customers with nearby artists. The product brings discovery and booking together, with experiences for both customers and beauty professionals.",
    roleTitle: "One product, two perspectives.",
    role: "izzyLabs develops Glow as an original product, bringing together product design and application development. The experience considers both the person making a booking and the artist managing their services.",
    features: [
      ["Discover local artists", "Explore beauty professionals and the services they offer."],
      ["Combine your services", "Bring several services together in one considered booking flow."],
      ["Explore your routine", "Skin-scan features are being developed as part of the product experience."]
    ],
    href: "https://glow-app-omega.vercel.app/",
    linkLabel: "Visit Glow",
    next: "care"
  },
  care: {
    title: "CareNearby",
    category: "Our original",
    type: "izzyLabs original",
    discipline: "Care & community",
    tagline: "Care, closer to home.",
    description: "A care platform helping families explore local personal support workers and the help available around them.",
    meta: ["Product design", "Application development"],
    artWord: "Nearby",
    artLine: "The right support. A little closer.",
    heading: "A clearer starting point for care.",
    overview: "CareNearby is an original izzyLabs product connecting people with personal support workers. It brings care discovery, worker profiles, and available support into a mobile experience.",
    roleTitle: "Designed around people.",
    role: "izzyLabs brings product design and application development together for CareNearby, with a focus on making information clear for people exploring care and support.",
    features: [
      ["Explore nearby support", "Discover personal support workers in the local community."],
      ["Understand the options", "Browse profiles and the support each worker offers."],
      ["Arrange care", "Bring discovery and support-booking journeys into one experience."]
    ],
    href: "https://carenearby.app/",
    linkLabel: "Visit CareNearby",
    next: "lami"
  },
  lami: {
    title: "Lami Nepal",
    category: "Client application",
    type: "Client partnership",
    discipline: "Relationships & connection",
    tagline: "Meaningful connections, made mobile.",
    description: "A mobile application bringing Lami Nepal’s member profiles, discovery, and matchmaking experience together.",
    meta: ["Application design", "Mobile development"],
    artWord: "Lami",
    artLine: "A meaningful connection starts here.",
    heading: "A familiar service, a new experience.",
    overview: "Lami Nepal is a matchmaking business. Its mobile application brings member profiles and discovery into an app experience that supports meaningful connections.",
    roleTitle: "The mobile experience.",
    role: "izzyLabs’ scope is the application design and development for Lami Nepal. The project brings the business’s matchmaking experience into a mobile product.",
    features: [
      ["Member profiles", "Bring member information into a clear application structure."],
      ["Discovery", "Help people explore profiles through a mobile experience."],
      ["Connections", "Support the journeys that connect members and the matchmaking service."]
    ],
    href: "https://laminepal.com.np/",
    linkLabel: "Visit Lami Nepal",
    next: "glow"
  }
};

const stage = document.querySelector("[data-project-stage]");
const projectTabs = [...document.querySelectorAll("[data-project]")];
const worldCards = [...document.querySelectorAll(".world-card")];
const worldTabs = [...document.querySelectorAll("[data-world-tab]")];
const worldCopy = document.querySelector("[data-world-copy]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let activeProject = "glow";
let activeWorld = "originals";
let projectAnimation;

function renderLogo(element, key, title) {
  element.className = "brand-tile " + key + "-tile";
  element.setAttribute("aria-label", title + " app logo");
}

function setProject(key, focusTab = false) {
  const project = projects[key];
  if (!project) return;
  activeProject = key;
  stage.dataset.theme = key;
  stage.setAttribute("aria-labelledby", "tab-" + key);
  stage.querySelector("[data-project-title]").textContent = project.title;
  stage.querySelector("[data-project-category]").textContent = project.category;
  stage.querySelector("[data-project-tagline]").textContent = project.tagline;
  stage.querySelector("[data-project-description]").textContent = project.description;
  stage.querySelector("[data-art-type]").textContent = project.discipline;
  stage.querySelector(".art-topline > span:last-child").textContent = project.type;
  stage.querySelector("[data-art-word]").textContent = project.artWord;
  stage.querySelector("[data-art-line]").textContent = project.artLine;
  stage.querySelector(".feature-art").setAttribute("aria-label", "Explore the " + project.title + " project");
  renderLogo(stage.querySelector("[data-project-logo]"), key, project.title);
  const tags = project.meta.map(label => {
    const tag = document.createElement("span");
    tag.textContent = label;
    return tag;
  });
  stage.querySelector("[data-project-meta]").replaceChildren(...tags);
  projectTabs.forEach(tab => {
    const selected = tab.dataset.project === key;
    tab.classList.toggle("is-active", selected);
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
    if (selected && focusTab) tab.focus({ preventScroll: true });
  });
  clearTimeout(projectAnimation);
  stage.classList.remove("is-changing");
  requestAnimationFrame(() => {
    if (reduceMotion.matches) return;
    stage.classList.add("is-changing");
    projectAnimation = setTimeout(() => stage.classList.remove("is-changing"), 520);
  });
}

function setWorld(world, shouldScroll = false) {
  if (!(["originals", "clients"].includes(world))) world = "originals";
  activeWorld = world;
  const visibleTabs = projectTabs.filter(tab => tab.dataset.world === world);
  worldTabs.forEach(tab => {
    const selected = tab.dataset.worldTab === world;
    tab.classList.toggle("is-active", selected);
    tab.setAttribute("aria-selected", String(selected));
  });
  projectTabs.forEach(tab => {
    const visible = tab.dataset.world === world;
    tab.hidden = !visible;
    if (!visible) tab.setAttribute("aria-selected", "false");
  });
  worldCopy.textContent = world === "clients"
    ? "A selection of products we have shaped alongside founders and teams."
    : "Products we imagine, build, and keep making better — from first sketch to everyday use.";
  if (!visibleTabs.some(tab => tab.dataset.project === activeProject)) setProject(visibleTabs[0].dataset.project);
  if (shouldScroll) document.querySelector("#work").scrollIntoView({ behavior: reduceMotion.matches ? "instant" : "smooth" });
}

function openWork(world) {
  navigatePage("#world-" + world);
}
worldTabs.forEach(tab => tab.addEventListener("click", () => openWork(tab.dataset.worldTab)));

projectTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => setProject(tab.dataset.project));
  tab.addEventListener("keydown", event => {
    let next;
    const visibleTabs = projectTabs.filter(item => item.dataset.world === activeWorld);
    const position = visibleTabs.indexOf(tab);
    if (event.key === "ArrowRight") next = (position + 1) % visibleTabs.length;
    else if (event.key === "ArrowLeft") next = (position - 1 + visibleTabs.length) % visibleTabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = visibleTabs.length - 1;
    else return;
    event.preventDefault();
    setProject(visibleTabs[next].dataset.project, true);
  });
});

const menuButton = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const projectDialog = document.querySelector("#project-detail");
const enquiryDialog = document.querySelector("#project-enquiry");

function syncScrollLock() {
  const menuOpen = menuButton.getAttribute("aria-expanded") === "true";
  document.body.classList.toggle("has-overlay", menuOpen || projectDialog.open || enquiryDialog.open);
}

function closeMenu(returnFocus = false) {
  const wasOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", "false");
  mobileMenu.classList.remove("is-open");
  mobileMenu.setAttribute("aria-hidden", "true");
  mobileMenu.inert = true;
  menuButton.querySelector("span").textContent = "Menu";
  document.body.classList.remove("menu-open");
  document.querySelector("main").inert = false;
  syncScrollLock();
  if (wasOpen && returnFocus) menuButton.focus();
}

menuButton.addEventListener("click", () => {
  if (menuButton.getAttribute("aria-expanded") === "true") {
    closeMenu(true);
    return;
  }
  mobileMenu.inert = false;
  menuButton.querySelector("span").textContent = "Close ×";
  document.body.classList.add("menu-open");
  document.querySelector("main").inert = true;
  mobileMenu.classList.add("is-open");
  mobileMenu.setAttribute("aria-hidden", "false");
  menuButton.setAttribute("aria-expanded", "true");
  syncScrollLock();
  mobileMenu.querySelector("a").focus();
});

mobileMenu.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  closeMenu();
  if (link.pathname === location.pathname) routeView();
}));
document.addEventListener("keydown", event => {
  if (menuButton.getAttribute("aria-expanded") !== "true") return;
  if (event.key === "Escape") {
    event.preventDefault();
    closeMenu(true);
  } else if (event.key === "Tab") {
    const items = [...document.querySelectorAll(".site-header a, .site-header button"), ...mobileMenu.querySelectorAll("a, button")].filter(item => item.getClientRects().length);
    const first = items[0], last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first.focus();
    }
  }
});
window.matchMedia("(min-width: 781px)").addEventListener("change", event => {
  if (event.matches) closeMenu();
});

function renderProjectDetail(key) {
  const project = projects[key];
  projectDialog.querySelector("[data-detail-type]").textContent = project.type;
  projectDialog.querySelector("#project-detail-title").textContent = project.title;
  projectDialog.querySelector("[data-detail-theme]").dataset.detailTheme = key;
  projectDialog.querySelectorAll("[data-detail-field]").forEach(element => {
    element.textContent = project[element.dataset.detailField];
  });
  renderLogo(projectDialog.querySelector("[data-detail-logo]"), key, project.title);
  const features = project.features.map(([title, description]) => {
    const li = document.createElement("li");
    const heading = document.createElement("strong");
    const copy = document.createElement("p");
    heading.textContent = title;
    copy.textContent = description;
    li.append(heading, copy);
    return li;
  });
  projectDialog.querySelector("[data-detail-features]").replaceChildren(...features);
  const link = projectDialog.querySelector("[data-detail-link]");
  link.href = project.href;
  link.replaceChildren(document.createTextNode(project.linkLabel + " "));
  const arrow = document.createElement("span");
  arrow.setAttribute("aria-hidden", "true");
  arrow.textContent = "↗";
  link.append(arrow);
  const nextButton = projectDialog.querySelector("[data-next-project]");
  nextButton.textContent = "Next project: " + projects[project.next].title + " →";
}

function openProject(key) {
  if (!projects[key]) return;
  closeMenu();
  document.body.classList.remove("care-preview-active");
  setWorld(key === "lami" ? "clients" : "originals");
  setProject(key);
  if (typeof window.openStudioCase === "function") { window.openStudioCase(key); return; }
  if (key === "care") {
    if (typeof window.openCareCase === "function") { window.openCareCase(); return; }
    if (projectDialog.open) projectDialog.close();
    navigatePage("#work-carenearby");
    return;
  }
  navigatePage(key === "glow" ? "#work-glow" : "#work-lami");
}
document.querySelectorAll("[data-open-project]").forEach(button => button.addEventListener("click", () => openProject(activeProject)));
document.querySelector("[data-next-project]").addEventListener("click", () => openProject(projects[activeProject].next));

document.querySelectorAll("[data-select-work]").forEach(button => button.addEventListener("click", () => {
  const key = button.dataset.selectWork;
  setWorld(key === "lami" ? "clients" : "originals");
  setProject(key, true);
  document.querySelector("#work").scrollIntoView({ behavior: reduceMotion.matches ? "instant" : "smooth" });
}));

function bindDialogClose(dialog, selector) {
  document.querySelector(selector).addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", syncScrollLock);
  dialog.addEventListener("click", event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
}
bindDialogClose(projectDialog, "[data-close-project]");
bindDialogClose(enquiryDialog, "[data-close-enquiry]");

const enquiryForm = document.querySelector("#project-enquiry-form");
const enquiryStatus = document.querySelector("#enquiry-status");
const submitButton = enquiryForm.querySelector('[type="submit"]');
const submitLabel = enquiryForm.querySelector("[data-submit-label]");
let sending = false;
let confirmed = false;

function openEnquiry(service) {
  closeMenu();
  if (projectDialog.open) projectDialog.close();
  if (confirmed) {
    confirmed = false;
    submitButton.disabled = false;
    submitLabel.textContent = "Send enquiry";
    enquiryStatus.textContent = "Your enquiry goes to the izzyLabs team.";
    delete enquiryStatus.dataset.state;
  }
  if (service && !sending) enquiryForm.elements.service.value = service;
  const entering = routeId() !== '#contact';
  navigatePage('#contact');
  if (entering && !reduceMotion.matches) document.querySelector('.contact-page').animate(
    [{clipPath:'inset(0 0 0 100%)',transform:'translateX(5%)'}, {clipPath:'inset(0 0 0 0)',transform:'translateX(0)'}],
    {duration:850,easing:'cubic-bezier(.22,.75,.15,1)'});
  syncScrollLock();
}
document.querySelectorAll("[data-open-enquiry]").forEach(button => button.addEventListener("click", () => openEnquiry()));
document.querySelectorAll("[data-enquire-service]").forEach(button => button.addEventListener("click", () => openEnquiry(button.dataset.enquireService)));
enquiryForm.querySelectorAll("input, textarea").forEach(input => input.addEventListener("input", () => input.setCustomValidity("")));

enquiryForm.addEventListener("submit", async event => {
  event.preventDefault();
  if (sending || confirmed) return;
  const values = Object.fromEntries(new FormData(enquiryForm));
  for (const key of Object.keys(values)) values[key] = values[key].trim();
  if (!values.name || values.brief.length < 10) {
    const input = !values.name ? enquiryForm.elements.name : enquiryForm.elements.brief;
    input.setCustomValidity(!values.name ? "Please enter your name." : "Please describe your idea in at least 10 characters.");
    input.reportValidity();
    return;
  }
  if (!enquiryForm.reportValidity()) return;
  sending = true;
  submitButton.disabled = true;
  submitLabel.textContent = "Sending…";
  enquiryStatus.textContent = "Sending your enquiry…";
  delete enquiryStatus.dataset.state;
  enquiryForm.setAttribute("aria-busy", "true");
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch("https://formsubmit.co/ajax/rajeshas11111@gmail.com", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        ...values,
        _subject: "izzyLabs project enquiry — " + values.service,
        _template: "table"
      }),
      signal: controller.signal
    });
    if (!response.ok) throw new Error("The service did not accept the request.");
    const result = await response.json();
    if (result.success !== true && result.success !== "true") throw new Error("The service did not confirm delivery.");
    confirmed = true;
    enquiryForm.reset();
    enquiryStatus.textContent = "Thank you. Your enquiry has been submitted to izzyLabs.";
    enquiryStatus.dataset.state = "success";
    submitLabel.textContent = "Enquiry submitted";
  } catch (error) {
    enquiryStatus.textContent = error.name === "AbortError"
      ? "We couldn’t confirm whether your enquiry arrived. Your details are still here. Please wait before trying again."
      : "Your enquiry couldn’t be confirmed. Your details are still here—please try again later.";
    enquiryStatus.dataset.state = "error";
    submitLabel.textContent = "Try again";
  } finally {
    clearTimeout(timeout);
    sending = false;
    submitButton.disabled = confirmed;
    enquiryForm.removeAttribute("aria-busy");
  }
});

const header = document.querySelector("[data-header]");
const progress = document.querySelector(".page-progress span");
let scrollFrame;
function updateScroll() {
  header.classList.toggle("is-scrolled", window.scrollY > 40);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = "scaleX(" + (max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0) + ")";
  scrollFrame = undefined;
}
window.addEventListener("scroll", () => {
  if (scrollFrame === undefined) scrollFrame = requestAnimationFrame(updateScroll);
}, { passive: true });
window.addEventListener("resize", updateScroll, { passive: true });
updateScroll();

// Content routes preserve browser Back and return to the same page after contact.
let lastContentHash = "#top";
function routeView() {
  const hash = routeId();
  document.body.classList.toggle("contact-view", hash === "#contact");

  const casePage = [...document.querySelectorAll('.care-case')].find(page => '#'+page.id === hash);
  const isCare = Boolean(casePage);
  document.body.classList.toggle("case-view", isCare);
  document.body.classList.remove("care-preview-active","work-preview-all");
  document.querySelectorAll('.care-case').forEach(page => {page.hidden = page !== casePage;});
  const isWork = hash === "#world-originals" || hash === "#world-clients";
  const infoTitles = {"#contact":"Get in touch","#what-we-do": "What we do", "#about-us": "About us", "#latest-news": "Latest news"};
  const infoPage = Object.hasOwn(infoTitles, hash) ? document.querySelector(hash) : null;
  lastContentHash = isWork || infoPage || isCare ? hash : "#top";
  document.body.classList.toggle("work-view", isWork);
  document.body.classList.toggle("info-view", Boolean(infoPage));
  document.querySelectorAll(".info-page").forEach(page => { page.hidden = page !== infoPage; });
  closeMenu();
  if (isCare) {
    document.title = casePage.querySelector('h1').textContent + " — izzyLabs";
    window.scrollTo({top: 0, behavior: "instant"});
    casePage.querySelector('h1').focus({preventScroll: true});
  } else if (isWork) {
    const world = hash === "#world-clients" ? "clients" : "originals";
    setWorld(world);
    document.querySelector("#work-title").textContent = world === "clients" ? "Client work." : "Our ventures.";
    document.title = (world === "clients" ? "Client work" : "Our ventures") + " — izzyLabs";
    window.scrollTo({top: 0, behavior: "instant"});
    document.querySelector("#main-content").focus({preventScroll: true});
  } else if (infoPage) {
    document.title = infoTitles[hash] + " — izzyLabs";
    window.scrollTo({top: 0, behavior: "instant"});
    infoPage.querySelector("h1").focus({preventScroll: true});
  } else {
    document.title = "izzyLabs — we build future";
    const target = document.getElementById(hash.slice(1)) || document.querySelector("#top");
    requestAnimationFrame(() => {
      target.scrollIntoView({behavior: reduceMotion.matches ? "instant" : "smooth"});
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({preventScroll: true});
    });
  }
  updateScroll();
  document.dispatchEvent(new Event("contentroutechange"));
}
document.querySelector(".wordmark").addEventListener("click", event => {
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  if (projectDialog.open) projectDialog.close();
  if (enquiryDialog.open) enquiryDialog.close();
  closeMenu();
  navigatePage("#top");
});
window.addEventListener("hashchange", () => { if (pagePaths[location.hash]) history.replaceState(null,"",pagePaths[location.hash]); routeView(); });
routeView();

document.querySelectorAll("[data-home-project]").forEach(button => button.addEventListener("click", event => {
  if (button.tagName === "A" && (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey)) return;
  event.preventDefault();
  openProject(button.dataset.homeProject);
}));

// Ten live world clocks, rotating every five seconds. Intl handles DST.
const clock = document.querySelector("#live-clock");
const clockCities = [
  ["NYC", "New York", "America/New_York"],
  ["YYZ", "Toronto", "America/Toronto"],
  ["LON", "London", "Europe/London"],
  ["SYD", "Sydney", "Australia/Sydney"],
  ["TYO", "Tokyo", "Asia/Tokyo"],
  ["PEK", "Beijing", "Asia/Shanghai"],
  ["KTM", "Kathmandu", "Asia/Kathmandu"],
  ["DEL", "Delhi", "Asia/Kolkata"],
  ["SFO", "San Francisco", "America/Los_Angeles"],
  ["DXB", "Dubai", "Asia/Dubai"]
].map(([code, name, timeZone]) => ({code, name, formatter: new Intl.DateTimeFormat("en-GB", {timeZone, hour: "numeric", minute: "2-digit", hour12: true})}));
const clockStart = Date.now();
const clockTrack = clock.querySelector(".clock-track");
const clockLines = clockTrack.querySelectorAll(".clock-line");
let visibleCity = -1, clockFrame = 0, clockReset = 0;
function setClockText(text, animate) {
  cancelAnimationFrame(clockFrame);
  clearTimeout(clockReset);
  clockTrack.classList.remove("is-rolling");
  if (!animate) {
    clockLines[0].textContent = text;
    clockLines[1].textContent = "";
    return;
  }
  clockLines[1].textContent = text;
  // Establish the start frame before translating the two rows upward together.
  clockFrame = requestAnimationFrame(() => {
    clockFrame = requestAnimationFrame(() => {
      clockTrack.classList.add("is-rolling");
      clockReset = setTimeout(() => {
        clockLines[0].textContent = text;
        clockLines[1].textContent = "";
        clockTrack.classList.remove("is-rolling");
      }, 650);
    });
  });
}
function updateClock(instant = false) {
  const now = new Date();
  const index = Math.floor(Math.max(0, now.getTime() - clockStart) / 5000) % clockCities.length;
  const city = clockCities[index];
  const time = city.formatter.format(now).toUpperCase();
  const text = city.code + " " + time;
  clock.dateTime = now.toISOString();
  clock.setAttribute("aria-label", city.name + ": " + time);
  clock.title = "Local time in " + city.name;
  if (index !== visibleCity || instant) {
    setClockText(text, visibleCity !== -1 && !instant && !document.hidden && !reduceMotion.matches);
    visibleCity = index;
  } else if (!clockTrack.classList.contains("is-rolling")) {
    clockLines[0].textContent = text;
  }
}
updateClock(true);
setInterval(updateClock, 1000);
document.addEventListener("visibilitychange", () => updateClock(true));
reduceMotion.addEventListener("change", () => updateClock(true));


const themeButton = document.querySelector(".theme-toggle");
let darkMenu = true;
let lightCare = false;
// Every fresh visit starts dark; light mode is an explicit menu-toggle choice.
try { lightCare = localStorage.getItem("izzylabs-care-theme") === "light"; } catch {}
function applyMenuTheme() {
 document.body.classList.toggle("menu-dark", darkMenu);
 document.body.classList.toggle("care-light", lightCare);
 const care = document.body.classList.contains("case-view") && !document.body.classList.contains("menu-open");
 const light = care ? lightCare : !darkMenu;
 themeButton.setAttribute("aria-pressed", String(light));
 themeButton.setAttribute("aria-label", light ? "Switch to dark mode" : "Switch to light mode");
 themeButton.firstElementChild.textContent = light ? "◑" : "◐";
}
applyMenuTheme();
themeButton.addEventListener("click", () => {
 const care = document.body.classList.contains("case-view") && !document.body.classList.contains("menu-open");
 if(care) lightCare = !lightCare; else darkMenu = !darkMenu;
 applyMenuTheme();
 try {localStorage.setItem(care ? "izzylabs-care-theme" : "izzylabs-menu-theme",care ? (lightCare?"light":"dark") : (darkMenu?"dark":"light"));}catch{}
});
document.addEventListener("contentroutechange",applyMenuTheme);
new MutationObserver(() => {
 const care = document.body.classList.contains("case-view") && !document.body.classList.contains("menu-open");
 const light = care ? lightCare : !darkMenu;
 themeButton.setAttribute("aria-label",light ? "Switch to dark mode" : "Switch to light mode");
 themeButton.setAttribute("aria-pressed",String(light));
 themeButton.firstElementChild.textContent = light ? "◑" : "◐";
}).observe(document.body,{attributes:true,attributeFilter:["class"]});

// High-resolution stellar field with sharp cores, restrained chromatic haloes and rays.
const sky=document.querySelector("#cosmos"),ctx=sky.getContext("2d");
const field=document.createElement("canvas");
let sw=0,sh=0,pixelRatio=1,meteorFrame=0,nextMeteor=performance.now()+1800,meteors=[];
function drawCosmos(){
 sw=sky.clientWidth;sh=sky.clientHeight;if(!sw||!sh)return;
 pixelRatio=Math.min(devicePixelRatio||1,3);
 sky.width=field.width=Math.round(sw*pixelRatio);sky.height=field.height=Math.round(sh*pixelRatio);
 const c=field.getContext("2d");c.setTransform(pixelRatio,0,0,pixelRatio,0,0);c.fillStyle="#000";c.fillRect(0,0,sw,sh);
 let seed=91421;const random=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646;};
 const palette=["169,204,255","255,211,151","245,248,255","255,166,126"];
 const dot=(x,y,r,colour,alpha)=>{c.fillStyle=`rgba(${colour},${alpha})`;c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();};
 for(let i=0;i<Math.min(3600,sw*sh/430);i++){
  const x=random()*sw,y=random()*sh,b=random(),colour=palette[Math.floor(random()*palette.length)];
  dot(x,y,.22+b*.36,colour,.25+b*.7);
 }
 const foreground=Math.max(12,Math.min(34,Math.round(sw*sh/55000)));
 for(let i=0;i<foreground;i++){
  const x=random()*sw,y=random()*sh,b=.5+random()*.5,colour=palette[Math.floor(random()*palette.length)],radius=5+b*6;
  const glow=c.createRadialGradient(x,y,0,x,y,radius);
  glow.addColorStop(0,`rgba(${colour},.65)`);glow.addColorStop(.15,`rgba(${colour},.25)`);glow.addColorStop(.42,`rgba(${colour},.065)`);glow.addColorStop(1,`rgba(${colour},0)`);
  c.fillStyle=glow;c.fillRect(x-radius,y-radius,radius*2,radius*2);
  // Thin diffraction rays provide sharp light rather than unfocused discs.
  for(const angle of [0,Math.PI/2,Math.PI/4,Math.PI*3/4]){
   const len=(angle>Math.PI/2?5:9)*b,dx=Math.cos(angle)*len,dy=Math.sin(angle)*len;
   const ray=c.createLinearGradient(x-dx,y-dy,x+dx,y+dy);
   ray.addColorStop(0,`rgba(${colour},0)`);ray.addColorStop(.5,`rgba(${colour},${.55*b})`);ray.addColorStop(1,`rgba(${colour},0)`);
   c.strokeStyle=ray;c.lineWidth=.55;c.beginPath();c.moveTo(x-dx,y-dy);c.lineTo(x+dx,y+dy);c.stroke();
  }
  dot(x,y,.8+b*.5,"255,255,255",.98);
 }
 ctx.setTransform(1,0,0,1,0,0);ctx.drawImage(field,0,0);
}
function animateSky(t){
 if(!document.hidden && (document.body.classList.contains("menu-open") || (!document.body.classList.contains("info-view") && !document.body.classList.contains("work-view"))) && skyVisible){
 ctx.setTransform(1,0,0,1,0,0);ctx.drawImage(field,0,0);
 if(!reduceMotion.matches){
  if(t>nextMeteor){meteors.push({start:t,x:Math.random()*.7,y:.02+Math.random()*.3,duration:1500+Math.random()*500});nextMeteor=t+4500+Math.random()*3500;}
  meteors=meteors.filter(m=>t-m.start<m.duration);
  for(const m of meteors){
   const p=(t-m.start)/m.duration,x=(m.x+p*.4)*sw,y=(m.y+p*.42)*sh,len=Math.min(240,sw*.22),dx=len*.85,dy=len*.5;
   ctx.save();ctx.scale(pixelRatio,pixelRatio);ctx.globalAlpha=Math.min(1,p*8,(1-p)*5);
   const trail=ctx.createLinearGradient(x-dx,y-dy,x,y);trail.addColorStop(0,"rgba(110,164,255,0)");trail.addColorStop(.7,"rgba(164,205,255,.5)");trail.addColorStop(1,"#fff");
   ctx.strokeStyle=trail;ctx.lineCap="round";ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(x-dx,y-dy);ctx.lineTo(x,y);ctx.stroke();
   const head=ctx.createRadialGradient(x,y,0,x,y,7);head.addColorStop(0,"#fff");head.addColorStop(.2,"rgba(192,222,255,.85)");head.addColorStop(1,"rgba(130,187,255,0)");ctx.fillStyle=head;ctx.fillRect(x-7,y-7,14,14);
   ctx.fillStyle="#fff";ctx.beginPath();ctx.arc(x,y,1.25,0,Math.PI*2);ctx.fill();ctx.restore();
  }
 } else {meteors=[];}
 }
 meteorFrame=requestAnimationFrame(animateSky);
}
let skyVisible=true;
new IntersectionObserver(entries=>{skyVisible=entries[0].isIntersecting;},{threshold:0}).observe(sky);
function placeSky(){
 const care=document.body.classList.contains("case-view");
 const menu=document.body.classList.contains("menu-open");
 const parent=document.querySelector(menu?".mobile-menu":care?".care-case:not([hidden]) .care-footer-sky":".minimal-home");
 if(!parent)return;
 if(sky.parentElement!==parent)parent.prepend(sky);
 drawCosmos();
}
placeSky();
let skyMenuOpen=document.body.classList.contains("menu-open");
new MutationObserver(()=>{
 const open=document.body.classList.contains("menu-open");
 if(open!==skyMenuOpen){skyMenuOpen=open;placeSky();}
}).observe(document.body,{attributes:true,attributeFilter:["class"]});
let skyResize;window.addEventListener("resize",()=>{clearTimeout(skyResize);skyResize=setTimeout(drawCosmos,100);});
drawCosmos();if(!reduceMotion.matches)meteorFrame=requestAnimationFrame(animateSky);
reduceMotion.addEventListener("change",()=>{cancelAnimationFrame(meteorFrame);drawCosmos();if(!reduceMotion.matches)meteorFrame=requestAnimationFrame(animateSky);});

document.addEventListener("contentroutechange", () => {
  placeSky();
});
