import { MdNavigateBefore } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";
import { getDetailSong, setIsPlaying } from "../../redux/slice/playerControl";
import { AppDispatch } from "../../redux/store";
import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";

import styles from "./banner.module.scss";
import { getDetaiPlayList } from "../../redux/slice/playlist";
import { NavLink } from "react-router-dom";

const cx = classNames.bind(styles);

const BannerSlide = () => {
  const dispatch = useDispatch();
  const AppDispatch: AppDispatch = useDispatch();
  const state = useSelector(({ audio }: any) => audio.audio.data);
  const stateControl = useSelector(({ control }: any) => control);

  const bannerState = state?.items.find(
    (item: any) => item.sectionType === "banner"
  );

  const handleClick = (item: any) => {
    if (item.type === 1 && item.encodeId !== stateControl.curSongId) {
      AppDispatch(getDetailSong(item.encodeId));
      dispatch(setIsPlaying(true));
    }
    //  else if (item.type === 4) {
    //   dispatch(getDetaiPlayList(item.encodeId));
    // }
  };
  const slideImg = document.querySelector(`.${cx("slide_img")}`);
  document
    .querySelector(`.${cx("btn_next")}`)
    ?.addEventListener("click", () => {
      let img = document.querySelectorAll(`.${cx("item")}`);
      slideImg?.appendChild(img[0]);
    });
  document.querySelector(`.${cx("btn_pre")}`)?.addEventListener("click", () => {
    let img = document.querySelectorAll(`.${cx("item")}`);
    slideImg?.append(img[0]);
  });

  return (
    <div className={cx("banner")}>
      <div className={cx("slide_img")}>
        {bannerState?.items?.map((item: any) => {
          return (
            <img
              className={cx("item")}
              key={item.encodeId}
              src={item.banner}
              alt="#"
              onClick={() => handleClick(item)}
            />
          );
        })}
      </div>
      <div className={cx("btn_next")}>
        <MdNavigateNext />
      </div>
      <div className={cx("btn_pre")}>
        <MdNavigateBefore />
      </div>
    </div>
  );
};

export default BannerSlide;
