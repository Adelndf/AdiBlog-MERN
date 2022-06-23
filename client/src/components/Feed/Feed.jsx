import Avatar from "../Avatar/Avatar";
import Post from "../Post/Post";
import "./Feed.css";
import { FaRegEdit } from "react-icons/fa";
import { useState } from "react";
import { useRef } from "react";

const user = false;

const Feed = () => {
  const [edit, setEdit] = useState(false);
  const [username, setUsername] = useState("username");
  const inputRef = useRef(null);

  const handleClick = (e) => {
    setEdit(!edit);
    if (edit) {
      inputRef.current.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUsername = inputRef.current.value;
    setUsername(newUsername);
    setEdit(false);
  };

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
        <div className="feed__userInfo">
          {user ? (
            <>
              <Avatar id="Random" size="100px" />
              <form
                onSubmit={handleSubmit}
                type="submit"
                className="feed__username"
              >
                {!edit ? (
                  <p className="feed__username-p">{username}</p>
                ) : (
                  <input
                    ref={inputRef}
                    className="feed__username-input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                )}
                <FaRegEdit
                  style={{ color: `${edit ? "#7693fc" : "#777"}` }}
                  onClick={handleClick}
                />
              </form>
            </>
          ) : (
            <h3>Please login for user info</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feed;
