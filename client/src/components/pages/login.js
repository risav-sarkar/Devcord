import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  return (
    <div className="login">
      <div className="loginLeft">
        <h1 className="loginLogo">Devcord</h1>
      </div>
      <div className="loginRight">
        <form className="loginBox" onSubmit={handleClick}>
          <input
            placeholder="Email"
            type="email"
            required
            className="loginInput"
            ref={email}
          />
          <input
            placeholder="Password"
            type="password"
            required
            minLength="6"
            className="loginInput"
            ref={password}
          />
          <button className="loginButton" type="submit" disabled={isFetching}>
            {isFetching ? "Loading..." : "Login"}
          </button>
          <button className="loginForgot">Forgot Password?</button>
          <p>
            Not registered yet?{" "}
            <Link to="/register">
              <button className="registerButton">Register</button>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
