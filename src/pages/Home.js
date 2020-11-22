import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import validate from "../helpers/validate";
import Gallery from "../components/Home/Gallery";
import TheNav from "../components/Home/Navbar";
import Upload from "../components/Upload/Upload";
import Alert from "../components/Other/Alert";

import "../style/css/Home.css";


function Home() {
  const [state, setState] = useState({
    processFinished: false,
    networkError: false,
    userAllowed: false,
  });

  // Checking if User is Allowed
  useEffect(() => {

    async function fetchData() {
      validate(
        () => {
          setState({
            ...state,
            userAllowed: true,
            processFinished: true,
          });
        },
        () => {
          setState({ ...state, userAllowed: false, processFinished: true });
        },
        () => {
          setState({ ...state, networkError: true });
        }
      );
    }
    fetchData();
  }, []);
  const popup = useSelector((state) => state.popup);
  if (state.userAllowed && state.processFinished) {
    return (
      <div className="home">
        <TheNav />
        {/* <h1 className="greeting">Welcome {this.state.userInfo.name}</h1> */}
        {popup ? <Upload /> : null}
        <Gallery />
      </div>
    );
  } else if (!state.userAllowed && state.processFinished) {
    return <Redirect to="/login" />;
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
        {state.networkError ? (
          <Alert
            type={"warning"}
            detail={"Please Check Your Internet Connection & Reload The Page."}
            title={"Network Error"}
          />
        ) : null}
      </>
    );
  }
}

export default Home;
