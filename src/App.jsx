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

export default function App() {
  const { path } = useLocation();
  let page;
  if (path.startsWith("/products/")) page = <ProductDetail slug={path.slice("/products/".length)} />;
  else {
    const Page = ROUTES[path] || NotFound;
    page = <Page />;
  }
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header path={path} />
      <main id="main">{page}</main>
      <Footer />
    </>
  );
}
