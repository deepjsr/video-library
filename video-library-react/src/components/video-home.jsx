import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

function VideoHome() {
  const { user, loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/user-dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="d-flex justify-content-center mt-5">
      {/* <Link to="/user-login"       className="btn btn-warning me-2"> */}
      <button
        className="btn btn-warning me-2"
        onClick={(e) => loginWithRedirect()}
      >
        {" "}
        User Login
      </button>
      <Link to="/admin-login" className="btn btn-light me-2">
        {" "}
        Admin Login
      </Link>
    </div>
  );
}

export default VideoHome;
