import React, { useContext, useState, useEffect } from 'react';

// Create the context
const AuthContext = React.createContext();

// Custom hook to use the auth context
export function useAuth() {
  return useContext(AuthContext);
}

// Context Provider component
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  // On initial load, check localStorage for an existing user session
  useEffect(() => {
    try {
      const user = localStorage.getItem('currentUser');
      if (user) {
        setCurrentUser(JSON.parse(user));
      }
    } catch (error) {
      console.error('Failed to parse user from localStorage', error);
      localStorage.removeItem('currentUser');
    }
  }, []);

  /**
   * Simulates a user registration.
   * In a real app, this would be an API call.
   * NOTE: We are storing passwords in plain text in localStorage for
   * demo purposes ONLY. This is highly insecure.
   */
  const register = (name, email, password) => {
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
      return { success: false, message: 'Email already in use' };
    }

    // Create new user and save to "database" (localStorage)
    const newUser = { id: Date.now(), name, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Also log the new user in
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    setCurrentUser(newUser);

    return { success: true };
  };

  /**
   * Simulates a user login.
   * In a real app, this would be an API call.
   */
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      // User found, "log them in"
      localStorage.setItem('currentUser', JSON.stringify(user));
      setCurrentUser(user);
      return { success: true };
    } else {
      // User not found or password incorrect
      return { success: false, message: 'Invalid email or password' };
    }
  };

  /**
   * Logs the user out.
   */
  const logout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  /**
   * Simulates updating user information.
   * In a real app, this would be a PATCH/PUT API call.
   */
  const updateUser = (updatedInfo) => {
    if (!currentUser) return;

    // Update the "currentUser" in state and localStorage
    const updatedUser = { ...currentUser, ...updatedInfo };
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    // Also update the user in the main "users" list
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    localStorage.setItem('users', JSON.stringify(users));

    return { success: true, message: 'Profile updated successfully!' };
  };

  // The value provided to all consuming components
  const value = {
    currentUser,
    register,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}