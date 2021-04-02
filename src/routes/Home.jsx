import React, { useEffect, useState } from "react";
import Feed from "../components/Feed";

const Home = ({ api }) => {
  const [category, setCategory] = useState();
  const [categoryId, setCategoryId] = useState([]);
  const [feedInfo, setFeedInfo] = useState();

  useEffect(() => {
    api.getCategory().then((result) => {
      const category_id = result.map((result) => result.id);
      setCategory(result);
      setCategoryId(category_id);
    });
  }, []);

  useEffect(() => {
    if (categoryId) {
      api.getFeeds(categoryId).then((result) => setFeedInfo(result.data));
    }
  }, [categoryId]);
  return (
    <>
      Home
      <ul>
        {feedInfo &&
          feedInfo.map((info) => {
            return <Feed key={info.id} category={category} info={info} />;
          })}
      </ul>
    </>
  );
};

export default Home;
