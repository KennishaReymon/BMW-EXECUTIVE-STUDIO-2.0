import { useState } from "react";
import BMWViewer from "../components/BMWViewer";

export default function Configurator({ car, onBack, onContinue }) {

const [selectedColor, setSelectedColor] = useState(
  Object.keys(car.colors)[0]
);

const [show3D, setShow3D] = useState(false);

const [selectedWheel, setSelectedWheel] = useState(
  car.wheels[0]
);

  return (
    <div className="configurator-page">

      {/* HEADER */}
      <div className="configurator-header">
        <div>
          <div className="brand-title">
            BMW CONFIGURATOR
          </div>

          <div className="subtitle">
            Build your ultimate driving machine
          </div>
        </div>

        <button
          className="back-button"
          onClick={onBack}
        >
          ← BACK TO COLLECTION
        </button>
      </div>

      {/* MAIN */}
      <div className="configurator">

       {/* 3D VIEWER */}
<div className="configurator-display">

  {!show3D ? (
    <>
      <img
        src={car?.colors?.[selectedColor]}
        alt={car?.name}
        className="configurator-image"
      />

      <button
        className="view-3d-btn"
        onClick={() => setShow3D(true)}
      >
        VIEW 3D →
      </button>
    </>
  ) : (
    <>
     <BMWViewer model={car.model} />

      <button
        className="view-3d-btn"
        onClick={() => setShow3D(false)}
      >
        ← BACK TO IMAGE
      </button>
    </>
  )}

</div>

        {/* CONTROLS */}
       <div className="configurator-panel">

          <p className="configurator-label">
            CURRENT MODEL
          </p>

          <h1>
            {car?.name || "BMW M8 Competition Coupe"}
          </h1>

          <p className="subtitle">
            Configure your vehicle
          </p>

          <div className="config-section">
            <h3>EXTERIOR</h3>

            <div className="selector-row">
  {Object.keys(car.colors).map((color) => (
    <button
      key={color}
      className="selector-btn"
      onClick={() => setSelectedColor(color)}
    >
      {color}
    </button>
  ))}
</div>
          </div>

          <div className="config-section">
  <h3>WHEELS</h3>

  <div className="selector-row">
   {car.wheels.map((wheel) => (
  <button
    key={wheel}
    type="button"
    className="selector-btn"
    onClick={() => setSelectedWheel(wheel)}
    aria-pressed={selectedWheel === wheel}
  >
    {wheel}
  </button>
))}
  </div>
</div>

          <div className="config-price">
            {car?.basePrice || "₹2,44,00,000"}
          </div>

          <button
  className="btn-primary"
  onClick={() =>
    onContinue?.({
      carName: car.name,
      color: selectedColor,
      wheel: selectedWheel,
      price: car.basePrice,
    })
  }
>
  CONTINUE →
</button>
        </div>

      </div>

    </div>
  );
}