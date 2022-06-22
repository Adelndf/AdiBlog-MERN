import Post from "../Post/Post";
import "./Feed.css";

const Feed = () => {
  return (
    <div className="feed">
      <div className="feed__left">
        <h1>
          Explore
          <span> Adi</span>
          <span>Blog </span>
        </h1>
        <Post />
        <Post />
      </div>
      <div className="feed__right">
        <div className="feed__userInfo">a</div>
      </div>
    </div>
  );
};

export default Feed;
