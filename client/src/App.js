import "./styles/styles.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./components/pages/home";
import Profile from "./components/pages/profile";
import Messages from "./components/pages/messages";
import Search from "./components/pages/search";
import Settings from "./components/pages/settings";
import Login from "./components/pages/login";
import Register from "./components/pages/register";

import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

const App = () => {
  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={user ? <Home userId={user._id} /> : <Login />}
        />
        <Route
          exact
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />
        <Route
          exact
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route
          exact
          path="/messages"
          element={<Messages userId={user._id} />}
        />
        <Route
          exact
          path="/profile/:username"
          element={
            <Profile
              userId={user._id}
              followers={user.followers.length}
              following={user.followings.length}
              username={user.username}
            />
          }
        />
        <Route exact path="/search" element={<Search userId={user._id} />} />
        <Route
          exact
          path="/settings"
          element={<Settings userId={user._id} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
