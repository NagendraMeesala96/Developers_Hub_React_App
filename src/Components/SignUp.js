import axios from "axios";
import { Fragment, useState } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [imgUrl, setImgUrl] = useState("");

  const navigate = useNavigate();

  const [dropDownUserType, setDropDownUserType] = useState(undefined);

  const [userData, setUserData] = useState({
    UserType: "",
    FullName: "",
    Email: "",
    Mobile: "",
    Skills: "",
    Password: "",
    ProfilePic: "",
  });

  const changeHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

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
    setUserData({ ...userData, ProfilePic: file.secure_url });
  };
  //UserType Dropdown Handler
  const dropDownHandler = (event) => {
    setDropDownUserType(event.target.value);
    setUserData({ ...userData, UserType: event.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (dropDownUserType == "Client") {
      delete userData.Skills;
      axios
        .post("http://localhost:3000/register", userData)
        .then((res) => {
          navigate("/LogIn");
        })
        .catch((err) => {
          alert(err.response.data);
          console.log(err.response.data);
        });
    } else {
      axios
        .post("http://localhost:3000/register", userData)
        .then((res) => {
          navigate("/LogIn");
        })
        .catch((err) => {
          alert(err.response.data);
          console.log(err.response.data);
        });
    }
  };
  return (
    <Fragment>
      <section className="signup">
        <div className="signup-form">
          <form onSubmit={submitHandler}>
            <h2>Register</h2>
            <p className="hint-text">
              Create your account. It's free and only takes a minute.
            </p>
            <div className="form-group">
              <div className="form-group">
                <select className="form-control" onChange={dropDownHandler}>
                  <option>Select User Type</option>
                  <option value="Employee">Employee</option>
                  <option value="Client">Client</option>
                </select>
              </div>
              <div className="form-group">
                <input
                  type="file"
                  className="form-control"
                  onChange={imgHandler}
                />
              </div>
              <div className="row">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    name="FullName"
                    placeholder="Full Name"
                    required
                    onChange={changeHandler}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                name="Email"
                placeholder="Email"
                id="email"
                required
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                className="form-control"
                name="Mobile"
                placeholder="Mobile Number"
                required
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                name="Password"
                placeholder="Password"
                id="password"
                required
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                name="confirm_password"
                placeholder="Confirm Password"
                id="c-password"
                required
              />
            </div>
            <div
              className="form-group"
              style={{
                visibility: dropDownUserType == "Client" ? "hidden" : "visible",
              }}
            >
              <input
                type="text"
                className="form-control"
                name="Skills"
                placeholder="Skills"
                onChange={changeHandler}
              />
              &nbsp;
              <label>Please enter skills by separation of coma (,)</label>
            </div>

            <div className="form-group">
              <label className="form-check-label">
                <input type="checkbox" /> I accept the{" "}
                <a href="#" required>
                  Terms of Use
                </a>{" "}
                &amp; <a href="#">Privacy Policy</a>
              </label>
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-success btn-lg btn-block"
              >
                Register Now
              </button>
            </div>
            <div className="text-center">
              Already have an account?{" "}
              <a href="/LogIn" className="text-danger">
                LogIn
              </a>
            </div>
          </form>
        </div>
      </section>
    </Fragment>
  );
}

export default SignUp;
