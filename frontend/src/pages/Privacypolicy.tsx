import useInactivityHandler from "../hooks/useInactivityHandler";
import { Helmet } from "react-helmet";

function Privacypolicy() {
  useInactivityHandler();
  // Set the Helmet
  const pageURL = `${import.meta.env.VITE_FRONT_URL}/#/privacypolicy`;
  const pageTitle = "Game Hearts - Privacy Policy";
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
      <section className="privacypolicyPage" aria-label="privacy policy page">
        <h1>Privacy Policy</h1>
        <h2>Introduction</h2>
        <p>
          Welcome to Game Hearts! Your privacy is important to us. This Privacy
          Policy explains how we collect, use, and protect your personal data in
          compliance with the General Data Protection Regulation (GDPR). By
          using our website, you agree to the terms outlined in this policy.
        </p>
        <h2>Data Controller Information</h2>
        <p>
          The Data Controller responsible for your personal data is Game Hearts,
          located at 9 Square des Roubignoles, 77240 Cesson, France . You can
          contact us at gamehearts@gmail for any questions or concerns regarding
          your data.
        </p>
        <h2>Data We Collect</h2>
        <p className="reducedMargin">We collect the following personal data:</p>
        <ul className="reducedMargin">
          <li>
            <strong>Identification Data:</strong> Name and age.
          </li>
          <li>
            <strong>Authentication Data:</strong> Password (hashed and
            encrypted) and JSON Web Tokens (JWT) for identification purposes.
          </li>
          <li>
            <strong>Contact Information:</strong> Inscription email (hidden) and
            contact email (visible to other users).
          </li>
        </ul>
        <p className="reducedMargin">We also use essential cookies such as:</p>
        <ul>
          <li>
            <strong>CSRF Token:</strong> For security purposes.
          </li>
          <li>
            <strong>JWT:</strong> For user identification during active
            sessions.
          </li>
        </ul>
        <h2>How We Collect Data</h2>
        <p className="reducedMargin">We collect data in the following ways:</p>
        <ul>
          <li>When you register or create an account on our website.</li>
          <li>
            When you interact with features requiring user authentication.
          </li>
          <li>
            When you update your profile or provide additional information.
          </li>
        </ul>
        <h2>Purpose of Data Collection</h2>
        <p className="reducedMargin">
          We collect and process your personal data for the following purposes:
        </p>
        <ul>
          <li>
            To authenticate and secure your account using hashed and encrypted
            passwords, JWTs, and CSRF tokens.
          </li>
          <li>
            To enable communication between users by sharing your contact email
            with others (only as specified by you).
          </li>
          <li>
            To provide essential services on the platform and improve the user
            experience.
          </li>
        </ul>
        <h2>Legal Basis for Processing</h2>
        <p className="reducedMargin">
          The legal bases for processing your data are:
        </p>
        <ul>
          <li>
            <strong>Consent:</strong> By creating an account and providing your
            information, you consent to its use for the stated purposes.
          </li>
          <li>
            <strong>Contractual Necessity:</strong> We process your data to
            fulfill our obligations to provide the services you request.
          </li>
          <li>
            <strong>Legitimate Interest:</strong> To maintain a secure and
            functional website.
          </li>
        </ul>
        <h2>User Rights</h2>
        <p className="reducedMargin">
          Under GDPR, you have the following rights:
        </p>
        <ol>
          <li>
            <strong>Right of Access:</strong> You can request a copy of your
            personal data.
          </li>
          <li>
            <strong>Right to Rectification:</strong> You can update or correct
            inaccurate data.
          </li>
          <li>
            <strong>Right to Erasure:</strong> You can request the deletion of
            your data, except where retention is required by law.
          </li>
          <li>
            <strong>Right to Restrict Processing:</strong> You can limit how
            your data is processed in certain situations.
          </li>
          <li>
            <strong>Right to Data Portability:</strong> You can request your
            data in a structured, machine-readable format.
          </li>
          <li>
            <strong>Right to Withdraw Consent:</strong> You can withdraw consent
            for data processing at any time.
          </li>
          <li>
            <strong>Right to Lodge a Complaint:</strong> If you believe your
            rights have been violated, you may lodge a complaint with your local
            data protection authority.
          </li>
        </ol>
        <p>
          To exercise any of these rights, contact us at gamehearts@gmail.com.
        </p>
        <h2>Data Sharing</h2>
        <p className="reducedMargin">
          We do not share your personal data with third parties unless required
          for:
        </p>
        <ul>
          <li>
            <strong>Legal Obligations:</strong> Compliance with applicable laws
            or government requests.
          </li>
          <li>
            <strong>Website Hosting and Maintenance:</strong> Sharing data with
            trusted providers to ensure website functionality and security. All
            third-party providers comply with GDPR requirements.
          </li>
        </ul>
        <h2>Data Retention</h2>
        <p>
          We retain your data for as long as necessary to fulfill the purposes
          outlined in this policy or to comply with legal obligations.
        </p>
        <h2>Security Measures</h2>
        <p className="reducedMargin">
          We prioritize the security of your personal data. Measures include:
        </p>
        <ul>
          <li>Hashing and encrypting passwords.</li>
          <li>Secure servers for data storage.</li>
          <li>Regular reviews and updates to our security practices.</li>
        </ul>
        <h2>Cookies</h2>
        <p className="reducedMargin">
          We use only essential cookies for the proper functioning of our
          website:
        </p>
        <ul>
          <li>
            <strong>CSRF Tokens:</strong> To prevent cross-site request forgery.
          </li>
          <li>
            <strong>JWTs:</strong> To manage secure user sessions.
          </li>
        </ul>
        <p>
          These cookies do not require explicit consent as they are essential
          for website functionality.
        </p>
        <h2>International Data Transfers</h2>
        <p>
          Your data is stored and processed on secure servers located within
          Frankfurt (EU Central). We do not transfer data outside the EU/EEA
          unless adequate safeguards are in place.
        </p>
        <h2>Updates to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time to reflect changes
          in our practices or applicable laws. Updates will be posted on this
          page with a revised date.
        </p>
        <h2>Contact Us</h2>
        <p className="reducedMargin">
          If you have any questions or concerns about this Privacy Policy or how
          we handle your personal data, please contact us at:
        </p>
        <p className="reducedMargin">Game Hearts by Marvin KRIST</p>
        <p className="reducedMargin">gamehearts@gmail.com</p>
        <p className="reducedMargin">06 53 26 45 53</p>
        <p className="reducedMargin">
          9 Square des Roubignoles, 77240 Cesson, France
        </p>
        <p>Last updated: January 23, 2025</p>
      </section>
    </>
  );
}

export default Privacypolicy;
