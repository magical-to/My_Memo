import styles from "./TextInput.module.scss";
import classNames from "classnames";
import { useCallback, useState } from "react";
import gsap from "gsap";
import Toolbar from "./Toolbar";
import { useNavigate, useParams } from "react-router";

export default function TextInput() {
  // 현재 페이지의 id를 받아오기(id가 있다면 Edit memo, 없다면 New memo로 구분할 용도)
  const id = useParams().id;

  // 페이지 이동에 사용할 navigate
  const navigate = useNavigate();

  // input value state 정의, Edit memo일 경우 초기값으로 기존 메모 내용을 부여한다.
  const [valueTitle, setValueTitle] = useState(() => {
    return id && JSON.parse(localStorage.getItem(id))
      ? JSON.parse(localStorage.getItem(id)).title
      : "";
  });
  const [valueMemo, setValueMemo] = useState(() => {
    return id && JSON.parse(localStorage.getItem(id))
      ? JSON.parse(localStorage.getItem(id)).memo
      : "";
  });

  // input을 통한 state 업데이트
  const changeTitle = useCallback((e) => {
    setValueTitle(e.target.value);
  }, []);
  const changeMemo = useCallback((e) => {
    setValueMemo(e.target.value);
  }, []);

  // 진동 효과
  const vibrate = useCallback((classname, degree) => {
    gsap.to("." + classname, 0.05, {
      translateX: degree,
      yoyo: true,
      repeat: 1,
    });
    gsap.to("." + classname, 0.05, {
      delay: 0.1,
      translateX: `-${degree}`,
      yoyo: true,
      repeat: 1,
    });
    gsap.to("." + classname, 0.05, {
      delay: 0.2,
      translateX: degree,
      yoyo: true,
      repeat: 1,
    });
  }, []);

  // Upload 버튼 클릭 시 빈칸이 있다면 진동 효과, 빈칸이 없다면 스토리지에 등록
  const upload = useCallback(() => {
    if (valueTitle.length === 0) {
      vibrate(styles["input--title"], "3px");
    } else if (valueMemo.length === 0) {
      vibrate(styles["input--memo"], "3px");
    } else {
      if (id) {
        localStorage.removeItem(id);
      }
      // key로 사용할 현재 시간 정보
      let now = new Date();
      let key = now.toLocaleString();
      localStorage.setItem(
        key,
        JSON.stringify({
          time: key,
          title: valueTitle,
          memo: valueMemo,
          order: Date.parse(now),
        })
      );
      navigate(`/memo/${key}`);
    }
  }, [navigate, valueMemo, valueTitle, id, vibrate]);

  return (
    <div className={classNames(styles["container"])} style={{ height: "70vh" }}>
      <Toolbar />
      <div className={classNames(styles["input-group"])}>
        <input
          className={classNames(styles["input"], styles["input--title"])}
          value={valueTitle}
          onChange={changeTitle}
          placeholder="Title"
          maxLength="26"
        />
        <textarea
          className={classNames(styles["input"], styles["input--memo"])}
          value={valueMemo}
          onChange={changeMemo}
          placeholder="Content"
        />
        <div
          className={classNames(styles["btn--upload"], styles["btn"])}
          onClick={upload}
        >
          Upload
        </div>
      </div>
    </div>
  );
}
