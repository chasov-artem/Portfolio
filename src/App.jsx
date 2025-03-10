import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import About from "./components/About/About";
import Projects from "./pages/MyProjects/MyProjects";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import "./App.css";

function App() {
  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        {/* Компонент ScrollToTop */}
        <ScrollToTop />
        <div className="flex">
          <Sidebar />
          <About />
          <div className="flex-1 p-6">
            <Routes>
              <Route path="/" element={<Projects />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
