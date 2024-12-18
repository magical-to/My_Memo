import classNames from "classnames";
import styles from "./Modal.module.scss";
import { useCallback } from "react";
import { useNavigate, useParams } from "react-router";

export default function Modal({ setModalActive, checked, setChecked }) {
  // 현재 페이지의 id를 받아오기(있다면)
  const id = useParams().id;

  // 페이지 이동에 사용할 navigate
  const navigate = useNavigate();

  // 닫기 버튼 클릭 시
  const close = useCallback(() => {
    setModalActive(false);
  }, [setModalActive]);

  // Confirm 버튼 클릭 시 메모 삭제
  const confirm = useCallback(() => {
    if (checked) {
      checked.forEach((id) => {
        localStorage.removeItem(id);
      });
      setChecked([]);
      setModalActive(false);
    } else {
      localStorage.removeItem(id);
      navigate("/");
      setModalActive(false);
    }
  }, [setModalActive, navigate, id, checked, setChecked]);

  return (
    <div className={classNames(styles["container"])}>
      <div
        className={classNames(styles["modal__overlay"])}
        onClick={close}
      ></div>
      <div className={classNames(styles["modal__window"])}>
        <div className={classNames(styles["header"])}>
          <div className={classNames(styles["header__title"])}>Notice</div>
          <div
            className={classNames(styles["header__btn--close"])}
            onClick={close}
          >
            X
          </div>
        </div>
        <div className={classNames(styles["main"])}>
          Are you sure you want to delete?
        </div>
        <div className={classNames(styles["btn-group"])}>
          <div
            className={classNames(styles["btn"], styles["btn--confirm"])}
            onClick={confirm}
          >
            Confirm
          </div>
          <div
            className={classNames(styles["btn"], styles["btn--cancel"])}
            onClick={close}
          >
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
}
