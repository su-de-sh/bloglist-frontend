import BlogForm from "./components/BlogForm";
import { useState, useEffect } from "react";
import Blog from "./components/Blog";
// import blogService from "./services/blogs";
import loginService from "./services/login";
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
import { Route, Routes } from "react-router-dom";
import User from "./components/User";
import { UserInfo } from "./components/UserInfo";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  // console.log(blogs);
  // const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [user, setUser] = useState(null);
  const user = useSelector((state) => state.user);
  // console.log(user);

  // const [message, setMessage] = useState({ message: null, type: null });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const user = window.localStorage.getItem("loggedinUser");
    dispatch(setUsers(JSON.parse(user)));
    // blogService.getAll().then((blogs) => setBlogs(blogs));
    dispatch(initializeBlogs());
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedinUser", JSON.stringify(user));
      // console.log(user);
      // setUser(user);
      dispatch(setUsers(user));
      setUsername("");
      setPassword("");
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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username:{" "}
        <input
          id="username"
          type="text"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
      </div>
      <div>
        password:{" "}
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  );

  const handleLogout = () => {
    window.localStorage.removeItem("loggedinUser");
    dispatch(setUsers(null));
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
    loginForm,
    handleLogout,
    visible,
    createBlogForm,
    setVisible,
    sortedBlogs,
    updateLike,
    deleteBlog,
  }) {
    return (
      <div>
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
      </div>
    );
  }
  return (
    <div>
      <Routes>
        <Route path="/users" element={<User />} />
        <Route
          path="/"
          element={
            <Home
              user={user}
              loginForm={loginForm}
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
    </div>
  );
};

export default App;
