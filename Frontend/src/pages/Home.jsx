import '../css/main.css';
import MainNav from '../Components/Nav';
import FeatureCard from '../Components/features';
import features from '../Data/featuresData';

export default function Home() {
  return (
    <>
      <div>
        <MainNav />
      </div>

      <main>
        <div className="hero">
          <section className="hero-content">
            <h2 className="sr-only">Promoted Content</h2>
            <p className="subtitle">No fees.</p>
            <p className="subtitle">No minimum deposit.</p>
            <p className="subtitle">High interest rates.</p>
            <p className="text">Open a savings account with Argent Bank today!</p>
          </section>
        </div>

        <section className="features">
          <h2 className="sr-only">Features</h2>
          {features.map((item, index) => (
            <FeatureCard
              key={index}
              icon={item.icon}
              alt={item.alt}
              title={item.title}
              description={item.description}
            />
          ))}
        </section>
      </main>

      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </>
  );
}