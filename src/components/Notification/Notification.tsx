import { CgClose } from "react-icons/cg";
import classNames from "classnames/bind";

import styles from "./notification.module.scss";
import { useRef } from "react";

const cx = classNames.bind(styles);

interface IProps {
  text: string;
  active: string;
}

const Notification = ({ text, active }: IProps) => {
  const content = useRef<HTMLDivElement>(null);

  content.current && (content.current.style.opacity = active);

  const handleClose = () =>
    content.current && (content.current.style.opacity = "0");

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
