import React from "react";

const Feed = ({ category, info }) => {
  const { category_id, id, user_id, created_at, title, contents } = info;
  return (
    <li>
      {info.img && <p>sponsored</p>}
      {info.img && (
        <p>
          <img src={`https://cdn.comento.kr/assignment/${info.img}`} alt="" />
        </p>
      )}
      {!info.img && (
        <>
          <p>
            {/* <strong>
              {category.filter((cate) => cate.id === category_id)[0].name}
            </strong> */}
            <span>{id}</span>
          </p>
          <p>
            <span>{user_id}</span>
            <span>{created_at}</span>
          </p>
        </>
      )}

      <h3>{title}</h3>
      <p>{contents}</p>
    </li>
  );
};

export default Feed;
