import Rightbar from "../resuableComponents/rightbar";
import Navbar from "../resuableComponents/navbar";

const Settings = () => {
  const handleLogout = () => {
    console.log("Logout");
    localStorage.setItem("user_Devcord", JSON.stringify(null));
    window.location.reload();
  };
  return (
    <div className="layout">
      <Navbar btn={5} />

      <div className="content">
        <div className="mainContent">
          <div className="settingsContainer">
            <button
              onClick={() => {
                handleLogout();
              }}
            >
              LogOut
            </button>
          </div>
        </div>
        <div className="rightBar">
          <Rightbar />
        </div>
      </div>
    </div>
  );
};

export default Settings;
