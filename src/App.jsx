import Sidebar from "./components/Sidebar/Sidebar";
import Projects from "./pages/MyProjects/MyProjects";
import "./App.css";

function App() {
  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <div className="flex">
          <Sidebar />
          <div className="flex-1 p-6">
            <Projects />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
