import React from "react";
import { useSelector } from "react-redux";
import { UserInfo } from "./UserInfo";

const User = ({ handleLogout }) => {
  const blogs = useSelector((state) => state.blogs);
  const userMap = {};
  blogs.forEach((blog) => {
    if (userMap[blog.user.name]) {
      userMap[blog.user.name] += 1;
    } else {
      userMap[blog.user.name] = 1;
    }
  });

  console.log(userMap);
  return (
    <div>
      <UserInfo handleLogout={handleLogout} />

      <table>
        <thead>
          <tr>
            <td>
              <h1>Users</h1>
            </td>
            <td>
              <strong>blogs created</strong>
            </td>
          </tr>
        </thead>
        <tbody>
          {Object.keys(userMap).map((user, index) => {
            return (
              <tr key={index}>
                <td>{user}</td>
                <td>{userMap[user]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default User;
