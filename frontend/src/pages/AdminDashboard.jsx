import "./AdminDashboard.css";
import { useEffect, useState } from "react";

const API_URL = "https://bmw-executive-studio-api.onrender.com";

export default function AdminDashboard({ onLogout }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    let active = true;

    const loadOrders = async () => {
      try {
        const token = sessionStorage.getItem("bmwAdminToken");

        if (!token) {
          throw new Error("Administrator login required.");
        }

        const response = await fetch(
          `${API_URL}/api/admin/orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to load orders."
          );
        }

        if (active) {
          setOrders(data.orders || []);
        }
      } catch (err) {
        if (active) {
          setError(err.message || "Unable to load orders.");
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    loadOrders();

    return () => {
      active = false;
    };
  }, []);

  const updateStatus = async (orderId, status) => {
    setUpdatingId(orderId);
    setError("");

    try {
      const token = sessionStorage.getItem("bmwAdminToken");

      const response = await fetch(
        `${API_URL}/api/admin/orders/${orderId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to update order."
        );
      }

      setOrders((previous) =>
        previous.map((order) =>
          order._id === orderId
            ? { ...order, status: data.order.status }
            : order
        )
      );
    } catch (err) {
      setError(err.message || "Status update failed.");
    } finally {
      setUpdatingId(null);
    }
  };


  
const updateTracking = async (orderId, field, value) => {
  setUpdatingId(orderId);
  setError("");

  try {
    const token = sessionStorage.getItem("bmwAdminToken");

    const response = await fetch(
      `${API_URL}/api/admin/orders/${orderId}/tracking`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ [field]: value }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Unable to update tracking."
      );
    }

    setOrders((previous) =>
      previous.map((order) =>
        order._id === orderId
          ? { ...order, ...data.order }
          : order
      )
    );
  } catch (err) {
    setError(err.message || "Tracking update failed.");
  } finally {
    setUpdatingId(null);
  }
};


  return (
    <main className="admin-dashboard-page">
      <section className="admin-dashboard-content">
        <header>
          <div>
            <p>BMW EXECUTIVE STUDIO</p>
            <h1>ADMIN DASHBOARD</h1>
            <p>Customer Order Management</p>
          </div>

          <button type="button" onClick={onLogout}>
            LOG OUT
          </button>
        </header>

        {loading && <p>Loading customer orders...</p>}

        {error && <p role="alert">{error}</p>}

        {!loading && !error && orders.length === 0 && (
          <p>No customer orders found.</p>
        )}

        {!loading && orders.map((order) => (
          <article
            key={order._id}
            className="admin-order-card"
          >
            <h2>{order.carName}</h2>

            <p>
              Customer: {order.customer?.name || "Unknown"}
            </p>

            <p>
              Email: {order.customer?.email || "Unavailable"}
            </p>

            <p>Color: {order.color}</p>
            <p>Wheels: {order.wheel}</p>
            <p>Price: {order.price}</p>

            <p>
              Ordered:{" "}
              {order.createdAt
                ? new Date(order.createdAt).toLocaleDateString()
                : "Date unavailable"}
            </p>

            <label htmlFor={`status-${order._id}`}>
              Order Status
            </label>

            <select
              id={`status-${order._id}`}
              value={order.status || "Pending"}
              disabled={updatingId === order._id}
              onChange={(e) =>
                updateStatus(order._id, e.target.value)
              }
            >
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Cancelled">Cancelled</option>
            </select>


<label htmlFor={`payment-${order._id}`}>
  Payment Status
</label>

<select
  id={`payment-${order._id}`}
  value={order.paymentStatus || "Unpaid"}
  disabled={updatingId === order._id}
  onChange={(e) =>
    updateTracking(order._id, "paymentStatus", e.target.value)
  }
>
  <option value="Unpaid">Unpaid</option>
  <option value="Paid">Paid</option>
</select>

<label htmlFor={`sales-${order._id}`}>
  Sales Status
</label>

<select
  id={`sales-${order._id}`}
  value={order.salesStatus || "Not Sold"}
  disabled={updatingId === order._id}
  onChange={(e) =>
    updateTracking(order._id, "salesStatus", e.target.value)
  }
>
  <option value="Not Sold">Not Sold</option>
  <option value="Sold">Sold</option>
</select>


          </article>
        ))}
      </section>
    </main>
  );
}
