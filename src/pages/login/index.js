import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import "./Login.scss";
import { login } from "../../services/users";
import { generateToken, setCookie } from "../../helpers/cookie";
import { useDispatch } from "react-redux";
import { LOGIN } from "../../actions/auth";

function PageLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const useRefEmail = useRef();
  const useRefPassword = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    const response = await login(email, password);
    if (email && password) {
      if (response.length) {
        setCookie("id", response[0].id, 1);
        setCookie("fullName", response[0].fullName, 1);
        setCookie("email", response[0].email, 1);
        setCookie("token", response[0].token, 1);
        dispatch(LOGIN());
        navigate("/home");
      } else {
        alert("Sai tài khoản hoặc mật khẩu");
      }
    }
    useRefEmail.current.value = "";
    useRefPassword.current.value = "";
  };

  return (
    <>
      <div className="container">
        <div className="login">
          <div className="box-shadow">
            <div className="login__title">Login Quiz</div>
            <div className="login__form">
              <form onSubmit={handleSubmit}>
                <input
                  ref={useRefEmail}
                  placeholder="Email"
                  type="email"
                  name="email"
                />
                <input
                  ref={useRefPassword}
                  placeholder="Password"
                  type="password"
                  name="password"
                />
                <button className="btn">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PageLogin;
