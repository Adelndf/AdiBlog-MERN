import React, { useState } from "react";
import "./Post.css";
import { AiOutlineDelete } from "react-icons/ai";
import { placeholder } from "../../images";
import Avatar from "../Avatar/Avatar";

const username = "Adel";
const user = true;

const Post = ({ post }) => {
  const [sureDelete, setSureDelete] = useState(false);

  return (
    <div className="post-wrapper">
      <div className="post">
        <img src={post.image || placeholder} alt="post-img" />

        <div className="post__info">
          <div className="post__username">
            <div className="post__username-f">
              <Avatar seed={username} size="40px" />
              <h3>{username}</h3>
            </div>
            {user && <AiOutlineDelete onClick={() => setSureDelete(true)} />}
          </div>
          <p>- {post.description.substring(0, 50)}...</p>
          <div className="post__like">
            <span>{post.likes} likes</span>
          </div>
        </div>
      </div>
      {sureDelete && (
        <div className="post__sureDelete">
          <h3>Are you sure ?</h3>
          <div>
            <button onClick={() => {}} className="delete">
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
