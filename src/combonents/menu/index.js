import { Link } from "react-router-dom";

function Menu() {
  return (
    <>
      <ul className="header__menu">
        <li><Link className="link" to={"/home"}>Home</Link></li>
        <li><Link className="link" to={"/topics"}>Topics</Link></li>
        <li><Link className="link" to={"/answers"}>Answers</Link></li>
      </ul>
    </>
  );
}

export default Menu;
