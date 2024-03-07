import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Pharm from "../Pages/Pharm";
import Lab from "../Pages/Lab";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/pharmacy",
      element: <Pharm />,
    },
    {
      path: "/laboratory",
      element: <Lab />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
