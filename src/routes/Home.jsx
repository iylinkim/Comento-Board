import React, { useEffect, useState } from "react";
import Feed from "../components/Feed";
import Order from "../components/Order";
import styles from "style/home.module.css";
import Filter from "components/Filter";

const Home = ({ api }) => {
  const [category, setCategory] = useState();
  const [categoryId, setCategoryId] = useState([]);
  const [feedInfo, setFeedInfo] = useState();
  const [adInfo, setAdInfo] = useState();
  const [standard, setStandard] = useState(true);
  const [filter, setFilter] = useState([]);

  // const getMoreFeeds = () => {
  //   if (categoryId) {
  //     api.getFeeds(categoryId,).then((result) => setFeedInfo(result.data));
  //   }
  // }
  useEffect(() => {
    api.getCategory().then((result) => {
      const category_id = result.map((result) => result.id);
      setCategory(result);
      setCategoryId(category_id);
    });

    api.getAds().then((result) => setAdInfo(result));
  }, []);

  useEffect(() => {
    if (categoryId && adInfo) {
      api.getFeeds(categoryId, 10).then((result) => {
        adInfo.forEach((ad, index) => {
          if (index !== 0) {
            let position = 4 * index - 1;
            result.data.splice(position, 0, ad);
          }
        });
        setFeedInfo(result.data);

        if (standard) {
          const filtered = result.data.filter(
            (data) => data.category_id !== undefined
          );
        }

        //  standard
        //   ? setFeedInfo(result.data.sort((a, b) => a.id - b.id))
        //   : setFeedInfo(result.data.sort((a, b) => b.id - a.id));
      });
    }
  }, [categoryId, adInfo]);

  useEffect(() => {
    if (filter.length > 0 && feedInfo) {
      setFeedInfo((prev) => {
        return prev.filter((data) => filter.includes(data.category_id));
      });
    }
  }, [filter]);

  // window.addEventListener("scroll", () => {
  //   const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
  //   if (scrollTop + clientHeight > scrollHeight - 5) {
  //     // setTimeout(console.log('scroll bottom'), 2000);
  //     // this.getContents();
  //     if (categoryId) {
  //       api.getFeeds(categoryId,20).then((result) => setFeedInfo([...feedInfo, result.data]));
  //     }
  //     // getMoreFeeds();
  //   }
  // });

  return (
    <div className={styles.home}>
      <button className={styles.login}>로그인</button>
      <div className={styles.contents}>
        <Order setStandard={setStandard} />
        <Filter category={category} setFilter={setFilter} />
        <ul className={styles.feeds}>
          {feedInfo &&
            feedInfo.map((info) => {
              return (
                <Feed key={info.id} category={category} info={info} api={api} />
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default Home;
