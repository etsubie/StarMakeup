import jwt_decode from 'jwt-decode';

// Utility function to get the role from the decoded token
const getUserRole = () => {
  const token = localStorage.getItem('token');  // Assume the token is saved here
  if (token) {
    try {
      const decodedToken = jwt_decode(token);
      return decodedToken.role;  // Return the role from the decoded token
    } catch (error) {
      console.error('Error decoding token', error);
    }
  }
  return null;
};
