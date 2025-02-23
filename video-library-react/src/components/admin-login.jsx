import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
      axios.get("http://localhost:3020/get-admin").then((response) => {
        console.log(response.data);
        const user = response.data.find(
          (item) => item.UserId === values.username
        );
        if (user) {
          if (user.Password === values.password) {
            navigate("/admin-dashboard");
          } else {
            alert("Invalid password");
          }
        } else {
          alert("Invalid username");
        }
      });
    },
  });
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <div className="card mt-5">
              <div className="card-body">
                <div className="d-flex space-between">
                  <Link to="/" className="text-decoration-none text-dark">
                    <button className="btn btn-light mb-3 border-dark">
                      <span className="bi bi-arrow-left-short"></span>
                    </button>
                  </Link>
                  <h3 className="text-center d-flex ms-5">Admin Login</h3>
                </div>
                <form onSubmit={formik.handleSubmit}>
                  <fieldset class="border p-3">
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
                  <legend className="border-left fs-6 mt-2 font-secondary">
                    Login with social media
                  </legend>
                </form>
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

export default AdminLogin;
