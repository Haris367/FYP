import React from 'react'
import Dashboard from "../dashboard/Dashboard";
import Charts from "../dashboard/chart/Charts";
import Inspection from "../../pages/Inspection";
import SellRequests from "../../pages/SellRequests";
// import Navbar from "./components/Navbar";
import Login from "../login/Login";
import Layout from "../layout/Layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function Routing() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route exact path="/charts" element={<Charts />} />
          <Route exact path="/inspection" element={<Inspection />} />
          <Route exact path="/requests" element={<SellRequests/>} />
          {/* <Route exact path="/nav" element={<Navbar />} /> */}
        </Routes>
      </Layout>
    </Router>
  )
}
