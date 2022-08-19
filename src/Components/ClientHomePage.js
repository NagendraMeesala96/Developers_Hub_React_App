import { Fragment, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { Row } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import axios from "axios";
import ProjectDetails from "./ProjectDetails";
import { useNavigate } from "react-router-dom";
import jwt from 'jwt-decode'

function ClientHomePage() {
  const [allPosts, setAllPosts] = useState([]);

  let userType = localStorage.getItem("userType");

  const navigate = useNavigate();

  useEffect(() => {
    loadAllPosts();
    if(userType!='Client')
    {
      navigate('/LogIn')
    }
  }, []);

  const loadAllPosts = () => {
    axios({
      url: `http://localhost:3000/MyPosts`,
      method: "GET",
      headers: {
        "x-token": localStorage.getItem("token"),
      },
    })
      .then((res) => {
        setAllPosts(res.data);
        const token = jwt(localStorage.getItem("token"));
        localStorage.setItem('userId',token.users.id)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const viewHandler = (postId) => {
    navigate(`/ProjectDetails/Client/${postId}`);
  };
  return (
    <div className="bg-dark card-bg">
      <Navbar bg="dark" expand="sm" className="mb-3 bottom-border" variant="dark">
        <Container fluid>
          <Navbar.Brand href="/ClientHomePage" className="text-white">
          <i class="fa fa-code"></i>&nbsp;
            Developers Hub
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-sm`}
            aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
                Developers Hub
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/PostProject" className="text-white">
                  Post a Project
                </Nav.Link>
                
                <Nav.Link
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("userType");
                    localStorage.removeItem("userId");
                    navigate('/LogIn');
                  }}
                  className="text"
                >
                  Log Out
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <Row>
        <Col>
          <div className="container-fluid">
            <div
              className="bg-dark"
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {allPosts.length > 0 ? (
                allPosts.map((project, index) => {
                  return (
                    <div style={{ margin: 5 }} key={index}>
                      <div className="row d-flex">
                        <div className="col col-md-9 col-lg-7 col-xl-5">
                          <div
                            className="card"
                            style={{
                              borderRadius: 15,
                              width: 510,
                              height: 450,
                            }}
                          >
                            <div className="card-header">
                              <Row
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <Col sm={8}>
                                  <p>
                                    <b>{project.PostTitle}</b>
                                  </p>
                                </Col>
                                <Col>{project.TotalBids} bids</Col>
                                <Col>
                                  <b>${project.BidPrice}</b>
                                </Col>
                              </Row>
                            </div>
                            <div
                              className="card-body p-4"
                              style={{ overflow: "auto" }}
                            >
                              <Row className="">
                                <p className="text-justify">
                                  <b>Description : </b>
                                  {project.Description}
                                </p>
                              </Row>
                              <Row>
                                <p>
                                  <b>RequiredSkills : </b>
                                  {project.RequiredSkills}
                                </p>
                              </Row>
                              <Row>
                                <Col>
                                  <b>Post Date : </b>
                                  {project.PostDate.slice(0, 10)}
                                </Col>
                                <Col>
                                  <b>Expiry Date :</b>{" "}
                                  {project.PostExpiryDate.slice(0, 10)}
                                </Col>
                              </Row>
                            </div>
                            <div className="card-footer">
                              <Row className="mt-3">
                                <Col sm={9}>
                                  <button
                                    className="btn btn-success"
                                    onClick={() => {
                                      viewHandler(
                                        project._id,
                                        project.PostTitle,
                                        project.Description,
                                        project.RequiredSkills
                                      );
                                    }}
                                  >
                                    View Bids
                                  </button>
                                </Col>
                              </Row>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <h2
                  className="text-white"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  No Projects Found
                </h2>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ClientHomePage;
