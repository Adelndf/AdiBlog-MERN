import React, { useEffect, useState } from "react";
import "./Post.css";
import { AiOutlineDelete } from "react-icons/ai";
import { placeholder } from "../../images";
import Avatar from "../Avatar/Avatar";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Post = ({ post }) => {
  const [sureDelete, setSureDelete] = useState(false);
  const [userPost, setUserPost] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const [myUser, setMyUser] = useState(false);

  useEffect(() => {
    const getUserPost = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/users/${post.userID}`
      );
      setUserPost(res.data);
    };
    getUserPost();
  }, [post.userID]);

  useEffect(() => {
    if (user?._id === post.userID) {
      setMyUser(true);
    } else {
      setMyUser(false);
    }

    if (!user) {
      setSureDelete(false);
    }
  }, [post.userID, user, user?._id]);

  const handleDelete = async (id) => {
    try {
      await axios
        .delete(`http://localhost:5000/api/posts/${id}`)
        .then(() => {
          console.log("Deleted");
          toast.success("Delete post successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="post-wrapper">
      <Link to="/post/123654" className="post">
        <img
          src={`http://localhost:5000/api/${post.postImage}` || placeholder}
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
            <button onClick={() => handleDelete(post._id)} className="delete">
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
