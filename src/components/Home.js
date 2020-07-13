import React, { Component } from "react";
import TheNav from "./Navbar";
import { Redirect } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let local = localStorage.getItem("token");
    let session = sessionStorage.getItem("token");
    if (local || session) {
      return (
        <div className="home">
          <TheNav />
          <h1 className="greeting">Welcome </h1>
        </div>
      );
    } else {
      return <Redirect to="/login" />;
    }
  }
}

export default Home;
