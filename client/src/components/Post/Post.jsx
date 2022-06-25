import React, { useState } from "react";
import "./Post.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { placeholder } from "../../images";
import Avatar from "../Avatar/Avatar";

const description =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiadebitis voluptatem fugiat impedit, vel quam aliquam enim. Amet, aliquid minima";
const username = "Adel";
const user = true;

const Post = () => {
  const [isLike, setIsLike] = useState(false);
  const [likes, setLikes] = useState(13);
  const [sureDelete, setSureDelete] = useState(false);

  const handleLikes = () => {
    if (!isLike) {
      setIsLike(true);
      setLikes(likes + 1);
    } else {
      setIsLike(false);
      setLikes(likes - 1);
    }
  };

  console.log(sureDelete);

  return (
    <div className="post-wrapper">
      <div className="post">
        <img src={placeholder} alt="post-img" />
        <div className="post__info">
          <div className="post__username">
            <div className="post__username-f">
              <Avatar id="adel" size="40px" />
              <h3>{username}</h3>
            </div>
            {user && <AiOutlineDelete onClick={() => setSureDelete(true)} />}
          </div>
          <p>- {description.substring(0, 50)}...</p>
          {user ? (
            <div onClick={handleLikes} className="post__like">
              <span>{likes ? likes : ""}</span>
              {isLike ? <FaHeart /> : <FaRegHeart />}
            </div>
          ) : (
            <div className="post__like">
              <span>{likes} likes</span>
            </div>
          )}
        </div>
      </div>
      {sureDelete && (
        <div className="post__sureDelete">
          <h3>Are you sure ?</h3>
          <div>
            <button className="delete">Delete</button>
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
