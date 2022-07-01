import * as api from "../../api";

const getPosts = async () => {
  const { data } = await api.fetchPosts();
  return data;
};

const postsService = {
  getPosts,
};
export default postsService;
