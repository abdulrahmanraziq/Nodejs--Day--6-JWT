import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link, useNavigate } from "react-router-dom";
import AxiosService from "../utils/AxiosService";
import ApiRoutes from "../utils/ApiRoutes";
import toast from "react-hot-toast";

function ForgotPassword() {
  let [email, setEmail] = useState("");
  let navigate = useNavigate();

  const handleReset = async () => {
    try {
      let { message } = await AxiosService.post(
        ApiRoutes.FORGOT_PASSWORD.path,
        { email },
        { authenticate: ApiRoutes.FORGOT_PASSWORD.auth }
      );
      toast.success(message);
      navigate("/reset-password");
    } catch (error) {
      toast.error(error.message || "Internal Server Error");
    }
  };
  return (
    <section id="signUp">
      <div className="container">
        <div className="row justify-content-center align-items-center userSignups">
          <div className="col-md-4 usersignup">
            <h1 className="text-center">
              Enter your email address to send OTP.
            </h1>
            <Form>
              <Form.Group
                className="mb-3 mt-2"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <div className="mt-4 text-end">
                <p style={{ marginTop: "20px" }}>
                  Remember your password? <Link to="/login">Login</Link>
                </p>
                <Button variant="warning" onClick={handleReset}>
                  Reset Password
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;
