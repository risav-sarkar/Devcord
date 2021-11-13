import ProfilePic from "../../assets/Profile.jpg";
import Cover from "../../assets/Cover.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";

const Post = () => {
  return (
    <div className="post">
      <div className="postHeader">
        <img src={ProfilePic} alt="profilePicture" />
        <div>
          <h3>Risav Sarkar</h3>
          <p>Kolkata, India</p>
        </div>
      </div>

      <div className="mainImage">
        <img src={Cover} alt="profilePicture" />
      </div>

      <div className="buttonContainer">
        <button>
          <FontAwesomeIcon icon={faHeart} />
          20
        </button>
        <button>
          <FontAwesomeIcon icon={faComment} />
          20
        </button>
      </div>
    </div>
  );
};

export default Post;
