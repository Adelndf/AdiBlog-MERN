import "./Home.css";
import { PostForm, Post, UserInfo, Spinner } from "../../components";
import { useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getPosts } from "../../app/redux/posts/postsSlice";
import { getUsers } from "../../app/redux/users/usersSlice";

const Home = () => {
  const { posts, isLoading, message, isError } = useSelector(
    (state) => state.posts
  );
  const topUsers = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getPosts());
    console.log("123");
  }, [dispatch]);

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
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                {posts.map((post) => (
                  <Post post={post} key={post._id} />
                ))}
              </>
            )}
          </div>
          <div className="home__right">
            <div className="home__users">
              <h3>Recent 5 users, Welcome..</h3>
              <div className="home__users-container">
                {topUsers.isLoading ? (
                  <Spinner />
                ) : (
                  <>
                    {topUsers.users.map((user, i) => (
                      <div className="home__user" key={user._id}>
                        <span>
                          <span className="home__user-index">{i + 1}</span>
                          {user.username}
                        </span>
                        <span>
                          {moment(new Date(user.createdAt)).fromNow()}
                        </span>
                      </div>
                    ))}
                  </>
                )}
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
