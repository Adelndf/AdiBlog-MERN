import { useState, useRef } from "react";
import "./Feed.css";
import { UserInfo, Post } from "./../";

const user = false;

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
        <Post />
        <Post />
        <Post />
      </div>
      <div className="feed__right">
        <UserInfo />
      </div>
    </div>
  );
};

export default Feed;
