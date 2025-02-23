import React from "react";
import { Link } from "react-router-dom";

function VideoHome() {
  return (
    <div className="d-flex justify-content-center mt-5">
      <Link to="/user-login" className="btn btn-warning me-2">
        {" "}
        User Login
      </Link>
      <Link to="/admin-login" className="btn btn-light me-2">
        {" "}
        Admin Login
      </Link>
    </div>
  );
}

export default VideoHome;
