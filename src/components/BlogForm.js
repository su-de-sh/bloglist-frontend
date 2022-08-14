import React from "react";
import { useState } from "react";
export function BlogForm({ newBlog, setVisible }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleBlogCreation = (event) => {
    event.preventDefault();

    setTitle("");
    setAuthor("");
    setUrl("");
    newBlog({
      title,
      author,
      url,
    });
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleBlogCreation}>
        <div>
          title:{" "}
          <input
            type="text"
            name="title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div>
          author:{" "}
          <input
            type="text"
            name="author"
            value={author}
            onChange={(event) => {
              setAuthor(event.target.value);
            }}
          />
        </div>
        <div>
          url:{" "}
          <input
            type="text"
            name="url"
            value={url}
            onChange={(event) => {
              setUrl(event.target.value);
            }}
          />
        </div>
        <button type="submit">create</button>
      </form>
      <button onClick={() => setVisible(false)}>cancel</button>
    </>
  );
}
