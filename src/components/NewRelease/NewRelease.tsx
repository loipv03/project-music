import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from "./newRelease.module.scss";
import { AppDispatch } from "../../redux/store";
import { getDetailSong, setIsPlaying } from "../../redux/slice/playerControl";

const cx = classNames.bind(styles);

const NewRelease = () => {
  const [filterSong, setFilterSong] = useState<any>();
  const state = useSelector(({ audio }: any) => audio.audio.data?.items);
  const AppDispatch: AppDispatch = useDispatch();
  const dispatch = useDispatch();

  const newRelease = state?.find(
    (item: any) => item.sectionType === "new-release"
  );

  const allSong = newRelease?.items?.all;
  const vietNamSong = newRelease?.items?.vPop;
  const QuocTeSong = newRelease?.items?.others;

  const handleClick = (item: any) => {
    if (item.allowAudioAds == true) {
      AppDispatch(getDetailSong(item.encodeId));
    } else {
      window.alert("Nhạc vip chưa thể nghe");
    }
  };

  useEffect(() => {
    setFilterSong(allSong);
  }, [state]);

  return (
    <div className={cx("new_release")}>
      <div className={cx("title")}>{newRelease?.title}</div>
      <div className={cx("filter")}>
        <NavLink to="/" end className={(nav) => cx({ active: nav.isActive })}>
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
                onClick={() => dispatch(setIsPlaying(true))}
                className={(nav) => cx({ active: nav.isActive })}>
                <div
                  className={cx("item_song")}
                  onClick={() => handleClick(item)}>
                  <div className={cx("img_song")}>
                    <img src={item?.thumbnail} alt="" />
                  </div>
                  <div className={cx("info_song")}>
                    <div className={cx("name_song")}>{item.title}</div>
                    <div className={cx("artists_names")}>
                      {item.artistsNames}
                    </div>
                    <div className={cx("day")}>Hôm nay</div>
                  </div>
                </div>
              </NavLink>
            );
          }
        })}
      </div>
    </div>
  );
};

export default NewRelease;
