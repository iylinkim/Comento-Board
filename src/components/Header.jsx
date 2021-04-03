import React from "react";
import styles from "../style/header.module.css";
const Header = (props) => {
  return <header>[{new Date(Date.now()).toLocaleDateString()}] 김예린</header>;
};

export default Header;
