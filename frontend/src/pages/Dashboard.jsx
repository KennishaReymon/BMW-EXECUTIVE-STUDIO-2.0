import { STOCK_CARS } from "../data/cars";
import ShowroomHeader from "../components/ShowroomHeader";

function Dashboard({ onConfigure, onCollectionClick, onHomeClick }) {
  return (
    <div className="dashboard">

      
     {/* HEADER */}
<ShowroomHeader onCollectionClick={onCollectionClick} />


      {/* HERO */}
      <section className="hero">
  <h1>Luxury Collection</h1>
  <p>Discover BMW's finest performance, luxury and electric vehicles.</p>

  <button
    type="button"
    className="back-home-btn"
    onClick={onHomeClick}
  >
    ← BACK TO HOMEPAGE
  </button>
</section>


      {/* CAR GRID */}
      <section className="grid-luxury">

        {STOCK_CARS.map((car) => (

          <div
            key={car.id}
            className="car-card"
          >

            <img
              src={car.thumbnail}
              alt={car.name}
              className="car-image"
            />

            <div className="card-content">

              <h2 className="car-name">
                {car.name}
              </h2>

              <p className="subtitle">
                {car.tagline}
              </p>

              <div className="price">
                {car.basePrice}
              </div>

              <button
                className="btn-primary"
                onClick={() => onConfigure(car)}
              >
                CONFIGURE →
              </button>

            </div>

          </div>

        ))}

      </section>

    </div>
  );
}

export default Dashboard;