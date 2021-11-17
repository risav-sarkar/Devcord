import ProfilePic from "../../assets/Profile.jpg";
// import Cover from "../../assets/Cover.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";

const Post = ({ data }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const userFetch = async () => {
      const res = await axios.get(
        `http://localhost:8800/api/users/${data.userId}`
      );
      setUser(res.data);
    };
    userFetch();
  }, [data.userId]);

  return (
    <div className="post">
      <div className="postHeader">
        <img src={ProfilePic} alt="profilePicture" />
        <div>
          <h3>{user ? user.username : null}</h3>
          <p>Kolkata, India</p>
        </div>
      </div>

      {data.img ? (
        <div className="mainImage">
          <img src={data.img} alt="profilePicture" />
        </div>
      ) : null}

      {data.desc ? (
        <div className="mainText">
          <p>{data.desc}</p>
        </div>
      ) : null}

      <div className="buttonContainer">
        <button>
          <FontAwesomeIcon icon={faHeart} />
          {data.likes.length}
        </button>
      </div>
    </div>
  );
};

export default Post;
