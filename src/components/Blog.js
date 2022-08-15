import { useState } from "react";
const Blog = ({ blog, updateLike, user }) => {
  const [view, setView] = useState(false);

  const increaseLike = (id) => {
    updateLike(id, blog.likes + 1);
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

  return (
    <>
      {!view ? (
        <div style={blogSytle}>
          {blog.title} <button onClick={toggleView}>view</button>
        </div>
      ) : (
        <div style={blogSytle}>
          {blog.title} <button onClick={toggleView}>hide</button>
          <div>{blog.url}</div>
          <div>
            likes:{blog.likes}{" "}
            <button onClick={() => increaseLike(blog.id)}>like</button>
          </div>
          <div>{blog.author}</div>
          {blog.user.id === user.id ? (
            <button style={{ backgroundColor: "blue" }}>delete</button>
          ) : null}
        </div>
      )}
    </>
  );
};

export default Blog;
