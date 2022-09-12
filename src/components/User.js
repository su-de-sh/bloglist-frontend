import React from "react";

import { Link } from "react-router-dom";
import { UserInfo } from "./UserInfo";

const User = ({ handleLogout, userList }) => {
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
          {userList.map((user, index) => {
            return (
              <tr key={index}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  // const blogs = useSelector((state) => state.blogs);
  // const userMap = {};
  // blogs.forEach((blog) => {
  //   if (userMap[blog.user.name]) {
  //     userMap[blog.user.name] += 1;
  //   } else {
  //     userMap[blog.user.name] = 1;
  //   }
  // });

  // console.log(userList);

  // return (
  //   <div>
  //     <UserInfo handleLogout={handleLogout} />

  //     <table>
  //       <thead>
  //         <tr>
  //           <td>
  //             <h1>Users</h1>
  //           </td>
  //           <td>
  //             <strong>blogs created</strong>
  //           </td>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {Object.keys(userMap).map((user, index) => {
  //           return (
  //             <tr key={index}>
  //               <td>
  //                 <Link to="/userid">{user}</Link>
  //               </td>
  //               <td>{userMap[user]}</td>
  //             </tr>
  //           );
  //         })}
  //       </tbody>
  //     </table>
  //   </div>
  // );
};

export default User;
