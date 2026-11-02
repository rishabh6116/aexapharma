import { useEffect, useSyncExternalStore } from "react";
import { headModel } from "./seo.js";

/* Tiny History-API router (no extra dependency). */
const subscribe = (cb) => {
  window.addEventListener("popstate", cb);
  return () => window.removeEventListener("popstate", cb);
};
const snapshot = () => window.location.pathname + window.location.search + window.location.hash;

export function navigate(to) {
  window.history.pushState({}, "", to);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

export function useLocation() {
  const full = useSyncExternalStore(subscribe, snapshot, () => "/");
  const [noHash, hash = ""] = full.split("#");
  const [path, search = ""] = noHash.split("?");
  return { path: path.replace(/\/+$/, "") || "/", params: new URLSearchParams(search), hash };
}

export function Link({ to, children, onClick, ...rest }) {
  const handle = (e) => {
    onClick && onClick(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(to);
  };
  return <a href={to} onClick={handle} {...rest}>{children}</a>;
}

/* Set (or create) a <meta>/<link> in <head> */
function setTag(selector, create, attrs) {
  let el = document.head.querySelector(selector);
  if (!el) { el = document.createElement(create); document.head.appendChild(el); }
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  return el;
}

/* Keep <head> SEO tags in sync with the current URL (title, description, canonical,
   robots, Open Graph, Twitter, JSON-LD). Content comes from src/seo.js. */
function applySeo(path) {
  const h = headModel(path);
  document.title = h.title;
  setTag('meta[name="description"]', "meta", { name: "description", content: h.description });
  if (h.keywords) setTag('meta[name="keywords"]', "meta", { name: "keywords", content: h.keywords });
  setTag('meta[name="robots"]', "meta", { name: "robots", content: h.robots });
  const canon = document.head.querySelector('link[rel="canonical"]');
  if (h.canonical) setTag('link[rel="canonical"]', "link", { rel: "canonical", href: h.canonical });
  else if (canon) canon.remove();
  Object.entries(h.og).forEach(([k, v]) => setTag(`meta[property="${k}"]`, "meta", { property: k, content: v }));
  Object.entries(h.twitter).forEach(([k, v]) => setTag(`meta[name="${k}"]`, "meta", { name: k, content: v }));
  const ld = document.getElementById("ld-json");
  if (h.jsonLd) {
    const el = ld || Object.assign(document.createElement("script"), { id: "ld-json", type: "application/ld+json" });
    el.textContent = JSON.stringify(h.jsonLd);
    if (!ld) document.head.appendChild(el);
  } else if (ld) ld.remove();
}

/* Scroll to hash on page change and update SEO tags. (title/description args are kept
   for backwards compatibility; the real values now live in src/seo.js.) */
export function usePage() {
  const { path, hash } = useLocation();
  useEffect(() => {
    const el = hash && document.getElementById(hash);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [path, hash]);
  useEffect(() => { applySeo(path); }, [path]);
}
