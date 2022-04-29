import { useContext, useEffect, useRef, useState } from "react";

//Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

//Assets
import ProfilePic from "../../assets/Profile.jpg";

//Components
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../resuableComponents/navbar";
import Rightbar from "../resuableComponents/rightbar";
import Post from "../resuableComponents/post";
import Spinner from "../resuableComponents/spinner";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [file, setFile] = useState(null);
  const [fetching, setFetching] = useState(true);

  const desc = useRef("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const postFetch = async () => {
      const res = await axios.get(
        `http://localhost:8800/api/posts/timeline/${user._id}`
      );
      setPosts(res.data);
      setFetching(false);
    };
    postFetch();
  }, [user._id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!file && !desc.current.value) return;
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
      <Navbar btn={1} />

      <div className="content">
        <div className="mainContent">
          <div className="homeContainer">
            <div className="createPostContainer">
              <div className="createPostHeader">
                <img
                  src={user.profilePicture ? user.profilePicture : ProfilePic}
                  alt="profilePicture"
                ></img>
                <h3>{user.username}</h3>
              </div>

              <form className="createPostContent" onSubmit={submitHandler}>
                <div className="inputContainer">
                  <input
                    type="text"
                    placeholder={"What's on your mind " + user.username + "?"}
                    ref={desc}
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

            {fetching === true ? (
              <Spinner />
            ) : (
              posts
                .slice(0)
                .reverse()
                .map((i) => {
                  return (
                    <Post
                      key={i._id}
                      data={i}
                      userId={user._id}
                      proflie={false}
                    />
                  );
                })
            )}
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
