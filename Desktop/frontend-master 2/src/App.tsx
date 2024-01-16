import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "App.css";

const App = () => {
  useEffect(() => {
    AOS.init({
      once: true,
    });
  }, []);

  if (process.env.REACT_APP_STAGE === "Production") {
    console.log = function no_console() {};
  }

  return (
    <BrowserRouter>
      <ToastContainer />
      <Router />
    </BrowserRouter>
  );
};

export default App;
