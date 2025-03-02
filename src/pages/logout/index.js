import { useNavigate } from "react-router-dom";
import { deleteAllCookies } from "../../helpers/cookie";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "../../actions/auth";
import { useEffect } from "react";

function PageLogout() {
  const isLogin = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    deleteAllCookies();
    dispatch(LOGOUT());
    navigate("/");
  }, []);

  return <></>;
}

export default PageLogout;
