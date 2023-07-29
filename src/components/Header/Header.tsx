import { BiSearch } from "react-icons/bi";
import { AiOutlineSetting } from "react-icons/ai";
import classNames from "classnames/bind";

import styles from "./header.module.scss";

const cx = classNames.bind(styles);

const Header = () => {
  return (
    <header className={cx("header")}>
      <div className={cx("header_left")}>
        <div className={cx("search")}>
          <input
            type="text"
            placeholder="Tìm kiếm bài hát, nghệ sĩ, bài hát..."
          />
          <BiSearch />
        </div>
      </div>
      <div className={cx("header_right")}>
        <div className={cx("setting")}>
          <AiOutlineSetting />
        </div>
        <div className={cx("account")}></div>
      </div>
    </header>
  );
};

export default Header;
