import React from "react";
import Footer from "./components/Footer";
import PaigeHeader, { NavLinkInfo } from "./components/PaigeHeader";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import About from "./pages/About";
import Testimonials from "./pages/Testimonials";
import Resources from "./pages/Resources";
import Products from "./pages/Products";
import Home from "./pages/Home";

const WEB_LINKS: NavLinkInfo[] = [
  {
    name: "About",
    location: "about",
  },
  {
    name: "Testimonials",
    location: "testimonials",
  },
  {
    name: "Resources",
    location: "resources",
  },
  {
    name: "Translate",
    location: "https://paigetranslate.netlify.app/",
    isExternal: true
  },
  {
    name: "Products",
    location: "products",
  },
];

export function App() {
  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        minHeight: "100vh",
      }}
    >
      <BrowserRouter>
        <PaigeHeader links={WEB_LINKS} />
        <Routes>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="resources" element={<Resources />} />
          <Route path="products" element={<Products />} />
        </Routes>
        <Footer links={WEB_LINKS} />
      </BrowserRouter>
    </div>
  );
}
