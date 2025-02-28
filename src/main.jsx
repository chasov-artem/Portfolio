import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import BackgroundWrapper from "./components/BackgroundWrapper/BackgroundWrapper";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <BackgroundWrapper>
      <App />
    </BackgroundWrapper>
  </BrowserRouter>
);
