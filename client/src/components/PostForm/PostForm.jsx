import "./PostForm.css";
import { pic1, pic2, pic3, pic4, pic5, pic6 } from "../../images";
import { useEffect, useRef, useState } from "react";
import { FaImage } from "react-icons/fa";
import Avatar from "../Avatar/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../app/redux/posts/postsSlice";

const PostForm = () => {
  const [randomImg, setRandomImg] = useState(null);
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const effectRun = useRef(false);
  const dispatch = useDispatch();
  const [fileSizeError, setFileSizeError] = useState(false);

  const pickImage = () => {
    const imagesArr = [pic1, pic2, pic3, pic4, pic5, pic6];
    const index = Math.floor(Math.random() * imagesArr.length);
    setRandomImg(imagesArr[index]);
  };

  useEffect(() => {
    if (effectRun.current === true) {
      pickImage();
    }
    return () => (effectRun.current = true);
  }, []);

  const ifStatement = (type) => {
    const maxFileSize = 1024 * 1024 * 5;
    return file?.size <= maxFileSize && file?.type === `image/${type}`;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!file && desc !== "") {
      const formData = new FormData();
      formData.append("description", desc);
      formData.append("userID", user._id);
      dispatch(createPost(formData));
      setDesc("");
    }

    if (file) {
      if (ifStatement("jpeg") || ifStatement("png") || ifStatement("gif")) {
        const formData = new FormData();
        formData.append("description", desc);
        formData.append("userID", user._id);
        formData.append("postImage", file);
        dispatch(createPost(formData));
        setDesc("");
        setFile(null);
        setFileSizeError(false);
      } else {
        setFileSizeError(true);
        setTimeout(() => {
          setFileSizeError(false);
        }, [2000]);
      }
    }
  };

  return (
    <div className="postForm">
      {user ? (
        <form className="postForm__left" onSubmit={onSubmit}>
          <div className="postForm__leftPadding">
            <div className="postForm__avatar">
              <Avatar seed={user.username} size="50px" />
            </div>
            <div className="postForm__inputs">
              <div className="postForm__input">
                <textarea
                  id="inputText"
                  rows={5}
                  type="text"
                  className="postForm__inputText"
                  placeholder="What do you wanna talk about.?"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>
              <div className="postForm__input">
                <div className="postForm__input-wrapper">
                  <label htmlFor="inputImg">
                    <FaImage />
                  </label>
                  <input
                    id="inputImg"
                    type="file"
                    className="postForm__inputImg"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
                <span className={fileSizeError ? "fileSizeError" : ""}>
                  Max 5 MB - (jpeg, png, gif) only.
                </span>
              </div>
              <button
                disabled={!desc.trim()}
                style={{
                  opacity: !desc && 0.4,
                  cursor: !desc && "not-allowed",
                }}
                type="submit"
              >
                post
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="postForm__left div">
          <h3>
            Please <span>login</span> for better experience <br />
          </h3>
        </div>
      )}
      <div onClick={pickImage} className="postForm__right">
        <img src={randomImg || pic1} alt="Random-gif-img" />
      </div>
    </div>
  );
};

export default PostForm;
