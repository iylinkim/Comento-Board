import React, { useState } from "react";
import styles from "style/order.module.css";

const Order = ({ setStandard }) => {
  const onClick = (event) => {
    const {
      currentTarget: { title },
    } = event;

    if (title === "asc") {
      setStandard(true);
    } else if (title === "desc") {
      setStandard(false);
    }
  };
  return (
    <div className={styles.order_standard}>
      <p
        onClick={onClick}
        className={`${styles.order} ${styles.selected}`}
        title="asc"
      >
        <span className={styles.circle}>●</span>
        <span>오름차순</span>
      </p>
      <p onClick={onClick} className={styles.order} title="desc">
        <span className={styles.circle}>●</span>
        <span>내림차순</span>
      </p>
    </div>
  );
};

export default Order;
