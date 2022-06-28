import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./css/style.scss";

import "./charts/ChartjsConfig";

// Import pages
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Tasks from "./pages/Tasks";
import Login from "./pages/Login";
import Layout from "./partials/layout/Layout";
import ClientProfile from "./pages/client/[id]";
import Newclient from "./pages/client/newclient";
import OrderProfile from "./pages/order/[id]";
import Neworder from "./pages/order/neworder";
import ProductProfile from "./pages/product/[id]";
import NewProduct from "./pages/product/newproduct";
import { useTranslation } from "react-i18next";
import Conteneurs from "./pages/conteneurs";
import ConteneurProfile from "./pages/conteneur/[id]";
import Newconteneur from "./pages/conteneur/newconteneur";
import ChambreFroids from "./pages/chambre-froids";
import Newchambrefroid from "./pages/chambre/newchambre";
import ChambreProfile from "./pages/chambre/[id]";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "smooth";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  useEffect(() => {
    if (localStorage) {
      if (localStorage.getItem("session-type")) {
      }
    }
  }, []);

  return (
    <>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/login" element={<Login />} />
          {/* Clients */}
          <Route exact path="/clients" element={<Clients />} />
          <Route exact path="/client/:id" element={<ClientProfile />} />
          <Route exact path="/client/newclient" element={<Newclient />} />
          {/* orders */}
          <Route exact path="/orders" element={<Orders />} />
          <Route exact path="/order/:id" element={<OrderProfile />} />
          <Route exact path="/order/neworder" element={<Neworder />} />
          {/* Product */}
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/product/:id" element={<ProductProfile />} />
          <Route exact path="/product/newproduct" element={<NewProduct />} />

          <Route exact path="/tasks" element={<Tasks />} />

          <Route exact path="/conteneurs" element={<Conteneurs />} />
          <Route exact path="/conteneur/:id" element={<ConteneurProfile />} />
          <Route exact path="/conteneur/newconteneur" element={<Newconteneur />} />


          <Route exact path="/chambre-froids" element={<ChambreFroids />} />
          <Route exact path="/chambre/:id" element={<ChambreProfile />} />
          <Route exact path="/chambre/newchambrefroid" element={<Newchambrefroid />} />

        </Routes>
      </Layout>
    </>
  );
}

export default App;
