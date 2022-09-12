import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { setUsers } from "../reducers/userReducer";
export function UserInfo({ handleLogout }) {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <h2>blogs</h2>

      <div>
        {" "}
        <Link to="/users">{user.name}</Link> logged in{" "}
      </div>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
}
