// In AuthCallback.jsx
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuth();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Only proceed if we have the token and user in the URL
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const userDataParam = params.get('user');

        console.log('Current URL:', window.location.href);
        console.log('Token from URL:', token);
        console.log('User data from URL:', userDataParam);

        if (!token || !userDataParam) {
          console.log('No token or user data in URL, redirecting to login');
          navigate('/login', { replace: true });
          return;
        }

        // Parse and validate user data
        let userData;
        try {
          userData = JSON.parse(decodeURIComponent(userDataParam));
          console.log('Parsed user data:', userData);
        } catch (e) {
          console.error('Failed to parse user data:', e);
          throw new Error('Invalid user data format');
        }

        // Store token and update state
        localStorage.setItem('token', token);
        setUser(userData);

        // Redirect to dashboard and replace the history entry
        navigate('/dashboard', { replace: true });

      } catch (error) {
        console.error('Auth callback error:', error);
        navigate('/login', { replace: true, state: { error: error.message } });
      }
    };

    handleAuthCallback();
  }, [navigate, setUser, location.search]); // Add location.search to dependencies

  return <div>Loading...</div>;
};

export default AuthCallback;