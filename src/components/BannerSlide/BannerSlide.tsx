import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import { getDetailSong } from "../../redux/slice/playerControl";
import { AppDispatch } from "../../redux/store";
import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from "./banner.module.scss";
import { getDetaiPlayList } from "../../redux/slice/playlist";

const cx = classNames.bind(styles);

const BannerSlide = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const state = useSelector(({ audio }: any) => audio.audio.data);
  const stateControl = useSelector(({ control }: any) => control);

  const bannerState = state?.items.find(
    (item: any) => item.sectionType === "banner"
  );

  const handleClick = (item: any) => {
    if (item.type === 1 && item.encodeId !== stateControl.curSongId) {
      dispatch(getDetailSong(item.encodeId));
    } else if (item.type === 4) {
      navigate("playlist");
      dispatch(getDetaiPlayList(item.encodeId));
    }
  };

  return (
    <div className={cx("banner")}>
      <div className={cx("img")}>
        {bannerState?.items?.map((item: any) => {
          return (
            <img
              key={item.encodeId}
              src={item.banner}
              alt="#"
              onClick={() => handleClick(item)}
            />
          );
        })}
      </div>
      <div className={cx("btn_next")}>
        <GrNext />
      </div>
      <div className={cx("btn_pre")}>
        <GrPrevious />
      </div>
    </div>
  );
};

export default BannerSlide;
