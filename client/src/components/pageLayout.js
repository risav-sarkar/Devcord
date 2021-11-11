import ProfilePic from "../assets/Profile.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faEnvelope,
  faSearch,
  faUserCircle,
  faCog,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const PageLayout = () => {
  return (
    <div className="layout">
      <div className="navBar">
        <div className="navHeader">
          <img src={ProfilePic}></img>
          <p>Risav Sarkar</p>
        </div>

        <div className="navButtons">
          <button>
            <FontAwesomeIcon icon={faHome} />
            <p>Home</p>
          </button>
          <button>
            <FontAwesomeIcon icon={faEnvelope} />
            <p>Messages</p>
          </button>
          <button>
            <FontAwesomeIcon icon={faUserCircle} />
            <p>Profile</p>
          </button>
          <button>
            <FontAwesomeIcon icon={faSearch} />
            <p>Search</p>
          </button>
          <button>
            <FontAwesomeIcon icon={faCog} />
            <p>Settings</p>
          </button>
        </div>

        <div className="navFooter">
          <img src={ProfilePic}></img>
          <h1>Devcord</h1>
          <button>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </button>
        </div>
      </div>
      <div className="content"></div>
    </div>
  );
};

export default PageLayout;
