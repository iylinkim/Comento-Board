import React from "react";
import { useHistory } from "react-router";
import styles from "style/filteredFeed.module.css";

const FilteredFeed = ({ info, category }) => {
  const { id, user_id, created_at, title, contents, category_id } = info;
  const history = useHistory();

  const onClick = () => {
    history.push(`/${id}`);
  };

  return (
    <li onClick={onClick} className={styles.feed}>
      <div className={info.img ? styles.body : ""}>
        <>
          <p className={styles.category}>
            {category.filter((cate) => cate.id === category_id)[0].name}
            <span className={styles.id}>{id}</span>
          </p>
          <p className={styles.user_date}>
            <span className={styles.user_id}>{user_id}</span>
            <span className={styles.date}>{created_at.split("T")[0]}</span>
          </p>
        </>
        <div className={styles.text}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.contents}>{contents}</p>
        </div>
      </div>
    </li>
  );
};

export default FilteredFeed;
