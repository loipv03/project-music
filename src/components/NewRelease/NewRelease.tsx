import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from "./newRelease.module.scss";
import { AppDispatch } from "../../redux/store";
import { getDetailSong, setIsPlaying } from "../../redux/slice/playerControl";
import moment from "moment";
import Notification from "../Notification/Notification";
import { setOpacity } from "../../redux/slice/notification";

const cx = classNames.bind(styles);

const NewRelease = () => {
  const [filterSong, setFilterSong] = useState<any>();
  const stateAudio = useSelector(({ audio }: any) => audio.audio.data?.items);
  const AppDispatch: AppDispatch = useDispatch();
  const dispatch = useDispatch();
  const stateNotification = useSelector(
    ({ notification }) => notification.opacity
  );

  const newRelease = stateAudio?.find(
    (item: any) => item.sectionType === "new-release"
  );

  const allSong = newRelease?.items?.all;
  const vietNamSong = newRelease?.items?.vPop;
  const QuocTeSong = newRelease?.items?.others;

  const handleClick = (item: any) => {
    if (item.allowAudioAds && item.isWorldWide) {
      AppDispatch(getDetailSong(item.encodeId));
    } else {
      dispatch(setOpacity("1"));
    }
  };

  useEffect(() => {
    let notification_Timeout: number;
    if (stateNotification === "1") {
      notification_Timeout = setTimeout(() => dispatch(setOpacity("0")), 3000);
    }
    return () => clearTimeout(notification_Timeout);
  }, [stateNotification]);

  useEffect(() => {
    setFilterSong(allSong);
  }, [stateAudio]);

  return (
    <div className={cx("new_release")}>
      <div className={cx("title")}>{newRelease?.title}</div>
      <div className={cx("filter")}>
        <NavLink
          to="/all"
          end
          className={(nav) => cx({ active: nav.isActive })}>
          <div
            className={cx("filter_item")}
            onClick={() => setFilterSong(allSong)}>
            Tất cả
          </div>
        </NavLink>
        <NavLink
          to="/vietnam"
          className={(nav) => cx({ active: nav.isActive })}>
          <div
            className={cx("filter_item")}
            onClick={() => setFilterSong(vietNamSong)}>
            Việt Nam
          </div>
        </NavLink>
        <NavLink to="/quocte" className={(nav) => cx({ active: nav.isActive })}>
          <div
            className={cx("filter_item")}
            onClick={() => setFilterSong(QuocTeSong)}>
            Quốc tế
          </div>
        </NavLink>
      </div>
      <div className={cx("list_song")}>
        {filterSong?.map((item: any, index: number) => {
          if (index <= 11) {
            return (
              <NavLink
                key={item.encodeId}
                to={item?.link.split(".")[0]}
                className={(nav) => cx({ active: nav.isActive })}>
                <div
                  className={cx("item_song")}
                  onClick={() => {
                    handleClick(item);
                    item?.allowAudioAds &&
                      item.isWorldWide &&
                      dispatch(setIsPlaying(true));
                  }}>
                  <div className={cx("img_song")}>
                    <img src={item?.thumbnail} alt="" />
                  </div>
                  <div className={cx("info_song")}>
                    <div className={cx("name_song")}>{item.title}</div>
                    <div className={cx("artists_names")}>
                      {item.artistsNames}
                    </div>
                    <div className={cx("day")}>
                      {moment.unix(item.releaseDate).format("DD-MM-YYYY")}
                    </div>
                  </div>
                </div>
              </NavLink>
            );
          }
        })}
      </div>
      <Notification active={stateNotification} text="Xin lỗi không thể phát" />
    </div>
  );
};

export default NewRelease;
