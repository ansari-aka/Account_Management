import React, { useState } from 'react';
import { Card, Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
  const { currentUser, updateUser } = useAuth();

  // State for managing editing mode
  const [isEditing, setIsEditing] = useState(false);

  // State for form data, initialized with current user's info
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);

  // State for messages
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    // Basic validation
    if (!name || !email) {
      setError('Name and Email fields cannot be empty');
      setLoading(false);
      return;
    }

    // Call the updateUser function from context
    const result = updateUser({ name, email });

    if (result.success) {
      setMessage(result.message);
      setIsEditing(false); // Exit editing mode on success
    } else {
      setError(result.message || 'Failed to update profile');
    }

    setLoading(false);
  };

  const handleCancel = () => {
    // Reset form fields to current user data and exit editing mode
    setName(currentUser.name);
    setEmail(currentUser.email);
    setIsEditing(false);
    setError('');
    setMessage('');
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">My Profile</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              {message && <Alert variant="success">{message}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group id="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    readOnly={!isEditing}
                    plaintext={!isEditing}
                  />
                </Form.Group>
                <Form.Group id="email" className="mt-2">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    readOnly={!isEditing}
                    plaintext={!isEditing}
                  />
                </Form.Group>

                {isEditing ? (
                  <div className="mt-4">
                    <Button
                      disabled={loading}
                      type="submit"
                      className="w-100 mb-2"
                    >
                      Save Changes
                    </Button>
                    <Button
                      variant="outline-secondary"
                      className="w-100"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button
                    className="w-100 mt-4"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </Button>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}