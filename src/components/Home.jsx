import React, { useEffect, useState } from "react";
import AxiosService from "../utils/AxiosService";
import ApiRoutes from "../utils/ApiRoutes";
import toast from "react-hot-toast";
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";


function Home() {
  let [data, setData] = useState([]);
  let navigate = useNavigate();
  const getData = async () => {
    try {
      let { message, url } = await AxiosService.get(
        ApiRoutes.CREATE_HOME.path,
        { authenticate: ApiRoutes.CREATE_HOME.auth }
      );
      toast.success(message);
      setData(url);
    } catch (error) {
      toast.error(error.message || "Internal Server Error");
    }
  };

  const handleDelete = async(shortUrl) => {
    try {
      let {message} = await AxiosService.delete(`${ApiRoutes.DELETE_URL.path}/${shortUrl}`, {authenticate:ApiRoutes.DELETE_URL.auth});
      toast.success(message);
      getData();
    } catch (error) {
      toast.error(error.message || "Internal Server Error");
    }
  }

  const handleEdit = (shortUrl) => {
      navigate(`/viewUrl/${shortUrl}`)
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1>URL Management</h1>
              <Table striped bordered hover responsive className="mt-2">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Original Url</th>
                    <th>Short Url</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => {
                    const createdAtFormatted = new Date(item.createdAt).toLocaleDateString('en-us');
                    const updatedAtFormatted = new Date(item.updatedAt).toLocaleDateString('en-us');
                    return (
                      <tr key={index}>
                        <td>{item._id}</td>
                        <td style={{ maxWidth: '200px', wordWrap: 'break-word', whiteSpace: 'normal' }}>{item.originalUrl}</td>
                          <td><a href={item.originalUrl} target="_blank" rel="noopener noreferrer">
                              {item.shortUrl}
                            </a></td>
                        <td>{createdAtFormatted}</td>
                        <td>{updatedAtFormatted}</td> 
                        <td>
                        <Button variant="warning" onClick={() => handleEdit(item.shortUrl)}>Edit</Button> {'  '}
                        <Button variant="danger" onClick={() => handleDelete(item.shortUrl)}>Delete</Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
