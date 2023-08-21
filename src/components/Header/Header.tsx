import { BiSearch } from "react-icons/bi";
import { AiOutlineSetting } from "react-icons/ai";
import classNames from "classnames/bind";
import { useForm } from "react-hook-form";
import { AppDispatch } from "../../redux/store";

import styles from "./header.module.scss";
import { useDispatch } from "react-redux";
import { search } from "../../redux/slice/search";
import { useNavigate, useParams } from "react-router-dom";

const cx = classNames.bind(styles);

const Header = () => {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const onSubmit = ({ params }: any) => {
    navigate(`/search/tat-ca/${params}`);
  };
  return (
    <header className={cx("header")}>
      <div className={cx("header_left")}>
        <form onSubmit={handleSubmit(onSubmit)} className={cx("search")}>
          <input
            {...register("params")}
            type="text"
            placeholder="Tìm kiếm bài hát, nghệ sĩ, bài hát..."
          />
          <button type="submit">
            <BiSearch />
          </button>
        </form>
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
