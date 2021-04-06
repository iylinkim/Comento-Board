import React, { useEffect } from "react";
import styles from "style/order.module.css";

const Order = ({ standard, setStandard }) => {
  const ORDER = "order";

  const onClick = (event) => {
    const {
      currentTarget: { title },
    } = event;

    if (title === "asc") {
      setStandard(true);
      localStorage.setItem(ORDER, title);
    } else if (title === "desc") {
      setStandard(false);
      localStorage.setItem(ORDER, title);
    }
  };

  useEffect(() => {
    const ls_order = localStorage.getItem(ORDER);
    if (ls_order !== undefined) {
      //localStorage에 정렬기준 저장되어 있을 때
      if (ls_order === "desc") {
        setStandard(false);
      } else if (ls_order === "asc") {
        setStandard(true);
      }
    }
  }, [setStandard]);
  return (
    <div className={styles.order_standard}>
      <p
        onClick={onClick}
        className={
          standard ? `${styles.order} ${styles.selected}` : styles.order
        }
        title="asc"
      >
        <span className={styles.circle}>●</span>
        <span>오름차순</span>
      </p>
      <p
        onClick={onClick}
        className={
          standard ? styles.order : `${styles.order} ${styles.selected}`
        }
        title="desc"
      >
        <span className={styles.circle}>●</span>
        <span>내림차순</span>
      </p>
    </div>
  );
};

export default Order;
