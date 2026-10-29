import "./MyOrders.css";
import { useEffect, useState } from "react";

export default function MyOrders({ onBack }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const token = sessionStorage.getItem("bmwToken");

        if (!token) {
          throw new Error("Please sign in to view your orders.");
        }

        const response = await fetch(
          "https://bmw-executive-studio-api.onrender.com/api/orders/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load orders.");
        }

        setOrders(data.orders || []);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  return (
    <main className="my-orders-page">
      <section className="my-orders-content">
        <button type="button" onClick={onBack}>
          ← BACK TO DASHBOARD
        </button>

        <h1>MY BMW ORDERS</h1>
        <p>Your personalized BMW order history.</p>

        {loading && <p>Loading your orders...</p>}

        {error && <p role="alert">{error}</p>}

        {!loading && !error && orders.length === 0 && (
          <p>You haven't placed any BMW orders yet.</p>
        )}

        {!loading && !error && orders.map((order) => (
          <article key={order._id} className="my-order-card">
            <h2>{order.carName}</h2>
            <p>Color: {order.color}</p>
            <p>Wheels: {order.wheel}</p>
            <p>
              Price: {order.price || "Pending confirmation"}
            </p>
            <p>
              Ordered:{" "}
              {order.createdAt
                ? new Date(order.createdAt).toLocaleDateString()
                : "Date unavailable"}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
