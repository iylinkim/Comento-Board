import React from "react";
import styles from "style/ad.module.css";

const Ad = ({ adInfo }) => {
  const { img, title, contents } = adInfo;
  return (
    <li className={styles.ad}>
      <p className={styles.sponsored}>sponsored</p>
      <div className={styles.body}>
        <p className={styles.img}>
          <img src={`https://cdn.comento.kr/assignment/${img}`} alt={title} />
        </p>
        <div className={styles.text}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.contents}>{contents}</p>
        </div>
      </div>
    </li>
  );
};

export default Ad;
