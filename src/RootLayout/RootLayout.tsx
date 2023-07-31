import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import PlayerControl from "../components/PlayerControl/PlayerControl";
import "./global.scss";

const RootLayout = () => {
  return (
    <div className="container">
      <Sidebar />
      <Header />
      <Outlet />
      <PlayerControl />
    </div>
  );
};

export default RootLayout;
