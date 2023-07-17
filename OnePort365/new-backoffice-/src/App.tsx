import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "routes";
import IdleTimerContainer from "components/IdleTimerContainer/idleTimerContainer";

import "App.css";

const App = () => {
  if (process.env.REACT_APP_STAGE === "Production") {
    console.log = function no_console() {};
  }
  return (
    <BrowserRouter>
      <IdleTimerContainer />
      <Router />
    </BrowserRouter>
  );
};

export default App;
