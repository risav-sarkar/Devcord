import ProfilePic from "../../assets/Profile.jpg";
import CoverPic from "../../assets/Cover.jpg";
import Post from "../resuableComponents/post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import Rightbar from "../resuableComponents/rightbar";
import { useEffect, useState, useRef, useContext } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Navbar from "../resuableComponents/navbar";

const Profile = () => {
  const { user } = useContext(AuthContext);

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
  }, [user, id]);

  const handleFollowAndUnfollowUser = async (e) => {
    try {
      if (e.followers.includes(user._id))
        await axios.put(`http://localhost:8800/api/users/${e._id}/unfollow`, {
          userId: user._id,
        });
      else
        await axios.put(`http://localhost:8800/api/users/${e._id}/follow`, {
          userId: user._id,
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

            let localUser = JSON.parse(localStorage.getItem("user_Devcord"));
            localUser.profilePicture = url;
            localStorage.setItem("user_Devcord", JSON.stringify(localUser));

            await axios.put(`http://localhost:8800/api/users/${user._id}`, {
              userId: user._id,
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

            let localUser = JSON.parse(localStorage.getItem("user_Devcord"));
            localUser.coverPicture = url;
            localStorage.setItem("user_Devcord", JSON.stringify(localUser));

            await axios.put(`http://localhost:8800/api/users/${user._id}`, {
              userId: user._id,
              coverPicture: url,
            });
          };
          submit();
        }

        if (desc.current.value) {
          let localUser = JSON.parse(localStorage.getItem("user_Devcord"));
          localUser.desc = user.desc;
          localStorage.setItem("user_Devcord", JSON.stringify(localUser));
          await axios.put(`http://localhost:8800/api/users/${user._id}`, {
            userId: user._id,
            desc: desc.current.value,
          });
        }

        if (city.current.value) {
          let localUser = JSON.parse(localStorage.getItem("user_Devcord"));
          localUser.city = user.city;
          localStorage.setItem("user_Devcord", JSON.stringify(localUser));
          await axios.put(`http://localhost:8800/api/users/${user._id}`, {
            userId: user._id,
            city: city.current.value,
          });
        }
      } catch (err) {}
    };
    updateUser();
    const timer = setTimeout(() => {
      window.location.reload();
    }, 5000);
    return () => clearTimeout(timer);
  };

  return (
    <div className="layout">
      <Navbar btn={3} />

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

              {profileuser ? (
                profileuser.desc ? (
                  <div className="profileDesc">
                    <p>{profileuser.desc}</p>
                  </div>
                ) : null
              ) : null}

              {id !== user._id && profileuser ? (
                <div className="buttonContainer">
                  <button
                    className={
                      profileuser.followers.includes(user._id) ? "btn1" : "btn2"
                    }
                    onClick={() => {
                      handleFollowAndUnfollowUser(profileuser);
                    }}
                  >
                    {profileuser.followers.includes(user._id)
                      ? "Following"
                      : "Follow"}
                  </button>
                  <button className="btn2">Message</button>
                </div>
              ) : null}

              <div className="line"></div>

              {user._id === id ? (
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
                    <Post
                      key={i._id}
                      data={i}
                      userId={user._id}
                      profile={user._id === id ? true : false}
                    />
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
                        accept=".png,.jpeg,.jpg"
                        id="profilePicUpload"
                        onChange={(e) => setProfilePic(e.target.files[0])}
                      />
                      <input
                        type="file"
                        style={{ display: "none" }}
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
