import "./styles/styles.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/pages/home";
import Profile from "./components/pages/profile";
import Messages from "./components/pages/messages";
import Search from "./components/pages/search";
import Settings from "./components/pages/settings";
import Login from "./components/pages/login";
import Register from "./components/pages/register";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/messages" element={<Messages />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/settings" element={<Settings />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
