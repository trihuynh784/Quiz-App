import { useRef } from "react";
import { checkExists, register } from "../../services/users";
import { generateToken } from "../../helpers/cookie";
import { useNavigate } from "react-router-dom";
import "./Register.scss";

function PageRegister() {
  const navigate = useNavigate();
  const useRefName = useRef();
  const useRefEmail = useRef();
  const useRefPassword = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    if (fullName && email && password) {
      const checkExistEmail = await checkExists("email", email);
      if (checkExistEmail.length) alert("Email này đã được đăng ký");
      else {
        const options = {
          fullName: fullName,
          email: email,
          password: password,
          token: generateToken(),
        };
        const response = await register(options);
        if(response) navigate("/");
      }
    } else {
      alert("Vui lòng nhập đúng định dạng");
    }
    useRefName.current.value = "";
    useRefEmail.current.value = "";
    useRefPassword.current.value = "";
  };

  return (
    <>
      <div className="container">
        <div className="register">
          <div className="box-shadow">
            <div className="register__title">Register Quiz</div>
            <div className="register__form">
              <form onSubmit={handleSubmit}>
                <input
                  ref={useRefName}
                  placeholder="Your name"
                  type="fullname"
                  name="fullname"
                />
                <input
                  ref={useRefEmail}
                  placeholder="Your email"
                  type="email"
                  name="email"
                />
                <input
                  ref={useRefPassword}
                  placeholder="Your password"
                  type="password"
                  name="password"
                />
                <button>Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PageRegister;
