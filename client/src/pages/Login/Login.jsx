import "./Login.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { log2 } from "../../images";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const [error, setError] = useState("");

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="login">
      <div className="login__left">
        <form onSubmit={onSubmit} className="login__box">
          <h3>
            - <span>Login</span> with your account
          </h3>
          <p className="login__err">{error && `Error: ${error}`}</p>
          <div className="login__inputs">
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={onChange}
              value={email}
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
          </div>
          <p>
            You are logining to a website, created by{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://twitter.com/iAdelDev"
            >
              Adel
            </a>{" "}
            with the MERN stack technology, take a look and enjoy.
          </p>
          <div className="login__btns">
            <button type="submit">login</button>
            <Link to="/register">Create new account</Link>
          </div>
        </form>
      </div>
      <div className="login__right">
        <img src={log2} alt="pic1" />
      </div>
    </div>
  );
};

export default Login;
