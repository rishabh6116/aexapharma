/* ------------------------------------------------------------------
   SEO prerender (zero dependencies).

   Usage
     npm run build                -> vite build, then this script
     node scripts/prerender.mjs --sync-index   -> refresh the SEO block inside /index.html
     node scripts/prerender.mjs --sitemap      -> refresh public/sitemap.xml only

   What it does after `vite build`:
     1. For every URL (home, pages, each product) writes dist/<path>/index.html with the
        correct <title>, description, canonical, Open Graph, Twitter, robots and JSON-LD
        already in the HTML, plus crawlable page text inside <div id="root">
        (React replaces it as soon as the app loads).
     2. Writes dist/404.html (noindex).
     3. Writes dist/sitemap.xml with today's date as <lastmod>.
   ------------------------------------------------------------------ */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { headModel, ALL_PATHS, SITE_URL, productPath } from "../src/seo.js";
import {
  LEGAL_NAME, COMPANY, ADDRESS, EMAIL, PHONE, PHONE_HREF, TAGLINE, THERAPIES, PRODUCTS, QUALITY,
  VISION, MISSION, VALUES, RESPONSIBILITY, NAV, slugify, therapySlug,
} from "../src/data.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const START = "<!--seo:start-->";
const END = "<!--seo:end-->";

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const abs = (p) => (p === "/" ? `${SITE_URL}/` : `${SITE_URL}${p}`);

/* ---------- <head> SEO block ---------- */
export function seoBlock(p) {
  const h = headModel(p);
  const lines = [
    `<title>${esc(h.title)}</title>`,
    `<meta name="description" content="${esc(h.description)}" />`,
  ];
  if (h.keywords) lines.push(`<meta name="keywords" content="${esc(h.keywords)}" />`);
  lines.push(`<meta name="robots" content="${esc(h.robots)}" />`);
  if (h.canonical) {
    lines.push(`<link rel="canonical" href="${esc(h.canonical)}" />`);
    lines.push(`<link rel="alternate" hreflang="en-IN" href="${esc(h.canonical)}" />`);
    lines.push(`<link rel="alternate" hreflang="x-default" href="${esc(h.canonical)}" />`);
  }
  for (const [k, v] of Object.entries(h.og)) lines.push(`<meta property="${k}" content="${esc(v)}" />`);
  for (const [k, v] of Object.entries(h.twitter)) lines.push(`<meta name="${k}" content="${esc(v)}" />`);
  if (h.jsonLd) {
    const json = JSON.stringify(h.jsonLd).replace(/</g, "\\u003c");
    lines.push(`<script type="application/ld+json" id="ld-json">${json}</script>`);
  }
  return lines.map((l) => "    " + l).join("\n");
}

/* ---------- crawlable body text (replaced by React on load) ---------- */
const ul = (items) => `<ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;
const a = (to, label) => `<a href="${to}">${esc(label)}</a>`;
const formula = (p) => ul(p.formulation.map(([m, d]) => `${esc(m)}${d && d !== "—" ? ` ${esc(d)}` : ""}`));
const productLi = (p) => `${a(productPath(p), p.name)} – ${esc(p.benefit)}`;

function navHtml() {
  const flat = [];
  NAV.forEach((n) => (n.sub ? n.sub.forEach((s) => flat.push(s)) : flat.push(n)));
  return `<nav aria-label="Main">${ul(flat.map((n) => a(n.to, n.label)))}</nav>`;
}

function bodyFor(p, meta) {
  let h1 = meta.crumb || COMPANY;
  let inner = "";
  if (p === "/") {
    h1 = "Advancing Health, Expanding Hope – AEXA Pharma";
    inner = `
      <p>${esc(LEGAL_NAME)} develops and manufactures multi-therapeutic formulations for hospitals, pharmacies and distribution networks, engineered under WHO-GMP compliant conditions and validated at every stage of production. We are based in Thane, Maharashtra.</p>
      <h2>Coverage across five core specialties</h2>
      ${ul(THERAPIES.map((t) => `${a(`/products#${therapySlug(t)}`, t.name)} – ${esc(t.desc)}`))}
      <h2>Featured formulations</h2>
      ${ul(PRODUCTS.map(productLi))}
      <h2>Partner with ${esc(COMPANY)}</h2>
      <p>Whether you are a doctor, pharmacist or distributor, our team responds to every inquiry within one business day. ${a("/contact", "Get in touch")}.</p>`;
  } else if (p === "/about") {
    inner = `<p>${esc(LEGAL_NAME)} develops and manufactures multi-therapeutic formulations for doctors, pharmacists and distribution partners across India, from our base in Thane, Maharashtra.</p>
      <h2>Who we are</h2><p>We are a WHO-GMP compliant pharmaceutical manufacturer. Our range covers anti-infective, gastroenterology, respiratory, pain management and daily-support categories.</p>`;
  } else if (p === "/vision-values") {
    inner = `<h2>Our Vision</h2><p>${esc(VISION)}</p><h2>Our Mission</h2><p>${esc(MISSION)}</p>
      <h2>Our Values</h2>${ul(VALUES.map(([t, d]) => `<b>${esc(t)}</b> – ${esc(d)}`))}`;
  } else if (p === "/products") {
    inner = `<p>A focused portfolio of multi-therapeutic formulations across five therapeutic areas, manufactured under WHO-GMP compliant conditions.</p>
      ${THERAPIES.map((t) => `<h2>${esc(t.name)}</h2><p>${esc(t.desc)}</p>`).join("")}
      <h2>All formulations</h2>${ul(PRODUCTS.map(productLi))}`;
  } else if (meta.product) {
    const x = meta.product;
    h1 = x.name;
    inner = `<p>${esc(x.benefit)}</p><h2>Active formulation</h2>${formula(x)}
      <h2>Dosage / presentation</h2><p>${esc(x.dosage)}</p><h2>Indication</h2><p>${esc(x.indication)}</p>
      <p>${a("/products", "All AEXA Pharma products")} · ${a(`/contact?product=${encodeURIComponent(x.name)}`, "Inquire now")}</p>`;
  } else if (p === "/quality") {
    inner = `<p>Every batch passes through validated checkpoints before it reaches a pharmacy shelf.</p>
      ${ul(QUALITY.map(([t, d]) => `<b>${esc(t)}</b> – ${esc(d)}`))}`;
  } else if (p === "/responsibility") {
    inner = `<p>Caring for patients, partners and the environment is part of how we make medicines.</p>
      ${ul(RESPONSIBILITY.map(([t, d]) => `<b>${esc(t)}</b> – ${esc(d)}`))}`;
  } else if (p === "/media") {
    inner = `<p>News, announcements and updates from ${esc(COMPANY)}. For media enquiries write to <a href="mailto:${EMAIL}">${EMAIL}</a>.</p>`;
  } else if (p === "/careers") {
    inner = `<p>Join a team that is advancing health and expanding hope. Send your resume to <a href="mailto:${EMAIL}">${EMAIL}</a>.</p>`;
  } else if (p === "/contact") {
    inner = `<p>Our team responds to every inquiry within one business day.</p>
      <address><b>${esc(LEGAL_NAME)}</b><br />${esc(ADDRESS)}<br />Phone: <a href="${PHONE_HREF}">${esc(PHONE)}</a><br />Email: <a href="mailto:${EMAIL}">${EMAIL}</a></address>`;
  } else {
    if (meta.noindex) h1 = "Page not found";
    inner = `<p>${esc(meta.description)}</p>`;
  }
  return `<header><a href="/">${esc(COMPANY)}</a> ${navHtml()}</header>
    <main><h1>${esc(h1)}</h1>${inner}</main>
    <footer><p>${esc(LEGAL_NAME)}, ${esc(ADDRESS)}. ${a("/privacy-policy", "Privacy Policy")} | ${a("/disclaimer", "Disclaimer")}</p></footer>`;
}

/* ---------- sitemap ---------- */
function sitemapXml() {
  const day = new Date().toISOString().slice(0, 10);
  const prio = (p) => (p === "/" ? "1.0" : p === "/products" || p.startsWith("/products/") ? "0.8" : p === "/privacy-policy" || p === "/disclaimer" ? "0.3" : "0.7");
  const urls = ALL_PATHS.map(
    (p) => `  <url>\n    <loc>${abs(p)}</loc>\n    <lastmod>${day}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${prio(p)}</priority>\n  </url>`
  );
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
}

/* ---------- main ---------- */
const swapBlock = (html, block) => {
  const i = html.indexOf(START), j = html.indexOf(END);
  if (i < 0 || j < 0) throw new Error(`Markers ${START} / ${END} not found in index.html`);
  return html.slice(0, i + START.length) + "\n" + block + "\n    " + html.slice(j);
};

const args = process.argv.slice(2);

if (args.includes("--sync-index")) {
  const f = path.join(ROOT, "index.html");
  fs.writeFileSync(f, swapBlock(fs.readFileSync(f, "utf8"), seoBlock("/")));
  console.log("index.html SEO block refreshed");
} else if (args.includes("--sitemap")) {
  fs.writeFileSync(path.join(ROOT, "public", "sitemap.xml"), sitemapXml());
  console.log("public/sitemap.xml refreshed");
} else {
  const template = fs.readFileSync(path.join(DIST, "index.html"), "utf8");
  const emptyRoot = '<div id="root"></div>';
  if (!template.includes(emptyRoot)) throw new Error('Could not find <div id="root"></div> in dist/index.html');

  const render = (p) => {
    const h = headModel(p);
    let html = swapBlock(template, seoBlock(p));
    return html.replace(emptyRoot, `<div id="root">\n    ${bodyFor(p, h.meta)}\n  </div>`);
  };

  let count = 0;
  for (const p of ALL_PATHS) {
    const out = p === "/" ? path.join(DIST, "index.html") : path.join(DIST, p, "index.html");
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, render(p));
    count++;
  }
  fs.writeFileSync(path.join(DIST, "404.html"), render("/__404__"));
  fs.writeFileSync(path.join(DIST, "sitemap.xml"), sitemapXml());
  console.log(`Prerendered ${count} pages + 404.html + sitemap.xml`);
}
