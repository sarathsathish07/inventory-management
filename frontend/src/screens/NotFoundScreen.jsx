import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

const NotFoundScreen = () => {
  return (
    <Container className="text-center mt-5">
      <Row>
        <Col>
          <h1>404 - Page Not Found</h1>
          <p>Oops! The page you're looking for doesn't exist.</p>
          <Button variant="primary" as={Link} to="/">
            Go Back Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundScreen;
