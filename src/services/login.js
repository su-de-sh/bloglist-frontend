import axios from "axios";
const baseUrl = "/api/login";

const login = async ({ username, password }) => {
  console.log("username: ", username);
  const response = await axios.post(baseUrl, {
    username,
    password,
  });
  return response.data;
};
//eslint-disable-next-line
export default { login };
