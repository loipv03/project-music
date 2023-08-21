import { CgClose } from "react-icons/cg";
import classNames from "classnames/bind";

import styles from "./notification.module.scss";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOpacity } from "../../redux/slice/notification";

const cx = classNames.bind(styles);

interface IProps {
  text: string;
  active: string;
}

const Notification = ({ text, active }: IProps) => {
  const content = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const stateNotification = useSelector(
    ({ notification }) => notification.opacity
  );

  content.current && (content.current.style.opacity = active);

  const handleClose = () => content.current && dispatch(setOpacity("0"));

  useEffect(() => {
    let notification_Timeout: number;
    if (content.current && content.current.style.opacity === "1") {
      notification_Timeout = setTimeout(() => dispatch(setOpacity("0")), 3000);
    }
    return () => clearTimeout(notification_Timeout);
  }, [stateNotification]);

  return (
    <div className={cx("content")} ref={content}>
      <div className={cx("text")}>{text}</div>
      <div className={cx("close")} onClick={handleClose}>
        <CgClose />
      </div>
    </div>
  );
};

export default Notification;
