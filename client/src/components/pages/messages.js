import Rightbar from "../resuableComponents/rightbar";
import Navbar from "../resuableComponents/navbar";

const Messages = () => {
  return (
    <div className="layout">
      <Navbar btn={2} />

      <div className="content">
        <div className="mainContent">
          <div className="searchContainer">
            <h1>Messages</h1>
          </div>
        </div>
        <div className="rightBar">
          <Rightbar />
        </div>
      </div>
    </div>
  );
};

export default Messages;
