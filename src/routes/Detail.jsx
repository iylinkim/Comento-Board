import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styles from "style/detail.module.css";

const Detail = ({ api }) => {
  const [detailInfo, setDetailInfo] = useState();
  const path = useParams();

  useEffect(() => {
    api.getDetail(path.id).then((result) => setDetailInfo(result));
  }, []);
  return (
    <>
      <div className={styles.detail}>
        <h3 className={styles.title}>{detailInfo && detailInfo.title}</h3>
        <p className={styles.contents}>{detailInfo && detailInfo.contents}</p>
        <p className={styles.date}>
          {detailInfo && detailInfo.created_at.split("T")[0]}
        </p>
      </div>
      <p className={styles.reply_title}>
        답변
        <span className={styles.reply_count}>
          {detailInfo && detailInfo.reply.length}
        </span>
      </p>
      <ul className={styles.replies}>
        {detailInfo &&
          detailInfo.reply.map((repl) => {
            return (
              <li className={styles.reply}>
                <p className={styles.reply_username}>{repl.user.name}</p>
                <p className={styles.reply_contents}>{repl.contents}</p>
                <p className={styles.reply_date}>
                  {repl.created_at.split("T")[0]}
                </p>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default Detail;
