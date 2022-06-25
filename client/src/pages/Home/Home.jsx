import "./Home.css";
import { PostForm, Feed } from "../../components";
import { useEffect, useState } from "react";
import axios from "axios";
import { getAllPosts } from "../../api";

const Home = () => {
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const { data } = await getAllPosts();
      setAllPosts(data);
    };
    getPosts();
  }, [allPosts]);

  return (
    <div className="home">
      <div className="maxWidthScreen">
        <PostForm />
        <Feed allPosts={allPosts} />
      </div>
    </div>
  );
};

export default Home;
