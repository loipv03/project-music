import { BsFillPlayCircleFill } from "react-icons/bs";
import classNames from "classnames/bind";
import { AppDispatch } from "../../redux/store";

import styles from "./NewReleaseChart.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { fetchNewReleaseChart } from "../../redux/slice/newReleaseChart";
import moment from "moment";
import { getDetailSong, setIsPlaying } from "../../redux/slice/playerControl";
import { setOpacity } from "../../redux/slice/notification";

const cx = classNames.bind(styles);

const NewReleaseChart = () => {
  const AppDispatch: AppDispatch = useDispatch();
  const dispatch = useDispatch();

  const state = useSelector(
    ({ newReleaseChart }: any) => newReleaseChart.newReleaseChart
  );

  useEffect(() => {
    AppDispatch(fetchNewReleaseChart());
  }, []);

  const handleClick = (item: any) => {
    if (item.allowAudioAds && item.isWorldWide) {
      AppDispatch(getDetailSong(item.encodeId));
    } else {
      dispatch(setOpacity("1"));
    }
  };

  return (
    <div className={cx("new_music_chart")}>
      <div className={cx("title")}>
        {state.title}
        <BsFillPlayCircleFill />
      </div>
      {state?.items?.map((item: any, index: number) => (
        <NavLink
          to={""}
          key={item.encodeId}
          className={(nav) => cx({ active: nav.isActive })}
          onClick={() => {
            handleClick(item);
            item?.allowAudioAds &&
              item?.isWorldWide &&
              dispatch(setIsPlaying(true));
          }}>
          <div className={cx("song_content")}>
            <div className={cx("song_item_left")}>
              <div className={cx("ratings")}>{index + 1}</div>
              <div className={cx("dash")}>-</div>
              <img src={item.thumbnail} alt="" />
              <div className={cx("desc")}>
                <div title={item?.title} className={cx("name_song")}>
                  {item?.title}
                </div>
                <div className={cx("artists")}>{item?.artistsNames}</div>
              </div>
            </div>
            <div className={cx("album")}>{item?.album?.title}</div>
            <div className={cx("time")}>
              {moment.utc(item?.duration * 1000).format("mm:ss")}
            </div>
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default NewReleaseChart;
