import { useState } from "react";
import "../styles/createStudent.css";
function CreateStudent() {
  const [studentName, setStudentName] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  function generateCode() {
    return "REF" + Math.floor(1000 + Math.random() * 9000);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!studentName.trim()) {
      setError("Name cannot be empty");
      setMessage("");
      return;
    }

    const newStudent = {
      studentName,
      referralCode: generateCode(),
      totalSpent: 0,
      orders: [],
    };

    try {
      const res = await fetch("http://localhost:3001/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStudent),
      });
      if (!res.ok) throw new Error("Failed to add student");
      setStudentName("");
      setError("");
      setMessage("Student added successfully");
    } catch (err) {
      setError(err.message);
      setMessage("");
    }
  }
  return (
    <div className="student-container">
      <h3> Add New Student</h3>
      <form onSubmit={handleSubmit} className="student-form">
        <input
          type="text"
          placeholder="Enter Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          required
        />
        <button type="submit" className="submit-btn">
          Add Student
        </button>
        {error && <p className="error-message">{error}</p>}
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}

export default CreateStudent;
