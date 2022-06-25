import { useState, useRef } from "react";
import "./Feed.css";
import { UserInfo, Post } from "./../";

const user = false;

const Feed = ({ allPosts }) => {
  return (
    <div className="feed">
      <div className="feed__left">
        <h1>
          Explore
          <span> Adi</span>
          <span>Blog </span>
        </h1>
        {allPosts.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </div>
      <div className="feed__right">
        <UserInfo />
      </div>
    </div>
  );
};

export default Feed;
