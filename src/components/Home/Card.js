import React from "react";
import { BASE_API_URL } from "../../utils/constants";
import "../../style/css/Card.css";

const Photo = ({ detail }) => {
  return (
    <div className="card">
      <div className="card-header">
        <img src={`${BASE_API_URL}/upload/photos/${detail._id}`} alt="" />
      </div>
      <div className="card-body">
        <div className="tags">
        <span className={`tag tag-${detail.category}`}>{detail.category}</span>
        <span className="tag tag-price">$ {detail.price}</span>
        </div>
        <h4>{detail.title}</h4>
        <p>{detail.description}</p>
        <div className="user">
          <img src={require("../../assets/images/user.png")} alt="" />
          <div className="user-info">
            <h5>{detail.user}</h5>
            <small>{detail.FDate}</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Photo;
