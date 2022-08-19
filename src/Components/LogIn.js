import { Fragment, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LogIn() {
  const [dropDownUserType, setDropDownUserType] = useState("");
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    UserType: "",
    Email: "",
    Password: "",
  });

  const changeHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const dropDownHandler = (event) => {
    setDropDownUserType(event.target.value);
    setUserData({ ...userData, UserType: event.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (dropDownUserType == "") {
      alert("Please Select UserType");
    } else {
      axios
        .post(
          `http://localhost:3000/login`,
          userData  
        )
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          if(dropDownUserType=='Client')
          {
            localStorage.setItem("userType", dropDownUserType);
            navigate('/ClientHomePage');
          }
          else{
            localStorage.setItem("userType", dropDownUserType);
            navigate('/EmployeeHomePage');
          }
        })
        .catch((err) => {
          alert(err.response.data);
          console.log(err)
        });
    }
  };
  return (
    <Fragment>
      <section className="signup">
        <div className="signup-form">
          <form onSubmit={submitHandler}>
            <h2>LogIn</h2>
            <p className="hint-text">
              LogIn your account. It's easy and only takes a minute.
            </p>

            <div className="form-group">
              <div className="form-group">
                <select className="form-control" onChange={dropDownHandler}>
                  <option value="">Select User Type</option>
                  <option value="Employee">Employee</option>
                  <option value="Client">Client</option>
                </select>
              </div>
              <input
                type="email"
                className="form-control"
                name="Email"
                placeholder="Email"
                onChange={changeHandler}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                name="Password"
                placeholder="Password"
                onChange={changeHandler}
                id="password"
                required
              />
            </div>

            <div className="form-group">
              <button
                type="submit"
                className="btn btn-success btn-lg btn-block"
              >
                LogIn Now
              </button>
            </div>
            <div className="text-center">
              <p>
                You don't have account? <a href="/SignUp">Create An Account</a>
              </p>
            </div>
          </form>
        </div>
      </section>
    </Fragment>
  );
}

export default LogIn;
