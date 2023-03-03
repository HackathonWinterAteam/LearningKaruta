import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useEffect } from 'react';


// ログイン時のみアクセスを許可
const ProtectedRoute = ({ children }) => {
  const { user, getUser } = useAuthContext();

  useEffect(() => {
    getUser();
}, []);



  return children;
};

export default ProtectedRoute;

