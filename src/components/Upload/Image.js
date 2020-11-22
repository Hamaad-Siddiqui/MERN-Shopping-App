import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import UploadNav from "./UploadNav";

export default function Image(props) {
  // Setup
  const [photo, setPhoto] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [responseMsg, setResponseMsg] = useState(null);
  
  
  useEffect(() => {
    setErrorMsg(props.errorMsg);
    setDisabled(false);
  }, [props.errorMsg]);

  useEffect(() => {
    setResponseMsg(props.responseMsg);
  }, [props.responseMsg]);

  // Reloading After Success
  if (responseMsg){
    setTimeout(() => {
      window.location.reload();
      }, 500);
  }

  // Process
  const handleOnChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setPhoto(file);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (photo) props.onSuccess(photo); 
    setDisabled(true)
  };

  return (
    <React.Fragment>
      <Form
        onSubmit={handleFormSubmit}
        method="post"
        encType="multipart/form-data"
      >
        <div className="upload">
          <div className="drop">
            <UploadNav active="Image" />
            <div className="intro">
              {!photo ? <h4>No Image</h4> : <h4>Image Selected</h4>}
              <p>Drag &amp; Drop to upload </p>
              <p>or Select a file</p>
              <h6>{photo ? photo.name : ""}</h6>
            </div>
            <div className="center">
              <Form.Group>
                <div className="upload-btn-wrapper">
                  <button
                    className={`${disabled ? "btn-disabled" : "btn"}`}
                    // className="btn"
                    id="select-btn"
                    onChange={handleOnChange}
                  >
                    Select a file
                  </button>
                  <input type="file" name="photo" onChange={handleOnChange} />
                </div>
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className={`${!photo || disabled ? "btn-disabled" : "submit-btn"}`}
                disabled={!photo || disabled ? true : false}
              >
                <span>Upload</span>
              </Button>
            </div>
            {
            errorMsg && errorMsg.upload_error ? (
              <div className="hint" style={{ color: "red" }}>
                {errorMsg.upload_error}
              </div>
        
            ) : (
              props.isSubmitted && responseMsg ? (
                <div className="hint" style={{ color: "green" }}>
                  {responseMsg}
                </div>
              ):
              (
                props.isSubmitted &&  (
                  <div className="hint" style={{ color: "orange" }}>
                    Uploading...
                  </div>
                )
              )
            )}
            <ul className="list"></ul>
          </div>
        </div>
      </Form>
    </React.Fragment>
  );
}
