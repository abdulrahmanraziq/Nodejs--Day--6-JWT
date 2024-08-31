import React, { useState } from 'react'
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AxiosService from '../utils/AxiosService';
import ApiRoutes from '../utils/ApiRoutes';
import toast from 'react-hot-toast';
function ResetPassword() {
    let [OTP, setOtp] = useState('');
    let [password, setPassword] = useState('');
    let [showPassword, setShowPassword] = useState(false);
    let navigate = useNavigate()
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const handleReset = async() => {
      try {
        let {message} = await AxiosService.post(ApiRoutes.RESET_PASSWORD.path, {OTP, password}, {authenticate: ApiRoutes.RESET_PASSWORD.auth});
        toast.success(message);
      navigate("/login");
      } catch (error) {
        toast.error(error.message);
      }
    }

  return (
    <section id="signUp">
      <div className="container">
        <div className="row justify-content-center align-items-center userSignups">
          <div className="col-md-4 usersignup">
            <h1 className="text-center">Reset Password</h1>
            <p>Enter the OTP and set a new password.</p>
            <Form>
              <Form.Group className="mb-3 mt-2">
                <Form.Label>Enter OTP</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Your OTP"
                  onChange={(e) => setOtp(+e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3 mt-2">
                <Form.Label>Password</Form.Label>
                <div style={{ position: "relative" }}>
                  <Form.Control
                    type={ showPassword ? "text" : "password"}
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
              <div className="mt-4 text-end">
                <Button variant="primary" onClick={handleReset}>
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ResetPassword
