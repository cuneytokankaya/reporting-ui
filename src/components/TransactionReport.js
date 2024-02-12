import React, { useState } from "react";
import { Form ,Button} from "react-bootstrap";
import Dashboard from "./Dashboard";
import TransactionTable from "./TransactionTable";

function TransactionReport() {
  const token = localStorage.getItem("token");
  const [data,setData] = useState(['']);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [merchantId, setMerchantId] = useState();
  const [acquirerId, setAcquirerId] = useState();

  const handleList = (e) => {
    e.preventDefault();
    getTransactionReport();
  }

  async function getTransactionReport() {
    return fetch("http://localhost:8080/api/v3/transactions/report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        startDate: startDate,
        endDate: endDate,
        merchantId: merchantId === '' ? null : merchantId,
        acquirerId: acquirerId === '' ? null : acquirerId,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status === "APPROVED") {
          setData(result.response);
        }else
        {
          setData(['']);
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <Dashboard></Dashboard>
      <br></br>
      <h3>Transaction Report</h3>
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
        <Button variant="primary" type="submit" onClick={(e) => handleList(e)}>
          List
        </Button>
      </Form>
      <br></br>
      <TransactionTable data={data}/>
    </div>
  );
}

export default TransactionReport;
