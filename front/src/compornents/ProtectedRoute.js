import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { getUser } = useAuthContext();
  const user = getUser();
  if (user == undefined) {
    return <Navigate to="/login" />
  }
  return children;
};

export default ProtectedRoute;