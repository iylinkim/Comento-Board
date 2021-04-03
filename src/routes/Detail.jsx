import React, { useEffect, useState } from "react";
import { Route, useParams } from "react-router";

const Detail = ({ api }) => {
  const [detailInfo, setDetailInfo] = useState();
  const path = useParams();
  console.log(path.id);

  useEffect(() => {
    api.getDetail(path.id).then((result) => setDetailInfo(result));
  }, []);
  return (
    <>
      <div>
        <h3>{detailInfo && detailInfo.title}</h3>
        <p>{detailInfo && detailInfo.contents}</p>
      </div>
      <p>답변 {detailInfo && detailInfo.reply.length}</p>
      <ul>
        {detailInfo &&
          detailInfo.reply.map((repl) => {
            return (
              <li>
                <p>{repl.user.name}</p>
                <p>{repl.contents}</p>
                <p>{repl.created_at}</p>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default Detail;
