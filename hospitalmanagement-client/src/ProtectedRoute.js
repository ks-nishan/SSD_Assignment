import React from 'react';
import { Route, Navigate } from 'react-router-dom';

function ProtectedRoute({ element, authenticated, ...rest }) {
  return authenticated ? (
    element
  ) : (
    <Navigate to="/" replace state={{ from: rest.location }} />
  );
}

export default ProtectedRoute;
