import { FaRandom } from "react-icons/fa";
import { BsRepeat } from "react-icons/bs";
import { BsPauseCircle } from "react-icons/bs";
import { BiSkipPrevious } from "react-icons/bi";
import { BiSkipNext } from "react-icons/bi";
import { BsPlayCircle } from "react-icons/bs";
import { setAudio, setIsPlaying } from "../../redux/slice/playerControl";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames/bind";

import styles from "./player.module.scss";
import { useEffect, useRef, useState } from "react";
import { getSong } from "../../api/music";
import moment from "moment";
import { setOpacity } from "../../redux/slice/notification";

const cx = classNames.bind(styles);

const PlayerControl = () => {
  const dispatch = useDispatch();
  const state = useSelector(({ control }: any) => control);
  const [srcAudio, setSrcAudio] = useState<string>("");
  const timeSlider = useRef<HTMLInputElement>(null);
  const [curSeconds, setCurSeconds] = useState<any>(0);

  const audio: React.MutableRefObject<HTMLAudioElement> = useRef(new Audio());

  useEffect(() => {
    const playMusic = async () => {
      const {
        data: { data },
      } = await getSong(state.infoSong.encodeId);
      if (data) {
        dispatch(setAudio(data?.["128"]));
        setSrcAudio(data?.["128"]);
      } else {
        dispatch(setOpacity("1"));
      }
    };
    playMusic();
  }, [state.infoSong]);

  useEffect(() => {
    audio.current.src = srcAudio;
  }, [srcAudio]);

  useEffect(() => {
    timeSlider.current?.addEventListener("input", () => {
      audio.current.currentTime = Number(timeSlider.current?.value);
    });

    audio.current.addEventListener("timeupdate", () => {
      if (timeSlider) {
        timeSlider.current!.value = String(audio.current.currentTime);
        setCurSeconds(audio.current.currentTime);
      }
    });

    audio.current.addEventListener("ended", function () {
      setCurSeconds(0);
      dispatch(setIsPlaying(false));
    });
  }, [timeSlider]);

  const handleClickIsplaying = (pre: boolean) => {
    dispatch(setIsPlaying(!pre));
  };

  useEffect(() => {
    let timeoutPlay: number;
    if (state.isPlaying) {
      timeoutPlay = setTimeout(() => audio.current.play(), 300);
    } else {
      audio.current.pause();
    }

    return () => {
      audio.current.pause();
      clearTimeout(timeoutPlay);
    };
  }, [state.isPlaying, srcAudio]);

  const handleNext = () => {};

  return (
    <div className={cx("control")}>
      <div className={cx("control_left")}>
        <img src={state?.infoSong?.thumbnail} />
        <div className={cx("info_song")}>
          <div title={state?.infoSong?.title} className={cx("name_song")}>
            {state?.infoSong?.title}
          </div>
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
          <BiSkipNext
            className={cx("next_song")}
            onClick={() => handleNext()}
          />
          <BsRepeat className={cx("repeat_song")} />
        </div>
        <div className={cx("range")}>
          <span className={cx("seconds_start")}>
            {moment.utc(curSeconds * 1000).format("mm:ss")}
          </span>
          <input
            type="range"
            id={cx("timeSlider")}
            min="0"
            max={state?.infoSong?.duration}
            step="1"
            value={curSeconds}
            readOnly
            ref={timeSlider}
          />
          <span className={cx("seconds_end")}>
            {moment.utc(state?.infoSong?.duration * 1000).format("mm:ss")}
          </span>
        </div>
      </div>
      <div className={cx("control_right")}></div>
    </div>
  );
};

export default PlayerControl;
