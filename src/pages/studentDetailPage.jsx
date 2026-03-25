import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/studentDetail.css";
function StudentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function studentInfo() {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:3001/students/${id}`);
        if (!res.ok) throw new Error("Unable to find details");
        const data = await res.json();
        console.log("Students fetched on page:", data);
        setStudent(data);
        setOrders(data.orders || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    studentInfo();
  }, [id]);
  function handlePlaceOrder() {
    return navigate("/");
  }

  if (loading) return <p>Loading student details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!student) return <p>No student found</p>;

  return (
    <div className="detail-page">
      <div className="detail-card">
        <h2>{student.studentName}</h2>
        <p className="ref-code">Referral Code : {student.referralCode}</p>
        <div>
          <p className="total-amt">Total Spent : {student.totalSpent}</p>
        </div>
        <div className="order-sec">
          <h3>Orders:</h3>
          <div className="items">
            {orders.length ? (
              orders.map((order, i) => (
                <div key={i} className="item">
                  <div className="order-info">
                    {order.snack}
                    <span> {order.quantity} </span>
                  </div>
                  <div className="price">₹{order.payable}</div>
                </div>
              ))
            ) : (
              <p>No orders yet</p>
            )}
          </div>
        </div>

        <button onClick={handlePlaceOrder} className="order-btn">
          Place New Order
        </button>
      </div>
    </div>
  );
}
export default StudentDetail;
