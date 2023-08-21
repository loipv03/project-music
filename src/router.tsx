import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout/RootLayout";
import Home from "./pages/Home/Home";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import PlayList from "./components/PlayList/PlayList";
import Top100 from "./components/Top100/Top100";
import NewReleaseChart from "./components/NewReleaseChart/NewReleaseChart";
import Search from "./components/Search/Search";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "bai-hat/:title/:id", element: <Home /> },
      { path: ":type/:title/:id", element: <PlayList /> },
      { path: ":filter", element: <Home /> },
      { path: "top100", element: <Top100 /> },
      { path: "newreleasechart", element: <NewReleaseChart /> },
      { path: "search/:filter/:params", element: <Search /> },
    ],
  },
  { path: "/*", element: <PageNotFound /> },
]);

export default router;
