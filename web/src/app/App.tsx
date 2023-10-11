import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import './App.css';
import { Register } from "../pages/Register"
import { Login } from "../pages/Login"
import { Dashboard } from "../pages/Dashboard"
import { LoginWithService } from "../pages/LoginWithService"
import { Developers } from "../pages/Developers"
import { Explore } from "../pages/Explore"
import { Partnership } from "../pages/Partnership";
import { GetStarted } from "../pages/GetStarted"
import { CreateArea } from "../pages/CreateArea";


/**
 * This function display the app
 */
const App = ()
  : JSX.Element => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Dashboard />} />
      <Route path="/login-with-service" element={<LoginWithService />} />
      <Route path="/partnership" element={<Partnership />} />
      <Route path="/get-started" element={<GetStarted />} />
      <Route path="/developers" element={<Developers />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/create" element={<CreateArea />} />
    </Routes>
  </Router >
);

export default App;