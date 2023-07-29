import { FaRandom } from "react-icons/fa";
import { BsRepeat } from "react-icons/bs";
import { BsPauseCircle } from "react-icons/bs";
import { BiSkipPrevious } from "react-icons/bi";
import { BiSkipNext } from "react-icons/bi";
import { BsPlayCircle } from "react-icons/bs";
import { getDetailSong } from "../../redux/slice/playerControl";
import { AppDispatch } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames/bind";

import styles from "./player.module.scss";

const cx = classNames.bind(styles);

const PlayerControl = () => {
  const dispatch = useDispatch();
  const state = useSelector(({ control }: any) => control);

  let myAudio = document.getElementById(cx("myAudio")) as HTMLAudioElement;
  let timeSlider = document.getElementById(
    cx("timeSlider")
  ) as HTMLInputElement;
  let playSong = document.getElementById(cx("play_song")) as HTMLElement;
  let pauseSong = document.getElementById(cx("pause_song")) as HTMLElement;

  if (!state.curSongId) {
    (dispatch as AppDispatch)(getDetailSong("Z6CBI0BW"));
  }

  const detailSong = state.detailSong.data;
  const audio = state.audio.data?.[128];

  timeSlider?.addEventListener("input", function () {
    myAudio.currentTime = Number(this.value);
  });

  myAudio?.addEventListener("timeupdate", function () {
    timeSlider.value = String(myAudio.currentTime);
  });

  const handleClickPlay = () => {
    myAudio?.play();
    playSong.style.display = "none";
    pauseSong.style.display = "block";
  };

  const handleClickPause = () => {
    myAudio?.pause();
    playSong.style.display = "block";
    pauseSong.style.display = "none";
  };

  return (
    <div className={cx("control")}>
      <div className={cx("control_left")}>
        <img src={detailSong?.thumbnail} />
        <div className={cx("info_song")}>
          <div className={cx("name_song")}>{detailSong?.title}</div>
          <div className={cx("alias")}>{detailSong?.artistsNames}</div>
        </div>
      </div>
      <div className={cx("control_center")}>
        <div className={cx("action")}>
          <FaRandom className={cx("random_song")} />
          <BiSkipPrevious className={cx("skip_song")} />
          <BsPlayCircle id={cx("play_song")} onClick={handleClickPlay} />
          <BsPauseCircle id={cx("pause_song")} onClick={handleClickPause} />
          <BiSkipNext className={cx("next_song")} />
          <BsRepeat className={cx("repeat_song")} />
        </div>
        <div className={cx("range")}>
          <audio id={cx("myAudio")} autoPlay src={audio} />
          <input
            type="range"
            id={cx("timeSlider")}
            min="0"
            max={detailSong?.duration}
            step="1"
            value="0"
            readOnly
          />
        </div>
      </div>
      <div className={cx("control_right")}></div>
    </div>
  );
};

export default PlayerControl;
