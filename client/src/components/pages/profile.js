import ProfilePic from "../../assets/Profile.jpg";

const Profile = () => {
  return (
    <div className="profileContainer">
      <div className="coverImage">
        <div className="blur"></div>
        <div className="profileImageContainer">
          <div className="profileInfo">
            <p>20</p>
            <p className="textGrey">Followers</p>
          </div>
          <div className="profileImage">
            <img src={ProfilePic} alt="profilePicture"></img>
          </div>
          <div className="profileInfo">
            <p>20</p>
            <p className="textGrey">Following</p>
          </div>
        </div>
      </div>

      <div className="profileTitle">
        <h2>Risav Sarkar</h2>
        <h4 className="textGrey">Kolkata, India</h4>
      </div>

      <div className="profileDesc">
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting</p>
      </div>

      <div className="buttonContainer">
        <button className="btn1">Follow</button>
        <button className="btn2">Message</button>
      </div>

      <div className="line"></div>
    </div>
  );
};

export default Profile;
