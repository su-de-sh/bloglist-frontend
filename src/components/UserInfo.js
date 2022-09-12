import React from "react";
import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { setUsers } from "../reducers/userReducer";
export function UserInfo({ handleLogout }) {
  const user = useSelector((state) => state.user);
  if (!user) return null;
  return (
    <>
      {user.name} logged in <button onClick={handleLogout}>logout</button>
    </>
  );
}
