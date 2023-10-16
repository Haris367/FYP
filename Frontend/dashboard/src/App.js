import "./App.css";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Sidebar/>
      <Routes>
        <Route exact path="/dashboard" element={<Dashboard/>}/>
      </Routes>
      <footer>hello</footer>
    </Router>
  );
}

export default App;
