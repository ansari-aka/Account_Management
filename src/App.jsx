import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './contexts/AuthContext';

// Import Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

// Import Components
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Navigation />
      <Container className="mt-4" style={{ minHeight: '80vh' }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Private Routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Add a 404 Not Found route if you want */}
          <Route path="*" element={<h2>404: Page Not Found</h2>} />
        </Routes>
      </Container>
      <footer className="text-center p-3" style={{ backgroundColor: '#f8f9fa' }}>
        &copy; {new Date().getFullYear()} My Account App
      </footer>
    </AuthProvider>
  );
}

export default App;