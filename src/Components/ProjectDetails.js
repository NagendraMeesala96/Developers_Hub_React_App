import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Container from "react-bootstrap/Container";
import { Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function ProjectDetails() {
  const navigate = useNavigate();

  const [allBids, setAllBids] = useState([]);

  const [postData, setPostData] = useState([]);

  const [rating, setRating] = useState({
    rating: "",
    reviewContent: "",
  });

  const [isBid, setIsBid] = useState("");

  let { userType, id } = useParams();

  const [bidData, setBidData] = useState({
    PostId: id,
    BidPrice: "",
    NoOfDaysDelivery: "",
    Proposal: "",
  });

  useEffect(() => {
    loadAllBids();
    checkBid();
    loadPostDetails();
  }, []);

  const loadAllBids = () => {
    axios({
      url: `http://localhost:3000/PostBid/${id}`,
      method: "GET",
      headers: {
        "x-token": localStorage.getItem("token"),
      },
    })
      .then((res) => {
        setAllBids(res.data);
        //console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkBid = () => {
    console.log();
    axios({
      url: `http://localhost:3000/checkBid/${id}`,
      method: "POST",
      headers: {
        "x-token": localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log(res);
        setIsBid(res.data.error);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadPostDetails = () => {
    axios({
      url: `http://localhost:3000/GetPost/${id}`,
      method: "GET",
      headers: {
        "x-token": localStorage.getItem("token"),
      },
    })
      .then((res) => {
        setPostData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeHandler = (e) => {
    setRating({ ...rating, [e.target.name]: e.target.value });
    setBidData({ ...bidData, [e.target.name]: e.target.value });
  };

  const submitHandler = (id) => {
    if (rating.rating == "" || rating.reviewContent == "") {
      alert("Please Provide Rating & Comment");
    } else {
      if (rating.rating > 5) {
        alert("Invalid Rating, Rating upto 5");
      } else {
        let data = {
          taskWorker: id,
          rating: rating.rating,
          reviewContent: rating.reviewContent,
        };

        axios
          .post("http://localhost:3000/addReview", data, {
            headers: {
              "x-token": localStorage.getItem("token"),
            },
          })
          .then((res) => {
            let data = {
              userRating: rating.rating,
            };
            axios.put(`http://localhost:3000/UpdateRating/${id}`, data, {
              headers: {
                "x-token": localStorage.getItem("token"),
              },
            });
          })
          .then((res) => {
            axios.put(`http://localhost:3000/RatingCalculation/${id}`,{
              headers: {
                "x-token": localStorage.getItem("token"),
              }
            }).then((res)=>{
              alert('Ratings Updated')
            }).catch((err)=>{
              alert(err);
            })
          })
          .catch((err) => {
            alert(err);
          });
      }
    }
  };

  const bidHandler = () => {
    axios
      .post("http://localhost:3000/PlaceBid", bidData, {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        axios
          .put(`http://localhost:3000/UpdateBid/${id}`, {
            headers: {
              "x-token": localStorage.getItem("token"),
            },
          })
          .then((res) => {
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <Fragment>
      <div className="bg-dark card-bg">
        <Navbar bg="dark" expand="sm" className="mb-3 bottom-border" variant="dark">
          <Container fluid>
            <Navbar.Brand href="/ClientHomePage" className="text-white">
              <i class="fa fa-code"></i>&nbsp; Developers Hub
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
                  <Nav.Link href="/PostProject" className="text" style={userType=='Employee' ? {visibility:'hidden'} : {visibility:'visible'} }>
                    Post a Project
                  </Nav.Link>
                  <Nav.Link href="/MyProfile" className="text" style={userType=='Employee' ? {visibility:'visible'} : {visibility:'hidden'} }>
                    My Profile
                  </Nav.Link>
                  <Nav.Link
                    href="#action2"
                    className="text"
                    onClick={() => {
                      localStorage.removeItem("token");
                      localStorage.removeItem("userType");
                      localStorage.removeItem("userId");
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
          <Row>
            <Col
              sm={userType == "Client" ? 0 : 6}
              style={userType == "Client" ? { display: "none" } : null}
              className="bid"
            >
              <button
                className="btn btn-primary"
                onClick={() => {
                  navigate("/EmployeeHomePage");
                }}
              >
                Go Back
              </button>
              <h1 className="text-center text-white">Project Details</h1>
              <div className="card" style={{ borderRadius: 15}}>
                <div className="card-body p-4">
                  {postData.map((post, index) => {
                    return (
                      <div key={index}>
                        <h1>{post.PostTitle}</h1>
                        <p className="mt-3">
                          <b>Bid Price : </b>${post.BidPrice} per hour
                        </p>
                        <p>
                          <b>Description </b>: {post.Description}
                        </p>
                        <p>
                          <b>Skills Required :</b> {post.RequiredSkills}
                        </p>
                      </div>
                    );
                  })}

                  <hr />
                  <h3>Place a Bid on this Project</h3>
                  <p>
                    You will be able to edit your bid until the project is
                    awarded to someone.
                  </p>
                  <hr />
                  {isBid == "Yes" ? (
                    <div className="error-msg">
                      <h3 className="text-danger border p-2">
                        You already completed Bid for this Project
                      </h3>
                    </div>
                  ) : (
                    <div className="text-box">
                      <label>Project Id:</label>
                      <input
                        type="text"
                        className="form-control mt-3"
                        value={id}
                        disabled
                      />
                      <label className="mt-3">Hourly Rate :</label>
                      <input
                        type="text"
                        className="form-control mt-3"
                        placeholder="Bid Price"
                        name="BidPrice"
                        onChange={changeHandler}
                      />
                      <label className="mt-3 font-weight-bold">No Of Days Delivery :</label>
                      <input
                        type="number"
                        className="form-control mt-3"
                        placeholder="No Of Days to Delivery"
                        name="NoOfDaysDelivery"
                        onChange={changeHandler}
                      />
                      <label className="mt-3">Proposal :</label>
                      <textarea
                        className="form-control rounded-0 mt-3"
                        rows="5"
                        name="Proposal"
                        onChange={changeHandler}
                      ></textarea>
                      <button
                        className="btn btn-success mt-5"
                        onClick={bidHandler}
                      >
                        Submit
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </Col>
            <Col sm={userType == "Client" ? 12 : 6}>
              <div className="container">
                <h1 className="text-center text-white mt-4">Proposals</h1>
                <div
                  className="bg-dark"
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  {allBids.length > 0 ? (
                    allBids.map((bid, index) => {
                      return (
                        <div style={{ margin: 5 }} key={index}>
                          <div className="row d-flex  h-100">
                            <div className="col col-md-9 col-lg-7 col-xl-5">
                              <div
                                className="card"
                                style={{
                                  borderRadius: 15,
                                  width: 520,
                                  height: 400,
                                }}
                              >
                                <div
                                  className="card-body p-4"
                                  style={{ overflow: "auto" }}
                                >
                                  <div className="d-flex text-black">
                                    <div className="flex-shrink-0">
                                      <img
                                        src={
                                          bid.UserProfile
                                            ? bid.UserProfile
                                            : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                                        }
                                        alt="Generic placeholder image"
                                        className="img-fluid "
                                        style={{
                                          width: 180,
                                          height: 180,
                                          borderRadius: 10,
                                        }}
                                      />
                                      <p className="user-id mt-4 d-flex">
                                        <button
                                          type="button"
                                          className="btn btn-outline-success me-1 flex-grow-1 btn-sm"
                                        >
                                          View Profile
                                        </button>
                                      </p>
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                      <h5 className="mb-1">
                                        {bid.UserDetails.UserName}
                                      </h5>
                                      <p
                                        className="mt-1"
                                        style={{ color: "#2b2a2a" }}
                                      >
                                        {bid.UserDetails.UserJobRole}
                                      </p>
                                      <div className="d-flex">
                                        <p> {bid.UserDetails.UserNum}</p>
                                        &nbsp;&nbsp;&nbsp;
                                        <p>{bid.UserDetails.UserMail}</p>
                                      </div>
                                      <div className="d-flex">
                                        <p className="">
                                          <b>Bid Price : </b>${bid.BidPrice}
                                        </p>
                                      </div>
                                      <div className="d-flex">
                                        <p className="">
                                          <b>No.of Days : </b>
                                          {bid.NoOfDaysDelivery} Days
                                        </p>
                                      </div>
                                      <div
                                        className="d-flex justify-content-center align-items-center rounded-3 p-2 mb-2 mt-2"
                                        style={{ backgroundColor: "#efefef" }}
                                      >
                                        <div className="row">
                                          <div className="col-md"><b>Rating : {bid.UserDetails.UserRating} </b></div>
                                        </div>&nbsp;&nbsp;&nbsp;
                                        <span class="fa fa-star checked text-success"></span>
                                        <span class="fa fa-star checked text-success"></span>
                                        <span class="fa fa-star checked text-success"></span>
                                        <span class="fa fa-star checked text-success"></span>
                                        <span class="fa fa-star checked text-success"></span>
                                      </div>
                                      <div className="d-flex pt-1"></div>
                                    </div>
                                  </div>

                                  <div>
                                    <p>
                                      {" "}
                                      <b>Proposal : </b>
                                      {bid.Proposal}
                                    </p>
                                  </div>

                                  <div
                                    className=""
                                    style={
                                      userType == "Employee"
                                        ? { display: "none" }
                                        : null
                                    }
                                  >
                                    <Row>
                                      <Col sm={5}>
                                        <input
                                          type="number"
                                          placeholder="Rating Upto 5"
                                          className="form-control"
                                          name="rating"
                                          onChange={changeHandler}
                                        />
                                      </Col>
                                      <Col sm={5}>
                                        <input
                                          type="text"
                                          placeholder="Review Comment"
                                          className="form-control"
                                          name="reviewContent"
                                          onChange={changeHandler}
                                        />
                                      </Col>
                                      <Col sm={2}>
                                        <button
                                          className="btn btn-primary"
                                          onClick={() => {
                                            submitHandler(
                                              bid.UserDetails.UserId
                                            );
                                          }}
                                        >
                                          Submit
                                        </button>
                                      </Col>
                                    </Row>
                                  </div>
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
                        margin: "360px auto",
                      }}
                    >
                      No Bids Found
                    </h2>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Fragment>
  );
}

export default ProjectDetails;
