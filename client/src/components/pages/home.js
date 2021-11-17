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

const Home = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const postFetch = async () => {
      const res = await axios.get(
        `http://localhost:8800/api/posts/timeline/${userId}`
      );
      setPosts(res.data);
    };
    postFetch();
  }, [userId]);

  return (
    <div className="layout">
      <div className="navBar">
        <div className="navHeader">
          <img src={ProfilePic} alt="profilePicture"></img>
          <p>Risav Sarkar</p>
        </div>

        <div className="navButtons">
          <Link to="/">
            <button className="selected">
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
          <div className="homeContainer">
            <div className="createPostContainer">
              <div className="createPostHeader">
                <img src={ProfilePic} alt="profilePicture"></img>
                <h3>Risav Sarkar</h3>
              </div>

              <form className="createPostContent">
                <div className="inputContainer">
                  <input
                    type="text"
                    placeholder="What's on your mind?"
                    required
                  />
                </div>
                <div className="buttonContainer">
                  <button className="postBtn" type="submit">
                    Post
                  </button>
                </div>
              </form>
            </div>
            {posts.map((i) => {
              return <Post key={i._id} data={i} />;
            })}
          </div>
        </div>
        <div className="rightBar">
          <Rightbar />
        </div>
      </div>
    </div>
  );
};

export default Home;
