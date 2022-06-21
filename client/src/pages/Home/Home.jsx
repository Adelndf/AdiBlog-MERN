import "./Home.css";
import { PostForm, Feed } from "../../components";

const Home = () => {
  return (
    <div className="home">
      <div className="maxWidthScreen">
        <PostForm />
        <Feed />
      </div>
    </div>
  );
};

export default Home;
