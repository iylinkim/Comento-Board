import React, { useState } from "react";
import styles from "../style/order.module.css";

const Order = ({ setStandard }) => {
  const onClick = (event) => {
    const {
      currentTarget: { title },
    } = event;

    if (title === "asc") {
        console.log("asc")
      setStandard(true);
    } else if (title === "desc") {
        console.log("desc")
      setStandard(false);
    }
  };
  return (
    <div>
      <p onClick={onClick} className={styles.order} title="asc">
        <span>*</span>
        <span>오름차순</span>
      </p>
      <p onClick={onClick} className={styles.order} title="desc">
        <span>*</span>
        <span>내림차순</span>
      </p>
    </div>
  );
};

export default Order;
