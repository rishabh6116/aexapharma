export const COMPANY = "Aexa Pharma";
export const LEGAL_NAME = "Aexa Pharma Private Limited";
export const LOCATION = "Thane, Maharashtra, India";
export const ADDRESS =
  "Office No. G-1, Ground Floor, Rameshwar Bhuvan, Pokharan Road No. 1, Samata Nagar, Thane West – 400606, Maharashtra";
export const EMAIL = "md@aexapharma.com";
export const PHONE = "+91 98765 43210"; // TODO: placeholder number from the old site — replace with the real one
export const PHONE_HREF = "tel:+919876543210"; // keep in sync with PHONE
export const TAGLINE = "Advancing Health, Expanding Hope";
export const MAP_SRC =
  "https://www.google.com/maps?q=Rameshwar%20Bhuvan%2C%20Pokharan%20Road%20No.%201%2C%20Samata%20Nagar%2C%20Thane%20West%2C%20400606&output=embed";

export const PILLS = [
  ["7", "formulations in our range"],
  ["5", "therapeutic areas"],
  ["WHO-GMP", "compliant manufacturing"],
];

export const THERAPIES = [
  {
    name: "Anti-Infective / Antibacterial",
    icon: "shield",
    desc: "Broad-spectrum and dual-action antibacterial formulations for mixed and resistant infections, with probiotic support where clinically indicated.",
    products: ["Cefilan-OF / Cefilan-200", "Doxybid-100"],
  },
  {
    name: "Gastroenterology & GERD",
    icon: "stomach",
    desc: "Sustained-release and combination therapies for acid reflux, dyspepsia and hyperacidity.",
    products: ["Rabelan-DSR"],
  },
  {
    name: "Respiratory & Anti-Allergic",
    icon: "lungs",
    desc: "Fast-acting formulations for seasonal allergic rhinitis, asthmatic allergies, and dry or allergic cough, with pediatric options.",
    products: ["Mair-LC (Tablets & Syrup)", "Ycof DM"],
  },
  {
    name: "Pain Management & Anti-Inflammatory",
    icon: "bolt",
    desc: "Rapid-relief analgesic and anti-inflammatory combinations for pain, inflammation and fever.",
    products: ["Panocin"],
  },
  {
    name: "Daily Support & Antioxidants",
    icon: "sun",
    desc: "Multivitamin, mineral and antioxidant formulations that support recovery from debility, degeneration and oxidative stress.",
    products: ["Vimilan-OD"],
  },
];

export const PRODUCTS = [
  {
    name: "Cefilan-OF / Cefilan-200",
    dosage: "200mg + 200mg",
    formulation: [["Cefixime", "200mg"], ["Ofloxacin", "200mg"]],
    indication: "Anti-Infective",
    benefit: "Dual-action broad-spectrum antibacterial coverage engineered for mixed bacterial infections.",
  },
  {
    name: "Rabelan-DSR",
    dosage: "20mg + 30mg SR",
    formulation: [["Rabeprazole", "20mg"], ["Domperidone SR", "30mg"]],
    indication: "Gastroenterology",
    benefit: "Complete relief in GERD, dyspepsia and hyperacidity with sustained-release comfort.",
  },
  {
    name: "Mair-LC",
    dosage: "Tablets & Syrup",
    formulation: [["Montelukast", "—"], ["Levocetirizine", "—"]],
    indication: "Respiratory & Anti-Allergic",
    benefit: "Fast relief for seasonal allergic rhinitis and asthmatic allergies; pediatric formula available.",
  },
  {
    name: "Vimilan-OD",
    dosage: "Once Daily",
    formulation: [["Multivitamins & Minerals", "—"], ["Omega-3 & Antioxidants", "—"]],
    indication: "Daily Support",
    benefit: "Essential support in debility, degeneration and oxidative stress.",
  },
  {
    name: "Doxybid-100",
    dosage: "100mg",
    formulation: [["Doxycycline", "100mg"], ["Lactic Acid Bacillus", "—"]],
    indication: "Anti-Infective",
    benefit: "Advanced antibiotic therapy paired with probiotic gut defense.",
  },
  {
    name: "Panocin",
    dosage: "100mg + 500mg",
    formulation: [["Nimesulide", "100mg"], ["Paracetamol", "500mg"]],
    indication: "Pain Management",
    benefit: "Rapid relief for pain, inflammation and fever.",
  },
  {
    name: "Ycof DM",
    dosage: "Triple-Action",
    formulation: [["Dextromethorphan", "—"], ["Chlorpheniramine", "—"], ["Phenylephrine", "—"]],
    indication: "Respiratory",
    benefit: "Triple-action relief for dry and allergic cough.",
  },
];

export const QUALITY = [
  ["Raw Material Testing", "Every API is verified for purity and potency prior to production."],
  ["WHO-GMP Facilities", "Manufacturing under internationally benchmarked GMP protocols."],
  ["Batch-Wise Validation", "Each production batch is logged, tested and documented for traceability."],
  ["Stability & Packaging", "Formulations are stability-tested and sealed under controlled conditions."],
];

export const SLIDE_COUNT = 14;
export const SLIDES = Array.from({ length: SLIDE_COUNT }, (_, i) => `/assets/slides/slide${i + 1}.jpeg`);

export const ROLES = ["Doctor", "Pharmacist", "Distributor", "Other"];


export const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
export const therapySlug = (t) => slugify(t.name);

/* Main navigation (dropdown children = sub). Edit labels/paths here. */
export const NAV = [
  { label: "About Us", to: "/about", sub: [
    { label: "Company Overview", to: "/about" },
    { label: "Vision & Values", to: "/vision-values" },
  ] },
  { label: "Products", to: "/products" },
  { label: "Quality", to: "/quality" },
  { label: "Responsibility", to: "/responsibility" },
  { label: "Media", to: "/media" },
  { label: "Careers", to: "/careers" },
  { label: "Contact Us", to: "/contact" },
];

/* TODO: DRAFT COPY — review and replace with your real company text. */
export const VISION = "To be a trusted name in Indian healthcare by making quality medicines accessible to the doctors, pharmacists and patients who depend on them.";
export const MISSION = "To develop and manufacture dependable multi-therapeutic formulations under WHO-GMP compliant conditions, and to support our partners with responsive, transparent service.";
export const VALUES = [
  ["Quality First", "No batch leaves our hands without documented testing and validation."],
  ["Patient Focus", "Every formulation is chosen for a clear clinical need."],
  ["Integrity", "Honest communication with doctors, pharmacists and distribution partners."],
  ["Partnership", "We grow when our partners grow, and respond to every inquiry within one business day."],
];
export const RESPONSIBILITY = [
  ["Patient Safety", "Formulations are manufactured and documented to GMP standards so they can be traced from raw material to pack."],
  ["Ethical Practice", "We communicate product information accurately and responsibly to healthcare professionals."],
  ["Environment", "We aim to reduce waste and use resources carefully across our operations and packaging."],
  ["Community Health", "We support health awareness initiatives in the communities where we work."],
];
/* Add press items here: { date: "2026-01-15", title: "...", text: "..." } */
export const NEWS = [];
/* Add openings here: { title: "Medical Representative", location: "Thane", type: "Full-time" } */
export const OPENINGS = [];
