import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";
import {
  Chart,
  Circle,
  Library,
  MusicNote,
  Radio,
  Star,
  TopPic,
} from "../Icon";
import styles from "./sidebar.module.scss";
const cx = classNames.bind(styles);

const Sidebar = () => {
  return (
    <aside className={cx("aside")}>
      <div className={cx("logo")}>
        <NavLink end to={""}>
          <img src="/img/logo.png" alt="" />
        </NavLink>
      </div>
      <nav className={cx("nav")}>
        <ul className={cx("nav_item")}>
          <li>
            <NavLink
              to={""}
              end
              className={(nav) => cx({ active: nav.isActive })}>
              <div className={cx("icon")}>
                <Circle />
              </div>
              <div className={cx("text")}>khám phá</div>
            </NavLink>
          </li>
          <li style={{ cursor: "not-allowed" }}>
            <NavLink
              to={"1"}
              style={{ pointerEvents: "none", cursor: "not-allowed" }}
              className={(nav) => cx({ active: nav.isActive })}>
              <div className={cx("icon")}>
                <Chart />
              </div>
              <div className={cx("text")}>zingchart</div>
            </NavLink>
          </li>
          <li style={{ cursor: "not-allowed" }}>
            <NavLink
              to={"2"}
              style={{ pointerEvents: "none", cursor: "not-allowed" }}
              className={(nav) => cx({ active: nav.isActive })}>
              <div className={cx("icon")}>
                <Radio />
              </div>
              <div className={cx("text")}>
                radio <div>Live</div>
              </div>
            </NavLink>
          </li>
          <li style={{ cursor: "not-allowed" }}>
            <NavLink
              to={"3"}
              style={{ pointerEvents: "none", cursor: "not-allowed" }}
              className={(nav) => cx({ active: nav.isActive })}>
              <div className={cx("icon")}>
                <Library />
              </div>
              <div className={cx("text")}>thư viện</div>
            </NavLink>
          </li>
        </ul>
        <div className={cx("divide")}></div>
        <ul className={cx("nav_item")}>
          <li style={{ cursor: "not-allowed" }}>
            <NavLink
              to={"4"}
              style={{ pointerEvents: "none", cursor: "not-allowed" }}
              className={(nav) => cx({ active: nav.isActive })}>
              <div className={cx("icon")}>
                <MusicNote />
              </div>
              <div className={cx("text")}>BXH nhạc mới</div>
            </NavLink>
          </li>
          <li style={{ cursor: "not-allowed" }}>
            <NavLink
              to={"5"}
              style={{ pointerEvents: "none", cursor: "not-allowed" }}
              className={(nav) => cx({ active: nav.isActive })}>
              <div className={cx("icon")}>
                <TopPic />
              </div>
              <div className={cx("text")}>chủ đề & thể loại</div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"top100"}
              className={(nav) => cx({ active: nav.isActive })}>
              <div className={cx("icon")}>
                <Star />
              </div>
              <div className={cx("text")}>top 100</div>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
