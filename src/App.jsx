import { useEffect, useState } from 'react';
import Login from './components/admin/Login';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { useDispatch } from 'react-redux';
import Layout from './components/admin/Layout';
import UserLayout from './components/UserLayout';

function App() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const { pathname } = location;

    pathname == '/admin'
      ? (document.title = 'Tech Blogs - Admin')
      : (document.title = 'Tech Blogs - Get Updated with Latest Tech');
  }, [location]);

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
          setIsLoggedIn(true);
        } else {
          dispatch(logout());
          setIsLoggedIn(false);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return location.pathname == '/admin' ? (
    !loading ? (
      isLoggedIn ? (
        <>
          <Layout />
        </>
      ) : (
        <Login />
      )
    ) : null
  ) : (
    <UserLayout />
  );
}

export default App;
