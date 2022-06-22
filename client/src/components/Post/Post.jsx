import React, { useState } from "react";
import "./Post.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { pic1 } from "../../images";
import Avatar from "../Avatar/Avatar";

const description =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiadebitis voluptatem fugiat impedit, vel quam aliquam enim. Amet, aliquid minima";
const username = "Adel";

const Post = () => {
  const [isLike, setIsLike] = useState(false);

  return (
    <div className="post">
      <img src={pic1} alt="post-img" />
      <div className="post__info">
        <div className="post__username">
          <Avatar id="adel" size="40px" />
          <h3>{username}</h3>
        </div>
        <p>- {description.substring(0, 50)}...</p>
        <div onClick={() => setIsLike(!isLike)} className="post__like">
          {isLike ? <FaHeart /> : <FaRegHeart />}
        </div>
      </div>
    </div>
  );
};

export default Post;
