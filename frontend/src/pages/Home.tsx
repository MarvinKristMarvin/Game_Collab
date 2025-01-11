// import components
import axios from "axios";
import Footer from "../components/Footer/Footer";
import { Link } from "react-router-dom";
import useInactivityHandler from "../hooks/useInactivityHandler";
import { Helmet } from "react-helmet";

function Home() {
  // Send credentials automatically on every request
  axios.defaults.withCredentials = true;
  // Custom hook to handle inactivity logout in front and back then toasts the user
  useInactivityHandler();
  return (
    <>
      <Helmet>
        <title>Game Hearts - Find and collaborate with indie game lovers</title>
        <meta
          name="description"
          content="Welcome to Game Hearts! Find and collaborate with indie game lovers."
        />
        <meta
          property="og:title"
          content="Game Hearts - Find and collaborate with indie game lovers"
        />
        <meta
          property="og:description"
          content="Find and collaborate with indie game lovers"
        />
        <meta property="og:image" content="/logox200.webp" />
        <meta property="og:image:alt" content="Game Hearts homepage logo" />
        <meta property="og:url" content="https://domain.com/home" />
        <meta property="og:type" content="website" />
      </Helmet>
      <section className="homePage" aria-label="home page">
        <p
          className="homeMessage"
          aria-label="short welcoming message with indications on Game Hearts functionalities"
        >
          Welcome to Gamehearts, the ultimate platform for connecting with
          potential partners for your indie game projects!
          <br />
          <br />
          <Link to="/profile">Creating your profile</Link> is quick and easy,
          allowing project owners to reach out to you directly. You can also{" "}
          <Link to="/search">explore other profiles</Link> using our advanced
          search filters to find the perfect match for your project.
          <br />
          <br />
          Wishing you the best of luck on your indie game journey!
        </p>
        <Footer />
      </section>
    </>
  );
}

export default Home;
