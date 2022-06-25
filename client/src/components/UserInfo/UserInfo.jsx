import React, { useRef, useState } from "react";
import Avatar from "../Avatar/Avatar";
import { FaRegEdit } from "react-icons/fa";
import "./UserInfo.css";

const user = true;

const UserInfo = () => {
  const [username, setUsername] = useState("username");
  const [edit, setEdit] = useState(false);
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
    <div className="userInfo">
      {user ? (
        <>
          <Avatar id="Random" size="6.25rem" />
          <form
            onSubmit={handleSubmit}
            type="submit"
            className="userInfo__username"
          >
            {!edit ? (
              <p className="userInfo__username-p">{username}</p>
            ) : (
              <input
                ref={inputRef}
                className="userInfo__username-input"
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
  );
};

export default UserInfo;
