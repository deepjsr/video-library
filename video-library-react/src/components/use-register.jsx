import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function UserRegister() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      UserId: "",
      UserName: "",
      Password: "",
      Email: "",
      Mobile: "",
    },
    onSubmit: (values) => {
      console.log(values);
      const MySwal = withReactContent(Swal);

      axios.post("http://localhost:3020/add-user", values).then((response) => {
        console.log(response.data);
        // alert("data saved...");
        MySwal.fire({
          title: "Saved!",
          text: "User has been registered",
          icon: "success",
        });
        navigate("/user-dashboard");
      });
    },
  });
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <div className="card mt-5">
              <div
                className="card-body overflow-auto"
                style={{ height: "500px" }}
              >
                <div className="d-flex space-between">
                  <button className="btn btn-light mb-3 border-dark">
                    <Link to="/" className="text-decoration-none text-dark">
                      <span className="bi bi-arrow-left-short"></span>
                    </Link>
                  </button>
                  <h3 className="text-center d-flex ms-5">User Register</h3>
                </div>
                <form onSubmit={formik.handleSubmit}>
                  <fieldset class="border p-3">
                    <div className="mb-3">
                      <label
                        htmlFor="username"
                        name="UserName"
                        className="form-label"
                      >
                        Username
                      </label>
                      <input
                        onChange={formik.handleChange}
                        type="text"
                        className="form-control"
                        id="username"
                        name="UserName"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="UserId"
                        name="UserId"
                        className="form-label"
                      >
                        UserId
                      </label>
                      <input
                        onChange={formik.handleChange}
                        type="text"
                        className="form-control"
                        id="UserId"
                        name="UserId"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="password"
                        name="password"
                        className="form-label"
                      >
                        Password
                      </label>
                      <input
                        onChange={formik.handleChange}
                        type="Password"
                        className="form-control"
                        id="Password"
                        name="Password"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="Email"
                        name="Email"
                        className="form-label"
                      >
                        Email
                      </label>
                      <input
                        onChange={formik.handleChange}
                        type="text"
                        className="form-control"
                        id="Email"
                        name="Email"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="Mobile"
                        name="Mobile"
                        className="form-label"
                      >
                        Mobile
                      </label>
                      <input
                        onChange={formik.handleChange}
                        type="text"
                        className="form-control"
                        id="Mobile"
                        name="Mobile"
                        required
                      />
                    </div>
                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary">
                        Register
                      </button>
                    </div>
                  </fieldset>
                </form>
                <div className=" mt-2">
                  <Link to="/user-login" className="text-style-none">
                    {" "}
                    Already have a account Login...
                  </Link>
                </div>
                <div class="divider">
                  <span>or</span>
                </div>
                <legend className="border-left fs-6 mt-2 text-secondary w-50">
                  Login with social media
                </legend>
                <div className="d-flex row gap-1 align-item-center justify-content-center">
                  <button
                    className=" bg-dark text-white rounded rounded-circle "
                    style={{ height: "50px", width: "50px" }}
                  >
                    <span className="bi bi-facebook"></span>{" "}
                  </button>
                  <button
                    className=" bg-dark text-white rounded rounded-circle "
                    style={{ height: "50px", width: "50px" }}
                  >
                    <span className="bi bi-google"></span>
                  </button>
                  <button
                    className=" bg-dark text-white rounded rounded-circle "
                    style={{ height: "50px", width: "50px" }}
                  >
                    <span className="bi bi-microsoft"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserRegister;
