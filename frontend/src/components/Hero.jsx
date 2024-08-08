import React from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "../slices/usersApiSlice";
import { addItemToCart } from "../slices/cartSlice";

const Hero = () => {
  const { data: items = [], isLoading, isError } = useGetProductsQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (item) => {
    dispatch(addItemToCart({ ...item, quantity: 1 }));
    navigate("/cart");
  };

  return (
    <div className="py-5">
      <Container>
        <Row>
          {isLoading && <p>Loading items...</p>}
          {isError && <p>Failed to load items.</p>}
          {items.map((item) => (
            <Col lg={4} md={6} sm={12} key={item._id} className="mb-4">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  <Card.Text>Price: ${item.price}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Hero;
