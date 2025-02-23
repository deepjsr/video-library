import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditVideo() {
  const [catagories, setCatagories] = useState([]);
  const [video, setVideo] = useState([
    {
      VideoId: 0,
      Title: "",
      Url: "",
      Description: "",
      Likes: 0,
      Dislikes: 0,
      Views: 0,
      CatagoryId: 0,
      Comments: [""],
    },
  ]);

  let params = useParams();

  function LoadCatagories() {
    axios.get(`${process.env.BACKEND_URL}/get-categories`).then((resp) => {
      resp.data.unshift({
        CatagoryId: -1,
        CatagoryName: "Select a catagory",
      });
      setCatagories(resp.data);
    });
  }

  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      VideoId: video[0].VideoId,
      Title: video[0].Title,
      Url: video[0].Url,
      Description: video[0].Description,
      Likes: video[0].Likes,
      Dislikes: video[0].Dislikes,
      Views: video[0].Views,
      CatagoryId: video[0].CategoryId,
      Comments: video[0].Comments,
    },
    onSubmit: (values) => {
      axios
        .put(`${process.env.BACKEND_URL}/update-video/${params.id}`, values)
        .then((resp) => console.log(resp, "video edited"));
      alert("Video Edited successfully...");
      navigate("/admin-dashboard");
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    LoadCatagories();

    axios
      .get(`${process.env.BACKEND_URL}/get-videos/${params.id}`)
      .then((resp) => {
        setVideo(resp.data);
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
                    <h3 className="text-center d-flex ms-5">Edit Video</h3>
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
                          value={formik.values.VideoId}
                          onChange={formik.handleChange}
                          type="number"
                          className="form-control"
                          id="VideoId"
                          name="VideoId"
                          readOnly
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
                          value={formik.values.Title}
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
                          value={formik.values.Url}
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
                          value={formik.values.Description}
                          onChange={formik.handleChange}
                          cols="40"
                          rows="2"
                          className="form-control"
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
                          value={formik.values.Views}
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
                        value={formik.values.CategoryId}
                        onChange={formik.handleChange}
                        className="form-select"
                        name="CategoryId"
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
                      <div className="mb-3">
                        <label
                          htmlFor="Comments"
                          name="Comments"
                          className="form-label"
                        >
                          Comments
                        </label>
                        <textarea
                          value={formik.values.Comments}
                          onChange={formik.handleChange}
                          cols="40"
                          rows="2"
                          className="form-control"
                          name="Comments"
                          required
                        />
                      </div>
                    </fieldset>
                    <div className="d-flex justify-content-end mt-2">
                      <Link
                        to="/admin-dashboard"
                        className="btn btn-danger me-2"
                      >
                        Cancel
                      </Link>
                      <button type="submit" className="btn btn-primary">
                        Save
                      </button>
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

export default EditVideo;
