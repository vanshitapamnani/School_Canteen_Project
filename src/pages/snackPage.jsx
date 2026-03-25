import { useEffect, useState } from "react";
import SnackCard from "../components/snackCard";
import OrderForm from "../components/orderForm";
import "../styles/snackPage.css";

function SnackPage() {
  const [snacks, setSnacks] = useState([]);
  const [selectedSnack, setSelectedSnack] = useState(null);
  useEffect(() => {
    fetch("http://localhost:3001/snacks")
      .then((res) => res.json())
      .then((data) => {
        console.log("DATA : ", data);
        setSnacks(data);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleOrder(snack) {
    console.log("CLICKED:", snack);
    setSelectedSnack(snack);
  }

  function handleClose() {
    setSelectedSnack(null);
  }

  return (
    <div>
      <h2 className="heading">Snacks</h2>

      <div className="snack-container">
        {snacks.map((snack) => (
          <SnackCard key={snack.id} snack={snack} onOrder={handleOrder} />
        ))}
      </div>
      {selectedSnack && (
        <OrderForm snack={selectedSnack} onClose={handleClose} />
      )}
    </div>
  );
}

export default SnackPage;
