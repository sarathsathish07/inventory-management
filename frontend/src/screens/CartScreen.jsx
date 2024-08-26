import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Card,
  Button,
  Row,
  Col,
  Form,
  Toast,
} from "react-bootstrap";
import { removeItemFromCart, updateItemQuantity } from "../slices/cartSlice";
import {
  useCreateBillMutation,
  useUpdateItemQuantityMutation,
} from "../slices/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [createBill, { isLoading, isError, isSuccess }] =
    useCreateBillMutation();
  const [updateItemQuantityInDB] = useUpdateItemQuantityMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const handleIncreaseQuantity = (item) => {

    if (item.quantity < item.availableStock) {
      dispatch(
        updateItemQuantity({ _id: item._id, quantity: item.quantity + 1 })
      );
    } else {
      toast.success("Maximum stock reached!");
      setShowToast(true);
    }
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateItemQuantity({ _id: item._id, quantity: item.quantity - 1 })
      );
    }
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeItemFromCart(itemId));
  };

  const handleBuyProduct = async () => {
    const totalPrice = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    try {
      await createBill({
        user: userInfo.email,
        items: cartItems.map((item) => ({
          itemId: item._id,
          name: item.name,
          description: item.description,
          price: item.price,
          quantity: item.quantity,
        })),
        totalPrice,
      }).unwrap();

      await Promise.all(
        cartItems.map((item) =>
          updateItemQuantityInDB({
            _id: item._id,
            quantity: item.availableStock - item.quantity,
          })
        )
      );

      cartItems.forEach((item) => dispatch(removeItemFromCart(item._id)));

      toast.success("Order placed successfully!");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Failed to place order:", error);
    }
  };

  return (
    <Container className="py-5">
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <Card className="mb-4" key={item._id}>
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  <Card.Text>Price: ${item.price}</Card.Text>
                  <Card.Text>Available Stock: {item.availableStock}</Card.Text>
                  <Row>
                    <Col xs={6}>
                      <Form.Group>
                        <Form.Label>Quantity</Form.Label>
                        <div className="d-flex">
                          <Button
                            onClick={() => handleDecreaseQuantity(item)}
                            variant="secondary"
                          >
                            -
                          </Button>
                          <Form.Control
                            type="text"
                            value={item.quantity}
                            readOnly
                            className="mx-2 text-center"
                          />
                          <Button
                            onClick={() => handleIncreaseQuantity(item)}
                            variant="secondary"
                          >
                            +
                          </Button>
                        </div>
                      </Form.Group>
                    </Col>
                    <Col
                      xs={6}
                      className="d-flex justify-content-end align-items-center"
                    >
                      <Button
                        variant="danger"
                        onClick={() => handleRemoveItem(item._id)}
                      >
                        Delete
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))
          )}
        </Col>
        <Col md={4}>
          {cartItems.length > 0 && (
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Order Summary</Card.Title>
                <Card.Text>
                  Total Price: $
                  {cartItems.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                  )}
                </Card.Text>
                <Button
                  variant="success"
                  onClick={handleBuyProduct}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Buy Product"}
                </Button>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
