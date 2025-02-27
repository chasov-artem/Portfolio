import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Projects from "./pages/MyProjects/MyProjects";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Projects />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
