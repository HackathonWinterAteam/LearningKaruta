import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useEffect } from 'react';


// ログイン時のみアクセスを許可
const ProtectedRoute = ({ children }) => {
  const { getUser } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUser();
      if (!user) {
        return <Navigate to="/login" />
      }
    };
    fetchData();
  }, [getUser]);

  return children;
};

export default ProtectedRoute;

