import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * A wrapper component that checks if a user is authenticated.
 * If they are, it renders the protected component (children).
 * If not, it redirects them to the /login page.
 */
export default function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // User not logged in, redirect to login page
    // `replace` a-voids pushing to history, so back button works as expected
    return <Navigate to="/login" replace />;
  }

  // User is logged in, render the component they were trying to access
  return children;
}