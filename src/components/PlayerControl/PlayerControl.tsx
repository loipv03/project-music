import { FaRandom } from "react-icons/fa";
import { BsRepeat } from "react-icons/bs";
import { BsPauseCircle } from "react-icons/bs";
import { BiSkipPrevious } from "react-icons/bi";
import { BiSkipNext } from "react-icons/bi";
import { BsPlayCircle } from "react-icons/bs";
import {
  getDetailSong,
  setAudio,
  setIsPlaying,
} from "../../redux/slice/playerControl";
import { AppDispatch } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames/bind";

import styles from "./player.module.scss";
import { useEffect, useRef, useState } from "react";
import { getSong } from "../../api/music";

const cx = classNames.bind(styles);

const PlayerControl = () => {
  const dispatch = useDispatch();
  const AppDispatch = useDispatch() as AppDispatch;
  const state = useSelector(({ control }: any) => control);
  const [srcAudio, setSrcAudio] = useState<string>("");
  const timeSlider = useRef<HTMLInputElement>(null);

  const audio: React.MutableRefObject<HTMLAudioElement> = useRef(new Audio());

  useEffect(() => {
    const playMusic = async () => {
      const {
        data: { data },
      } = await getSong(state.curSongId);
      dispatch(setAudio(data["128"]));
      setSrcAudio(data["128"]);
      AppDispatch(getDetailSong(state.curSongId));
    };
    playMusic();
  }, [state.curSongId]);

  useEffect(() => {
    audio.current.src = srcAudio;
  }, [srcAudio]);

  useEffect(() => {
    timeSlider.current?.addEventListener("input", function () {
      audio.current.currentTime = Number(this.value);
    });

    audio.current.addEventListener("timeupdate", function () {
      if (timeSlider) {
        timeSlider.current!.value = String(audio.current.currentTime);
      }
    });

    audio.current.addEventListener("ended", function () {
      timeSlider.current!.value = "0";
      dispatch(setIsPlaying(false));
    });
  }, [timeSlider]);

  const handleClickIsplaying = (pre: boolean) => {
    dispatch(setIsPlaying(!pre));
  };

  useEffect(() => {
    if (state.isPlaying) {
      audio.current.play();
    } else {
      audio.current.pause();
    }

    return () => audio.current.pause();
  }, [state.isPlaying, srcAudio]);

  return (
    <div className={cx("control")}>
      <div className={cx("control_left")}>
        <img src={state?.infoSong?.thumbnail} />
        <div className={cx("info_song")}>
          <div className={cx("name_song")}>{state?.infoSong?.title}</div>
          <div className={cx("alias")}>{state?.infoSong?.artistsNames}</div>
        </div>
      </div>
      <div className={cx("control_center")}>
        <div className={cx("action")}>
          <FaRandom className={cx("random_song")} />
          <BiSkipPrevious className={cx("skip_song")} />
          <div
            className={cx("isPlaying")}
            onClick={() => handleClickIsplaying(state.isPlaying)}>
            {state.isPlaying ? <BsPauseCircle /> : <BsPlayCircle />}
          </div>
          <BiSkipNext className={cx("next_song")} />
          <BsRepeat className={cx("repeat_song")} />
        </div>
        <div className={cx("range")}>
          <span></span>
          <input
            type="range"
            id={cx("timeSlider")}
            min="0"
            max={state?.infoSong?.duration}
            step="1"
            value="0"
            readOnly
            ref={timeSlider}
          />
        </div>
      </div>
      <div className={cx("control_right")}></div>
    </div>
  );
};

export default PlayerControl;
