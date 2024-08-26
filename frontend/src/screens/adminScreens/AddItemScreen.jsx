import React, { useState } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Toast,
  ListGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAddItemMutation } from "../../slices/adminApiSlice";
import { toast } from "react-toastify";

const AddItem = () => {
  const [itemDetails, setItemDetails] = useState({
    name: "",
    description: "",
    availableStock: 0,
    price: 0,
    category: "",
    supplier: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [addItem, { isLoading }] = useAddItemMutation();

  const handleChange = (e) => {
    setItemDetails({
      ...itemDetails,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: "" }); 
  };

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    if (!itemDetails.name.trim()) {
      formIsValid = false;
      errors["name"] = "Name is required";
    }

    if (!itemDetails.description.trim()) {
      formIsValid = false;
      errors["description"] = "Description is required";
    }

    if (itemDetails.availableStock <= 0) {
      formIsValid = false;
      errors["availableStock"] = "Quantity must be greater than 0";
    }

    if (itemDetails.price <= 0) {
      formIsValid = false;
      errors["price"] = "Price must be greater than 0";
    }

    if (!itemDetails.category.trim()) {
      formIsValid = false;
      errors["category"] = "Category is required";
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the validation errors.");
      return;
    }

    try {
      await addItem(itemDetails).unwrap();
      toast.success("Item added successfully!");
      setTimeout(() => {
        navigate("/admin");
      }, 1000);
    } catch (err) {
      console.error("Failed to add item:", err);
    }
  };

  const handleViewSalesBills = () => {
    navigate("/admin/sales-bill");
  };

  const handleViewInventory = () => {
    navigate("/admin");
  };

  return (
    <div className="d-flex">
      <div
        className="bg-dark text-white p-4"
        style={{ minWidth: "250px", height: "100vh" }}
      >
        <ListGroup variant="flush">
          <ListGroup.Item
            action
            onClick={handleViewInventory}
            className="text-white bg-dark mt-5"
          >
            Inventory
          </ListGroup.Item>
          <ListGroup.Item
            action
            onClick={handleViewSalesBills}
            className="text-white bg-dark"
          >
            Sales Bill
          </ListGroup.Item>
        </ListGroup>
      </div>

      <Container className="p-5 flex-grow-1">
        <div style={{ maxHeight: "640px", overflowY: "auto" }}>
          <Card className="p-4 bg-light w-75 mx-auto">
            <h1 className="mb-4 text-center">Add New Item</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-2">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={itemDetails.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={itemDetails.description}
                  onChange={handleChange}
                  isInvalid={!!errors.description}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  name="availableStock"
                  value={itemDetails.availableStock}
                  onChange={handleChange}
                  isInvalid={!!errors.availableStock}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.availableStock}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={itemDetails.price}
                  onChange={handleChange}
                  isInvalid={!!errors.price}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.price}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  name="category"
                  value={itemDetails.category}
                  onChange={handleChange}
                  isInvalid={!!errors.category}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.category}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Supplier</Form.Label>
                <Form.Control
                  type="text"
                  name="supplier"
                  value={itemDetails.supplier}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Submit"}
              </Button>
            </Form>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default AddItem;
