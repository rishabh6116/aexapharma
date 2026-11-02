import { useEffect, useSyncExternalStore } from "react";

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

/* Scroll to top on page change, and set the document title. */
export function usePage(title, description) {
  const { path, hash } = useLocation();
  useEffect(() => {
    const el = hash && document.getElementById(hash);
    if (el) el.scrollIntoView(); else window.scrollTo(0, 0);
  }, [path, hash]);
  useEffect(() => {
    document.title = title ? `${title} | Aexa Pharma` : "Aexa Pharma | WHO-GMP Pharmaceutical Manufacturer in Thane, Maharashtra";
    if (description) {
      const m = document.querySelector('meta[name="description"]');
      if (m) m.setAttribute("content", description);
    }
  }, [title, description]);
}
