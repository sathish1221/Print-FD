import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./component/Login";
import Status from "./profile/Status";
import DashboardCopy from "./Pages/Dashboard copy";
import Side from "./admin/Side";
import Sidecopy from "./admin/Side copy";
import AllUsersPage from "./Pages/AllUsersPage";
import NewUsersPage from "./Pages/NewUsersPage";
import ImageUploadPage from "./Pages/ImageUploadPage";
import AddEvents from './Pages/AddEventsPage';
import ViewEvents from './Pages/ViewEventPages';
import AdminLogin from "./component/AdminLogin";
import WorldBicycleDay from "./Pages/WorldBicycleDay";
import YogaDay from "./Pages/YogaDay";
import Viewmore from './Pages/Viewmore';
import Forgot from './component/Forgotpass';
import VerifyOTP from './component/Verify-otp';
import ViewDesignsPage from './Pages/ViewDesignsPage';

function App() {
  return (
   
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/world-bicycle-day" element={<WorldBicycleDay />} />
        <Route path="/yoga-day" element={<YogaDay />} />
        <Route path="/adminsignin" element={<AdminLogin />} />
        <Route path="/status" element={<Status />} />
        <Route path="/dashboard-copy" element={<DashboardCopy />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/side" element={<Side />} />
        <Route path="/image-upload" element={<ImageUploadPage />} />
        <Route path="/viewmore" element={<Viewmore />} />
        <Route path="/side-copy" element={<Sidecopy />} />
        <Route path="/all-users" element={<AllUsersPage />} />
        <Route path="/new-user" element={<NewUsersPage />} />
        <Route path="/events" element={<AddEvents />} /> 
        <Route path="/forgot-pass" element={<Forgot />} /> 
        <Route path="/verify-otp" element={<VerifyOTP />} /> 
        <Route path="/view-events" element={<ViewEvents />} /> 
        <Route path="/view-designs" element={<ViewDesignsPage />} /> 
      </Routes>

  );
}

export default App;


// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./component/Login";
// import Status from "./profile/Status";
// import DashboardCopy from "./Pages/Dashboard copy";
// import Side from "./admin/Side"; // Assuming this is your sidebar component
// import Register from "./component/Register";
// import ImageUploadPage from "./Pages/ImageUploadPage";
// import Sidecopy from "./admin/Side copy";
// import Festival from './Pages/Festival';
// import AdminLogin from "./component/AdminLogin";
// import WorldBicycleDay from "./Pages/WorldBicycleDay";
// import YogaDay from "./Pages/YogaDay";
// import Viewmore from './Pages/Viewmore';
// import Forgot from './component/Forgotpass';
// import VerifyOTP from './component/Verify-otp';
// import AllUsers from './component/AllUsers';
// import NewUser from './component/NewUser';
// import AddFestival from './component/AddFestival';
// import ImageUpload from './component/ImageUpload';

// const App = () => {
//   return (
//     <Router>
//       <div style={{ display: 'flex' }}>
//         <Side /> {/* Sidebar component */}
//         <Routes>
          
//           <Route path="/all-user" element={<AllUsers />} /> {/* Default route */}
//           <Route path="/new-user" element={<NewUser />} />
//           <Route path="/festival" element={<AddFestival />} />
//           <Route path="/image-upload" element={<ImageUpload />} />
//         </Routes>
//       </div>
//       <Routes>
//       <Route path="/" element={<Login />} />
//           <Route path="/world-bicycle-day" element={<WorldBicycleDay />} />
//           <Route path="/yoga-day" element={<YogaDay />} />
//           <Route path="/adminsignin" element={<AdminLogin />} />
//           <Route path="/status" element={<Status />} />
//           <Route path="/dashboard-copy" element={<DashboardCopy />} />
//           {/* <Route path="/image-upload" element={<ImageUploadPage />} /> */}
//           <Route path="/viewmore" element={<Viewmore />} />
//           <Route path="/side-copy" element={<Sidecopy />} />
//           {/* <Route path="/festival" element={<Festival />} /> */}
//           <Route path="/forgot-pass" element={<Forgot />} />
//           <Route path="/verify-otp" element={<VerifyOTP />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
