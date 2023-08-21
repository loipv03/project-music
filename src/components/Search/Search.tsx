import classNames from "classnames/bind";

import styles from "./Search.module.scss";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { NavLink, useParams } from "react-router-dom";
import { useEffect } from "react";
import { search } from "../../redux/slice/search";
import All from "./All/All";
import Songs from "./Songs/Songs";
import PlaylistSearch from "./PlaylistSearch/PlaylistSearch";

const cx = classNames.bind(styles);

const Search = () => {
  const AppDispatch: AppDispatch = useDispatch();
  const { params, filter } = useParams();

  useEffect(() => {
    AppDispatch(search(params));
  }, [params]);

  return (
    <div className={cx("search")}>
      <div className={cx("header_search")}>
        <div className={cx("title")}>kết quả tìm kiếm</div>
        <NavLink
          className={(nav) => cx({ active: nav.isActive })}
          to={`/search/tat-ca/${params}`}>
          <div className={cx("filter")}>TẤT CẢ</div>
        </NavLink>
        <NavLink
          className={(nav) => cx({ active: nav.isActive })}
          to={`/search/bai-hat/${params}`}>
          <div className={cx("filter")}>BÀI HÁT</div>
        </NavLink>
        <NavLink
          className={(nav) => cx({ active: nav.isActive })}
          to={`/search/playlist/${params}`}>
          <div className={cx("filter")}>PLAYLIST/ALBUM</div>
        </NavLink>
      </div>
      {filter === "tat-ca" && <All />}
      {filter === "bai-hat" && <Songs />}
      {filter === "playlist" && <PlaylistSearch />}
    </div>
  );
};

export default Search;
