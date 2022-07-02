import "./Home.css";
import { PostForm, Post, UserInfo, Spinner } from "../../components";
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../app/redux/posts/postsSlice";
import { getUsers } from "../../app/redux/users/usersSlice";
import { reset } from "../../app/redux/auth/authSlice";
import { toast } from "react-toastify";

const Home = () => {
  const posts = useSelector((state) => state.posts);
  const { user, isError, message, isSuccess } = useSelector(
    (state) => state.auth
  );
  const [myUsername, setMyUsername] = useState(user?.username);
  const topUsers = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const effectRun = useRef(false);

  useEffect(() => {
    if (effectRun.current === true) {
      if (isError) {
        toast.error(message);
        setMyUsername(user.username);
      }
      if (isSuccess) {
        toast.success(message);
      }

      dispatch(reset());
    }
    return () => {
      effectRun.current = true;
    };
  }, [dispatch, isError, isSuccess, message, user?.username]);

  useEffect(() => {
    if (effectRun.current === true) {
      dispatch(getUsers());
      dispatch(getPosts());
    }
    return () => {
      effectRun.current = true;
    };
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
            {posts.isLoading ? (
              <Spinner />
            ) : (
              <>
                {posts.posts.map((post) => (
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
              <UserInfo myUsername={myUsername} setMyUsername={setMyUsername} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
