import { useEffect, useState } from 'react';
import Login from './components/admin/Login';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { useDispatch } from 'react-redux';
import Layout from './components/admin/Layout';
import UserLayout from './components/UserLayout';
import { useNavigate } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // New loading state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const { pathname } = location;

    pathname === '/admin'
      ? (document.title = 'Tech Blogs - Admin')
      : (document.title = 'Tech Blogs - Get Updated with Latest Tech');
  }, [location]);

  useEffect(() => {
    authService.getCurrentUser().then((userData) => {
      if (location.pathname === '/admin') {
        if (userData) {
          navigate('/admin/dashboard');
          dispatch(login({ userData }));
          setIsLoggedIn(true);
        } else {
          dispatch(logout());
          setIsLoggedIn(false);
        }
        setIsLoading(false); // Update loading state when authentication check is complete
      }
    });
  }, []);

  if (location.pathname === '/admin') {
    if (isLoading) {
      return null; // Render nothing while loading
    }

    if (!isLoggedIn) {
      return <Login />; // Render Login component if not logged in
    }

    return <Layout />; // Render Layout component if logged in
  } else {
    return <UserLayout />; // Render UserLayout component for non-admin routes
  }
}

export default App;
