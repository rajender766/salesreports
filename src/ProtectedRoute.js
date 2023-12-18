import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const ProtectedRoute = (props) => {
  const navigate = useNavigate();

  const jwtToken = Cookies.get('sales-token');
  useEffect(() => {
    if (!jwtToken) {
      return navigate('/login');
    }
  }, [jwtToken, navigate]);

  if (jwtToken === undefined) {
    return null;
  }

  return props.children;
};
