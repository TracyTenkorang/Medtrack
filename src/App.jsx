// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import "./assets/css/App.css";

import Routes from "./Router/routes";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes />
      <Outlet />
    </>
  );
};

export default App;
