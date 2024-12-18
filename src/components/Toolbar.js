import classNames from "classnames";
import styles from "./Toolbar.module.scss";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { useCallback, useState } from "react";
import Modal from "./Modal";
import gsap from "gsap";

export default function Toolbar({ checked, setChecked, setSearchRegexp }) {
  // 현재 페이지의 id를 받아오기(있다면)
  const id = useParams().id;

  // MemoList에 전달할 검색어
  const [valueSearch, setValueSearch] = useState("");
  const [modalActive, setModalActive] = useState(false);

  const changeSearch = useCallback(
    (e) => {
      setValueSearch(e.target.value);
      setSearchRegexp(new RegExp(`${valueSearch}`, "giu"));
      e.target.value.length === 0 && setSearchRegexp("");
    },
    [setSearchRegexp, valueSearch]
  );

  // 홈화면, input, memo 등의 url 체크에 사용할 배열
  const url = window.location.href.split("/");

  // 페이지 이동에 사용할 navigate
  const navigate = useNavigate();

  // 진동효과
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

  // Delete 버튼 클릭 시
  // TextInput 컴포넌트일 경우 뒤로가기
  // id가 있을 경우 모달창 띄우기
  // checked 배열이 존재하지만(MemoList 컴포넌트) 길이가 0일 경우 버튼 진동 효과
  // checked 배열이 존재하고 길이가 0이 아닐 경우 모달창 띄우기
  const deleteMemo = useCallback(() => {
    if (url[3] === "input") {
      navigate(-1);
    } else if (id) {
      setModalActive(true);
    } else if (checked) {
      if (checked.length === 0) {
        vibrate(styles["btn--delete"], "10px");
      } else {
        setModalActive(true);
      }
    }
  }, [checked, id, navigate, url, vibrate]);

  // 삼항연산자를 통해 url에 따라 출력할 버튼과 버튼의 텍스트 변경
  return (
    <div className={classNames(styles["container"])}>
      {modalActive && (
        <Modal
          setModalActive={setModalActive}
          checked={checked}
          setChecked={setChecked}
        />
      )}
      <div className={classNames(styles["tool--left"])}>
        {!url[3] ? (
          <input
            className={classNames(styles["search"])}
            value={valueSearch}
            onChange={changeSearch}
            placeholder="Search"
          />
        ) : (
          <NavLink
            className={classNames(styles["btn"], styles["btn--list"])}
            to={"/"}
          >
            List
          </NavLink>
        )}
        {!url[3] && !id ? (
          <NavLink
            className={classNames(styles["btn"], styles["btn--input"])}
            to={"/input"}
          >
            New
            <span className={classNames(styles["text--disappear"])}> memo</span>
          </NavLink>
        ) : (
          url[3] !== "input" && (
            <NavLink
              className={classNames(styles["btn"], styles["btn--input"])}
              to={`/edit/${id}`}
            >
              Edit
              <span className={classNames(styles["text--disappear"])}>
                {" "}
                memo
              </span>
            </NavLink>
          )
        )}
      </div>
      <div className={classNames(styles["tool--right"])}>
        <div
          className={classNames(
            styles["btn"],
            url[3] === "input" ? styles["btn--cancel"] : styles["btn--delete"]
          )}
          onClick={deleteMemo}
        >
          {url[3] === "input" ? "Cancel" : "Delete"}
        </div>
      </div>
    </div>
  );
}
