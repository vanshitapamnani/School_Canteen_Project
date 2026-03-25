import StudentCard from "../components/studentCard";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import CreateStudent from "./createStudent";
import "../styles/studentPage.css";

function StudentPage() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchStudents() {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:3001/students");
        if (!res.ok) throw new Error("Failed to Fetch Students");
        const data = await res.json();
        setStudents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchStudents();
  }, []);
  function handleViewDetails(studentId) {
    return navigate(`/students/${studentId}`);
  }

  // function handleAddStudent(student) {
  //   setStudents([...students, student]);
  // }

  if (loading) return <p className="loading">Loading students...</p>;
  if (error) return <p className="err-message">Error: {error}</p>;
  return (
    <div className="page">
      <h2>Students</h2>
      {/* <CreateStudent onAddStudent={handleAddStudent} /> */}
      <div className="container">
        {students.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>
    </div>
  );
}

export default StudentPage;
