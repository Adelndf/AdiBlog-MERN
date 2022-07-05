import { useEffect, useRef, useState } from "react";
import "./SinglePost.css";
import { useParams } from "react-router-dom";
import * as api from "../../app/api";
import { placeholder } from "../../images";
import { Avatar, Spinner } from "../../components";
import moment from "moment";
import { BsThreeDotsVertical } from "react-icons/bs";
import useClickOutside from "../../hooks/useClickOutside";

const SinglePost = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [post, setPost] = useState(null);
  const effectRun = useRef(false);
  const [isOptions, setIsOptions] = useState(false);
  const optRef = useRef(null);
  useClickOutside(optRef, () => setIsOptions(false));

  useEffect(() => {
    if (effectRun.current === true) {
      const getPost = async () => {
        const { data } = await api.fetchPostById(id);
        setPost(data);
      };
      getPost();
    }
    return () => {
      effectRun.current = true;
    };
  }, [id]);

  useEffect(() => {
    if (effectRun.current === true) {
      const getUser = async () => {
        if (post) {
          const { data } = await api.fetchUserById(post.userID);
          setUser(data);
        }
      };
      getUser();
    }
    return () => {
      effectRun.current = true;
    };
  }, [post, post?.userID]);

  return (
    <div className="singlePost">
      {!post ? (
        <Spinner />
      ) : (
        <>
          <img
            src={`http://localhost:5000/api/${post.postImage}`}
            className="singlePost__imageLg"
            alt="post-img"
          />
          <div className="maxWidthScreen">
            <div className="singlePost__topMobile">
              <div className="singlePost__info">
                <div className="singlePost__info-avatar">
                  <Avatar size="4rem" seed={user?.username} />
                </div>
                <div className="singlePost__info-username">
                  <p>{user?.username}</p>
                  <p>{moment(new Date(post.createdAt)).fromNow()}</p>
                </div>
                <div
                  onClick={() => setIsOptions(!isOptions)}
                  ref={optRef}
                  className={
                    isOptions
                      ? "singlePost__info-dots active"
                      : "singlePost__info-dots"
                  }
                >
                  <BsThreeDotsVertical />
                  <div className="singlePost__info-opt">
                    <button disabled={true}>edit</button>
                    <button>delete</button>
                  </div>
                </div>
              </div>
              <img
                src={
                  post.postImage
                    ? `http://localhost:5000/api/${post.postImage}`
                    : placeholder
                }
                alt="post-img"
              />
            </div>
            <div className="singlePost__bot">
              <div className="singlePost__info"></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SinglePost;
