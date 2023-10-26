import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import './App.css';

// import { Center, VStack, Link, Box } from '@chakra-ui/react';
import { Head } from "../pages/Home"
import { Register } from "../pages/Register"
import { Login } from "../pages/Login"
import { Home2 } from "../pages/dashboard"
import { LoginWithService } from "../pages/LoginWithService"
import { Developers } from "../pages/Developers"
import { Explore } from "../pages/Explore"
import { Partnership } from "../pages/Partnership"
import { GetStarted } from "../pages/GetStarted"
import { GithubAuthRedirect } from "../pages/GithubAuthRedirect"

const App = (): JSX.Element => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home2 />} />
      <Route path="/login-with-service" element={<LoginWithService />} />
      <Route path="/partnership" element={<Partnership />} />
      <Route path="/get-started" element={<GetStarted />} />
      <Route path="/developers" element={<Developers />} />
      <Route path="/homePage" element={<Head />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/oauthgithub" element={<GithubAuthRedirect />} />
    </Routes>
  </Router >
);

export default App;