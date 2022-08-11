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
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState({ message: null, type: null });

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

  const handleBlogCreation = async (event) => {
    event.preventDefault();
    try {
      const newBlog = {
        title,
        author,
        url,
      };
      const returnedBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(returnedBlog));

      setTitle("");
      setAuthor("");
      setUrl("");
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
    <form onSubmit={handleBlogCreation}>
      <div>
        title:{" "}
        <input
          type="text"
          name="title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
      </div>
      <div>
        author:{" "}
        <input
          type="text"
          name="author"
          value={author}
          onChange={(event) => {
            setAuthor(event.target.value);
          }}
        />
      </div>
      <div>
        url:{" "}
        <input
          type="text"
          name="url"
          value={url}
          onChange={(event) => {
            setUrl(event.target.value);
          }}
        />
      </div>
      <button type="submit">create</button>
    </form>
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
          {createBlogForm()}
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
