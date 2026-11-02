import { Link, useLocation, usePage } from "./router.jsx";
import { Icon, HeroArt, GlassArt, PageHero, ContactForm, MapEmbed, VisualAids } from "./components.jsx";
import {
  COMPANY, LEGAL_NAME, ADDRESS, EMAIL, PHONE, PHONE_HREF, PILLS, THERAPIES, PRODUCTS, QUALITY,
  VISION, MISSION, VALUES, RESPONSIBILITY, NEWS, OPENINGS, slugify, therapySlug,
} from "./data.js";

const productTherapy = (p) => THERAPIES.find((t) => t.products.some((n) => n.startsWith(p.name.split(" ")[0])));
const productPath = (p) => `/products/${slugify(p.name)}`;

function ProductCard({ p }) {
  return (
    <article className="prod-card">
      <div className="prod-head"><h3>{p.name}</h3><span className="tag">{p.dosage}</span></div>
      <p className="label">Active formulation</p>
      <ul className="formula">
        {p.formulation.map(([mol, dose]) => <li key={mol}><span>{mol}</span><b>{dose}</b></li>)}
      </ul>
      <p className="indic">{p.indication}</p>
      <p className="benefit">{p.benefit}</p>
      <Link className="btn sm" to={productPath(p)}>View Details</Link>
    </article>
  );
}

/* ---------------- Home ---------------- */
export function Home() {
  usePage("");
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <h1>ADVANCING HEALTH,<br />EXPANDING HOPE.</h1>
            <p className="orange">QUALITY CARE,<br />ALWAYS THERE.</p>
          </div>
          <HeroArt />
        </div>
        <div className="pill-strip">
          <div className="wrap pills">
            {PILLS.map(([big, small]) => <div className="pill" key={small}><b>{big}</b><span>{small}</span></div>)}
          </div>
        </div>
      </section>

      <section className="intro">
        <div className="wrap">
          <p>
            {LEGAL_NAME} develops and manufactures multi-therapeutic formulations for hospitals,
            pharmacies and distribution networks, engineered under WHO-GMP compliant conditions
            and validated at every stage of production. We are based in Thane, Maharashtra.
          </p>
          <Link className="btn" to="/about">Know More</Link>
        </div>
      </section>

      <section className="feature">
        <div className="wrap feature-grid">
          <div className="feature-img"><GlassArt /></div>
          <div>
            <h2 className="orange-h">Partner with {COMPANY}</h2>
            <p>Whether you are a doctor, pharmacist or distributor, our team responds to every inquiry within one business day.</p>
            <p className="muted">We work directly with doctors, pharmacists and distributors so every formulation reaches the patients who need it.</p>
            <Link className="btn" to="/contact">Get In Touch</Link>
          </div>
        </div>
      </section>

      <VisualAids />

      <section className="touch">
        <div className="wrap">
          <h2 className="orange-h">Quality Care, Always There</h2>
          <p>
            From dual-action antibacterials to daily antioxidant support, our portfolio is built
            around one principle: quality care, always there. Every formulation is backed by
            rigorous safety and efficacy standards.
          </p>
        </div>
      </section>

      <section className="therapies">
        <div className="wrap">
          <h2 className="orange-h center">Coverage Across Five Core Specialties</h2>
          <div className="th-card">
            {THERAPIES.map((t) => (
              <Link to={`/products#${therapySlug(t)}`} className="th" key={t.name}>
                <span className="glow"><Icon name={t.icon} /></span>
                <span className="th-name">{t.name}</span>
                <span className="th-desc">{t.desc}</span>
                <span className="th-prods">{t.products.join(" · ")}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section products">
        <div className="wrap">
          <h2 className="orange-h">Featured Formulations</h2>
          <p className="muted">Active ingredients, indications and clinical benefits for each formulation.</p>
          <div className="prod-grid">{PRODUCTS.slice(0, 3).map((p) => <ProductCard key={p.name} p={p} />)}</div>
          <p className="center" style={{ marginTop: 30 }}><Link className="btn" to="/products">View All Products</Link></p>
        </div>
      </section>

      <section className="findmore">
        <div className="wrap">
          <h2 className="orange-h">Find more about {COMPANY}</h2>
          <div className="fm-grid">
            {[
              ["About Us", "Who we are, what we stand for and where we are headed.", "/about"],
              ["Our Products", "Seven formulations across five therapeutic areas.", "/products"],
              ["Quality Standards", "Validated checkpoints from raw material to finished pack.", "/quality"],
              ["Careers", "Build a career in healthcare with our Thane-based team.", "/careers"],
            ].map(([t, d, to]) => (
              <article className="fm-card" key={t}>
                <h3>{t}</h3><p>{d}</p>
                <Link className="btn ghost" to={to}>Know More</Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------------- About ---------------- */
export function About() {
  usePage("About Us", `${LEGAL_NAME} is a WHO-GMP compliant pharmaceutical manufacturer based in Thane, Maharashtra.`);
  return (
    <>
      <PageHero title="About Us">
        <p>{LEGAL_NAME} develops and manufactures multi-therapeutic formulations for doctors, pharmacists and distribution partners across India, from our base in Thane, Maharashtra.</p>
      </PageHero>
      <section className="alt">
        <div className="wrap alt-grid">
          <div className="alt-art"><GlassArt /></div>
          <div>
            <h2 className="blue-h">Who we are</h2>
            <p>We are a WHO-GMP compliant pharmaceutical manufacturer. Our range covers anti-infective, gastroenterology, respiratory, pain management and daily-support categories, engineered and validated at every stage of production.</p>
            <p>We work directly with doctors, pharmacists and distributors so every formulation reaches the patients who need it.</p>
            <Link className="btn" to="/vision-values">Vision &amp; Values</Link>
          </div>
        </div>
      </section>
      <section className="therapies">
        <div className="wrap">
          <h2 className="orange-h center">What we do</h2>
          <div className="fm-grid">
            {[["5", "therapeutic areas"], ["7", "formulations in our range"], ["WHO-GMP", "compliant manufacturing"], ["Thane", "Maharashtra, India"]].map(([b, s]) => (
              <article className="fm-card stat" key={s}><h3>{b}</h3><p>{s}</p></article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function VisionValues() {
  usePage("Vision & Values");
  return (
    <>
      <PageHero title="Vision & Values"><p>{TAGLINE_TEXT}</p></PageHero>
      <section className="alt">
        <div className="wrap two">
          <div><h2 className="blue-h">Our Vision</h2><p>{VISION}</p></div>
          <div><h2 className="blue-h">Our Mission</h2><p>{MISSION}</p></div>
        </div>
      </section>
      <section className="findmore">
        <div className="wrap">
          <h2 className="orange-h">Our Values</h2>
          <div className="fm-grid">
            {VALUES.map(([t, d]) => <article className="fm-card" key={t}><h3>{t}</h3><p>{d}</p></article>)}
          </div>
        </div>
      </section>
    </>
  );
}
const TAGLINE_TEXT = "Advancing Health, Expanding Hope — the principles that guide every formulation we make.";

/* ---------------- Products ---------------- */
export function Products() {
  usePage("Products", "Aexa Pharma formulations across anti-infective, gastroenterology, respiratory, pain management and daily-support categories.");
  return (
    <>
      <PageHero title="Products">
        <p>We produce a focused portfolio of multi-therapeutic formulations targeting a range of acute and chronic conditions. Our range spans five therapeutic areas, each manufactured under WHO-GMP compliant conditions.</p>
      </PageHero>
      {THERAPIES.map((t, i) => (
        <section id={therapySlug(t)} key={t.name} className={`alt ${i % 2 ? "" : "tint"}`}>
          <div className={`wrap alt-grid ${i % 2 ? "rev" : ""}`}>
            <div className="alt-art icon-art"><Icon name={t.icon} /></div>
            <div>
              <h2 className="blue-h">{t.name}</h2>
              <p>{t.desc}</p>
              <div className="chips">
                {t.products.map((n) => {
                  const p = PRODUCTS.find((x) => n.startsWith(x.name.split(" ")[0]));
                  return p ? <Link key={n} className="chip" to={productPath(p)}>{n}</Link> : <span key={n} className="chip">{n}</span>;
                })}
              </div>
            </div>
          </div>
        </section>
      ))}
      <section className="section products">
        <div className="wrap">
          <h2 className="orange-h">All Formulations</h2>
          <div className="prod-grid">{PRODUCTS.map((p) => <ProductCard key={p.name} p={p} />)}</div>
        </div>
      </section>
      <VisualAids />
    </>
  );
}

export function ProductDetail({ slug }) {
  const p = PRODUCTS.find((x) => slugify(x.name) === slug);
  usePage(p ? p.name : "Product not found", p && p.benefit);
  if (!p) return <NotFound />;
  const t = productTherapy(p);
  const related = PRODUCTS.filter((x) => x !== p && productTherapy(x) === t).slice(0, 3);
  return (
    <>
      <PageHero title={p.name}>
        <p>{p.benefit}</p>
        <p className="crumb"><Link to="/products">Products</Link> / {t ? t.name : p.indication}</p>
      </PageHero>
      <section className="alt">
        <div className="wrap two">
          <div>
            <h2 className="blue-h">Active formulation</h2>
            <ul className="formula">{p.formulation.map(([m, d]) => <li key={m}><span>{m}</span><b>{d}</b></li>)}</ul>
            <p className="label">Dosage / presentation</p><p>{p.dosage}</p>
            <p className="label">Indication</p><p>{p.indication}</p>
          </div>
          <div>
            <h2 className="blue-h">Clinical benefit</h2>
            <p>{p.benefit}</p>
            <Link className="btn" to={`/contact?product=${encodeURIComponent(p.name)}`}>Inquire Now</Link>
          </div>
        </div>
      </section>
      {related.length > 0 && (
        <section className="section products">
          <div className="wrap">
            <h2 className="orange-h">More in {t.name}</h2>
            <div className="prod-grid">{related.map((r) => <ProductCard key={r.name} p={r} />)}</div>
          </div>
        </section>
      )}
    </>
  );
}

/* ---------------- Quality / Responsibility ---------------- */
export function Quality() {
  usePage("Quality Standards");
  return (
    <>
      <PageHero title="Quality Standards">
        <p>Every batch passes through validated checkpoints before it reaches a pharmacy shelf.</p>
      </PageHero>
      <section className="findmore">
        <div className="wrap">
          <h2 className="orange-h">Precision at Every Stage of Production</h2>
          <div className="fm-grid">
            {QUALITY.map(([t, d]) => <article className="fm-card" key={t}><h3>{t}</h3><p>{d}</p></article>)}
          </div>
        </div>
      </section>
    </>
  );
}

export function Responsibility() {
  usePage("Responsibility");
  return (
    <>
      <PageHero title="Responsibility"><p>Caring for patients, partners and the environment is part of how we make medicines.</p></PageHero>
      <section className="findmore">
        <div className="wrap">
          <div className="fm-grid">
            {RESPONSIBILITY.map(([t, d]) => <article className="fm-card" key={t}><h3>{t}</h3><p>{d}</p></article>)}
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------------- Media / Careers ---------------- */
export function Media() {
  usePage("Media");
  return (
    <>
      <PageHero title="Media"><p>News, announcements and updates from {COMPANY}.</p></PageHero>
      <section className="alt">
        <div className="wrap">
          {NEWS.length === 0 ? (
            <p>No press releases have been published yet. For media enquiries, write to <a className="lnk" href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>
          ) : (
            <div className="news">
              {NEWS.map((n) => (
                <article key={n.title}><time>{n.date}</time><h3>{n.title}</h3><p>{n.text}</p></article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export function Careers() {
  usePage("Careers");
  return (
    <>
      <PageHero title="Careers"><p>Join a team that is advancing health and expanding hope.</p></PageHero>
      <section className="alt">
        <div className="wrap">
          <h2 className="blue-h">Current Openings</h2>
          {OPENINGS.length === 0 ? (
            <p>There are no open positions listed right now. You are welcome to send your resume to <a className="lnk" href={`mailto:${EMAIL}?subject=Career%20enquiry`}>{EMAIL}</a> and we will contact you when a suitable role opens.</p>
          ) : (
            <ul className="jobs">
              {OPENINGS.map((o) => (
                <li key={o.title}><b>{o.title}</b><span>{o.location} · {o.type}</span>
                  <a className="btn sm" href={`mailto:${EMAIL}?subject=${encodeURIComponent("Application: " + o.title)}`}>Apply</a></li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}

/* ---------------- Contact / legal / 404 ---------------- */
export function Contact() {
  usePage("Contact Us");
  const { params } = useLocation();
  const product = params.get("product");
  return (
    <>
      <PageHero title="Contact Us"><p>Our team responds to every inquiry within one business day.</p></PageHero>
      <section className="section contact">
        <div className="wrap contact-grid">
          <div>
            <h2 className="orange-h">Get in touch</h2>
            <p><b>{LEGAL_NAME}</b></p>
            <p>{ADDRESS}</p>
            <p>Phone: <a className="lnk" href={PHONE_HREF}>{PHONE}</a><br />Email: <a className="lnk" href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
          </div>
          <ContactForm defaultMessage={product ? `I would like to inquire about ${product}.` : ""} />
        </div>
        <div className="wrap"><MapEmbed /></div>
      </section>
    </>
  );
}

export function Privacy() {
  usePage("Privacy Policy");
  return (
    <section className="alt"><div className="wrap legal">
      <h1 className="orange-h">Privacy Policy</h1>
      {/* TODO: DRAFT — have this reviewed/replaced by your legal advisor. */}
      <p>{LEGAL_NAME} collects only the information you submit through our contact form (name, role, email, phone number and message) in order to respond to your inquiry.</p>
      <p>We do not sell your personal information. We may share it only with service providers who help us respond to you, or where required by law.</p>
      <p>To request access to, or deletion of, your information, write to <a className="lnk" href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>
    </div></section>
  );
}

export function Disclaimer() {
  usePage("Disclaimer");
  return (
    <section className="alt"><div className="wrap legal">
      <h1 className="orange-h">Disclaimer</h1>
      {/* TODO: DRAFT — have this reviewed/replaced by your legal advisor. */}
      <p>The information on this website is intended for healthcare professionals and trade partners and is provided for general information only. It is not medical advice and does not replace the advice of a registered medical practitioner.</p>
      <p>Prescription medicines should be used only under the supervision of a doctor. Product details may change without notice; please refer to the approved product label and pack insert.</p>
    </div></section>
  );
}

export function NotFound() {
  usePage("Page not found");
  return (
    <section className="alt"><div className="wrap legal center">
      <h1 className="orange-h">Page not found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link className="btn" to="/">Back to Home</Link>
    </div></section>
  );
}
