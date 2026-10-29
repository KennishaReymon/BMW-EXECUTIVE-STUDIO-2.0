import { useEffect, useState } from "react";
import "./App.css";
import BMWLogo from "./assets/images/bmw-logo.png";
import Dashboard from "./pages/Dashboard";
import Configurator from "./pages/Configurator";
import Home from "./pages/Home";
import CustomerLogin from "./pages/CustomerLogin";
import CustomerRegister from "./pages/CustomerRegister";
import CustomerDashboard from "./pages/CustomerDashboard";
import MyOrders from "./pages/MyOrders";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";


function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [selectedCar, setSelectedCar] = useState(null);
  const [currentPage, setCurrentPage] = useState("home");
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleConfigure = (car) => {
    setSelectedCar(car);
  };

  return (
    <div className="app">

      {/* INTRO */}
      {showIntro && (
        <div className="intro-screen">
          <div className="intro-content">

            <img
              src={BMWLogo}
              alt="BMW"
              className="intro-logo"
            />

            <h1 className="intro-title">
              BMW EXECUTIVE STUDIO
            </h1>

            <p className="intro-subtitle">
              Luxury Automotive Configurator
            </p>

          </div>
        </div>
      )}






     {/* CINEMATIC HOMEPAGE */}
{!showIntro && currentPage === "home" && (
  <Home
  onExplore={() => setCurrentPage("collection")}
  onCustomerLogin={() => setCurrentPage("customer-login")}
  onAdminLogin={() => setCurrentPage("admin-login")}
/>
)}

{/* CUSTOMER LOGIN PAGE */}
{!showIntro && currentPage === "customer-login" && (
  <CustomerLogin
    onBackHome={() => setCurrentPage("home")}
    onCreateAccount={() => setCurrentPage("customer-register")}
   onLoginSuccess={(user) => {
  setLoggedInUser(user);
  setCurrentPage("customer-dashboard");
}}
  />
)}



{/* ADMIN LOGIN PAGE */}
{!showIntro && currentPage === "admin-login" && (
  <AdminLogin
    onBackHome={() => setCurrentPage("home")}
    onLoginSuccess={(user) => {
      console.log("Admin authenticated:", user.name);
      setCurrentPage("admin-dashboard");
    }}
  />
)}



{/* ADMIN DASHBOARD */}
{!showIntro && currentPage === "admin-dashboard" && (
  <AdminDashboard
    onLogout={() => {
      sessionStorage.removeItem("bmwAdminToken");
      setCurrentPage("home");
    }}
  />
)}






{/* CUSTOMER DASHBOARD */}
{!showIntro && currentPage === "customer-dashboard" && (
  <CustomerDashboard
    user={loggedInUser}
    onExplore={() => {
      setSelectedCar(null);
      setCurrentPage("collection");
    }}
   onMyOrders={() => {
  setCurrentPage("my-orders");
}}
    onLogout={() => {
      sessionStorage.removeItem("bmwToken");
      setLoggedInUser(null);
      setSelectedCar(null);
      setCurrentPage("home");
    }}
  />
)}



{/* MY ORDERS PAGE */}
{!showIntro && currentPage === "my-orders" && (
  <MyOrders
    onBack={() => setCurrentPage("customer-dashboard")}
  />
)}







{/* CUSTOMER REGISTRATION PAGE */}
{!showIntro && currentPage === "customer-register" && (
  <CustomerRegister
    onBackLogin={() => setCurrentPage("customer-login")}
  />
)}

{/* BMW COLLECTION */}
{!showIntro && currentPage === "collection" && !selectedCar && (
  <Dashboard
    onConfigure={handleConfigure}
    onCollectionClick={() => setCurrentPage("collection")}
    onHomeClick={() => setCurrentPage("home")}
  />
)}

{/* BMW CONFIGURATOR */}
{!showIntro && currentPage === "collection" && selectedCar && (
  

<Configurator
  car={selectedCar}
  onBack={() => setSelectedCar(null)}
  onContinue={async (configuration) => {
    const token = sessionStorage.getItem("bmwToken");

    if (!token) {
      alert("Please sign in before placing an order.");
      setSelectedCar(null);
      setCurrentPage("customer-login");
      return;
    }

    try {
      const response = await fetch(
        "https://bmw-executive-studio-api.onrender.com/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            carName: configuration.carName,
            color: configuration.color,
            wheel: configuration.wheel,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Order failed");
      }

      alert("BMW order request submitted successfully!");
      setSelectedCar(null);
    } catch (error) {
      alert(error.message || "Unable to submit order.");
    }
  }}
/>


)}
    </div>
  );
}

export default App;