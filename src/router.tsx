import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout/RootLayout";
import Home from "./pages/Home/Home";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import PlayList from "./components/PlayList/PlayList";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "bai-hat/:title/:id", element: <Home /> },
      { path: ":type/:title/:id", element: <PlayList /> },
      { path: ":filter", element: <Home /> },
    ],
  },
  { path: "/*", element: <PageNotFound /> },
]);

export default router;
