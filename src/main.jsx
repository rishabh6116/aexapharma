import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/* Hide the loading screen once the page and fonts are ready (min 600ms so it never flashes). */
const start = performance.now();
const loaded = new Promise((r) => (document.readyState === "complete" ? r() : window.addEventListener("load", r, { once: true })));
const fonts = document.fonts ? document.fonts.ready : Promise.resolve();
const timeout = new Promise((r) => setTimeout(r, 4000));
Promise.race([Promise.all([loaded, fonts]), timeout]).then(() => {
  const wait = Math.max(0, 600 - (performance.now() - start));
  setTimeout(() => {
    const el = document.getElementById("preloader");
    if (!el) return;
    el.classList.add("hide");
    setTimeout(() => el.remove(), 600);
  }, wait);
});
