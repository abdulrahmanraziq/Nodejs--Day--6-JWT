import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AxiosService from "../utils/AxiosService";
import ApiRoutes from "../utils/ApiRoutes";
import toast from "react-hot-toast";

function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [showPassword, setShowPassword] = useState(false);
  let navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      let { message, token, role } = await AxiosService.post(
        ApiRoutes.LOGIN.path,
        { email, password },
        { authenticate: ApiRoutes.LOGIN.auth }
      );
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("role", role);
      toast.success(message);
      navigate("/home")
    } catch (error) {
      toast.error(error.message || 'Internal Server Error');
    }
  };
  return (
    <section id="backgroundImage">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <></>
          </div>
          <div className="col-md-6 loginMargin">
            <div className="login-background">
              <h1 className="text-center text-uppercase">Login</h1>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <div style={{ position: "relative" }}>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter Password"
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

                <p className="mt-2">
                  Remember me <Link to="/forgot-password">Forgot Password</Link>
                </p>
                <Button
                  variant="success"
                  className="col-12 mt-2"
                  onClick={handleLogin}
                >
                  Login
                </Button>

                <p className="mt-3">
                  Don't have an account? <Link to="/signup">Register here</Link>
                </p>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
