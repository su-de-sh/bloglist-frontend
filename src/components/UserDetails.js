import React from "react";

const UserDetails = ({ user }) => {
  return (
    <div>
      {user.name}
      <div>{user.username}</div>
      {user.blogs.length &&
        user.blogs.map((blog, index) => <div key={index}>{blog.title}</div>)}
    </div>
  );
};

export default UserDetails;
