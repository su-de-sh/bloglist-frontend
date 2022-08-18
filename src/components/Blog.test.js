import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
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
