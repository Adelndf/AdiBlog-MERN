import "./Home.css";
import { PostForm, Post, UserInfo } from "../../components";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  const getPosts = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/posts");
      setPosts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getUsers = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/users");
      setUsers(data.slice(0, 5));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="home">
      <div className="maxWidthScreen">
        <PostForm />
        <div className="home__feed">
          <div className="home__left">
            <h1>
              Explore
              <span> Adi</span>
              <span>Blog </span>
            </h1>
            {posts.map((post) => (
              <Post post={post} key={post._id} />
            ))}
          </div>
          <div className="home__right">
            <div className="home__users">
              <h3>Recent 5 users, Welcome..</h3>
              <div className="home__users-container">
                {users.map((user, i) => (
                  <div className="home__user" key={user._id}>
                    <span>
                      <span className="home__user-index">{i + 1}</span>
                      {user.username}
                    </span>
                    <span>{moment(new Date(user.createdAt)).fromNow()}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="home__userInfo">
              <UserInfo />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
