import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function AddVideo() {
  const [catagories, setCatagories] = useState([
    { CatagoryName: "", CatagoryId: 0 },
  ]);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      VideoId: "",
      Title: "",
      Url: "",
      Description: "",
      Likes: 0,
      Dislikes: 0,
      Views: 0,
      CatagoryId: 0,
      Comments: [""],
    },
    onSubmit: (video) => {
      axios.post("http://localhost:3020/add-video", video);
      Swal.showLoading();
      alert("Video added successfully");
      navigate("/admin-dashboard");
      Swal.hideLoading();
    },
  });

  useEffect(() => {
    axios.get("http://localhost:3020/get-categories").then((resp) => {
      resp.data.unshift({
        CatagoryId: -1,
        CatagoryName: "Select a category",
      });
      setCatagories(resp.data);
    });
  }, []);
  return (
    <div>
      <div className="">
        <div className="container">
          <div className="row">
            <div className="col-md-5 offset-md-3">
              <div
                className="card mt-5 overflow-auto"
                style={{ height: "450px" }}
              >
                <div className="card-body">
                  <div className="d-flex space-between">
                    <h3 className="text-center d-flex ms-5">Add Video</h3>
                  </div>
                  <form
                    onSubmit={formik.handleSubmit}
                    className="overflow-auto"
                  >
                    <fieldset className="border p-3">
                      <div className="mb-3">
                        <label
                          htmlFor="VideoId"
                          name="VideoId"
                          className="form-label"
                        >
                          Video Id:
                        </label>
                        <input
                          onChange={formik.handleChange}
                          type="number"
                          className="form-control"
                          id="VideoId"
                          name="VideoId"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="Title"
                          name="Title"
                          className="form-label"
                        >
                          Title
                        </label>
                        <input
                          onChange={formik.handleChange}
                          type="text"
                          className="form-control"
                          id="Title"
                          name="Title"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="url" name="Url" className="form-label">
                          Url
                        </label>
                        <input
                          type="text"
                          onChange={formik.handleChange}
                          className="form-control"
                          id="Url"
                          name="Url"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="Description"
                          name="Description"
                          className="form-label"
                        >
                          Description
                        </label>
                        <textarea
                          onChange={formik.handleChange}
                          cols="20"
                          rows="2"
                          className="form-control"
                          id="Description"
                          name="Description"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="Views"
                          name="Views"
                          className="form-label"
                        >
                          Views
                        </label>
                        <input
                          onChange={formik.handleChange}
                          type="number"
                          className="form-control"
                          id="Views"
                          name="Views"
                          required
                        />
                      </div>
                      <label htmlFor="category" className="form-label">
                        Category
                      </label>
                      <select
                        className="form-select"
                        name="CategoryId"
                        onChange={formik.handleChange}
                      >
                        {catagories.map((category) => (
                          <option
                            key={category.CatagoryId}
                            value={category.CatagoryId}
                          >
                            {category.CatagoryName}
                          </option>
                        ))}
                      </select>
                    </fieldset>
                    <div className="d-flex justify-content-end mt-2">
                      <Link
                        to="/admin-dashboard"
                        className="btn btn-danger me-2"
                      >
                        Cancel
                      </Link>
                      <button className="btn btn-primary">Save</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddVideo;
