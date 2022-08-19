import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import { Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import PersonalDetails from "./PersonalDetails";
import EditEducation from "./EditEducation";

function Profile() {
  const navigate = useNavigate();

  const [imgUrl, setImgUrl] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const [data, setUserData] = useState([]);

  const [review, setReview] = useState([]);

  const [update, setUpdate] = useState(true);

  const [submitBtn, setSubmitBtn] = useState(false);

  const [editSocialMedia, setEditSocialMedia] = useState({
    Facebook: "",
    Instagram: "",
    GitHub: "",
    LinkedIn: "",
    Website: "",
    Twitter: "",
  });

  const [editPersonalMedia, setPersonalDetails] = useState({
    FullName: "",
    JobRole: "",
    Mobile: "",
    Skills: "",
    Address: "",
    Projects: "",
  });

  const [editEducation, setEditEducation] = useState({
    CollegeName1: "",
    Percentage1: "",
    CollegeName2: "",
    Percentage2: "",
    SchoolName: "",
    Percentage3: "",
  });

  //Upload Img
  let imgHandler = async (e) => {
    let cloudName = `doutsozxy`;

    const files = e.target.files;

    const data = new FormData();

    data.append("file", files[0]);

    data.append("upload_preset", "empImages");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
      {
        method: "post",
        body: data,
      }
    );
    //console.log("waiting....");
    const file = await res.json();
    //console.log("over....");
    setImgUrl(file.secure_url);
    console.log(file.secure_url);
  };

  const uploadImg = () => {
    if (imgUrl == "") {
      alert("Please upload Image");
    } else {
      let data = {
        ProfilePic:imgUrl
      }
      axios
        .put("http://localhost:3000/UpdateImg", data, {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        })
        .then((res) => {
          alert(res.data.status);
          window.location.reload()
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    let data1 = {
      UserType: localStorage.getItem("userType"),
    };

    axios
      .post("http://localhost:3000/myProfile", data1, {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setUserData(res.data);
        setEditSocialMedia({
          Facebook: res.data.SocialMedia.Facebook,
          Instagram: res.data.SocialMedia.Instagram,
          GitHub: res.data.SocialMedia.GitHub,
          LinkedIn: res.data.SocialMedia.LinkedIn,
          Website: res.data.SocialMedia.Website,
          Twitter: res.data.SocialMedia.Twitter,
        });
        setPersonalDetails({
          FullName: res.data.FullName,
          JobRole: res.data.JobRole,
          Mobile: res.data.Mobile,
          Skills: res.data.Skills,
          Address: res.data.Address,
          Projects: res.data.Projects,
        });
        setEditEducation({
          CollegeName1: res.data.Education.Graduation.CollegeName1,
          Percentage1: res.data.Education.Graduation.Percentage1,
          CollegeName2: res.data.Education.Secondary.CollegeName2,
          Percentage2: res.data.Education.Secondary.Percentage2,
          SchoolName: res.data.Education.School.SchoolName,
          Percentage3: res.data.Education.School.Percentage3,
        });
        axios
          .get("http://localhost:3000/myReview", {
            headers: {
              "x-token": localStorage.getItem("token"),
            },
          })
          .then((res) => {
            setReview(res.data);
          })
          .catch((err) => {
            alert(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeHandler = (e) => {
    setEditSocialMedia({ ...editSocialMedia, [e.target.name]: e.target.value });
  };

  const saveChanges = () => {
    let updatedData = {
      Facebook: editSocialMedia.Facebook,
      Instagram: editSocialMedia.Instagram,
      GitHub: editSocialMedia.GitHub,
      LinkedIn: editSocialMedia.LinkedIn,
      Website: editSocialMedia.Website,
      Twitter: editSocialMedia.Twitter,
    };

    axios
      .put("http://localhost:3000/UpdateSocialMedia", updatedData, {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        alert(res.data.status);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Fragment>
      <section className="user-pro">
        <nav className="navbar bg-dark text-white navbar-dark navbar-expand-lg p-3">
          <div className="container">
            <a
              href="/EmployeeHomePage"
              className="navbar-brand text-decoration-none"
            >
              <i className="fa fa-snowflake-o"></i>
              &nbsp; Developers Hub
            </a>
            <div className="collapse navbar-collapse dash"></div>
            <p className="mt-3">
              {" "}
              <i className="fa fa-user"></i> {data.FullName}
            </p>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button
              className="btn btn-outline-light"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("userType");
                navigate("/LogIn");
              }}
            >
              <i className="fa fa-sign-in pr-2" aria-hidden="true"></i>&nbsp;
              Logout
            </button>
          </div>
        </nav>

        <section>
          <div className="container">
            <a href="/EmployeeHomePage" className="mt-4 btn btn-primary">
              Back To Profiles
            </a>
            <div className="profile-bord">
              <div className="row">
                <div className="col-lg-4">
                  <div className="card mb-3 p-3" style={{ height: 550 }}>
                    <h4 className="text-center">User ProfilePic</h4>
                    <div className="card-body text-center">
                      <img
                        src={data.ProfilePic}
                        alt="avatar"
                        className="rounded-circle img-fluid"
                        style={{ width: "215px", height: "215px" }}
                      />
                      <h5 className="my-3 text-center">{data.FullName}</h5>
                      <p className="text-muted   text-center">{data.JobRole}</p>
                      <p>{imgUrl}</p>
                      <div className="d-flex justify-content-center mb-2">
                        <Row className="d-flex justify-content-center mt">
                          <Col sm={9}>
                            <input
                              type="file"
                              className="form-control"
                              onChange={imgHandler}
                            />
                          </Col>
                          <Col sm={3}>
                            <button
                              type="button"
                              className="btn btn-outline-primary ms-1"
                              onClick={uploadImg}
                            >
                              Upload
                            </button>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="card mb-4 p-3" style={{ height: 550 }}>
                    <h4 className="text-center">Personal Details</h4>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Name</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">{data.FullName}</p>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Email</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">{data.Email}</p>
                        </div>
                      </div>
                      <hr />

                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Mobile</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">{data.Mobile}</p>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Address</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">{data.Address}</p>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Skills</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">{data.Skills}</p>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Projects :</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">{data.Projects}</p>
                        </div>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-center mb-2">
                        <PersonalDetails obj={editPersonalMedia} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div
                    className="card mb-4 mb-lg-4"
                    style={{ height: "550px" }}
                  >
                    <div className="card-body p-3">
                      <h4 className="text-center">Social Media</h4>
                      <ul className="list-group list-group-flush rounded-3">
                        <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                          <i className="fa fa-globe fa-lg text-warning"></i>
                          <p className="mb-0">
                            https://{editSocialMedia.Website}.com
                          </p>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                          <i
                            className="fa fa-github fa-lg"
                            style={{ color: "#333333" }}
                          ></i>
                          <p>{editSocialMedia.GitHub}</p>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                          <i
                            className="fa fa-linkedin fa-lg"
                            style={{ color: "#333333;" }}
                          ></i>
                          <p>{editSocialMedia.LinkedIn}</p>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                          <i
                            className="fa fa-twitter fa-lg"
                            style={{ color: "#55acee" }}
                          ></i>
                          <p className="mb-0">@{editSocialMedia.Twitter}</p>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                          <i
                            className="fa fa-instagram fa-lg"
                            style={{ color: "#ac2bac" }}
                          ></i>
                          <p className="mb-0">{editSocialMedia.Instagram}</p>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                          <i
                            className="fa fa-facebook-f fa-lg"
                            style={{ color: "#3b5998" }}
                          ></i>
                          <p className="mb-0">{editSocialMedia.Facebook}</p>
                        </li>
                      </ul>
                      <hr />
                      <div className="d-flex justify-content-center mt">
                        <button
                          type="button"
                          className="btn btn-outline-primary ms-1 up-sco"
                          onClick={handleShow}
                        >
                          Update Social Media
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card p-2">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-10">
                    <h2>Education</h2>
                  </div>
                  <div className="col-md-2">
                    {/* <button
                      className="btn btn-outline-primary"
                      onClick={() => {
                        setUpdate(false);
                        setSubmitBtn(true);
                      }}
                    >
                      Update
                    </button> */}
                    <EditEducation obj={editEducation} />
                  </div>
                </div>
                <div className="form-group-inline">
                  <Row>
                    <label>Graduation :</label>
                    <Col sm={6}>
                      <input
                        type="text"
                        className="form-control mt-2"
                        placeholder="College Name"
                        disabled={update ? update : null}
                        value={editEducation.CollegeName1}
                      ></input>
                    </Col>
                    <Col sm={6}>
                      <input
                        type="text"
                        className="form-control mt-2"
                        placeholder="Percentage"
                        disabled={update ? update : null}
                        value={editEducation.Percentage1 + "%"}
                      ></input>
                    </Col>
                  </Row>
                </div>
                <div className="form-group mt-2">
                  <Row>
                    <label>Secondary :</label>
                    <Col sm={6}>
                      <input
                        type="text"
                        className="form-control mt-2"
                        placeholder="College Name"
                        disabled={update ? update : null}
                        value={editEducation.CollegeName2}
                      ></input>
                    </Col>
                    <Col sm={6}>
                      <input
                        type="text"
                        className="form-control mt-2"
                        placeholder="Percentage"
                        disabled={update ? update : null}
                        value={editEducation.Percentage2 + "%"}
                      ></input>
                    </Col>
                  </Row>
                </div>
                <div className="form-group mt-2">
                  <Row>
                    <label>School :</label>
                    <Col sm={6}>
                      <input
                        type="text"
                        className="form-control mt-2"
                        placeholder="College Name"
                        disabled={update ? update : null}
                        value={editEducation.SchoolName}
                      ></input>
                    </Col>
                    <Col sm={6}>
                      <input
                        type="text"
                        className="form-control mt-2"
                        placeholder="Percentage"
                        disabled={update ? update : null}
                        value={editEducation.Percentage3 + "%"}
                      ></input>
                    </Col>
                  </Row>
                </div>
                <div style={{ visibility: submitBtn ? "visible" : "hidden" }}>
                  <button
                    className="btn btn-success mt-3"
                    onClick={() => {
                      setUpdate(true);
                      setSubmitBtn(false);
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
            <h3 className="mt-3">
              <i className="fa fa-github"></i> Reviews And Ratings
            </h3>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "start",
              }}
            >
              {review.length >= 1 ? (
                review.map((rev) => {
                  return (
                    <div className="row m-2" style={{ width: 300 }}>
                      <div className="card p-3 mt-2 d-flex align-items-center justify-content-center">
                        <h4>{rev.taskProvider}</h4>
                        <p>
                          <b>Rating : </b>
                          {rev.rating}/5
                        </p>
                        <p>
                          <b>Review Comment : </b>
                          {rev.reviewContent}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="error-msg">
                  <h3 className="text-danger border p-2">
                    No Reviews and Ratings
                  </h3>
                </div>
              )}
            </div>
          </div>
        </section>
      </section>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Social Media </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Website Name :</Form.Label>
              <Form.Control
                type="text"
                placeholder="Website Name"
                name="Website"
                value={editSocialMedia.Website}
                onChange={changeHandler}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>GitHub Name :</Form.Label>
              <Form.Control
                type="text"
                placeholder="GitHub Name"
                autoFocus
                name="GitHub"
                value={editSocialMedia.GitHub}
                onChange={changeHandler}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>LinkedIn Name :</Form.Label>
              <Form.Control
                type="text"
                placeholder="Linked In Name"
                autoFocus
                name="LinkedIn"
                value={editSocialMedia.LinkedIn}
                onChange={changeHandler}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Twitter Name :</Form.Label>
              <Form.Control
                type="text"
                placeholder="Twitter Name"
                autoFocus
                name="Twitter"
                value={editSocialMedia.Twitter}
                onChange={changeHandler}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Instagram Name :</Form.Label>
              <Form.Control
                type="text"
                placeholder="Instagram Name"
                autoFocus
                name="Instagram"
                value={editSocialMedia.Instagram}
                onChange={changeHandler}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Facebook Name :</Form.Label>
              <Form.Control
                type="text"
                placeholder="Facebook Name"
                autoFocus
                name="Facebook"
                value={editSocialMedia.Facebook}
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
    </Fragment>
  );
}

export default Profile;
