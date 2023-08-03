import classNames from "classnames/bind";

import styles from "./pageNotFound.module.scss";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsPlaying } from "../../redux/slice/playerControl";

const cx = classNames.bind(styles);

const PageNotFound = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setIsPlaying(false));
  }, []);
  return (
    <div className={cx("page_not_found")}>
      <img src="/img/ErrorTV.png" alt="" />
    </div>
  );
};

export default PageNotFound;
