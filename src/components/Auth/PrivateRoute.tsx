import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = localStorage.getItem('token'); // Check if the token exists
  const location = useLocation(); // Get the current location

  if (!token) {
    // If not authenticated, redirect to login with the current location as state
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // If authenticated, render the children (protected content)
  return children;
};

export default PrivateRoute;
