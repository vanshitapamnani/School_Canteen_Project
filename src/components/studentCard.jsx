import "../styles/studentCard.css";
function StudentCard({ student, onViewDetails }) {
  return (
    <div className="student-card">
      <div className="header">
        <h3>{student.studentName}</h3>
        <span className="code">Referral code : {student.referralCode}</span>
      </div>
      <div className="content">
        <p>Total Spent </p>
        <h4 className="amt">₹{student.totalSpent}</h4>
      </div>
      <button className="detail-btn" onClick={() => onViewDetails(student.id)}>
        View Details
      </button>
    </div>
  );
}
export default StudentCard;
