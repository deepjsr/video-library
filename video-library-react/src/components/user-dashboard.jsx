import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToViewLater } from "../slicer/video-slicer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import store from "../store/store";
import { useAuth0 } from "@auth0/auth0-react";

function UserDashboard() {
  const [cookie, setCookie, removeCookie] = useCookies(["username"]);
  const { logout } = useAuth0();

  const [video, setVideo] = useState([
    {
      VideoId: 0,
      Title: "",
      Url: "",
      Description: "",
      Likes: 0,
      Dislikes: 0,
      Views: 0,
      CategoryId: 0,
      Comments: [""],
    },
  ]);

  const [savedVideo, setSavedVideo] = useState(null); // Store selected video for modal
  const [videoCount, setVideoCount] = useState(0); // Track count locally

  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handelSaveClick(video) {
    dispatch(addToViewLater(video));
    MySwal.fire({
      title: "Video Saved",
      text: `${video.title} Saved successfully`,
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      setVideoCount(store.getState().store.vidoeCount);
      setSavedVideo(video);
    });
  }

  function LoadVideos(url) {
    axios.get(url).then((item) => setVideo(item.data));
  }
  const [catagories, setCatagories] = useState([]);
  useEffect(() => {
    axios.get(`https://video-library-29yf.onrender.com/get-categories`).then(
      (catagory) => (
        catagory.data.unshift({
          CategoryId: -1,
          CategoryName: "Select your catagory",
        }),
        setCatagories(catagory.data)
      )
    );
    LoadVideos(`https://video-library-29yf.onrender.com/get-videos`);
  }, []);

  function handelWatchLater() {}

  function handelCatagoryChange(selectedCatagory) {
    if (selectedCatagory.target.value > 0) {
      LoadVideos(
        `https://video-library-29yf.onrender.com/filter-videos/${selectedCatagory.target.value}`
      );
    } else {
      LoadVideos(`https://video-library-29yf.onrender.com/get-videos`);
    }
  }

  function handelLogout() {
    removeCookie("username");
    navigate("/user-login");
  }
  // const selector = useSelector({vidoeCount});
  return (
    <div className="bg-light p-2 m-2">
      <h3 className="d-flex justify-content-between">
        <span className="me-2">{cookie["username"]} DashBoard</span>
        <div className="btn-group" role="group">
          <button
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
            className="btn btn-outline-primary "
          >
            {" "}
            Logout
          </button>
          <button
            className="btn btn-outline-primary"
            data-bs-toggle="modal"
            data-bs-target="#videomodal"
          >
            Watch Later
            <span className=" position-absolute top-1 badge rounded-pill text-bg-danger">
              {" "}
              {videoCount}
            </span>
          </button>
        </div>
      </h3>
      <div className="row">
        <div className="col-2">
          <div className="mb-3">
            <label htmlFor="search-video" className="form-label fw-bold">
              Search Videos
            </label>
            <div className="input-group">
              <input type="text" className="form-control" />
              <button className="bi bi-search btn btn-warning"></button>
            </div>
          </div>
          <div className="form-label">
            <label htmlFor="catagories" className="fw-bold">
              Select Catagories
            </label>
            <div>
              <select
                onChange={(e) => handelCatagoryChange(e)}
                name=""
                id=""
                className="form-select"
              >
                {catagories.map((catagory) => (
                  <option key={catagory.CatagoryId} value={catagory.CatagoryId}>
                    {catagory.CategoryName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="col-10">
          <section className="mt-4 d-flex flex-wrap">
            {video.length === 0 ? (
              <div className="w-100 text-center mt-5">
                <p>No videos available</p>
              </div>
            ) : (
              video.map((vid) => (
                <div
                  className="card m-2 p-2"
                  style={{ width: "250px" }}
                  key={vid.VideoId}
                >
                  <div className="card-title" style={{ height: "60px" }}>
                    <h5>{vid.Title}</h5>
                  </div>
                  <div className="card-body">
                    <iframe
                      src={vid.Url}
                      className="w-100"
                      height="200"
                      title={vid.VideoId}
                    ></iframe>
                  </div>
                  <div className="card-footer">
                    <span className="bi bi-eye-fill">{vid.Views}</span>
                    <span className="bi mx-3 bi-hand-thumbs-up">
                      {vid.Likes}
                    </span>
                    <span className="bi bi-hand-thumbs-down">
                      {vid.Dislikes}
                    </span>
                    <div className="">
                      <button
                        type="button"
                        onClick={() => handelSaveClick(vid)}
                        className="bi bi-stopwatch btn btn-warning  px-5"
                      >
                        {" "}
                        Watch later
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </section>
        </div>
      </div>
      <div className="modal fade" id="videomodal">
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header d-flex">
              <h1 className="modal-title fs-5" id="videomodal">
                Saved videos
              </h1>
              <button
                className="btn-close text-end"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                  </tr>
                </thead>
                <tbody>
                  {savedVideo ? (
                    savedVideo.map((item) => (
                      <tr key={item.VideoId}>
                        <td>{item.VideoId}</td>
                        <td>{item.Title}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>No video selected</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
