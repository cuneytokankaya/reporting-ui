import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function loginRequest() {
    return fetch("http://localhost:8080/api/v3/merchant/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.status === "APPROVED") {
          localStorage.setItem("token", result.token);
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        console.error(err);
        alert(err);
      });
  }

  const handleLogin = (e) => {
    e.preventDefault();
    loginRequest();
    setEmail("");
    setPassword("");
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={(i) => setEmail(i.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(i) => setPassword(i.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit" onClick={(e) => handleLogin(e)}>
        Login
      </Button>
    </Form>
  );
}

export default Login;
