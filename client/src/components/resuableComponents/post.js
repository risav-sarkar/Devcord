import ProfilePic from "../../assets/Profile.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faTrash,
  faTimes,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";

const Post = ({ userId, data, profile }) => {
  const [modal, setModal] = useState(0);
  const [user, setUser] = useState(null);
  const [likes, setLikes] = useState(data.likes.length);
  const [isLiked, setIsLiked] = useState(
    data.likes.includes(userId) === true ? true : false
  );

  useEffect(() => {
    const userFetch = async () => {
      const res = await axios.get(
        `http://localhost:8800/api/users/${data.userId}`
      );
      setUser(res.data);
    };
    userFetch();
  }, [data.userId]);

  const handleLikeDislike = async (e) => {
    try {
      await axios.put(`http://localhost:8800/api/posts/${e}/like`, {
        userId: userId,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8800/api/posts/${data._id}`);
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
  };

  return (
    <div className="post">
      <div className="postHeader">
        <img
          src={
            user
              ? user.profilePicture
                ? user.profilePicture
                : ProfilePic
              : ProfilePic
          }
          alt="profilePicture"
        />
        <div>
          <h3>{user ? user.username : null}</h3>
          <p>{user ? (user.city ? user.city : null) : null}</p>
        </div>
        {profile ? (
          <>
            <button
              className="deleteBtn"
              onClick={() => {
                setModal(1);
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
            {modal === 1 ? (
              <div className="modal">
                <h1>Are you sure?</h1>
                <div className="btnContainer">
                  <button
                    onClick={() => {
                      setModal(0);
                    }}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                  <button
                    onClick={() => {
                      handleDelete();
                    }}
                    className="tickBtn"
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </button>
                </div>
              </div>
            ) : null}
          </>
        ) : null}
      </div>

      {data.desc ? (
        <div className="mainText">
          <p>{data.desc}</p>
        </div>
      ) : null}
      {data.img.length > 0 ? (
        <div className="mainImage">
          <img src={data.img[0]} alt="profilePicture" />
        </div>
      ) : null}

      <div className="buttonContainer">
        <button
          onClick={() => {
            if (isLiked === true) {
              setLikes(likes - 1);
              setIsLiked(false);
            } else {
              setLikes(likes + 1);
              setIsLiked(true);
            }
            handleLikeDislike(data._id);
          }}
        >
          <FontAwesomeIcon icon={faHeart} />
          {likes}
        </button>
      </div>
    </div>
  );
};

export default Post;
