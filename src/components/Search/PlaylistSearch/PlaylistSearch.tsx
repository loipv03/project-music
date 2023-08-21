import classNames from "classnames/bind";
import styles from "./PlaylistSearch.module.scss";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const cx = classNames.bind(styles);

const PlaylistSearch = () => {
  const state = useSelector(({ search }: any) => search.search_data);

  return (
    <div className={cx("playlistSearch")}>
      <div className={cx("playlist_title")}>Playlist/Album</div>
      <div className={cx("playlist_content")}>
        {state?.playlists?.map((playlist: any) => (
          <NavLink key={playlist?.encodeId} to={playlist?.link.split(".")[0]}>
            <div className={cx("playlist_content_item")}>
              <img src={playlist?.thumbnail} alt="" />
              <div className={cx("content_item_title")}>{playlist?.title}</div>
              <div className={cx("content_item_artists")}>
                {playlist?.artists
                  ? playlist?.artists?.map((artist: any) => `${artist?.name}, `)
                  : playlist?.userName}
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default PlaylistSearch;
