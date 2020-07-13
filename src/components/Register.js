import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

// Check For Email Validation
const emailRegex = RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);

//  Valid if no error's
const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // Validate Form Erros being empty
  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });
  // Validate Form Errors Being InValid
  Object.values(rest).forEach((val) => {
    val === null && (valid = false);
  });
  // Validate Form CheckBox Being InValid
  Object.values(rest).forEach((val) => {
    val === true && (valid = false);
  });
  return valid;
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: null,
      email: null,
      error: "",
      loader: "",
      redirect: "",
      password: null,
      checkbox: null,
      formErrors: {
        userName: "",
        email: "",
        password: "",
        checkbox: "",
      },
    };
  }

  // Check Box Validation
  onClick = (e) => {
    this.setState({ checkbox: !e.target.checked });
  };
  // Local Validation Start
  handleSubmit = async (e) => {
    e.preventDefault();
    if (formValid(this.state)) {
      this.setState({ error: null });
      this.setState({ loader: true });
      // -----------------------------------------
      let body = {
        name: this.state.userName,
        email: this.state.email,
        password: this.state.password,
      };
      try {
        let res = await axios.post(
          "https://zsp1d3r.herokuapp.com/api/user/register",
          body
        );
        console.log(res.data);
        sessionStorage.setItem("token", JSON.stringify(res.data));
        this.setState({ redirect: "/" });
      } catch (err) {
        console.log(err.response.data);
        this.setState({ error: err.response.data });
        this.setState({ loader: false });
      }
      // -----------------------------------------
      console.log(`
      ---Submitting---
      Username: ${this.state.userName}
      Email: ${this.state.email}
      Password: ${this.state.password}
      `);
    } else {
      console.log("Error - Please Check Form There Is Something InValid");
    }
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;
    switch (name) {
      case "userName":
        formErrors.userName =
          value.length < 3 ? "Username Need's Minimum 3 Characters" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "Invalid Email Address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "Password Need's Minimum 6 Characters" : "";
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  // Local Validation End
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    const { formErrors } = this.state;
    let local = localStorage.getItem("token");
    let session = sessionStorage.getItem("token");
    if (local || session) {
      return <Redirect to="/" />;
    } else {
      return (
        <div className="body">
          <div className="container">
            <form className="form" onSubmit={this.handleSubmit} noValidate>
              <div className="form-control">
                <label className="label" htmlFor="username">
                  Username
                </label>
                <input
                  className={formErrors.userName.length > 0 ? "error" : "input"}
                  type="username"
                  id="username"
                  name="userName"
                  placeholder="Enter your username"
                  noValidate
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-control">
                <label className="label" htmlFor="email">
                  Email
                </label>
                <input
                  className={formErrors.email.length > 0 ? "error" : "input"}
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  name="email"
                  onChange={this.handleChange}
                  noValidate
                />
              </div>

              <div className="form-control">
                <label className="label" htmlFor="password">
                  Password
                </label>
                <input
                  className={formErrors.password.length > 0 ? "error" : "input"}
                  type="password"
                  id="password"
                  placeholder="Password"
                  name="password"
                  onChange={this.handleChange}
                  noValidate
                />
              </div>
              <div className="checkbox-container-agree">
                <input
                  //className={this.state.checkbox === true ? "checkbox-error" : ""}
                  type="checkbox"
                  id="remember"
                  name="checkbox"
                  onClick={this.onClick}
                  value={!this.state.checkbox}
                />
                <label className="label" id="checkbox" htmlFor="remember">
                  I Agree to the terms & conditions
                </label>
              </div>
              <span className="theError">{this.state.error}</span>
              <div className={this.state.loader === true ? "loader" : ""}></div>
              <button
                className={
                  !formValid(this.state) === true ? "btn-disabled" : "btn"
                }
                disabled={!formValid(this.state)}
              >
                Create An Account
              </button>

              <small className="small">
                Already have an account?{" "}
                <Link to="/login">
                  <span className="link">Login</span>
                </Link>
              </small>
            </form>

            <div className="features">
              <span className="heading">Create An Account</span>
              <img
                className="image"
                src={require("./images/register.svg")}
                alt=""
              ></img>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Register;
