import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faEnvelope,
  faSearch,
  faUserCircle,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import ProfilePic from "../../assets/Profile.jpg";
import LogoPic from "../../assets/Logo.png";

const Navbar = ({ btn }) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="navBar">
      <div className="navHeader">
        <img
          src={user.profilePicture ? user.profilePicture : ProfilePic}
          alt="profilePicture"
        ></img>
        <p>{user.username}</p>
      </div>

      <div className="navButtons">
        <Link to="/">
          <button className={btn === 1 ? "selected" : null}>
            <FontAwesomeIcon icon={faHome} />
            <p>Home</p>
          </button>
        </Link>

        <Link to="/messages">
          <button className={btn === 2 ? "selected" : null}>
            <FontAwesomeIcon icon={faEnvelope} />
            <p>Messages</p>
          </button>
        </Link>

        <Link to={`/profile/${user._id}`}>
          <button className={btn === 3 ? "selected" : null}>
            <FontAwesomeIcon icon={faUserCircle} />
            <p>Profile</p>
          </button>
        </Link>

        <Link to="/search">
          <button className={btn === 4 ? "selected" : null}>
            <FontAwesomeIcon icon={faSearch} />
            <p>Search</p>
          </button>
        </Link>

        <Link to="/settings">
          <button className={btn === 5 ? "selected" : null}>
            <FontAwesomeIcon icon={faCog} />
            <p>Settings</p>
          </button>
        </Link>
      </div>

      <div className="navFooter">
        <img src={LogoPic} alt="profilePicture"></img>
        <h1>Devcord</h1>
      </div>
    </div>
  );
};

export default Navbar;
