import { Fragment, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Col from "react-bootstrap/Col";
import { Row } from "react-bootstrap";
function EditEducation(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const [editEducation, setEditEducation] = useState({
    CollegeName1: props.obj.CollegeName1,
    Percentage1: props.obj.Percentage1,
    CollegeName2: props.obj.CollegeName2,
    Percentage2: props.obj.Percentage2,
    SchoolName: props.obj.SchoolName,
    Percentage3: props.obj.Percentage3,
  });

  const loadPage = () => {
    setEditEducation({
      CollegeName1: props.obj.CollegeName1,
      Percentage1: props.obj.Percentage1,
      CollegeName2: props.obj.CollegeName2,
      Percentage2: props.obj.Percentage2,
      SchoolName: props.obj.SchoolName,
      Percentage3: props.obj.Percentage3,
    });
  };

  const changeHandler = (e) => {
    setEditEducation({
      ...editEducation,
      [e.target.name]: e.target.value,
    });
  };

  const saveChanges = () => {
    let updatedData = {
      CollegeName1: editEducation.CollegeName1,
      Percentage1: editEducation.Percentage1,
      CollegeName2: editEducation.CollegeName2,
      Percentage2: editEducation.Percentage2,
      SchoolName: editEducation.SchoolName,
      Percentage3: editEducation.Percentage3,
    };

    axios
      .put("http://localhost:3000/UpdateEducation", updatedData, {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        alert(res.data.status);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Fragment>
      <div>
        <button
          className="btn btn-outline-primary mt-3"
          onClick={() => {
            handleShow();
            loadPage();
          }}
        >
          Update Details
        </button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Educational Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Form.Label> Graduation :</Form.Label>
                <Col sm={6}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      placeholder="College Name"
                      name="CollegeName1"
                      value={editEducation.CollegeName1}
                      onChange={changeHandler}
                    />
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Percentage"
                      autoFocus
                      name="Percentage1"
                      value={editEducation.Percentage1}
                      onChange={changeHandler}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Form.Label>Secondary School :</Form.Label>
                <Col sm={6}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      placeholder="CollegeName"
                      autoFocus
                      name="CollegeName2"
                      value={editEducation.CollegeName2}
                      onChange={changeHandler}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Percentage2"
                      autoFocus
                      name="Percentage2"
                      value={editEducation.Percentage2}
                      onChange={changeHandler}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Form.Label>School :</Form.Label>
                <Col sm={6}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      placeholder="SchoolName"
                      autoFocus
                      name="SchoolName"
                      value={editEducation.SchoolName}
                      onChange={changeHandler}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Percentage"
                      autoFocus
                      name="Percentage3"
                      value={editEducation.Percentage3}
                      onChange={changeHandler}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                saveChanges();
                handleClose();
              }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Fragment>
  );
}

export default EditEducation;
