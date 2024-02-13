import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Dashboard from "./Dashboard";
import GenericTable from "./GenericTable";

function TransactionDetail() {
  const token = localStorage.getItem("token");
  const [data, setData] = useState([""]);
  const [transactionId, setTransactionId] = useState();

  const handleGet = (e) => {
    e.preventDefault();
    getTransactionDetail();
  };

  async function getTransactionDetail() {
    return fetch("http://localhost:8080/api/v3/transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        transactionId: transactionId === "" ? null : transactionId,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData([""]);
        if (result != null && result.transaction != null) {
          const headers = Object.keys(result.transaction);
          const rows = Object.values(result.transaction);
          setData([headers, rows]);
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <Dashboard></Dashboard>
      <br></br>
      <h3>Transaction Detail</h3>
      <Form>
        <Form.Group className="mb-3" controlId="transactionId">
          <Form.Label>Transaction Id</Form.Label>
          <Form.Control
            type="text"
            placeholder="Transaction Id"
            onChange={(i) => setTransactionId(i.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={(e) => handleGet(e)}>
          Get
        </Button>
      </Form>
      <br></br>
      <GenericTable data={data} />
    </div>
  );
}

export default TransactionDetail;
