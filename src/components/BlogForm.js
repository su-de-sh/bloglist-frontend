import React from "react";
export function BlogForm({
  handleBlogCreation,
  title,
  event,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
  setVisible,
}) {
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
