import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function AdminDashboard() {
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
  const [loading, setLoading] = useState(true);
  function handelDelClick(e) {
    console.log("clicked", e);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${process.env.BACKEND_URL}/delete-video/${e}`);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  }

  useEffect(() => {
    axios
      .get(`${process.env.BACKEND_URL}/get-videos`)
      .then((response) => {
        setVideo(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert("Error loading data");
        console.error(error);
        setLoading(false);
      });
  }, []); // Updated dependency array to empty

  if (loading) {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <div
          className="spinner-border text-primary"
          style={{ width: "5rem", height: "5rem" }}
          role="status"
        ></div>
      </div>
    );
  }

  return (
    <div>
      <div className="ms-3">
        <Link to="/add-video" className=" btn btn-lg btn-outline-info ">
          <span className=" me-2 bi bi-camera-video"></span>
          Add Video
        </Link>
      </div>
      <div
        className="d-flex align-item-center justify-content-center table-responsive"
        style={{ height: "450px" }}
      >
        <table
          className="table table-striped table-hover"
          style={{ maxWidth: "900px" }}
        >
          <thead className="thead-dark">
            {" "}
            {/* Corrected class attribute */}
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Preview</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {video.map((item) => (
              <tr key={item.VideoId}>
                <td
                  className="text-wrap text-truncate"
                  style={{ maxWidth: "150px" }}
                >
                  {item.Title}
                </td>
                <td>
                  <iframe src={item.Url} height="200px" width="200px"></iframe>
                </td>
                <td>
                  <Link
                    to={`/edit-video/${item.VideoId}`}
                    className="btn btn-primary  me-2"
                  >
                    <span className="bi bi-pen-fill me-2"></span>
                    Edit
                  </Link>
                  <Link
                    className="btn btn-danger"
                    onClick={() => handelDelClick(item.VideoId)}
                  >
                    <span className="bi bi-trash-fill"></span> Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="ms-3 mb-3">
        <Link to="/" className=" btn btn-outline-light">
          <span className=" me-2 bi bi-arrow-left-square-fill fs-2"></span>
          {/* Back */}
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
