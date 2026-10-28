import "./Home.css";
import ShowroomHeader from "../components/ShowroomHeader";

export default function Home({ onExplore, onCustomerLogin }) {
  return (
  <main className="bmw-home">

    {/* BMW LUXURY SHOWROOM HEADER */}
   <ShowroomHeader
  onCollectionClick={onExplore}
  onCustomerLoginClick={onCustomerLogin}
/>
  
   {/* CINEMATIC HOMEPAGE */}
<section className="bmw-home-hero">

  {/* NIGHT DRIVE BACKGROUND VIDEO */}
  <video
    className="bmw-home-video"
    autoPlay
    muted
    loop
    playsInline
    aria-hidden="true"
  >
    <source
      src="/videos/bmw-night-drive.mp4"
      type="video/mp4"
    />
  </video>
        <div className="bmw-home-content">

          <p className="bmw-home-eyebrow">
            BMW EXECUTIVE STUDIO
          </p>

          <h1>
            BEYOND THE DRIVE.
          </h1>

          <h2>
            EXPERIENCE EXCELLENCE.
          </h2>

          <p className="bmw-home-description">
            Discover extraordinary performance,
            timeless luxury, and the future
            of electric mobility.
          </p>

          <button
  type="button"
  className="bmw-explore-btn"
  onClick={onExplore}
>
  EXPLORE COLLECTION
</button>

        </div>
      </section>

    </main>
  );
}