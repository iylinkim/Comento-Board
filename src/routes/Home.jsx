import React, { useEffect, useState } from "react";
import Feed from "../components/Feed";
import Order from "../components/Order";
import styles from "style/home.module.css";
import Filter from "components/Filter";
import { v4 as uuidv4 } from "uuid";
import Ad from "components/Ad";
import _ from "lodash";
import FilteredFeed from "components/FilteredFeed";

const Home = ({ api }) => {
  const [category, setCategory] = useState();
  const [categoryId, setCategoryId] = useState([]);
  const [feedInfo, setFeedInfo] = useState();
  const [filteredInfo, setFilteredInfo] = useState();
  const [adInfo, setAdInfo] = useState();
  const [standard, setStandard] = useState(true);
  const [filter, setFilter] = useState([]);

  const ORDER = "order";
  const ls_order = localStorage.getItem(ORDER);

  useEffect(() => {
    api.getCategory().then((result) => {
      const category_id = result.map((result) => result.id);
      setCategory(result);
      setCategoryId(category_id);
    });

    api.getAds().then((result) => setAdInfo(result));
  }, [api]);

  useEffect(() => {
    if (ls_order === null) {
      if (categoryId.length > 0) {
        api.getFeeds(categoryId, 10).then((result) => {
          setFeedInfo(result.data.sort((a, b) => a.id - b.id));
        });
      }
    } else if (ls_order !== null) {
      if (categoryId.length > 0) {
        api.getFeeds(categoryId, 10).then((result) => {
          if (ls_order === "asc") {
            setFeedInfo(result.data.sort((a, b) => a.id - b.id));
          } else if (ls_order === "desc") {
            setFeedInfo(result.data.sort((a, b) => b.id - a.id));
          }
         });
      }
    }
  }, [categoryId, api, ls_order]);

  useEffect(() => {
    if (feedInfo) {
      standard
        ? setFeedInfo(feedInfo.sort((a, b) => a.id - b.id))
        : setFeedInfo(feedInfo.sort((a, b) => b.id - a.id));
    }
  }, [standard, feedInfo]);

  useEffect(() => {
    if (filter.length > 0 && feedInfo) {
      setFilteredInfo(() => {
        return feedInfo.filter((data) => filter.includes(data.category_id));
      });
    }
  }, [filter, feedInfo]);

  const getNextData = async () => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    //scroll이 바닥에 닿았을 때
    if (scrollTop + clientHeight > scrollHeight - 5) {
      if (categoryId && feedInfo) {
        if (categoryId.length > 0) {
          await api
            .getFeeds(categoryId, feedInfo.length + 10)
            .then((result) => {
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

  const toggleAd = (e) => {
    if (e.target.tagName === "INPUT") {
      e.target.checked
        ? setAdInfo(null)
        : api.getAds().then((result) => setAdInfo(result));
    }
  };

  return (
    <>
      <div className={styles.home}>
        <button className={styles.login}>로그인</button>
        <div className={styles.contents}>
          <Order standard={standard} setStandard={setStandard} />
          <Filter category={category} setFilter={setFilter} />
          <p className={styles.toggleAd} onClick={toggleAd}>
            <input type="checkbox" />
            <label>광고 제외하고 보기</label>
          </p>
          {!filteredInfo && (
            <ul className={styles.feeds}>
              {feedInfo &&
                feedInfo.map((info, index) => {
                  let num = 0;
                  // 4번째 슬라이드마다 광고 삽입
                  if (adInfo && (index + 1) % 4 === 0) {
                    num = index - 3;
                    if (num > adInfo.length) num = 0;
                    if (adInfo[(num +1)]) {
                      return <Ad key={uuidv4()} adInfo={adInfo[(num +1)]} />;
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
          )}
          {filteredInfo && (
            <ul className={styles.filtered}>
              {filteredInfo.map((info) => {
                return (
                  <FilteredFeed
                    key={uuidv4()}
                    category={category}
                    info={info}
                  />
                );
              })}
            </ul>
          )}
        </div>
      </div>
      <p className={styles.loading}></p>
    </>
  );
};

export default Home;
