import { useDispatch } from "react-redux";
import { Route, Routes, Outlet } from "react-router-dom";
import "./app.scss";
import { useEffect } from "react";
import { AppDispatch } from "./redux/store";
import { getAudioHome } from "./redux/slice/audio";
import BannerSlide from "./components/BannerSlide/BannerSlide";
import PlayerControl from "./components/PlayerControl/PlayerControl";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import NewRelease from "./components/NewRelease/NewRelease";
import PlayList from "./components/PlayList/PlayList";

function App() {
  const dispatch = useDispatch();

  // window.addEventListener("beforeunload", (event) => {
  //   event.preventDefault();
  //   event.returnValue = "";
  // });

  useEffect(() => {
    (dispatch as AppDispatch)(getAudioHome());
  }, []);
  return (
    <>
      <div className="container">
        <Sidebar />
        <main className="main">
          <Header />
          <BannerSlide />
          <div className="content">
            <NewRelease />
          </div>
        </main>
        <div className="player_control">
          <PlayerControl />
        </div>
      </div>
      <Routes>
        <Route path="playlist" element={<PlayList />} />
      </Routes>
    </>
  );
}

export default App;
