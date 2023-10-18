import "./App.css";
import Dashboard from "./components/Dashboard";
import Charts from "./components/Charts";
import Orders from "./components/Orders";
import { Route, Link, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/charts" element={<Charts />} />
        <Route exact path="/orders" element={<Orders />} />
        <Route exact path="/" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
