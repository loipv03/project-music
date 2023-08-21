import { CiMusicNote1 } from "react-icons/ci";
import classNames from "classnames/bind";

import styles from "./playList.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { NavLink, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getDetaiPlayList } from "../../redux/slice/playlist";
import moment from "moment";
import { getDetailSong, setIsPlaying } from "../../redux/slice/playerControl";
import Notification from "../Notification/Notification";
import { setOpacity } from "../../redux/slice/notification";

const cx = classNames.bind(styles);

const PlayList = () => {
  const AppDispatch = useDispatch<AppDispatch>();
  const dispatch = useDispatch();
  const playList = useSelector(({ playList }: any) => playList.playList);
  const stateNotification = useSelector(
    ({ notification }) => notification.opacity
  );
  const { id } = useParams();

  useEffect(() => {
    AppDispatch(getDetaiPlayList(id!));
  }, [id]);

  useEffect(() => {
    let notification_Timeout: number;
    if (stateNotification === "1") {
      notification_Timeout = setTimeout(() => dispatch(setOpacity("0")), 3000);
    }
    return () => clearTimeout(notification_Timeout);
  }, [stateNotification]);

  const handleClick = (item: any) => {
    if (item.allowAudioAds && item.isWorldWide) {
      AppDispatch(getDetailSong(item.encodeId));
      dispatch(setIsPlaying(true));
    } else {
      dispatch(setOpacity("1"));
    }
  };

  return (
    <div className={cx("play_list")}>
      <div className={cx("playlist_media")}>
        <div className={cx("thumbnailM")}>
          <img src={playList?.thumbnailM} alt="" />
        </div>
        <div className={cx("title")}>{playList?.title}</div>
        <div className={cx("lst_update")}>
          Cập nhật:
          {moment.unix(playList?.contentLastUpdate).format("DD/MM/YYYY")}
        </div>
        <div className={cx("artistsNames")}>{playList?.artistsNames}</div>
        <div className={cx("like")}>
          {Math.floor(playList?.like / 1000)}K người yêu thích
        </div>
        <button
          className={cx("play")}
          onClick={() => dispatch(setIsPlaying(true))}>
          Tiếp Tục phát
        </button>
      </div>
      <div className={cx("playlist_content")}>
        <div className={cx("sort_desc")}>
          Lời tựa <span>{playList?.sortDescription}</span>
        </div>
        <div className={cx("title")}>
          <div className={cx("title_song")}>Bài hát</div>
          <div className={cx("title_album")}>album</div>
          <div className={cx("title_time")}>thời gian</div>
        </div>
        {playList?.song?.items.map((item: any) => (
          <NavLink
            to={""}
            key={item.encodeId}
            className={(nav) => cx({ active: nav.isActive })}
            onClick={() => {
              handleClick(item);
            }}>
            <div className={cx("song_content")}>
              <div className={cx("song_item_left")}>
                <div className={cx("music_note")}>
                  <CiMusicNote1 />
                </div>
                <img src={item.thumbnail} alt="" />
                <div className={cx("desc")}>
                  <div title={item?.title} className={cx("name_song")}>
                    {item?.title}
                  </div>
                  <div className={cx("artists")}>{item?.artistsNames}</div>
                </div>
              </div>
              <div className={cx("album")}>{item?.album?.title}</div>
              <div className={cx("time")}>
                {moment.utc(item?.duration * 1000).format("mm:ss")}
              </div>
            </div>
          </NavLink>
        ))}
      </div>
      <Notification active={stateNotification} text="Xin lỗi không thể phát" />
    </div>
  );
};

export default PlayList;
