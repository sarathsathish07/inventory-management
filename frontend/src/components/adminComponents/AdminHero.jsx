import React, { useEffect } from "react";
import { Container, Card, Button, ListGroup, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useGetItemsQuery } from "../../slices/adminApiSlice";

const Inventory = () => {
  const navigate = useNavigate();
  const { data: items = [], isLoading, isError, refetch } = useGetItemsQuery();

  const handleAddItem = () => {
    navigate("/admin/add-item");
  };

  const handleViewSalesBills = () => {
    navigate("/admin/sales-bill");
  };
  const handleInventory = () => {
    navigate("/admin");
  };
  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="d-flex">
      <div
        className="bg-dark text-white p-4"
        style={{ minWidth: "250px", height: "100vh" }}
      >
        <ListGroup variant="flush">
          <ListGroup.Item
            action
            onClick={handleInventory}
            className="text-white bg-dark mt-5"
          >
            Inventory
          </ListGroup.Item>
          <ListGroup.Item
            action
            onClick={handleViewSalesBills}
            className="text-white bg-dark "
          >
            Sales Bill
          </ListGroup.Item>
        </ListGroup>
      </div>

      <Container className="p-5 flex-grow-1">
        <div style={{ maxHeight: "640px", overflowY: "auto" }}>
          <Row>
            <Card className="p-4 bg-light w-100">
              <div
                className="d-flex flex-column align-items-start "
                style={{ marginLeft: "50px" }}
              >
                <h1 className="mb-4">Inventory Management</h1>
                <Button
                  variant="primary"
                  className="mb-3"
                  onClick={handleAddItem}
                >
                  Add Item
                </Button>
              </div>

              {isLoading && <p>Loading items...</p>}
              {isError && <p>Failed to load items.</p>}

              <Row style={{ marginLeft: "30px" }}>
                {items.map((item) => (
                  <Col
                    md={3}
                    key={item._id}
                    className="mb-4 mx-2"
                    style={{ width: "270px" }}
                  >
                    <Card className="h-100">
                      <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text>{item.description}</Card.Text>
                        <Card.Text>Quantity: {item.availableStock}</Card.Text>
                        <Card.Text>Price: Rs{item.price}</Card.Text>
                        <Card.Text>Category: {item.category}</Card.Text>
                        <Card.Text>Supplier: {item.supplier}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Inventory;
