import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useEffect } from 'react';



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



// import { Navigate } from 'react-router-dom';
// import { useAuthContext } from '../context/AuthContext';

// const ProtectedRoute = ({ children }) => {
//   const { getUser } = useAuthContext();
//   const user = getUser();
//   if (user == undefined) {
//     return <Navigate to="/login" />
//   }
//   console.log(user)
//   return children;
// };

// export default ProtectedRoute;