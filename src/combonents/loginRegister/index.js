import { Link } from "react-router-dom";

function LoginRegister() {
  return (
    <>
      <ul className="header__login-register">
        <li>
          <Link className="link" to={"/"}>Login</Link>
        </li>
        <li>
          <Link className="link" to={"/register"}>Register</Link>
        </li>
      </ul>
    </>
  );
}

export default LoginRegister;
