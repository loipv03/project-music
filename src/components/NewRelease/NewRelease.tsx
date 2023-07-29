import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import styles from "./newRelease.module.scss";
import { AppDispatch } from "../../redux/store";
import { getDetailSong } from "../../redux/slice/playerControl";

const cx = classNames.bind(styles);

const NewRelease = () => {
  const state = useSelector(({ audio }: any) => audio.audio.data?.items);
  const dispatch: AppDispatch = useDispatch();
  const newRelease = state?.find(
    (item: any) => item.sectionType === "new-release"
  );

  const allSong = newRelease?.items?.all;
  // const vietNamSong = newRelease?.items?.vPop;
  // const QuocTeSong = newRelease?.items?.all;

  const handleClick = (encodeId: string) => {
    dispatch(getDetailSong(encodeId));
  };

  return (
    <div className={cx("new_release")}>
      <div className={cx("title")}>{newRelease?.title}</div>
      <div className={cx("filter")}>
        <NavLink to={""} className={(nav) => cx({ active: nav.isActive })}>
          <div className={cx("filter_item")}>Tất cả</div>
        </NavLink>
        <NavLink to={"7"} className={(nav) => cx({ active: nav.isActive })}>
          <div className={cx("filter_item")}>Việt Nam</div>
        </NavLink>
        <NavLink to={"8"} className={(nav) => cx({ active: nav.isActive })}>
          <div className={cx("filter_item")}>Quốc tế</div>
        </NavLink>
      </div>
      <div className={cx("list_song")}>
        {allSong?.map((item: any, index: number) => {
          if (index <= 11) {
            return (
              <NavLink
                key={item.encodeId}
                to={`${index + 10}`}
                className={(nav) => cx({ active: nav.isActive })}>
                <div
                  className={cx("item_song")}
                  onClick={() => handleClick(item.encodeId)}>
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
