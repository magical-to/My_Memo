import React from "react";
import styles from "./App.module.scss";
import classNames from "classnames";
import Center from "./components/Center";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function App() {
  return (
    <div className={classNames(styles["container"])}>
      <Header />
      <Center />
      <Footer />
    </div>
  );
}
