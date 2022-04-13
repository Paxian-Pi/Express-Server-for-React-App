import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './features/authSlice'
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';

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

// Check for token
if (localStorage.getItem(JW_TOKEN)) {

  // Set auth token header auth
  setAuthToken(localStorage.getItem(JW_TOKEN));

  // Decode token and get info user expiration
  const decodedUserData = jwt_decode(localStorage.getItem(JW_TOKEN));

  // Set user and isAuthentictd
  store.dispatch(setCurrentUser(decodedUserData));

  // Get current timestamp
  const currentTime = Date.now() / 1000;

  // Check for expired token
  if (currentTime > decodedUserData.exp) {

    // Logout user
    store.dispatch(logoutUser());

    // Clear current profile
    store.dispatch(clearProfile());

    // Redirect to login page on token expiration
    window.location.href = '/login';
  }

}

const App = () => {

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Landing />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path='/create-profile' element={<PrivateRoute><CreateProfile /></PrivateRoute>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App
