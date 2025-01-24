import useInactivityHandler from "../hooks/useInactivityHandler";
import { Helmet } from "react-helmet";

function Page404() {
  useInactivityHandler();
  // Set the Helmet
  const pageURL = `${import.meta.env.VITE_FRONT_URL}/#/404`;
  const pageTitle = "Game Hearts - 404";
  const pageDescription =
    "Oops! 404! The page you were looking for could not be found.";
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
        <h1>The page you were looking for could not be found : error 404</h1>
      </section>
    </>
  );
}

export default Page404;
