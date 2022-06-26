import "./Home.css";
import { PostForm, Post, UserInfo } from "../../components";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/posts");
        setAllPosts(data);
      } catch (err) {
        console.log(err);
      }
    };
    getPosts();
  }, [allPosts]);

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
            {allPosts.map((post) => (
              <Post post={post} key={post._id} />
            ))}
          </div>
          <div className="home__right">
            <UserInfo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
