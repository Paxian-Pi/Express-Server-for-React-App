import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './features/authSlice'
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';

// import 'jquery/dist/jquery.min.js';
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.min.js";

import './App.css';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import store from './app/store';
import { JW_TOKEN } from './constants'
import { logoutUser } from './actions/authActions';
import { clearProfile } from './actions/profileActions';

import PrivateRoute from './components/common/PrivateRoute';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import NotFound from './components/no-found/NotFound';
import Posts from './components/posts/Posts';

// Check for token
if (localStorage.getItem(JW_TOKEN)) {

  // Set auth token header auth
  setAuthToken(localStorage.getItem(JW_TOKEN))

  // Decode token and get info user expiration
  const decodedUserData = jwt_decode(localStorage.getItem(JW_TOKEN))

  // Set user and isAuthentictd
  store.dispatch(setCurrentUser(decodedUserData))

  // Get current timestamp
  const currentTime = Date.now() / 1000

  // Check for expired token
  if (currentTime > decodedUserData.exp) {

    // Logout user
    store.dispatch(logoutUser())

    // Clear current profile
    store.dispatch(clearProfile())

    // Redirect to login page on token expiration
    window.location.href = '/login'
  }

}

const App = () => {

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Landing />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/profiles' element={<Profiles />} />
          <Route exact path='/profile/:handle' element={<Profile />} />
          <Route exact path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route exact path='/create-profile' element={<PrivateRoute><CreateProfile /></PrivateRoute>} />
          <Route exact path='/edit-profile' element={<PrivateRoute><EditProfile /></PrivateRoute>} />
          <Route exact path='/add-experience' element={<PrivateRoute><AddExperience /></PrivateRoute>} />
          <Route exact path='/add-education' element={<PrivateRoute><AddEducation /></PrivateRoute>} />
          <Route exact path='/feed' element={<PrivateRoute><Posts /></PrivateRoute>} />
          <Route exact path='/not-found' element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App
