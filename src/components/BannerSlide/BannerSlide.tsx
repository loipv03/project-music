import { MdNavigateBefore } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";
import { getDetailSong, setIsPlaying } from "../../redux/slice/playerControl";
import { AppDispatch } from "../../redux/store";
import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";

import styles from "./banner.module.scss";
import { useEffect } from "react";

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
  };

  useEffect(() => {}, []);
  let slideImg = document.querySelector("#slide_imgs");
  document.getElementById("btn_nexts")?.addEventListener("click", () => {
    let img = document.querySelectorAll(".items");
    slideImg?.appendChild(img[0]);
  });
  document.getElementById("btn_pres")?.addEventListener("click", () => {
    let img = document.querySelectorAll(".items");
    slideImg?.append(img[0]);
  });
  return (
    <div className={cx("banner")}>
      <div className={cx("slide_img")} id="slide_imgs">
        {bannerState?.items?.map((item: any, index: any) => {
          return (
            <div className={`${cx("item")} items`} key={item.encodeId}>
              <img
                className={cx("item")}
                key={item.encodeId}
                src={item.banner}
                alt="#"
                onClick={() => handleClick(item)}
              />
            </div>
          );
        })}
      </div>
      <div className={cx("btn_next")} id="btn_nexts">
        <MdNavigateNext />
      </div>
      <div className={cx("btn_pre")} id="btn_pres">
        <MdNavigateBefore />
      </div>
    </div>
  );
};

export default BannerSlide;
