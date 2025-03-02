import { Link } from "react-router-dom";

function Logout() {
  return (
    <>
      <div className="header__logout">
        <Link className="link" to="/logout">Logout</Link>
      </div>
    </>
  );
}

export default Logout;
