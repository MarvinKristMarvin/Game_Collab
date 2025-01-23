import useInactivityHandler from "../hooks/useInactivityHandler";
import { Helmet } from "react-helmet";

function Contact() {
  useInactivityHandler();
  // Set the Helmet
  const pageURL = `${import.meta.env.VITE_FRONT_URL}/contact`;
  const pageTitle = "Game Hearts - Contact us";
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
      <section className="contactPage" aria-label="contact page">
        <h1>How to contact us</h1>
        <p className="reducedMargin">Email : gamehearts@gmail.com</p>
        <p>Facebook : Game Hearts</p>
      </section>
    </>
  );
}

export default Contact;
