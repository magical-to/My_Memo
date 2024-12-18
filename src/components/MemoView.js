import classNames from "classnames";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import styles from "./MemoView.module.scss";
import Toolbar from "./Toolbar";

export default function MemoView() {
  const id = useParams().id;
  const navigate = useNavigate();

  useEffect(() => {
    console.log(localStorage.getItem(id));
    if (!localStorage.getItem(id)) {
      navigate("/");
    }
  }, [id, navigate]);

  return (
    <div className={classNames(styles["container"])} style={{ height: "70vh" }}>
      <Toolbar />
      <div
        className={classNames(styles["section-text"])}
        style={{ height: "50vh" }}
      >
        <div className={classNames(styles["memo--header"])}>
          <h2 className={classNames(styles["title"])}>
            {JSON.parse(localStorage.getItem(id))?.title}
          </h2>
          <div className={classNames(styles["time"])}>
            {JSON.parse(localStorage.getItem(id))?.time}
          </div>
        </div>
        <div className={classNames(styles["memo--main-text"])}>
          {JSON.parse(localStorage.getItem(id))?.memo}
        </div>
      </div>
    </div>
  );
}
