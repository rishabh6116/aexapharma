/* ------------------------------------------------------------------
   SEO single source of truth.
   Used by:
     - src/router.jsx  (usePage: updates <head> on every client-side navigation)
     - scripts/prerender.mjs (writes a real HTML file per URL at build time)
   Pure JS (no JSX, no DOM) so it also runs in Node.
   ------------------------------------------------------------------ */
import {
  LEGAL_NAME, COMPANY, ADDRESS, EMAIL, PHONE, TAGLINE, THERAPIES, PRODUCTS, slugify,
} from "./data.js";

/* TODO: if your live domain is different, change it here (only place). */
export const SITE_URL = "https://aexapharma.com";
export const OG_IMAGE = `${SITE_URL}/assets/og-image.png`;
export const OG_IMAGE_ALT = "AEXA Pharma logo – WHO-GMP pharmaceutical manufacturer in Thane, Maharashtra";
export const SOCIAL_PROFILES = []; /* e.g. ["https://www.linkedin.com/company/aexa-pharma", "https://www.facebook.com/aexapharma"] */

const abs = (path) => (path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`);
const clip = (s, n) => (s.length <= n ? s : s.slice(0, n - 1).replace(/\s+\S*$/, "") + "…");

export const productPath = (p) => `/products/${slugify(p.name)}`;
const activesOf = (p) => p.formulation.map(([m]) => m);
const activesWithDose = (p) => p.formulation.map(([m, d]) => (d && d !== "—" ? `${m} ${d}` : m));

/* ---------- Per-page meta ---------- */
const STATIC_META = {
  "/": {
    title: "AEXA Pharma | WHO-GMP Pharmaceutical Company in Thane",
    description:
      "AEXA Pharma – WHO-GMP compliant pharmaceutical manufacturer in Thane, Maharashtra. Anti-infective, gastro, respiratory and pain formulations for India.",
    keywords:
      "AEXA Pharma, Aexa Pharma Private Limited, pharma company in Thane, WHO-GMP pharmaceutical manufacturer, pharmaceutical formulations India, anti-infective, antibacterial, gastroenterology, respiratory, pain management, pharma distributor Maharashtra",
    type: "WebPage",
  },
  "/about": {
    title: "About AEXA Pharma | Pharmaceutical Manufacturer, Thane",
    description:
      "Know AEXA Pharma Private Limited – a WHO-GMP compliant pharmaceutical manufacturer in Thane, Maharashtra, serving doctors, pharmacists and distributors.",
    keywords: "about AEXA Pharma, pharmaceutical company Thane, WHO-GMP manufacturer, Aexa Pharma Private Limited",
    type: "AboutPage",
    crumb: "About Us",
  },
  "/vision-values": {
    title: "Vision, Mission & Values | AEXA Pharma",
    description:
      "AEXA Pharma's vision, mission and core values – quality first, patient focus, integrity and partnership in everything we manufacture.",
    keywords: "AEXA Pharma vision, pharma company values, mission, quality first",
    crumb: "Vision & Values",
  },
  "/products": {
    title: "Pharma Products & Formulations | AEXA Pharma",
    description:
      "Explore AEXA Pharma formulations: Cefilan-OF, Rabelan-DSR, Mair-LC, Doxybid-100, Panocin, Ycof DM and Vimilan-OD across five therapeutic areas.",
    keywords:
      "AEXA Pharma products, Cefilan-OF, Rabelan-DSR, Mair-LC, Doxybid-100, Panocin, Ycof DM, Vimilan-OD, cefixime ofloxacin, rabeprazole domperidone, montelukast levocetirizine, nimesulide paracetamol",
    type: "CollectionPage",
    crumb: "Products",
  },
  "/quality": {
    title: "Quality Standards & WHO-GMP Manufacturing | AEXA Pharma",
    description:
      "How AEXA Pharma ensures quality: raw-material testing, WHO-GMP compliant facilities, batch-wise validation and stability-tested packaging.",
    keywords: "WHO-GMP manufacturing, pharma quality control, batch validation, raw material testing, AEXA Pharma quality",
    crumb: "Quality",
  },
  "/responsibility": {
    title: "Corporate Responsibility | AEXA Pharma",
    description:
      "AEXA Pharma's commitment to patient safety, ethical practice, the environment and community health.",
    keywords: "pharma corporate responsibility, patient safety, ethical pharma marketing, AEXA Pharma CSR",
    crumb: "Responsibility",
  },
  "/media": {
    title: "Media & News | AEXA Pharma",
    description: "News, announcements and press updates from AEXA Pharma Private Limited, Thane. Media enquiries welcome.",
    keywords: "AEXA Pharma news, pharma press releases, media enquiries",
    crumb: "Media",
  },
  "/careers": {
    title: "Careers at AEXA Pharma | Pharma Jobs in Thane",
    description:
      "Build a career in healthcare with AEXA Pharma in Thane, Maharashtra. Send your resume to be considered for upcoming roles.",
    keywords: "pharma jobs Thane, AEXA Pharma careers, pharmaceutical careers Maharashtra, medical representative jobs",
    crumb: "Careers",
  },
  "/contact": {
    title: "Contact AEXA Pharma | Thane, Maharashtra",
    description:
      "Contact AEXA Pharma Private Limited, Samata Nagar, Thane West 400606. Doctors, pharmacists and distributors – we reply within one business day.",
    keywords: "contact AEXA Pharma, pharma company Thane address, pharma distributor inquiry, Samata Nagar Thane West",
    type: "ContactPage",
    crumb: "Contact Us",
  },
  "/privacy-policy": {
    title: "Privacy Policy | AEXA Pharma",
    description: "How AEXA Pharma Private Limited collects and uses information submitted through its contact form.",
    crumb: "Privacy Policy",
  },
  "/disclaimer": {
    title: "Disclaimer | AEXA Pharma",
    description: "Important information for healthcare professionals and trade partners using the AEXA Pharma website.",
    crumb: "Disclaimer",
  },
};

export const NOT_FOUND_META = {
  title: "Page not found | AEXA Pharma",
  description: "The page you are looking for does not exist on the AEXA Pharma website.",
  noindex: true,
};

export function productMeta(p) {
  const actives = activesOf(p).join(" + ");
  return {
    title: clip(`${p.name} – ${actives} | AEXA Pharma`, 62),
    description: clip(
      `${p.name} (${activesWithDose(p).join(" + ")}) by AEXA Pharma, Thane. ${p.benefit} Manufactured under WHO-GMP compliant conditions.`,
      158
    ),
    keywords: `${p.name}, ${activesOf(p).join(", ")}, ${p.indication}, AEXA Pharma`,
    type: "ItemPage",
    crumb: p.name,
  };
}

/* Resolve meta for any path. Unknown paths -> noindex 404 meta. */
export function getMeta(path) {
  if (STATIC_META[path]) return { path, ...STATIC_META[path] };
  if (path.startsWith("/products/")) {
    const p = PRODUCTS.find((x) => slugify(x.name) === path.slice("/products/".length));
    if (p) return { path, ...productMeta(p), product: p };
  }
  return { path, ...NOT_FOUND_META };
}

/* All indexable URLs (drives sitemap + prerender) */
export const ALL_PATHS = [
  ...Object.keys(STATIC_META),
  ...PRODUCTS.map(productPath),
];

/* ---------- JSON-LD ---------- */
export const ORG_ID = `${SITE_URL}/#organization`;
export const SITE_ID = `${SITE_URL}/#website`;

export function organizationLd() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: LEGAL_NAME,
    alternateName: [COMPANY, "AEXA Pharma", "Aexa Pharma Pvt Ltd"],
    url: `${SITE_URL}/`,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/assets/logo.png`, width: 407, height: 357 },
    image: OG_IMAGE,
    description:
      "WHO-GMP compliant pharmaceutical manufacturer delivering multi-therapeutic formulations for doctors, pharmacists and distribution partners across India.",
    slogan: TAGLINE,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Office No. G-1, Ground Floor, Rameshwar Bhuvan, Pokharan Road No. 1, Samata Nagar",
      addressLocality: "Thane West",
      addressRegion: "Maharashtra",
      postalCode: "400606",
      addressCountry: "IN",
    },
    contactPoint: [{
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: PHONE.replace(/\s+/g, "-"),
      email: EMAIL,
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    }],
    areaServed: { "@type": "Country", name: "India" },
    knowsAbout: THERAPIES.map((t) => t.name),
    ...(SOCIAL_PROFILES.length ? { sameAs: SOCIAL_PROFILES } : {}),
  };
}

export function websiteLd() {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: `${SITE_URL}/`,
    name: "AEXA Pharma",
    alternateName: [LEGAL_NAME, "Aexa Pharma"],
    inLanguage: "en-IN",
    publisher: { "@id": ORG_ID },
  };
}

export function breadcrumbLd(meta) {
  if (meta.path === "/") return null;
  const items = [{ name: "Home", path: "/" }];
  if (meta.path.startsWith("/products/")) items.push({ name: "Products", path: "/products" });
  items.push({ name: meta.crumb || meta.title, path: meta.path });
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.path),
    })),
  };
}

function drugLd(p, meta) {
  return {
    "@type": "Drug",
    "@id": `${abs(meta.path)}#drug`,
    name: p.name,
    url: abs(meta.path),
    description: p.benefit,
    activeIngredient: activesWithDose(p),
    manufacturer: { "@id": ORG_ID },
    image: OG_IMAGE,
  };
}

/* Returns one JSON-LD object (@graph) for the page. */
export function pageLd(meta) {
  if (meta.noindex) return null;
  const url = abs(meta.path);
  const graph = [organizationLd(), websiteLd()];
  const page = {
    "@type": meta.type || "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: meta.title,
    description: meta.description,
    inLanguage: "en-IN",
    isPartOf: { "@id": SITE_ID },
    about: { "@id": ORG_ID },
    primaryImageOfPage: { "@type": "ImageObject", url: OG_IMAGE },
  };
  if (meta.path === "/") page.about = { "@id": ORG_ID };
  if (meta.path === "/contact") page.mainEntity = { "@id": ORG_ID };
  if (meta.path === "/products") {
    page.mainEntity = {
      "@type": "ItemList",
      itemListElement: PRODUCTS.map((p, i) => ({
        "@type": "ListItem", position: i + 1, url: abs(productPath(p)), name: p.name,
      })),
    };
  }
  graph.push(page);
  if (meta.product) {
    graph.push(drugLd(meta.product, meta));
    page.mainEntity = { "@id": `${abs(meta.path)}#drug` };
  }
  const bc = breadcrumbLd(meta);
  if (bc) graph.push(bc);
  return { "@context": "https://schema.org", "@graph": graph };
}

/* Everything the <head> needs, as plain data */
export function headModel(path) {
  const m = getMeta(path);
  const url = abs(m.path === "/" ? "/" : m.path);
  return {
    meta: m,
    title: m.title,
    description: m.description,
    keywords: m.keywords || "",
    canonical: m.noindex ? null : url,
    robots: m.noindex
      ? "noindex, follow"
      : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    og: {
      "og:type": "website",
      "og:site_name": "AEXA Pharma",
      "og:locale": "en_IN",
      "og:url": url,
      "og:title": m.title,
      "og:description": m.description,
      "og:image": OG_IMAGE,
      "og:image:width": "1200",
      "og:image:height": "630",
      "og:image:alt": OG_IMAGE_ALT,
    },
    twitter: {
      "twitter:card": "summary_large_image",
      "twitter:title": m.title,
      "twitter:description": m.description,
      "twitter:image": OG_IMAGE,
      "twitter:image:alt": OG_IMAGE_ALT,
    },
    jsonLd: pageLd(m),
  };
}
