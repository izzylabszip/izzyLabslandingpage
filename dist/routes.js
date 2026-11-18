"use strict";
const pagePaths = {"#top": "/", "#work-glow": "/work/glow", "#work-carenearby": "/work/carenearby", "#work-lami": "/work/lami-nepal", "#all-work": "/work", "#what-we-do": "/what-we-do", "#about-us": "/about-us", "#latest-news": "/latest-news", "#contact": "/contact", "#world-originals": "/ventures", "#world-clients": "/clients"};
function routeId() { return Object.keys(pagePaths).find(id => pagePaths[id] === (location.pathname.replace(/\/$/, '') || '/')) || '#top'; }
function pagePath(id) { return pagePaths[id] || id; }
function navigatePage(id) {
 const path = pagePath(id);
 if (location.pathname !== path || location.hash) history.pushState(null, '', path);
 routeView();
}
if (pagePaths[location.hash]) history.replaceState(null, '', pagePaths[location.hash]);
document.addEventListener('click', event => {
 const link = event.target.closest('a[href]');
 if (!link || event.defaultPrevented || event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target || link.hasAttribute('download')) return;
 const url = new URL(link.href);
 if (url.origin !== location.origin || !Object.values(pagePaths).includes(url.pathname) || url.hash) return;
 event.preventDefault();
 if (url.pathname === '/contact') openEnquiry(); else navigatePage(url.pathname);
});
window.addEventListener('popstate', () => routeView());
