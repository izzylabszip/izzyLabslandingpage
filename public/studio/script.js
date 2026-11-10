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
      ["Read your skin", "A free AI skin scan built on Glow's own measured skin engine, with a repeatability gate so the same face scores the same."]
    ],
    href: "https://gloww.dev/",
    slug: "glow",
    screens: ["/studio/assets/work/glow-1.webp", "/studio/assets/work/glow-2.webp", "/studio/assets/work/glow-3.webp"],
    world: "originals",
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
    slug: "carenearby",
    screens: ["/studio/assets/carenearby/services.jpeg", "/studio/assets/carenearby/home.jpeg", "/studio/assets/carenearby/caregivers.jpeg"],
    world: "originals",
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
    slug: "lami-nepal",
    screens: ["/studio/assets/work/lami-1.webp", "/studio/assets/work/lami-2.webp"],
    world: "clients",
    linkLabel: "Visit Lami Nepal",
    next: "amit"
  },
  amit: {
    title: "Amit Blends",
    category: "Client website",
    type: "Client partnership",
    discipline: "Barbering & grooming",
    tagline: "Every blend, dialled in.",
    description: "A fast shopfront for a single-chair barber in Greater Sudbury, with published prices and a booking request that lands in WhatsApp.",
    meta: ["Website development", "Local SEO"],
    artWord: "Blends",
    artLine: "Fresh cuts on Riverside Drive.",
    heading: "One chair, found first.",
    overview: "Amit Blends is a one-chair barbershop on Riverside Drive in Greater Sudbury. The site lists seven services with prices and durations, so people know what they are booking before they ask.",
    roleTitle: "Built for the local search.",
    role: "izzyLabs built the site and its booking flow, set up the local SEO and wrote the content structure: 23 indexed pages and a set of grooming guides.",
    features: [
      ["Published prices", "Seven services with prices and durations, so nobody has to message to ask."],
      ["Booking request", "A short form that hands the request to WhatsApp instead of pretending to hold a calendar."],
      ["Found locally", "Static pages and structured data built for the Sudbury map results."]
    ],
    href: "https://amitblends.com/",
    slug: "amit-blends",
    screens: ["/studio/assets/work/amit-2.webp", "/studio/assets/work/amit-1.webp", "/studio/assets/work/amit-3.webp"],
    world: "clients",
    linkLabel: "Visit Amit Blends",
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

// Real product screens, fanned in phone frames. Centre phone sits in front.
function renderDevices(container, project) {
  const count = project.screens.length;
  const phones = project.screens.map((src, index) => {
    const offset = index - (count - 1) / 2;
    const phone = document.createElement("div");
    phone.className = "art-phone";
    phone.style.setProperty("--i", String(offset));
    phone.style.setProperty("--a", String(Math.abs(offset)));
    phone.style.zIndex = String(10 - Math.round(Math.abs(offset) * 2));
    const img = document.createElement("img");
    img.src = src;
    img.alt = "";
    img.width = 390;
    img.height = 844;
    img.decoding = "async";
    phone.append(img);
    return phone;
  });
  container.replaceChildren(...phones);
}

// Preload every project's screens once the page is idle so switching never shows an empty frame.
(window.requestIdleCallback || (fn => setTimeout(fn, 1200)))(() => {
  Object.values(projects).forEach(project => project.screens.forEach(src => { const img = new Image(); img.src = src; }));
});

function setProject(key, focusTab = false) {
  const project = projects[key];
  if (!project) return;
  const changed = activeProject !== key || !stage.querySelector(".art-phone");
  const canTransition = changed && typeof document.startViewTransition === "function" && !reduceMotion.matches
    && !document.hidden && (document.body.classList.contains("work-view") || document.body.classList.contains("home-flow"));
  if (canTransition) {
    const transition = document.startViewTransition(() => applyProject(key, focusTab));
    // A newer switch skips this one with AbortError; the DOM update still lands. Anything else is real.
    const ignoreSkip = error => { if (error && error.name !== "AbortError") console.error(error); };
    transition.ready.catch(ignoreSkip);
    transition.finished.catch(ignoreSkip);
    return;
  }
  applyProject(key, focusTab, changed);
}

function applyProject(key, focusTab = false, changed = true) {
  const project = projects[key];
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
  if (changed) renderDevices(stage.querySelector("[data-art-devices]"), project);
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
  location.hash = "world-" + world;
}
// On the scrolling home page the world tabs switch in place; in the work view they route.
worldTabs.forEach(tab => tab.addEventListener("click", () => {
  if (document.body.classList.contains("home-flow")) setWorld(tab.dataset.worldTab);
  else openWork(tab.dataset.worldTab);
}));

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
  if (link.hash === location.hash) routeView();
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
  projectDialog.querySelector("[data-detail-case]").href = "/work/" + project.slug;
  const nextButton = projectDialog.querySelector("[data-next-project]");
  nextButton.textContent = "Next project: " + projects[project.next].title + " →";
}

function openProject(key) {
  if (!projects[key]) return;
  closeMenu();
  document.body.classList.remove("care-preview-active");
  setWorld(projects[key].world);
  setProject(key);
  if (key === "care") {
    if (typeof window.openCareCase === "function") { window.openCareCase(); return; }
    if (projectDialog.open) projectDialog.close();
    if (location.hash === "#work-carenearby") routeView();
    else location.hash = "#work-carenearby";
    return;
  }
  renderProjectDetail(key);
  if (!projectDialog.open) projectDialog.showModal();
  projectDialog.scrollTop = 0;
  syncScrollLock();
}
document.querySelectorAll("[data-open-project]").forEach(button => button.addEventListener("click", () => openProject(activeProject)));
document.querySelector("[data-next-project]").addEventListener("click", () => openProject(projects[activeProject].next));

document.querySelectorAll("[data-select-work]").forEach(button => button.addEventListener("click", () => {
  const key = button.dataset.selectWork;
  setWorld(projects[key].world);
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
  if (!enquiryDialog.open) enquiryDialog.showModal();
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

// Home hero: the infinity eases back and fades as the page scrolls away from it.
let heroFrame;
function updateHeroScroll() {
  heroFrame = undefined;
  const progress = document.body.classList.contains("home-flow")
    ? Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.9))) : 0;
  document.body.style.setProperty("--hp", reduceMotion.matches ? "0" : progress.toFixed(4));
}
window.addEventListener("scroll", () => {
  if (heroFrame === undefined) heroFrame = requestAnimationFrame(updateHeroScroll);
}, { passive: true });

// Content routes preserve browser Back and return to the same page after contact.
let lastContentHash = "#top";
const homeSections = ["what-we-do", "about-us"];
function routeView() {
  const hash = location.hash || "#top";
  if (hash === "#contact") {
    openEnquiry();
    history.replaceState(null, "", lastContentHash);
    return;
  }
  const isCare = hash === "#work-carenearby";
  document.body.classList.toggle("case-view", isCare);
  document.body.classList.remove("care-preview-active");
  document.querySelector("#work-carenearby").hidden = !isCare;
  const isWork = hash === "#world-originals" || hash === "#world-clients";
  const infoTitles = {"#what-we-do": "What we do", "#about-us": "About us", "#latest-news": "Latest news"};
  const infoPage = Object.hasOwn(infoTitles, hash) ? document.querySelector(hash) : null;
  lastContentHash = isWork || infoPage || isCare ? hash : "#top";
  const isHome = !isWork && !infoPage && !isCare;
  document.body.classList.toggle("work-view", isWork);
  document.body.classList.toggle("info-view", Boolean(infoPage));
  document.body.classList.toggle("home-flow", isHome);
  // The home page scrolls through the work, what-we-do and about sections; the menu still opens each on its own.
  document.querySelectorAll(".info-page").forEach(page => {
    page.hidden = isHome ? !homeSections.includes(page.id) : page !== infoPage;
  });
  closeMenu();
  if (isCare) {
    document.title = "CareNearby — An izzyLabs original";
    window.scrollTo({top: 0, behavior: "instant"});
    document.querySelector("#care-title").focus({preventScroll: true});
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
    setWorld(activeWorld);
    updateHeroScroll();
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
  if (location.hash === "#top") routeView();
  else location.hash = "#top";
});
window.addEventListener("hashchange", routeView);
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
let darkMenu = false;
try { darkMenu = localStorage.getItem("izzylabs-menu-theme") === "dark"; } catch {}
function applyMenuTheme() {
 document.body.classList.toggle("menu-dark", darkMenu);
 themeButton.setAttribute("aria-pressed", String(darkMenu));
 themeButton.setAttribute("aria-label", darkMenu ? "Use light menu theme" : "Use dark menu theme");
 themeButton.firstElementChild.textContent = darkMenu ? "☀" : "☾";
}
applyMenuTheme();
themeButton.addEventListener("click", () => {darkMenu=!darkMenu;applyMenuTheme();try {localStorage.setItem("izzylabs-menu-theme",darkMenu?"dark":"light");}catch{}});

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
 if(!document.hidden && !document.body.classList.contains("info-view") && !document.body.classList.contains("work-view") && !document.body.classList.contains("case-view")){
 ctx.setTransform(1,0,0,1,0,0);ctx.drawImage(field,0,0);
 if(!reduceMotion.matches && !document.body.classList.contains("menu-open")){
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
let skyResize;window.addEventListener("resize",()=>{clearTimeout(skyResize);skyResize=setTimeout(drawCosmos,100);});
drawCosmos();if(!reduceMotion.matches)meteorFrame=requestAnimationFrame(animateSky);
reduceMotion.addEventListener("change",()=>{cancelAnimationFrame(meteorFrame);drawCosmos();if(!reduceMotion.matches)meteorFrame=requestAnimationFrame(animateSky);});

document.addEventListener("contentroutechange", () => {
  if (!document.body.classList.contains("info-view") && !document.body.classList.contains("work-view") && !document.body.classList.contains("case-view")) drawCosmos();
});


// Pointer parallax on the project art: phones turn toward the cursor, with depth by position.
(() => {
  const art = document.querySelector(".feature-art");
  const devices = document.querySelector("[data-art-devices]");
  if (!art || !devices) return;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  let frame;
  art.addEventListener("pointermove", event => {
    if (reduceMotion.matches || !finePointer.matches) return;
    const rect = art.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      devices.style.setProperty("--tx", x.toFixed(3));
      devices.style.setProperty("--ty", y.toFixed(3));
    });
  });
  art.addEventListener("pointerleave", () => {
    cancelAnimationFrame(frame);
    devices.style.setProperty("--tx", "0");
    devices.style.setProperty("--ty", "0");
  });
})();

// Info pages: blocks rise in as they enter the viewport.
(() => {
  if (reduceMotion.matches || !("IntersectionObserver" in window)) return;
  const items = document.querySelectorAll(".work-heading, .world-switcher, .project-showcase, .info-heading, .capability-list article, .about-statement, .about-worlds article, .info-end, .home-footer > :not(.home-footer-base)");
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("is-in");
    observer.unobserve(entry.target);
  }), { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
  items.forEach(item => { item.classList.add("reveal"); observer.observe(item); });
})();

if (!stage.querySelector(".art-phone")) applyProject(activeProject, false, true);


// Hover previews for Glow, Lami Nepal and Amit Blends, in the spirit of the CareNearby one:
// a full-screen themed backdrop with the product's real screens, and a card that opens the project.
(() => {
  const backdrop = document.querySelector("[data-hover-backdrop]");
  const card = document.querySelector("[data-hover-card]");
  if (!backdrop || !card) return;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const keys = ["glow", "lami", "amit"];
  let current = null, hideTimer = 0;

  function fill(key) {
    if (current === key) return;
    current = key;
    const project = projects[key];
    backdrop.dataset.theme = key;
    card.dataset.theme = key;
    backdrop.querySelector("[data-hover-word]").textContent = project.artWord;
    renderDevices(backdrop.querySelector("[data-hover-devices]"), project);
    const art = card.querySelector("[data-hover-art]");
    const img = document.createElement("img");
    img.src = project.screens[Math.floor(project.screens.length / 2)];
    img.alt = "";
    const icon = document.createElement("span");
    icon.className = "brand-tile " + key + "-tile";
    art.replaceChildren(img, icon);
    card.querySelector("[data-hover-type]").textContent = project.type;
    card.querySelector("[data-hover-title]").textContent = project.title + ".";
    card.setAttribute("aria-label", "Open " + project.title);
  }
  function show(key) {
    clearTimeout(hideTimer);
    const onHero = document.body.classList.contains("menu-open")
      || (document.body.classList.contains("home-flow") && window.scrollY < window.innerHeight * 0.5);
    if (!onHero) return;
    document.body.classList.remove("care-preview-active");
    fill(key);
    document.body.classList.add("project-preview-active");
    card.setAttribute("aria-hidden", "false");
    card.tabIndex = 0;
  }
  function hide() {
    clearTimeout(hideTimer);
    document.body.classList.remove("project-preview-active");
    card.setAttribute("aria-hidden", "true");
    card.tabIndex = -1;
  }
  const deferHide = () => { clearTimeout(hideTimer); hideTimer = setTimeout(hide, 1200); };

  document.querySelectorAll("[data-home-project]").forEach(link => {
    const key = link.dataset.homeProject;
    if (!keys.includes(key)) {
      link.addEventListener("pointerenter", hide);
      return;
    }
    link.addEventListener("pointerenter", () => { if (finePointer.matches) show(key); });
    link.addEventListener("pointerleave", deferHide);
    link.addEventListener("focus", () => { if (link.matches(":focus-visible")) show(key); });
    link.addEventListener("blur", deferHide);
  });
  card.addEventListener("pointerenter", () => clearTimeout(hideTimer));
  card.addEventListener("pointerleave", deferHide);
  card.addEventListener("focus", () => clearTimeout(hideTimer));
  card.addEventListener("blur", deferHide);
  card.addEventListener("click", event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const key = current;
    hide();
    if (key) openProject(key);
  });
  document.querySelector(".menu-toggle").addEventListener("click", hide);
  document.addEventListener("keydown", event => { if (event.key === "Escape") hide(); });
  document.addEventListener("pointerdown", event => {
    if (!card.contains(event.target) && !event.target.closest("[data-home-project]")) hide();
  });
  window.addEventListener("scroll", () => {
    if (document.body.classList.contains("project-preview-active") && window.scrollY > window.innerHeight * 0.5) hide();
  }, { passive: true });
})();


// Hero motion: the infinity tilts toward the pointer (or the phone's tilt on Android), never warped.
(() => {
  const art = document.querySelector(".minimal-art");
  if (!art || reduceMotion.matches) return;
  let frame, tx = 0, ty = 0;
  const apply = () => {
    frame = undefined;
    art.style.setProperty("--hx", tx.toFixed(3));
    art.style.setProperty("--hy", ty.toFixed(3));
  };
  const queue = () => { if (frame === undefined) frame = requestAnimationFrame(apply); };
  window.addEventListener("pointermove", event => {
    if (event.pointerType !== "mouse" || !document.body.classList.contains("home-flow")) return;
    tx = (event.clientX / window.innerWidth - 0.5) * 2;
    ty = (event.clientY / window.innerHeight - 0.5) * 2;
    queue();
  }, { passive: true });
  // iOS gates orientation behind a permission prompt; we only use it where it is freely available.
  if ("DeviceOrientationEvent" in window && typeof DeviceOrientationEvent.requestPermission !== "function") {
    window.addEventListener("deviceorientation", event => {
      if (event.gamma == null || event.beta == null) return;
      tx = Math.max(-1, Math.min(1, event.gamma / 25));
      ty = Math.max(-1, Math.min(1, (event.beta - 45) / 25));
      queue();
    }, { passive: true });
  }
})();

// Mobile work rail: every build as a swipeable card with its real screens. Tap opens the project.
(() => {
  const rail = document.querySelector("[data-work-rail]");
  const dots = document.querySelector("[data-work-rail-dots]");
  if (!rail) return;
  const order = ["glow", "care", "lami", "amit"];
  const cards = order.map((key, index) => {
    const project = projects[key];
    const card = document.createElement("button");
    card.type = "button";
    card.className = "rail-card";
    card.dataset.theme = key;
    card.setAttribute("aria-label", "Open " + project.title);
    const top = document.createElement("div");
    top.className = "rail-top";
    const icon = document.createElement("span");
    icon.className = "brand-tile " + key + "-tile";
    const type = document.createElement("span");
    type.textContent = String(index + 1).padStart(2, "0") + " / " + (project.world === "clients" ? "Client" : "Original");
    top.append(icon, type);
    const devices = document.createElement("div");
    devices.className = "rail-devices";
    renderDevices(devices, project);
    const copy = document.createElement("div");
    copy.className = "rail-copy";
    const title = document.createElement("strong");
    title.textContent = project.title;
    const line = document.createElement("p");
    line.textContent = project.tagline;
    const open = document.createElement("span");
    open.className = "rail-open";
    open.setAttribute("aria-hidden", "true");
    open.textContent = "↗";
    copy.append(title, line, open);
    card.append(top, devices, copy);
    card.addEventListener("click", () => openProject(key));
    return card;
  });
  rail.replaceChildren(...cards);
  const dotEls = cards.map(() => document.createElement("i"));
  dots.replaceChildren(...dotEls);
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    entry.target.classList.toggle("is-active", entry.isIntersecting);
    if (entry.isIntersecting) dotEls.forEach((dot, i) => dot.classList.toggle("is-on", cards[i] === entry.target));
  }), { root: rail, threshold: 0.6 });
  cards.forEach(card => observer.observe(card));
})();
