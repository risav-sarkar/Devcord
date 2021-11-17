import ProfilePic from "../../assets/Profile.jpg";
import Post from "../resuableComponents/post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faEnvelope,
  faSearch,
  faUserCircle,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import Rightbar from "../resuableComponents/rightbar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Profile = ({ userId, followers, following, username }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const postFetch = async () => {
      const res = await axios.get(
        `http://localhost:8800/api/posts/profile/${username}`
      );
      setPosts(res.data);
    };
    postFetch();
  }, [username]);

  return (
    <div className="layout">
      <div className="navBar">
        <div className="navHeader">
          <img src={ProfilePic} alt="profilePicture"></img>
          <p>Risav Sarkar</p>
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
            <button className="selected">
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
            <button>
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
          <div className="profileContainer">
            <div className="profileSection">
              <div className="coverImage">
                <div className="blur"></div>
                <div className="profileImageContainer">
                  <div className="profileInfo">
                    <p>{followers}</p>
                    <p className="textGrey">Followers</p>
                  </div>
                  <div className="profileImage">
                    <img src={ProfilePic} alt="profilePicture"></img>
                  </div>
                  <div className="profileInfo">
                    <p>{following}</p>
                    <p className="textGrey">Following</p>
                  </div>
                </div>
              </div>

              <div className="profileTitle">
                <h2>{username}</h2>
                <h4 className="textGrey">Kolkata, India</h4>
              </div>

              <div className="profileDesc">
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting
                </p>
              </div>

              <div className="buttonContainer">
                <button className="btn1">Follow</button>
                <button className="btn2">Message</button>
              </div>

              <div className="line"></div>
            </div>
            <div className="postContainer">
              {posts.map((i) => {
                return <Post key={i._id} data={i} />;
              })}
            </div>
          </div>
        </div>
        <div className="rightBar">
          <Rightbar />
        </div>
      </div>
    </div>
  );
};

export default Profile;
