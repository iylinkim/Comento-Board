import React from "react";

const Feed = ({ category, info }) => {
  const { category_id, id, user_id, created_at, title, content } = info;
  return (
    <li>
      <p>
        <strong>
          {category.filter((cate) => cate.id === category_id)[0].name}
        </strong>
        <span>{id}</span>
      </p>
      <p>
        <span>{user_id}</span>
        <span>{created_at}</span>
      </p>
      <h3>{title}</h3>
      <p>{content}</p>
    </li>
  );
};

export default Feed;
