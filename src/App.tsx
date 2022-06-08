import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/nav";
import List from "./pages/list";
import Modal from "./components/modal";
import Client from "./pages/client";
import Footer from "./components/footer";
import { options } from "toastr";

export default function App() {
  useEffect(() => {
    options.closeButton = true;
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/client/:id" element={<Client />} />
          <Route path="/" element={<List />} />
        </Routes>
        <Footer />
        <Modal />
      </div>
    </BrowserRouter>
  );
}
