export default function ShowroomHeader({
  onCollectionClick,
  onCustomerLoginClick,
}) {
  return (
    <header className="header">
      <div>
  <div className="brand-title">BMW EXECUTIVE STUDIO</div>

  <div className="subtitle">Sheer Driving Pleasure</div>
</div>

      {/* LUXURY SHOWROOM NAVIGATION */}
<nav className="showroom-nav">

  <button
  type="button"
  className="nav-link"
  onClick={onCollectionClick}
>
  COLLECTION
</button>

  <button type="button" className="nav-link">
    MY ORDERS
  </button>

  <button
  type="button"
  className="nav-customer"
  onClick={onCustomerLoginClick}
>
  CUSTOMER LOGIN
</button>

  <button type="button" className="nav-admin">
    ADMIN LOGIN
  </button>

</nav>
    </header>
  );
}