import React from 'react';

const PrivateRoute = ({ children }) => {
  // Temporarily allow access to all private routes
  return children;
};

export default PrivateRoute;