import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import AxiosService from "../utils/AxiosService";
import ApiRoutes from "../utils/ApiRoutes";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function CreateUrl() {
  let [originalUrl, setOriginalUrl] = useState('');
  let navigate = useNavigate();
  const handleShortUrl = async() => {
    try {
      let {message, url} = await AxiosService.post(ApiRoutes.CREATE_URL.path, {originalUrl}, {authenticate:ApiRoutes.CREATE_URL.auth});
      toast.success(message);
      navigate('/home');
    } catch (error) {
        toast.error(error.message || "Internal Server Error");
    }
  }
  return (
    <>
      <section id="backgroundImage">
        <div className="container">
          <div className="row justify-content-center align-items-center" style={{height:'100vh'}}>
            <div className="col-5 url-background">
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label><b>Enter URL Shortner</b></Form.Label>
                  <Form.Control type="text" placeholder="Enter URL" onChange={(e) => setOriginalUrl(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" onClick={handleShortUrl}>Shortner Url</Button>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CreateUrl;
