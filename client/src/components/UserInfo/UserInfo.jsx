import React, { useEffect, useRef, useState } from "react";
import Avatar from "../Avatar/Avatar";
import { FaRegEdit } from "react-icons/fa";
import "./UserInfo.css";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";

const UserInfo = () => {
  const { user, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );
  const [inputUsernema, setInputUsernema] = useState(user ? user.username : "");
  const [edit, setEdit] = useState(false);
  const inputRef = useRef(null);

  const handleClick = (e) => {
    setEdit(!edit);
    if (edit) {
      inputRef.current.focus();
    }
  };

  const updateName = async (userID, newName) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/users/${userID}`,
        newName
      );
      return res.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return toast.error(message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("err");
      const res = await axios.get(
        `http://localhost:5000/api/users/${user._id}`
      );
      const newName = inputRef.current.value;
      const sendData = {
        ...res.data,
        username: newName,
        userID: user._id,
      };
      setInputUsernema(newName);
      updateName(user._id, sendData);
      localStorage.setItem("user", JSON.stringify(sendData));
      setEdit(false);
      toast.success(`Updated to ${newName} 🥳`);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
    }
  };

  return (
    <div className="userInfo">
      {user ? (
        <>
          <h3>User info</h3>
          <Avatar seed={inputUsernema} size="6.25rem" />
          <form
            onSubmit={handleSubmit}
            type="submit"
            className="userInfo__username"
          >
            {!edit ? (
              <p className="userInfo__username-p">{inputUsernema}</p>
            ) : (
              <input
                ref={inputRef}
                className="userInfo__username-input"
                type="text"
                value={inputUsernema}
                onChange={(e) => setInputUsernema(e.target.value)}
              />
            )}
            <FaRegEdit
              style={{ color: `${edit ? "#7693fc" : "#777"}` }}
              onClick={handleClick}
            />
          </form>
          <div className="userInfo__mini">
            <p>Display name: {inputUsernema}</p>
          </div>
        </>
      ) : (
        <h3>Please login for user info</h3>
      )}
    </div>
  );
};

export default UserInfo;
