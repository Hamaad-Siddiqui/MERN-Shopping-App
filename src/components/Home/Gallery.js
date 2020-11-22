import React, { useEffect, useState } from "react";
import { startLoadPhotos } from "../../redux/actions/photos";
import { connect } from "react-redux";

import Alert from "../Other/Alert";
import Card from "../Home/Card";

import "../../style/sass/Upload.scss";

const Gallary = ({ errors, photos, dispatch }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(startLoadPhotos());
  }, []);

  useEffect(() => {
    if (photos.length > 0) {
      setIsLoading(false);
      console.log(photos);
    }
  }, [photos]);

  return (
    <div className="photos-list">
      {errors && errors.get_error && (
        <Alert type={"error"} detail={errors.get_error} title={"Error !"} />
      )}
      {isLoading ? (
        <footer>
          <div className="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </footer>
      ) : (
        photos.map((photo) => (
          <Card key={photo._id} detail={photo} errors={errors.get_error} />
        ))
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  photos: state.photos || [],
  errors: state.errors || {},
});

export default connect(mapStateToProps)(Gallary);
