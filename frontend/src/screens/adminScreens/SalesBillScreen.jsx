import React, { useEffect, useState } from "react";
import { Container, Table, Button, Collapse, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  useGetBillByIdQuery,
  useGetBillsQuery,
} from "../../slices/adminApiSlice";

const SalesBill = () => {
  const navigate = useNavigate();
  const { data: bills = [], isLoading, isError, refetch } = useGetBillsQuery();
  const [expandedBillId, setExpandedBillId] = useState(null);

  useEffect(() => {
    refetch();
  });

  const toggleExpand = (id) => {
    setExpandedBillId(expandedBillId === id ? null : id);
  };

  const { data: selectedBill, isLoading: billLoading } = useGetBillByIdQuery(
    expandedBillId,
    {
      skip: !expandedBillId,
    }
  );

  const handleViewSalesBills = () => {
    navigate("/admin/sales-bill");
  };

  const handleInventory = () => {
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
          <h1 className="mb-4">Sales Bills</h1>

          {isLoading && <p>Loading bills...</p>}
          {isError && <p>Failed to load bills.</p>}

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>User</th>
                <th>Order Date</th>
                <th>Total Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bills.map((bill) => (
                <React.Fragment key={bill._id}>
                  <tr>
                    <td>{bill.user}</td>
                    <td>{new Date(bill.createdAt).toLocaleDateString()}</td>
                    <td>Rs {bill.totalPrice.toFixed(2)}</td>
                    <td>
                      <Button
                        variant="info"
                        onClick={() => toggleExpand(bill._id)}
                      >
                        {expandedBillId === bill._id
                          ? "Hide Details"
                          : "View Details"}
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="4">
                      <Collapse in={expandedBillId === bill._id}>
                        <div>
                          {billLoading ? (
                            <p>Loading bill details...</p>
                          ) : (
                            selectedBill && (
                              <>
                                <h5>User: {selectedBill.user}</h5>
                                <p>
                                  Date:{" "}
                                  {new Date(
                                    selectedBill.createdAt
                                  ).toLocaleDateString()}
                                </p>
                                <p>
                                  Total Price: Rs{" "}
                                  {selectedBill.totalPrice.toFixed(2)}
                                </p>
                                <h6>Items:</h6>
                                <ul>
                                  {selectedBill.items.map((item) => (
                                    <li key={item.itemId}>
                                      {item.name} - {item.quantity} x Rs{" "}
                                      {item.price.toFixed(2)}
                                    </li>
                                  ))}
                                </ul>
                              </>
                            )
                          )}
                        </div>
                      </Collapse>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
};

export default SalesBill;
