import { useState } from "react";
const Blog = ({ blog, updateLike, user, removeBlog }) => {
  const [view, setView] = useState(false);

  const increaseLike = (id) => {
    updateLike(id, blog.likes + 1);
  };

  const deleteBlog = async (id) => {
    removeBlog(id);
  };

  const toggleView = () => {
    setView(!view);
  };
  const blogSytle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    paddingRight: 2,
    border: "solid",
    borderWidth: 3,
    borderRadius: 20,
    borderColor: "grey",
    marginBottom: 5,
  };
  console.log(blog);
  return (
    <>
      {!view ? (
        <div className="blog" style={blogSytle}>
          {blog.title} {blog.author}
          <button className="view" id="view" onClick={toggleView}>
            view
          </button>
        </div>
      ) : (
        <div className="blog" style={blogSytle}>
          {blog.title}{" "}
          <button id="hide" onClick={toggleView}>
            hide
          </button>
          <div id="url">{blog.url}</div>
          <div id="likes">
            likes:{blog.likes}{" "}
            <button id="likeButton" onClick={() => increaseLike(blog.id)}>
              like
            </button>
          </div>
          <div>{blog.author}</div>
          {blog.user === user.id || blog.user.id ? (
            <button
              id="remove"
              style={{ backgroundColor: "blue" }}
              onClick={() => deleteBlog(blog.id)}
            >
              remove
            </button>
          ) : null}
        </div>
      )}
    </>
  );
};

export default Blog;
