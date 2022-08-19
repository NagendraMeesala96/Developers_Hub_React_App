import logo from "./logo.svg";
import "./App.css";
import SignUp from "./Components/SignUp";
import LogIn from "./Components/LogIn";
import ClientHomePage from "./Components/ClientHomePage";
import EmployeeHomePage from "./Components/EmployeeHomePage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PostProject from "./Components/PostProject";
import ProjectDetails from "./Components/ProjectDetails";
import Profile from "./Components/Profile";
import { ToastContainer } from 'react-toastify';

function App() {
  const ProtectedRoute = (props) => {
    const token = localStorage.getItem("token");
    const hasLoggedIn = token ? true : false;
    if (hasLoggedIn) return props.children;
    return <Navigate to="/LogIn" />;
  };

  const UnProtectedRoute = (props) => {
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("userType");
    const hasLoggedIn = token ? true : false;
    if (hasLoggedIn)
      return (
        <Navigate
          to={userType == "Employee" ? "/EmployeeHomePage" : "/ClientHomePage"}
        />
      );
    return props.children;
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <UnProtectedRoute>
                <LogIn />
              </UnProtectedRoute>
            }
          />
          <Route
            path="/LogIn"
            element={
              <UnProtectedRoute>
                <LogIn />
              </UnProtectedRoute>
            }
          />
          <Route
            path="/SignUp"
            element={
              <UnProtectedRoute>
                <SignUp />
              </UnProtectedRoute>
            }
          />
          <Route
            path="/ClientHomePage"
            element={
              <ProtectedRoute>
                <ClientHomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/EmployeeHomePage"
            element={
              <ProtectedRoute>
                <EmployeeHomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/PostProject"
            element={
              <ProtectedRoute>
                <PostProject />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ProjectDetails/:userType/:id"
            element={
              <ProtectedRoute>
                <ProjectDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ProjectDetails/userType/:id"
            element={
              <ProtectedRoute>
                <ProjectDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/MyProfile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
