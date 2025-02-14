import { Head } from "../pages/Home"
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import './App.css';
import { Register } from "../pages/Register"
import { Login } from "../pages/Login"
import { Dashboard } from "../pages/Dashboard"
// import { LoginWithService } from "../pages/LoginWithService"
import { Developers } from "../pages/Developers"
import { Explore } from "../pages/Explore"
import { Partnership } from "../pages/Partnership"
import { GetStarted } from "../pages/GetStarted"
import { CreateArea } from "../pages/CreateArea";
import { GithubAuthRedirect } from "../pages/GithubAuthRedirect"
import { GoogleAuthRedirect } from "../pages/GoogleAuthRedirect";
import { Profile } from "../pages/profil"
import { SpotifyAuthRedirect } from "../pages/SpotifyAuthRedirect";
import { GithubAuthRedirectOAuth2 } from "../pages/GithubAuthRedirectOAuth2"
import { GoogleAuthRedirectOAuth2 } from "../pages/GoogleAuthRedirectOAuth2";
import { SpotifyAuthRedirectOAuth2 } from "../pages/SpotifyAuthRedirectOAuth2";
import { SpotifyAuthRedirectProfile } from "../pages/SpotifyAuthRedirectionProfil";
import { GithubAuthRedirectProfile } from "../pages/GithubAuthRedirectionProfile";
import { GoogleAuthRedirectProfile } from "../pages/GoogleAuthRedirectionProfil";
import { SettingAreasPage } from "../pages/SettingAreasPage";

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
      {/* <Route path="/login-with-service" element={<LoginWithService />} /> */}
      <Route path="/partnership" element={<Partnership />} />
      <Route path="/get-started" element={<GetStarted />} />
      <Route path="/developers" element={<Developers />} />
      <Route path="/homePage" element={<Head />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/oauthgithub" element={<GithubAuthRedirect />} />
      <Route path="/oauthgoogle" element={<GoogleAuthRedirect />} />
      <Route path="/oauthspotify" element={<SpotifyAuthRedirect />} />
      <Route path="/oauthgithubcreate" element={<GithubAuthRedirectOAuth2 />} />
      <Route path="/oauthgooglecreate" element={<GoogleAuthRedirectOAuth2 />} />
      <Route path="/oauthspotifycreate" element={<SpotifyAuthRedirectOAuth2 />} />
      <Route path="/oauthgithubprofile" element={<GithubAuthRedirectProfile />} />
      <Route path="/oauthgoogleprofile" element={<GoogleAuthRedirectProfile />} />
      <Route path="/oauthspotifyprofile" element={<SpotifyAuthRedirectProfile />} />
      <Route path="/settingAreas" element={<SettingAreasPage />} />
      <Route
        path="/create"
        element={
          <CreateArea PUpdate={false} PNameArea="" PUsername="" PActive={false}
            PServiceAType={-1} PActionType={-1} PServiceRType={-1} PReactionType={-1}
            PActionsNeeds={[]} PReactionsNeeds={[]}
          />
        }
      />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </Router >
);

export default App;