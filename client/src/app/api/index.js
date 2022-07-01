import axios from "axios";

const URL = "http://localhost:5000/api";

export const fetchPosts = () => axios.get(`${URL}/posts`);
export const fetchUsers = () => axios.get(`${URL}/users`);
export const fetchUserById = (id) => axios.get(`${URL}/users/${id}`);
export const updateUser = (id, payload) =>
  axios.put(`${URL}/users/${id}`, payload);
