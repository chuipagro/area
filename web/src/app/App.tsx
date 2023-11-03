import { Head } from "../pages/Home"
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import './App.css';
import { Register } from "../pages/Register"
import { Login } from "../pages/Login"
import { Dashboard } from "../pages/Dashboard"
import { LoginWithService } from "../pages/LoginWithService"
import { Developers } from "../pages/Developers"
import { Explore } from "../pages/Explore"
import { Partnership } from "../pages/Partnership"
import { GetStarted } from "../pages/GetStarted"
import { CreateArea } from "../pages/CreateArea";
import { GithubAuthRedirect } from "../pages/GithubAuthRedirect"
import { GoogleAuthRedirect } from "../pages/GoogleAuthRedirect";
import { Profil } from "../pages/profil"
import { SpotifyAuthRedirect } from "../pages/SpotifyAuthRedirect";

/**
 * This function display the app
*/
const App = (): JSX.Element => (
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
      <Route path="/homePage" element={<Head />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/oauthgithub" element={<GithubAuthRedirect />} />
      <Route path="/oauthgoogle" element={<GoogleAuthRedirect />} />
      <Route path="/oauthspotify" element={<SpotifyAuthRedirect />} />
      <Route
        path="/create"
        element={
          <CreateArea PUpdate={false} PNameArea="" PUsername="" PActive={false}
            PServiceAType={-1} PActionType={-1} PServiceRType={-1} PReactionType={-1}
            PActionsNeeds={[]} PReactionsNeeds={[]}
          />
        }
      />
      <Route path="/profil" element={<Profil />} />
    </Routes>
  </Router >
);

export default App;