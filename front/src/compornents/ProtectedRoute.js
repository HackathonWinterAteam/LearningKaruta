import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useEffect } from 'react';


// ログイン時のみアクセスを許可
const ProtectedRoute = ({ children }) => {
  const { user, getUser } = useAuthContext();

  useEffect(() => {
    const fetchUser = async () => {
      await getUser();
    };
    fetchUser();
  }, []);
  
  if (!user) {
    return <Navigate to="/" />;
  }
  

  return children;
};



export default ProtectedRoute;

