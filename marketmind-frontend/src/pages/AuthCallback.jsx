import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/me`, {
          credentials: 'include'
        });
        const userData = await response.json();
        setUser(userData);
        navigate('/dashboard');
      } catch (error) {
        console.error('Auth callback error:', error);
        navigate('/login');
      }
    };

    handleAuthCallback();
  }, [navigate, setUser]);

  return <div>Loading...</div>;
};

export default AuthCallback;