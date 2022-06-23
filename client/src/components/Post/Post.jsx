import React, { useState } from "react";
import "./Post.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { pic1, pic2, pic3 } from "../../images";
import Avatar from "../Avatar/Avatar";

const description =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiadebitis voluptatem fugiat impedit, vel quam aliquam enim. Amet, aliquid minima";
const username = "Adel";

const Post = () => {
  const [isLike, setIsLike] = useState(false);
  const [likes, setLikes] = useState(13);

  const handleLikes = () => {
    if (!isLike) {
      setIsLike(true);
      setLikes(likes + 1);
    } else {
      setIsLike(false);
      setLikes(likes - 1);
    }
  };

  return (
    <div className="post">
      <img src={pic3} alt="post-img" />
      <div className="post__info">
        <div className="post__username">
          <Avatar id="adel" size="40px" />
          <h3>{username}</h3>
        </div>
        <p>- {description.substring(0, 50)}...</p>
        <div onClick={handleLikes} className="post__like">
          <span>{likes ? likes : ""}</span>
          {isLike ? <FaHeart /> : <FaRegHeart />}
        </div>
      </div>
    </div>
  );
};

export default Post;
