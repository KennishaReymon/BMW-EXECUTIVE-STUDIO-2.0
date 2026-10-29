import "./CustomerDashboard.css";
export default function CustomerDashboard({
  user,
  onExplore,
  onMyOrders,
  onLogout,
}) {
  return (
    <main className="customer-dashboard-page">
      <section className="customer-dashboard-content">
        <p>BMW EXECUTIVE STUDIO</p>

        <h1>
          Welcome{user?.name ? `, ${user.name}` : ""}.
        </h1>

        <p>
          Your exclusive BMW experience starts here.
        </p>

        <div className="customer-dashboard-actions">
          <button type="button" onClick={onExplore}>
            EXPLORE COLLECTION
          </button>

          <button type="button" onClick={onMyOrders}>
            MY ORDERS
          </button>

          <button type="button" onClick={onLogout}>
            LOG OUT
          </button>
        </div>
      </section>
    </main>
  );
}

