import React, { useEffect, useRef, useState } from "react";
import "./Post.css";
import { AiOutlineDelete } from "react-icons/ai";
import { placeholder } from "../../images";
import Avatar from "../Avatar/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUserById } from "../../app/api";
import { deletePost } from "../../app/redux/posts/postsSlice";

const Post = ({ post }) => {
  const [sureDelete, setSureDelete] = useState(false);
  const [userPost, setUserPost] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const [myUser, setMyUser] = useState(false);
  const effectRun = useRef(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (effectRun.current === true) {
      const getUserPost = async () => {
        const { data } = await fetchUserById(post.userID);
        setUserPost(data);
      };
      getUserPost();
    }
    return () => (effectRun.current = true);
  }, [post.userID, user?.username]);

  useEffect(() => {
    if (user?._id === post.userID || user?.isAdmin) {
      setMyUser(true);
    } else {
      setMyUser(false);
    }

    if (!user) {
      setSureDelete(false);
    }
  }, [post.userID, user, user?._id]);

  return (
    <div className="post-wrapper">
      <Link to={`/post/${post._id}`} className="post">
        <img
          src={
            post.postImage
              ? `http://localhost:5000/api/${post.postImage}`
              : placeholder
          }
          alt="post-img"
        />

        <div className="post__info">
          <div className="post__username">
            <div className="post__username-f">
              <Avatar seed={userPost ? userPost.username : "x"} size="40px" />
              <h3>{userPost ? userPost.username : "Loading.."}</h3>
            </div>
          </div>
          <p>- {post.description.substring(0, 50)}...</p>
          <div className="post__like">
            <span>{post.likes} likes</span>
          </div>
        </div>
      </Link>
      {myUser && <AiOutlineDelete onClick={() => setSureDelete(true)} />}
      {sureDelete && (
        <div className="post__sureDelete">
          <h3>Are you sure ?</h3>
          <div>
            <button
              onClick={() => dispatch(deletePost(post._id))}
              className="delete"
            >
              Delete
            </button>
            <button onClick={() => setSureDelete(false)} className="cancel">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
