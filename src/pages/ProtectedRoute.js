import { Navigate } from 'react-router-dom';
import { getUserRole } from './utils';  // Import the utility function

const ProtectedRoute = ({ children, allowedRoles }) => {
  const userRole = getUserRole();  // Get the role from the token

  if (!userRole) {
    return <Navigate to="/" replace />;  // Redirect to login if no role is found
  }

  if (allowedRoles.includes(userRole)) {
    return children;  // Render the children (the protected route)
  } else {
    return <Navigate to="/unauthorized" replace />;  // Redirect if role doesn't match
  }
};

export default ProtectedRoute;
