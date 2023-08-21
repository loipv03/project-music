import classNames from "classnames/bind";
import styles from "./Chill.module.scss";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const cx = classNames.bind(styles);

const Chill = () => {
  const stateHome = useSelector(({ audio }: any) => audio.audio.data?.items);
  const stateChill = stateHome?.find((item: any) => item.title === "Chill");

  return (
    <div className={cx("playlist_chill")}>
      <div className={cx("playlist_title")}>{stateChill?.title}</div>
      <div className={cx("playlist_content")}>
        {stateChill?.items?.map((item: any) => (
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

export default Chill;
