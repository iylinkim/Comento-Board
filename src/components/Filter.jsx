import React, {useRef, useState } from "react";
import styles from "style/filter.module.css";

const Filter = ({ category, setFilter }) => {
  const [popup, setPopup] = useState(false);

  const onClick = () => {
    setPopup(true);
  };

  const filterRef = useRef([]);

  const closePopup = () => {
    setPopup(false);
  };

  const saveFilter = () => {
    const checkbox = Array.from(filterRef.current.querySelectorAll("input"));
    const checked = checkbox
      .filter((chk) => chk.checked)
      .map((chk) => parseInt(chk.name));

    setFilter(checked);
    setPopup(false);
  };


  const toggleCheck = (e) => {
   e.target.removeAttribute("checked")
  };


  return (
    <>
      <button className={styles.filter_button} onClick={onClick}>
        필터
      </button>
      {popup && (
        <div className={styles.background}>
          <div ref={filterRef} className={styles.popup}>
            <span className={styles.close} onClick={closePopup}>
              X
            </span>
            <p className={styles.title}>필터</p>
            {category &&
              category.map((cate) => {
                return (
                  <p key={cate.id} className={styles.category}>
                    <input
                      onChange={toggleCheck}
                      type="checkbox"
                      name={cate.id}
                      className={styles.checkbox}
                    />
                    <label>{cate.name}</label>
                  </p>
                );
              })}
            <button onClick={saveFilter} className={styles.save_button}>
              저장하기
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Filter;
