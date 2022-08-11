import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newBlog) => {
  const token = JSON.parse(window.localStorage.getItem("loggedinUser")).token;
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };

  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

// eslint-disable-next-line
export default { getAll, create };
