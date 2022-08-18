import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("renders blog", () => {
  const blog = {
    title: "Some Blogs",
    author: "Robert Cmpe",
    url: "https://reacttesting.com/",
    likes: 0,
  };

  const { container } = render(<Blog blog={blog} />);
  const div = container.querySelector(".blog");

  expect(div).toHaveTextContent("Some Blogs");
  expect(div).toHaveTextContent("Robert Cmpe");
});

test("clicking the button calls event handler once", async () => {
  const blog = {
    title: "Some Blogs",
    author: "Robert Cmpe",
    url: "https://reacttesting.com/",
    likes: 0,
    user: {
      username: "Robert Cmpe",
      name: "Robert Cmpe",
      id: "5e9f8f8f8f8f8f8f8f8f8f8",
    },
  };

  const User = {
    username: "Robert Cmpe",
    name: "Robert Cmpe",
    id: "5e9f8f8f8f8f8f8f8f8f8f8",
  };

  const mockHandler = jest.fn();

  const { container } = render(<Blog blog={blog} user={User} />);

  const user = userEvent.setup();
  const button = container.querySelector(".view");

  await user.click(button);

  const url = container.querySelector("#url");

  const likes = container.querySelector("#likes");
  expect(url).toHaveTextContent("https://reacttesting.com/");
  expect(likes).toHaveTextContent("likes:0");
});
