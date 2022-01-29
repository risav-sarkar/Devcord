import ProfilePic from "../../assets/Profile.jpg";
import CoverPic from "../../assets/Cover.jpg";
import Rightbar from "../resuableComponents/rightbar";
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Navbar from "../resuableComponents/navbar";

const Search = () => {
  const [users, setUsers] = useState([]);
  const [searchusers, setSearchusers] = useState([]);
  const [search, setSearch] = useState("");
  const [reload, setReload] = useState(1);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const userFetch = async () => {
      const res = await axios.get(`http://localhost:8800/api/users/`);

      setUsers(res.data.filter((u) => u._id !== user._id));
    };
    userFetch();
  }, [user._id, reload]);

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
  }, [users, search, reload]);

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
    setReload(reload === 1 ? 0 : 1);
  };

  return (
    <div className="layout">
      <Navbar btn={4} />

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
                      style={{
                        backgroundImage: `url(${
                          e.coverPicture ? e.coverPicture : CoverPic
                        })`,
                      }}
                    >
                      <div className="profileImage">
                        <img
                          src={e.profilePicture ? e.profilePicture : ProfilePic}
                          alt="profilePicture"
                        ></img>
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
                              e.followers.includes(user._id) ? "btn1" : "btn2"
                            }
                            onClick={() => {
                              handleFollowAndUnfollowUser(e);
                            }}
                          >
                            {e.followers.includes(user._id)
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
                      style={{
                        backgroundImage: `url(${
                          e.coverPicture ? e.coverPicture : CoverPic
                        })`,
                      }}
                    >
                      <div className="profileImage">
                        <img
                          src={e.profilePicture ? e.profilePicture : ProfilePic}
                          alt="profilePicture"
                        ></img>
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
                              e.followers.includes(user._id) ? "btn1" : "btn2"
                            }
                            onClick={() => {
                              handleFollowAndUnfollowUser(e);
                            }}
                          >
                            {e.followers.includes(user._id)
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
