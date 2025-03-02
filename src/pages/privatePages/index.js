import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../../helpers/cookie";

function PrivatePages() {
  const token = getCookie("token");

  return (token != "" ? (<Outlet />) : (<Navigate to={"/"} />))
}

export default PrivatePages;