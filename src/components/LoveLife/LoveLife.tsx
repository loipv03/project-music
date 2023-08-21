import classNames from "classnames/bind";
import styles from "./LoveLife.module.scss";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const cx = classNames.bind(styles);

const LoveLife = () => {
  const stateHome = useSelector(({ audio }: any) => audio.audio.data?.items);
  const stateLoveLife = stateHome?.find(
    (item: any) => item.title === "Một chút yêu đời"
  );

  return (
    <div className={cx("playlist_love")}>
      <div className={cx("playlist_title")}>{stateLoveLife?.title}</div>
      <div className={cx("playlist_content")}>
        {stateLoveLife?.items?.map((item: any) => (
          <NavLink key={item?.encodeId} to={item?.link.split(".")[0]}>
            <div className={cx("playlist_content_item")}>
              <img src={item?.thumbnail} alt="" />
              <div className={cx("content_item_desc")}>
                {item?.sortDescription}
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default LoveLife;
