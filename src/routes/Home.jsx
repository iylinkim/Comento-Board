import React, { useEffect, useRef, useState } from "react";
import Feed from "../components/Feed";
import Order from "../components/Order";
import styles from "style/home.module.css";
import Filter from "components/Filter";
import { v4 as uuidv4 } from "uuid";
import Ad from "components/Ad";

const Home = ({ api }) => {
  const [category, setCategory] = useState();
  const [categoryId, setCategoryId] = useState([]);
  const [feedInfo, setFeedInfo] = useState();
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
  }, []);

  useEffect(() => {
    if (categoryId.length > 0) {
      api.getFeeds(categoryId, 10).then((result) => {
        setFeedInfo(result.data.sort((a, b) => a.id - b.id));
      });
    }
  }, [categoryId]);

  useEffect(() => {
    if (feedInfo) {
      standard
        ? setFeedInfo(feedInfo.sort((a, b) => a.id - b.id))
        : setFeedInfo(feedInfo.sort((a, b) => b.id - a.id));
    }

    console.log(feedInfo && feedInfo.map(info => info.id))
  }, [standard]);

  useEffect(() => {
    if (filter.length > 0 && feedInfo) {
      setFeedInfo((prev) => {
        return prev.filter((data) => filter.includes(data.category_id));
      });
    }
  }, [filter]);

  const getNextData = async () => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight > scrollHeight - 5) {
      if (categoryId && feedInfo) {
        if (categoryId.length > 0) {
          await api
            .getFeeds(categoryId, feedInfo.length + 10)
            .then((result) => {
              setFeedInfo((prev) =>
                [
                  ...prev,
                  ...result.data.filter(
                    (data) => data.id > prev.length + 10 - prev.length
                  ),
                ].slice(0, prev.length + 10)
              );
            });
        }
      }
    }
  };

  const throttle = (callback, time) => {
    let throttleCheck;
    return function () {
      if (!throttleCheck) {
        throttleCheck = setTimeout(() => {
          callback(...arguments);
          throttleCheck = false;
        }, time);
      }
    };
  };

  window.addEventListener("scroll", throttle(getNextData, 600));

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
                if ((index + 1) % 4 === 0 && adInfo[index]) {
                  return <Ad key={uuidv4()} adInfo={adInfo[index - 3]} />;
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
        </div>
      </div>
      <p className={styles.loading}></p>
    </>
  );
};

export default Home;
