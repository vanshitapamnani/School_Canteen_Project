import { useState, useEffect } from "react";
import "../styles/orderForm.css";
function OrderModal({ snack, onClose }) {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    fetch("http://localhost:3001/students")
      .then((res) => res.json())
      .then((data) => {
        console.log("Students fetched:", data);
        setStudents(data);
      })
      .catch((err) => console.log(err));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!studentId) {
      alert("Please select a student");
      return;
    }
    try {
      const selectedStudent = students.find((s) => s.id === studentId);
      const orderTotal = snack.price * Number(quantity);
      if (!selectedStudent) {
        alert("Student data not found");
        return;
      }
      const order = {
        snack: snack.name,
        snackId: snack.id,
        studentId: studentId,
        quantity: Number(quantity),
        payable: snack.price * quantity,
      };

      fetch("http://localhost:3001/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });
      const updatedTotal =
        (Number(selectedStudent.totalSpent) || 0) + orderTotal;
      const updatedOrders = [...(selectedStudent.orders || []), order];

      await fetch(`http://localhost:3001/students/${studentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          totalSpent: updatedTotal,
          orders: updatedOrders,
        }),
      });

      alert("Order Placed");
      onClose();
    } catch (err) {
      console.error("Order process failed:", err);
      alert("Something went wrong with the order.");
    }
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Order {snack.name}</h2>

        <form onSubmit={handleSubmit}>
          <select
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}>
            <option value=""> Select Student</option>
            {students.length > 0 ? (
              students.map((s) => (
                <option key={s.id} value={String(s.id)}>
                  {s.studentName}
                </option>
              ))
            ) : (
              <option disabled> Loading... </option>
            )}
          </select>

          <input
            type="number"
            min="1"
            max="5"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <div className="modal-buttons">
            <button type="submit">Place Order</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OrderModal;
