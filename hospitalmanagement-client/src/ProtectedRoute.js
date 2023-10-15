import React, { useEffect } from 'react';
import { Route, Navigate } from 'react-router-dom';

function ProtectedRoute({ element, ...rest }) {
  useEffect(() => {
    // Check for the token in localStorage
    const token = localStorage.getItem("token");

    // If the token is found, navigate to the element, else, navigate to the login page
    if (!token) {
      window.location.href = '/';// Redirect to the login route
    }
  }, []);

  return element;
}

export default ProtectedRoute;
