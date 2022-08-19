import { Fragment, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
function PersonalDetails(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const [editPersonalMedia, setPersonalDetails] = useState({
    FullName: props.obj.FullName,
    JobRole: props.obj.JobRole,
    Mobile: props.obj.Mobile,
    Skills: props.obj.Skills,
    Address: props.obj.Address,
    Projects: props.obj.Projects,
  });

  const loadPage = () => {
    setPersonalDetails({
      FullName: props.obj.FullName,
      JobRole: props.obj.JobRole,
      Mobile: props.obj.Mobile,
      Skills: props.obj.Skills,
      Address: props.obj.Address,
      Projects: props.obj.Projects,
    });
  };

  const changeHandler = (e) => {
    setPersonalDetails({
      ...editPersonalMedia,
      [e.target.name]: e.target.value,
    });
  };

  const saveChanges = () => {
    let updatedData = {
      FullName: editPersonalMedia.FullName,
      JobRole: editPersonalMedia.JobRole,
      Mobile: editPersonalMedia.Mobile,
      Skills: editPersonalMedia.Skills,
      Address: editPersonalMedia.Address,
      Projects: editPersonalMedia.Projects,
    };

    axios
      .put("http://localhost:3000/UpdatePersonalDetails", updatedData, {
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
            <Modal.Title>PersonalDetails</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label> Name :</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Full Name"
                  name="FullName"
                  value={editPersonalMedia.FullName}
                  onChange={changeHandler}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>JobRole :</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Job Role"
                  autoFocus
                  name="JobRole"
                  value={editPersonalMedia.JobRole}
                  onChange={changeHandler}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Mobile Num :</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Mobile"
                  autoFocus
                  name="Mobile"
                  value={editPersonalMedia.Mobile}
                  onChange={changeHandler}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Skills :</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="SKills"
                  autoFocus
                  name="Skills"
                  value={editPersonalMedia.Skills}
                  onChange={changeHandler}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Address :</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Address"
                  autoFocus
                  name="Address"
                  value={editPersonalMedia.Address}
                  onChange={changeHandler}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Projects : </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Projects"
                  autoFocus
                  name="Projects"
                  value={editPersonalMedia.Projects}
                  onChange={changeHandler}
                />
              </Form.Group>
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

export default PersonalDetails;
