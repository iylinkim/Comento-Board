import React, { useEffect, useState } from "react";
import Feed from "../components/Feed";
import Order from "../components/Order";
import styles from "style/home.module.css";
import Filter from "components/Filter";
import { v4 as uuidv4 } from "uuid";
import Ad from "components/Ad";
import _ from "lodash";

const Home = ({ api }) => {
  const [category, setCategory] = useState();
  const [categoryId, setCategoryId] = useState([]);
  const [feedInfo, setFeedInfo] = useState();
  const [filteredInfo, setFilteredInfo] = useState();
  const [adInfo, setAdInfo] = useState();
  const [standard, setStandard] = useState(true);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    api.getCategory().then((result) => {
      const category_id = result.map((result) => result.id);
      setCategory(result);
      setCategoryId(category_id);
    });

    api.getAds().then((result) => setAdInfo(result));
  }, [api]);

  useEffect(() => {
    if (categoryId.length > 0) {
      api.getFeeds(categoryId, 10).then((result) => {
        setFeedInfo(result.data.sort((a, b) => a.id - b.id));
      });
    }
  }, [categoryId, api]);

  useEffect(() => {
    if (feedInfo) {
      standard
        ? setFeedInfo((prev) => prev.sort((a, b) => b.id - a.id))
        : setFeedInfo((prev) => prev.sort((a, b) => a.id - b.id));
    }
  }, [standard, feedInfo]);

  useEffect(() => {
    if (filter.length > 0 && feedInfo) {
      setFeedInfo((prev) => {
        return prev.filter((data) => filter.includes(data.category_id));
      });
    }
  }, [filter, feedInfo]);

  const getNextData = async () => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    //scroll이 바닥에 닿았을 때
    if (scrollTop + clientHeight > scrollHeight - 5) {
    if (categoryId && feedInfo) {
      if (categoryId.length > 0) {
        await api.getFeeds(categoryId, feedInfo.length + 10).then((result) => {
          setFeedInfo((prev) => [
            ...prev,
            ...result.data.filter((data) => data.id > prev.length),
          ]);
        });
      }
    }
     }
  };

  window.addEventListener("scroll", _.throttle(getNextData, 700));

  return (
    <>
      <div className={styles.home}>
        <button className={styles.login}>로그인</button>
        <div className={styles.contents}>
          <Order standard={standard} setStandard={setStandard} />
          <Filter category={category} setFilter={setFilter} />
          <ul className={styles.feeds}>
            {feedInfo &&
              feedInfo.map((info, index) => {
                let num = 0;
                if ((index + 1) % 4 === 0) {
                  if (!adInfo[num] || adInfo[num] === undefined) {
                    num = 0;
                  } else {
                    num = index - 3;
                  }
                  if (adInfo[(num += 1)] !== undefined && adInfo[(num += 1)]) {
                    return <Ad key={uuidv4()} adInfo={adInfo[(num += 1)]} />;
                  }
                }
                return (
                  <Feed
                    key={uuidv4()}
                    category={category}
                    info={info}
                    api={api}
                  />
                );
              })}
          </ul>
          <ul></ul>
        </div>
      </div>
      <p className={styles.loading}></p>
    </>
  );
};

export default Home;
