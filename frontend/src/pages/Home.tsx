// import components
import Footer from "../components/Footer/Footer";

function Home() {
  return (
    <div className="homePage">
      <p className="homeMessage">
        Welcome to Game Hearts, an application to find the perfect partners for
        the creation of your indie game ! Go to SEARCH to find someone, or go to
        PROFILE to create your profile and wait people to contact you.
      </p>
      <Footer />
    </div>
  );
}

export default Home;
