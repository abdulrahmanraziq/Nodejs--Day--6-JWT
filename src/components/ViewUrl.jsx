import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import AxiosService from "../utils/AxiosService";
import ApiRoutes from "../utils/ApiRoutes";
import { useNavigate, useParams } from 'react-router-dom';
import toast from "react-hot-toast";


function ViewUrl() {
    let [originalUrl, setOriginalUrl] = useState('');
    let navigate = useNavigate();
    const { shortUrl } = useParams();

    const getDataById = async() => {
        try {
            let {message, url} = await AxiosService.get(`${ApiRoutes.GET_BY_ID_URL.path}/${shortUrl}`, {authenticate: ApiRoutes.GET_BY_ID_URL.auth});
            toast.success(message);
            setOriginalUrl(url.originalUrl);
        } catch (error) {
            toast.error(error.message || 'Internal Server Error');
        }
    }

    const updateUrl = async() => {
        try {
            let {message, url} = await AxiosService.put(`${ApiRoutes.UPDATE_URL.path}/${shortUrl}`, {originalUrl}, {authenticate: ApiRoutes.UPDATE_URL.auth});
            toast.success(message);
            navigate('/home')
        } catch (error) {
            toast.error(error.message || 'Internal Server Error');
        }
    }

    useEffect(() =>{
        getDataById();
    }, [])
  return (
    <>
      <section id="backgroundImage">
        <div className="container">
          <div
            className="row justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <div className="col-5 url-background">
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    <b>Enter URL Shortner</b>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={originalUrl}
                    placeholder="Enter URL"
                    onChange={(e) => setOriginalUrl(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" onClick={updateUrl}>
                 Update Shortner Url
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ViewUrl;
