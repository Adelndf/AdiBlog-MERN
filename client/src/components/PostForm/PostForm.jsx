import "./PostForm.css";
import { pic1, pic2, pic3, pic4, pic5, pic6 } from "../../images";
import { useEffect, useState } from "react";
import { FaImage } from "react-icons/fa";
import Avatar from "../Avatar/Avatar";

const user = false;

const PostForm = () => {
  const [randomImg, setRandomImg] = useState(null);
  const [postDescription, setPostDescription] = useState("");
  const [file, setFile] = useState(null);

  const pickImage = () => {
    const imagesArr = [pic1, pic2, pic3, pic4, pic5, pic6];
    const index = Math.floor(Math.random() * imagesArr.length);

    setRandomImg(imagesArr[index]);
  };

  useEffect(() => {
    pickImage();
  }, []);

  const clearForm = (e) => {
    e.preventDefault();
    setPostDescription("");
    setFile("");
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="postForm">
      {user ? (
        <form className="postForm__left" onSubmit={onSubmit}>
          <div className="postForm__leftPadding">
            <Avatar id="adel" size="50px" />
            <div className="postForm__inputs">
              <div className="postForm__input">
                <textarea
                  id="inputText"
                  rows={5}
                  type="text"
                  className="postForm__inputText"
                  value={postDescription}
                  onChange={(e) => setPostDescription(e.target.value)}
                  placeholder="What do you wanna talk about.?"
                />
              </div>
              <div className="postForm__input">
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
              <div className="postForm__btns">
                <button type="submit">post</button>
                <button onClick={clearForm}>clear</button>
              </div>
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
