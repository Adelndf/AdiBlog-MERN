import * as api from "../../api";
import axios from "axios";

const API_URL = "http://localhost:5000/api/users/";

const register = async (userData) => {
  const res = await axios.post(API_URL + "register", userData);
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }
  return res.data;
};

const logout = async () => {
  localStorage.removeItem("user");
};

const login = async (userData) => {
  const res = await axios.post(API_URL + "login", userData);
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }
  return res.data;
};

const updateUser = async (newUserData, id) => {
  // api.updateUser(id, payload);
  const res = await axios.put(API_URL + id, newUserData);
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }
  return res.data;
};

const authService = {
  register,
  logout,
  login,
  updateUser,
};

export default authService;
