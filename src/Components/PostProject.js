import { Fragment, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import "../App.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PostProject() {
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    PostTitle: "",
    Description: "",
    BidPrice: "",
    RequiredSkills: "",
    PostExpiryDate: "",
  });

  const changeHandler = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (event) => {
    axios
      .post("http://localhost:3000/addClientPost", postData, {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setPostData({
          PostTitle: "",
          Description: "",
          BidPrice: "",
          RequiredSkills: "",
          PostExpiryDate: "",
        });
        navigate("/ClientHomePage");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const goBack = () => {
    navigate("/ClientHomePage");
  };
  return (
    <Fragment>
      <div className="page-bg">
        <Navbar bg="dark" expand="sm" className="mb-3 bottom-border" variant="dark">
          <Container fluid>
            <Navbar.Brand href="#" className="text-white">
              {" "}
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
                  <Nav.Link href="/ClientHomePage" className="text">
                    Home
                  </Nav.Link>
                  <Nav.Link href="#action1" className="text">
                    My Profile
                  </Nav.Link>
                  <Nav.Link
                    href="#action2"
                    className="text"
                    onClick={() => {
                      localStorage.removeItem("token");
                      localStorage.removeItem("userType");
                      navigate("/LogIn");
                    }}
                  >
                    Log Out
                  </Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
        <div className="container">
          <button className="btn btn-primary" onClick={goBack}>
            Go Back
          </button>
          <div className="card" id="card">
            <div id="sub-Add-Post">
              <h1 className="text-left">Tell us what you need done</h1>
              <p className="text-justify">
                Contact skilled freelancers within minutes. View profiles,
                ratings, portfolios and chat with them. Pay the freelancer only
                when you are 100% satisfied with their work.
              </p>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="validationCustom01">
                    <Form.Label>Project Title</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Project Title"
                      name="PostTitle"
                      onChange={changeHandler}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="validationCustom02">
                    <Form.Label>Project Bid Price</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Project Bid Price"
                      name="BidPrice"
                      onChange={changeHandler}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group
                    as={Col}
                    md="6"
                    controlId="validationCustomUsername"
                  >
                    <Form.Label>Required Skills</Form.Label>
                    <InputGroup hasValidation>
                      <Form.Control
                        type="text"
                        placeholder="Required Skills"
                        required
                        name="RequiredSkills"
                        onChange={changeHandler}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter Required SKills.
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="validationCustom04">
                    <Form.Label>Project Expiry Date</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="State"
                      required
                      name="PostExpiryDate"
                      onChange={changeHandler}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid date.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className="mb-3 mt-3">
                  <Form.Group as={Col} md="12" controlId="validationCustom03">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows="3"
                      name="Description"
                      onChange={changeHandler}
                      required
                    />
                    {/* <Form.Control type="textarea" rows="3" placeholder="Description of Project"  /> */}
                    <Form.Control.Feedback type="invalid">
                      Please provide Project Description.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Button onClick={handleSubmit}>Post Project</Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default PostProject;
