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

const cx = classNames.bind(styles);

const PlayList = () => {
  const Appdispatch = useDispatch<AppDispatch>();
  const dispatch = useDispatch();
  const playList = useSelector(({ playList }: any) => playList.playList);
  console.log(playList);
  const { id } = useParams();

  useEffect(() => {
    Appdispatch(getDetaiPlayList(id!));
  }, []);

  const handleClick = (item: any) => {
    if (item.allowAudioAds == true) {
      Appdispatch(getDetailSong(item.encodeId));
    } else {
      window.alert("Nhạc vip chưa thể nghe");
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
        <button className={cx("play")}>Tiếp Tục phát</button>
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
            className={(nav) => cx({ active: nav.isActive })}
            onClick={() => {
              handleClick(item);
              item.allowAudioAds && dispatch(setIsPlaying(true));
            }}>
            <div className={cx("song_content")} key={item.encodeId}>
              <div className={cx("song_item_left")}>
                <div className={cx("music_note")}>
                  <CiMusicNote1 />
                </div>
                <img src={item.thumbnail} alt="" />
                <div className={cx("desc")}>
                  <div className={cx("name_song")}>{item?.title}</div>
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
    </div>
  );
};

export default PlayList;
