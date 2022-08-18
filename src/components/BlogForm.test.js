import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("<BlogForm /> updates parent state and calls onSubmit", async () => {
  const createBlog = jest.fn();
  const setVisible = jest.fn();
  const user = userEvent.setup();

  render(<BlogForm setvisible={setVisible} newBlog={createBlog} />);

  const title = screen.getByPlaceholderText("title");
  const author = screen.getByPlaceholderText("author");
  const url = screen.getByPlaceholderText("url");

  const createButton = screen.getByText("create");

  await user.type(title, "test Blog");
  await user.type(author, "sudesh");
  await user.type(url, "sudesh.com");
  await user.click(createButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("test Blog");
});
