import React, { useState } from "react";
import "../../style/css/Alert.css";

export default function Alert(props) {
  const [warning, setWarning] = useState("alert");
  const [error, setError] = useState("alert");
  const [success, setSuccess] = useState("alert");

  if (props.type === "success") {
    return (
      <div className={success}>
        <section className="notif notif-notice">
          <h6 className="notif-title">{props.title}!</h6>
          <p>{props.detail}</p>
          <div className="notif-controls">
            {/* <span className="notif-minimize">Minimize</span> */}
            {/* <span className="notif-zoom">Zoom</span> */}
            <span className="notif-close" onClick={() => setSuccess("hidden")}>
              Close
            </span>
          </div>
        </section>
      </div>
    );
  } else if (props.type === "error") {
    return (
      <div className={error}>
        <section className="notif notif-warn">
          <h6 className="notif-title">{props.title}</h6>
          <p>{props.detail}</p>
          <div className="notif-controls">
            {/* <span className="notif-minimize">Minimize</span> */}
            {/* <span className="notif-zoom">Zoom</span> */}
            <span className="notif-close" onClick={() => setError("hidden")}>
              Close
            </span>
          </div>
        </section>
      </div>
    );
  } else if (props.type === "warning") {
    return (
      <div className={warning}>
        <section className="notif notif-warn">
          <h6 className="notif-title">{props.title}</h6>
          <p>{props.detail}</p>
          <div className="notif-controls">
            {/* <span className="notif-minimize">Minimize</span> */}
            {/* <span className="notif-zoom">Zoom</span> */}
            <span className="notif-close" onClick={() => setWarning("hidden")}>
              Close
            </span>
          </div>
        </section>
      </div>
    );
  }
}
