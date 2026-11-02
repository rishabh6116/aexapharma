import { useEffect, useState, useRef } from "react";
import "./styles.css";
import { useLocation } from "./router.jsx";
import { Header, Footer } from "./components.jsx";
import {
  Home, About, VisionValues, Products, ProductDetail, Quality, Responsibility,
  Media, Careers, Contact, Privacy, Disclaimer, NotFound,
} from "./pages.jsx";

const ROUTES = {
  "/": Home,
  "/about": About,
  "/vision-values": VisionValues,
  "/products": Products,
  "/quality": Quality,
  "/responsibility": Responsibility,
  "/media": Media,
  "/careers": Careers,
  "/contact": Contact,
  "/privacy-policy": Privacy,
  "/disclaimer": Disclaimer,
};

/* Fade-up elements as they scroll into view */
function useReveal(path) {
  useEffect(() => {
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = document.querySelectorAll(".th,.fm-card,.prod-card,.alt-grid>*,.two>*,.touch .wrap,.feature-grid>*");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach((el) => { el.classList.add("reveal"); io.observe(el); });
    return () => io.disconnect();
  }, [path]);
}

function useScrolled() {
  useEffect(() => {
    const on = () => document.querySelector(".header")?.classList.toggle("scrolled", window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
}

export default function App() {
  const { path } = useLocation();
  const [shown, setShown] = useState(path);
  const [leaving, setLeaving] = useState(false);
  const first = useRef(true);

  /* Fade the old page out, swap, jump to top (instantly, while hidden), fade the new page in */
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (path === shown) return;
    setLeaving(true);
    const t = setTimeout(() => {
      const root = document.documentElement;
      root.style.scrollBehavior = "auto";
      window.scrollTo(0, 0);
      setShown(path);
      requestAnimationFrame(() => {
        root.style.scrollBehavior = "";
        setLeaving(false);
      });
    }, 220);
    return () => clearTimeout(t);
  }, [path]);

  useReveal(shown);
  useScrolled();
  let page;
  if (shown.startsWith("/products/")) page = <ProductDetail slug={shown.slice("/products/".length)} />;
  else {
    const Page = ROUTES[shown] || NotFound;
    page = <Page />;
  }
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header path={path} />
      <main id="main" key={shown} className={"page-fade" + (leaving ? " leaving" : "")}>{page}</main>
      <Footer />
    </>
  );
}
