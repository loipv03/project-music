import { useDispatch } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { AppDispatch } from "./redux/store";
import { getAudioHome } from "./redux/slice/audio";
import router from "./router";
import { setIsPlaying } from "./redux/slice/playerControl";

function App() {
  const dispatch = useDispatch();

  window.addEventListener("beforeunload", () => {
    dispatch(setIsPlaying(false));
  });

  useEffect(() => {
    (dispatch as AppDispatch)(getAudioHome());
  }, []);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
