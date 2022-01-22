import ProfilePic from "../../assets/Profile.jpg";
import Post from "../resuableComponents/post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faEnvelope,
  faSearch,
  faUserCircle,
  faCog,
  faImages,
} from "@fortawesome/free-solid-svg-icons";
import Rightbar from "../resuableComponents/rightbar";
import { Link } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const Home = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [file, setFile] = useState(null);
  const desc = useRef();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const postFetch = async () => {
      const res = await axios.get(
        `http://localhost:8800/api/posts/timeline/${userId}`
      );
      setPosts(res.data);
    };
    postFetch();
  }, [userId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (file) {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "Devcord");

        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dzgvjykvm/image/upload",
          data
        );

        const { url } = uploadRes.data;
        const newPost = {
          userId: user._id,
          desc: desc.current.value,
          img: [url],
        };

        await axios.post("http://localhost:8800/api/posts", newPost);
        window.location.reload();
      } else {
        const newPost = {
          userId: user._id,
          desc: desc.current.value,
          img: [],
        };

        await axios.post("http://localhost:8800/api/posts", newPost);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

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

              <form className="createPostContent" onSubmit={submitHandler}>
                <div className="inputContainer">
                  <input
                    type="text"
                    placeholder={"What's on your mind " + user.username + "?"}
                    ref={desc}
                    required
                  />
                  <input
                    type="file"
                    style={{ display: "none" }}
                    id="fileUpload"
                    accept=".png,.jpeg,.jpg"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>

                <div className="buttonContainer">
                  <label className="imageBtn" htmlFor="fileUpload">
                    <FontAwesomeIcon icon={faImages} />
                  </label>
                  <button className="postBtn" type="submit">
                    Post
                  </button>
                </div>
              </form>
            </div>
            {posts
              ? posts
                  .slice(0)
                  .reverse()
                  .map((i) => {
                    return (
                      <Post
                        key={i._id}
                        data={i}
                        userId={userId}
                        proflie={false}
                      />
                    );
                  })
              : null}
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
