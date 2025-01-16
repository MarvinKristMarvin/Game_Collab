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
  // Set the Helmet
  const pageURL = `${import.meta.env.VITE_FRONT_URL}`;
  const pageTitle = "Game Hearts - Home";
  const pageDescription =
    "Welcome to Game Hearts! Find and collaborate with indie game artists, developers, composers and more!";
  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={pageURL} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageURL} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
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
