import React, { useState, useEffect } from "react";
import { beginAddPhoto } from "../../redux/actions/photos";
import { connect } from "react-redux";

import Details from "./Details";
import Image from "./Image";

import "../../style/sass/Upload.scss";

// Setup
const UploadForm = ({ errors, response , dispatch }) => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [responseMsg, setResponseMsg] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [state, setState] = useState({
    title: null,
    desc: null,
    price: null,
    category: null,
  });

  const [open, setOpen] = useState({
    detail: true,
    image: false,
  });

  useEffect(() => {
    setErrorMsg(errors);
  }, [errors]);

  useEffect(() => {
    setResponseMsg(response);
  }, [response]);

  useEffect(() => {
    setErrorMsg(""); // Reset Message on Page Load
    setResponseMsg(""); 
  }, []);

  // On Change
  const handleImageSubmit = (photo) => {
    if (photo) {
      const data = {
        photo: photo,
        title: state.title,
        desc: state.desc,
        price: state.price,
        category: state.category,
      };
      setErrorMsg("");
      dispatch(beginAddPhoto(data));
      setIsSubmitted(true);
    }
  };

  const changeState = (val) => {
    if (val === "detail") {
      setOpen({ detail: true, image: false });
    } else if (val === "image") {
      setOpen({ detail: false, image: true });
    }
  };
  const handleDetailSubmit = (data) => {
    setState(data);
    changeState("image");
  };
  if (open.detail) {
    return <Details onSuccess={handleDetailSubmit} />;
  } else {
    return (
      <Image
        onSuccess={handleImageSubmit}
        errorMsg={errorMsg}
        responseMsg={responseMsg}
        isSubmitted={isSubmitted}
      />
    );
  }
};
const mapStateToProps = (state) => ({
  photos: state.photos || [],
  errors: state.errors || {},
  response: state.response || {},
});

export default connect(mapStateToProps)(UploadForm);
