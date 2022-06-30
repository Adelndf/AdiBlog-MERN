import React, { useRef, useState } from "react";
import Avatar from "../Avatar/Avatar";
import { FaRegEdit } from "react-icons/fa";
import "./UserInfo.css";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { FaArrowDown } from "react-icons/fa";
import moment from "moment";

const UserInfo = () => {
  const { user } = useSelector((state) => state.auth);
  const [inputUsernema, setInputUsernema] = useState(user ? user.username : "");
  const [edit, setEdit] = useState(false);
  const inputRef = useRef(null);
  const [toggleArrow, setToggleArrow] = useState(false);

  const handleClick = (e) => {
    setEdit(!edit);
    setInputUsernema(user.username);
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
      setTimeout(function () {
        window.location.reload(false);
      }, 1500);
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
    <div className={toggleArrow ? "userInfo active" : "userInfo"}>
      {user ? (
        <>
          <h3>User info</h3>
          <div>
            <Avatar seed={inputUsernema} size="6.25rem" />
          </div>
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
          <div
            className={toggleArrow ? "arrowIcon active" : "arrowIcon"}
            onClick={() => setToggleArrow(!toggleArrow)}
          >
            <FaArrowDown />
          </div>
          <div
            className={toggleArrow ? "userInfo__mini active" : "userInfo__mini"}
          >
            <p>
              <span>Username:</span> {inputUsernema}
            </p>
            <p>
              <span>Email:</span> {user.email}
            </p>
            <p>
              <span>Created in:</span>{" "}
              {moment(new Date(user.createdAt)).format("MM/DD/YYYY")}
            </p>
            <p>
              <span>Last update:</span>{" "}
              {moment(new Date(user.updatedAt)).fromNow()}
            </p>
          </div>
        </>
      ) : (
        <h3>Please login for user info</h3>
      )}
    </div>
  );
};

export default UserInfo;
