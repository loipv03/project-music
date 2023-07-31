import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout/RootLayout";
import Home from "./pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: ":type/:title/:id", element: <Home /> },
      { path: "vietnam", element: <Home /> },
      { path: "quocte", element: <Home /> },
    ],
  },
]);

export default router;
