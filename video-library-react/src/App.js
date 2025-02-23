import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VideoHome from "./components/video-home";
import UserLogin from "./components/user-login";
import AdminLogin from "./components/admin-login";
import AdminDashboard from "./components/admin-dashboard";
import AddVideo from "./components/add-video";
import EditVideo from "./components/edit-video";
import UserRegister from "./components/use-register";
import UserDashboard from "./components/user-dashboard";

function App() {
  return (
    <div className="body-background">
      <div className="bg-shade">
        <div className="text-center pt-4 text-white">
          Technology video library
        </div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<VideoHome />} />
            <Route path="/user-login" element={<UserLogin />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/add-video" element={<AddVideo />} />
            <Route path="/user-register" element={<UserRegister />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/edit-video/:id" element={<EditVideo />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
