import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
import Clientes from "./components/Clientes";
import Home from "./components/Home"

function Router() {
   return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/clientes" element={<Clientes />} />
    </Routes>
  </BrowserRouter>
   )
}

export default Router;