import { MdNavigateNext } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import {
  getDetailSong,
  setIsPlaying,
} from "../../../redux/slice/playerControl";
import { setOpacity } from "../../../redux/slice/notification";
import classNames from "classnames/bind";

import styles from "./All.module.scss";
import Notification from "../../Notification/Notification";
import moment from "moment";
import { Link, NavLink, useParams } from "react-router-dom";

const cx = classNames.bind(styles);

const All = () => {
  const dispatch = useDispatch();
  const AppDispatch: AppDispatch = useDispatch();
  const state = useSelector(({ search }: any) => search.search_data);
  const { params } = useParams();

  const stateNotification = useSelector(
    ({ notification }) => notification.opacity
  );

  const handleClick = (item: any) => {
    if (item?.allowAudioAds && item?.isWorldWide) {
      AppDispatch(getDetailSong(item.encodeId));
      dispatch(setIsPlaying(true));
    } else if (item?.objectType == "artist") {
    } else {
      dispatch(setOpacity("1"));
    }
  };

  return (
    <div className={cx("content")}>
      <div className={cx("top")}>
        <div className={cx("title_top")}>Nổi Bật</div>
        <div className={cx("content_top")}>
          <div
            onClick={() => handleClick(state?.top)}
            className={cx("item_top")}>
            <img src={state?.top?.thumbnail} alt="" />
            <div className={cx("item_top_desc")}>
              <div className={cx("item_top_type")}>
                {state?.top?.objectType == "song" ? "Bài hát" : "Nghệ sĩ"}
              </div>
              <div className={cx("item_top_title")}>
                {state?.top?.objectType == "song"
                  ? state?.top?.title
                  : state?.top?.name}
              </div>
              <div className={cx("item_top_artists")}>
                {`${state?.artists?.[0]?.totalFollow} người quan tâm`}
              </div>
            </div>
          </div>
          {state?.songs?.map((song: any, index: number) => {
            if (index < 2) {
              return (
                <div
                  onClick={() => {
                    handleClick(song);
                  }}
                  key={song.encodeId}
                  className={cx("item_top")}>
                  <img src={song?.thumbnail} alt="" />
                  <div className={cx("item_top_desc")}>
                    <div className={cx("item_top_type")}>Bài hát</div>
                    <div className={cx("item_top_title")}>{song?.title}</div>
                    <div className={cx("item_top_artists")}>
                      {song?.artistsNames}
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className={cx("songs")}>
        <div className={cx("song_title")}>
          Bài hát
          <Link to={`/search/bai-hat/${params}`}>
            <span className={cx("all_song")}>
              Tất cả <MdNavigateNext />
            </span>
          </Link>
        </div>
        <div className={cx("song_content")}>
          {state?.songs?.map((song: any, index: number) => {
            if (index < 6) {
              return (
                <div
                  key={song.encodeId}
                  onClick={() => {
                    handleClick(song);
                  }}
                  className={cx("song_content_item")}>
                  <div className={cx("song_item_left")}>
                    <img src={song.thumbnail} alt="" />
                    <div className={cx("desc")}>
                      <div title={song.title} className={cx("name_song")}>
                        {song.title}
                      </div>
                      <div className={cx("artists")}>{song.artistsNames}</div>
                    </div>
                  </div>
                  <div className={cx("time")}>
                    {moment.utc(song.duration * 1000).format("mm:ss")}
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className={cx("playlistSearch")}>
        <div className={cx("playlist_title")}>
          Playlist/Album
          <Link to={`/search/playlist/${params}`}>
            <span className={cx("all_playlist")}>
              Tất cả <MdNavigateNext />
            </span>
          </Link>
        </div>
        <div className={cx("playlist_content")}>
          {state?.playlists?.map((playlist: any, index: number) => {
            if (index < 5) {
              return (
                <NavLink
                  key={playlist?.encodeId}
                  to={playlist?.link.split(".")[0]}>
                  <div className={cx("playlist_content_item")}>
                    <img src={playlist?.thumbnail} alt="" />
                    <div className={cx("content_item_title")}>
                      {playlist?.title}
                    </div>
                    <div className={cx("content_item_artists")}>
                      {playlist?.artists
                        ? playlist?.artists?.map(
                            (artist: any) => `${artist?.name}, `
                          )
                        : playlist?.userName}
                    </div>
                  </div>
                </NavLink>
              );
            }
          })}
        </div>
      </div>
      <Notification
        active={stateNotification}
        text="Xin lỗi xin vui lòng đợi"
      />
    </div>
  );
};

export default All;
