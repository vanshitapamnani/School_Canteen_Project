import { Routes, Route, Link, NavLink } from "react-router-dom";

import SnackPage from "./pages/snackPage";
import StudentPage from "./pages/studentPage";
import CreateStudent from "./pages/createStudent";
import "./styles/navbar.css";
import StudentDetail from "./pages/studentDetailPage";

function App() {
  return (
    <>
      <nav className="navbar">
        <h2 className="logo">🍽️ Canteen</h2>
        <div className="nav-links">
          <Link to="/" className="nav-btn">
            Snacks
          </Link>

          <Link to="/students" className="nav-btn">
            Students
          </Link>

          <Link to="/create" className="nav-btn">
            Create Student
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<SnackPage />} />
        <Route path="/students" element={<StudentPage />} />
        <Route path="/create" element={<CreateStudent />} />
        <Route path="/students/:id" element={<StudentDetail />} />
      </Routes>
    </>
  );
}
export default App;
