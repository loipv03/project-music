import classNames from "classnames/bind";
import { AppDispatch } from "../../../redux/store";

import styles from "./Songs.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";
import { setOpacity } from "../../../redux/slice/notification";
import {
  getDetailSong,
  setIsPlaying,
} from "../../../redux/slice/playerControl";

const cx = classNames.bind(styles);

const Songs = () => {
  const AppDispatch: AppDispatch = useDispatch();
  const dispatch = useDispatch();

  const state = useSelector(({ search }: any) => search.search_data);

  useEffect(() => {}, []);

  const handleClick = (item: any) => {
    if (item.allowAudioAds && item.isWorldWide) {
      AppDispatch(getDetailSong(item.encodeId));
      dispatch(setIsPlaying(true));
    } else {
      dispatch(setOpacity("1"));
    }
  };

  return (
    <div className={cx("search_song")}>
      <div className={cx("title")}>Bài hát</div>
      {state?.songs?.map((item: any) => (
        <NavLink
          to={""}
          key={item.encodeId}
          className={(nav) => cx({ active: nav.isActive })}
          onClick={() => {
            handleClick(item);
          }}>
          <div className={cx("song_content")}>
            <div className={cx("song_item_left")}>
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

export default Songs;
