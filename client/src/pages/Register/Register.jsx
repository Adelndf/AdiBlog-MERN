import { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import { log3 } from "../../images";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { register } from "../../app/redux/auth/authSlice";
import { Spinner } from "./../../components";
import LoginRegister from "../../HOC/LoginRegister";

const Register = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });

  const { username, email, confirmEmail, password, confirmPassword } = formData;
  const { isLoading } = useSelector((state) => state.auth);

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password do not match!");
    } else if (email !== confirmEmail) {
      toast.error("Email do not match!");
    } else {
      const newUser = {
        username,
        email,
        password,
      };
      dispatch(register(newUser));
      toast.success("Welcome to AdiBlog 👏🏻👏🏻");
    }
  };

  return (
    <div className="register">
      <div className="register__left">
        {isLoading ? (
          <Spinner />
        ) : (
          <form onSubmit={onSubmit} className="register__box">
            <h3>
              - Register <span>new</span> account
            </h3>
            <div className="register__inputs">
              <input
                type="text"
                placeholder="Display name"
                name="username"
                onChange={onChange}
                value={username}
                required
                maxLength={11}
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={onChange}
                value={email}
                required
              />
              <input
                type="email"
                placeholder="Confirm email"
                name="confirmEmail"
                onChange={onChange}
                value={confirmEmail}
                required
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={onChange}
                value={password}
                required
              />
              <input
                type="password"
                placeholder="ConfirmPassword"
                name="confirmPassword"
                onChange={onChange}
                value={confirmPassword}
                required
              />
            </div>
            <p>
              You are registering to a website, created by{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://twitter.com/iAdelDev"
              >
                Adel
              </a>{" "}
              with the MERN stack technology, take a look and enjoy.
            </p>
            <div className="register__btns">
              <button type="submit">register</button>
              <Link to="/login">already have an account</Link>
            </div>
          </form>
        )}
      </div>
      <div className="register__right">
        <img src={log3} alt="pic1" />
      </div>
    </div>
  );
};

export default LoginRegister(Register);
