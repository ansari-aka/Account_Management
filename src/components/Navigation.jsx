import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navigation() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Account App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            {currentUser && (
              <Nav.Link as={Link} to="/profile">
                Profile
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            {currentUser ? (
              <Button variant="outline-secondary" onClick={handleLogout}>
                Log Out
              </Button>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="me-2">
                  Log In
                </Nav.Link>
                <Button as={Link} to="/register" variant="primary">
                  Sign Up
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
