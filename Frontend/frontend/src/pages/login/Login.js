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
  const { user, setUserData } = useUserContext();
  let hasFetchedUserID = false;
  let hasFetchedUserInfo = false;

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(user));
  }, [user]);

  const recordData = (event) => {
    const { name, value } = event.target;

    setLoginInfo((preValue) => {
      return { ...preValue, [name]: value };
    });
  };

  useEffect(() => {
    if (user.token && !hasFetchedUserID) {
      getUserID();
      hasFetchedUserID = true;
    }
  }, [user.token]);

  useEffect(() => {
    if (user.userID && !hasFetchedUserInfo) {
      getUserInfo();
      hasFetchedUserID = true;
    }
  }, [user.userID]);

  const getUserInfo = async () => {
    fetch(`http://3.124.188.58/api/user/${user.userID}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        }
      })
      .then((data) => {
        let email, username, fullname;
        if (data) {
          const object = JSON.parse(data);
          email = object.email;
          username = object.username;
          fullname = object.fullName;
        }
        setUserData((prevUserData) => ({
          ...prevUserData,
          email: email,
          userName: username,
          fullName: fullname,
        }));
      });
  };

  const getUserID = async () => {
    fetch("http://3.124.188.58/api/user", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        }
      })
      .then((data) => {
        let userID;
        if (data) {
          userID = data.replace(/"/g, "");
        }
        setUserData((prevUserData) => ({
          ...prevUserData,
          userID: userID,
        }));
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = loginInfo.userName;
    const password = loginInfo.password;
    const base64Credentials = btoa(username + ":" + password);

    try {
      const response = await axios.post("/login", null, {
        headers: {
          Authorization: "Basic " + base64Credentials,
        },
      });

      if (response.status === 200) {
        const token = response.data;
        setUserData((prevUserData) => ({
          ...prevUserData,
          token: token,
        }));
        setTimeout(() => navigate("/dashboard"), 500);
      } else {
        setError("Login failed with status code: 401");
        setTimeout(() => setError(null), 5000);
      }
    } catch (error) {
      setError("Login failed with status code: 401");
      setTimeout(() => setError(null), 5000);
    }
  };

  const handleSingUp = () => {
    navigate("/signup");
  };

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
          <form id="form-login" action="" onSubmit={handleSubmit} method="">
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
              <h3>
                Don't have an account? <a onClick={handleSingUp}>Sign Up</a>
              </h3>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
export default Login;
