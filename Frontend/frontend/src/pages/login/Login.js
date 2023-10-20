import React, { useState, useEffect } from "react";
import { AiFillFacebook } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import "./login.scss";
import { useUserContext } from "../../components/context/UserContext";
import axios from "../../api/Axios";
import Typewriter from "typewriter-effect";

const Login = () => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({ userName: "", password: "" });
  const [error, setError] = useState(null);
  const { setUserName } = useUserContext();
  const [success, setSuccess] = useState(false);

  const recordData = (event) => {
    const { name, value } = event.target;

    setLoginInfo((preValue) => {
      return { ...preValue, [name]: value };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccess(true);
    try {
      const response = await axios.get("/api/user");
      console.log(response.data);
      setUserName("Kazi00");
    } catch (err) {
      setError("Login failed with status code: 401");
      setTimeout(() => setError(null), 5000);
    }
  };

  useEffect(() => {
    if (success) {
      navigate("/dashboard");
    }
  }, [success, navigate]);

  return (
    <section className="loginScreen flex">
      <div className="login_failed">
        <h1>{error}</h1>
      </div>
      <div className="leftSide">
        <span>Welcome To</span>
        <img src={"/assets/img/logohome.png"} alt="" />
        <div className="text">
          <span className="bottom" style={{ lineHeight: "2.5" }}>
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString(
                    "Log in to view the most up-to-date status of your plant"
                  )
                  .start();
              }}
              options={{
                loop: true,
                delay: 200,
                wrapperClassName: "bottom",
                cursorClassName: "bottom",
              }}
            />
          </span>
        </div>
      </div>
      <div className="rightSide">
        <span className="header">Login to GrowGenius Dashboard</span>
        <div className="wrapper">
          <div className="login-options flex">
            <div className="facebook">
              <AiFillFacebook className="icon" />
              <h2>Continue with Facebook</h2>
            </div>
            <div className="google">
              <FcGoogle className="icon" />
              <h2>Continue with Google</h2>
            </div>
          </div>
          <h2 className="alt">OR</h2>
          <form id="form" action="" onSubmit={handleSubmit} method="">
            <div className="input-field">
              <div className="input">
                <input
                  onChange={recordData}
                  type="text"
                  name="userName"
                  value={loginInfo.userName}
                  placeholder="Username"
                  autoComplete="off"
                  required
                />
              </div>
              <div className="input">
                <input
                  onChange={recordData}
                  type="password"
                  name="password"
                  value={loginInfo.password}
                  placeholder="Password"
                  autoComplete="off"
                  required
                />
              </div>
              <span>Forgot Password?</span>
              <button type="submit" className="btn flex">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
export default Login;
