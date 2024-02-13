import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Dashboard from "./Dashboard";
import GenericTable from "./GenericTable";

function TransactionList() {
  const token = localStorage.getItem("token");
  const [data, setData] = useState([""]);
  const [page, setPage] = useState("1");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [merchantId, setMerchantId] = useState();
  const [acquirerId, setAcquirerId] = useState();
  const [status, setStatus] = useState();
  const [operation, setOperation] = useState();
  const [paymentMethod, setPaymentMethod] = useState();

  const handleList = (e) => {
    e.preventDefault();
    getTransactionReport();
  };

  async function getTransactionReport() {
    return fetch("http://localhost:8080/api/v3/transaction/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        startDate: startDate,
        endDate: endDate,
        merchantId: merchantId === '' ? null : merchantId,
        acquirerId: acquirerId === '' ? null : acquirerId,
        page: page === '' ? null : page,
        status: status === '' ? null : status,
        operation: operation === '' ? null : operation,
        paymentMethod: paymentMethod === '' ? null : paymentMethod,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(['']);
        if (result != null && result.data != null) {
          let transactions = [];
          result.data.map(function (item) {
            transactions.push(item.transaction);
          });

          setData(transactions);
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <Dashboard></Dashboard>
      <br></br>
      <h3>Transaction List</h3>
      <Form>
        <Form.Group className="mb-3" controlId="startDate">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            placeholder="Start Date"
            onChange={(i) => setStartDate(i.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="endDate">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            placeholder="End Date"
            onChange={(i) => setEndDate(i.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="merchantId">
          <Form.Label>Merchant Id</Form.Label>
          <Form.Control
            type="text"
            placeholder="Merchant Id"
            onChange={(i) => setMerchantId(i.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="acquirerId">
          <Form.Label>Acquirer Id</Form.Label>
          <Form.Control
            type="text"
            placeholder="Acquirer Id"
            onChange={(i) => setAcquirerId(i.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="status">
          <Form.Label>Status</Form.Label>
          <Form.Control
            type="text"
            placeholder="Status"
            onChange={(i) => setStatus(i.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="operation">
          <Form.Label>Operation</Form.Label>
          <Form.Control
            type="text"
            placeholder="Operation"
            onChange={(i) => setOperation(i.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="paymentMethod">
          <Form.Label>Payment Method</Form.Label>
          <Form.Control
            type="text"
            placeholder="Payment Method"
            onChange={(i) => setPaymentMethod(i.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="page">
          <Form.Label>Page</Form.Label>
          <Form.Control
            type="text"
            placeholder="Page"
            defaultValue={1}
            onChange={(i) => setPage(i.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={(e) => handleList(e)}>
          List
        </Button>
      </Form>
      <br></br>
      <GenericTable data={data} />
    </div>
  );
}

export default TransactionList;
