import { useEffect, useMemo, useState } from "react";
import { Link } from "./router.jsx";
import { COMPANY, LEGAL_NAME, ADDRESS, EMAIL, PHONE, PHONE_HREF, TAGLINE, MAP_SRC, NAV, ROLES, SLIDES, SLIDE_COUNT, THERAPIES, therapySlug } from "./data.js";

export const ICONS = {
  stomach: <path d="M18 8v10c0 8-8 8-8 16a8 8 0 0 0 16 0c0-6 6-6 6-14s-6-8-14-12z" />,
  bolt: <path d="M26 6 12 26h10l-4 16 18-22H25z" />,
  lungs: <><path d="M24 10v18" /><path d="M20 16c-8 2-12 12-12 24 4 2 12 0 12-8zM28 16c8 2 12 12 12 24-4 2-12 0-12-8z" /></>,
  shield: <><path d="M24 6 10 12v10c0 10 6 17 14 20 8-3 14-10 14-20V12z" /><path d="m18 24 5 5 8-9" /></>,
  sun: <><circle cx="24" cy="24" r="8" /><path d="M24 6v6M24 36v6M6 24h6M36 24h6M11 11l4 4M33 33l4 4M37 11l-4 4M15 33l-4 4" /></>,
};
export function Icon({ name }) {
  return (
    <svg viewBox="0 0 48 48" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[name]}
    </svg>
  );
}

/* ================= Hero art: dots forming an "A" ================= */
export function HeroArt() {
  const dots = useMemo(() => {
    const out = [];
    const colors = ["#F7941D", "#E4572E", "#1C6E8C", "#7BAE3A", "#F2B134", "#4A4A4A", "#C0392B"];
    let seed = 7;
    const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
    const inA = (x, y) => {
      const t = (y - 4) / 92;
      if (t < 0 || t > 1) return false;
      const half = 4 + t * 36;
      const left = Math.abs(x - 50) > half - 11 && Math.abs(x - 50) < half;
      const bar = t > 0.58 && t < 0.72 && Math.abs(x - 50) < half;
      return left || bar;
    };
    for (let y = 2; y < 98; y += 2.6) {
      for (let x = 4; x < 96; x += 2.6) {
        const jx = x + (rnd() - 0.5) * 1.2;
        const jy = y + (rnd() - 0.5) * 1.2;
        if (inA(jx, jy)) out.push({ x: jx, y: jy, r: 0.8 + rnd() * 0.9, c: colors[Math.floor(rnd() * colors.length)] });
      }
    }
    return out;
  }, []);
  return (
    <svg className="hero-art" viewBox="0 0 100 100" role="img" aria-label="A mosaic of dots forming the letter A">
      {dots.map((d, i) => <circle key={i} cx={d.x} cy={d.y} r={d.r} fill={d.c} />)}
    </svg>
  );
}


export function Logo() {
  return (
    <Link className="logo" to="/" aria-label={COMPANY + " home"}>
      <img src="/assets/logo.png" width="55" height="48" alt="" />
      <span><b>AEXA</b><i>{"PHARMA".split("").map((ch, n) => <em key={n}>{ch}</em>)}</i></span>
    </Link>
  );
}

export function GlassArt() {
  return (
    <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustration of laboratory glassware">
      <rect width="320" height="200" fill="#3d3d3d" />
      <circle cx="250" cy="40" r="90" fill="#F7941D" opacity=".25" />
      <path d="M120 40h40v50l40 80a10 10 0 0 1-9 14H89a10 10 0 0 1-9-14l40-80z" fill="#fff" opacity=".9" />
      <path d="M96 140h88l16 30a6 6 0 0 1-5 9H85a6 6 0 0 1-5-9z" fill="#F7941D" />
      <rect x="112" y="30" width="56" height="10" rx="3" fill="#fff" />
    </svg>
  );
}

export function Header({ path }) {
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);
  const active = (to) => (to === "/" ? path === "/" : path === to || path.startsWith(to + "/"));
  return (
    <header className="header">
      <div className="wrap nav">
        <Logo />
        <button className="menu-btn" aria-expanded={open} aria-controls="mainnav" onClick={() => setOpen(!open)}>
          {open ? "Close" : "Menu"}
        </button>
        <nav aria-label="Main">
          <ul id="mainnav" className={open ? "open" : ""}>
            {NAV.map((n) => (
              <li key={n.to} className={n.sub ? "has-sub" : ""}>
                <Link to={n.to} className={active(n.to) || (n.sub && n.sub.some((s) => active(s.to))) ? "on" : ""}>
                  {n.label}{n.sub && <svg className="caret" viewBox="0 0 12 12" width="10" height="10" aria-hidden="true"><path d="M2 4.2l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </Link>
                {n.sub && (
                  <div className="sub">
                    {n.sub.map((s) => <Link key={s.to} to={s.to}>{s.label}</Link>)}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="foot-top">
        <div className="wrap foot-cols">
          <div>
            <h4>ABOUT AEXA PHARMA</h4>
            <ul>
              <li><Link to="/about">Company Overview</Link></li>
              <li><Link to="/vision-values">Vision &amp; Values</Link></li>
            </ul>
            <p className="foot-text" style={{ marginTop: 14 }}>{TAGLINE}.</p>
          </div>
          <div>
            <h4>OPERATIONS</h4>
            <ul>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/quality">Quality</Link></li>
              <li><Link to="/responsibility">Responsibility</Link></li>
            </ul>
          </div>
          <div>
            <h4>CATEGORIES</h4>
            <ul>{THERAPIES.map((t) => <li key={t.name}><Link to={`/products#${therapySlug(t)}`}>{t.name}</Link></li>)}</ul>
          </div>
          <div>
            <h4>WORK WITH US</h4>
            <ul>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/media">Media</Link></li>
              <li><Link to="/contact">Partner with us</Link></li>
            </ul>
          </div>
          <div>
            <h4>CONTACT</h4>
            <ul>
              <li className="foot-text">{ADDRESS}</li>
              <li><a href={PHONE_HREF}>{PHONE}</a></li>
              <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="foot-bar">
        <div className="wrap bar">
          <span>© {new Date().getFullYear()} {LEGAL_NAME}. All rights reserved. &nbsp;
            <Link to="/privacy-policy"><b>Privacy Policy</b></Link> | <Link to="/disclaimer"><b>Disclaimer</b></Link>
          </span>
        </div>
      </div>
    </footer>
  );
}

/* Sun-Pharma-style inner page banner: text on the left, graphic on the right */
export function PageHero({ title, children, art }) {
  return (
    <section className="page-hero">
      <div className="ph-copy">
        <div className="ph-inner">
          <h1 className="orange-h">{title}</h1>
          {children}
        </div>
      </div>
      <div className="ph-art">{art || <GlassArt />}</div>
    </section>
  );
}

/* Contact form; `defaultMessage` pre-fills the message box (e.g. from a product page). */
export function ContactForm({ defaultMessage = "" }) {
  const empty = { name: "", role: "", email: "", phone: "", message: defaultMessage };
  const [form, setForm] = useState(empty);
  const [sent, setSent] = useState(false);
  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  useEffect(() => { setForm((f) => ({ ...f, message: defaultMessage })); setSent(false); }, [defaultMessage]);

  // TODO: connect to your backend / email service (currently the form only shows a thank-you message)
  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ ...empty, message: "" });
  };
  return (
    <form onSubmit={submit}>
      <label>Full Name<input required autoComplete="name" placeholder="Dr. Anjali Mehta" value={form.name} onChange={update("name")} /></label>
      <label>Role
        <select required value={form.role} onChange={update("role")}>
          <option value="">Select your role</option>
          {ROLES.map((r) => <option key={r}>{r}</option>)}
        </select>
      </label>
      <label>Email<input required type="email" autoComplete="email" placeholder="you@clinic.com" value={form.email} onChange={update("email")} /></label>
      <label>Phone Number<input required type="tel" autoComplete="tel" placeholder="+91 90000 00000" value={form.phone} onChange={update("phone")} /></label>
      <label>Message<textarea rows="4" placeholder="Tell us about your requirement..." value={form.message} onChange={update("message")} /></label>
      <p className="fine">By submitting, you agree to be contacted by our partnerships team regarding your inquiry.</p>
      <button className="btn" type="submit">Submit Inquiry</button>
      {sent && <p className="status" role="status">Inquiry submitted. Our team will reach out shortly.</p>}
    </form>
  );
}

export function MapEmbed() {
  return <iframe className="map" title="Aexa Pharma office location" src={MAP_SRC} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />;
}

function usePerView() {
  const get = () => (window.innerWidth < 760 ? 1 : 2);
  const [n, setN] = useState(get);
  useEffect(() => {
    const on = () => setN(get());
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  return n;
}

export function VisualAids() {
  const perView = usePerView();
  const [i, setI] = useState(0);
  const max = SLIDES.length - perView;
  const idx = Math.min(i, max);
  const go = (k) => setI(Math.max(0, Math.min(max, k)));
  return (
    <section id="visual-aids" className="section">
      <div className="wrap">
        <h2 className="orange-h center">Explore Our Products Slide by Slide</h2>
        <div className="va-wrap">
          <button className="va-arrow prev" aria-label="Previous slide" onClick={() => go(idx - 1)} disabled={idx === 0}>‹</button>
          <div className="carousel">
            <div className="track" style={{ transform: `translateX(-${idx * (100 / perView)}%)` }}>
              {SLIDES.map((src, k) => (
                <div className="slide" style={{ flex: `0 0 ${100 / perView}%` }} key={src}>
                  <img className="va-img" ref={(el) => { if (el && el.complete) el.classList.add("ld"); }} onLoad={(e) => e.currentTarget.classList.add("ld")} src={src} loading={k < 2 ? "eager" : "lazy"} width="960" height="654"
                    alt={`Aexa Pharma product visual aid, slide ${k + 1} of ${SLIDE_COUNT}`} />
                </div>
              ))}
            </div>
          </div>
          <button className="va-arrow next" aria-label="Next slide" onClick={() => go(idx + 1)} disabled={idx === max}>›</button>
        </div>
        <div className="dots" role="tablist" aria-label="Slides">
          {Array.from({ length: max + 1 }).map((_, k) => (
            <button key={k} role="tab" aria-selected={k === idx} aria-label={`Go to slide ${k + 1}`} className={k === idx ? "on" : ""} onClick={() => setI(k)} />
          ))}
        </div>
      </div>
    </section>
  );
}

