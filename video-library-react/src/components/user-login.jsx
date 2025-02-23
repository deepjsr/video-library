import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function UserLogin() {
  const MySwal = withReactContent(Swal);
  const showLoading = function () {
    Swal.fire({
      title: "Now loading",
      allowEscapeKey: false,
      allowOutsideClick: false,
      showConfirmButton: false,
      timer: 2000,
      onOpen: () => {
        Swal.showLoading();
      },
    }).then(
      () => {},
      (dismiss) => {
        if (dismiss === "timer") {
          MySwal.fire({
            title: "Finished!",
            type: "success",
            timer: 2100,
            showConfirmButton: false,
          });
        }
      }
    );
  };

  const [cookie, setCookie, removeCookie] = useCookies();

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      axios.get(`${process.env.BACKEND_URL}/get-users`).then((response) => {
        const user = response.data.find(
          (item) => item.UserId === values.username
        );
        if (user) {
          if (user.Password === values.password) {
            showLoading();
            setCookie("username", user.UserName);
            // MySwal.hideLoading();
            navigate("/user-dashboard");
          } else {
            // alert("Invalid password");
            MySwal.fire("Invalid password");
          }
        } else {
          MySwal.fire("Invalid username");
          // alert("Invalid username");
        }
      });
    },
  });
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-5 offset-md-4">
            <div className="card mt-5">
              <div className="card-body">
                <div className="d-flex space-between">
                  <Link to="/" className="text-decoration-none text-dark">
                    <button className="btn btn-light mb-3 border-dark">
                      <span className="bi bi-arrow-left-short"></span>
                    </button>
                  </Link>
                  <h3 className="text-center d-flex ms-5">User Login</h3>
                </div>
                <form onSubmit={formik.handleSubmit}>
                  <fieldset className="border p-3">
                    <div className="mb-3">
                      <label
                        htmlFor="username"
                        name="usename"
                        className="form-label"
                      >
                        Username
                      </label>
                      <input
                        onChange={formik.handleChange}
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
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
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        required
                      />
                    </div>
                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary">
                        Login
                      </button>
                    </div>
                  </fieldset>
                </form>
                <div
                  className="
                d-flex"
                >
                  <legend className="border-left fs-6 mt-2 text-secondary w-50">
                    Login with social media
                  </legend>
                  <div className="text-end mt-2 w-50">
                    <Link to="/user-register">Register New User</Link>
                  </div>
                </div>
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

export default UserLogin;
