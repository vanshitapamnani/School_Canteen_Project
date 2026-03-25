import "../styles/snackCard.css";

function SnackCard({ snack, onOrder }) {
  return (
    <div className="snack-card">
      <h3>{snack.name}</h3>
      <p className="snack-price">₹{snack.price}</p>
      <p className="snack-orders">Orders : {snack.orderCount}</p>
      <button onClick={() => onOrder(snack)}> Place Order</button>
    </div>
  );
}

export default SnackCard;
