import React from "react";
import { UserInfo } from "./UserInfo";

const User = ({ handleLogout }) => {
  return (
    <div>
      <UserInfo handleLogout={handleLogout} />
    </div>
  );
};

export default User;
