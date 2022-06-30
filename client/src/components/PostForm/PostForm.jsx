import "./PostForm.css";
import { pic1, pic2, pic3, pic4, pic5, pic6 } from "../../images";
import { useEffect, useState } from "react";
import { FaImage } from "react-icons/fa";
import Avatar from "../Avatar/Avatar";
import axios from "axios";
import { useSelector } from "react-redux";

const PostForm = () => {
  const [randomImg, setRandomImg] = useState(null);
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState("");
  const { user } = useSelector((state) => state.auth);

  const pickImage = () => {
    const imagesArr = [pic1, pic2, pic3, pic4, pic5, pic6];
    const index = Math.floor(Math.random() * imagesArr.length);
    setRandomImg(imagesArr[index]);
  };

  useEffect(() => {
    pickImage();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const newPost = {
        description: desc,
        postImage: file, // fix
        userID: user._id,
      };
      await axios
        .post("http://localhost:5000/api/posts", newPost)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });

      setDesc("");
      setFile("");
    } catch (err) {
      console.log(err);
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
