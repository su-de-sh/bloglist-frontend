import axios from "axios";
import React, { useEffect, useState } from "react";
// import { UserInfo } from "./UserInfo";

const BlogDetail = ({ blog, updateLike }) => {
  if (!blog) return null;

  const [comments, setComments] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/blogs/${blog.id}/comments`)
      .then((result) => {
        setComments(result.data);
      });
  }, []);
  const increaseLike = (id) => {
    // console.log("id", id);
    updateLike(id, blog.likes + 1);
  };

  // const comments = ["first comment", "second comments"];
  const handleComment = async (event) => {
    event.preventDefault();
    const comment = event.target.comment.value;

    axios
      .post(`http://localhost:3001/api/blogs/${blog.id}/comments`, { comment })
      .then((result) => {
        setComments([...comments, result.data]);
      });
    event.target.comment.value = "";
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
      <div style={{ marginTop: "10px", marginBottom: "20px" }}>
        <strong>comments</strong>
        <form onSubmit={handleComment}>
          <input type="text" name="comment" />
          <button>add comment</button>
        </form>

        {comments &&
          comments.map((comment, index) => {
            return <li key={index}>{comment.comment}</li>;
          })}
      </div>
    </div>
  );
};

export default BlogDetail;
