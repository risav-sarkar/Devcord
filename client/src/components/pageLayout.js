import ProfilePic from "../assets/Profile.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faEnvelope,
  faSearch,
  faUserCircle,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Home from "../components/pages/home";
import Messages from "../components/pages/messages";
import Profile from "../components/pages/profile";
import Search from "../components/pages/search";
import Settings from "../components/pages/settings";
import Rightbar from "./resuableComponents/rightbar";

import { Link } from "react-router-dom";

const PageLayout = () => {
  const [buttonSelect, setButtonSelect] = useState(0);

  return (
    <div className="layout">
      <div className="navBar">
        <div className="navHeader">
          <img src={ProfilePic} alt="profilePicture"></img>
          <p>Risav Sarkar</p>
        </div>

        <div className="navButtons">
          <Link to="/">
            <button
              className={buttonSelect === 0 ? "selected" : null}
              onClick={() => {
                setButtonSelect(0);
              }}
            >
              <FontAwesomeIcon icon={faHome} />
              <p>Home</p>
            </button>
          </Link>

          <button
            className={buttonSelect === 1 ? "selected" : null}
            onClick={() => {
              setButtonSelect(1);
            }}
          >
            <FontAwesomeIcon icon={faEnvelope} />
            <p>Messages</p>
          </button>
          <button
            className={buttonSelect === 2 ? "selected" : null}
            onClick={() => {
              setButtonSelect(2);
            }}
          >
            <FontAwesomeIcon icon={faUserCircle} />
            <p>Profile</p>
          </button>
          <button
            className={buttonSelect === 3 ? "selected" : null}
            onClick={() => {
              setButtonSelect(3);
            }}
          >
            <FontAwesomeIcon icon={faSearch} />
            <p>Search</p>
          </button>
          <button
            className={buttonSelect === 4 ? "selected" : null}
            onClick={() => {
              setButtonSelect(4);
            }}
          >
            <FontAwesomeIcon icon={faCog} />
            <p>Settings</p>
          </button>
        </div>

        <div className="navFooter">
          <img src={ProfilePic} alt="profilePicture"></img>
          <h1>Devcord</h1>
        </div>
      </div>
      <div className="content">
        <div className="mainContent">
          {buttonSelect === 0 ? (
            <Link to="/home" />
          ) : buttonSelect === 1 ? (
            <Messages />
          ) : buttonSelect === 2 ? (
            <Profile />
          ) : buttonSelect === 3 ? (
            <Search />
          ) : (
            <Settings />
          )}
        </div>
        <div className="rightBar">
          <Rightbar />
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
