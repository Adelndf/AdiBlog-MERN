import * as api from "../../api";

const getUsers = async () => {
  const { data } = await api.fetchUsers();
  return data.slice(0, 5);
};

const usersService = {
  getUsers,
};
export default usersService;
