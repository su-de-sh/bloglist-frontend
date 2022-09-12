import React from "react";
// import { UserInfo } from "./UserInfo";

const BlogDetail = ({ blog, updateLike }) => {
  const increaseLike = (id) => {
    // console.log("id", id);
    updateLike(id, blog.likes + 1);
  };
  return (
    <div>
      {/* <UserInfo handleLogout={handleLogout} /> */}
      <h1>{blog.title}</h1>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes{" "}
        <button
          onClick={() => {
            increaseLike(blog.id);
          }}
        >
          like
        </button>
      </div>
      added by {blog.author}
    </div>
  );
};

export default BlogDetail;
