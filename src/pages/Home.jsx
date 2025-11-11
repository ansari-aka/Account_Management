import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const { currentUser } = useAuth();

  return (
    <Container className="text-center mt-5">
      <Row>
        <Col>
          <h1>Welcome to the Account Management App</h1>
          <p className="lead">
            This is a simple demo application using React, React Router, and
            Bootstrap.
          </p>
          <hr className="my-4" />

          {currentUser ? (
            <>
              <h2>Hello, {currentUser.name}!</h2>
              <p>You are logged in.</p>
              <Button as={Link} to="/profile" variant="primary" size="lg">
                View Your Profile
              </Button>
            </>
          ) : (
            <>
              <p>Please log in or register to manage your account.</p>
              <Button
                as={Link}
                to="/login"
                variant="primary"
                size="lg"
                className="me-2"
              >
                Log In
              </Button>
              <Button as={Link} to="/register" variant="secondary" size="lg">
                Register
              </Button>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}