import ProfilePic from "../../assets/Profile.jpg";
import CoverPic from "../../assets/Cover.jpg";
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

const Search = ({ userId }) => {
  const [users, setUsers] = useState([]);
  const [searchusers, setSearchusers] = useState([]);
  const [search, setSearch] = useState("");
  const [reload, setReload] = useState(1);

  useEffect(() => {
    const userFetch = async () => {
      const res = await axios.get(`http://localhost:8800/api/users/`);

      setUsers(res.data.filter((user) => user._id !== userId));
    };
    userFetch();
  }, [userId, reload]);

  useEffect(() => {
    if (search === "") return;
    const timer = setTimeout(() => {
      setSearchusers(
        users.filter(
          (user) =>
            user.username.toLowerCase().includes(search.toLowerCase()) === true
        )
      );
    }, 500);
    return () => clearTimeout(timer);
  }, [search, reload]);

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
    setReload(reload === 1 ? 0 : 1);
  };

  console.log(reload);
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
            <button>
              <FontAwesomeIcon icon={faUserCircle} />
              <p>Profile</p>
            </button>
          </Link>

          <Link to="/search">
            <button className="selected">
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
          <div className="searchContainer">
            <input
              className="searchBar"
              type="text"
              placeholder="Search"
              onChange={(event) => setSearch(event.currentTarget.value)}
              value={search}
            />
            {search === "" ? (
              <div className="userGrid">
                {users.map((e) => {
                  return (
                    <div
                      className="profileThumbnails"
                      key={e._id}
                      style={{ backgroundImage: `url(${CoverPic})` }}
                    >
                      <div className="profileImage">
                        <img src={ProfilePic} alt="profilePicture"></img>
                      </div>
                      <div className="profileDetails">
                        <h1>{e.username}</h1>
                        <div className="followers">
                          <div>
                            <p>Followers</p>
                            <p>{e.followers.length}</p>
                          </div>
                          <div>
                            <p>Followings</p>
                            <p>{e.followings.length}</p>
                          </div>
                        </div>
                        <div className="btnContainer">
                          <Link to={`/profile/${e._id}`}>
                            <button className="btn1">Visit</button>
                          </Link>
                          <button
                            className={
                              e.followers.includes(userId) ? "btn1" : "btn2"
                            }
                            onClick={() => {
                              handleFollowAndUnfollowUser(e);
                            }}
                          >
                            {e.followers.includes(userId)
                              ? "Following"
                              : "Follow"}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="userGrid">
                {searchusers.map((e) => {
                  return (
                    <div
                      className="profileThumbnails"
                      key={e._id}
                      style={{ backgroundImage: `url(${CoverPic})` }}
                    >
                      <div className="profileImage">
                        <img src={ProfilePic} alt="profilePicture"></img>
                      </div>
                      <div className="profileDetails">
                        <h1>{e.username}</h1>
                        <div className="followers">
                          <div>
                            <p>Followers</p>
                            <p>{e.followers.length}</p>
                          </div>
                          <div>
                            <p>Followings</p>
                            <p>{e.followings.length}</p>
                          </div>
                        </div>
                        <div className="btnContainer">
                          <Link to={`/profile/${e._id}`}>
                            <button className="btn1">Visit</button>
                          </Link>
                          <button
                            className={
                              e.followers.includes(userId) ? "btn1" : "btn2"
                            }
                            onClick={() => {
                              handleFollowAndUnfollowUser(e);
                            }}
                          >
                            {e.followers.includes(userId)
                              ? "Following"
                              : "Follow"}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
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

export default Search;
