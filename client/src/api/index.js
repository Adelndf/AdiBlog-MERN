import axios from "axios";

const url = "http://localhost:5000/api";

export const getAllPosts = () => axios.get(`${url}/posts`);
export const createPost = () => axios.post(`${url}/posts`);
