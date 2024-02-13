import React from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <Form>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Dashboard</Form.Label>
        <Button
          variant="primary"
          type="button"
          onClick={() => navigate("/transaction-list")}
        >
          Transaction List
        </Button>
        <Button
          variant="primary"
          type="button"
          onClick={() => navigate("/transaction-report")}
        >
          Transaction Report
        </Button>
        <Button
          variant="primary"
          type="button"
          onClick={() => navigate("/transaction-detail")}
        >
          Transaction Detail
        </Button>
        <Button
          variant="primary"
          type="button"
          onClick={() => navigate("/client-detail")}
        >
          Client Detail
        </Button>
        <Button
          variant="primary"
          type="button"
          onClick={() => navigate("/logout")}
        >
          Logout
        </Button>
      </Form.Group>
    </Form>
  );
}

export default Dashboard;
