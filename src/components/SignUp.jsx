import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Navigate, Link, useNavigate } from "react-router-dom";
import AxiosService from "../utils/AxiosService";
import ApiRoutes from "../utils/ApiRoutes";
import toast from "react-hot-toast";

function SignUp() {
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [email, setEmail] = useState("");
  let [mobile, setMobile] = useState("");
  let [password, setPassword] = useState("");
  let [role, setRole] = useState("");
  let [showPassword, setShowPassword] = useState(false);
  let navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const createSignUp = async () => {
    try {
      let { message, user } = await AxiosService.post(
        ApiRoutes.SIGNUP.path,
        { firstName, lastName, email, mobile, password, role },
        { authenticate: ApiRoutes.SIGNUP.auth }
      );
      toast.success(message);
      navigate('/login');
    } catch (error) {
        toast.error(error.message || "Internal Server Error");
    }
  };
  return (
    <section id="signUp">
      <div className="container">
        <div className="row justify-content-center align-items-center userSignups">
          <div className="col-md-4 usersignup">
            <h1 className="text-center">Register Here</h1>
            <Form>
              <Row>
                <Col>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    placeholder="First name"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Col>
                <Col>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    placeholder="Last name"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Col>
              </Row>
              <Form.Group className="mb-3 mt-2">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3 mt-2">
                <Form.Label>Mobile</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter a Mobile Number"
                  onChange={(e) => setMobile(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3 mt-2">
                <Form.Label>Password</Form.Label>
                <div style={{ position: "relative" }}>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter a Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    onClick={togglePasswordVisibility}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </Form.Group>

              <Form.Label>Role</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setRole(e.target.value)}
              >
                <option>Open this select menu</option>
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </Form.Select>
              <div className="mt-4 text-end">
                <p style={{ marginTop: "20px" }}>
                  Already have an account? <Link to="/login">Login</Link>
                </p>
                <Button variant="primary" onClick={createSignUp}>
                  Create Account
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
