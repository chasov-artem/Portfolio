import Sidebar from "./components/Sidebar/Sidebar";
import About from "./components/About/About";
import Projects from "./components/MyProjects/MyProjects";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import "./App.css";
import Footer from "./components/Footer/Footer";
import ProjectsNavigator from "./components/ProjectsNavigator/ProjectsNavigator";
import { ScrollProvider } from "./context/ScrollContext";

function App() {
  return (
    <ScrollProvider>
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <ScrollToTop />
        <div className="flex">
          <Sidebar />
          <About />
          <ProjectsNavigator />
          <Projects />
          <Footer />
          <div className="flex-1 p-6"></div>
        </div>
      </div>
    </div>
    </ScrollProvider>
  );
}

export default App;
