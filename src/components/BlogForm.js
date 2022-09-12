import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { Button, TextField } from "@mui/material";
const BlogForm = ({ newBlog, setVisible }) => {
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
    <div style={{ marginBottom: "20px" }}>
      <h2>create new</h2>
      <form onSubmit={handleBlogCreation}>
        <div>
          <TextField
            style={{ marginTop: "20px", display: "block" }}
            size="small"
            type="text"
            name="title"
            value={title}
            id="title"
            label="title"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div>
          <TextField
            style={{ marginTop: "20px", display: "block" }}
            size="small"
            type="text"
            name="author"
            value={author}
            id="author"
            label="author"
            onChange={(event) => {
              setAuthor(event.target.value);
            }}
          />
        </div>
        <div>
          <TextField
            style={{ marginTop: "20px", display: "block" }}
            size="small"
            type="text"
            name="url"
            value={url}
            id="url"
            label="url"
            onChange={(event) => {
              setUrl(event.target.value);
            }}
          />
        </div>
        <div style={{ marginTop: "20px", display: "block" }}>
          <Button variant="contained" id="create" type="submit">
            create
          </Button>
          <Button onClick={() => setVisible(false)}>cancel</Button>
        </div>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  newBlog: PropTypes.func.isRequired,
  setVisible: PropTypes.func.isRequired,
};

export default BlogForm;
