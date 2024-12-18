import classNames from "classnames";
import styles from "./MemoList.module.scss";
import { NavLink } from "react-router-dom";
import { useCallback, useState } from "react";
import Toolbar from "../components/Toolbar";

export default function MemoList() {
  // 체크박스 state, Toolbar 컴포넌트에 전달한다.
  const [checked, setChecked] = useState([]);
  // 검색어 state, Toolbar 컴포넌트에 전달한다.
  const [searchRegexp, setSearchRegexp] = useState("");

  // 로컬 스토리지의 아이템을 모두 꺼내서 시간순으로 정렬한다.
  const keys = [];
  const items = [];
  for (let i = 0; i < localStorage.length; i++) {
    keys.push(localStorage.key(i));
    items.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
  }
  items.sort((a, b) => {
    return b.order - a.order;
  });

  // 체크박스 클릭 시 checked에 해당 id가 없으면 추가하고 있으면 삭제한다.
  const check = useCallback(
    (e) => {
      if (checked.indexOf(e.target.value) === -1) {
        setChecked([...checked, e.target.value]);
      } else {
        setChecked(() => {
          return [...checked].filter((id) => {
            return id !== e.target.value;
          });
        });
      }
    },
    [checked]
  );

  // 검색어가 있다면 검색된 메모만, 검색어가 없다면 모든 메모를 출력한다.
  return (
    <div className={classNames(styles["container"])} style={{ height: "70vh" }}>
      <Toolbar
        checked={checked}
        setChecked={setChecked}
        setSearchRegexp={setSearchRegexp}
      />
      <div className={classNames(styles["list"])}>
        <ul>
          {searchRegexp.length !== 0
            ? items.map((item) => {
                if (searchRegexp.test(item.title)) {
                  return (
                    <li key={item.time}>
                      <input
                        type="checkbox"
                        value={item.time}
                        className={classNames(styles["check-box"])}
                        onClick={check}
                      />
                      <NavLink
                        className={classNames(styles["link"])}
                        to={`/${item.time}`}
                      >
                        <span className={classNames(styles["title"])}>
                          {item.title}
                        </span>
                        <span className={classNames(styles["time"])}>
                          {item.time}
                        </span>
                      </NavLink>
                    </li>
                  );
                } else {
                  return null;
                }
              })
            : items.map((item) => {
                return (
                  <li key={item.time}>
                    <input
                      type="checkbox"
                      value={item.time}
                      className={classNames(styles["check-box"])}
                      onClick={check}
                    />
                    <NavLink
                      className={classNames(styles["link"])}
                      to={`/memo/${item.time}`}
                    >
                      <span className={classNames(styles["title"])}>
                        {item.title}
                      </span>

                      <span className={classNames(styles["time"])}>
                        {item.time}
                      </span>
                    </NavLink>
                  </li>
                );
              })}
        </ul>
      </div>
    </div>
  );
}
