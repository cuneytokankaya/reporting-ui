import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Dashboard from "./Dashboard";
import GenericTable from "./GenericTable";
  
function Client() {
  const token = localStorage.getItem("token");
  const [data, setData] = useState([""]);
  const [transactionId, setTransactionId] = useState();

  const handleGet = (e) => {
    e.preventDefault();
    getClientDetail();
  };

  async function getClientDetail() {
    return fetch("http://localhost:8080/api/v3/client", {
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
        if (result != null && result.customer != null) {
          const headers = Object.keys(result.customer);
          const rows = Object.values(result.customer);
          setData([headers, rows]);
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <Dashboard></Dashboard>
      <br></br>
      <h3>Client Detail</h3>
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

export default Client;
