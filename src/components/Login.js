import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import GoogleLogin from "react-google-login";
import "../fonts/micons.css";
import axios from "axios";

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
      formErrors: {
        email: "",
        password: "",
      },
    };
  }
  // Fetchin The Response From Google
  responseGoogle = (response) => {
    console.log(response);
    console.log(response.profileObj);
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
    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };
  // On Submit
  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ error: null });
    this.setState({ loader: true });
    // -----------------------------------------
    let body = {
      email: this.state.email,
      password: this.state.password,
    };
    try {
      let res = await axios.post(
        "https://zsp1d3r.herokuapp.com/api/user/login",
        body
      );
      console.log(res.data);
      if (this.state.checkbox === true) {
        localStorage.setItem("token", JSON.stringify(res.data));
      } else {
        sessionStorage.setItem("token", JSON.stringify(res.data));
      }
      this.setState({ redirect: "/" });
    } catch (err) {
      console.log(err.response.data);
      this.setState({ error: err.response.data });
      this.setState({ loader: false });
    }
    // -----------------------------------------
    console.log(`
      ---Submitting---
      Email: ${this.state.email}
      Password: ${this.state.password}
      `);
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    let local = localStorage.getItem("token");
    let session = sessionStorage.getItem("token");
    if (local || session) {
      return <Redirect to="/" />;
    } else {
      return (
        <div className="body">
          <div className="container">
            <form className="form" onSubmit={this.handleSubmit} noValidate>
              <GoogleLogin
                clientId="758049090218-vdhngnim4hjs2es3h4r0moolp09n6usd.apps.googleusercontent.com"
                render={(renderProps) => (
                  <button className="btn btn-ghost">
                    <img
                      src={require("./images/google.png")}
                      alt=""
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    ></img>
                    Log in with Google
                  </button>
                )}
                // buttonText="Login"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
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
              <div className={this.state.loader === true ? "loader" : ""}></div>
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
                  Incididunt ad voluptate exercitation laborum commodo non nulla
                  dolore. Sit amet ad commodo consequat enim laborum dolor enim
                  sit.
                </p>
              </div>
              <div className="feature">
                <i className="icon-cloud"></i>
                <h3>Updates</h3>
                <p>
                  Elit et do veniam cillum sint dolore minim sit adipisicing
                  nisi ullamco cupidatat. Eu aliquip est aute aute labore aliqua
                  esse aliquip.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
