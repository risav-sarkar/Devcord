import ProfilePic from "../../assets/Profile.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faEnvelope,
  faSearch,
  faUserCircle,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import Rightbar from "../resuableComponents/rightbar";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { useContext } from "react";

const Settings = ({ userId }) => {
  const { user } = useContext(AuthContext);

  const handleLogout = () => {
    console.log("Logout");
    localStorage.setItem("user_Devcord", JSON.stringify(null));
    window.location.reload();
  };
  return (
    <div className="layout">
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
            <button>
              <FontAwesomeIcon icon={faHome} />
              <p>Home</p>
            </button>
          </Link>

          <Link to="/messages">
            <button>
              <FontAwesomeIcon icon={faEnvelope} />
              <p>Messages</p>
            </button>
          </Link>

          <Link to={`/profile/${userId}`}>
            <button>
              <FontAwesomeIcon icon={faUserCircle} />
              <p>Profile</p>
            </button>
          </Link>

          <Link to="/search">
            <button>
              <FontAwesomeIcon icon={faSearch} />
              <p>Search</p>
            </button>
          </Link>

          <Link to="/settings">
            <button className="selected">
              <FontAwesomeIcon icon={faCog} />
              <p>Settings</p>
            </button>
          </Link>
        </div>

        <div className="navFooter">
          <img src={ProfilePic} alt="profilePicture"></img>
          <h1>Devcord</h1>
        </div>
      </div>

      <div className="content">
        <div className="mainContent">
          <div className="settingsContainer">
            <button
              onClick={() => {
                handleLogout();
              }}
            >
              LogOut
            </button>
          </div>
        </div>
        <div className="rightBar">
          <Rightbar />
        </div>
      </div>
    </div>
  );
};

export default Settings;
