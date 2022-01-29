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

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={user ? <Home /> : <Navigate to="/login" />}
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
          element={user ? <Messages /> : <Navigate to="/login" />}
        />
        <Route exact path="/profile/:id" element={user ? <Profile /> : null} />
        <Route
          exact
          path="/search"
          element={user ? <Search /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/settings"
          element={user ? <Settings /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
