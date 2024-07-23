import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage/HomePage";
import CartEcom from "../components/CartEcom/Cart";
import Head from "../components/Navbar/Head";
import Footer from "../components/Footer/Footer";
import Product from "../components/Product/Product";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import PaymentSuccess from "../components/Payment/PaymentSuccess";
import Checkout from "../components/Checkout/Checkout";
import CompanyPage from "./../pages/HomePage/CompanyPage";
import RefundPage from "./../pages/RefundPage";
import PrivacyPage from "../pages/PrivacyPage";
import TermPage from "../pages/TermPage";
import ContactUsPage from "../pages/ContactUsPage";
import Order from "../components/Order/Order";
import Reset from "../Auth/Reset";
import JournalList from "../components/Journal/JournalList";
import JournalDetail from "../components/Journal/JournalDetails";
import WomenWarriors from "../pages/WomenWarriors";

const CustomerRouters = () => {
  const [search, setSearch] = useState("");

  return (
    <div>
      <div>
        <Head search={search} setSearch={setSearch} />
      </div>
      
      <Routes>
        <Route path="/forgot-password" element={<HomePage />} />
        <Route path="/reset-password" element={<Reset />} />
        <Route path="/login" element={<HomePage />} />
        <Route path="/register" element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartEcom />} />
        <Route path="/products" element={<Product search={search} />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product-detail/:productId" element={<ProductDetails />} />
        <Route path="/about" element={<CompanyPage />} />
        <Route path="/refund" element={<RefundPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/term" element={<TermPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/order" element={<Order />} />
        <Route path="/payment/:orderId" element={<PaymentSuccess />} />
        <Route path="/journals" element={<JournalList />} />
        <Route path="/journals/:id" element={<JournalDetail />} />
        <Route path="/women-warriors" element={<WomenWarriors />} />
      </Routes>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default CustomerRouters;
