import { MdNavigateBefore } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";
import { getDetailSong, setIsPlaying } from "../../redux/slice/playerControl";
import { AppDispatch } from "../../redux/store";
import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";

import styles from "./banner.module.scss";
import { useEffect, useRef } from "react";

const cx = classNames.bind(styles);

const BannerSlide = () => {
  const dispatch = useDispatch();
  const AppDispatch: AppDispatch = useDispatch();
  const state = useSelector(({ audio }: any) => audio.audio.data);
  const stateControl = useSelector(({ control }: any) => control);
  const slider = useRef<HTMLDivElement>(null);
  const btnNext = useRef<HTMLDivElement>(null);
  const btnPre = useRef<HTMLDivElement>(null);

  const bannerState = state?.items.find(
    (item: any) => item.sectionType === "banner"
  );

  const handleClick = (item: any) => {
    if (item.type === 1 && item.encodeId !== stateControl.curSongId) {
      AppDispatch(getDetailSong(item.encodeId));
      dispatch(setIsPlaying(true));
    }
  };

  useEffect(() => {
    btnNext.current?.addEventListener("click", () => {
      const firstChild = slider.current?.firstChild;
      if (firstChild) {
        slider.current?.appendChild(firstChild);
      }
    });
    btnPre.current?.addEventListener("click", () => {
      const lastChild = slider.current?.lastChild;
      if (lastChild) {
        slider.current?.insertBefore(lastChild, slider.current.firstChild);
      }
    });
    return () => {
      btnNext.current?.addEventListener("click", () => {});
      btnPre.current?.addEventListener("click", () => {});
    };
  }, []);

  return (
    <div className={cx("banner")}>
      <div className={cx("slide_img")} ref={slider}>
        {bannerState?.items?.map((item: any, index: number) => {
          if (index <= 2) {
            return (
              <div className={cx("item")} key={item.encodeId}>
                <img
                  src={item.banner}
                  alt="#"
                  onClick={() => handleClick(item)}
                />
              </div>
            );
          }
        })}
      </div>
      <div className={cx("btn_next")} ref={btnNext}>
        <MdNavigateNext />
      </div>
      <div className={cx("btn_pre")} ref={btnPre}>
        <MdNavigateBefore />
      </div>
    </div>
  );
};

export default BannerSlide;
