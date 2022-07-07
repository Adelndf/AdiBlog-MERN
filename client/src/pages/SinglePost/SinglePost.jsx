import { useEffect, useRef, useState } from "react";
import "./SinglePost.css";
import { useNavigate, useParams } from "react-router-dom";
import * as api from "../../app/api";
import { placeholder } from "../../images";
import { Avatar, Spinner } from "../../components";
import moment from "moment";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useClickOutside from "../../hooks/useClickOutside";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getPostById, reset } from "../../app/redux/post/postSlice";
import { toast } from "react-toastify";

const SinglePost = () => {
  const { id } = useParams();
  const [userPost, setUserPost] = useState(null);
  const effectRun = useRef(false);
  const [isOptions, setIsOptions] = useState(false);
  const optRef = useRef(null);
  useClickOutside(optRef, () => setIsOptions(false));
  const [isLiked, setIsLiked] = useState(false);
  const [sureDelete, setSureDelete] = useState(false);
  const delRef = useRef(null);
  useClickOutside(delRef, () => setSureDelete(false));
  const [myPost, setMyPost] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { post, isLoading, isSuccess, isError } = useSelector(
    (state) => state.post
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (effectRun.current === true) {
      dispatch(reset());
    }
    return () => {
      effectRun.current = true;
    };
  }, [dispatch]);

  // Get post
  useEffect(() => {
    if (effectRun.current === true) {
      if (id) {
        dispatch(getPostById(id));
      }
    }
    return () => {
      effectRun.current = true;
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (effectRun.current === true) {
      const getUser = async () => {
        if (post) {
          const { data } = await api.fetchUserById(post.userID);
          setUserPost(data);
        }
      };
      getUser();
    }
    return () => {
      effectRun.current = true;
    };
  }, [post, post?.userID]);

  useEffect(() => {
    if (user && userPost) {
      if (user._id === userPost._id || user.isAdmin) {
        setMyPost(true);
      } else {
        setMyPost(false);
      }
    }
  }, [user, user?._id, user?.isAdmin, userPost, userPost?._id]);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleDelete = () => {
    dispatch(deletePost(post._id));
    if (isSuccess) {
      navigate("/");
      toast.success("Post was deleted successfully");
    }
    if (isError) {
      toast.error("Can't do this action now..");
    }
  };

  return (
    <div className="singlePost">
      {isLoading || !post ? (
        <Spinner />
      ) : (
        <>
          <img
            src={
              post.postImage
                ? `${process.env.REACT_APP_BASE_URL}/${post.postImage}`
                : placeholder
            }
            className="singlePost__imageLg"
            alt="post-img"
          />
          <div className="maxWidthScreen">
            <div className="singlePost__topMobile">
              <div className="singlePost__info">
                <div className="singlePost__info-avatar">
                  <Avatar size="4rem" seed={userPost?.username} />
                </div>
                <div className="singlePost__info-username">
                  <p>{userPost?.username}</p>
                  <p>{moment(new Date(post.createdAt)).fromNow()}</p>
                </div>
                {myPost && (
                  <div
                    onClick={() => setIsOptions(!isOptions)}
                    ref={optRef}
                    className={
                      isOptions
                        ? "singlePost__info-dots active"
                        : "singlePost__info-dots"
                    }
                  >
                    <BsThreeDotsVertical />
                    <div className="singlePost__info-opt">
                      <button disabled={true}>edit</button>
                      <button onClick={() => setSureDelete(true)}>
                        delete
                      </button>
                    </div>
                  </div>
                )}
                {sureDelete && (
                  <div className="singlePost__sureDelete">
                    <h3>Are you sure ?</h3>
                    <div>
                      <button onClick={handleDelete} className="delete">
                        Delete
                      </button>
                      <button
                        onClick={() => setSureDelete(false)}
                        className="cancel"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <img
                src={
                  post.postImage
                    ? `${process.env.REACT_APP_BASE_URL}/${post.postImage}`
                    : placeholder
                }
                alt="post-img"
              />
              <div className="singlePost__desc">
                <p>{post.description}</p>
                <div className="singlePost__desc-icons">
                  <div onClick={handleLike} className="singlePost__desc-icon">
                    <span>{post.likes}</span>
                    {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
                  </div>
                </div>
              </div>
              <div className="singlePost__comments">
                <p>Comments, soon..!</p>
              </div>
            </div>
            {/* larg screen */}
            <div className="singlePost__lgContainer">
              <div className="singlePost__left">
                <div className="singlePost__leftHeader">
                  <div className="singlePost__infoLg-avatar">
                    <Avatar size="6rem" seed={userPost?.username} />
                  </div>
                  <div className="singlePost__info-username">
                    <p>{userPost?.username}</p>
                    <p>{moment(new Date(post.createdAt)).fromNow()}</p>
                  </div>
                  {myPost && (
                    <div
                      onClick={() => setIsOptions(!isOptions)}
                      ref={optRef}
                      className={
                        isOptions
                          ? "singlePost__info-dots active"
                          : "singlePost__info-dots"
                      }
                    >
                      <BsThreeDotsVertical />
                      <div className="singlePost__info-opt">
                        <button disabled={true}>edit</button>
                        <button onClick={() => setSureDelete(true)}>
                          delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="singlePost__descP">
                  <p>{post.description}</p>
                </div>
                {user && (
                  <div className="singlePost__desc-icons">
                    <div onClick={handleLike} className="singlePost__desc-icon">
                      <span>{post.likes}</span>
                      {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
                    </div>
                  </div>
                )}
              </div>
              <div className="singlePost__right">
                <h3>Comments</h3>
                <p>Comming soon..!</p>
              </div>
            </div>

            {sureDelete && (
              <div ref={delRef} className="singlePost__sureDelete lg">
                <h3>Are you sure ?</h3>
                <div>
                  <button onClick={handleDelete} className="delete">
                    Delete
                  </button>
                  <button
                    onClick={() => setSureDelete(false)}
                    className="cancel"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/*  */}
          </div>
        </>
      )}
    </div>
  );
};

export default SinglePost;
