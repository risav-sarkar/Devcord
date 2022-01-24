import ProfilePic from "../../assets/Profile.jpg";
import CoverPic from "../../assets/Cover.jpg";
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
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import axios from "axios";

const Profile = ({ userId }) => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [profileuser, setProfileUser] = useState(null);
  const [modal, setModal] = useState(0);
  const [profilePic, setProfilePic] = useState(null);
  const [coverPic, setCoverPic] = useState(null);

  const desc = useRef("");
  const city = useRef("");

  useEffect(() => {
    const postFetch = async () => {
      const res = await axios.get(
        `http://localhost:8800/api/posts/profile/${id}`
      );
      setPosts(res.data);
    };
    const userFetch = async () => {
      const res = await axios.get(`http://localhost:8800/api/users/${id}`);
      setProfileUser(res.data);
    };
    userFetch();
    postFetch();
  }, [id]);

  const handleFollowAndUnfollowUser = async (e) => {
    try {
      if (e.followers.includes(userId))
        await axios.put(`http://localhost:8800/api/users/${e._id}/unfollow`, {
          userId: userId,
        });
      else
        await axios.put(`http://localhost:8800/api/users/${e._id}/follow`, {
          userId: userId,
        });
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const updateUser = async () => {
      try {
        const user = {
          userId,
          desc: desc.current.value ? desc.current.value : profileuser.desc,
          city: city.current.value ? city.current.value : profileuser.city,
        };

        if (profilePic) {
          const submit = async () => {
            const data = new FormData();
            data.append("file", profilePic);
            data.append("upload_preset", "Devcord");

            const uploadRes = await axios.post(
              "https://api.cloudinary.com/v1_1/dzgvjykvm/image/upload",
              data
            );

            const { url } = uploadRes.data;
            await axios.put(`http://localhost:8800/api/users/${userId}`, {
              userId,
              profilePicture: url,
            });
          };
          submit();
        }

        if (coverPic) {
          const submit = async () => {
            const data = new FormData();
            data.append("file", coverPic);
            data.append("upload_preset", "Devcord");

            const uploadRes = await axios.post(
              "https://api.cloudinary.com/v1_1/dzgvjykvm/image/upload",
              data
            );

            const { url } = uploadRes.data;
            await axios.put(`http://localhost:8800/api/users/${userId}`, {
              userId,
              coverPicture: url,
            });
          };
          submit();
        }

        if (desc.current.value || city.current.value)
          await axios.put(`http://localhost:8800/api/users/${userId}`, user);
      } catch (err) {}
    };
    updateUser();
    const timer = setTimeout(() => {
      window.location.reload();
    }, 1000);
    return () => clearTimeout(timer);
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
              <div
                className="coverImage"
                style={{
                  backgroundImage: `url(${
                    profileuser
                      ? profileuser.coverPicture
                        ? profileuser.coverPicture
                        : CoverPic
                      : CoverPic
                  })`,
                }}
              >
                <div className="blur"></div>
                <div className="profileImageContainer">
                  <div className="profileInfo">
                    <p>{profileuser ? profileuser.followers.length : null}</p>
                    <p className="textGrey">Followers</p>
                  </div>
                  <div className="profileImage">
                    <img
                      src={
                        profileuser
                          ? profileuser.profilePicture
                            ? profileuser.profilePicture
                            : ProfilePic
                          : ProfilePic
                      }
                      alt="profilePicture"
                    ></img>
                  </div>
                  <div className="profileInfo">
                    <p>{profileuser ? profileuser.followings.length : null}</p>
                    <p className="textGrey">Following</p>
                  </div>
                </div>
              </div>

              <div className="profileTitle">
                <h2>{profileuser ? profileuser.username : null}</h2>
                <h4 className="textGrey">
                  {profileuser ? profileuser.city : null}
                </h4>
              </div>

              <div className="profileDesc">
                <p>{profileuser ? profileuser.desc : null}</p>
              </div>

              {id !== userId && profileuser ? (
                <div className="buttonContainer">
                  <button
                    className={
                      profileuser.followers.includes(userId) ? "btn1" : "btn2"
                    }
                    onClick={() => {
                      handleFollowAndUnfollowUser(profileuser);
                    }}
                  >
                    {profileuser.followers.includes(userId)
                      ? "Following"
                      : "Follow"}
                  </button>
                  <button className="btn2">Message</button>
                </div>
              ) : null}

              <div className="line"></div>

              {userId === id ? (
                <button
                  className="profileSettingsBtn"
                  onClick={() => {
                    setModal(1);
                  }}
                >
                  <FontAwesomeIcon icon={faCog} />
                </button>
              ) : null}
            </div>

            <div className="postContainer">
              {posts
                .slice(0)
                .reverse()
                .map((i) => {
                  return (
                    <Post key={i._id} data={i} userId={userId} profile={true} />
                  );
                })}
            </div>

            {modal === 1 ? (
              <div className="settingsModal">
                <div className="modalContainer">
                  <div className="modalContent">
                    <div className="labelContainer">
                      <label className="tickBtn" htmlFor="profilePicUpload">
                        Change Profile Image
                      </label>
                      <label className="tickBtn" htmlFor="coverPicUpload">
                        Change Cover Image
                      </label>
                    </div>

                    <form onSubmit={submitHandler}>
                      <input
                        type="file"
                        style={{ display: "none" }}
                        id="fileUpload"
                        accept=".png,.jpeg,.jpg"
                        id="profilePicUpload"
                        onChange={(e) => setProfilePic(e.target.files[0])}
                      />
                      <input
                        type="file"
                        style={{ display: "none" }}
                        id="fileUpload"
                        accept=".png,.jpeg,.jpg"
                        id="coverPicUpload"
                        onChange={(e) => setCoverPic(e.target.files[0])}
                      />
                      <p>Add Description</p>
                      <input
                        type="text"
                        placeholder={"Binging Netflix!"}
                        ref={desc}
                      />
                      <p>Add City</p>
                      <input
                        type="text"
                        placeholder={"Kolkata, India"}
                        ref={city}
                      />
                      <div className="btnContainer">
                        <button
                          className="tickBtn"
                          onClick={() => {
                            setModal(0);
                          }}
                        >
                          Cancel
                        </button>
                        <button type="submit">Submit</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            ) : null}
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
