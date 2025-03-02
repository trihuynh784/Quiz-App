import { Link, Outlet } from "react-router-dom";
import LoginRegister from "../../combonents/loginRegister";
import Menu from "../../combonents/menu";
import Logout from "../../combonents/logout";
import "./layoutDefault.scss";
import { getCookie } from "../../helpers/cookie";
import { useSelector } from "react-redux";

function LayoutDefault() {
  const token = getCookie("token");
  const isLogin = useSelector(state => state.authReducer);

  return (
    <div className="wrapper">
      <div className="header">
        <div className="header__logo">
          {(token && isLogin) ? <Link to={"/home"}>Quiz</Link> : <Link to={"/"}>Quiz</Link>}
        </div>
        {(token && isLogin) ? (
          <>
            <Menu />
            <Logout />
          </>
        ) : (
          <LoginRegister />
        )}
      </div>
      <div className="main">
        <Outlet />
      </div>
      <div className="footer">Nocopyright @ by mtrivjppro</div>
    </div>
  );
}

export default LayoutDefault;
