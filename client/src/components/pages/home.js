import ProfilePic from "../../assets/Profile.jpg";
import Post from "../resuableComponents/post";

const Home = () => {
  return (
    <div className="homeContainer">
      <div className="createPostContainer">
        <div className="createPostHeader">
          <img src={ProfilePic} alt="profilePicture"></img>
          <h3>Risav Sarkar</h3>
        </div>

        <form className="createPostContent">
          <div className="inputContainer">
            <input type="text" placeholder="What's on your mind?" required />
          </div>
          <div className="buttonContainer">
            <button className="postBtn" type="submit">
              Post
            </button>
          </div>
        </form>
      </div>
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
};

export default Home;
