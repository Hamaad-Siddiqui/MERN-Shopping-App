import React from "react";
import { hidePopup } from "../../redux/actions/popup";
import { useDispatch } from "react-redux";

export default function UploadNav(props) {
  const Dispatch = useDispatch();
  return (
    <nav>
      <ul>
        <li className={props.active === "Details" ? "active" : ""}>
          <span>Details</span>
        </li>
        <li className={props.active === "Image" ? "active" : ""}>
          <span>Pick a Image</span>
        </li>
      </ul>
      <ul>
        <li>
          <span
            onClick={() => {
              Dispatch(hidePopup());
            }}
          >
            <i className="icon-no"></i>
          </span>
        </li>
      </ul>
    </nav>
  );
}
