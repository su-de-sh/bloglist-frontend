import React from "react";
import { UserInfo } from "./UserInfo";

const UserDetails = ({ user, handleLogout }) => {
  if (!user) return null;
  return (
    <div>
      <UserInfo handleLogout={handleLogout} />
      <h1>{user.name}</h1>
      <strong>added blogs</strong>
      {user.blogs && (
        <ul>
          {user.blogs.map((blog, index) => (
            <li key={index}>{blog.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserDetails;
