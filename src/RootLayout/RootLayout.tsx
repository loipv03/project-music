import { Outlet, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import PlayerControl from "../components/PlayerControl/PlayerControl";
import "./global.scss";

const RootLayout = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  if (type === ("playlist" || "album")) {
  }
  return (
    <div className="container">
      <Sidebar />
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <PlayerControl />
    </div>
  );
};

export default RootLayout;
