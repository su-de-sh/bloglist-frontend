import BlogForm from "./components/BlogForm";
import { useState, useEffect } from "react";
import Blog from "./components/Blog";
// import blogService from "./services/blogs";
import loginService from "./services/login";
import userListService from "./services/users";
import Notification from "./components/Notification";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import {
  createBlogs,
  deleteBlogs,
  initializeBlogs,
  updateLikes,
} from "./reducers/blogReducer";
import { setUsers } from "./reducers/userReducer";
import { Link, Route, Routes, useMatch, useNavigate } from "react-router-dom";
import User from "./components/User";
import { UserInfo } from "./components/UserInfo";
import UserDetails from "./components/UserDetails";
import BlogDetail from "./components/BlogDetail";
import { Button, Container, TextField } from "@mui/material";
import React from "react";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  // console.log(blogs);
  // const [blogs, setBlogs] = useState([]);
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // // const [user, setUser] = useState(null);
  const user = useSelector((state) => state.user);
  // console.log(user);

  // const [message, setMessage] = useState({ message: null, type: null });
  const [visible, setVisible] = useState(false);

  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = window.localStorage.getItem("loggedinUser");
    dispatch(setUsers(JSON.parse(user)));
    // blogService.getAll().then((blogs) => setBlogs(blogs));
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    userListService.getAll().then((result) => {
      setUserList(result);
    });
  }, []);
  const matchUser = useMatch("/users/:id");
  const oneUSer = matchUser
    ? userList.find((user) => {
        return user.id === matchUser.params.id;
      })
    : null;

  const matchBlog = useMatch("/blogs/:id");
  const oneBlog = matchBlog
    ? blogs.find((blog) => blog.id === matchBlog.params.id)
    : null;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedinUser", JSON.stringify(user));
      // console.log(user);
      // setUser(user);
      dispatch(setUsers(user));
      // setUsername("");
      // setPassword("");
    } catch (exception) {
      dispatch(
        setNotification({
          message: exception.response.data.error,
          type: "error",
        })
      );
      setTimeout(() => {
        dispatch(
          setNotification({
            message: null,
            type: null,
          })
        );
      }, 5000);
    }
  };

  const LoginForm = () => (
    <form onSubmit={handleLogin}>
      <TextField
        style={{ marginTop: "20px", display: "block" }}
        size="small"
        id="username"
        type="text"
        name="username"
        label="username"
        // value={username}

        // onChange={(event) => {
        //   console.log(event.target.value);
        //   setUsername(event.target.value);
        // }}
      />

      <TextField
        style={{ marginTop: "20px", display: "block" }}
        size="small"
        label="password"
        id="password"
        type="password"
        name="password"
        // value={password}
        // onChange={(event) => {
        //   setPassword(event.target.value);
        // }}
      />

      <Button
        style={{ marginTop: "20px" }}
        variant="contained"
        id="login-button"
        type="submit"
      >
        login
      </Button>
    </form>
  );

  const handleLogout = () => {
    window.localStorage.removeItem("loggedinUser");
    dispatch(setUsers(null));
    navigate("/");
  };

  const handleBlogCreation = async (blogObject) => {
    try {
      setVisible(false);

      dispatch(createBlogs(blogObject));

      setTimeout(() => {
        dispatch(
          setNotification({
            message: null,
            type: null,
          })
        );
      }, 2000);
    } catch (exception) {
      dispatch(
        setNotification({
          message: exception.response.data.error,
          type: "error",
        })
      );
      setTimeout(() => {
        dispatch(setNotification({ message: null, type: null }));
      }, 2000);
    }
  };

  const updateLike = async (id, updatedLikes) => {
    // console.log("updated blog", id, newBlogObject);
    try {
      const blogToUpdate = blogs.find((blog) => blog.id === id);
      const newBlogObject = {
        likes: updatedLikes,
        author: blogToUpdate.author,
        title: blogToUpdate.title,
        url: blogToUpdate.url,
      };
      // console.log("updated blog", id, newBlogObject);
      // const response = await blogService.update(id, newBlogObject);

      // setBlogs(blogs.map((blog) => (blog.id === id ? response : blog)));
      dispatch(updateLikes(id, newBlogObject));
    } catch (exception) {
      dispatch(
        setNotification({
          message: exception.response.data.error,
          type: "error",
        })
      );
      setTimeout(() => {
        dispatch(setNotification({ message: null, type: null }));
      }, 2000);
    }
  };

  const deleteBlog = async (id) => {
    const blogToRemove = blogs.find((blog) => blog.id === id);
    const ok = window.confirm(
      `Remove blog ${blogToRemove.title} by ${blogToRemove.author}?`
    );

    if (ok) {
      dispatch(deleteBlogs(id));

      dispatch(
        setNotification({
          message: `blog ${blogToRemove.title} by ${blogToRemove.author} removed`,
          type: "error",
        })
      );
      setTimeout(() => {
        dispatch(setNotification({ message: null, type: null }));
      }, 2000);
    }
  };

  const createBlogForm = () => (
    <BlogForm setVisible={setVisible} newBlog={handleBlogCreation} />
  );

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  function Home({
    user,
    // loginForm,

    visible,
    createBlogForm,
    setVisible,
    sortedBlogs,
    updateLike,
    deleteBlog,
  }) {
    return (
      <div>
        {user === null ? (
          <>
            <h2>log in to application</h2>

            {/* {loginForm()} */}
            <LoginForm />
          </>
        ) : (
          <>
            <h1>blog app</h1>

            {visible ? (
              createBlogForm()
            ) : (
              <div
                style={{
                  marginTop: 25,
                  marginBottom: 10,
                }}
              >
                <button
                  onClick={() => {
                    setVisible(true);
                  }}
                >
                  create new blog
                </button>
              </div>
            )}
            {sortedBlogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                updateLike={updateLike}
                removeBlog={deleteBlog}
                user={user}
              />
            ))}
          </>
        )}
      </div>
    );
  }
  const padding = {
    padding: 5,
  };
  return (
    <Container>
      <Notification />
      <div style={{ backgroundColor: "#add8e6", padding: "8px" }}>
        <Link style={padding} to="/">
          blogs
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
        <UserInfo handleLogout={handleLogout} />
      </div>
      <Routes>
        <Route
          path="/users"
          element={<User handleLogout={handleLogout} userList={userList} />}
        />
        <Route
          path="/users/:id"
          element={<UserDetails user={oneUSer} handleLogout={handleLogout} />}
        />
        <Route
          path="/blogs/:id"
          element={
            <BlogDetail
              blog={oneBlog}
              updateLike={updateLike}
              handleLogout={handleLogout}
            />
          }
        />
        <Route
          path="/"
          element={
            <Home
              user={user}
              // loginForm={loginForm}
              handleLogout={handleLogout}
              visible={visible}
              createBlogForm={createBlogForm}
              setVisible={setVisible}
              sortedBlogs={sortedBlogs}
              updateLike={updateLike}
              deleteBlog={deleteBlog}
            />
          }
        ></Route>
      </Routes>
      {/* <div>
        <Notification />
        {user === null ? (
          <>
            <h2>log in to application</h2>

            {loginForm()}
          </>
        ) : (
          <>
            <UserInfo handleLogout={handleLogout} />
            {visible ? (
              createBlogForm()
            ) : (
              <div
                style={{
                  marginTop: 25,
                  marginBottom: 10,
                }}
              >
                <button
                  onClick={() => {
                    setVisible(true);
                  }}
                >
                  create new blog
                </button>
              </div>
            )}
            {sortedBlogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                updateLike={updateLike}
                removeBlog={deleteBlog}
                user={user}
              />
            ))}
          </>
        )}
      </div> */}
    </Container>
  );
};

export default App;
