import { BlogForm } from "./components/BlogForm";
import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [message, setMessage] = useState({ message: null, type: null });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.localStorage.getItem("loggedinUser") &&
      setUser(JSON.parse(window.localStorage.getItem("loggedinUser")));
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedinUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setMessage({ message: exception.response.data.error, type: "error" });
      setTimeout(() => {
        setMessage({ message: null, type: null });
      }, 5000);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username:{" "}
        <input
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
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const handleLogout = () => {
    window.localStorage.removeItem("loggedinUser");
    setUser(null);
  };

  const handleBlogCreation = async (blogObject) => {
    try {
      setVisible(false);
      const returnedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(returnedBlog));

      setMessage({
        message: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
        type: "success",
      });

      setTimeout(() => {
        setMessage({ message: null, type: null });
      }, 5000);
    } catch (exception) {
      setMessage({ message: exception.response.data.error, type: "error" });
      setTimeout(() => {
        setMessage({ message: null, type: null });
      }, 5000);
    }
  };
  const createBlogForm = () => (
    <BlogForm setVisible={setVisible} newBlog={handleBlogCreation} />
  );

  return (
    <div>
      {user === null ? (
        <>
          <h2>log in to application</h2>
          <Notification message={message.message} type={message.type} />
          {loginForm()}
        </>
      ) : (
        <>
          <h2>blogs</h2>
          <Notification message={message.message} type={message.type} />
          <span>{user.name} logged in </span>
          <button onClick={handleLogout}>logout</button>
          {visible ? (
            createBlogForm()
          ) : (
            <div style={{ marginTop: 25, marginBottom: 10 }}>
              <button
                onClick={() => {
                  setVisible(true);
                }}
              >
                create new blog
              </button>
            </div>
          )}
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
