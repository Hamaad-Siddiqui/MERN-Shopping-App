import React, { Component, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { BASE_API_URL } from "../utils/constants";
import axios from "axios";

import validate from "../helpers/validate";
import Google from "../components/Other/Google";
import Alert from "../components/Other/Alert";
import "../fonts/micons.css";
import "../style/css/Form.css";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      checkbox: false,
      error: null,
      redirect: null,
      loader: null,
      userAllowed: false,
      processFinished: false,
      networkError: false,
      formErrors: {
        email: "",
        password: "",
      },
    };
  }
  // Checking if user is Already logged in
  componentDidMount = async () => {
    validate(
      () => this.setState({ userAllowed: true, processFinished: true }),
      () => this.setState({ userAllowed: false, processFinished: true }),
      () => this.setState({ networkError: true })
    );
  };
  // Remember Me Clicked
  onClick = (e) => {
    this.setState({ checkbox: e.target.checked });
  };
  // On Change
  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;
    this.setState({ formErrors, [name]: value }); //, () => console.log(this.state)
  };
  // On Submit
  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ error: null, loader: true });
    let body = {
      email: this.state.email,
      password: this.state.password,
    };
    try {
      let res = await axios.post(`${BASE_API_URL}/user/login`, body);
      if (this.state.checkbox === true) {
        localStorage.setItem("token", res.data);
      } else {
        sessionStorage.setItem("token", res.data);
      }
      this.setState({ redirect: "/" });
    } catch (err) {
      if (err.message === "Network Error") {
        alert("Please Check Your Internet Connection ;P");
      } else if (
        err.response.data ===
          `"email" length must be at least 6 characters long` ||
        err.response.data === `"email" must be a valid email`
      ) {
        this.setState({
          error: "The email is not a valid email address",
          loader: false,
        });
      } else if (err.response.data === `"email" is not allowed to be empty`) {
        this.setState({
          error: "Email cannot be empty",
          loader: false,
        });
      } else if (
        err.response.data === `"password" is not allowed to be empty`
      ) {
        this.setState({
          error: "Password cannot be empty",
          loader: false,
        });
      } else {
        this.setState({
          error: "Email Or Password is Incorrect",
          loader: false,
        });
      }
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    if (!this.state.userAllowed && this.state.processFinished) {
      let NewUser = localStorage.getItem("NewUser");
      if (NewUser) {
        this.setState({ alert: true });
        localStorage.removeItem("NewUser");
      }
      return (
        <Fragment>
          <div className="body">
            <div className="container">
              <form className="form" onSubmit={this.handleSubmit} noValidate>
                <Google />
                <small className="small">or</small>

                <div className="form-control">
                  <label className="label" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="input"
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
                    className="input"
                    type="password"
                    id="password"
                    placeholder="Password"
                    name="password"
                    onChange={this.handleChange}
                    noValidate
                  />
                </div>

                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    id="remember"
                    name="checkbox"
                    onClick={this.onClick}
                    value={!this.state.checkbox}
                  />
                  <label className="label" htmlFor="remember">
                    Remember me
                  </label>
                  <Link to="/forgetPass">
                    <a className="link">Forgot Password</a>
                  </Link>
                </div>

                <span className="theError">{this.state.error}</span>
                <div
                  className={this.state.loader === true ? "loader" : ""}
                ></div>
                <button className="btn">Log In</button>
                <small className="small">
                  Don't have an account?{" "}
                  <Link to="/signup">
                    <span className="link">Sign up</span>
                  </Link>
                </small>
              </form>

              <div className="features">
                <div className="feature">
                  <i className="icon-terminal"></i>
                  <h3>Development</h3>
                  <p>
                    Tempor dolor nostrud quis proident. Cupidatat do mollit in
                    velit amet esse veniam enim consectetur minim aliqua duis ut
                    dolor. Proident.
                  </p>
                </div>
                <div className="feature">
                  <i className="icon-layers"></i>
                  <h3>Features</h3>
                  <p>
                    Incididunt ad voluptate exercitation laborum commodo non
                    nulla dolore. Sit amet ad commodo consequat enim laborum
                    dolor enim sit.
                  </p>
                </div>
                <div className="feature">
                  <i className="icon-cloud"></i>
                  <h3>Updates</h3>
                  <p>
                    Elit et do veniam cillum sint dolore minim sit adipisicing
                    nisi ullamco cupidatat. Eu aliquip est aute aute labore
                    aliqua esse aliquip.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {this.state.alert ? (
            <Alert
              type={"success"}
              detail={"Account Created Successfully Login to Continue."}
              title={"Success "}
            />
          ) : null}
        </Fragment>
      );
    } else if (this.state.userAllowed && this.state.processFinished) {
      return <Redirect to="/" />;
    } else {
      return (
        // Show Loading Bar
        <>
          <div className="F-Loader">
            <div className="lds-ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          {this.state.networkError ? (
            <Alert
              type={"warning"}
              detail={
                "Please Check Your Internet Connection & Reload The Page."
              }
              title={"Network Error"}
            />
          ) : null}
        </>
      );
    }
  }
}
